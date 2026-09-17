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
  close() {
    this.ws.close();
  }
}

async function run() {
  const wsUrl = await getWsUrl();
  const client = new CDPClient(wsUrl);
  await client.connect();
  console.log('[*] Connected to Chrome DevTools Protocol');

  await client.send('Page.enable');
  await client.send('DOM.enable');

  // 1. Emulate iPhone 14 (390 x 844)
  console.log('[*] Testing iPhone 14 Viewport (390x844)...');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  // Navigate to Home
  await client.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 2000));

  // Check horizontal overflow
  const overflowHome = await client.send('Runtime.evaluate', {
    expression: 'document.documentElement.scrollWidth > window.innerWidth',
    returnByValue: true
  });
  console.log('iPhone 14 Home horizontal overflow:', overflowHome.result.value);

  let snap = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'mobile_home_iphone14.png'), Buffer.from(snap.data, 'base64'));
  console.log('[✔] Saved mobile_home_iphone14.png');

  // 2. Navigate to Library
  console.log('[*] Testing Library on iPhone 14...');
  await client.send('Page.navigate', { url: 'http://localhost:3001/library' });
  await new Promise(r => setTimeout(r, 1500));

  const overflowLib = await client.send('Runtime.evaluate', {
    expression: 'document.documentElement.scrollWidth > window.innerWidth',
    returnByValue: true
  });
  console.log('iPhone 14 Library horizontal overflow:', overflowLib.result.value);

  snap = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'mobile_library_iphone14.png'), Buffer.from(snap.data, 'base64'));
  console.log('[✔] Saved mobile_library_iphone14.png');

  // 3. Open Exercise Modal on mobile
  console.log('[*] Opening Exercise Modal on iPhone 14...');
  await client.send('Runtime.evaluate', {
    expression: 'document.querySelector(".ex-c")?.click()'
  });
  await new Promise(r => setTimeout(r, 1200));

  snap = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'mobile_exercise_modal_iphone14.png'), Buffer.from(snap.data, 'base64'));
  console.log('[✔] Saved mobile_exercise_modal_iphone14.png');

  // 4. Test Tablet / iPad Viewport (768 x 1024)
  console.log('[*] Testing iPad Tablet Viewport (768x1024)...');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: true
  });
  await client.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 1500));

  snap = await client.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'tablet_home_ipad.png'), Buffer.from(snap.data, 'base64'));
  console.log('[✔] Saved tablet_home_ipad.png');

  // Restore to Desktop
  await client.send('Emulation.clearDeviceMetricsOverride');
  client.close();
  console.log('[✔] Mobile & Tablet responsiveness testing completed!');
}

run().catch(console.error);
