<%@ page import="extra.XYRResStorage" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); %>

<!DOCTYPE HTML>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web project #2</title>
    <link rel="icon" href="icon-programmer-25.jpg">
    <link rel="stylesheet" href="css/style-with-themes.css">
    <script src="js/themes-changer.js"></script>
    <%--<script src="js/jquery.cookie-1.4.1.min.js"></script>--%>
    <script src="js/js.cookie.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min.js"></script>
    <script>
        var dots = new Array();
    </script>
</head>
<body>
<header class="header header-or-footer">
    <p>Ситкевич Валерий Андреевич P3214 вариант 5252</p>
    <button id="switch" onclick="toggleTheme()">Сменить тему</button>
</header>
<div class="grid-container">
    <div class="panel leftpane">
        <div id="leftInfo">
            <canvas id="graph" class="image" width="250" height="250">
                Your browser does not support the HTML5 canvas tag.</canvas>
            <br>
            <form class="form" id="myForm" role="form" >

                <div class="xvalues">
                    <span>X: </span><input type="button" value="-2" id="x1" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="-1.5" id="x2" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="-1" id="x3" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="-0.5" id="x4" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="0" id="x5" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="0.5" id="x6" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="1" id="x7" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="1.5" id="x8" onclick="unbuttonAllExcept(this)">
                    <input type="button" value="2" id="x9" onclick="unbuttonAllExcept(this)">
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
    <%--<%!public static ArrayList<XYRResStorage> listOfStorages = new ArrayList<>();%>
    <%
        try {
            XYRResStorage storage = (XYRResStorage) request.getServletContext().getAttribute("rawOfValues");
            if (storage!=null && listOfStorages!=null){
                listOfStorages.add(storage);
            }
        } catch (Exception e){}
    %>--%>
    <div class="panel rightpane">
        <table id="server_results">
            <tbody id="tbody-results">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                </tr>
                <%
                    ArrayList<XYRResStorage> myResults;
                    String currentId = "";

                    Cookie[] cookies = request.getCookies();
                    if (cookies!=null){
                        for (Cookie cookie : cookies){
                            if (cookie.getName().equals("sessionId")){
                                currentId = cookie.getValue();
                            }
                        }
                    }
                    HashMap<String, ArrayList<XYRResStorage>> allResults = (HashMap<String, ArrayList<XYRResStorage>>) request.getServletContext().getAttribute("results");
                    if (allResults!=null && allResults.get(currentId)!=null){
                        myResults = allResults.get(currentId);
                        if(myResults.size()>0){
                            XYRResStorage lastInputs = myResults.get(myResults.size()-1);
                            pageContext.setAttribute("x", lastInputs.getX());
                            pageContext.setAttribute("y", lastInputs.getY());
                            pageContext.setAttribute("r", lastInputs.getR());
                        }
                    } else {
                        myResults = new ArrayList<>();
                    }
                    pageContext.setAttribute("myResults", myResults);
                %>
                <c:forEach items="${myResults}" var="result">
                    <%--<script>
                        dots.push({
                            x: ${result.getX()},
                            y: ${result.getY()}
                        });
                    </script>--%>
                    <tr>
                        <td>${result.getX()}</td>
                        <td>${result.getY()}</td>
                        <td>${result.getR()}</td>
                        <td>${result.getRes()}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>
<footer class="footer header-or-footer">
<script src="js/canvasManipulations1.js"></script>
<script src="js/input_validation.js"></script>
<script src="js/xButtonsManipulations.js"></script>
<script>
<c:forEach items="${myResults}" var="result">
    dots.push({
    x: ${result.getX()},
    y: ${result.getY()}
});
</c:forEach>
</script>
<%
    if(myResults!=null && myResults.size()>0)  {
%>
<script>
    setX(${x});
    setY(${y});
    $("#rname").val(${r});
</script>
<%
}
%>

</footer>
</body>
</html>