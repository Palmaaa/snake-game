const field = document.getElementById("field");

function getCellSize() {
    var divs = [];
    var size = 0;
    var p = (window.innerHeight < window.innerWidth) ? window.innerHeight : window.innerWidth;
    var q = (window.innerHeight < window.innerWidth) ? window.innerWidth : window.innerHeight;

    for(var i = 1; i <= p; i++) {
        if (p % i < 3 && q % i < 3) 
            divs.push(i);
    }
    
    for(var i = 0; i < divs.length; i++) {
        if(Math.abs(30 - divs[i]) < Math.abs(30 - size))
            size = divs[i];
    }
    return size;
}

function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function renderBody(x, y, bodyPos, cache, fieldM) {
    if(bodyPos.length != 0) {
        for(var i = 0; i < bodyPos.length; i++) {
            if(i == 0) {
                fieldM[y][x].style.backgroundColor = "#fff";
                cache = bodyPos[i];
                fieldM[bodyPos[i][0]][bodyPos[i][1]].style.backgroundColor = "#222";
                bodyPos[i] = [y, x];
            } else {
                fieldM[cache[0]][cache[1]].style.backgroundColor = "#fff";
                var swap = cache;
                var cache = bodyPos[i];
                fieldM[bodyPos[i][0]][bodyPos[i][1]].style.backgroundColor = "#222";
                bodyPos[i] = [swap[0], swap[1]];
            }
        }
    }
}

function verify(x, y, bodyPos) {
    bodyPos.forEach(e => {
        if(y == e[0] && x == e[1])
            window.location.replace("index.html");
    });
}

function renderFood(bodyPos, x, y) {
    var food = {
        x: rng(0, cols - 1),
        y: rng(0, rows - 1)
    };
    bodyPos.forEach(e => {
        if(e[0] == food.y && e[1] == food.x)
            renderFood();
        else if (y == food.y && e[1] == x) 
            renderFood();
    });
    fieldM[food.y][food.x].style.backgroundColor = "red";
    return food;
}

var size = getCellSize(), cols = parseInt(window.innerWidth/size), rows = parseInt(window.innerHeight/size);
var fieldM = new Array(rows);
var dir = "";
for(var i = 0; i < rows; i++) {
    fieldM[i] = new Array(cols);
    for(var j = 0; j < cols; j++) {
        var span = document.createElement("span");
        fieldM[i][j] = span;
        span.classList.add("cell");
        span.style.width = size + "px";
        span.style.height = size + "px";
        span.style.top = size * i + "px";
        span.style.left = size * j + "px";
        field.appendChild(span);
    }
}

var y = parseInt(rows/2), x = 6;

var bodyPos = [[y,x-1],[y,x-2]];
var cache = [];
fieldM[y][x].style.backgroundColor = "#fff";
fieldM[y][x-1].style.backgroundColor = "#fff";
fieldM[y][x-2].style.backgroundColor = "#fff";

var food = renderFood(bodyPos, x, y);

setInterval(() => {
    
    if(food.x == x && food.y == y) {
        bodyPos.push([y, x]);
        food = renderFood(bodyPos, x, y);
    }
    
    switch(dir) {
        case 'r':
            if(x < cols - 1) {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                x++;
                fieldM[y][x].style.backgroundColor = "#fff";
            } else if (x == cols - 1) {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                x = 0;
                fieldM[y][x].style.backgroundColor = "#fff";
            }
            break;
        case 'u':
            if(y > 0) {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                y--;
                fieldM[y][x].style.backgroundColor = "#fff";
            } else {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                y = rows - 1;
                fieldM[y][x].style.backgroundColor = "#fff";
            }
            break;
        case 'd':
            if(y < rows - 1) {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                y++;
                fieldM[y][x].style.backgroundColor = "#fff";
            } else if (y == rows - 1) {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                y = 0;
                fieldM[y][x].style.backgroundColor = "#fff";
            }
            break;   
        case 'l':
            if(x > 0) {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                x--;
                fieldM[y][x].style.backgroundColor = "#fff";
            } else {
                fieldM[y][x].style.backgroundColor = "#222";
                renderBody(x, y, bodyPos, cache, fieldM);
                x = cols - 1;
                fieldM[y][x].style.backgroundColor = "#fff";
            }
            break;
            
    }
    verify(x, y, bodyPos);
},50);

setInterval(() => {
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                if(dir != "r")
                dir = "l";
                break;
            case 38:
                if(dir != "d")
                dir = "u";
                break;
            case 39:
                if(dir != "l")
                dir = "r";
                break;
            case 40:
                if(dir != "u")
                dir = "d";
                break;
        }
        document.onkeydown = null;
        console.log(e);
    };
}, 50);
