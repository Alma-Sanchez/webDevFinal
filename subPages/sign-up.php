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
		<div class="container">
		<br><br><br><br>
			<form>
				<div class="infoBlock col s13">
				<h2 class="white-text">Create an account today!</h2>
				<!-- Form -->
				<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" enctype="multipart/form-data">
					<!-- Name -->
					<div class="row">
						<div class="input-field col s5">
							<label for="textarea1" class="white-text">First Name:</label>
							<input id="userName" name="user_name" type="text"></input>
						</div>
						<div class="input-field col s6">
							<label for="textarea1" class="white-text">Last Name:</label>
							<input id="userName" name="user_name" type="text"></input>
						</div>
					</div>
					<!-- Email -->
					<div class="row">
						<div class="input-field col s11 white">
							<label for="password" class="white-text">Email<span class="required">*</span></label>
						 	<input id="password" type="password"></input>
						</div>
					</div>

					<!-- Age -->
					<div class="row">
						<div class="input-field col s6">
							<label for="textarea1" class="white-text">Age:</label>
							<select>
								<?php
									for($i=18; $i<=79;$i++){
										print_r("<option name='age' value='$i'>$i</option>");
									}
								?>
							</select>
						</div>

					<!-- Gender -->
					<div class="row">
						<div class="input-field col s5 white">
							<label for="password" class="white-text">Gender</label>
						 	<input id="password" type="password"></input>
						</div>
					</div>

					<!-- Password -->
					<div class="row">
						<div class="input-field col s11 white">
							<label for="password" class="white-text">Password:<span class="required">*</span></label>
						 	<input id="password" type="password"></input>
						</div>
					</div>

					<div class="row">
						<div class="input-field col s11 white">
							<label for="password" class="white-text">Retype Password:</label>
						 	<input id="password" type="password"></input>
						</div>
					</div>

					<div class="buttons">
						<input type="submit" value="Submit" name="logInSubmit" class="btn"></input>
						<input type="button" value="Sign Up" class="btn"></input>
					</div>
			</form>
		</div>
	</body>
</html>