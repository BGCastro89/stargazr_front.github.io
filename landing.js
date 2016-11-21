// lat_start;
// long_start;

console.log("START!");
// initialize()


$(document).on('click', '#auto-location', function() {
    // navigator.geolocation.getCurrentPosition(function(location) {
    //   console.log(location.coords.latitude);
    //   console.log(location.coords.longitude);
    //   console.log(location.coords.accuracy);
    // });
    //
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      lat_start = crd.latitude;
      lon_start = crd.longitude;

      localStorage.setItem("lat_start",lat_start)
      localStorage.setItem("lon_start",lon_start)

      console.log('Your current position is:');
      console.log('Latitude : ' + lat_start);
      console.log('Longitude: ' + lon_start);

      $("#location-input").val(lat_start+", "+lon_start);
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      $.getJSON('https://ipinfo.io/geo', function(response) {
          console.log("Backup Geolocation (less accurate)");
          var loc = response.loc.split(',');
          lat_start = loc[0];
          lon_start = loc[1];
          localStorage.setItem("lat_start",lat_start);
          localStorage.setItem("lon_start",lon_start);
          console.log('Your approx position is:');
          console.log('Latitude : ' + lat_start);
          console.log('Longitude: ' + lon_start);

          $("#location-input").val(lat_start+", "+lon_start);
      });
    };
    navigator.geolocation.getCurrentPosition(success, error, options);

});
