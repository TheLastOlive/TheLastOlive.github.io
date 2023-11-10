const button = document.getElementById("button");
const result = document.getElementById("result");
button.addEventListener("click", analyze);
function analyze(){
  button.remove();
  displayNextMessage(1);
}

function displayNextMessage(num){
  setTimeout(() => displayNextMessage(num + 1), 2000);
  switch(num){
    case 1:
      result.innerHTML = "Analyzing data...";
      break;
    case 2:
      result.innerHTML = "Examining facial structure...";
      break;
    case 3:
      result.innerHTML = "Selling data to Estonian Government...";
      break;
    case 4:
      result.innerHTML = "I mean, analyzing data...";
      break;
    case 5:
      result.innerHTML = "Huh. That's crazy.";
      break;
    case 6:
      result.innerHTML = "I've examined your data, and it really seems like...";
      break;
    case 7:
      result.innerHTML = "No, it can't be!";
      break;
    case 8:
      result.innerHTML = "IT IS! IT'S YOUR BIRTHDAY!!!";
      break;
    case 9:
      result.innerHTML = "Happy birthday, Tommy Boy";
      break;
    case 10:
      result.innerHTML = "I actually got you something, you know.";
      break;
    case 11:
      result.innerHTML = "One second...";
      break;
    case 12:
      result.innerHTML = "It's definitely back here somewhere...";
      break;
    default:
      result.innerHTML = "TADA! Here you are, my friend. Hope you enjoy.";
      break;
  }
}
