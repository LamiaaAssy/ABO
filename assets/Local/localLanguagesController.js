import ReactNative from 'react-native';
import RNRestart from 'react-native-restart';
// Import all locales
const en = require('./en.json');
const ar = require('./ar.json');


// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(false);

//To change language to english:false ----- arabic:true
//ReactNative.I18nManager.forceRTL(true);

let AppLanguage = ""

if (ReactNative.I18nManager.isRTL) {
    AppLanguage = "ar"
}
else {
    AppLanguage = "en"
}

export function getAppLanguage() {
    return AppLanguage
}
export function isAr() {
    if (AppLanguage == "ar")
        return true
    else false
}
export const setAppLanguage = (lang, restart = false) => {
    AppLanguage = lang

    if (lang == "ar") {
        ReactNative.I18nManager.forceRTL(true);
    } else {
        ReactNative.I18nManager.forceRTL(false);
    }

    if (restart) {
        RNRestart.Restart();
    }

}




// The method we'll use instead of a regular string
export const strings = (key) => {
    const _lang = Object.assign({}, { en: en, ar: ar })
    let st = key.split('.')
    //console.log(st)
    if (st.length == 1)
        return _lang[AppLanguage][st[0]]
    else if (st.length == 2)
        return _lang[AppLanguage][st[0]][st[1]]
    else if (st.length == 3)
        return _lang[AppLanguage][st[0]][st[1]][st[2]]

}

