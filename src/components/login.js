import React from "react";
import axios from "axios";


export default class Login extends React.Component {
  state = {

  };
  componentDidMount() {

  };
  login() {
    console.log('login');
    axios.get('/authorize')
      .then(res => {
        console.log(res);
        window.location= res.data;
      });
  };

  render() {
    return (
      <button className="btn btn-primary" onClick={this.login}>
        Login
      </button>
    );
  } 
}