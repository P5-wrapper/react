import p5 from "p5";
import React from "react";
export interface SketchProps {
    [key: string]: any;
}
export interface Sketch {
    (instance: P5Instance): void;
}
export interface P5WrapperProps extends SketchProps {
    sketch: Sketch;
}
export interface P5Instance extends p5 {
    updateWithProps?: (props: SketchProps) => void;
}
export declare const ReactP5Wrapper: React.NamedExoticComponent<P5WrapperProps>;
