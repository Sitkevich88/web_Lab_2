package servlets;

import java.io.*;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

/*@WebServlet(name = "Controller Servlet", value = "/controller")*/
public class ControllerServlet extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map params = request.getParameterMap();
        if (params.containsKey("x") && params.containsKey("y") && params.containsKey("r")){
            try {
                getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
            } catch (ServletException | IOException e) {
                e.printStackTrace();
            }
        } else {
            response.sendError(400, "Not enough arguments");
            response.getOutputStream().close();
        }
    }
}