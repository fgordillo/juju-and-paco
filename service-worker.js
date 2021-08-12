self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("assets").then(function(cache) {
            return cache.addAll(
                [
                    "./assets/PoiretOne-Regular.ttf",
                    "./assets/angle-double-up.svg",
                    "./assets/lithuanian.jpg",
                    "./assets/city-hall.jpg",
                    "./assets/logo.png",
                    "./assets/logo.svg",
                ]
            )
        })
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open("assets").then(function(cache) {
            // stale-while-revalidate
            return cache.match(event.request).then(function (response) {
                const fetchPromise = fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone())
                    return networkResponse
                })
                return response || fetchPromise
            })
        })
    )
})