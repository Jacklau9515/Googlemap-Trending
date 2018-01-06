<?php
$userAnswer = $_POST['woeid']; 
$con= mysqli_connect("localhost","root","", "xinpingl") or die('Could not connect: ' . mysqli_error());
$query ="SELECT * FROM twitter WHERE Userid = $userAnswer";
mysqli_query($con,"SET NAMES 'utf8'");
$result=mysqli_query($con, $query) or die(mysql_error());   

//if statement to check if any data exists. If no data then do not post table.

echo "<table border='1' >
<tr>
<td align=center><b>Name</b></td>
<td align=center><b>URL</b></td>
<td align=center><b>Promoted</b></td>
<td align=center><b>Query</b></td></td>
<td align=center><b>TweetVolume</b></td>
<td align=center><b>Userid</b></td>";

while($data = mysqli_fetch_row($result))
{   
    echo "<tr>";
    echo "<td align=center>$data[0]</td>";
    echo "<td align=center>$data[1]</td>";
    echo "<td align=center>$data[2]</td>";
    echo "<td align=center>$data[3]</td>";
    echo "<td align=center>$data[4]</td>";
	echo "<td align=center>$data[5]</td>";
    echo "</tr>";
}
echo "</table>";
?>