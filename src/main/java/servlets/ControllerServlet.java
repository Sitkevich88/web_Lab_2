package servlets;

import java.io.*;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class ControllerServlet extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map params = request.getParameterMap();
        boolean hasToClear = params.containsKey("do") && request.getParameter("do").equals("clear");
        boolean containsKeys = params.containsKey("x") && params.containsKey("y") && params.containsKey("r");
        if (hasToClear){
            try {
                getServletContext().getNamedDispatcher("ClearServlet").forward(request, response);
            } catch (ServletException | IOException e) {
                log(e.getMessage());
            }
        }else if (containsKeys && params.get("x")!=null && params.get("y")!=null && params.get("r")!=null){
            try {
                getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
            } catch (ServletException | IOException e) {
                log(e.getMessage());
            }
        } else {
            response.sendError(400, "Incorrect Request");
            response.getOutputStream().close();
        }
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        response.getWriter().println("<html><body><p>Use " + "POST instead!</p></body></html>");
    }
}
