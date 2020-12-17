import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Subscribe from './Subscribe';
import Unsubscribe from './Unsubscribe';
import Home from './Home';
import Notification from './Notification';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/subscribe">
          <Subscribe />
        </Route>
        <Route path="/unsubscribe">
          <Unsubscribe />
        </Route>
        <Route path="/alreadySubscribed">
          <Notification
            title="Sorry"
            dialog="It looks like that phone number is already subscribed to receive updates. You can subscribe for a different zip code if you'd like. Thanks!"
          />
        </Route>
        <Route path="/notSubscribed">
          <Notification
            title="Sorry"
            dialog="It looks like that phone number is not currently subscribed."
          />
        </Route>
        <Route path="/error">
          <Notification
            title="Sorry"
            dialog="We are currently not able to process that request. Please try again later. Thanks."
          />
        </Route>
      </Switch>
      <Home />
    </Router>
  );
}
