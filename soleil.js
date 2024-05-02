import * as R from "ramda";
import data from"./dataset/meteo20ans.json" assert { type: 'json' };
import { max } from "ramda";

const sunshine_duration = data.daily.sunshine_duration;
const time = data.daily.time;

const diffmin = function(a, b) { return a - b; };
const diffmax = function(a, b) { return b - a; };

const sortac = R.sort(diffmin);
const sortdec = R.sort(diffmax);
const minIndex = R.indexOf(sortac(sunshine_duration)[0]);
const maxIndex = R.indexOf(sortdec(sunshine_duration)[0]);

const byYear = (t) => {
    let i = -1;
    return R.groupBy(function(){
        i = i + 1;
        return time[i].slice(0,4);
    })(t);
};
const byMonthOfYear = (t) => {
    let i = -1;
    return R.groupBy(function(){
        i = i + 1;
        return time[i].slice(0,7);
    })(t);
};

const formatTime = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    const formattedHours = hours > 0 ? `${hours} heure${hours > 1 ? 's' : ''}` : '';
    const formattedMinutes = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
    const formattedSeconds = seconds > 0 ? `${seconds} seconde${seconds > 1 ? 's' : ''}` : '';

    const parts = [formattedHours, formattedMinutes, formattedSeconds].filter(Boolean);

    if (parts.length === 0) {
        return '0 seconde';
    } else if (parts.length === 1) {
        return parts[0];
    } else {
        const lastPart = parts.pop();
        return parts.join(', ') + ' et ' + lastPart;
    }
};




const maxForEach = R.mapObjIndexed(R.reduce(R.max, -Infinity));
const minForEach = R.mapObjIndexed(R.reduce(R.min, Infinity));
const meanForEach = R.mapObjIndexed(R.mean);
const medianForEach = R.mapObjIndexed(R.median);

const maxPerMonth = maxForEach(byMonthOfYear(sunshine_duration));
const minPerMonth = minForEach(byMonthOfYear(sunshine_duration));
const meanOfMaxPerMonth = meanForEach(byMonthOfYear(sunshine_duration));
const medianOfMaxPerMonth = medianForEach(byMonthOfYear(sunshine_duration));
const meanOfMinPerMonth = meanForEach(byMonthOfYear(sunshine_duration));
const medianOfMinPerMonth = medianForEach(byMonthOfYear(sunshine_duration));

const maxMois = R.reduce(R.max, -Infinity);
const minMois = R.reduce(R.min, Infinity);

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

console.log("Durée d'ensoleillement maximale par mois");
console.log(R.map(formatTime, maxPerMonth));
console.log("Durée d'ensoleillement minimale par mois");
console.log(R.map(formatTime, minPerMonth));
console.log("Durée d'ensoleillement maximale par année");
console.log(R.map(formatTime, maxForEach(byYear(sunshine_duration))));
console.log("Durée d'ensoleillement minimale par année");
console.log(R.map(formatTime, minForEach(byYear(sunshine_duration))));
console.log("Durée d'ensoleillement moyenne maximale par mois");
console.log(R.map(formatTime, meanOfMaxPerMonth));
console.log("Durée d'ensoleillement moyenne par année");
console.log(R.map(formatTime, meanForEach(byYear(sunshine_duration))));
console.log("Durée d'ensoleillement médiane maximale par mois");
console.log(R.map(formatTime, medianOfMaxPerMonth));
console.log("Durée d'ensoleillement médiane par année");
console.log(R.map(formatTime, medianForEach(byYear(sunshine_duration))));

console.log("Journée la moins ensoleillée des 20 dernières années: " + time[minIndex(sunshine_duration)] + " avec " + formatTime(sunshine_duration[minIndex(sunshine_duration)]));
console.log("Journée la plus ensoleillée des 20 dernières années: " + time[maxIndex(sunshine_duration)] + " avec " + formatTime(sunshine_duration[maxIndex(sunshine_duration)]));
console.log("Mois avec la moyenne d'ensoleillement la plus élevée des 20 dernières années: " + getKeyByValue(meanOfMaxPerMonth, maxMois(Object.values(meanOfMaxPerMonth))) + " avec " + formatTime(maxMois(Object.values(meanOfMaxPerMonth))));
console.log("Mois avec la moyenne d'ensoleillement la plus basse des 20 dernières années: " + getKeyByValue(meanOfMinPerMonth, minMois(Object.values(meanOfMinPerMonth))) + " avec " + formatTime(minMois(Object.values(meanOfMinPerMonth))));
console.log("Mois avec la médiane d'ensoleillement la plus élevée des 20 dernières années: " + getKeyByValue(medianOfMaxPerMonth, maxMois(Object.values(medianOfMaxPerMonth))) + " avec " + formatTime(maxMois(Object.values(medianOfMaxPerMonth))));
console.log("Mois avec la médiane d'ensoleillement la plus basse des 20 dernières années: " + getKeyByValue(medianOfMinPerMonth, minMois(Object.values(medianOfMinPerMonth))) + " avec " + formatTime(minMois(Object.values(medianOfMinPerMonth))));
