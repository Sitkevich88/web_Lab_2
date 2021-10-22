package servlets;

import extra.XYRResStorage;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet  {

    private final double[] xOptions = new double[]{-2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0};
    private final double[] rOptions = new double[]{1.0, 1.5, 2.0, 2.5, 3.0};

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String xString = req.getParameter("x");
        String yString = req.getParameter("y");
        String rString = req.getParameter("r");
        double x;
        double y;
        double r;
        try{
            x = Double.parseDouble(xString);
            y = Double.parseDouble(yString);
            r = Double.parseDouble(rString);
            boolean isPointInArea = checkArea(x, y, r); //TODO and what??
            XYRResStorage storage = new XYRResStorage(x, y, r, isPointInArea);
            getServletContext().setAttribute("rawOfValues", storage);
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        } catch (NumberFormatException e){
            resp.sendError(400, "Incorrect arguments"); //todo
            resp.getOutputStream().close();
        }
    }

    private boolean checkArea(double x, double y, double r){
        boolean inArea = false;
        if (validateXYR(x, y, r)){
            inArea = checkAreaWithValidXYR(x, y, r);
        }
        return inArea;
    }

    private boolean validateX(double x){
        for (double i : xOptions){
            if (x==i){
                return true;
            }
        }
        return false;
    }

    private boolean validateY(double y){
        return y >= -5.0 && y <= 5.0;
    }

    private boolean validateR(double r){
        for (double i : rOptions){
            if (r==i){
                return true;
            }
        }
        return false;
    }

    private boolean validateXYR(double x, double y, double r){
        return validateX(x) && validateY(y) && validateR(r);
    }

    private boolean checkAreaWithValidXYR(double x, double y, double r){

        boolean res = false;

        if (x<=0 && y<=0){
            if (x>=-r && y>=-r){
                res = true;
            }
        }else if (x<=0 && y>0){
            if (y<=(x+r)){
                res = true;
            }
        }else if (x>0 && y<=0){
            if ((x*x+y*y)<=(r*r/4)){
                res = true;
            }
        }

        return res;
    }
}
