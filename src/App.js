import React from "react";
import axios from "axios";
import "./styles.css";
import Login from './components/login.js'
import Content from './components/content.js'

export default class App extends React.Component {
  state = {
    authorized:false,
    token: null
  };
  
  componentDidMount() {
    console.log(this.state);
    this.parseAccessToken(window.location.hash);
  };
  
  parseAccessToken(hash) {
    var parsedToken = hash
      .substring(1)
      .split('&')
      .reduce(function (init, item) {
        if (item) {
          var parts = item.split('=');
          init[parts[0]] = decodeURIComponent(parts[1]);
        }
        return init;
      }, {});
    console.log(parsedToken);
    if(parsedToken.access_token) {
      this.setState({token:parsedToken, authorized:true});
    }
    window.location.hash = '';
  }

  logout() {
    console.log('logout');
  };

  //Functional Components

  render() {
    const { users } = this.state;
    return (
      <div>
        <header>
          <h1>
            Partify
          </h1>
        </header>

        <main>
        {this.state.authorized === false && 
          <Login></Login>
        }
        {this.state.authorized &&
          <Content token={this.state.token}></Content> 
        }
        </main>
      </div>
    );
  }
}