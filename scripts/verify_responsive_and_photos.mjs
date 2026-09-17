import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/mac/.gemini/antigravity/brain/1b4a39ff-35cd-4504-ae1a-e43507828d35';

async function getWsUrl() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await res.json();
  const pageTab = tabs.find(t => t.type === 'page');
  if (!pageTab) throw new Error('No page tab found in Chrome');
  return pageTab.webSocketDebuggerUrl;
}

class CDPClient {
  constructor(url) {
    this.url = url;
    this.id = 1;
    this.callbacks = new Map();
  }
  async connect() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }
  async screenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log(`[✔] Captured screenshot: ${filename}`);
    return outPath;
  }
}

async function run() {
  const wsUrl = await getWsUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();

  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');

  // 1. DESKTOP VIEWPORT
  console.log('[*] Testing Desktop Viewport (1280x860)...');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 860,
    deviceScaleFactor: 2,
    mobile: false
  });
  await cdp.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 2000));
  // Scroll slightly down to showcase the workout cards with picture headers
  await cdp.evaluate(`window.scrollTo({ top: 380, behavior: 'instant' });`);
  await new Promise(r => setTimeout(r, 800));
  await cdp.screenshot('her_responsive_desktop.png');

  // 2. WORKOUT PLAYER WITH PHOTO REFERENCE
  console.log('[*] Testing Workout Player with Photo Reference...');
  await cdp.evaluate(`(() => {
    const card = Array.from(document.querySelectorAll('.card')).find(c => c.textContent.includes('Corset Core') || c.textContent.includes('Snatched Waist'));
    if (card) card.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));
  await cdp.evaluate(`(() => {
    const start = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('START GUIDED SESSION'));
    if (start) start.click();
  })()`);
  await new Promise(r => setTimeout(r, 2000));

  // Click Form Photo button in player
  await cdp.evaluate(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Form Photo'));
    if (btn) btn.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));
  await cdp.screenshot('her_player_with_photo.png');

  // Close player
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('.xbtn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('✕'));
    if (closeBtn) closeBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));

  // 3. MOBILE VIEWPORT (iPhone 14 Pro: 390x844)
  console.log('[*] Testing Mobile Viewport (390x844)...');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await cdp.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 2000));
  await cdp.evaluate(`window.scrollTo({ top: 460, behavior: 'instant' });`);
  await new Promise(r => setTimeout(r, 800));
  await cdp.screenshot('her_responsive_mobile.png');

  console.log('[✔] All responsive and photo tests completed successfully!');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
