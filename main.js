const button = document.getElementById("button");
const display = document.getElementById("result");
button.addEventListener("click", analyze);

function analyze() {
  button.remove();
  displayNextMessage(1);
}

function displayNextMessage(num) {
  setTimeout(() => displayNextMessage(num + 1), 2000);
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
      break;
  }
}
