if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(registration => {
    registration.onupdatefound = () => {
      const newWorker = registration.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // ✅ Show update prompt to user
          const shouldReload = confirm("🚨 A new version of the DFR app is available. Click OK to update now.");
          if (shouldReload) {
            newWorker.postMessage('SKIP_WAITING');
          }
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
