const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missedHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый +++
  let divSelector = randomDivId();
  $(".game-field").removeClass("target miss");
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером +
  $(".target").text(hits);
  $("#button-start").hide();
  // FIXME: тут надо определять при первом клике firstHitTime +++
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала +++
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  let score = hits - missedHits;
  $("#total-score").text(score);
  $("#win-message").removeClass("d-none");
  $("#button-start").hide();
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? +++
  $(".game-field").text("");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss +++
  else if ($(event.target).not("target")){
    $(this).addClass("miss");
    $(this).text("мимо");
      ++missedHits
 }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    firstHitTime = Date.now();
    round();
});
  $(".game-field").click(handleClick);
  $("#button-reload").click(function(round) {
    location.reload();
  });
}

$(document).ready(init);
