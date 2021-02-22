var allTracks = [];

var addTracks = function(tracks){
  console.log("adding", tracks.length, "tracks")
  allTracks.push(tracks);
}

var getAllTracks = function(){
  return allTracks;
}

module.exports= {
  addTracks,
  getAllTracks
}