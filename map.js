var map, overlay;
var initialOpacity = 0.5;
var OPACITY_MAX_PIXELS = 57; // Width of opacity control image

//Small sample test of 6 sites
var charts = [["CBACncrd",37.93333,-122.03333,"CBA Concord Observatory","A private <a href=http://www.lewcook.com/cbacal.htm>Observatory</a>. Part of the <a href=>Center for Backyard Astrophysics.",3],
    ["PnncCmpCA",36.4899,-121.15029,"Pinnacles Campground","<a href=https://www.nps.gov/pinn/planyourvisit/camp.htm>Campground</a> at the east entrance of <a href=https://www.nps.gov/pinn/index.htm>Pinnacles National Park</a>.",10],
    ["Caltech",34.13565,-118.12627,"California Institute of Technology","<a href=https://www.caltech.edu/>Research and education institution</a> with  <a href=http://www.astro.caltech.edu/outreach/>astronomy outreach events</a>.",1],
    ["DrksByCA",38.02776,-122.96190,"Drakes Bay visitors center","Officially the <a href=https://www.nps.gov/pore/planyourvisit/visitorcenters.htm#CP_JUMP_63133>Kenneth C. Patrick Vistor Center</a>. Site of <a href=http://www.ptreyes.org/camps-classes-programs/field-institute/class-topics/outdoor-activities>astronomy classes</a> at the  <a href=https://www.nps.gov/pore/index.htm>Point Reyes National Seashore</a> national park. ",9],
    ["CSnzScrObCA",32.99275,-117.01099,"Hawks Landing Observatory","A private observatory",4],
    ["PscdrCA",37.2552,-122.383,"Pescadero","",7]];

function getClosestStation (lat, lng) {
  var closestStation = '',
      diff = 1000000;

  $.each(charts, function(index, chart) {
    var chartLat = chart[1],
        chartLng = chart[2];

    var chartDiff = Math.abs(chartLat - lat) + Math.abs(chartLng - lng);

    if (chartDiff < diff) {
      diff = chartDiff;
      closestStation = chart[0]
    }
  });

  return closestStation;
}

function appendCskChart(station) {
  var domain = 'http://www.cleardarksky.com/c/',
      anchorAction = station + 'key.html?1',
      anchorUri = domain + anchorAction,
      imgAction = station + 'cs0.gif?1',
      imgUri = domain + imgAction;

  $('a#cskLink').attr('href', anchorUri);
  $('img#cskChart').attr('src', imgUri);
}

function HomeControl(controlDiv, map) {
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  //  controlDiv.style.padding = '5px';
  // // Set CSS for the control border
  // var controlUI = document.createElement('div');
  // controlUI.style.backgroundColor = 'white';
  // controlUI.style.borderStyle = 'solid';
  // controlUI.style.borderWidth = '2px';
  // controlUI.style.cursor = 'pointer';
  // controlUI.style.textAlign = 'center';
  // controlUI.title = 'Click for more Information';
  // controlDiv.appendChild(controlUI);
  // // Set CSS for the control interior
  // var controlText = document.createElement('div');
  // controlText.style.fontFamily = 'Arial,sans-serif';
  // controlText.style.fontSize = '14px';
  // controlText.style.color = 'blue';
  // controlText.style.paddingLeft = '4px';
  // controlText.style.paddingRight = '4px';
  // controlText.innerHTML = '<b>More Information</b>';
  // controlUI.appendChild(controlText);
  // Setup the click event listeners
  // google.maps.event.addDomListener(controlUI, 'click', function() {
  //   var url = "http://djlorenz.github.io/astronomy/lp2006/";
  //   window.open(url);
  // });
}

lat_selected = 0
lon_selected = 0
lat_start = localStorage.getItem("lat_start")//= 37.790319 //SF: 37.790319
lon_start = localStorage.getItem("lon_start")//= -122.40014 //SF: -122.40014
zoom_start = 3

function initialize() {
            //MAKE SURE TO PUT UP DISCPLAMER THAT WIP AND NOT YET RELIABLE
            //MAKE SURE TO PUT UP DISCPLAMER THAT WIP AND NOT YET RELIABLE
            //MAKE SURE TO PUT UP DISCPLAMER THAT WIP AND NOT YET RELIABLE
            //MAKE SURE TO PUT UP DISCPLAMER THAT WIP AND NOT YET RELIABLE
            //MAKE SURE TO PUT UP DISCPLAMER THAT WIP AND NOT YET RELIABLE
    if (lat_start){
      console.log('Geolocated Lat: ' + lat_start);
      console.log('Geolocated Lon: ' + lon_start);
    }
    else{
      console.log('Could Not Find Location! Defaulting to Downtown San Francisco!');
      lat_start = 37.790319;
      lon_start = -122.40014;
    }


    var mapOptions = {
      zoom: zoom_start,
      maxZoom: 17,
      center: new google.maps.LatLng(lat_start, lon_start),
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    precipProbability = 0;
    humidity = 0;
    visibility = 0;
    cloudCover = 0;
    moonPhase = 0;
    lightPol = 0;
    site_quality = 0;

    //On mouse click:
    google.maps.event.addListener(map, 'click', function(event) {
        //Get lat/long at point
        lat_selected = event.latLng.lat()
        lon_selected = event.latLng.lng()

        console.log("LAT:"+lat_selected);
        console.log("LNG:"+lon_selected);

        $("#coordinate").val(event.latLng.lat() + ", " + event.latLng.lng());
        $("#coordinate").select();

        // elevation_url = "https://maps.googleapis.com/maps/api/elevation/json?locations="+lat_selected+","+lon_selected"&key=AIzaSyAPV8hWJYamUd7TCnC6h6YcljuXnFW1lp8"
        darksky_url = "http://stargazr.us-west-2.elasticbeanstalk.com/weather?lat="+lat_selected+"&lng="+lon_selected;
	      lightpol_url = "http://stargazr.us-west-2.elasticbeanstalk.com/brightness?lat="+lat_selected+"&lng="+lon_selected;
    });

    //on button press to get conditions at a site
    $( "#get-conditions-here" ).click(function() {
        //
        // $.get(elevation_url, function(elevationdata) {
        //   
        //
        // }

        $.get(darksky_url, function(weatherdata) {

            //set vars for weather data from request
            var precipProbability = weatherdata.currently.precipProbability
            var humidity = weatherdata.currently.humidity
            var visibility = weatherdata.currently.visibility
            var cloudCover = weatherdata.currently.cloudCover
            var moonPhase = weatherdata.daily.data[0].moonPhase //0 tells to grab todays phase. allows 0-7

            //Populate HTML fields
            $("#cloudCover").html( Math.round(100*cloudCover) + "%");
            $("#visibility").html(visibility);
            $("#humidity").html(Math.round(100*humidity) + "%");
            $("#precipProbability").html(100*Math.round(precipProbability) + "%");
            $("#moonPhase").html(Math.round(100*moonPhase) + "% Full")

            $.get(lightpol_url, function(lightpol) {
                lightPol = lightpol.brightness
                $("#lightpollution").html(lightpol.brightness);
                calculate_rating(precipProbability, humidity, visibility, cloudCover, moonPhase, lightPol)
          });
        })

      function calculate_rating(precipProbability, humidity, visibility, cloudCover, moonPhase, lightPol){
          //Rate quality based on each parameter
          precip_quality = (1-Math.sqrt(precipProbability))
          humid_quality = (Math.pow(-humidity+1,(1/3)))
          cloud_quality = (1-Math.sqrt(cloudCover))
          lightpol_quality = (Math.abs(50-lightPol)/50) //should give rating between 0.9995 (Middle of Nowhere) - 0.0646 (Downtown LA)

          console.log("precip: "+ precipProbability + "\t qual: " + precip_quality+"\n",
                      "humid: "+ humidity + "\t qual: " + humid_quality+"\n",
                      "cloud: "+ cloudCover + "\t qual: " + cloud_quality+"\n",
                      "lightpol: "+lightPol+ "\t qual: "+ lightpol_quality+"\n");

          //Find overall site quality
          // site_quality = (precip_quality * humid_quality * cloud_quality)*100 // to or not to include * (1-moonPhase)
          site_quality = ((((precip_quality * lightpol_quality * cloud_quality)*8) + (humid_quality*2))/10)*100
          console.log("qual", site_quality);
          //Determine Site quality description
          site_quality_discript = ""
          if (site_quality > 90){
            site_quality_discript = "Excellent"
          }
          else if (site_quality > 80) {
            site_quality_discript = "Good"
          }
          else if (site_quality > 50) {
            site_quality_discript = "Fair"
          }
          else if (site_quality > 30) {
            site_quality_discript = "Poor"
          }
          else if (site_quality >= 0){
            site_quality_discript = "Terrible"
          }
          else {
            site_quality_discript = "Error: Select a site again"
          }

          //Populate HTML
          $("#site-rating").html(Math.round(site_quality) + " - " + site_quality_discript );
      }


        //Driving Distance/Time request
        dist_url = "http://stargazr.us-west-2.elasticbeanstalk.com/distance"
        $.get(dist_url,
          {
            units: "metric",
            origins: lat_start+","+lon_start,
            destinations: lat_selected+","+lon_selected
          },
          function(dist_data){

            try {
              //Assign vars for time and Distance
              drive_time = dist_data.rows[0].elements[0].duration.text;
              drive_dist = dist_data.rows[0].elements[0].distance.text;
              //populate with approprite time and distance
              $("#dtime").html(drive_time);
              $("#ddist").html(drive_dist);
            }
            catch(err) {
              //if no route foundm, give N/A message
              $("#dtime").html("N/A");
              $("#ddist").html("N/A");
            }
          }
        )

        appendCskChart(getClosestStation(lat_selected, lon_selected));
    });




//Begin djlorenz's code
//djlorenz.github.io/astronomy/lp2006/overlay/dark.html
  var bounds = {
     0: [[0,  0], [0, 0]],
     1: [[0,  1], [0, 1]],
     2: [[0,  3], [0, 2]],
     3: [[0,  7], [1, 5]],
     4: [[0, 15], [2, 11]],
     5: [[0, 31], [5, 23]],
     6: [[0, 63], [11,47]]
  };
  var zoomLevel = zoom_start;
  var first = 1;
  var overlayfull = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 2;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(1024, 1024)
  });
  var overlay9 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 3;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(2048, 2048)
  });
  var overlay10 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 4;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(4096, 4096)
  });
  var overlay11 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 5;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(8192, 8192)
  });
  var overlay12 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 6;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(16384, 16384)
  });
  var overlay13 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 7;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(32768, 32768)
  });
  var overlay14 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 8;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(65536, 65536)
  });
  var overlay15 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 9;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(131072, 131072)
  });
  var overlay16 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 10;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(262144, 262144)
  });
  var overlay17 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 11;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(524288, 524288)
  });
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var prevZoomLevel;
    prevZoomLevel = zoomLevel;
    var z = map.getZoom();
    z < 9 ? zoomLevel = 1 : zoomLevel = 2;
    // console.log(z);
    if (prevZoomLevel !== zoomLevel || zoomLevel == 2) {
    switch (z)
    {
    case 9:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay9);
       overlay = overlay9
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 10:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay10);
       overlay = overlay10
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 11:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay11);
       overlay = overlay11
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 12:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay12);
       overlay = overlay12
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 13:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay13);
       overlay = overlay13
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 14:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay14);
       overlay = overlay14
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 15:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay15);
       overlay = overlay15
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 16:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay16);
       overlay = overlay16
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 17:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay17);
       overlay = overlay17
       setOpacity(opacityCtrlKnob.valueX());
       break;
    default:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlayfull);
       overlay = overlayfull
       setOpacity(opacityCtrlKnob.valueX());
       break;
    }
    }
  });
  overlay = overlayfull
  createOpacityControl(map);
  map.overlayMapTypes.insertAt(0, overlayfull);
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);
  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
}
function createOpacityControl(map) {
        var sliderImageUrl = "opacity-slider3d7.png";
        // Create main div to hold the control.
        var opacityDiv = document.createElement('DIV');
        opacityDiv.setAttribute("style", "margin:5px;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat;width:71px;height:21px;cursor:pointer;");
        // Create knob
        var opacityKnobDiv = document.createElement('DIV');
        opacityKnobDiv.setAttribute("style", "padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat -71px 0;width:14px;height:21px;");
        opacityDiv.appendChild(opacityKnobDiv);
        // no var => global variable
        opacityCtrlKnob = new ExtDraggableObject(opacityKnobDiv, {
                restrictY: true,
                container: opacityDiv
        });
        google.maps.event.addListener(opacityCtrlKnob, "dragend", function () {
                setOpacity(opacityCtrlKnob.valueX());
        });
        google.maps.event.addDomListener(opacityDiv, "click", function (e) {
                var left = findPosLeft(this);
                var x = e.pageX - left - 5; // - 5 as we're using a margin of 5px on the div
                opacityCtrlKnob.setValueX(x);
                setOpacity(x);
        });
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(opacityDiv);
        // Set initial value
        var initialValue = OPACITY_MAX_PIXELS*initialOpacity;
        opacityCtrlKnob.setValueX(initialValue);
        setOpacity(initialValue);
}
function setOpacity(pixelX) {
        // Range = 0 to OPACITY_MAX_PIXELS
        var value = pixelX / OPACITY_MAX_PIXELS ;
        if (value < 0) value = 0;
        if (value > 1) value = 1;
        overlay.setOpacity(value);
}
function findPosLeft(obj) {
        var curleft = 0;
        if (obj.offsetParent) {
                do {
                        curleft += obj.offsetLeft;
                } while (obj = obj.offsetParent);
                return curleft;
        }
        return undefined;
}
google.maps.event.addDomListener(window, 'load', initialize);
