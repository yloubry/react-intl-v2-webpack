import {IntlProvider, FormattedMessage, FormattedDate, FormattedTime, FormattedRelative, FormattedNumber, defineMessages} from 'react-intl';
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

var Root = React.createClass({
  render: function() {
    return (
      <IntlProvider locale={window.App.locale} messages={window.App.messages}>
        <App />
      </IntlProvider>
    );
  }
});


class PluralSelect extends Component {
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

class Numbers extends Component {
    render() {
        return (
            <div>
            <h1>Example of a formatted numbers</h1>
            <ul>
                <li><FormattedNumber value={123456789} /></li>
                <li><FormattedNumber value={0.9} style="percent" /></li>
                <li>
                    <FormattedNumber
                        value={99.95}
                        style="currency"
                        currency="USD" />
                </li>
            </ul>
            </div>
        );
    }
}

class DateTime extends Component {
    render() {
        var postDate    = Date.now() - (1000 * 60 * 60 * 48);
        var commentDate = Date.now() - (1000 * 60 * 60 * 0.5);
        var meetingDate = Date.now() + (1000 * 60 * 60 * 1);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
        return (
            <div>
            <h1>Example of a date & time formatting</h1>
            <ul>
                <li>Today:&nbsp;
                    <FormattedDate
                        value={new Date()}
                        day="numeric"
                        month="short"
                        year="numeric" />
                </li>
                <li>
                    <FormattedTime
                    value={new Date()} 
                    minute="numeric"
                    hour="numeric"
                    second="numeric" /></li>
                <br/>
                <h2>Support for time relative</h2>
                <li><FormattedRelative value={postDate} /></li>
                <li><FormattedRelative value={commentDate} /></li>
                <li><FormattedRelative value={meetingDate} /></li>
            </ul>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
            <PluralSelect />
            <Numbers />
            <DateTime locale="fr-FR" />
            </div>
        );
    }
}

ReactDOM.render(<Root /> ,document.getElementById('container'));
