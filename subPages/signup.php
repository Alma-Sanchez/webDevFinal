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
echo "Connected successfully";
echo "<br>";

$sql = "CREATE TABLE IF NOT EXISTS mytable(email VARCHAR(30), firstname VARCHAR(30), lastname VARCHAR(30))";
mysqli_query($conn, $sql);

$email=$_POST["email"];
$first=$_POST["first"];
$last=$_POST["last"];
setcookie("email", $email);
$insert = "INSERT INTO mytable(email, firstname, lastname) VALUES ('$email', '$first', '$last');"; 
//mysqli_query($conn, $insert);
if (mysqli_query($conn, $insert)) {
    echo "login created for {$first}, {$last} ";
} else {
    echo "sql error: " . mysqli_error($conn);
}

echo "cookie is ". $_COOKIE["email"];
mysqli_close($conn);
?>