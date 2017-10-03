import { BezierPath } from './bezierPath'
const Proto = require("./svga.pb")

export class FrameEntity {

    alpha = 0.0;

    transform = {
        a: 1.0,
        b: 0.0,
        c: 0.0,
        d: 1.0,
        tx: 0.0,
        ty: 0.0,
    };

    layout = {
        x: 0.0,
        y: 0.0,
        width: 0.0,
        height: 0.0,
    }

    nx = 0.0;

    ny = 0.0;

    /**
     * BezierPath
     */
    maskPath = null;

    /**
     * Object[]
     */
    shapes = [];

    constructor(spec) {
        if (spec instanceof Proto.FrameEntity) {
            this.alpha = spec.getAlpha() || 0.0;
            if (spec.hasLayout()) {
                this.layout.x = spec.getLayout().getX() || 0.0;
                this.layout.y = spec.getLayout().getY() || 0.0;
                this.layout.width = spec.getLayout().getWidth() || 0.0;
                this.layout.height = spec.getLayout().getHeight() || 0.0;
            }
            if (spec.hasTransform()) {
                this.transform.a = spec.getTransform().getA() || 1.0;
                this.transform.b = spec.getTransform().getB() || 0.0;
                this.transform.c = spec.getTransform().getC() || 0.0;
                this.transform.d = spec.getTransform().getD() || 1.0;
                this.transform.tx = spec.getTransform().getTx() || 0.0;
                this.transform.ty = spec.getTransform().getTy() || 0.0;
            }
            if (spec.getClippath() && spec.getClippath().length > 0) {
                this.maskPath = new BezierPath(spec.getClippath(), undefined, { fill: "#000000" });
            }
            if (spec.getShapesList().length > 0 && spec.getShapesList()[0].getType === Proto.ShapeEntity.ShapeType.KEEP) {
                this.shapes = FrameEntity.lastShapes;
            }
            else {
                this.shapes = spec.getShapesList();
                FrameEntity.lastShapes = spec.getShapesList();
            }
            let llx = this.transform.a * this.layout.x + this.transform.c * this.layout.y + this.transform.tx;
            let lrx = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * this.layout.y + this.transform.tx;
            let lbx = this.transform.a * this.layout.x + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx;
            let rbx = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx;
            let lly = this.transform.b * this.layout.x + this.transform.d * this.layout.y + this.transform.ty;
            let lry = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * this.layout.y + this.transform.ty;
            let lby = this.transform.b * this.layout.x + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
            let rby = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
            this.nx = Math.min(Math.min(lbx, rbx), Math.min(llx, lrx));
            this.ny = Math.min(Math.min(lby, rby), Math.min(lly, lry));
        }
        else if (spec) {
            this.alpha = parseFloat(spec.alpha) || 0.0;
            if (spec.layout) {
                this.layout.x = parseFloat(spec.layout.x) || 0.0;
                this.layout.y = parseFloat(spec.layout.y) || 0.0;
                this.layout.width = parseFloat(spec.layout.width) || 0.0;
                this.layout.height = parseFloat(spec.layout.height) || 0.0;
            }
            if (spec.transform) {
                this.transform.a = parseFloat(spec.transform.a) || 1.0;
                this.transform.b = parseFloat(spec.transform.b) || 0.0;
                this.transform.c = parseFloat(spec.transform.c) || 0.0;
                this.transform.d = parseFloat(spec.transform.d) || 1.0;
                this.transform.tx = parseFloat(spec.transform.tx) || 0.0;
                this.transform.ty = parseFloat(spec.transform.ty) || 0.0;
            }
            if (spec.clipPath && spec.clipPath.length > 0) {
                this.maskPath = new BezierPath(spec.clipPath, undefined, { fill: "#000000" });
            }
            if (spec.shapes) {
                if (spec.shapes[0] && spec.shapes[0].type === "keep") {
                    this.shapes = FrameEntity.lastShapes;
                }
                else {
                    this.shapes = spec.shapes
                    FrameEntity.lastShapes = spec.shapes;
                }
            }
            let llx = this.transform.a * this.layout.x + this.transform.c * this.layout.y + this.transform.tx;
            let lrx = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * this.layout.y + this.transform.tx;
            let lbx = this.transform.a * this.layout.x + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx;
            let rbx = this.transform.a * (this.layout.x + this.layout.width) + this.transform.c * (this.layout.y + this.layout.height) + this.transform.tx;
            let lly = this.transform.b * this.layout.x + this.transform.d * this.layout.y + this.transform.ty;
            let lry = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * this.layout.y + this.transform.ty;
            let lby = this.transform.b * this.layout.x + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
            let rby = this.transform.b * (this.layout.x + this.layout.width) + this.transform.d * (this.layout.y + this.layout.height) + this.transform.ty;
            this.nx = Math.min(Math.min(lbx, rbx), Math.min(llx, lrx));
            this.ny = Math.min(Math.min(lby, rby), Math.min(lly, lry));
        }
    }

}