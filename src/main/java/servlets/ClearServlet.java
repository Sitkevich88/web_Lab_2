package servlets;

import extra.XYRResStorage;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class ClearServlet extends HttpServlet  {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String cookieName = "sessionId";
        try{
            Cookie[] cookies = req.getCookies();
            for (Cookie cookie : cookies){
                if (cookie.getName().equals(cookieName)){
                    clearInfo(cookie);
                    break;
                }
            }
        } catch (NumberFormatException e){
            log(e.getMessage());
        }finally {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
    private void clearInfo(Cookie cookie){
        String sessionId = cookie.getValue();
        HashMap<String, ArrayList<XYRResStorage>> resStorages = (HashMap<String, ArrayList<XYRResStorage>>) getServletContext().getAttribute("results");
        if (resStorages.containsKey(sessionId)){
            resStorages.get(sessionId).clear();
        } else {
            ArrayList<XYRResStorage> libraryOfStorages = new ArrayList<>();
            resStorages.put(sessionId, libraryOfStorages);
        }
    }

    @Override
    public void init() throws ServletException {
        super.init();
        HashMap<String, ArrayList<XYRResStorage>> results = new HashMap<>();
        if (getServletContext().getAttribute("results")==null){
            getServletContext().setAttribute("results", results);
        }
    }
}
