console.log("HI");
getArtistUrl = "thelastolive.pythonanywhere.com/get-list-of-artists/Dance-gavin-dance/10";

var artistName = prompt("Enter the artist name: ");

var response;

let possible_artists = await fetch(getArtistUrl);

console.log(possible_artists[0]['name'])