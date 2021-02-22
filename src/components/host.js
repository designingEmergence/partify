import React from "react";
import axios from "axios";
import Login from './login.js'
import Content from './content.js'

export default class Host extends React.Component {
  state = {
    authorized:false,
    token: null,
    listening: false
  };
  componentDidMount() {
    console.log('showing host')
    this.parseAccessToken(window.location.hash);
    this.connectToTrackListener();
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
    if(parsedToken.access_token) {
      this.setState({token:parsedToken, authorized:true});
    }
    window.location.hash = '';
  };
  connectToTrackListener(){
    if(!this.state.listening){
      console.log('connecting to listener');
      const events = new EventSource('http://localhost:62347/events');
      events.onmessage = (event) => {
        console.log(event.data);
      }
      this.setState({listening:true});
    }
  }

  render() {
    return (
      <div>
        {this.state.authorized? 
        <Content
          token={this.state.token}
        ></Content> : <Login host={true} />}
      </div>
    );
  } 
}