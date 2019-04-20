import { ScrollMark } from "./ScrollMark";
import { Emitter } from "@wildebeest/common";
export declare class ScrollBar {
    protected element: any;
    protected mark: ScrollMark;
    protected emitter: Emitter;
    constructor(element: any, mark: ScrollMark, emitter: Emitter);
    getElement(): any;
    getMark(): ScrollMark;
    getEmitter(): Emitter;
    scrollTo(percentage: number): void;
    scrollBy(value: number): void;
    setProportion(heightProportion: number): void;
}
