/* Back end logic */

var ranks = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
var suits = ["clubs", "spades", "diamonds", "hearts"];

var cardLabels = [];
var deck =[];

for (n = 0; n < 13; n++) {
  for (m = 0; m < 4; m++) {
    cardLabels.push(ranks[n] + suits[m]);
  };
};

var i = 0
ranks.forEach(function(rank) {
  suits.forEach(function(suit) {
      this[cardLabels[i]] = [rank, suit];
      deck.push(this[cardLabels[i]]);
      i ++;
  })
})

console.log(cardLabels);
console.log(deck)

/* User interface logic */
$(document).ready(function() {

});
