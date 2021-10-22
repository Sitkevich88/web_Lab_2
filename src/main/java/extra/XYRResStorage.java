package extra;

import java.io.Serializable;

public class XYRResStorage implements Serializable {
    private Double x;
    private Double y;
    private Double r;
    private Boolean res;

    public XYRResStorage(Double x, Double y, Double r, Boolean res) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.res = res;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public Boolean getRes(){
        return res;
    }
}
