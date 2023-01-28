//lettres
let lettres = "abcdefghijklmnopqrstuvwxyz";
//get array form letter
let letterArray = Array.from(lettres);
//Select letter from Container
let letterContainar = document.querySelector(".letters");
//generat letter
letterArray.forEach((letter) => {
  //create span to add letter in it
  let span = document.createElement("span");
  //create letter text node
  let theLetter = document.createTextNode(letter);
  //append the letter to the span
  span.appendChild(theLetter);
  //add classname to the span
  span.className = "letter-box";
  //append the span to the letter container
  letterContainar.appendChild(span);
});
//Object of Words+Categories
const words = {
  programming: [
    "php",
    "javas cript",
    "scala",
    "fortrant",
    "my sql",
    "r",
    "python",
  ],
  movies: [
    "predtige",
    "inception",
    "parasite",
    "intersteller",
    "whiplash",
    "memento",
    "coco",
    "uP",
  ],
  people: [
    "albert Einstein",
    "hitchcoch",
    "alexander",
    "cleopatra",
    "mahatma ghandi",
  ],
  countries: ["syria", "palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
//let random properties
let allkeys = Object.keys(words);

//random number of properties between length of the allkes[0-3]
//Math.random() return random number less than 1
//Math.trunc() return number without division number
let randomPropertiesNumber = Math.trunc(Math.random() * allkeys.length); //0 or 1 or 2or 3

//random  properties name  from random of [randomPropertiesNumber]
let randomPropertiesName = allkeys[randomPropertiesNumber]; //programming or people or movies or countries

//random  properties values  of the random of [randomPropertiesNeme]
let randomPropertiesValue = words[randomPropertiesName]; //["syria", "palestine",... ] or any one
//random number of value between length of the [randomPropertiesValue] [0-6]or[0-7]or[0-5]or[0-5]
let randomValueNumber = Math.trunc(
  //the choosen word
  Math.random() * randomPropertiesValue.length
);
// console.log(randomPropertiesValue);
// console.log(randomValueNumber);

//Choosen word
let randomValueValue = randomPropertiesValue[randomValueNumber];
// console.log(randomPropertiesValue);
// console.log(randomValueNumber);
// console.log(randomValueValue);
//set Catogery info
document.querySelector(".game-info span").innerHTML = randomPropertiesName;

//select letter gues element
let letterguessContainer = document.querySelector(".letters-guess");

//convert choosen word to array
let letterandSpace = Array.from(randomValueValue);
// console.log(letterandSpace);

// let letterandSpace = [...randomValueValue];
letterandSpace.forEach((letter) => {
  //create Empty Sapn
  let emptySpan1 = document.createElement("span");
  //if letter is space
  if (letter === " ") {
    //add class to span
    emptySpan1.className = "have-space";
  }
  //appen span to the letter gues element
  letterguessContainer.appendChild(emptySpan1);
});

//select span from guesspan [querySelectorAll] to return all Character
let guesspans = document.querySelectorAll(".letters-guess span");
// console.log(guesspans);

//the couner of wrong clicked letter
let wrongAttemptsletter = 0;
let countOfSuccess = 0;
let theDraw = document.querySelector(".hungman-draw");

//Handle clicking on letters and you should write it in the [spans]
document.addEventListener("click", (e) => {
  //let the status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    //Get clicked letter
    // let clickedletter = document.querySelector(".clicked");
    let clickedletter = e.target.innerHTML.toLowerCase();
    // console.log(clickedletter);

    //the choosen word in new variable
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    // console.log(theChosenWord);

    theChosenWord.forEach((wordletter, wordindex) => {
      if (clickedletter === wordletter) {
        countOfSuccess++;
        // console.log(countOfSuccess);

        //convert status to True  if the person clicked a correct letter
        theStatus = true;

        // console.log(theStatus);
        // console.log(`index of clicked letter is ${wordindex}`);

        //doing loop in All guess spans
        guesspans.forEach((spancharactre, spanindex) => {
          if (wordindex === spanindex) {
            spancharactre.innerHTML = wordletter;
          }
        });
      }
    });

    // theStatus = false;
    // console.log(theStatus);false in case the letter not found
    if (theStatus !== true) {
      //doing +1 for the wrong letter[wrongAttemptsletter]
      wrongAttemptsletter++;
      //add class with name {error-${wrongAttemptsletter}}
      theDraw.classList.add(`error-${wrongAttemptsletter}`);
      //play fail sound
      document.getElementById("fail").play();
      if (wrongAttemptsletter === 8) {
        failGame();
        letterContainar.classList.add("finshed");
      }
    } else {
      successGame(countOfSuccess, wrongAttemptsletter);
      document.getElementById("success").play();

      // console.log(countOfSuccess);
    }
  }
});
var withoutspace = letterandSpace.length;
letterandSpace.forEach((lett) => {
  if (lett === " ") {
    withoutspace = letterandSpace.length - 1;
  }
});
// console.log(withoutspace);
// console.log(letterandSpace);
function failGame() {
  //craete element as a popup
  let popdiv = document.createElement("div");

  //create  the  text Node
  let popdivtext = document.createTextNode(
    `Game Over !!! Hard luck !! , The Word is :  ${randomValueValue}`
  );

  //add class to div
  popdiv.className = "popup";

  //add textNode to popdiv
  popdiv.appendChild(popdivtext);

  //add popdiv to the Body
  document.body.appendChild(popdiv);
}

function successGame(countOfSuccessf, errornum) {
  //craete element as a popup
  if (withoutspace === countOfSuccessf) {
    letterContainar.classList.add("successed");
    switch (errornum) {
      case 0:
      case 1:
      case 2:
        var popdiv = document.createElement("div");
        //create  the  text Node
        var popdivtext = document.createTextNode(
          ` Congratulation!!! You are "EXCELANT" , And The Number of Wrong letter  : ${errornum}`
        );
        //add class to div
        popdiv.className = "popupsucss";

        //add textNode to popdiv
        popdiv.appendChild(popdivtext);

        //add popdiv to the Body
        document.body.appendChild(popdiv);
        break;
      case 3:
      case 4:
        popdiv = document.createElement("div");
        //create  the  text Node
        popdivtext = document.createTextNode(
          ` Congratulation!!! You are "Very Good" , And The Number of Wrong letter  : ${errornum}`
        );
        //add class to div
        popdiv.className = "popupsucss";

        //add textNode to popdiv
        popdiv.appendChild(popdivtext);

        //add popdiv to the Body
        document.body.appendChild(popdiv);
        break;
      case 5:
      case 6:
        popdiv = document.createElement("div");
        //create  the  text Node
        popdivtext = document.createTextNode(
          ` Congratulation!!! You Are "Good" , And The Number of Wrong letter  : ${errornum}`
        );
        //add class to div
        popdiv.className = "popupsucss";

        //add textNode to popdiv
        popdiv.appendChild(popdivtext);

        //add popdiv to the Body
        document.body.appendChild(popdiv);
        break;
      default:
        popdiv = document.createElement("div");
        //create  the  text Node
        popdivtext = document.createTextNode(
          ` Congratulation!!! You Are "Accept" , And The Number of Wrong letter  : ${errornum}`
        );
        //add class to div
        popdiv.className = "popupsucss";

        //add textNode to popdiv
        popdiv.appendChild(popdivtext);

        //add popdiv to the Body
        document.body.appendChild(popdiv);
    }
  }
}
