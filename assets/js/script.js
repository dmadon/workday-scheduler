var listContainerEl = document.querySelector(".container");

var currentDay = moment().format("dddd, MMMM D, YYYY");
console.log(currentDay);

$("#currentDay").text(currentDay);

var timeBlocks = [
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm"
];   

console.log(timeBlocks.length);


var getTimeBlock = function(){

    var listWrapperEl = document.createElement("ul");

    for(i = 0; i < timeBlocks.length; i++){
        console.log(timeBlocks[i]); 
        var timeBlockEl = document.createElement("li");
        timeBlockEl.classList=("row hour");
        timeBlockEl.textContent=timeBlocks[i];
        listWrapperEl.appendChild(timeBlockEl);
    }
    listContainerEl.appendChild(listWrapperEl);



}

getTimeBlock();






