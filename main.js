(function(){
	"use strict";

	$(document).ready(init);
	let location
	  , conditionUrl
	  , forecastUrl
	  , date
	  , dateString
	  , tomorrow
	  , today

	let apiUrl = "http://api.wunderground.com/api/59162e870626b73c/"
	  , downjacket = "assets/down.jpeg"
	  , coat = "assets/coat-ladies.jpeg"
    , sweater = "assets/sweater.jpeg"
    , cardigan = "assets/cardigan.jpeg"
    , shirt = "assets/shirt.jpeg"
	  , tshirt = "assets/tshirt.jpeg";

	function init() {
		conditionUrl= apiUrl + "conditions/q/autoip.json";
		forecastUrl= apiUrl  + "forecast/q/autoip.json";
		updateWeather();
		$("#changeCity").on("click", changeCity);
		$("#userCity").keyup(e => {
			if(e.keyCode === 13) {
				$("#changeCity").click();
			}
		});
	}

	function changeCity() {
		let $newCity = $("#userCity").val();
		location = $newCity;
		conditionUrl = apiUrl + "conditions/q/" + $newCity + ".json";
		forecastUrl = apiUrl + "forecast/q/" + $newCity + ".json";
		updateWeather();
	}

	function updateWeather() {
		$.get(conditionUrl)
			.done(function(data) {
				if (!data.current_observation) { 
					swal({
						title: "Location not found.",
						text: "Try a different city, please!",
						timer: 1500,
						showConfirmationButton: false
					});
				}
				location = data.current_observation.display_location.city;
				date = moment(Date.parse(data.current_observation.local_time_rfc822)).format('llll');
					$.get(forecastUrl)
						.done(function(data) {
							let forecastdata = data.forecast.simpleforecast.forecastday;
							today = {high: forecastdata[0].high.fahrenheit, low:forecastdata[0].low.fahrenheit};
							tomorrow = {high: forecastdata[1].high.fahrenheit, low:forecastdata[1].low.fahrenheit};

							$("#cityDisplay").text(location);
							$("#dateDisplay").text(date);
							$("#todayHighDisplay").text(today.high+"°F");
							$("#todayLowDisplay").text(today.low+"°F");
							$("#tomorrowHighDisplay").text(tomorrow.high+"°F");
							$("#tomorrowLowDisplay").text(tomorrow.low+"°F");
							pickClothes(today,tomorrow);
						})										
						.fail(function(error) {
							console.log(error);
						})
			})
			.fail(function(error) {
				console.log(error);
			})	
	}

	function pickClothes (today, tomorrow) {
		[today, tomorrow].forEach(day => {
		let clothesToWear;
			if (day.low < 41) {
			clothesToWear = downjacket;
			} else if (day.low < 50) {
			clothesToWear = coat;
			} else if (day.high < 59) {
			clothesToWear = sweater;
			} else if (day.high < 68) {
			clothesToWear = cardigan;
			} else if (day.high < 75) {
			clothesToWear = shirt;
			} else {
			clothesToWear = tshirt;
			}
			if (day === today) { 
				$("#clothesToday").attr("src", clothesToWear).addClass('clothes');
			} else { 
				$("#clothesTmrw").attr("src", clothesToWear).addClass('clothes');
			}
		});
	}
})();
