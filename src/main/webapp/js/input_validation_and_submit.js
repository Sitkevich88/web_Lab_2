$(document).ready(function () {

    /*//добавляю валидацию x
    $.validator.addMethod("isXButtonClicked", function(value) {
        let good = true;
        if (value){
            good = checkX();
        }
        return good;
    }, 'X is not selected');*/

    //валидация y, r
    $("#myForm").validate({
        rules: {
            "y": {
                required: true,
                min: -5,
                max: 5,
                maxlength: 6,
                //isXButtonClicked: true
            },
            "r": {
                required: true,
                //isXButtonClicked: true
            }
        }/*,
        //отправка формы на сервер
        submitHandler: function (form) {
            var formData = $(form).serialize();
            formData= "x=" + globalX + "&" + formData; //добавляю значение x отдельно
            $.ajax({
                url: "controller",
                type: "post",
                data: formData,
                beforeSend: function () {

                },
                success: function (data) {
                    document.innerHTML = data; //устанавливаю принятый html
                    location.reload();
                }
            });
        }*/
    });
    $("#myForm").submit(function( event ) {
        var newURL = location.href.split("?")[0];
        window.history.pushState('object', document.title, newURL);
        event.preventDefault();
        if (checkX() && $("#myForm").valid()){
            var formData = $('#myForm').serialize();
            formData= "x=" + globalX + "&" + formData; //добавляю значение x отдельно
            $.ajax({
                url: "controller",
                type: "post",
                data: formData,
                beforeSend: function () {

                },
                success: function (data) {
                    document.innerHTML = data; //устанавливаю принятый html
                    location.reload();
                }
            });
        }else {
            //event.preventDefault();
            //alert("Выберите недостающие параметры");
        }
    });
});

function clearAll(){
    $.ajax({
        url: "controller",
        type: "post",
        data: "do=clear",
        beforeSend: function () {

        },
        success: function (data) {
            document.innerHTML = data; //устанавливаю принятый html
            location.reload();
        }
    });
}

//блокирую ввод недопустимых значений в поле y
$('#yname').keypress(function (e) {
    var txt = String.fromCharCode(e.which);
    if (!txt.match(/[0-9&.-]/)) {
        return false;
    }
});