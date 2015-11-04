(function(){
	"use strict";


$(document).ready(init);
var apiUrl = "http://api.wunderground.com/api/59162e870626b73c/";
var location;
var conditionUrl;
var forecastUrl;
var date;
var dateString;
var precip;
var tomorrowHighF;
var todayHighF;
var tomorrowLowF;
var todayLowF;

function init(){
	conditionUrl= apiUrl + "conditions/q/autoip.json";
	forecastUrl= apiUrl  + "forecast/q/autoip.json";
	updateWeather();
	$("#changeCity").on("click",changeCity);
}

function changeCity(){
	var $newCity =$("#userCity").val();
	location=$newCity;
	conditionUrl= apiUrl + "conditions/q/"+$newCity+".json";
	forecastUrl =apiUrl + "forecast/q/"+$newCity+".json";
	updateWeather();
}

function updateWeather(){
	$.get(conditionUrl)
	.done(function(data){
		location=data.current_observation.display_location.city
		date=data.current_observation.local_time_rfc822
		precip=data.current_observation.precip_today_metric
		console.log(precip)
			$.get(forecastUrl)
					.done(function(data){
						console.log("forecast", data);	
							todayHighF = data.forecast.simpleforecast.forecastday[0].high.fahrenheit							
							todayLowF = data.forecast.simpleforecast.forecastday[0].low.fahrenheit
							tomorrowHighF=data.forecast.simpleforecast.forecastday[1].high.fahrenheit
							tomorrowLowF=data.forecast.simpleforecast.forecastday[1].low.fahrenheit
								$("#cityDisplay").text(location);
								$("#dateDisplay").text(date);
								$("#todayHighDisplay").text(todayHighF);
								$("#todayLowDisplay").text(todayLowF);
								$("#tomorrowHighDisplay").text(tomorrowHighF);
								$("#tomorrowLowDisplay").text(tomorrowLowF);
					})										
					.fail(function(error){
							console.log(error);
						})
	})
	.fail(function(error){
		console.log(error);
	})
}
})();

