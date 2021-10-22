<%@ page import="extra.XYRResStorage" %>
<%@ page import="java.util.ArrayList" %>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); %>

<!DOCTYPE HTML>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web project #1</title>
    <link rel="icon" href="./resources/icon-programmer-25.jpg">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header class="header header-or-footer">
    <p>Ситкевич Валерий Андреевич P3214 вариант 5252</p>
</header>
<div class="grid-container">
    <div class="panel leftpane">
        <div id="leftInfo">
            <canvas id="graph" class="image" width="250" height="250">
                Your browser does not support the HTML5 canvas tag.</canvas>
            <br>
            <form class="form" id="myForm" role="form" >

                <div class="xvalues">
                    <span>X: </span><input type="button" value="-2" id="x1" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="-1.5" id="x2" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="-1" id="x3" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="-0.5" id="x4" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="0" id="x5" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="0.5" id="x6" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="1" id="x7" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="1.5" id="x8" name="x" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="2" id="x9" name="x" onclick="unbuttonAllExcept(this)">

                    <br><br>
                </div>

                <label for="yname">Y: </label>
                <input autocomplete="false" type="text" id="yname" name="y"><br><br>
                <label for="rname">R: </label>
                <select id="rname" name="r" required class="rvalues">
                    <option hidden disabled selected value>Надо выбрать</option>
                    <option value=1>1</option>
                    <option value=1.5>1.5</option>
                    <option value=2>2</option>
                    <option value=2.5>2.5</option>
                    <option value=3>3</option>
                </select>
                <br><br>
                <button type="submit" id="submitRequest">Отправить</button>
            </form>
        </div>
    </div>
    <div class="panel rightpane">
        <table id="server_results">
            <tbody id="tbody-results">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                </tr>
                <%--<%!public static ArrayList<XYRResStorage> listOfStorages = new ArrayList<>();%>
                <%
                    try {
                        XYRResStorage storage = (XYRResStorage) request.getServletContext().getAttribute("rawOfValues");
                        if (storage!=null && listOfStorages!=null){
                            listOfStorages.add(storage);
                        }
                    } catch (Exception e){}

                    /*if (listOfStorages!= null && listOfStorages.size()>0){
                        for (XYRResStorage st : listOfStorages){
                            out.print("<tr>\n"+"<td>"+st.getX()+"</td>\n"+"<td>"+st.getY()+"</td>\n"+"<td>"+st.getR()+"</td>\n"+"<td>"+st.getRes().toString()+"</td>\n"+"</tr");
                            *//*out.println("<td>"+st.getX()+"</td>");
                            out.println("<td>"+st.getY()+"</td>");
                            out.println("<td>"+st.getR()+"</td>");
                            out.println("<td>"+st.getRes().toString()+"</td>");
                            out.println("</tr>");*//*
                        }
                    }*/
                %>
                <%if (listOfStorages!= null && listOfStorages.size()>0){%>
                    <% for(XYRResStorage st : listOfStorages) { %>
                    <tr>
                        <td><%=st.getX()%></td>
                        <td><%=st.getY()%></td>
                        <td><%=st.getR()%></td>
                        <td><%=st.getRes().toString()%></td>
                        </tr>
                    </tr>
                    <% } %>
                <% } %>--%>

            </tbody>
        </table>
    </div>
</div>
<footer class="footer header-or-footer">

</footer>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min.js"></script>
<script>
    $(document).ready(function () {

        /*$("#submitRequest").click( function(event) {
            event.preventDefault();
        });*/
        $.validator.addMethod("isXButtonClicked", function(value) {
            let good = true;
            if (value){
                good = checkX();
            }
            return good;
        }, 'X is not selected');

        $("#myForm").validate({
            rules: {
                "y": {
                    required: true,
                    min: -5,
                    max: 5,
                    isXButtonClicked: true
                },
                "r": {
                    required: true,
                    isXButtonClicked: true
                }
            },
            submitHandler: function (form) {
                var formData = $(form).serialize();
                console.log(formData);
                formData= "x=" + globalX + "&" + formData;
                $.ajax({
                    url: "controller",
                    type: "post",
                    data: formData,
                    beforeSend: function () {

                    },
                    success: function (data) {
                        document.innerHTML = data;
                        location.reload(true);
                    }
                });
            }
        });

    });
    /*function postIt(formData){
        $.ajax({
            url: "controller",
            type: "post",
            data: formData,
            beforeSend: function () {

            },
            success: function (data) {
                document.innerHTML = data;
                location.reload();
            }
        });
    }*/
    $('#yname').keypress(function (e) {
        var txt = String.fromCharCode(e.which);
        if (!txt.match(/[0-9&.-]/)) {
            return false;
        }
    });

</script>
<script src="canvasManipulations.js"></script>
<script src="xButtonsManipulations.js"></script>
</body>
</html>