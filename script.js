const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.dataset.id = count;
    newDiv.dataset.state = "hidden";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

let click = 1;
let previousId;
let previousColor;

function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  if (event.target.dataset.state == "permRevealed" || event.target.dataset.state == "revealed") {
    console.log("You already clicked that! Please click another!")
  }
  else {
    if (click == 1) {
      previousId = event.target.dataset.id;
      previousColor = event.target.className;
      event.target.dataset.state = "revealed";
      console.log("You just clicked", event.target.className);
      console.log("Click another card to match");
      click++;
    }
    else if (click == 2) {
      if (previousColor == event.target.className) {
        console.log("You just clicked", event.target.className);
        console.log("It's a match!");
        document.querySelector(`[data-id='${previousId}']`).dataset.state = "permRevealed";
        event.target.dataset.state = "permRevealed";
        click = 1;
      }
      else {
        event.target.dataset.state = "revealed";
        console.log("You just clicked", event.target.className);
        console.log("It's not a match! Please try again!");
        click++;
        setTimeout(function () {
          event.target.dataset.state = "hidden";
          document.querySelector(`[data-id='${previousId}']`).dataset.state = "hidden";
          click = 1;
        }, 1000);
      }
    }
    else if (click == 3) {
      let tooFast = document.querySelectorAll("[data-state='revealed']")
      for (let i = 0; i < tooFast.length; i++) {
        tooFast[i].dataset.state = "hidden"
      }

      click = 1;
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);