<!DOCTYPE html>
<html lang="en">
	<head>
		<title></title>
		<!-- Specify character encoding -->
		<meta charset="utf-8">
		<!-- Add description and keywords so the page can be found -->
		<meta name="description" content="Games for your brain.">
		<meta name="keywords" content="games, brain games, fun, fun brain games, match the shape, match, shape, shapes, colors">
		<!-- import stylesheet -->
		<link rel="stylesheet" type="text/css" href="styles/stylesheet.css">
		<link rel="stylesheet" type="text/css" href="styles/materializedStyles.css">
	</head>
	<body>
		<h1>Brain Games</h1>
		<?php
			$servername = "127.0.0.1";
			$username = "root";
			$password = "mysql";

			// Create connection
			$conn = mysqli_connect($servername, $username, $password,'myDB');

			// Check connection
			if (!$conn) {
			    die("Connection failed: " . mysqli_connect_error());
			}

			echo "test $pwd for email $email";
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				$userName = $_POST["user_name"];
				$password = $_POST["password"];
				$sql = "SELECT password from table $username";

				if(is_null($email) && is_null($pwd)){

				}else{
					$email=$_COOKIE["email"];
					$pwd=$_COOKIE["password"];				
				}

			}
		?>
		<div class="container">
			<!-- Just adding stuff we can change this -->
			<div class="infoBlock">
				<h2 class="white-text">Log In</h2>
				<!-- Form -->
				<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" enctype="multipart/form-data">
					<!--User name  -->
					<div class="row">
						<div class="input-field col s12">
							<label for="textarea1" class="white-text">User Name/Email:</label>
							<input id="userName" name="user_name" type="text"></input>
						</div>
					</div>
					<!-- Password -->
					<div class="row">
						<div class="input-field col s12 white">
							<label for="password" class="white-text">Password:</label>
						 	<input id="password" type="password" name="password"></input>
						</div>
					</div>
					<!-- Buttonssssss! -->
					<div class="buttons">
						<!-- Log in / check if password matches username-->
						<input type="submit" value="Submit" name="logInSubmit" class="btn"></input>
						<!-- Sign up -->
						<a class="btn" href="subPages/sign-up.php">Sign Up!</a>
					</div>						
				</form>
				<br><br>
				<footer>
					&copy;2015 Website done by Dri, Alma and Alex
				</footer>
			</div> <!-- end of log in-->
			<div>
        </div>
		</div>  <!-- end of container -->


      <!--Import jQuery before materialize.js-->
      <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      <script type="text/javascript" src="scripts/js/bin/materialize.js"></script>
      <!-- <script type="text/javascript" src="js/myJS.js"></script> -->
	</body>
</html>