const C="stack-v3",A=["./","index.html","fonts/inter-400.woff","fonts/inter-500.woff","fonts/inter-600.woff","fonts/inter-700.woff","fonts/bric-400.woff","fonts/bric-700.woff","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.open(C).then(c=>c.match(e.request).then(m=>{const f=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque"))c.put(e.request,r.clone());return r}).catch(()=>m);return m||f})))});

self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l){if("focus" in c)return c.focus()}return self.clients.openWindow("./")}))});
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){}e.waitUntil(self.registration.showNotification(d.title||"Stack",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",tag:d.tag||"stack"}))});