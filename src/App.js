import React from "react";
import axios from "axios";
import Host from "./components/host.js"
import Guest from "./components/guest.js"
import Content from "./components/content.js"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./styles.css";

export default class App extends React.Component {
  state = {
    
  };
  
  componentDidMount() {
    
  };
  
  logout() {
    console.log('logout');
  };

  //Functional Components
  Host() {
    return Host;
  }

  Guest() {
    return Guest;
  }

  Content() {
    return Content;
  }

  render() {
    return (
      <Router>
        <div>
          <h2> Partify</h2>
          <nav>
            <ul>
              <li>
                <Link to="/host">Host</Link>
              </li>
              <li>
                <Link to="/guest">Guest</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/guest">
              <Guest />
            </Route>
            <Route path="/host">
              <Host />
            </Route>
            <Route path="/content">
              <Content />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}