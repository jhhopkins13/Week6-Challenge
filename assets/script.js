$(document).ready(function () {

  // Define variables
  var apiKey = "ab907629ffc3160e13bac90e755a9d12";
  var searchHistory = [];

  // Define functions
  function getWeather(city) {
    // API URL
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    // Call API
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          console.log("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        console.log("Unable to connect to OpenWeatherMap");
      });
  }

  function displaySearchHistory() {
    $("#search-history").empty();
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = $("<li>").addClass("list-group-item history-item").text(searchHistory[i]);
      $("#search-history").append(historyItem);
    }
  }

  // Event listeners
  $("#search-button").on("click", function () {
    var city = $("#city-input").val().trim();
    if (city !== "") {
      getWeather(city);
      $("#city-input").val("");
    }
  });

  $(document).on("click", ".history-item", function () {
    var city = $(this).text();
    getWeather(city);
  });

  // Initialize app
  displaySearchHistory();

});
