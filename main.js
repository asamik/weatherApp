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
	// $("#getWeather").on("click",updateWeather);
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
	// var url = apiUrl + "forecast/q/autoip.json";
	// var url= apiUrl + "astronomy/q/autoip.json";
	$.get(conditionUrl)
	.done(function(data){
		location=data.current_observation.display_location.city
		date=data.current_observation.local_time_rfc822
		precip=data.current_observation.precip_today_metric
		// convertDate();
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
		// var =data.current_observation.
	})
	.fail(function(error){
		console.log(error);
	})
}

//calculate what kind of clothes they should wear depending on the temp
// function convertToClothes(){
// 	var clothesIndexToday=0;
// 	var clothesIndexTomorrow=0;
// 	tomorrowHighF;
//  	todayHighF;
//  	tomorrowLowF;
//  	todayLowF;
// if (todayLowF<41){
// //downjacket
// }
// else if (clothesIndex===30){
// 	//coat
// }
// else if (clothesIndex===40){
// //sweater
// }
// else if (clothesIndex===50){
// 	//cardigan
// }
// else if (clothesIndex===70){
// 	//long sleeves
// }
// else if (clothesIndex===90){
// 	//Tshirt
// }


// if (clothesIndex===10){
// //downjacket
// }
// else if (clothesIndex===30){
// 	//coat
// }
// else if (clothesIndex===40){
// //sweater
// }
// else if (clothesIndex===50){
// 	//cardigan
// }
// else if (clothesIndex===70){
// 	//long sleeves
// }
// else if (clothesIndex===90){
// 	//Tshirt
// }
// }

// 10 ・・・ダウンジャケット着て出かけよう。
// 20 ・・・マフラーと手袋が欠かせません。
// 30 ・・・コートを着ないと結構寒いなあ。
// 40 ・・・セーターが必要になりそうだね。
// 50 ・・・薄手のカーディガンが欲しいな。
// 60 ・・・朝晩は上着が欲しい涼しさです。
// 70 ・・・昼間は長袖一枚着れば十分。
// 80 ・・・半袖のポロシャツで過ごせそう。
// 90 ・・・Tシャツ一枚で過ごせる暑さだ。


// }





})();


// todayHighC = data.forecast.simpleforecast.forecastday[0].high.celsius
							// todayLowC = data.forecast.simpleforecast.forecastday[0].low.celsius