// Variable declarations
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();
var started = true;
var level = 0;

// Click event for the buttons
$(".btn").click(function(){
  var userChosenColor =  $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//Keypress event
$(document).keypress(function(event){
  if(started)
  {
    started = false;
    $("#level-title").text("Level "+level);
    nextSequence();
  }
})

// Function used to create a new sequence
function nextSequence(){
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;
  $("#level-title").text("Level "+level);

  //Adding the animation effect to the buttons
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

// Function used to play sound in nextSequence and when the user clicks a button
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function used to add Animations to User Clicks
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100)
}

// Function used to determine the correctness of user clicks
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


//Function used to restart the game
function startOver()
{
  level = 0;
  gamePattern = [];
  started = true;
}
