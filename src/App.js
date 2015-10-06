import React from 'react';
import dispatcher from './dispatcher/StorefrontDispatcher';
import { IntlProvider } from 'react-intl';

class App extends React.Component {
  triggerRouteChange = () => {
    let route = {
      location: this.props.location,
      params: this.props.params
    };

    dispatcher.actions.ContextActions.changeRoute(route);
  }

  componentDidMount() {
    this.triggerRouteChange();
  }

  componentDidUpdate() {
    this.triggerRouteChange();
  }

  render() {
    return (
      <IntlProvider>
        {this.props.children}
      </IntlProvider>
    );
  }
}

export default App;
