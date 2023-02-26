function submitForm() {
  var musician = document.getElementById("musician").value;
  // Add more code here to process the form submission
}

// First, define a function that retrieves an access token for the Spotify API
function getAccessToken() {
  // Replace YOUR_CLIENT_ID and YOUR_CLIENT_SECRET with your own values
  var clientId = "86cb0bec8eec441cbe481eab050ceb44";
  var clientSecret = "e83a743f54bd4e9fa4f88efa2bc9bb72";
  
  // Make a POST request to the Spotify API to retrieve an access token
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
    },
    body: "grant_type=client_credentials"
  })
  .then(response => response.json())
  .then(data => {
    // Once we've retrieved the access token, store it in a variable and call the search function
    var accessToken = data.access_token;
    searchMusician(accessToken);
  })
  .catch(error => console.error(error));
}

// Next, define a function that searches for a musician using the Spotify API
function searchMusician(accessToken) {
  var musician = document.getElementById("musician").value;
  
  // Make a GET request to the Spotify API to search for the musician
  fetch("https://api.spotify.com/v1/search?q=" + encodeURIComponent(musician) + "&type=artist&limit=1", {
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  })
  .then(response => response.json())
  .then(data => {
    // Once we've retrieved the musician's ID from the search results, call the getTopTracks function
    var artistId = data.artists.items[0].id;
    getTopTracks(artistId, accessToken);
  })
  .catch(error => console.error(error));
}

// Finally, define a function that retrieves the top tracks for the given musician and plays one at random
function getTopTracks(artistId, accessToken) {
  // Make a GET request to the Spotify API to retrieve the artist's top tracks
  fetch("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US", {
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  })
  .then(response => response.json())
  .then(data => {
    // Once we've retrieved the top tracks, choose one at random and play it using the Spotify Web Playback SDK
    var trackIndex = Math.floor(Math.random() * data.tracks.length);
    var trackUri = data.tracks[trackIndex].uri;
    
    // Replace YOUR_SPOTIFY_PLAYER_ID with the ID of your Spotify Web Playback SDK player
    var player = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: cb => { cb(accessToken); }
    });
    
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      player.pause();
      player.play({
        uris: [trackUri]
      });
      
      setTimeout(() => {
        player.pause();
      }, 5000);
    });
    
    player.connect();
  })
  .catch(error => console.error(error));
}
