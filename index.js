// take the data
const argument = process.argv;
const obj = require('./'+argument[2]);

// extract the data
const expenseData  = obj.expenseData;
const revenueData  = obj.revenueData;

// collect dates
var dates = [];
for(let value in expenseData){
    var startDate = expenseData[value].startDate;
    dates.push(startDate.toString());
}

for(let value in revenueData){
    var startDate = revenueData[value].startDate;
    dates.push(startDate.toString());
}

dates.sort( (d1,d2) =>{
    return new Date(d1).getTime() - new Date(d2).getTime();
} );

// get range of dates 
const minDate = new Date(dates[0]);
const maxDate = new Date(dates[dates.length-1]);

// map to store amount with dates as key
var balance = {};

// put all dates bw minDate and maxDate in map
while(minDate<=maxDate){
    if(minDate===maxDate)
    break;
    balance[minDate.toISOString()]=0;
    minDate.setMonth(minDate.getMonth()+1);
}

// do the Math
for ( let val in expenseData){

    var amount = expenseData[val].amount;
    var startDate = expenseData[val].startDate;
    
    balance[startDate]=-1*amount;
    
}
for ( let val in revenueData){

    var amount = revenueData[val].amount;
    var startDate = revenueData[val].startDate;
    
    balance[startDate]=balance[startDate]+amount;
}

// storing the final balance sheet
var balance2 = [];
for( let val in balance){
    let date = val;
    let amount = balance[date];
    
    let a ={
        "amount" : amount,
        "startDate" : date
    };
    balance2.push(a);
}
var ans = {
    "balance": balance2
};
// output
console.log(ans);