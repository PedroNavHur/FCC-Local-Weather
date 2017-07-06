(function($) {
  $(function() {

    // we define the global variables
    var position;

    // we call the get functions
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
        getCurrentWeather();

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

    // Current Weather function
    function getCurrentWeather() {

      // we define the local variables
      var apiKey = "0a00ea58cefe0998cff62dd8d9506ce9/";
      var url = "https://api.darksky.net/forecast/";

      // weather local variables
      var weather;
      var icon;
      var temperature;
      var humidity;
      var windSpeed;
      var rainProv;

      // weather variables calc
      var temperatureHtml;
      var iconHtml;
      var humidityHtml;
      var rainProvHtml;
      var windSpeedHtml;

      // test the forecast on console
      console.log(
        url + apiKey + position
      );

      // JSONP darksky info request
      $.get(url + apiKey + position, function(response) {

        // asigns the info to the variables
        weather = response.currently.summary;
        icon = response.currently.icon;
        temperature = response.currently.temperature;
        humidity = response.currently.humidity;
        windSpeed = response.currently.windSpeed;
        rainProv = response.currently.precipProbability;

        // test the wether info on console
        console.log(
          weather + icon + temperature + humidity + windSpeed + rainProv
        );

        // switch to choose the icon
        switch (icon) {
          case 'clear-day':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'clear-night':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'rain':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'snow':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'sleet':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'wind':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'fog':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'cloudy':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'partly-cloudy-day':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'partly-cloudy-night':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          default:
            iconHtml = '<i class="wi wi-day-rain"></i>';
        }

        // if to change from imperial to metric
        if ($('#conversionSwitch').prop('checked')) {
          console.log('metric');
          temperature = ((temperature - 32) * (5/9));
          temperature = parseInt(temperature);
          temperatureHtml = (temperature + '<i class="wi wi-celsius"></i> ');
          windSpeed = (windSpeed / 0.62137);
          windSpeed = parseInt(windSpeed);
          windSpeedHtml = ('<i class="wi wi-strong-wind"></i> ' + windSpeed + 'Kph')
        } else {
          console.log('imperial');
          temperature = parseInt(temperature);
          temperatureHtml = (temperature + '<i class="wi wi-fahrenheit"></i> ')
          windSpeed = parseInt(windSpeed);
          windSpeedHtml = ('<i class="wi wi-strong-wind"></i> ' + windSpeed + 'Mph')
        }

        // convert humidity and rainProv
        humidity = (humidity * 100);
        humidity = parseInt(humidity);
        humidityHtml = ('<i class="wi wi-humidity"></i> ' + humidity + ' %')
        rainProv = (rainProv * 100);
        rainProv = parseInt(rainProv);
        rainProvHtml = ('<i class="wi wi-umbrella"></i> ' + rainProv + ' %')

        // we show the info in html
        $("#weather").html(weather);
        $("#temperature").html(temperatureHtml + iconHtml);
        $("#humidity").html(humidityHtml);
        $("#rain").html(rainProvHtml);
        $("#wind").html(windSpeedHtml);

      }, "jsonp");

    }

    $('#conversionSwitch').on('click', function() {
      if ($('#conversionSwitch').prop('checked')) {
        console.log('metric');
      } else {
        console.log('imperial');
      }
      getCurrentWeather();
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
