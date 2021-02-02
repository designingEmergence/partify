import React from "react";
import axios from "axios";
import Login from './login.js'


export default class Guest extends React.Component {
  state = {
    authorized:false,
    token: null
  };
  componentDidMount() {
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

  render() {
    return (
      <Login></Login>
    );
  } 
}