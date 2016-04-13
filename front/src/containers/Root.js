import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

export default class Root extends React.Component {
  static propTypes = {
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  getContent() {
    return (
      <Router history={ browserHistory }>
        { this.props.routes }
      </Router>
    );
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <div style={ { height: '100%', width: '100%' } }>
          { this.getContent() }
        </div>
      </Provider>
    );
  }
}