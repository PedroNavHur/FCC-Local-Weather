(function($) {
  $(function() {

    // we define the global variables
    var position = {
      latitude: null,
      longitud: null
    };

    // we call the get Current Time function
    getLocationInfo();
    getCurrentTime();

    // Get Location Info function
    function getLocationInfo() {

      // we define the local variables
      var country;
      var city;

      // JSONP ipinfo request
      $.get("https://ipinfo.io", function(response) {

        // asigns the info to variables
        country = response.country;
        city = response.city;
        position = response.loc;

        // set the info in the html
        $("#location").html(country + ', ' + city);

      }, "jsonp");

    }

    // Current Time function
    function getCurrentTime() {

      // we get the current date time
      var time = new Date();

      // we define other local variables
      var day = time.getDay();
      var hour = time.getHours();
      var minute = time.getMinutes();
      var dayS;

      // switch to change day number to text
      switch (day) {
        case 0:
          dayS = "Sunday";
          break;
        case 1:
          dayS = "Monday";
          break;
        case 2:
          dayS = "Tuesday";
          break;
        case 3:
          dayS = "Wednesday";
          break;
        case 4:
          dayS = "Thursday";
          break;
        case 5:
          dayS = "Friday";
          break;
        case 6:
          dayS = "Saturday";
      }

      // we set the time info in the html
      $("#time").html(dayS + ', ' + hour + ":" + minute);

    }

  }); // end of document ready
})(jQuery); // end of jQuery name space
