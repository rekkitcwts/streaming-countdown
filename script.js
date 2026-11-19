/* ============================================================
   OBS Countdown Timer — script.js
   Two-box countdown (minutes + seconds), no colons.
   Starts at 02:00. On reaching 00:00, waits one second then
   animates the whole thing away.
   ============================================================ */

(function () {
  const MINUTES_DEFAULT = 2;
  const SECONDS_DEFAULT = 0;

  const container = document.getElementById("timerContainer");
  const minutesEl = document.getElementById("minutesBox");
  const secondsEl = document.getElementById("secondsBox");

  // Total remaining seconds
  let totalSeconds = MINUTES_DEFAULT * 60 + SECONDS_DEFAULT;

  // Pad a number to two digits (e.g. 5 -> "05")
  function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  function finish() {
    // Timer reached 00:00 — wait one second, then animate away.
    setTimeout(function () {
      container.classList.add("disappear");
    }, 1000);
  }

  function start() {
    updateDisplay();

    const timer = setInterval(function () {
      totalSeconds--;

      if (totalSeconds === 0) {
        // Hit 00:00 — show it, then start the disappear sequence.
        updateDisplay();
        clearInterval(timer);
        finish();
        return;
      }

      if (totalSeconds < 0) {
        clearInterval(timer);
        return;
      }

      updateDisplay();
    }, 1000);
  }

  start();
})();
