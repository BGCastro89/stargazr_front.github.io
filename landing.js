imagelist = [
    ['bkgrnd_img-0.jpg',"Perseid Meteor over Capitol Reef N.M., UT","Photo credit: Brian Castro"],
    // ['bkgrnd_img-1.jpg',"Pleiades Star Cluster (M45)","Photo credit: Brian Castro"],
    ['bkgrnd_img-2.jpg',"Lake Tahoe","Photo credit: Brian Castro"],
    ['bkgrnd_img-3.jpg',"Orion over Stateline, NV","Photo credit: Brian Castro"],
    ['bkgrnd_img-4.jpg',"Orion","Photo credit: Brian Castro"],
    ['bkgrnd_img-5.jpg',"Elk Creek Campground, Big Sur, CA","Photo credit: Brian Castro"],
    ['bkgrnd_img-6.jpg',"Lost Coast, CA","Photo credit: Brian Castro"],
    ['bkgrnd_img-7.jpg',"Lost Coast, CA","Photo credit: Brian Castro"],
    ['bkgrnd_img-8.jpg',"Shelter Cove, CA","Photo credit: Brian Castro"],
    ['bkgrnd_img-9.jpg',"Bryce Canyon National Park, UT","Photo credit: Brian Castro"],
    ['bkgrnd_img-10.jpg',"Arizona-Nevada Border","Photo credit: Brian Castro"],
    ['bkgrnd_img-11.jpg',"Orion from Petaluma, CA","Photo credit: Brian Castro & Suzie Ross"],
    ['bkgrnd_img-12.jpg',"Star Party at Bryce Canyon NP, UT","Photo credit: Brian Castro"],
    ['bkgrnd_img-13.jpg',"Milky Way from Prescadero, CA","Photo credit: Brian Castro"],
    ['bkgrnd_img-14.jpg',"Pigeon Point Lighthouse, Prescadero, CA","Photo credit: Brian Castro"],
    ['bkgrnd_img-15.jpg',"Milky Way Galactic Core","Photo credit: Brian Castro"],
    ['bkgrnd_img-16.jpg',"Andromeda Galaxy (M31)","Photo credit: Brian Castro"],
    ['bkgrnd_img-17.jpg',"Yosemite National Park, CA","Photo credit: Brian Castro"],
    // ['bkgrnd_img-18.jpg',"Milky Way Galaxy","Photo credit: Brian Castro"],
]

window.onload = function(){

  randomImage = function(){
    imageNameSize = imagelist.length,
    lotteryNumber = Math.floor(Math.random()*imageNameSize),
    console.log("lotteryNumber", lotteryNumber);
    winnerImage = imagelist[lotteryNumber][0],
    discription = imagelist[lotteryNumber][1],
    credit = imagelist[lotteryNumber][2],
    fullPath = "url('../../stargazr/images/" + winnerImage+"')";
    imageInfo = [fullPath, discription, credit]
    console.log(imageInfo);
    return imageInfo
  }

  imageInfo = randomImage()

  $('#banner').css('background-image', imageInfo[0]);
  $('.wrapper.style3').css('background-image', imageInfo[0]);
  $('#photo-description').text(imageInfo[1]);
  $('#photo-credit').text(imageInfo[2]);
}

$(document).on('click', '#auto-location', function() {

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
