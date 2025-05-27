const CURRENT_APP_VERSION = "v8.9"; // 🔁 Update this each release

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(registration => {
    registration.onupdatefound = () => {
      const newWorker = registration.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // ✅ Save version and notify user
          localStorage.setItem("lastSeenVersion", CURRENT_APP_VERSION);
          alert(`✅ OMH Field App has been updated to version ${CURRENT_APP_VERSION}`);
          newWorker.postMessage('SKIP_WAITING');

        }
      };
    };
  });

  // 🔁 Refresh the page after new SW takes control
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

// ✅ Also show version alert on first open or hard refresh (no SW update)
document.addEventListener("DOMContentLoaded", () => {
  const seen = localStorage.getItem("lastSeenVersion");
  const isControlled = !!navigator.serviceWorker?.controller;

  if (seen !== CURRENT_APP_VERSION) {
    localStorage.setItem("lastSeenVersion", CURRENT_APP_VERSION);

    if (isControlled) {
      alert(`✅ OMH Field App is now running version ${CURRENT_APP_VERSION}`);
    }
  }
});
