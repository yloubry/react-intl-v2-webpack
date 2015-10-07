import {IntlProvider, FormattedMessage, defineMessages} from 'react-intl';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const messages = defineMessages({
    plurals: {
        id: 'app.plurals.example',
        description: 'This is an example of plural, translators should use ICU formatting rules to format this message. Please refer to http://userguide.icu-project.org/formatparse/messages for more details',
        defaultMessage: "Hello {name}, you took {numPhotos, plural, =0 {no photos so far} one {one photo} other {{numPhotos} photos}}"
    },
    gender: {
        id: 'app.gender.example',
        description: 'This is an example of a message using gender, translators should use ICU formatting rules to format this message. Please refer to http://userguide.icu-project.org/formatparse/messages for more details',
        defaultMessage: "{name} is {gender,select, male{a male} other{a female}}. {gender,select, male{He} other{She}} likes using the react-intl library"
    }
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name       : 'Eric',
            numPhotos  : 0,
            gender     : 'male',
        };
    }

    render() {
        const {name, numPhotos, gender} = this.state;
        return (
            <div><h1>Example of a plural sentence</h1>
                <FormattedMessage {...messages.plurals} values={{name: name, numPhotos: numPhotos}} />
                <h1>Example of a sentence with gender</h1>
                <FormattedMessage {...messages.gender} values={{gender: gender, name: name}} />
            </div>
        );
    }
}

ReactDOM.render(
    <IntlProvider>
        <App />
    </IntlProvider>,
    document.getElementById('container')
);
