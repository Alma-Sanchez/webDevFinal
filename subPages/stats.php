
<?php
function resultToArray($result) {
    $rows = array();
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    return $rows;
}

// Connected to aws but not fully functional
$servername = 'dreamteamdb.crvjekystknj.us-east-1.rds.amazonaws.com';

// Create connection
$conn = mysqli_connect($servername, 'dream', 'password', '',3307);

    $username = "root";
    $password = "mysql";
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
echo "<br>";

// Create database
//$db=mysql_select_db("myDB",$conn);
$sql = "CREATE TABLE IF NOT EXISTS scores(email VARCHAR(30), score INT(30))";
mysqli_query($conn, $sql);
$score=$_POST["score"];
$email=$_COOKIE["email"];

$sql = "INSERT INTO scores(email , score) VALUES('$email','$score');";
if (mysqli_query($conn, $sql)) {
    echo "scores enterd created successfully";
} else {
    echo "sql error: " . mysqli_error($conn);
}
$select = "SELECT score from scores where email='$email'";
$result=mysqli_query($conn, $select);
if ($result) {
    echo "scores quaried successfully";
} else {
    echo "sql error: " . mysqli_error($conn);
}
// $result = $scores->fetch_assoc();
$result=resultToArray($result);
//var_dump($result); // Array of rows
// $result->free();
// $result->close();
echo "scores for '$email' are ". $result[0]["score"];
mysqli_close($conn);
?>