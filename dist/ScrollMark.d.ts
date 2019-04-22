import { Emitter } from "@wildebeest/common";
import { Component } from "@wildebeest/component";
export declare class ScrollMark implements Component {
    protected element: any;
    protected emitter: Emitter;
    protected position: number;
    protected height: number;
    constructor(element: any, emitter: Emitter);
    getElement(): any;
    getEmitter(): Emitter;
    setTop(value: number): void;
    protected getInterpolatedPosition(): number;
    setHeight(value: number): void;
    getTop(): number;
}
