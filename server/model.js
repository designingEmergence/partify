var allTracks = [];

var addTracks = function(tracks){
  console.log("adding", tracks.length, "tracks")
  allTracks.push(tracks);
}

module.exports= {
  addTracks
}