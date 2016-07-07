# **Hyperlapse.js**

### JavaScript hyper-lapse utility for Google Street View.

This library was written to create dynamic hyper-lapse (time-lapse with movement) sequences using Google Street View. 

[Video of what's possible.](https://vimeo.com/63653873)

## Example

[View Demo(load time is ~30-60sec)](http://bostonmarathonmediaguide.com/hyperlapse)

```js
var hyperlapse = new Hyperlapse(document.getElementById('pano'), {
	lookat: new google.maps.LatLng(37.81409525128964,-122.4775045005249),
	zoom: 1,
	use_lookat: true,
	elevation: 50
});

hyperlapse.onError = function(e) {
	console.log(e);
};

hyperlapse.onRouteComplete = function(e) {
	hyperlapse.load();
};

hyperlapse.onLoadComplete = function(e) {
	hyperlapse.play();
};

// Google Maps API stuff here...
var directions_service = new google.maps.DirectionsService();

var route = {
	request:{
		origin: new google.maps.LatLng(37.816480000000006,-122.47825,37),
		destination: new google.maps.LatLng(37.81195,-122.47773000000001),
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	}
};

directions_service.route(route.request, function(response, status) {
	if (status == google.maps.DirectionsStatus.OK) {
		hyperlapse.generate( {route:response} );
	} else {
		console.log(status);
	}
});
```

## Dependencies

- [Three.js](https://github.com/mrdoob/three.js) (r78)
- a modified version of [GSVPano.js](https://github.com/pnitsch/GSVPano.js)
- [Google Maps API v3.12](https://developers.google.com/maps/documentation/javascript/3.exp/reference)

  
## API Docs 
  
[API Documentation]()

## Todo

Add functions from marathon hyperlapse to hyperlapse.js
Example with customizable Start and End
Modify GSVPano with new version of Google StreetView API
Dropdown for all Abbott Marathon races

## License

The MIT License

Copyright (c) 2013 Teehan+Lax

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

