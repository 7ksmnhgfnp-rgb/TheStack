const C="stack-v4",A=["./","index.html","fonts/inter-400.woff","fonts/inter-500.woff","fonts/inter-600.woff","fonts/inter-700.woff","fonts/bric-400.woff","fonts/bric-700.woff","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 const asset=/\.(woff2?|png|jpg|jpeg|svg|ico)$/.test(u.pathname);
 if(asset){e.respondWith(caches.open(C).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{if(x&&x.ok)c.put(r,x.clone());return x}))));return}
 e.respondWith(fetch(r,{cache:"no-cache"}).then(x=>{if(x&&x.ok)caches.open(C).then(c=>c.put(r,x.clone()));return x}).catch(()=>caches.open(C).then(c=>c.match(r).then(m=>m||c.match("index.html")))))});

self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l){if("focus" in c)return c.focus()}return self.clients.openWindow("./")}))});
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){}e.waitUntil(self.registration.showNotification(d.title||"Stack",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",tag:d.tag||"stack"}))});