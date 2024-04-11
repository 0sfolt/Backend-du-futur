import * as R from "ramda";
import data from"./dataset/meteo20ans.json" assert { type: 'json' };

//Import data
const snowfallSum=data.daily.snowfall_sum
const rainSum=data.daily.rain_sum
const precipitationSum=data.daily.precipitation_sum
const time=data.daily.time

//SNOW
//Journee plus de neige
//Trouver le max dans une liste et recuperer le jour associé
var dayMaxAmountSnow = R.reduce(R.max, -Infinity,snowfallSum);
var dayMaxSnowIndex= R.indexOf(dayMaxAmountSnow,snowfallSum );
var dayMaxSnow =time[dayMaxSnowIndex];
console.log(`Journée plus enneigée sur 20ans: ${dayMaxSnow}  avec ${dayMaxAmountSnow} cm de neige`);


//PLUIE
// Journée plus de pluie
var dayMaxAmountRain = R.reduce(R.max, -Infinity,rainSum);
var dayMaxRainIndex= R.indexOf(dayMaxAmountRain,rainSum );
var dayMaxRain =time[dayMaxRainIndex];
console.log(`Journée plus pluvieuse sur 20ans: ${dayMaxRain}  avec ${dayMaxAmountRain} mm de pluie`);
