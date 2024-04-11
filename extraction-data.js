import * as R from "ramda";
import data from"./dataset/meteo20ans.json" assert { type: 'json' };

//Temperature
const tempmin=data.daily.temperature_2m_min
const tempmax=data.daily.temperature_2m_max
const time=data.daily.time

const diffmin = function(a, b) { return a - b; };
const diffmax = function(a, b) { return b - a; };

const sortac = R.sort(diffmin);
const sortdec = R.sort(diffmax);
const minIndex=R.indexOf(sortac(tempmin)[0]);
const maxIndex=R.indexOf(sortdec(tempmax)[0])
console.log(minIndex(tempmin));
console.log(maxIndex(tempmax));
console.log(tempmin[minIndex(tempmin)]);
console.log(time[minIndex(tempmin)]);
console.log(tempmax[maxIndex(tempmax)]);
console.log(time[maxIndex(tempmax)]);

