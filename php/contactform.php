<?php


if ($_POST["submit"]) {
        if (!$_POST['name']) {
		
		$error = "<br />Please enter your name";
	}

        if (!$_POST['email']) {
		
		$error =$error. "<br />Please enter your email address";
	}

        if (!$_POST['comments']) {
		
		$error =$error. "<br />Please enter a comment";
	}

       
	if ($_POST['email']!="" AND !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		
		$error =$error. "<br />Please enter valid email address";

	}

	if ($error) {
		
		$result ='<div class="alert alert-danger"> There are errors(s) in your form: ' .$error.'</div>';
	} else {

		if(mail("dominiquey@ymail.com", "Comments from website!", "Name: ".$_POST['name']."Email: ".$_POST['email']."Comments: ".$_POST['comments'])){

			$result ='<div class="alert alert-success"><strong>Thank you!</strong>I will be in touch</div>';
		}else{
			$result ='<div class="alert alert-danger">Sorry, there was an issue sending your message. Please try again later.</div>';
		}
	}

}


?>


<!DOCTYPE html>
<html>
<head>
	<title></title>



<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<style>

	.emailForm{
		border:1px solid grey;
		border-radius: 10px;
		margin-top:20px;
	}

</style>

</head>

<body>






	




<div class="container">

	<div class="row">

	<div class="col-md-6 col-md-offset-3 emailForm">
		
			<h1>My Email form</h1>
			<?php echo $result; ?>

			<form method="post">
			<div class="form-group">
				<label for="name">Your Name:</label>
				<input type="text" name="name" class="form-control" placeholder="Your Name" >
			</div>

				<div class="form-group">

					<label for="email">Email</label>
					<input type="email" name="email" class="form-control" placeholder="Your Email" >
				</div>

				<div class="form-group">
					<label for="comments">Comments:</label>
					<textarea name="comments" class="form-control" placeholder="Enter Comments here..."></textarea> 
			 	</div>


				<input type="submit" name="submit" class="btn btn-success btn-lg" value="Submit">
			</div>
	</form>

		</div>
	</div>

</div>







</body>
</html>