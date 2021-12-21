
workbox.setConfig({
  debug: true
})

workbox.core.setCacheNameDetails({prefix: "pwatest"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});




// push
let click_open_url;

self.addEventListener("push", function(event){

  let push_message = event.data.text();

  click_open_url = "https://sheraclassics.co.ke";

  const options = {
    body: push_message.body,
    icon: './img/logo.82b9c7a5.png',
    image: './img/banner.jpg',
    vibrate: [200,100,200,100,200,100,200],
    tag: "vibration-sample"
   };

   event.waitUntil(self.registration.showNotification("Title",options));

});


// WHEN NOTIFICATION IS CLICKED

self.addEventListener("notificationclick",function(event){
  const clickedNotification = event.notification;

  clickedNotification.close();

  if(click_open_url){
    const promiseChain = clients.openWindow(click_open_url);
    
    event.waitUntil(promiseChain);
  }
});





// fonts
workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "googleapis",
    plugins:[
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ],
    method: "GET",
    cachableResponse:{ statuses: [0,200]}
  })
)



