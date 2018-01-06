Googlemap-Trending
==================
Introduction:
-------------
This document is used to demostrate the PHP + MySQL Database Dynamic Website Design. According to this document, I used the Youtube API to get Top5 most viewed video for a day in different countries: 
```jquery
$.getJSON(
"https://www.googleapis.com/youtube/v3/videos",
{part: 'snippet',
 chart: 'mostPopular',
 kind: 'youtube#videoListResponse',
 maxResults: 5,
 regionCode: countrycode[this.name],
 key: 'AIzaSyANeyPZ-jJtk45jm2zRz3GJQ8rP3P2i85k'},);
```
and I used the Twitter API for popular tweets as well. However, since Twitter has the Rate limits that be divided into 15 minute intervals, I had to get and insert data to my remote database and then provide data to visitors to the Googlemap-Trending webpage from the database:
```php
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
sleep($interval);// wait 15 minutes	
}
while(true);
?>
```
