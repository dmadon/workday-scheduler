var currentDay = moment().format("dddd, MMMM D, YYYY");
console.log(currentDay);

var dayStart = moment().set('hour', 7).set('minute',00).format("h:mm a")
console.log(dayStart)

var setHour = moment(dayStart).format('h:mm a');
console.log(setHour);

var startOfHour = moment().startOf('hour').format('h:mm a');
console.log(startOfHour);

var currentHour = "10:00 pm";

var test = function(){
    if(startOfHour == currentHour){
        console.log("true");
    }
    else{
        console.log("false");
    }
}

test();


$("#currentDay").text(currentDay);

   

// var setTimeBlocks = function(dayStart){
//     for(i=0; i<=10; i++){
        
        
// }
// }






