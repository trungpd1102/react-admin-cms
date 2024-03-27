if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/serviceWorker.ts').then(
      function (registration) {
        console.log(
          'Service Worker registered with scope: ',
          registration.scope
        );
      },
      function (err) {
        console.log('Service Worker registration failed: ', err);
      }
    );
  });
}
