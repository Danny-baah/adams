import { execSync } from 'child_process'
import fs from 'fs'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const url = 'http://localhost:5173/#/ueber-uns'
const out = 'about_page_capture.png'

try {
  execSync(`"${chromePath}" --headless --disable-gpu --window-size=1440,3400 --screenshot=${out} ${url}`, { timeout: 20000 })
  console.log('Capture finished, file size:', fs.statSync(out).size)
} catch (err) {
  console.error('Error during capture:', err)
}

