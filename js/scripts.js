Parse.initialize("kVrJWXWw9AgyElS0fdAp7IVa6gsrpkr39pYac3F6", "QCplNhijebBNAkOaFQizX3SIWVmm10YJZXxpxLWb");
var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

var reaction = {
	user : {
		first : "",
		last : "",
		highestScore : 0
	},
	firstname1 : "",
	clickedTime : null,
	createdTime : null,
	reactionTime : null,
	averageArray : null,
	answer : "",
	clickedItem : null,
	myArray : [.3,.3,.3,.3,.3,.3,.3,.3],
	firstNameCheck : null,
	gridArray : ["one","two","three","four","five","six","seven","eight","nine"],
	gridColor : ["black","blue","green","red","inherit","orange","pink","purple","gold"],
	getRandomColor : function(){
		var self = this;

		self.shuffle(self.gridColor);
		self.shuffle(self.gridArray);

		$("#alert").removeClass("on").addClass("off");

		$(".btn.span1").addClass("visibilityOff");
		for (var i = 0; i < self.gridColor.length; i++ ) {
			var color = self.gridColor[i];
			var grid = self.gridArray[i];
			$("#" + grid).css("background",color);

			if (color=="black") {
				self.answer = grid;
			}
		}
			//return color;
			$(".btn.span1").removeClass("visibilityOff").addClass("visibilityOn");
			self.createdTime=Date.now();
		},
		submitName : function(){
			var self= this;
			self.firstname1 = $('#firstname1').val();
			

			self.firstNameCheck = self.firstname1;
			if (self.firstNameCheck == "") {
				var $alert = $("#alert");

				$alert.removeClass("alert alert-success").
				removeClass("off").
				addClass("alert alert-danger").
				text("Please Enter Name").
				addClass("on");
				// setTimeout("location.reload ();",1500);
				return;
			}
			
			self.user.first = self.firstname1;
			self.saveUser();

			$("#alert").addClass("off");
			$("p").addClass("off");
			$("#sendName").addClass("off");
			$("#inputBox").addClass("off");
			$("#instructions").addClass("off");
			$(".text-center").addClass("off");
			//progress(5, 5, $('#progressBar'));
			setTimeout(self.getRandomColor(),2000);
		},
		clickedSquare : function(tile){
			var self = this;
			// clickedItem = $(this).closest('li').contentEditable;
			// console.log(this.id);
			if (tile.id == self.answer) {
				self.clickedTime=Date.now();	 	
				self.reactionTime=(self.clickedTime-self.createdTime)/1000;		 	
				$("#time").addClass("on");
				self.myArray.push(self.reactionTime);
				console.log(self.myArray);
				$("#time").html("<ul><li>"+self.reactionTime+"</li></ul>");     
				$(".btn.span1").removeClass("visibilityOn").addClass("visibilityOff");
				self.scoreboard();
			}
			else{
				$(".btn.span1").removeClass("visibilityOn").addClass("visibilityOff");
				self.wrong();
				setTimeout(function() {
					self.getRandomColor();
				}, 1000);
			}

			self.saveUser(self.user);
		},
		scoreboard : function(){
			var self = this;
			var $alert = $("#alert");
			if (self.myArray.length==10) {
				var sum = 0;
				for( var i = 0; i < self.myArray.length; i++ ){
					sum += self.myArray[i];
					var avg = sum/self.myArray.length;
				}
				if (avg <=.19999999999) {
					$alert.addClass("alert alert-info");
					$alert.addClass("on");
					$alert.html("Your time is: " + avg +" We think you cheated, Try again.");
					setTimeout(location.reload(),3000);
				}
				else{
					gameScore.set("score", avg);
					gameScore.set("playerName", self.firstname1);
					gameScore.set("sum", sum);
					$("#time").addClass("off").
					removeClass("on").;
					$alert.addClass("alert alert-info").
					addClass("on").
					removeClass("off").
					addClass("visibilityOn").
					text("Your time is: " + avg);
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
				self.getRandomColor();
			}
		},
		wrong : function(){
			var $alert = $("#alert");
			$alert.addClass("on").
			removeClass("off").
			removeClass("alert alert-success").
			addClass("alert alert-danger").
			text("Wrong Tile").
			addClass("visibilityOn");
		},
		shuffle : function(array){
			var m = array.length, t, i;
			while (m > 0) 
			{
				i = Math.floor(Math.random() * m--);
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}
			return array;
		},
		saveUser : function(){
			var self = this;
			// Put the object into storage
			localStorage.setItem('reaction', JSON.stringify(self.user));
		},
		getUser : function(){
			// Retrieve the object from storage
			var user = localStorage.getItem('reaction');
			return JSON.parse(user);
		},
		init: function(){
			var self = this;

			var user = self.getUser();

			//Load user Information from storage
			if(user != null){
				self.user = user;
				firstname1 = self.user.first;
				$("#firstname1").val(self.user.first);
			}


			$('#sendName').on('click', function (e) {
				self.submitName();
			});

			$('ul').on('click', '.span1', function(event){
				var tile = this;
				self.clickedSquare(tile);
			});

		}
	};


	reaction.init();



