const button = document.getElementById("button");
const display = document.getElementById("result");
var source = document.createElement('source');
button.addEventListener("click", analyze);

function analyze() {
  button.remove();
  displayNextMessage(1);
}

function addYouTubeVideo() {
  // Replace 'VIDEO_ID' with the actual YouTube video ID
  var videoId = '0EFXkFsAv2k';

  // Create an iframe element
  var iframe = document.createElement('iframe');

  // Set the attributes for the iframe
  iframe.width = '1600';
  iframe.height = '800';
  iframe.src = 'https://www.youtube.com/embed/' + videoId;
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;

  // Append the iframe to the 'video-container' div
  document.getElementById('video-container').appendChild(iframe);
}

function displayNextMessage(num) {
  if(num < 13){
    setTimeout(() => displayNextMessage(num + 1), 2000);
  }
  switch (num) {
    case 1:
      display.innerHTML = "Analyzing data...";
      break;
    case 2:
      display.innerHTML = "Examining facial structure...";
      break;
    case 3:
      display.innerHTML = "Selling data to Estonian Government...";
      break;
    case 4:
      display.innerHTML = "I mean, analyzing data...";
      break;
    case 5:
      display.innerHTML = "Huh. That's crazy.";
      break;
    case 6:
      display.innerHTML = "I've examined your data, and it really seems like...";
      break;
    case 7:
      display.innerHTML = "No, it can't be!";
      break;
    case 8:
      display.innerHTML = "IT IS! IT'S YOUR BIRTHDAY!!!";
      break;
    case 9:
      display.innerHTML = "Happy birthday, Tommy Boy!";
      break;
    case 10:
      display.innerHTML = "I actually got you something, you know.";
      break;
    case 11:
      display.innerHTML = "One second...";
      break;
    case 12:
      display.innerHTML = "It's definitely back here somewhere...";
      break;
    default:
      new Audio("Happy Birthday.wav").play();
      display.innerHTML = "TADA! Here you are, my friend. Hope you enjoy.";
      addYouTubeVideo();
  }
}
