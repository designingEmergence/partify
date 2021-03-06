import React from "react";
import axios from "axios";

function RenderTopTracks(props) {
  const tracks = props.tracks;
  const trackItems = tracks.map((track)=>{
    return <li>{track.name} by {track.artists[0].name}</li>
  })
  return trackItems;
}

export default class Content extends React.Component {
  state = {
    accessToken: this.props.token.access_token,
    refreshToken: this.props.token.refresh_token,
    topTracks: []
  };

  getTopTracks() {
    axios.get('/toptracks', {
      headers: { "Authorization": `Bearer ${this.state.accessToken}`}
    }).then(res => {
        this.setState({topTracks: res.data.items})
        if (this.props.sendTopTracks) {
          this.props.sendTopTracks(res.data.items);
        }
      })
  }

  componentDidMount() {
    console.log('showing content');
    this.getTopTracks();
  }
  
  render() {
    return (
      <div>
        <h3>Your top spotify tracks:</h3>
        <RenderTopTracks tracks={this.state.topTracks}></RenderTopTracks>
      </div>
    );
  } 
}