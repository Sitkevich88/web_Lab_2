const cv = document.getElementById("graph");
const cx = cv.getContext("2d");
const w = cv.width;
const h = cv.height;
const scale = 5;
const unit = (h / (2*scale))*0.9;
var globalX;
/*var dots = new Array();*/



/*function showRError(){
    $("#r-error").css({"visibility":"visible"});
}
function hideRError(){
    $("#r-error").css({"visibility":"hidden"});
}*/
//если r уже установлено, то функция нажимает на нужную кнопку x, вводит значение в поле y, сохраняет x в globalX
function setCoordinates(x, y) {
    if (isRSet()){
        setX(x);
        setY(y);
    } else {
        /*alert("Сначала надо определить R");*/
        /*showRError();*/
        $('#r-error').css({"visibility":"visible"});
    }
}
//валидация y, ввод значения в поле
function setY(y){
    if (y<-5){
        y=-5;
    }else if(y>5){
        y=5;
    }
    document.getElementById("yname").value = y.toFixed(3);
}
//валидация x, выбор нужной кнопки
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
    let buttonId = 'x' + ((res + 2)*2+1);
    let button = document.getElementById(buttonId);
    button.click();
    //button.focus();
}
//проверка, выбрано ли r
function isRSet(){
    return Number($("select.rvalues").children("option:selected").val()) > 0;
}
//при перезагрузке страници отрисовка canvas занаво
window.onload = function() {
    /*if (document.cookie.indexOf('dots=')!=(-1)){
        dots = JSON.parse($.cookie('dots'));
    }*/
    redraw();
}
//при изменение параметра r изменяется размер фигуры на координатной плоскости
$(document).ready(function () {
    //$.cookie.json = true;
    $("select.rvalues").change(function(){
        redraw();
        /*hideRError();*/
        $('#r-error').css({"visibility":"hidden"});
    });
})
//мы определяем координаты клика на canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: convertXtoUnits(evt.clientX - rect.left),
        y: convertYtoUnits(evt.clientY - rect.top)
    };
}
//в силу масштабируемости окна нужно конвертировать x в реальное значение
function convertXtoUnits(x1){
    let localWidth = document.getElementById("graph").clientWidth;
    return (x1 - localWidth/2)/( localWidth * 0.9/ (2*scale));
}
//в силу масштабируемости окна нужно конвертировать y в реальное значение
function convertYtoUnits(y1){
    let localHeight = document.getElementById("graph").clientHeight;
    return (localHeight/2 - y1)/(localHeight * 0.9 / (2*scale));
}
//при клике по canvas определяем координаты и устанавливаем
cv.addEventListener('click', function(evt) {
    var mousePos = getMousePos(cv, evt);
    setCoordinates(mousePos.x, mousePos.y);
}, false);
//отрисовка всего
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
    cx.fillStyle = "#3398fd";
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
    drawAllDots();
}
//заливаем canvas белым (это фон коорд. плоскости)
function clear(){
    cx.fillStyle = "#FFFFFF";
    cx.beginPath();
    cx.moveTo(0, 0);
    cx.lineTo(0, h);
    cx.lineTo(w, h);
    cx.lineTo(w, 0);
    cx.fill();
}
//чертим оси x, y
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
    //проставляем числа над осями
    for (let i = -scale; i<=scale; i++){
        if (i<=0){
            cx.fillText(i, x+i*unit-10, y+15);
        }else {
            cx.fillText(i, x+i*unit-5, y+15);
        }
        if(i===0){continue;}
        cx.fillText(i, x+2, y-i*unit+5);
    }
}
//чертим выбранные точки
function drawAllDots() {
    for (let index = 0; index < dots.length; ++index) {
        drawADot(dots[index]);
    }
}
//чертит точку
function drawADot(dot){
    let dotX = dot.x*unit + w/2;
    let dotY = h/2 - dot.y*unit;

    cx.fillStyle = "#ee0f22";
    cx.beginPath();
    cx.arc(dotX, dotY, 2.5, 0 , Math.PI * 2);
    cx.fill();
}

/*//добавляем точку в хранилище
function addDot(dot){
    let arguments = dot.split("&");
    let dotX;
    let dotY;
    for (let index = 0; index < arguments.length; ++index) {
        if (arguments[index].includes("x")){
            dotX = arguments[index].split("=")[1];
        } else if(arguments[index].includes("y")){
            dotY = arguments[index].split("=")[1];
        }
    }
    if((typeof dotX != 'undefined') &&(typeof dotY != 'undefined')){
        console.log("Добавляю точку", dotX, dotY);
        let dot = {
            x: dotX,
            y: dotY
        };

        dots.push(dot);
        /!*let dot = [dotX, dotY];
        for (let i = 0; i<10; i++){
            console.log("видно");
        }
        dots.push(dot);
        //$.cookie('foo', '42');
        $.cookie('dots', JSON.stringify(dots));
    }
}function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}*/

