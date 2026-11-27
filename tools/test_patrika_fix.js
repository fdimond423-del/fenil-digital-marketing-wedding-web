const fs = require('fs');
const path = require('path');

const file = path.resolve('demos/patrika-gulmohar-reverie/index.html');
let html = fs.readFileSync(file, 'utf8');

// Replace base with theme base
html = html.replace(/<base href="[^"]*">/i, '<base href="https://mypatrika.in/themes/gulmohar-reverie/">');

// Add auto-dismiss curtain & auto-advance script
const autoAdvanceScript = `
<script>
(function() {
  // 1. Auto dismiss curtain after load
  function openCurtain() {
    var intro = document.querySelector('.ms-intro, [data-intro]');
    if (intro) {
      intro.classList.add('is-done');
      setTimeout(function() {
        intro.style.display = 'none';
      }, 600);
    }
    document.documentElement.classList.remove('intro-active');
  }

  // Click curtain to open immediately
  document.addEventListener('click', function(e) {
    if (e.target.closest && (e.target.closest('.ms-intro') || e.target.closest('[data-intro]'))) {
      openCurtain();
    }
  });

  // Automatically open curtain after 1.5 seconds if still closed
  setTimeout(openCurtain, 1500);

  // 2. Mobile Auto-advance through scenes every 4 seconds
  var autoTimer = null;
  var userInteracted = false;

  function advanceNext() {
    var device = document.querySelector('.stage__device, .stage__viewport, [data-stage-device]');
    if (device) {
      device.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
    // Also trigger KeyboardEvent for ArrowRight
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39, bubbles: true }));
  }

  function startAutoAdvance() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function() {
      if (!userInteracted) {
        advanceNext();
      }
    }, 4500);
  }

  // Start after intro opens
  setTimeout(startAutoAdvance, 3000);

  // Pause on user touch/scroll, then resume after 8 seconds
  ['touchstart', 'mousedown', 'wheel', 'keydown'].forEach(function(ev) {
    window.addEventListener(ev, function() {
      userInteracted = true;
      if (autoTimer) clearInterval(autoTimer);
      setTimeout(function() {
        userInteracted = false;
        startAutoAdvance();
      }, 8000);
    }, { passive: true });
  });
})();
</script>
`;

// Inject before </body>
html = html.replace('</body>', `${autoAdvanceScript}\n</body>`);

fs.writeFileSync(file, html, 'utf8');
console.log('Updated demos/patrika-gulmohar-reverie/index.html with theme base and auto-advance script!');
