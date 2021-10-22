const cv = document.getElementById("graph");
const cx = cv.getContext("2d");
const w = cv.width;
const h = cv.height;
const scale = 5;
const unit = (h / (2*scale))*0.9;
var globalX;


function setCoordinates(x, y) {
    if (isRSet()){
        setX(x);
        setY(y);
        /*alert("Good");*/
    } else {
        alert("Сначала надо определить R");
    }
}
function setY(y){
    if (y<-5){
        y=-5;
    }else if(y>5){
        y=5;
    }
    document.getElementById("yname").value = y.toFixed(3);;
}
function setX(x) {
    let arrayOfx = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
    let res;
    if (x<-2){
        res=-2;
    }else if(x>2){
        res=2;
    } else {
        res = arrayOfx[0];
        for (const i of arrayOfx) {
            if (Math.abs(i-x)<Math.abs(res-x)){
                res = i;
            }
        }
    }
    /*globalX = res;*/
    let buttonId = 'x' + ((res + 2)*2+1);
    let button = document.getElementById(buttonId);
    button.click();
    button.focus();

}
function isRSet(){
    return Number($("select.rvalues").children("option:selected").val()) > 0;
}
window.onload = function() {
    redraw();
}
$(document).ready(function () {
    $("select.rvalues").change(function(){
        redraw();
    });
})
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: convertXtoUnits(evt.clientX - rect.left),
        y: convertYtoUnits(evt.clientY - rect.top)
        /*y: evt.clientY - rect.top*/
    };
}
function convertXtoUnits(x1){
    return (x1 - document.getElementById("graph").clientWidth/2)/( document.getElementById("graph").clientWidth/ ((2*scale))*0.9);
}
function convertYtoUnits(y1){
    return (document.getElementById("graph").clientHeight/2 - y1)/((document.getElementById("graph").clientHeight / (2*scale))*0.9);
}

cv.addEventListener('click', function(evt) {
    var mousePos = getMousePos(cv, evt);
    setCoordinates(mousePos.x, mousePos.y);
}, false);

function redraw(){
    let r;
    const x0 = w/2;
    const y0 = h/2;
    if (isRSet()){
        r = Number($("select.rvalues").children("option:selected").val());
    }else{
        r = 0;
    }
    clear();
    r*=unit;
    cx.fillStyle = "#3398fd"
    cx.beginPath();
    cx.moveTo(x0, y0);
    cx.lineTo(x0, y0-r);
    cx.lineTo(x0-r, y0);
    cx.fill();

    cx.beginPath();
    cx.moveTo(x0-r, y0);
    cx.lineTo(x0-r, r+y0);
    cx.lineTo(x0, r+y0);
    cx.lineTo(x0, y0);
    cx.fill();

    cx.beginPath();
    cx.arc(x0, y0, r/2, 0 , Math.PI * 1/2);
    cx.lineTo(x0, y0);
    cx.fill();

    drawGrid(cx, x0, y0);

}
function clear(){
    cx.fillStyle = "#FFFFFF";
    cx.beginPath();
    cx.moveTo(0, 0);
    cx.lineTo(0, h);
    cx.lineTo(w, h);
    cx.lineTo(w, 0);
    cx.fill();
}

function drawGrid(cx, x, y) {
    cx.fillStyle = "#000000";
    cx.beginPath();
    cx.moveTo(0, y);
    cx.lineTo(2*x, y);
    cx.moveTo(x, 0);
    cx.lineTo(x, 2*y);
    cx.closePath();
    cx.stroke();
    cx.font = '20px serif';
    for (let i = -scale; i<=scale; i++){
        if (i<=0){
            cx.fillText(i, x+i*unit-10, y+15);
        }else {
            cx.fillText(i, x+i*unit-5, y+15);
        }
        if(i==0){continue;}
        cx.fillText(i, x+2, y-i*unit+5);
    }
}