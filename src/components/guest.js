import React from "react";
import axios from "axios";
import Login from './login.js'
import Content from './content.js'


export default class Guest extends React.Component {
  state = {
    authorized:false,
    token: null,
    topTracks: null
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
    if(parsedToken.access_token) {
      this.setState({token:parsedToken, authorized:true});
    }
    window.location.hash = '';
  }

  submit() {
    console.log('submit tracks to host')
    axios.post('/guestTracks', this.state.topTracks)
      .then(res => console.log(res))
  }

  getTopTracks = (data) =>{
    this.setState({topTracks:data})
    console.log(this.state.topTracks);
  }

  //functional component

  render() {
    return (
      <div>
        {this.state.authorized?
        <div>
          <Content
            token={this.state.token}
            sendTopTracks = {this.getTopTracks}
          ></Content>
          <h3>Submit tracks to host</h3>
          <button className="btn btn-primary" onClick={this.submit.bind(this)}>
            Submit
          </button>
        </div> :
        <Login host={false}/> }

      </div>
    );
  } 
}