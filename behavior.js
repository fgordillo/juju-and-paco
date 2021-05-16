document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    });
})

document.querySelectorAll('h1').forEach(function(h1) {
    h1.addEventListener('click', function (e) {
        document.querySelector("#nav").scrollIntoView({
            behavior: 'smooth'
        })
    })
})

function addIfUnique(array, item) {
    const idx = array.findIndex(item)
    if (idx !== -1) return
    array.push(item)
}

function getBrowserPreferredLocales(languages=[window.navigator.language, ...Array.from(window.navigator.languages || [])]) {
    const locales = {}

    for (let lang of languages) {
        if (/^\w{2}$/.test(lang)) addIfUnique(locales, lang)

        let result = /^(\w{2})-\w{2}$/.exec(lang)
        if (result) addIfUnique(locales, result[1])
    }

    return locales
}

function setDocumentLang() {
    const preferredLocales = getBrowserPreferredLocales()
    const supportedLocale = preferredLocales.find(function(locale) {
        return ["en", "es", "lt"].includes(locale)
    })
    // English will be the default language in case we don't support any of the preferred languages
    let lang = "en"
    if (supportedLocale) {
        lang = supportedLocale
    }
    document.querySelector("html").setAttribute("lang", lang)
}

setDocumentLang()