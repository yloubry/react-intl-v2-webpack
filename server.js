import express from 'express';
import {sync as globSync} from 'glob';
import {readFileSync} from 'fs';
import * as path from 'path';
import serialize from 'serialize-javascript';

const translations = globSync('./build/lang/*.json')
    .map((filename) => [
        path.basename(filename, '.json'),
        readFileSync(filename, 'utf8'),
    ])
    .map(([locale, file]) => [locale, JSON.parse(file)])
    .reduce((collection, [locale, messages]) => {
        collection[locale] = messages;
        return collection;
    }, {});

const app = express();

app.use(express.static('node_modules'));
app.use(express.static('build'));

app.get('/', (req, res) => {
    let acceptedLocale = req.acceptsLanguages();
    let supportedLocale = Object.keys(translations); //retrieves all locales found in build/lang/
    let negotiatedLocale = 'en-US'; // The default locale is en-US
    //This will lookup for a preferred locale within the application's supported ones.
    acceptedLocale.every(function (Locale) {
        if (supportedLocale.indexOf(Locale) > -1){
            negotiatedLocale = Locale;
            console.log("Your preferred supported locale is %s", negotiatedLocale)
            return false; //Important to exit on the first match as the acceptedLocale are ordered by preferrence.
        }
        else return true;
    });
    let locale   = req.query.locale || negotiatedLocale;
    let language = locale
    let polyfillService = "https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"
    
    //Set the language so that we can load the locale-data
    if (locale.indexOf('-') !== -1)
        language = locale.split('-')[0];

    let messages = translations[locale];

    if (!messages) {
        console.log("The requested locale: %s isn't supported. Defaulting to 'en-US'", locale)
        return res.redirect('/');
        }
    else {
        console.log("The requested locale: %s is supported.", locale)
    }

    if (language !== "en")
        polyfillService = polyfillService + ",Intl.~locale." + language;
    res.send(
`
<!DOCTYPE html>
<html lang=${locale}>
<head>
    <meta charset="utf-8">
    <title>React Intl Example</title>
</head>
<body>
<div id="container"></div>
    <script>
        window.App = ${serialize({locale, messages})};
    </script>
    <script sync src=${polyfillService}></script>
    <script src="react/dist/react.min.js"></script>
    <script async src="react-intl/dist/react-intl.min.js"></script>
    <script src="react-intl/dist/locale-data/${language}.js"></script>
    
    <script src="bundle.js"></script>
</body>
</html>
`
    );
});

app.listen(8080, () => {
    console.log('React Intl Example server listening at: http://localhost:8080');
});