<?php
	ignore_user_abort(); // run script in background
	set_time_limit(0); // run script forever
	$interval=60*15; // do every 15 minutes...
	
	require "twitteroauth/autoload.php";
	use Abraham\TwitterOAuth\TwitterOAuth;
		
	$accesstoken = '898414637980327936-ZUDOfUxz56vCHBhxiOby9BZqNQ6MKae';
	$accesstokensecret = 'XbQIUx5Mim7vXTN5JoyjtHQwvdlZiJ42moiD7LogvEY9l';
	$consumerkey = 'Q30almJj8r635We8l9T4sWerk';
	$consumersecret = '79E2RQFK8fVWdd4tKa32uu6a7XkLIfyEZygD2CFLzb0plugcn6';
	/**$oauth_access_token = '898414637980327936-ZUDOfUxz56vCHBhxiOby9BZqNQ6MKae';
		$oauth_access_token_secret = 'XbQIUx5Mim7vXTN5JoyjtHQwvdlZiJ42moiD7LogvEY9l';
		$consumer_key = 'Q30almJj8r635We8l9T4sWerk';
		$consumer_secret = '79E2RQFK8fVWdd4tKa32uu6a7XkLIfyEZygD2CFLzb0plugcn6';**/
	
	$user_id = array('23424775',
						'23424975',
						'23424800',
						'23424834',
						'23424900',
						'23424747',
						'23424782',
						'23424787',
						'23424801',
						'23424982',
						'23424919',
						'23424768',
						'23424923',
						'23424750',
						'23424803',
						'23424819',
						'23424829',
						'23424853',
						'23424909',
						'23424950',
						'23424957',
						'23424765',
						'23424874',
						'23424910',
						'23424954',
						'23424976',
						'23424833',
						'23424846',
						'23424948',
						'23424748',
						'23424856',
						'23424868',
						'23424901',
						'23424934',
						'23424960',
						'23424984',
						'23424740',
						'23424824',
						'23424908',
						'23424802',
						'23424863',
						'23424942',
						'23424938',
						'23424738',
						'23424852',
						'23424860',
						'23424936',
						'23424922',
						'23424898',
						'23424848',
						'23424969',
						'23424916',
						'23424977',
						'23424753',
						'23424757',
						'23424796',
						'23424870',
						'23424873',
						'23424924',
						'23424925',
						'23424930',
						'23424935');		
					
	do{
		$count = 0;
		$twittername = [];
		$woeidarray = [];
		
		$twitter = new TwitterOAuth($consumerkey,$consumersecret,$accesstoken,$accesstokensecret);

		for ($j=0; $j<sizeof($user_id); $j++){
			$tweets = $twitter->get('trends/place',["id" => "$user_id[$j]"]);

			$i = 0;
			while($i<=5){
				$name = $tweets[0]->trends[$i]->name;
				$woeid = $tweets[0]->locations[0]->woeid;
				
				$twittername[$count] = $name;
				$woeidarray[$count] = $woeid;
			
				$count++;
				$i++;
			}
		}
		$con= mysqli_connect("localhost","root","", "xinpingl") or die('Could not connect: ' . mysqli_error());
		mysqli_query($con,"SET NAMES 'utf8'");
		$sql = "SET NAMES 'utf8'";
		if ($con->query($sql) === TRUE) {
			echo "<br>";
		} else {
			echo "Error: " . $sql . "\n" . $con->error;
		}
		
		$sql = "DELETE FROM twitter";
		if ($con->query($sql) === TRUE) {
			echo "Delete all successfully";
			echo "<br>";
		} else {
			echo "Error: " . $sql . "\n" . $con->error;
		}
			
			//iterate over array and upload data to db
		for ($k=0; $k<sizeof($twittername); $k++){	
			$sql = "INSERT INTO twitter (Name, Url, PromotedContent, Query, TweetVolume, Userid)
						VALUES ('$twittername[$k]', 'Url', 'Dod', 'Query', 'TV', '$woeidarray[$k]')";
			if ($con->query($sql) === TRUE) {
			} else {
				echo "Error: " . $sql . "\n" . $con->error; //fix the \n (echo "<br>";)
			}
		}	
		
		$con->close();
			
		sleep($interval);// wait 15 minutes	
	}
	
	while(true);
?>