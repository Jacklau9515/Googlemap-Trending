  // the map
  var map;
  var minZoomLevel = 2;

  function initialize() {
	  var myOptions = {
		  zoom: minZoomLevel,
		  gestureHandling: 'greedy',
		  streetViewControl: false,
		  fullscreenControl: false,
		  zoomControl: false,
		  mapTypeControl: false,
		  center: new google.maps.LatLng(10, 0)
		  };

    // initialize the map
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

   // Limit the zoom level
   google.maps.event.addListener(map, 'zoom_changed', function() {
     if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });
  
   // Bounds for North America
    var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(0, 0), 
     new google.maps.LatLng(0, 0)
   );

   // Listen for the dragend event
   google.maps.event.addListener(map, 'dragend', function() {
     if (strictBounds.contains(map.getCenter())) return;

     //Move the map back within the bounds if users move map out of bounds
     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
   });

   
    // these are the map styles
    var styles = [
        {
          stylers: []
        },
        {
          featureType: "landscape",
          stylers: []
        },{
          featureType: "road",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.land_parcel",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.locality",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.neighborhood",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.province",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "landscape.man_made",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "landscape.natural",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "poi",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "transit",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

    map.setOptions({styles: styles});

    // Initialize JSONP request
    var script = document.createElement('script');
    var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
    url.push('sql=');
    var query = 'SELECT name, kml_4326 FROM ' +
        '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
    var encodedQuery = encodeURIComponent(query);
    url.push(encodedQuery);
    url.push('&callback=drawMap');
    url.push('&key=AIzaSyANeyPZ-jJtk45jm2zRz3GJQ8rP3P2i85k'); 
    script.src = url.join('');
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }

  function drawMap(data) {
  
   var supportedcountries = [
	'Algeria',
	'Australia',
	'Austria',
	'Argentina',
	'Azerbaijan',
	'Bahrain',
	'Belarus',
	'Belgium',
	'Bosnia and Herz.',
	'Brazil',
	'Bulgaria',
	'Canada',
	'Chile',
	'Colombia',
	'Croatia',
	'Czech Rep.',
	'Denmark',
	'Dominican Rep.',
	'Ecudaor',
	'Egypt',
	'Finland',
	'France',
	'Georgia',
	'Germany',
	'Ghana',
	'Greece',
	'Guatemala',
	'Hong Kong',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iraq',
	'Ireland',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'S. Korea',
	'Kuwait',
	'Latvia',
	'Lebanon',
	'Libya',
	'Lithuania',
	'Luxembourg',
	'Macedonia',
	'Malaysia',
	'Mexico',
	'Montenegro',
	'Morocco',
	'Nepal',
	'Netherlands',
	'New Zealand',
	'Nigeria',
	'Norway',
	'Oman',
	'Pakistan',
	'Panama',
	'Peru',
	'Philippines',
	'Poland',
	'Portugal',
	'Puerto Rico',
	'Qatar',
	'Romania',
	'Russia',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Singapore',
	'Slovakia',
	'Slovenia',
	'South Africa',
	'Spain',
	'Sri Lanka',
	'Sweden',
	'Switzerland',
	'Taiwan',
	'Tanzania',
	'Thailand',
	'Tunisia',
	'Turkey',
	'Uganda',
	'Ukraine',
	'United Arab Emirates',
	'United Kingdom',
	'United States',
	'Vensula',
	'Vietnam',
	'Yemen',
	'Zimbabwe'
	]
  
  
  var countrycodeid = {
	'Canada': '23424775',
	'United Kingdom': '23424975',
	'Dominican Rep.': '23424800',
	'Guatemala': '23424834',
	'Mexico': '23424900',
	'Argentia': '23424747',
	'Chile': '23424782',
	'Colombia': '23424787',
	'Ecudaor': '23424801',
	'Vensula': '23424982',
	'Peru': '23424919',
	'Brazil': '23424768',
	'Poland': '23424923',
	'Austria': '23424750',
	'Ireland': '23424803',
	'France': '23424819',
	'Germany': '23424829',
	'Italy': '23424853',
	'Netherands': '23424909',
	'Spain': '23424950',
	'Switerzland': '2342495',
	'Belarus': '23424765',
	'Lativa': '23424874',
	'Norway': '23424910',
	'Sweden': '23424954',
	'Ukarine': '23424976',
	'Greece': '23424833',
	'Indonesia': '23424846',
	'Singapore': '23424948',
	'Australia': '23424748',
	'Japan': '23424856',
	'Korea': '23424868',
	'Malaysia': '23424901',
	'Philipines': '23424934',
	'Thailand': '23424960',
	'Vietnam': '23424984',
	'Algeria': '23424740',
	'Ghana': '23424824',
	'Nigeria': '23424908',
	'Egypt': '23424802',
	'Kenya': '23424863',
	'South Africa': '23424942',
	'Saudi Arriba': '23424938',
	'United Arab Emirates': '23424738',
	'Israel': '23424852',
	'Jordan': '23424860',
	'Russia': '23424936',
	'Pakistan': '23424922',
	'Oman': '23424898',
	'India': '23424848',
	'Turkey': '23424969',
	'New Zealand': '23424916',
	'United States': '23424977',
	'Bahrain': '23424753',
	'Belgium': '23424757',
	'Denmark': '23424796',
	'Kuwait': '23424870',
	'Lebanon': '23424873',
	'Panama': '23424924',
	'Portgual': '23424925',
	'Qatar': '23424930',
	'Puerto Rico': '23424935'
  }
  
   var countrycode = {
	'Algeria': 'DZ',
	'Australia': 'AU',
	'Austria': 'AT',
	'Argentina': 'AR',
	'Azerbaijan': 'AZ',
	'Bahrain': 'BH',
	'Belarus': 'BY',
	'Belgium': 'BE',
	'Bosnia and Herz.': 'BA',
	'Brazil': 'BR',
	'Bulgaria': 'BG',
	'Canada': 'CA',
	'Chile': 'CL',
	'Colombia': 'CO',
	'Croatia': 'HR',
	'Czech Rep.': 'CZ',
	'Denmark': 'DK',
	'Egypt': 'EG',
	'Finland': 'FI',
	'France': 'FR',
	'Georgia': 'GE',
	'Germany': 'DE',
	'Ghana': 'GH',
	'Greece': 'GR',
	'Hong Kong': 'HK',
	'Hungary': 'HU',
	'Iceland': 'IS',
	'India': 'IN',
	'Indonesia': 'ID',
	'Iraq': 'IQ',
	'Ireland': 'IE',
	'Israel': 'IL',
	'Italy': 'IT',
	'Jamaica': 'JM',
	'Japan': 'JP',
	'Jordan': 'JO',
	'Kazakhstan': 'KZ',
	'Kenya': 'KE',
	'S. Korea': 'KR',
	'Kuwait': 'KW',
	'Latvia': 'LV',
	'Lebanon': 'LB',
	'Libya': 'LY',
	'Lithuania': 'LT',
	'Luxembourg': 'LU',
	'Macedonia': 'MK',
	'Malaysia': 'MY',
	'Mexico': 'MX',
	'Montenegro': 'ME',
	'Morocco': 'MA',
	'Nepal': 'NP',
	'Netherlands': 'NL',
	'New Zealand': 'NZ',
	'Nigeria': 'NG',
	'Norway': 'NO',
	'Oman': 'OM',
	'Pakistan': 'PK',
	'Peru': 'PE',
	'Philippines': 'PH',
	'Poland': 'PL',
	'Portugal': 'PT',
	'Puerto Rico': 'PR',
	'Qatar': 'QA',
	'Romania': 'RO',
	'Russia': 'RU',
	'Saudi Arabia': 'SA',
	'Senegal': 'SN',
	'Serbia': 'RS',
	'Singapore': 'SG',
	'Slovakia': 'SK',
	'Slovenia': 'SI',
	'South Africa': 'ZA',
	'Spain': 'ES',
	'Sri Lanka': 'LK',
	'Sweden': 'SE',
	'Switzerland': 'CH',
	'Taiwan': 'TW',
	'Tanzania': 'TZ',
	'Thailand': 'TH',
	'Tunisia': 'TN',
	'Turkey': 'TR',
	'Uganda': 'UG',
	'Ukraine': 'UA',
	'United Arab Emirates': 'AE',
	'United Kingdom': 'GB',
	'United States': 'US',
	'Vietnam': 'VN', 
	'Yemen': 'YE',
	'Zimbabwe': 'ZW'
	}
	
   //Dominican Rep twitter not youtube
   //jamica youtube not twitter
   
   
   
	var contentString = '<div id="content">Loading...<\/div>'; 
	var infowindow = new google.maps.InfoWindow({
	    content: contentString
	});
  
    var rows = data['rows'];
    for (var i in rows) {
     if (rows[i][0] != 'Antarctica') { //make array of all countries which are unsupported $.inArray(rows[i][0], supportedcountries) != -1
        var newCoordinates = [];
        var geometries = rows[i][1]['geometries'];
        if (geometries) {
          for (var j in geometries) {
            newCoordinates.push(constructNewCoordinates(geometries[j]));
          }
        } else {
          newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
        }
		var selectedcountry;
		
		if($.inArray(rows[i][0], supportedcountries) != -1){
			
        var country = new google.maps.Polygon({
          paths: newCoordinates,
          strokeColor: '#ff9900',
          strokeOpacity: 1,
          strokeWeight: 0.3,
          fillColor: '#00FF00',
          fillOpacity: 0.1,
          name: rows[i][0]
        });
		}
		else{
	   var country = new google.maps.Polygon({
          paths: newCoordinates,
          strokeColor: '#ff9900',
          strokeOpacity: 1,
          strokeWeight: 0.3,
		  clickable: false,
          fillColor: '#800000',
          fillOpacity: 0.1,
          name: 'undefined'
        });
		}
		
        google.maps.event.addListener(country, 'mouseover', function() {
		if(this.name == 'undefined'){
			 
		}
			
		if(this != selectedcountry && this.name != 'undefined'){
          this.setOptions({fillOpacity: 0.3});
		  }
        });
		
        google.maps.event.addListener(country, 'mouseout', function() {
		if(this != selectedcountry && this.name != 'undefined'){
          this.setOptions({fillOpacity: 0.1});
		  }
        });
	
        google.maps.event.addListener(country, 'click', function(event) {
			//set heading to country name
			$("#results").html("");
			output = '<div> <h2> '+ this.name +' </h2> <br> </div>'
			$('#results').append(output);
			
			
			if (typeof selectedcountry !== 'undefined') {
				selectedcountry.setOptions({fillOpacity: 0.1});
			}
			
			if(this.name != 'undefined')
			{
				this.setOptions({fillOpacity: 0.5});
				selectedcountry = this;
			}
			
			var result = this.name in countrycode;
			$("#youtube-result").hide();
			
			
			if(result == true){
				$.getJSON(
				"https://www.googleapis.com/youtube/v3/videos",{
	            part: 'snippet',
			    chart: 'mostPopular',
			    kind: 'youtube#videoListResponse',
			    maxResults: 5,
			    regionCode: countrycode[this.name], //can put more parameters in underneth, eg location
			    key: 'AIzaSyANeyPZ-jJtk45jm2zRz3GJQ8rP3P2i85k'},
			  
		    function(data){
				//clear the #youtube-result div when click a new country on the Google map
				document.getElementById("youtube-result").innerHTML = '';				
				data.items.forEach(function (items) {
					console.log(items);
					videTitle = items.snippet.title;
					videID = items.id;
					videoDate = items.snippet.publishedAt;
					
					output = "<tr>";
					$('#youtube-result').append(output);
					
					output = '<td align=center>  ' + videoDate +'   </td>';
					$('#youtube-result').append(output);
					
					output = '<td align=center>  ' + videTitle +'   </td>';
					$('#youtube-result').append(output);
					
					output = '<td align=center>  <a href="https://www.youtube.com/watch?v='+ videID +'">Youtube</a>  </td>';
					$('#youtube-result').append(output);
					
				
					output = "</tr>";
					$('#youtube-result').append(output);
				});
				output = "</table>";
				$("#youtube-result").append(output);
				$("#youtube-result").show();				
			});
				/**$.ajax({   
				type: "POST",
				url: "getdata.php",             
				dataType: "html",     
				data: ({woeid: countrycodeid[this.name]}),		
				success: function(response){                    
				   $('#twitter-result').append(response); 
				}
			});**/
			var promise = $.ajax({
				url: "getdata.php",
				type: "POST",    
				dataType: "html",     
				data: ({woeid: countrycodeid[this.name]}),		
			});
			
			promise.done(function(response){
				document.getElementById("twitter-result").innerHTML = '';
				$("#twitter-result").append(response);
				$("#twitter-result").show();
				});
			}
        });
        country.setMap(map);
      }
    }
  }

  function constructNewCoordinates(polygon) {
    var newCoordinates = [];
    var coordinates = polygon['coordinates'][0];
    for (var i in coordinates) {
      newCoordinates.push(
          new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
    }
    return newCoordinates;
  }

  google.maps.event.addDomListener(window, 'load', initialize);