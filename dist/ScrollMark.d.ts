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
    setPosition(normalizedPosition: number): void;
    addToPosition(normalizedPosition: number): void;
    setHeight(value: number): void;
    getPosition(): number;
    protected getTopPercentage(): number;
    protected getHeightPercentage(): number;
    protected updateElement(): void;
}
