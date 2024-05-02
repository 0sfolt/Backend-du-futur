import * as R from "ramda";
import data from "./dataset/meteo20ans.json" assert {type: 'json'};

//Import data
const snowfallSum = data.daily.snowfall_sum
const rainSum = data.daily.rain_sum
const precipitationSum = data.daily.precipitation_sum
const time = data.daily.time

//FONCTIONS DE TRIE
//Trier la liste par années sur 4ans
const byYear = (t) => {
    let i = -1;
    return R.groupBy(function () {
        i = i + 1;
        return time[i].slice(0, 4)
    })(t);
}

//Trier cette liste par mois
const byMonthOfYear = (t) => {
    let i = -1;
    return R.groupBy(function () {
        i = i + 1;
        return time[i].slice(0, 7)
    })(t);
}

//Exprimer date annee et mois
function monthDateExpress(valeur) {
    let [year, month] = valeur.split('-');
    month = Number(month);
    const monthNames = ["", "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
    ];
    return `En ${monthNames[month]}, ${year} `
}

//Exprimer date annee et mois et jour
function dayDateExpress(valeur) {
    let [year, month, day] = valeur.split('-');
    month = Number(month);
    const monthNames = ["", "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
    ];
    return `Le ${day} ${monthNames[month]}, ${year} `
}

//SNOW///////////////////////////////////////////////////////////////////////////////////////////////
////Journee plus de neige
//Trouver le max dans une liste et recuperer le jour associé
var dayMaxAmountSnow = R.reduce(R.max, -Infinity, snowfallSum);
var dayMaxSnowIndex = R.indexOf(dayMaxAmountSnow, snowfallSum);
var dayMaxSnow = time[dayMaxSnowIndex];

////3 Mois plus de neige
//Somme de neige par mois
const SumPerMonth = R.mapObjIndexed(R.sum);
const SumSnowPerMonth = SumPerMonth(byMonthOfYear(snowfallSum));

//Trie liste
const sortedBySnowfall = R.sortWith(
    [R.descend(R.last)],
    R.toPairs(SumSnowPerMonth),
);
// Recup les trois premiers
const topThreeSnowfall = R.take(3, sortedBySnowfall);

////Annee plus enneigée
//Somme de neige par mois
const SumPerYear = R.mapObjIndexed(R.sum);
const SumSnowPerYear = SumPerYear(byYear(snowfallSum));

//Trie liste
const sortedBySnowfallY = R.sortWith(
    [R.descend(R.last)],
    R.toPairs(SumSnowPerYear),
);

////Pourcentage de neige
function countWithCondition(liste, condition) {
    return liste.filter(condition).length;
}

const isNonNull = (num) => num !== 0;
const countSnowyDays = countWithCondition(snowfallSum, isNonNull)
//Il a plu tata % du temps
const percentSnow = (countSnowyDays / (snowfallSum.length)) * 100;

//PLUIE///////////////////////////////////////////////////////////////////////////////////////////////
//// Journée plus de pluie
var dayMaxAmountRain = R.reduce(R.max, -Infinity, rainSum);
var dayMaxRainIndex = R.indexOf(dayMaxAmountRain, rainSum);
var dayMaxRain = time[dayMaxRainIndex];

////Top 3 Mois plus de pluie
//Somme de pluie par mois
const SumRainPerMonth = SumPerMonth(byMonthOfYear(rainSum));

//Trie liste
const sortedByRainfall = R.sortWith(
    [R.descend(R.last)],
    R.toPairs(SumRainPerMonth),
);
// Recup les trois premiers
const topThreeRainfall = R.take(3, sortedByRainfall);

////Annee plus pluvieuse
//Somme de neige par mois
const SumRainPerYear = SumPerYear(byYear(rainSum));

//Trie liste
const sortedByRainfallY = R.sortWith(
    [R.descend(R.last)],
    R.toPairs(SumRainPerYear),
);
////Pourcentage

const countRainyDays = countWithCondition(rainSum, isNonNull)
console.log(countRainyDays)
//Il a plu tata % du temps
const percentRain = (countRainyDays / (rainSum.length)) * 100;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log(`Journée la plus pluvieuse: ${dayDateExpress(dayMaxRain)} avec ${dayMaxAmountRain} mm de pluie`);
console.log(`Top 3 des mois les plus pluvieux: 
            ${monthDateExpress(topThreeRainfall[0][0])} avec ${topThreeRainfall[0][1]} mm de pluie,
            ${monthDateExpress(topThreeRainfall[1][0])} avec ${topThreeRainfall[1][1]} mm de pluie,
            ${monthDateExpress(topThreeRainfall[2][0])} avec ${topThreeRainfall[2][1]} mm de pluie \n`);
console.log(`L'année la plus pluvieuse: 
            L'année ${sortedByRainfallY[0][0]} avec ${sortedByRainfallY[0][1]} mm de pluie`);
console.log(`L'année la moins pluvieuse: 
            L'année ${sortedByRainfallY[20][0]} avec ${sortedByRainfallY[20][1]} mm de pluie \n`);
console.log(`Au cours de ces 20 dernieres annees il a plu ${percentRain} % du temps \n`);

console.log(`Journée plus enneigée sur 20ans: ${dayDateExpress(dayMaxSnow)}  avec ${dayMaxAmountSnow} cm de neige`);
console.log(`Top 3 des mois les plus enneigés: 
            ${monthDateExpress(topThreeSnowfall[0][0])} avec ${topThreeSnowfall[0][1]} cm de neige,
            ${monthDateExpress(topThreeSnowfall[1][0])} avec ${topThreeSnowfall[1][1]} cm de neige,
            ${monthDateExpress(topThreeSnowfall[2][0])} avec ${topThreeSnowfall[2][1]} cm de neige`);
console.log(`L'année la plus enneigée: 
            L'année ${sortedBySnowfallY[0][0]} avec ${sortedBySnowfallY[0][1]} cm de neige`);
console.log(`L'année la moins enneigée: 
            L'année ${sortedBySnowfallY[20][0]} avec ${sortedBySnowfallY[20][1]} cm de neige \n`);
console.log(`Au cours de ces 20 dernieres annees il a neigé ${percentSnow} % du temps`);