/// script.js
// Define a function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the musician name from the form input
  const musicianName = document.getElementById("musician-name").value;

  // Define a function to play a track for 5 seconds and then pause it
  function playTrack() {
    // Call the Spotify API to get the top tracks for the musician
    fetch(`https://api.spotify.com/v1/search?q=${musicianName}&type=artist&limit=1`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Get the top tracks for the musician
      const artistId = data.artists.items[0].id;
      return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
    })
    .then(response => response.json())
    .then(data => {
      // Play a random track from the top tracks
      const tracks = data.tracks;
      const randomIndex = Math.floor(Math.random() * tracks.length);
      const track = tracks[randomIndex];
      const audio = new Audio(track.preview_url);
      audio.play();

      // Pause the track after 5 seconds
      setTimeout(() => {
        audio.pause();
      }, 5000);
    })
    .catch(error => console.error(error));
  }

  // Get an access token for the Spotify API and then play the track
  const clientId = "86cb0bec8eec441cbe481eab050ceb44";
  const clientSecret = "e83a743f54bd4e9fa4f88efa2bc9bb72";
  let accessToken = "";
  fetch(`https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(response => response.json())
    .then(data => {
      accessToken = data.access_token;
      playTrack();
    })
    .catch(error => console.error(error));
}

// Add an event listener to the form to handle form submission
const form = document.getElementById("musician-form");
form.addEventListener("submit", submitForm);
