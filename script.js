const container = document.querySelector(".cnt");
const h1 = document.querySelector("h1");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const before = document.getElementById("before");
const after = document.getElementById("after");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weakDays = ["sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let firstDay = "Fri";
let lastDay = "Sat";

addChild(container, "div");
nextDays(firstDay, 30);

after.addEventListener("click", () => {
    
    nextMonth();
});

before.addEventListener("click", () => {
    
    previousMonth();
});

function addChild(parent, start = 6, end = 36) {
    let a = 0;
    for(let i = 1; i <= 42; i++) {
        let div = document.createElement("div");
        div.classList.add(weakDays[a]); // aad a class day name to the day div
        (a ===6)? a=0 : a++;
        parent.appendChild(div);
    }
}

  

function nextMonth() {
    let thisMonth = month.textContent;
    let monthNum = months.indexOf(thisMonth);

    // upData month and year
    if(monthNum === 11) {
        month.textContent = months[0];
        year.textContent = +year.textContent + 1;
        
    } else {
        month.textContent = months[monthNum + 1];
    }
    // upData firstDay
    (lastDay === weakDays[6])? firstDay = weakDays[0] : firstDay = weakDays[ weakDays.indexOf(lastDay)+1]
    // get the number of days in this new month
    let numOfDaysInMonth = getDaysInMonth();
    nextDays(firstDay, numOfDaysInMonth);
    
}

function nextDays(first, numOfDaysInMonth) {

    let dayNumOne = document.querySelectorAll(`.${first}`)[0]; // Selecte the first day div
    container.childNodes.forEach(function(e) {e.textContent = ""}); // remove all numbers
    // numberfy the days of month
    for(let i=0; i<numOfDaysInMonth; i++) {
        dayNumOne.textContent = `${i+1}`;
        dayNumOne = dayNumOne.nextElementSibling;
    } 
    lastDay = dayNumOne.previousElementSibling.className; // upData the last day
}

function previousMonth() {
    let thisMonth = month.textContent;
    let monthNum = months.indexOf(thisMonth);

    // upData the month and the year
    if(monthNum === 0) {
        month.textContent = months[11];
        year.textContent -= 1;
    } else {
        month.textContent = months[monthNum - 1];
    }
    let numOfDaysInMonth = getDaysInMonth();
    beforeDays(firstDay, numOfDaysInMonth);
}
function beforeDays(first, numOfDaysInMonth) {
    
    let b = weakDays.indexOf(first); //b =5
    let a = numOfDaysInMonth % 7; //a = 3
    if(b>=a) {
        first = weakDays[b-a];
    } else {
        let c = 7 + b-a;
        first = weakDays[c]
    }

    firstDay = first;
    nextDays(firstDay, numOfDaysInMonth);
    
}

function getDaysInMonth() {
    let monthNum = months.indexOf(month.textContent) + 1;
    switch(monthNum) {
        case 1:case 3:case 5:case 7:case 8:case 10:case 12:
            return 31;
        case 4:case 6:case 9:case 11:
            return 30;
        case 2:
            return (((year.textContent % 400 === 0) ||(year.textContent % 100 !== 0)) && (year.textContent % 4 === 0))? 29:28;
            
        default:
            throw new Error('Ivalid month');
    }
    
}