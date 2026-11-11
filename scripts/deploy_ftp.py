import os
import sys
import ftplib
from pathlib import Path

def load_env(env_path='.env'):
    env_vars = {}
    for p in ['.env.local', '.env']:
        if os.path.exists(p):
            with open(p, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        k, v = line.split('=', 1)
                        env_vars[k.strip()] = v.strip().strip('\'"')
    return env_vars

def upload_directory(ftp, local_dir, remote_dir):
    local_path = Path(local_dir)
    if not local_path.exists():
        print(f"Error: Local directory '{local_dir}' does not exist. Run 'npm run build' first.")
        sys.exit(1)

    # Normalize remote directory
    remote_dir = remote_dir.replace('\\', '/')
    if not remote_dir.startswith('/'):
        remote_dir = '/' + remote_dir
    
    # Ensure remote directory exists
    parts = [p for p in remote_dir.split('/') if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            ftp.cwd(current)
        except ftplib.error_perm:
            try:
                ftp.mkd(current)
                ftp.cwd(current)
            except Exception as e:
                print(f"Notice creating remote dir {current}: {e}")

    ftp.cwd(remote_dir)
    print(f"Remote working directory: {ftp.pwd()}")

    uploaded_count = 0
    total_bytes = 0

    for root, dirs, files in os.walk(local_path):
        rel_root = Path(root).relative_to(local_path)
        rel_remote = str(rel_root).replace('\\', '/')
        
        # Create subdirectories if needed
        if rel_remote != '.':
            target_sub = f"{remote_dir}/{rel_remote}".replace('//', '/')
            try:
                ftp.cwd(target_sub)
            except ftplib.error_perm:
                # Walk down and create
                sub_parts = [p for p in rel_remote.split('/') if p]
                cur_sub = remote_dir
                for sp in sub_parts:
                    cur_sub += "/" + sp
                    try:
                        ftp.cwd(cur_sub)
                    except ftplib.error_perm:
                        try:
                            ftp.mkd(cur_sub)
                            ftp.cwd(cur_sub)
                        except:
                            pass
        else:
            ftp.cwd(remote_dir)

        # Upload files
        for f in files:
            local_file = Path(root) / f
            file_size = local_file.stat().st_size
            remote_target = f

            # Upload in binary mode
            with open(local_file, 'rb') as fp:
                print(f"  -> Uploading: {rel_remote if rel_remote != '.' else ''}/{f} ({file_size/1024:.1f} KB)...", end='\r')
                ftp.storbinary(f"STOR {remote_target}", fp, blocksize=8192)
                uploaded_count += 1
                total_bytes += file_size
                print(f"  ✓ Uploaded:  {rel_remote if rel_remote != '.' else ''}/{f} ({file_size/1024:.1f} KB)   ")

    print(f"\nSuccessfully deployed {uploaded_count} files ({total_bytes / (1024*1024):.2f} MB) to {remote_dir}!")

def main():
    env = load_env()
    
    host = env.get('FTP_HOST') or os.environ.get('FTP_HOST')
    user = env.get('FTP_USER') or os.environ.get('FTP_USER')
    password = env.get('FTP_PASSWORD') or os.environ.get('FTP_PASSWORD') or env.get('FTP_PASS')
    port = int(env.get('FTP_PORT', os.environ.get('FTP_PORT', 21)))
    remote_dir = env.get('FTP_REMOTE_DIR', os.environ.get('FTP_REMOTE_DIR', '/public_html'))
    secure = (env.get('FTP_SECURE', os.environ.get('FTP_SECURE', 'false')).lower() in ['true', '1', 'yes'])

    if not host or not user or not password:
        print("\n=======================================================")
        print("  ADAMAS ELEKTROTECHNIK — Automated FTP Deployment")
        print("=======================================================")
        print("Error: Missing FTP credentials in .env or environment.")
        print("\nPlease create a '.env' file in the project root with:")
        print("-------------------------------------------------------")
        print("FTP_HOST=your-ftp-host.com")
        print("FTP_USER=your_username")
        print("FTP_PASSWORD=your_password")
        print("FTP_REMOTE_DIR=/public_html   # or /httpdocs or /")
        print("FTP_PORT=21")
        print("FTP_SECURE=false              # set to true if using FTPS")
        print("-------------------------------------------------------\n")
        sys.exit(1)

    print(f"Connecting to FTP server: {host}:{port} (Secure: {secure})...")
    
    try:
        if secure:
            ftp = ftplib.FTP_TLS()
            ftp.connect(host, port, timeout=30)
            ftp.login(user, password)
            ftp.prot_p()  # Switch to secure data connection
        else:
            ftp = ftplib.FTP()
            ftp.connect(host, port, timeout=30)
            ftp.login(user, password)
            
        print(f"✓ Connected and authenticated as '{user}'")
        ftp.encoding = 'utf-8'

        upload_directory(ftp, 'dist', remote_dir)
        ftp.quit()
        print("✓ FTP Connection closed cleanly.")
    except Exception as e:
        print(f"\nFTP Deployment failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()

