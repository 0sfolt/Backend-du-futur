import * as R from "ramda";
import data from"./dataset/meteo20ans.json" assert { type: 'json' };
import {max} from "ramda";
const tempmin=data.daily.temperature_2m_min
const tempmax=data.daily.temperature_2m_max
const time=data.daily.time

const diffmin = function(a, b) { return a - b; };
const diffmax = function(a, b) { return b - a; };

const sortac = R.sort(diffmin);
const sortdec = R.sort(diffmax);
const minIndex=R.indexOf(sortac(tempmin)[0]);
const maxIndex=R.indexOf(sortdec(tempmax)[0]);

const byYear = (t)=>{
    let i=-1;
    return R.groupBy(function(){
        i=i+1;
        return time[i].slice(0,4)
    })(t);
}
const byMonthOfYear=(t)=>{
    let i=-1;
    return R.groupBy(function(){
        i=i+1;
        return time[i].slice(0,7)
    })(t);
}
const maxForEach= R.mapObjIndexed(R.reduce(R.max, -Infinity))
const minForEach= R.mapObjIndexed(R.reduce(R.min, Infinity))

//console.log(minIndex(tempmin));
//console.log(maxIndex(tempmax));
console.log("journée la plus froide des 20 dernières années: " +time[minIndex(tempmin)]+" "+tempmin[minIndex(tempmin)]+"°C");
console.log("journée la plus chaude des 20 dernières années: " +time[maxIndex(tempmax)]+" "+tempmax[maxIndex(tempmax)]+"°C");
//console.log(byYear(tempmax))
//console.log(byMonthOfYear(tempmax))
console.log(maxForEach(byMonthOfYear(tempmax))) //Température max par mois
console.log(minForEach(byMonthOfYear(tempmin))) //Température min par mois
console.log(maxForEach(byYear(tempmax))) //Température max pour chaque années
console.log(minForEach(byYear(tempmin))) //Température min pour chaque années





