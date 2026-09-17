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

  // 1. HOME & WORKOUT PLAYER
  console.log('[*] Testing Workout Player live launch...');
  await cdp.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 2000));

  // Click first workout card
  await cdp.evaluate(`(() => {
    const cards = Array.from(document.querySelectorAll('.card, .w-cd, div[onclick]'));
    const target = cards.find(c => c.textContent.includes('Snatched Waist') || c.textContent.includes('Upper Body'));
    if (target) target.click();
  })()`);
  await new Promise(r => setTimeout(r, 1200));

  // Click START GUIDED SESSION
  const started = await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const start = btns.find(b => b.textContent.includes('START GUIDED SESSION'));
    if (start) {
      start.click();
      return true;
    }
    return false;
  })()`);
  console.log('Start button clicked:', started);
  await new Promise(r => setTimeout(r, 2500));
  await cdp.screenshot('her_live_workout_player.png');

  // Test toggling 0.5x Slow-Mo
  const toggled = await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('0.5x') || b.textContent.includes('Speed'));
    if (btn) {
      btn.click();
      return btn.textContent;
    }
    return null;
  })()`);
  console.log('Slow-Mo toggled:', toggled);

  // Close player
  await cdp.evaluate(`(() => {
    const x = document.querySelector('.xbtn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('✕'));
    if (x) x.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));

  // 2. SCULPT FORM GUIDE MODAL
  console.log('[*] Testing Sculpt Form Guide Modal...');
  await cdp.send('Page.navigate', { url: 'http://localhost:3001/sculpt' });
  await new Promise(r => setTimeout(r, 2000));

  // Click Guide button on Lv1 Wall Push-Ups
  const openedGuide = await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const guideBtn = btns.find(b => b.textContent.includes('Guide'));
    if (guideBtn) {
      guideBtn.click();
      return true;
    }
    return false;
  })()`);
  console.log('Opened Guide Modal:', openedGuide);
  await new Promise(r => setTimeout(r, 1500));
  await cdp.screenshot('her_live_exercise_modal.png');

  console.log('[✔] Live player and modal test complete!');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
