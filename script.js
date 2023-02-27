// Set up the authorization flow
const clientId = "86cb0bec8eec441cbe481eab050ceb44";
const redirectUri = "https://thelastolive.github.io/callback.html";
const scope = "user-read-private user-read-email";
const state = "aAkdjAorpAltyeF";

function getAuthorizationUrl() {
  const url = "https://accounts.spotify.com/authorize";
  const query = `client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;
  return `${url}?${query}`;
}

// Define a function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  alert("Mic check, Mic check, 1, 2, 3!");
  // Get the musician name from the form input
  const musicianName = document.getElementById("musician-name").value;

  // Define a function to play a track for 5 seconds and then pause it
  function playTrack(accessToken) {
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

  // Redirect the user to the authorization page
  window.location.href = getAuthorizationUrl();

  // After the user logs in and is redirected back to the site with an access token, play the track
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const returnedState = urlParams.get("state");
  if (code && returnedState === state) {
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${clientId}&client_secret=${e83a743f54bd4e9fa4f88efa2bc9bb72}`
    })
    .then(response => response.json())
    .then(data => {
      const accessToken = data.access_token;
      playTrack(accessToken);
    })
    .catch(error => console.error(error));
  }
}

// Add an event listener to the form to handle form submission
const form = document.getElementById("musician-form");
form.addEventListener("submit", submitForm);



