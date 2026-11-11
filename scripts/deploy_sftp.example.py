import os
import sys
import paramiko
from pathlib import Path

def ensure_remote_dir(sftp, remote_dir):
    remote_dir = remote_dir.replace('\\', '/')
    parts = [p for p in remote_dir.split('/') if p]
    current = ""
    for part in parts:
        current += "/" + part
        try:
            sftp.stat(current)
        except (IOError, FileNotFoundError):
            try:
                sftp.mkdir(current)
            except Exception:
                pass

def upload_folder(sftp, local_dir, remote_dir):
    local_path = Path(local_dir)
    if not local_path.exists():
        print(f"Error: {local_dir} not found")
        return 0, 0

    ensure_remote_dir(sftp, remote_dir)
    count = 0
    total_bytes = 0

    for root, dirs, files in os.walk(local_path):
        rel_root = Path(root).relative_to(local_path)
        rel_str = str(rel_root).replace('\\', '/')

        if rel_str != '.':
            target_dir = f"{remote_dir}/{rel_str}".replace('//', '/')
            ensure_remote_dir(sftp, target_dir)
        else:
            target_dir = remote_dir

        for f in files:
            local_file = Path(root) / f
            file_size = local_file.stat().st_size
            remote_file = f"{target_dir}/{f}".replace('//', '/')

            rel_display = f"{rel_str}/{f}" if rel_str != '.' else f
            print(f"  -> Uploading: {rel_display:45} ({file_size/1024:.1f} KB)...", end='\r')
            sftp.put(str(local_file), remote_file)
            count += 1
            total_bytes += file_size
            print(f"  ✓ Uploaded:  {rel_display:45} ({file_size/1024:.1f} KB)")

    return count, total_bytes

def main():
    host = os.environ.get('SFTP_HOST', 'access-5020113105.webspace-host.com')
    port = int(os.environ.get('SFTP_PORT', '22'))
    user = os.environ.get('SFTP_USER', 'su750460')
    pw = os.environ.get('SFTP_PASS', 'YOUR_PASSWORD_HERE')

    print("==================================================")
    print("  ADAMAS ELEKTROTECHNIK — SFTP Server Deployment")
    print("==================================================")
    print(f"Connecting to {host}:{port} as user '{user}'...")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, port=port, username=user, password=pw, timeout=20)
        print("✓ Connected successfully!")
        sftp = ssh.open_sftp()
        print("✓ SFTP session active.")

        # 1. Upload to /NeueWebsite
        print("\n[Step 1/2] Deploying latest build to /NeueWebsite...")
        cnt1, sz1 = upload_folder(sftp, 'dist', '/NeueWebsite')
        print(f"✓ /NeueWebsite updated: {cnt1} files ({sz1/(1024*1024):.2f} MB)")

        # 2. Also sync to /NeueWebsite/dist
        print("\n[Step 2/2] Syncing to /NeueWebsite/dist...")
        cnt2, sz2 = upload_folder(sftp, 'dist', '/NeueWebsite/dist')
        print(f"✓ /NeueWebsite/dist updated: {cnt2} files ({sz2/(1024*1024):.2f} MB)")

        sftp.close()
        ssh.close()
        print("\n==================================================")
        print("  DEPLOYMENT TO REMOTE SERVER COMPLETED SUCCESSFULLY!")
        print("==================================================")

    except Exception as e:
        print(f"\nDeployment error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
