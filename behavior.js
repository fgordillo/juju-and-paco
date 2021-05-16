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

function getBrowserPreferredLocales(languages=[window.navigator.language, ...Array.from(window.navigator.languages || [])]) {
    const locales = {}

    for (let lang of languages) {
        if (/^\w{2}$/.test(lang)) locales[lang] = null

        let result = /^(\w{2})-\w{2}$/.exec(lang)
        if (result) locales[result[1]] = null
    }

    return Object.keys(locales)
}

function setDocumentLang() {
    const preferredLocales = getBrowserPreferredLocales()
    const supportedLocale = preferredLocales.find(function(locale) {
        return ["en", "es", "lt"].includes(locale)
    })
    document.querySelector("html").setAttribute("lang", supportedLocale)
}

setDocumentLang()