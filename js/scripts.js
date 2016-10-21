Parse.initialize("kVrJWXWw9AgyElS0fdAp7IVa6gsrpkr39pYac3F6", "QCplNhijebBNAkOaFQizX3SIWVmm10YJZXxpxLWb");
var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();
var firstname1= document.getElementById("firstname1").value;
var clickedTime;
var createdTime; 
var reactionTime; 
var averageArray;
var answer = '';
var clickedItem;
var myArray= new Array;
var firstNameCheck;
var gridArray = ["one","two","three","four","five","six","seven","eight","nine"];
var gridColor = ["black","blue","green","red","inherit","orange","pink","purple","gold"]

$(document).ready(function() {
	$('#sendName').on('click', function (e) {
		firstNameCheck= $("#firstname1").val();
		if (firstNameCheck == "") {
			$("#alert").removeClass("alert alert-success");
			$("#alert").addClass("alert alert-danger");
			$("#alert").text("Please Enter Name");
			$("#alert").css("display","block");
			// setTimeout("location.reload ();",1500);
		}
		else{
			$("#alert").css("display","none");
			$("p").css("display","none");
			document.getElementById("sendName").style.display="none";
		  document.getElementById("inputBox").style.display="none";
		  document.getElementById("instructions").style.display="none";
		  $(".text-center").css("display","none");
		  //progress(5, 5, $('#progressBar'));
		  setTimeout("getRandomColor()",2000);
		}
	});

	$('ul').on('click', '.span1', function(event){
		// clickedItem = $(this).closest('li').contentEditable;
		// console.log(this.id);
		if (this.id == answer) {
			clickedTime=Date.now();	 	
			reactionTime=(clickedTime-createdTime)/1000;		 	
			document.getElementById("time").style.display="block";
			myArray.push(reactionTime);
			console.log(myArray);
			document.getElementById("time").innerHTML="<ul><li>"+reactionTime+"</li></ul>";     
			$(".btn.span1").css("visibility","hidden");
			scoreboard();
		}
		else{
			$(".btn.span1").css("visibility","hidden");
			wrong();
			setTimeout(function() {
				getRandomColor();
			}, 1000);
			
		}

  });
})

function getRandomColor() {
 	shuffle(gridColor);
 	shuffle(gridArray);
 	$("#alert").css("display","none");
 	$(".btn.span1").css("visibility","hidden");
 	for (var i = 0; i < gridColor.length; i++ ) {
 		color = gridColor[i];
 		grid = gridArray[i];
 		document.getElementById(grid).style.backgroundColor=color;
 		if (color=="black") {
 			answer = grid;
 		}
 	}
	//return color;
	$(".btn.span1").css("visibility","visible");
	createdTime=Date.now();
}

function scoreboard(){
	if (myArray.length==10) {
    var sum = 0;
    for( var i = 0; i < myArray.length; i++ ){
	    sum += myArray[i];
      var avg = sum/myArray.length;
    }
    if (avg <=.19999999999) {
    	document.getElementById("alert").className="alert alert-info"
      document.getElementById("alert").style.display="block";
      document.getElementById("alert").innerHTML="Your time is: " + avg +" We think you cheated, Try again.";
      setTimeout("location.reload();",3000);
    }
    else{
	    gameScore.set("score", avg);
	    gameScore.set("playerName", document.getElementById("firstname1").value);
	    gameScore.set("sum", sum);
	    $("#time").css("display","none");
	    $("#alert").addClass("alert alert-info");
      $("#alert").css("display","block");
      $("#alert").css("visibility","visible");
      $("#alert").text("Your time is: " + avg);
	    gameScore.save(null, {
	      success: function(gameScore) {
	      //alert('Your time is: ' + avg);
	      setTimeout("location.reload ();",3000);
	      //location.reload ();
	      },
	      error: function(gameScore, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
	      alert('Failed to create new object, with error code: ' + error.message);
	      }
	    });
		  }
  }
  else
  {
    getRandomColor();
  }
}

function wrong(){
	$("#alert").css("display","block");
	$("#alert").removeClass("alert alert-success")
	$("#alert").addClass("alert alert-danger")
  $("#alert").text("Wrong Tile");
  $("#alert").css("visibility","visible");
}

function shuffle(array)
{
  var m = array.length, t, i;
  while (m > 0) 
  {
	i = Math.floor(Math.random() * m--);
	t = array[m];
	array[m] = array[i];
	array[i] = t;
  }
  return array;
}
