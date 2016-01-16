(function(){
	"use strict";

	$(document).ready(init);
	let apiUrl = `http://api.wunderground.com/api/${process.env.WUNDERGROUND_KEY}`;
console.log('apiurl', apiurl)
	let location;
	let conditionUrl;
	let forecastUrl;
	let date;
	let dateString;
	let tomorrowHighF;
	let todayHighF;
	let tomorrowLowF;
	let todayLowF;

	let down-jacket = "assets/down-jacket.jpeg";
	let coat = "assets/coat-ladies.jpeg";
  let sweater = "assets/sweater.jpeg";
  let cardigan = "assets/cardigan.jpeg";
  let shirt = "assets/shirt.jpeg";
	let tshirt = "assets/tshirt.jpeg";

	function init() {
		conditionUrl= apiUrl + "conditions/q/autoip.json";
		forecastUrl= apiUrl  + "forecast/q/autoip.json";
		updateWeather();
		$("#changeCity").on("click", changeCity);
	}

	function changeCity() {
		let $newCity =$("#userCity").val();
		location=$newCity;
		conditionUrl= apiUrl + "conditions/q/"+$newCity+".json";
		forecastUrl =apiUrl + "forecast/q/"+$newCity+".json";
		updateWeather();
	}

	function updateWeather() {
		$.get(conditionUrl)
			.done(function(data) {
				console.log("data", data)
				location=data.current_observation.display_location.city;
				date=data.current_observation.local_time_rfc822;
				if(!location) { 
					swal({
						title: "Location not found.",
						text: "Try a different city, please!",
						timer:1500,
						showConfirmationButton: false
					});
				}
					$.get(forecastUrl)
							.done(function(data) {
								let forecastdata = data.forecast.simpleforecast.forecastday
								let high = high.fahrenheit
								let low = low.fahrenheit
								todayHighF = forecastdata[0].high;							
								todayLowF = forecastdata[0].low;
								tomorrowHighF=forecastdata[1].high;
								tomorrowLowF=forecastdata[1].low;

								$("#cityDisplay").text(location);
								$("#dateDisplay").text(date);
								$("#todayHighDisplay").text(todayHighF+"°F");
								$("#todayLowDisplay").text(todayLowF+"°F");
								$("#tomorrowHighDisplay").text(tomorrowHighF+"°F");
								$("#tomorrowLowDisplay").text(tomorrowLowF+"°F");
								pickClothesToday();
								pickClothesTmrw();
							})										
							.fail(function(error) {
								console.log(error);
							})
			})
			.fail(function(error) {
				console.log(error);
			})	
	}

	function pickClothesToday() {
			if(todayLowF<41) {
			$("#clothesToday").attr("src", down-jacket);
		} else if(todayLowF<50) {
			$("#clothesToday").attr("src", coat);
		} else if(todayHighF<59) {
			$("#clothesToday").attr("src", sweater);
		} else if(todayHighF<68) {
			$("#clothesToday").attr("src", cardigan);
		} else if(todayHighF<75) {
			$("#clothesToday").attr("src", shirt);
		} else {
			$("#clothesToday").attr("src", tshirt);
		}
	}
	function pickClothesTmrw(){
		if(tomorrowLowF<41) {
			$("#clothesTmrw").attr("src", down-jacket);
		} else if(tomorrowLowF<50) {
			$("#clothesTmrw").attr("src", coat);
		} else if(tomorrowHighF<59) {
			$("#clothesTmrw").attr("src", sweater);
		} else if(tomorrowHighF<68) {
			$("#clothesTmrw").attr("src", cardigan);
		} else if(tomorrowHighF<75) {
			$("#clothesTmrw").attr("src", shirt);
		} else {
			$("#clothesTmrw").attr("src", tshirt);
		}
	}
})();
