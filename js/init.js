(function($) {
  $(function() {

    // we define the global variables
    var position;
    var weather;
    var icon;
    var temperature;
    var humidity;
    var windSpeed;
    var rainProv;
    var dayOrNight;


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
      var timeHtml;

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

      // is it day or night
      if (hour > 5 && hour < 19) {
        dayOrNight = true;
      }

      // Nice format the numbers
      if (minute < 10) {
        minute = ("0" + minute)
      }

      // if else to change between 12 hour or 24 hour clock
      if ($('#timeSwitch').prop('checked')) {
        console.log('12-Hour');
        if (hour > 12) {
          hour = (hour - 12);
          timeHtml = (hour + ":" + minute + " p.m");
        } else {
          timeHtml = (hour + ":" + minute + " a.m");
        }

      } else {
        console.log('24-Hour');
        timeHtml = (hour + ":" + minute);
      }

      // we set the time info in the html
      $("#time").html(dayS + ', ' + timeHtml);


    }

    // Get Weather function
    function getCurrentWeather() {

      // we define the local variables
      var apiKey = "0a00ea58cefe0998cff62dd8d9506ce9/";
      var url = "https://api.darksky.net/forecast/";

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

        // we call the showCurrent Weather function
        showCurrentWeather();

      }, "jsonp");

    }

    // Show Weather function
    function showCurrentWeather() {

      // weather variables calc
      var temperatureHtml;
      var iconHtml;
      var humidityHtml;
      var rainProvHtml;
      var windSpeedHtml;

      // if and switches to choose the icon

      if (dayOrNight = true) {
        switch (icon) {
          case 'clear-day':
            iconHtml = '<i class="wi wi-day-sunny"></i>';
            break;
          case 'clear-night':
            iconHtml = '<i class="wi wi-night-clear"></i>';
            break;
          case 'rain':
            iconHtml = '<i class="wi wi-day-rain"></i>';
            break;
          case 'snow':
            iconHtml = '<i class="wi wi-day-snow"></i>';
            break;
          case 'sleet':
            iconHtml = '<i class="wi wi-day-sleet"></i>';
            break;
          case 'wind':
            iconHtml = '<i class="wi wi-day-windy"></i>';
            break;
          case 'fog':
            iconHtml = '<i class="wi wi-day-fog"></i>';
            break;
          case 'cloudy':
            iconHtml = '<i class="wi wi-day-cloudy"></i>';
            break;
          case 'partly-cloudy-day':
            iconHtml = '<i class="wi wi-day-sunny-overcast"></i>';
            break;
          case 'partly-cloudy-night':
            iconHtml = '<i class="wi wi-night-alt-partly-cloudy"></i>';
            break;
          default:
            iconHtml = '<i class="wi wi-day-haze"></i>';
        }
      } else {
        switch (icon) {
          case 'clear-day':
            iconHtml = '<i class="wi wi-day-sunny"></i>';
            break;
          case 'clear-night':
            iconHtml = '<i class="wi wi-night-clear"></i>';
            break;
          case 'rain':
            iconHtml = '<i class="wi wi-night-rain"></i>';
            break;
          case 'snow':
            iconHtml = '<i class="wi wi-night-alt-snow"></i>';
            break;
          case 'sleet':
            iconHtml = '<i class="wi wi-night-sleet"></i>';
            break;
          case 'wind':
            iconHtml = '<i class="wi wi-night-alt-cloudy-windy"></i>';
            break;
          case 'fog':
            iconHtml = '<i class="wi wi-night-fog"></i>';
            break;
          case 'cloudy':
            iconHtml = '<i class="wi wi-night-cloudy"></i>';
            break;
          case 'partly-cloudy-day':
            iconHtml = '<i class="wi wi-day-sunny-overcast"></i>';
            break;
          case 'partly-cloudy-night':
            iconHtml = '<i class="wi wi-night-alt-partly-cloudy"></i>';
            break;
          default:
            iconHtml = '<i class="wi wi-stars"></i>';
        }
      }

      // if to change from imperial to metric
      if ($('#conversionSwitch').prop('checked')) {
        console.log('metric');
        temperatureHtml = ((temperature - 32) * (5 / 9));
        temperatureHtml = parseInt(temperatureHtml);
        temperatureHtml = (temperatureHtml + '<i class="wi wi-celsius"></i> ');
        windSpeedHtml = (windSpeed / 0.62137);
        windSpeedHtml = parseInt(windSpeedHtml);
        windSpeedHtml = ('<i class="wi wi-strong-wind"></i> ' + windSpeedHtml + 'Kph')
      } else {
        console.log('imperial');
        temperatureHtml = parseInt(temperature);
        temperatureHtml = (temperatureHtml + '<i class="wi wi-fahrenheit"></i> ')
        windSpeedHtml = parseInt(windSpeed);
        windSpeedHtml = ('<i class="wi wi-strong-wind"></i> ' + windSpeedHtml + 'Mph')
      }

      // convert humidity and rainProv
      humidityHtml = (humidity * 100);
      humidityHtml = parseInt(humidityHtml);
      humidityHtml = ('<i class="wi wi-humidity"></i> ' + humidityHtml + ' %')
      rainProvHtml = (rainProv * 100);
      rainProvHtml = parseInt(rainProvHtml);
      rainProvHtml = ('<i class="wi wi-umbrella"></i> ' + rainProvHtml + ' %')

      // we show the info in html
      $("#weather").html(weather);
      $("#temperature").html(temperatureHtml + iconHtml);
      $("#humidity").html(humidityHtml);
      $("#rain").html(rainProvHtml);
      $("#wind").html(windSpeedHtml);

    }

    $('#conversionSwitch').on('click', function() {
      if ($('#conversionSwitch').prop('checked')) {
        console.log('metric');
      } else {
        console.log('imperial');
      }
      showCurrentWeather();
    });

    $('#timeSwitch').on('click', function() {
      if ($('#timeSwitch').prop('checked')) {
        console.log('12-Hour');
      } else {
        console.log('24-Hour');
      }
      getCurrentTime();
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
