Googlemap-Trending
==================
Introduction:
-------------
This document is used to demostrate the PHP + MySQL Database Dynamic Website Design. According to this document, I used the Youtube API to get most viewed video for a day, 
```javascript
				$.getJSON(
				"https://www.googleapis.com/youtube/v3/videos",{
	            part: 'snippet',
			    chart: 'mostPopular',
			    kind: 'youtube#videoListResponse',
			    maxResults: 5,
			    regionCode: countrycode[this.name], //can put more parameters in underneth, eg location
			    key: 'AIzaSyANeyPZ-jJtk45jm2zRz3GJQ8rP3P2i85k'},
          );
```
and I used the Twitter API for popular tweets as well. However
