import '../src/style/style.css'

let container = document.createElement('div');
container.className = 'container';
document.body.append(container);


let h2 = document.createElement('h2');
h2.innerHTML = 'Gem Puzzle';
container.append(h2);

let shuffleBtn = document.createElement('button');
shuffleBtn.innerHTML = 'Shuffle and start';
shuffleBtn.className = 'shuffle-btn';
container.append(shuffleBtn);

let stopBtn = document.createElement('button');
stopBtn.innerHTML = 'Stop';
stopBtn.className = 'stop-btn';
container.append(stopBtn);

let movesTimesWrapper = document.createElement('div');
movesTimesWrapper.className = 'moves-times-wrapper'
container.append(movesTimesWrapper);

let movesDiv = document.createElement('div');
movesTimesWrapper.append(movesDiv);

let movesSpan = document.createElement('span');
movesSpan.innerHTML = 'Moves: ';
movesDiv.append(movesSpan);
let movesSpan1 = document.createElement('span');
movesSpan1.id = 'count'
movesSpan1.innerHTML = '0';
movesDiv.append(movesSpan1);

let timeDiv = document.createElement('div');
movesTimesWrapper.append(timeDiv);
let timeSpan1 = document.createElement('span');
timeSpan1.innerHTML = 'Time: ';
timeDiv.append(timeSpan1);
let timeSpan2 = document.createElement('span');
timeSpan2.id ='min';
timeSpan2.innerHTML = '00:';
timeDiv.append(timeSpan2);
let timeSpan3 = document.createElement('span');
timeSpan3.id = 'sec';
timeSpan3.innerHTML = '00';
timeDiv.append(timeSpan3);


let square3x3 = document.createElement('button');
square3x3.innerHTML = '3x3';
square3x3.className = 'square3x3';
square3x3.onclick = function() {createTable(3)};
container.append(square3x3);

let square4x4 = document.createElement('button');
square4x4.innerHTML = '4x4';
square4x4.className = 'square4x4';
square4x4.onclick = function() {createTable(4)};
container.append(square4x4);

let square5x5 = document.createElement('button');
square5x5.innerHTML = '5x5';
square5x5.className = 'square5x5';
square5x5.onclick = function() {createTable(5)};
container.append(square5x5);

let square6x6 = document.createElement('button');
square6x6.innerHTML = '6x6';
square6x6.className = 'square6x6';
square6x6.onclick = function() {createTable(6)};
container.append(square6x6);

let square7x7 = document.createElement('button');
square7x7.innerHTML = '7x7';
square7x7.className = 'square7x7';
square7x7.onclick = function() {createTable(7)};
container.append(square7x7);

let square8x8 = document.createElement('button');
square8x8.innerHTML = '8x8';
square8x8.className = 'square8x8';
square8x8.onclick = function() {createTable(8)};
container.append(square8x8);

let tableWrapper = document.createElement('div');
tableWrapper.className = 'table-wrapper';
container.append(tableWrapper);

let table = document.createElement('div');
table.className = 'table';
tableWrapper.append(table);

const emptyCell = {
    left: 0,
    top: 0
},
    size = 100;

let numbers = [],
    cells = [],
    counter = 0,
    timer,
    minute = 0,
    second = 0,
    ms = 0;
cells.push(emptyCell);



function move(index) {
    const cell = cells[index],
    leftDiff = Math.abs(emptyCell.left - cell.left),
    topDiff = Math.abs(emptyCell.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return
    }
    countClick(++counter)

    cell.element.style.left = `${emptyCell.left*size}px`;
    cell.element.style.top = `${emptyCell.top*size}px`;

    const emptyLeft = emptyCell.left;
    const emptyTop = emptyCell.top;
    emptyCell.left = cell.left;
    emptyCell.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
}

createTable(4);
function createTable(val) {
    table.style.width = `${val * size}px`;
    table.style.height = `${val * size}px`;
    counter = 0;
    countClick(0);

    numbers = [...Array((val**2)-1).keys()].sort(() => Math.random() - 0.5);
    for(let i = 1; i<cells.length;i++){
        cells[i].element.remove();
    }
    while(cells.length > 1){
        cells.pop();
    }
    emptyCell.left = 0;
    emptyCell.top = 0;
    for (let i=1; i<=((val**2)-1); i++) {
    const num = document.createElement('div');
    num.className ='num';
    num.innerHTML = numbers[i-1]+1;

    const x = i % val,
    y = (i - x)/val;

    cells.push({
        left: x,
        top: y,
        element: num
    });

    num.style.left = `${x*size}px`
    num.style.top = `${y*size}px`

    table.append(num);

    num.addEventListener('click', () => {
        move(i);
        timer = true;
        stopTimer();
    })
}}

shuffleBtn.onclick = function() {
    createTable(Math.sqrt(numbers.length+1))
};

function countClick(value) {
    document.getElementById('count').innerHTML = value;
}

stopBtn.addEventListener('click', function () {
    timer = false;
});
  
shuffleBtn.addEventListener('click', function () {
    timer = false;
    minute = 0;
    second = 0;
    ms = 0;
    document.getElementById('min').innerHTML = "00:";
    document.getElementById('sec').innerHTML = "00";
});
  
function stopTimer() {
    if (timer) {
        ms++;
        if (ms == 1000) {
            second++;
            ms = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            minute = 0;
            second = 0;
        }
  
        let minString = minute;
        let secString = second;
  
        if (minute < 10) {
            minString = "0" + minString + ":";
        }
  
        if (second < 10) {
            secString = "0" + secString;
        }
        console.log(secString)
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        setTimeout(stopTimer, 1000);
    }
}