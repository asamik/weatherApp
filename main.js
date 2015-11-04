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
								$("#todayHighDisplay").text(todayHighF+"°F");
								$("#todayLowDisplay").text(todayLowF+"°F");
								$("#tomorrowHighDisplay").text(tomorrowHighF+"°F");
								$("#tomorrowLowDisplay").text(tomorrowLowF+"°F");
								pickClothesToday();
								pickClothesTmrw();
					})										
					.fail(function(error){
							console.log(error);
						})
	})
	.fail(function(error){
		console.log(error);
	})	
}
function pickClothesToday(){
		if(todayLowF<41){
		$("#clothesToday").attr("src","downjacket.jpeg")
	}else if(todayLowF<50){
		$("#clothesToday").attr("src","coatLadies.jpeg")
	}else if(todayHighF<59){
		$("#clothesToday").attr("src","sweater.jpeg")
	}else if(todayHighF<68){
		$("#clothesToday").attr("src","cardigan.jpeg")
	}else if(todayHighF<75){
		$("#clothesToday").attr("src","shirt.jpeg")
	}else{
		$("#clothesToday").attr("src","Tshirt.jpeg")
	}
}
function pickClothesTmrw(){
	if(tomorrowLowF<41){
		$("#clothesTmrw").attr("src","downjacket.jpeg")
	}else if(tomorrowLowF<50){
		$("#clothesTmrw").attr("src","coatLadies.jpeg")
	}else if(tomorrowHighF<59){
		$("#clothesTmrw").attr("src","sweater.jpeg")
	}else if(tomorrowHighF<68){
		$("#clothesTmrw").attr("src","cardigan.jpeg")
	}else if(tomorrowHighF<75){
		$("#clothesTmrw").attr("src","shirt.jpeg")
	}else{
		$("#clothesTmrw").attr("src","Tshirt.jpeg")
	}
}

})();

// function pickClothesToday(){
// 		if(todayLowF<41){
// 		$("#clothesTmrw").attr("src","downjacket.jpeg")
// 	}else if(todayLowF<50){
// 		$("#clothesTmrw").attr("src","coatLadies.jpeg")
// 	}else if(todayHighF<59){
// 		$("#clothesTmrw").attr("src","sweater.jpeg")
// 	}else if(todayHighF<68){
// 			$("#clothesTmrw").attr("src","cardigan.jpeg")
// 	}else if(todayHighF<75){
// 		$("#clothesTmrw").attr("src","shirt.jpeg")
// 	}else{
// 		$("#clothesTmrw").attr("src","Tshirt.jpeg")
// 	}
// }
