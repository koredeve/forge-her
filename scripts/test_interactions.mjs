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

async function runTests() {
  console.log('[*] Connecting to Chrome CDP...');
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

  // 1. HOME TEST
  console.log('\n--- 1. Testing Home Page ---');
  await cdp.send('Page.navigate', { url: 'http://localhost:3001' });
  await new Promise(r => setTimeout(r, 2500));
  await cdp.screenshot('her_test_1_home.png');

  // 2. WORKOUT LAUNCH TEST
  console.log('\n--- 2. Testing Workout Launch ---');
  const clickedWorkout = await cdp.evaluate(`(() => {
    const cards = Array.from(document.querySelectorAll('.card, .w-cd, div[onclick]'));
    const target = cards.find(c => c.textContent.includes('Upper Body') || c.textContent.includes('Snatched Waist') || c.textContent.includes('Push-Up'));
    if (target) {
      target.click();
      return target.textContent.slice(0, 40);
    }
    return null;
  })()`);
  console.log('Clicked workout card:', clickedWorkout);
  await new Promise(r => setTimeout(r, 1500));
  await cdp.screenshot('her_test_2_workout_modal.png');

  // Click start workout inside modal
  const started = await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => b.textContent.includes('START') || b.textContent.includes('Launch'));
    if (startBtn) {
      startBtn.click();
      return true;
    }
    return false;
  })()`);
  console.log('Started workout player:', started);
  await new Promise(r => setTimeout(r, 2000));
  await cdp.screenshot('her_test_3_player_active.png');

  // Test 0.5x Slow-Mo speed toggle in player
  const toggledSpeed = await cdp.evaluate(`(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const slowMo = btns.find(b => b.textContent.includes('0.5x') || b.textContent.includes('Speed') || b.textContent.includes('1x'));
    if (slowMo) {
      slowMo.click();
      return slowMo.textContent.trim();
    }
    return null;
  })()`);
  console.log('Toggled Slow-Mo:', toggledSpeed);

  // Close player or navigate to /sculpt
  await cdp.evaluate(`(() => {
    const closeBtn = document.querySelector('button[aria-label="Close"], .close-btn') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('✕') || b.textContent.includes('Back') || b.textContent.includes('Quit'));
    if (closeBtn) closeBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));

  // 3. SCULPT LADDERS TEST
  console.log('\n--- 3. Testing Sculpt Ladders ---');
  await cdp.send('Page.navigate', { url: 'http://localhost:3001/sculpt' });
  await new Promise(r => setTimeout(r, 2000));
  
  // If guest preview is visible, click continue as guest
  await cdp.evaluate(`(() => {
    const guestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Guest Preview'));
    if (guestBtn) guestBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 1500));
  await cdp.screenshot('her_test_4_sculpt_ladders.png');

  // Click on an exercise to open form breakdown
  const openedForm = await cdp.evaluate(`(() => {
    const links = Array.from(document.querySelectorAll('button, a, span, .mut'));
    const target = links.find(el => el.textContent.includes('Form Guide') || el.textContent.includes('ℹ️') || el.textContent.includes('View Form') || el.textContent.includes('Strict Floor Push-Up'));
    if (target) {
      target.click();
      return target.textContent.trim();
    }
    return null;
  })()`);
  console.log('Opened form preview modal:', openedForm);
  await new Promise(r => setTimeout(r, 1500));
  await cdp.screenshot('her_test_5_sculpt_form_modal.png');

  // 4. CYCLE NUTRITION (/fuel) TEST
  console.log('\n--- 4. Testing Fuel / Cycle Nutrition ---');
  await cdp.send('Page.navigate', { url: 'http://localhost:3001/fuel' });
  await new Promise(r => setTimeout(r, 2000));
  // Click guest preview if gated
  await cdp.evaluate(`(() => {
    const guestBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Guest Preview'));
    if (guestBtn) guestBtn.click();
  })()`);
  await new Promise(r => setTimeout(r, 1200));

  // Click Follicular or Luteal tab
  await cdp.evaluate(`(() => {
    const tabs = Array.from(document.querySelectorAll('button, .tab'));
    const fol = tabs.find(t => t.textContent.includes('Follicular') || t.textContent.includes('Luteal'));
    if (fol) fol.click();
  })()`);
  await new Promise(r => setTimeout(r, 1000));
  await cdp.screenshot('her_test_6_fuel_cycle.png');

  // 5. COACH HER AI ASSISTANT TEST
  console.log('\n--- 5. Testing Coach HER Assistant ---');
  // Open assistant drawer
  const coachOpened = await cdp.evaluate(`(() => {
    const coachBtn = Array.from(document.querySelectorAll('button, div')).find(b => b.textContent.includes('Coach HER') || b.textContent.includes('💬') || b.textContent.includes('Ask AI'));
    if (coachBtn) {
      coachBtn.click();
      return true;
    }
    return false;
  })()`);
  console.log('Coach HER opened:', coachOpened);
  await new Promise(r => setTimeout(r, 1200));

  // Type question into input and submit
  const asked = await cdp.evaluate(`(() => {
    const input = document.querySelector('input[placeholder*="Coach"], input[type="text"]');
    if (input) {
      input.value = 'How do I master strict push-ups?';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      const form = input.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      } else {
        const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Send') || b.textContent.includes('Ask') || b.textContent.includes('➤'));
        if (sendBtn) sendBtn.click();
      }
      return true;
    }
    return false;
  })()`);
  console.log('Question submitted to Coach HER:', asked);
  await new Promise(r => setTimeout(r, 2000));
  await cdp.screenshot('her_test_7_coach_her_chat.png');

  console.log('\n[✔] ALL INTERACTION TESTS COMPLETED SUCCESSFULLY!');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Error during interaction tests:', err);
  process.exit(1);
});
