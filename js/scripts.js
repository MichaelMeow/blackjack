/* Back end logic */

var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["clubs", "spades", "diamonds", "hearts"];

function cardValue(array){
  if (array[0] == "A"){
    return 11
  }
  if (array[0] == "2"){
    return 2
  }
  if (array[0] == "3"){
    return 3
  }
  if (array[0] == "4"){
    return 4
  }
  if (array[0] == "5"){
    return 5
  }
  if (array[0] == "6"){
    return 6
  }
  if (array[0] == "7"){
    return 7
  }
  if (array[0] == "8"){
    return 8
  }
  if (array[0] == "9"){
    return 9
  }
  if (array[0] == "10" || array[0] == "J" || array[0] == "Q" || array[0] == "K"){
    return 10
  }
}

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

var dealCards = function(array, n) {
  var cards = [];
  for (i = 0; i < n; i++) {
    cards.push(array.pop());
  }
  return cards;
}

var shuffledDeck = shuffle(deck);

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
      if (card[0] == "A") {
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

  function displayHand(hand){
    if (hand == playerOneHand){
      $(".playerOne").text("");
      hand.forEach(function(card) {
        if (card[1] == "hearts"  || card[1] == "diamonds"){
          $(".playerOne").append("<span id='redCard'>" + card[0] + symbol(card[1]) + "</span>");
        } else {
          $(".playerOne").append("<span id='blackCard'>" + card[0] + symbol(card[1]) + "</span>");
        }
      })
    }
    x = 1
    if (hand == dealerHand){
      $(".dealer").text("");
      hand.forEach(function(card) {
        if (x == 1){
          if (card[1] == "hearts"  || card[1] == "diamonds"){
            $(".hole-card").append("<span id='redCard'>" + card[0] + symbol(card[1]) + "</span>");
          } else {
            $(".hole-card").append("<span id='blackCard'>" + card[0] + symbol(card[1]) + "</span>");
          }
        } else{
          if (card[1] == "hearts"  || card[1] == "diamonds"){
            $(".dealer").append("<span id='redCard'>" + card[0] + symbol(card[1]) + "</span>");
          } else {
            $(".dealer").append("<span id='blackCard'>" + card[0] + symbol(card[1]) + "</span>");
          }
        }
        x -= 1;
      })
    }
  }
  function updateTotalsDisplay() {
    $(".totals").text("Player One = " + playerHandValue);
    $(".dealer-total").text("Dealer = " + dealerHandValue);
  }

  var playerOneHand = dealCards(shuffledDeck, 2)
  var dealerHand = dealCards(shuffledDeck, 2)

  displayHand(playerOneHand)
  displayHand(dealerHand)

  var playerHandValue = handCheck(playerOneHand);
  var dealerHandValue = handCheck(dealerHand);

  updateTotalsDisplay();

  if (playerHandValue == 21) {
    $(".outcome").text("Congratulations, you win!");
    $(".card-reverse").hide();
    $(".hole-card").show();
    $(".dealer-total").show();
  } else if (dealerHandValue == 21) {
    $(".outcome").text("Sorry, the dealer wins.")
    $(".card-reverse").hide();
    $(".hole-card").show();
    $(".dealer-total").show();
  }

  $("#hit").click(function(){
    playerOneHand.push(shuffledDeck.pop());
    displayHand(playerOneHand);
    playerHandValue = handCheck(playerOneHand);
    updateTotalsDisplay();
    if (playerHandValue == "Busted") {
      $(".outcome").text("Sorry, you have busted, the dealer wins.")
      $(".card-reverse").hide();
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
      $(".card-reverse").hide();
      $(".hole-card").show();
      $(".dealer-total").show();
    } else if (playerHandValue < dealerHandValue) {
      console.log(dealerHandValue + "fourth");
      $(".outcome").text("Sorry, the dealer wins.");
      $(".card-reverse").hide();
      $(".hole-card").show();
      $(".dealer-total").show();
    } else if (playerHandValue == dealerHandValue) {
      $(".outcome").text("It's a tie, try again.");
      $(".hole-card").show();
      $(".dealer-total").show();
    }
  })
  $("#refresh").click(function(){
    location.reload(true);
  })
});
