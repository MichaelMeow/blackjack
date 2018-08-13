/* Back end logic */

var ranks = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
var suits = ["clubs", "spades", "diamonds", "hearts"];

var deck = [];

for (var i = 0; i < ranks.length; i++) {
  var rank = ranks[i];
  suits.forEach(function(suit) {
    deck.push([rank, suit]);
  });
}

/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// If we want to name the cards later
// function toDisplayName(cardArray) {
//   return cardArray[0] + 'of '
// }

var dealCards = function(array, n) {
  var cards = [];
  for (i = 0; i < n; i++) {
    cards.push(array.pop());
  }
  return cards;
}

var shuffledDeck = shuffle(deck);

function cardValue(array){
  if (array[0] == "ace"){
    return 11
  }
  if (array[0] == "two"){
    return 2
  }
  if (array[0] == "three"){
    return 3
  }
  if (array[0] == "four"){
    return 4
  }
  if (array[0] == "five"){
    return 5
  }
  if (array[0] == "six"){
    return 6
  }
  if (array[0] == "seven"){
    return 7
  }
  if (array[0] == "eight"){
      return 8
  }
  if (array[0] == "nine"){
    return 9
  }
  if (array[0] == "ten"){
    return 10
  }
  if (array[0] == "jack"){
    return 10
  }
  if (array[0] == "queen"){
    return 10
  }
  if (array[0] == "king"){
    return 10
  }
}

function handValue(hand) {
  var total = 0;
  hand.forEach(function (card) {
    total = total + cardValue(card);
  })
  return total;
}

function symbol(suit){
  if (suit == "spades"){
    return "&spades;"
  }
  if (suit == "clubs"){
    return "&clubs;"
  }
  if (suit == "diamonds"){
    return "&diams;"
  }
  if (suit == "hearts"){
    return "&hearts;"
  }
}

function handCheck(hand){
  var total = handValue(hand);
  var aceCount = 0;
  if (total <= 21) {
    return total;
  } else {
    hand.forEach(function(card) {
      if (card[0] == "ace") {
        aceCount = aceCount + 1;
      }
      console.log(total + "ace count done");
    });
    while (total > 21) {
      console.log("while loop start");
      if (aceCount > 0) {
        total = total - 10;
        console.log(total);
        aceCount = aceCount - 1;
        if (total <=21){
          return total;
        }
      }
      else if (aceCount == 0) {
        console.log(total + "busted");
        total = 0;
        return "Busted";
      }

    };
  }
}



/* User interface logic */


$(document).ready(function() {

  var playerOneHand = dealCards(shuffledDeck, 2)
  var dealerHand = dealCards(shuffledDeck, 2)


  function displayHand(hand){
    if (hand == playerOneHand){
      $(".playerOne").text("");
      hand.forEach(function(card) {
        $(".playerOne").append(card[0] + symbol(card[1]));
      })
    }
    x = 1
    if (hand == dealerHand){
      $(".dealer").text("");
      hand.forEach(function(card) {
        if (x == 1){
        $(".hole-card").append(card[0] + symbol(card[1]));
      } else{
      $(".dealer").append(card[0] + symbol(card[1]));
    }
      x -= 1;
      })
    }
  }

  displayHand(playerOneHand)
  displayHand(dealerHand)

  var playerHandValue = handCheck(playerOneHand);
  var dealerHandValue = handCheck(dealerHand);

  function updateTotalsDisplay() {
    $(".totals").text("Player One = " + playerHandValue);
    $(".dealer-total").text("Dealer = " + dealerHandValue);
  }

  updateTotalsDisplay();

  if (playerHandValue == 21) {
    $(".outcome").text("Congratulations, you win!");
    $(".hole-card").show();
    $(".dealer-total").show();
  } else if (dealerHandValue == 21) {
    $(".outcome").text("Sorry, the dealer wins.")
    $(".hole-card").show();
    $(".dealer-total").show();
  }
// playerOneHand.push(dealCards(shuffledDeck, 1))
//   while (gameOver = 0) {
    $("#hit").click(function(){
      playerOneHand.push(shuffledDeck.pop());
      displayHand(playerOneHand);
      playerHandValue = handCheck(playerOneHand);
      updateTotalsDisplay();
      if (playerHandValue == "Busted") {
        $(".outcome").text("Sorry, you have busted, the dealer wins.")
        $(".hole-card").show();
        $(".dealer-total").show();
      }
    })

    $("#stand").click(function() {
      console.log(dealerHandValue + "zero");
      if (dealerHandValue < 17 && dealerHandValue <= playerHandValue) {
        console.log(dealerHandValue + "first");
        while (dealerHandValue < 17) {
          console.log(dealerHandValue + "second");
        dealerHand.push(shuffledDeck.pop());
        displayHand(dealerHand);
        dealerHandValue = handCheck(dealerHand);
        updateTotalsDisplay();
        }
      }
      if (playerHandValue > dealerHandValue || dealerHandValue == "Busted") {
        console.log(dealerHandValue + "third");
        $(".outcome").text("Congratulations, you win!");
        $(".hole-card").show();
        $(".dealer-total").show();
      } else if (playerHandValue < dealerHandValue) {
        console.log(dealerHandValue + "fourth");
        $(".outcome").text("Sorry, the dealer wins.");
        $(".hole-card").show();
        $(".dealer-total").show();
      } else if (playerHandValue == dealerHandValue) {
        $(".outcome").text("It's a tie, try again.");
        $(".hole-card").show();
        $(".dealer-total").show();
      }
    })


    // })
    console.log(playerOneHand);



});
