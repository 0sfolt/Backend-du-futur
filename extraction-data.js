import * as R from "ramda";
import data from"./dataset/meteo20ans.json" assert { type: 'json' };
const temp=data.hourly.temperature_2m
const time=data.hourly.time

const diffmin = function(a, b) { return a - b; };
const diffmax = function(a, b) { return b - a; };

const sortac = R.sort(diffmin);
const sortdec = R.sort(diffmax);
const minIndex=R.indexOf(sortac(temp)[0]);
const maxIndex=R.indexOf(sortdec(temp)[0])
console.log(minIndex(temp));
console.log(maxIndex(temp));
console.log(temp[minIndex(temp)]);
console.log(time[minIndex(temp)]);
console.log(temp[maxIndex(temp)]);
console.log(time[maxIndex(temp)]);

