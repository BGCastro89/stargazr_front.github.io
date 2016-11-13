
console.log("start1a")
  // var map;
  // window.initMap = function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  // }


// </script>
//
//
//         <script>
            var map;
            var marker = null;

            function initialize() {

              console.log("start2")

                var mapOptions = {
                    zoom: 10,
                    disableDefaultUI: false,
                    center: new google.maps.LatLng(37.790319, -122.40014), //center on sherbrooke
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById('map'), mapOptions);


                google.maps.event.addListener(map, 'click', function(event) {
                //call function to create marker

                  console.log("LAT:"+event.latLng.lat());
                  console.log("LNG:"+event.latLng.lng());

                    $("#coordinate").val(event.latLng.lat() + ", " + event.latLng.lng());
                    $("#coordinate").select();

                    //delete the old marker
                    if (marker) { marker.setMap(null); }

                    //creer à la nouvelle emplacement
                     marker = new google.maps.Marker({ position: event.latLng, map: map});

                });


                var bounds = new google.maps.LatLngBounds(
                  new google.maps.LatLng(75.000000, -180.000000), //top left corner
                  new google.maps.LatLng( 7.000000,  -51.000000)); //bottom right corner

                    // new google.maps.LatLng(62.281819, -150.287132), //top left corner
                    // new google.maps.LatLng(62.400471, -150.005608)); //bottom right corner

                    // new google.maps.LatLng(40.000000, -134.995800), //top left corner
                    // new google.maps.LatLng(30.000000, -112.495800)); //bottom right corner

                // The photograph is courtesy of the U.S. Geological Survey.
                var srcImage = 'NorthAmerica2006.png';

                // The custom USGSOverlay object contains the USGS image,
                // the bounds of the image, and a reference to the map.
                overlay = new USGSOverlay(bounds, srcImage, map);


            }





            var overlay;
                  USGSOverlay.prototype = new google.maps.OverlayView();


                  /** @constructor */
                  function USGSOverlay(bounds, image, map) {

                    // Initialize all properties.
                    this.bounds_ = bounds;
                    this.image_ = image;
                    this.map_ = map;

                    // Define a property to hold the image's div. We'll
                    // actually create this div upon receipt of the onAdd()
                    // method so we'll leave it null for now.
                    this.div_ = null;

                    // Explicitly call setMap on this overlay.
                    this.setMap(map);
                  }

                  /**
                   * onAdd is called when the map's panes are ready and the overlay has been
                   * added to the map.
                   */
                  USGSOverlay.prototype.onAdd = function() {

                    var div = document.createElement('div');
                    div.style.borderStyle = 'none';
                    div.style.borderWidth = '0px';
                    div.style.position = 'absolute';

                    // Create the img element and attach it to the div.
                    var img = document.createElement('img');
                    img.src = this.image_;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.position = 'absolute';
                    div.appendChild(img);

                    this.div_ = div;

                    // Add the element to the "overlayLayer" pane.
                    var panes = this.getPanes();
                    panes.overlayLayer.appendChild(div);
                  };

                  USGSOverlay.prototype.draw = function() {

                    // We use the south-west and north-east
                    // coordinates of the overlay to peg it to the correct position and size.
                    // To do this, we need to retrieve the projection from the overlay.
                    var overlayProjection = this.getProjection();

                    // Retrieve the south-west and north-east coordinates of this overlay
                    // in LatLngs and convert them to pixel coordinates.
                    // We'll use these coordinates to resize the div.
                    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
                    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

                    // Resize the image's div to fit the indicated dimensions.
                    var div = this.div_;
                    div.style.left = sw.x + 'px';
                    div.style.top = ne.y + 'px';
                    div.style.width = (ne.x - sw.x) + 'px';
                    div.style.height = (sw.y - ne.y) + 'px';
                  };

                  // The onRemove() method will be called automatically from the API if
                  // we ever set the overlay's map property to 'null'.
                  USGSOverlay.prototype.onRemove = function() {
                    this.div_.parentNode.removeChild(this.div_);
                    this.div_ = null;
                  };






            google.maps.event.addDomListener(window, 'load', initialize);
