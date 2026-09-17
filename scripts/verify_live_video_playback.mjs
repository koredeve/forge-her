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
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 860,
    deviceScaleFactor: 2,
    mobile: false
  });

  console.log('[*] Testing new female video in Workout Player...');
  await cdp.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 2000));

  // Click Corset Core workout
  await cdp.evaluate(`(() => {
    const card = Array.from(document.querySelectorAll('.card')).find(c => c.textContent.includes('Corset Core'));
    if (card) card.click();
  })()`);
  await new Promise(r => setTimeout(r, 1200));

  // Click Start
  await cdp.evaluate(`(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('START GUIDED SESSION'));
    if (btn) btn.click();
  })()`);
  await new Promise(r => setTimeout(r, 2500));

  // Capture frame
  await cdp.screenshot('her_live_female_video_playing.png');

  // Also check video source in DOM
  const currentSrc = await cdp.evaluate(`document.querySelector('video') ? document.querySelector('video').currentSrc : null`);
  console.log('Active video currentSrc:', currentSrc);

  console.log('[✔] Live video verification finished!');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
