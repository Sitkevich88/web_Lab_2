/*$('input.xButtons').onclick(function (e) {
    globalX = this.value();
});*/

//эта функция вызывается при нажатии X кнопки
function unbuttonAllExcept(button) {
    globalX = button.value; //запоминаем выбранный x
    $('.xvalues > input').css({"background-color":"#2b8a8a"}); //окрашиваем все X кнопки в голубой
    $('#'+button.id).css( "background-color", "greenyellow" ); //окрашиваем выбранную X кнопку в зеленоватый
}

//функция проверяет, установлено ли уже значение x, если нет, то возвращается false и кнопки подсвечиваются красным
function checkX(){
    if (typeof globalX == "undefined"){
        $('.xvalues > input').css({"background-color":"red"});
        /*console.log(typeof globalX === "undefined");*/
        return false;
    } else {
        return true;
    }
}

