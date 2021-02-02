import React from "react";
import axios from "axios";


export default class Login extends React.Component {
  state = {
    authorizeURL : ''
  };
  componentDidMount() {
    console.log('showing login')
    if(this.props.host){
      this.setState({authorizeURL: '/authorize'});
    }
    else {
      this.setState({authorizeURL: '/authorizeGuest'});
    }
  };
  login() {
    const url = this.state.authorizeURL
    axios.get(url)
      .then(res => {
        console.log(res);
        window.location= res.data;
      });
  };

  render() {
    return (
      <button className="btn btn-primary" onClick={this.login.bind(this)}>
        Login
      </button>
    );
  } 
}