// ==UserScript==
// @name         PARA Session Launcher
// @namespace    https://github.com/jonathanmicklos
// @version      2.0
// @description  Paste project names to batch-launch and rename Claude Code sessions
// @match        https://claude.ai/code*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  'use strict';

  const SELECTORS = {
    newSessionBtn: 'button[aria-keyshortcuts="Shift+Meta+O"]',
    promptInput: 'div[aria-label="Prompt"].ProseMirror',
  };

  // --- UI ---

  function createLauncherUI() {
    const container = document.createElement('div');
    container.id = 'para-launcher';
    container.innerHTML = `
      <style>
        #para-launcher-toggle {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 10000;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: #1a1a1a;
          color: #e0e0e0;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        #para-launcher-toggle:hover { background: #2a2a2a; }
        #para-launcher-panel {
          position: fixed;
          bottom: 68px;
          right: 16px;
          z-index: 10000;
          width: 380px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px;
          display: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
          font-family: -apple-system, system-ui, sans-serif;
          color: #e0e0e0;
        }
        #para-launcher-panel.visible { display: block; }
        #para-launcher-panel h3 {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        #para-launcher-panel textarea {
          width: 100%;
          height: 140px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #e0e0e0;
          font-family: monospace;
          font-size: 12px;
          padding: 8px;
          resize: vertical;
          box-sizing: border-box;
        }
        #para-launcher-panel textarea::placeholder { color: #666; }
        #para-launcher-panel .pl-buttons {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        #para-launcher-panel button.pl-btn {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          background: #222;
          color: #e0e0e0;
          font-size: 13px;
          cursor: pointer;
        }
        #para-launcher-panel button.pl-btn:hover { background: #333; }
        #para-launcher-panel button.pl-btn.primary {
          background: #c96;
          color: #000;
          border-color: #c96;
          font-weight: 600;
        }
        #para-launcher-panel button.pl-btn.primary:hover { background: #da7; }
        #para-launcher-panel button.pl-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        #para-launcher-panel .pl-status {
          margin-top: 8px;
          font-size: 12px;
          color: #888;
          min-height: 18px;
        }
        #para-launcher-panel .pl-hint {
          font-size: 11px;
          color: #555;
          margin: 4px 0 0;
        }
      </style>

      <button id="para-launcher-toggle" title="PARA Session Launcher">P</button>
      <div id="para-launcher-panel">
        <h3>PARA Session Launcher</h3>
        <textarea id="para-launcher-input" placeholder="Paste project names here, one per line..."></textarea>
        <p class="pl-hint">Paste output from /list-projects. Each line opens a session, sends /resume-project, then /rename.</p>
        <div class="pl-buttons">
          <button class="pl-btn" id="para-launcher-clear">Clear</button>
          <button class="pl-btn primary" id="para-launcher-go">Launch All</button>
        </div>
        <div class="pl-status" id="para-launcher-status"></div>
      </div>
    `;
    document.body.appendChild(container);

    const toggle = document.getElementById('para-launcher-toggle');
    const panel = document.getElementById('para-launcher-panel');
    const input = document.getElementById('para-launcher-input');
    const goBtn = document.getElementById('para-launcher-go');
    const clearBtn = document.getElementById('para-launcher-clear');
    const status = document.getElementById('para-launcher-status');

    // Restore last input
    const saved = GM_getValue('para_input', '');
    if (saved) input.value = saved;

    toggle.addEventListener('click', () => {
      panel.classList.toggle('visible');
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      status.textContent = '';
      GM_setValue('para_input', '');
    });

    goBtn.addEventListener('click', () => {
      const projects = parseProjectNames(input.value);
      if (projects.length === 0) {
        status.textContent = 'No project names found.';
        return;
      }
      GM_setValue('para_input', input.value);
      goBtn.disabled = true;
      launchSessions(projects, status, () => {
        goBtn.disabled = false;
      });
    });
  }

  // --- Parsing ---

  function parseProjectNames(text) {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#') && !line.match(/^\d+ projects/));
  }

  // --- Session launching ---

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);

      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout waiting for ${selector}`));
      }, timeout);
    });
  }

  function typeIntoPrompt(promptEl, text) {
    promptEl.focus();
    // Clear existing content
    promptEl.innerHTML = '';
    // Use execCommand for tiptap/ProseMirror compatibility
    document.execCommand('insertText', false, text);
  }

  function pressEnter(el) {
    el.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
    }));
  }

  async function sendMessage(prompt, text) {
    typeIntoPrompt(prompt, text);
    await sleep(300);
    pressEnter(prompt);
  }

  async function launchSessions(projects, statusEl, onDone) {
    for (let i = 0; i < projects.length; i++) {
      const name = projects[i];
      statusEl.textContent = `(${i + 1}/${projects.length}) Launching: ${name}`;

      try {
        // Click "New session"
        const newBtn = document.querySelector(SELECTORS.newSessionBtn);
        if (!newBtn) throw new Error('New session button not found');
        newBtn.click();

        // Wait for prompt input to appear in the new session
        await sleep(2000);
        const prompt = await waitForElement(SELECTORS.promptInput, 10000);
        await sleep(500);

        // Start the session with a message first
        await sendMessage(prompt, 'hi');

        // Wait for response, then rename
        await sleep(3000);
        const prompt2 = await waitForElement(SELECTORS.promptInput, 10000);
        await sendMessage(prompt2, `/rename ${name}`);

        // Wait for rename to process, then send /resume-project
        await sleep(2000);
        const prompt3 = await waitForElement(SELECTORS.promptInput, 10000);
        await sendMessage(prompt3, `/resume-project ${name}`);

        // Wait before launching next session
        await sleep(2000);
      } catch (err) {
        statusEl.textContent = `Error on "${name}": ${err.message}. Stopping.`;
        onDone();
        return;
      }
    }

    statusEl.textContent = `Done! Launched ${projects.length} sessions.`;
    onDone();
  }

  // --- Init ---

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLauncherUI);
  } else {
    createLauncherUI();
  }
})();
