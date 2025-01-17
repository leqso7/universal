if (!self.define) {
    let e, i = {};
    const r = (r, s) => (
        r = new URL(r + ".js", s).href,
        i[r] ||
        new Promise((i => {
            if ("document" in self) {
                const e = document.createElement("script");
                e.src = r;
                e.onload = i;
                document.head.appendChild(e);
            } else {
                e = r;
                importScripts(r);
                i();
            }
        })).then(() => {
            let e = i[r];
            if (!e) throw new Error(`Module ${r} didn’t register its module`);
            return e;
        })
    );
    self.define = (s, n) => {
        const d =
            e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (i[d]) return;
        let t = {};
        const o = (e) => r(e, d),
            l = { module: { uri: d }, exports: t, require: o };
        i[d] = Promise.all(s.map((e) => l[e] || o(e))).then((e) => (n(...e), t));
    };
}
define(["./workbox-5ffe50d4"], (function (e) {
    "use strict";
    self.skipWaiting();
    e.clientsClaim();
    e.precacheAndRoute(
        [
            { url: "404.html", revision: "cbed2a0a9e10f643d6ecdca07fa8b6a2" },
            { url: "assets/index-BtYRzv7H.js", revision: null },
            { url: "assets/index-D-Xodb0M.css", revision: null },
            { url: "index.html", revision: "a00d6a54f09bedcc18ddd0df06ab3591" },
            { url: "registerSW.js", revision: "b7d531549c4ee7c28f517e9d8b12b29e" },
            { url: "service-worker.js", revision: "1e40411d50b425729fdd338e4aae5205" },
            { url: "pwa-192x192.png", revision: "37d797d802ec35eb08bb8a00ea272600" },
            { url: "pwa-512x512.png", revision: "1f5893634f785195f2d866a8080757a7" },
            { url: "manifest.webmanifest", revision: "18f733451dfd3d3807a0ac5dd1b0973b" },
        ],
        {}
    );
    e.cleanupOutdatedCaches();
    e.registerRoute(
        new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
}));
