self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("assets").then(function(cache) {
            return cache.addAll(
                [
                    "/assets/PoiretOne-Regular.ttf",
                    "/assets/angle-double-up.svg",
                    "/assets/lithuanian.jpg",
                    "/assets/city-hall.jpg",
                    "/assets/logo.png",
                    "/assets/logo.svg",
                    "/behavior.js",
                    "/style.css",
                    "/index.html"
                ]
            )
        })
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open("assets").then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone())
                    return response
                })
            })
        })
    )
})