/*$('input.xButtons').onclick(function (e) {
    globalX = this.value();
});*/

function unbuttonAllExcept(button) {
    globalX = button.value;
    $('.xvalues > input').css({"background-color":"#2b8a8a"});
    $('#'+button.id).css( "background-color", "greenyellow" );
}

function checkX(){
    if (typeof globalX == "undefined"){
        $('.xvalues > input').css({"background-color":"red"});
        console.log(typeof globalX === "undefined");
        return false;
    } else {
        return true;
    }
}

