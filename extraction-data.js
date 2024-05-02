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
    const meanForEach = R.mapObjIndexed(R.mean)
    const medianForEach = R.mapObjIndexed(R.median)

    const maxPerMonth = maxForEach(byMonthOfYear(tempmax))
    const minPerMonth = minForEach(byMonthOfYear(tempmin))
    const meanOfMaxPerMonth = meanForEach(byMonthOfYear(tempmax))
    const medianOfMaxPerMonth = medianForEach(byMonthOfYear(tempmax))
    const meanOfMinPerMonth = meanForEach(byMonthOfYear(tempmin))
    const medianOfMinPerMonth = medianForEach(byMonthOfYear(tempmin))
    const maxMois = R.reduce(R.max, -Infinity)
    const minMois = R.reduce(R.min, Infinity)
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    console.log("Température maximum par mois")
    console.log(maxPerMonth)
    console.log("Température minimum par mois")
    console.log(minPerMonth)
    console.log("Température maximum par année")
    console.log(maxForEach(byYear(tempmax)))
    console.log("Température minimum par année")
    console.log(minForEach(byYear(tempmin)))
    console.log("Température max moyenne par mois")
    console.log(meanOfMaxPerMonth)
    console.log("Température max moyenne par année")
    console.log(meanForEach(byYear(tempmax)))
    console.log("Température max médianne par mois")
    console.log(medianOfMaxPerMonth)
    console.log("Température max médianne par année")
    console.log(medianForEach(byYear(tempmax)))

    console.log("journée la plus froide des 20 dernières années: " +time[minIndex(tempmin)]+" avec "+tempmin[minIndex(tempmin)]+"°C");
    console.log("journée la plus chaude des 20 dernières années: " +time[maxIndex(tempmax)]+" avec "+tempmax[maxIndex(tempmax)]+"°C");
    console.log("Mois avec la moyenne de température la plus élevée des 20 dernières années: " +getKeyByValue(meanOfMaxPerMonth,maxMois(Object.values(meanOfMaxPerMonth)))+" avec "+maxMois(Object.values(meanOfMaxPerMonth))+"°C en moyenne");
    console.log("Mois avec la moyenne de température la plus basse des 20 dernières années: " +getKeyByValue(meanOfMinPerMonth,minMois(Object.values(meanOfMinPerMonth)))+" avec "+minMois(Object.values(meanOfMinPerMonth))+"°C en moyenne");
    console.log("Mois avec la médianne de température la plus élevée des 20 dernières années: " +getKeyByValue(medianOfMaxPerMonth,maxMois(Object.values(medianOfMaxPerMonth)))+" avec "+maxMois(Object.values(medianOfMaxPerMonth))+"°C ");
    console.log("Mois avec la médianne de température la plus basse des 20 dernières années: " +getKeyByValue(medianOfMinPerMonth,minMois(Object.values(medianOfMinPerMonth)))+" avec "+minMois(Object.values(medianOfMinPerMonth))+"°C ");





