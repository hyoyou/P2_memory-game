/*
*** Creating the Deck ***
 *  Display the cards on the page
 *  Shuffle the list of cards using the provided "shuffle" method below
 *  Loop through each card and create its HTML
 *  Add each card's HTML to the page
*/

let deck = document.querySelector('.deck');
let symbols = ["fa-bolt", "fa-bolt",
              "fa-cube", "fa-cube",
              "fa-leaf", "fa-leaf",
              "fa-bomb", "fa-bomb",
              "fa-anchor", "fa-anchor",
              "fa-diamond", "fa-diamond",
              "fa-bicycle", "fa-bicycle",
              "fa-paper-plane-o", "fa-paper-plane-o"]

function cardHtml(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

function generateDeck() {
  let newDeck = shuffle(symbols).map(function(card) {
    return cardHtml(card);
  })

  deck.innerHTML = newDeck.join('');
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
*** Setting Up Game Play ***
 * Set up the event listener for a card. If a card is clicked:
 * Display the card's symbol (put this functionality in another function that you call from this one)
 * Add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * If the list already has another card, check to see if the two cards match
 *  - if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *  - if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *  - increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *  - if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

let openCards;
let matchedCards;
let counter;
let cards
let counterDisplay = document.querySelector('.moves');
let stars


// Match: Add cards to matchedCards array
function match() {
  matchedCards.push(openCards[0]);
  matchedCards.push(openCards[1]);
  matchedCards.forEach(function(card) {
    card.classList.add('match');
    card.classList.remove('open', 'show', 'mismatch');
  });
  incrementCounter();
  checkStars();
  openCards = [];
}

// Not a Match: Display animation and return cards back to deck
function mismatched() {
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.add('mismatch')
    });
  }, 100);
  returnToDeck()
}

function returnToDeck() {
  setTimeout(function() {
    cards.forEach(function(card) {
      card.classList.remove('open', 'show', 'mismatch')
    });
    incrementCounter();
    checkStars();
    openCards = [];
  }, 600);
}

// Increase counter after every move
function incrementCounter() {
  counter += 1;
  counterDisplay.innerText = counter;
}

// Check for a match when there are 2 cards in openCards array
function checkMatch() {
  if (openCards.length === 2) {
    let card1 = openCards[0].querySelector('i').classList.value;
    let card2 = openCards[1].querySelector('i').classList.value;

    if (card1 === card2) {
      match();
    } else {
      mismatched();
    }
  }
}

// Remove stars after certain number of plays
function checkStars() {
  if (counter === 24) {
    stars.removeChild(stars.childNodes[1]);
  } else if (counter === 12) {
    stars.removeChild(stars.childNodes[0]);
  }
}

// Declare winner when all cards matched
function winner() {
  if (matchedCards.length === 16) {
    // show modal
  }
}

// Add 'open' and 'show' classes to cards when flipped
function openCard(card) {
  if (openCards.length < 2 && !card.classList.contains('open') && !card.classList.contains('match')) {
    openCards.push(card);
    card.classList.add('open', 'show');

    checkMatch();
    winner();
  }
}

// Remove/Add stars on restartGame
function resetStars() {
  while (stars.firstChild) {
    stars.removeChild(stars.firstChild);
  }
  for (let i = 0; i < 3; i++) {
    let li = document.createElement('li');
    li.innerHTML = `<i class="fa fa-star">&nbsp;</i>`
    stars.appendChild(li);
  }
}

function initialize() {
  generateDeck();
  cards = document.querySelectorAll('.card')
  addEventListener();
  openCards = [];
  matchedCards = [];
  counter = 0;
  counterDisplay.innerText = counter;
  stars = document.querySelector('.stars');
  resetStars();
}

function restartGame() {
  initialize()
}

initialize();

// Event Listeners
function addEventListener() {
  cards.forEach(function(card) {
    card.addEventListener('click', function(event) {
      openCard(card);
    })
  })
}

let replay = document.querySelector('.restart');
replay.addEventListener('click', function(event) {
  restartGame();
});
