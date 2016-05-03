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
		<link rel="stylesheet" type="text/css" href="../styles/stylesheet.css">
		<link rel="stylesheet" type="text/css" href="../styles/materializedStyles.css">
	</head>
	<body>
		<!-- 
			validate form
		 -->
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

			// include 'signup-submit.php';
			$first_name = $last_name = $email = $age = $gender = $password = $retypePassword = " ";
			$error = " ";
			/*Patterns to check for */
			$namePattern = "([A-Z]([\']?)([a-z]?)([A-Z]?)[a-z]+)";
			$emailPattern = '([a-z0-9]+\@[a-z]{3,5}\.[a-z]{3})';
			$agePattern = '([0-9])';
			// {1,2}){1}'
			$genderPattern = '([A-Z]*[a-z]+)';

			$filledOut = 0;

				if ($_SERVER["REQUEST_METHOD"] == "POST") {
							// check first name
					if(empty($_POST["first_name"]) || !preg_match($namePattern, $_POST["first_name"])){
						$error .= "Please enter or correctly type your name. <br>";
					}	else{
						$filledOut++;
						$first_name = $_POST['first_name'];
					}
					// check last name
					if(empty($_POST["last_name"]) || !preg_match($namePattern, $_POST["last_name"])){
						$error .= "Please enter or correctly type your name. <br>";
					}	else{
						$filledOut++;
						$last_name = $_POST['last_name'];
					}	

					// check gender
					if(empty($_POST["gender"])|| !preg_match($genderPattern, $_POST["gender"])){
						$error .= "Please correclty enter a gender<br>";
					}else{
						$gender = $_POST["gender"];
						$filledOut++;
					}

					// Check to make sure we have an age
					if(empty($_POST["age"]) || !preg_match($agePattern, $_POST["age"]))
					{
						$error .= "Please tell us your age <br>";
					}else{
						$age = $_POST['age'];
						$filledOut++;		
					}
					// password
					if(empty($_POST["password"])){
						$error .= "Please enter a password.<br>";
					}else{
						$filledOut++;		
						$password = $_POST["password"];
					}
					if(empty($_POST["retypePassword"]) || $password === $_POST["retypePassword"]){
						$error .= "Please enter same password.<br>";
					}else{
						$filledOut++;		
						$retypePassword = $_POST["retypePassword"];
					}
				}
					if(5 <= $filledOut ){
						//echo "Added user succesfully";

						$sql = "CREATE TABLE IF NOT EXISTS mytable(email VARCHAR(30), firstname VARCHAR(30), lastname VARCHAR(30))";
						mysqli_query($conn, $sql);

						$email=$_POST["email"];
						$first=$_POST["first_name"];
						$last=$_POST["last_name"];
						setcookie("email", $email,0,'/');
						$insert = "INSERT INTO mytable(email, firstname, lastname) VALUES ('$email', '$first', '$last');"; 
						setcookie("password",$password,0,'/');
						//mysqli_query($conn, $insert);
						if (mysqli_query($conn, $insert)) {
						    echo "Welcome back, {$first} {$last} ";
							} else {
						    echo "sql error: " . mysqli_error($conn);
							}
						// echo "cookie is ". $_COOKIE["email"];
						mysqli_close($conn);
						header('Location: ../index.php?');
					 }
		?>
		<div class="container">
		<br><br><br><br>
				<div class="infoBlock col s13">
				<h2 class="white-text">Create an account today!</h2>
				<!-- Form -->
				<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" enctype="multipart/form-data">
					<span class="error"><?php print_r($error);?></span>

					<!-- Name -->
					<!-- first -->
					<div class="row">
						<div class="input-field col s5">
							<label for="textarea1" class="white-text">First Name:</label>
							<input id="userName" name="first_name" type="text"></input>
						</div>
						<!-- Last -->
						<div class="input-field col s6">
							<label for="textarea1" class="white-text">Last Name:</label>
							<input id="userName" name="last_name" type="text"></input>
						</div>
					</div>
	
					<!-- Email -->
					<div class="row">
						<div class="input-field col s11 white">
							<label class="white-text">Email: <span class="required">*</span></label>
						 	<input type="text" name="email"></input>
						</div>
					</div>

					<!-- Age -->
					<div class="row">
						<div class="input-field col s6">
							<label class="white-text">Age: <span class="required">*</span></label>
							<input type="text" name="age"></input>
						</div>

					<!-- Gender -->
					<div class="row">
						<div class="input-field col s5">
							<label class="white-text">Gender: <span class="required">*</span></label>
						 	<input type="text" name="gender"></input>
						</div>
					</div>
					<!-- Password -->
					<div class="row">
						<div class="input-field col s11">
							<label for="password" class="white-text">Password: <span class="required">*</span></label>
						 	<input id="password" type="password" name="password"></input>
						</div>
					</div>
					<!-- Retype password -->
					<div class="row">
						<div class="input-field col s11 white">
							<label class="white-text">Retype Password: <span class="required">*</span></label>
						 	<input type="password" name="retypePassword"></input>
						</div>
					</div>
					<div class="smallBtn">
						<input type="submit" value="Sign Up" class="btn"></input>
					</div>
			</form>
		</div>
	
		<footer>
			&copy;2015 Website done by Dri, Alma and Alex
		</footer>
		
      <!--Import jQuery before materialize.js-->
      <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      <script type="text/javascript" src="../scripts/js/bin/materialize.js"></script>
      <!-- <script type="text/javascript" src="js/myJS.js"></script> -->
	</body>
</html>