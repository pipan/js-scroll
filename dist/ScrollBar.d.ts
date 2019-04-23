import { ScrollMark } from "./ScrollMark";
import { Emitter } from "@wildebeest/common";
import { Component } from "@wildebeest/component";
export declare class ScrollBar implements Component {
    protected element: HTMLElement;
    protected mark: ScrollMark;
    protected emitter: Emitter;
    constructor(element: HTMLElement, mark: ScrollMark, emitter: Emitter);
    getElement(): HTMLElement;
    getMark(): ScrollMark;
    getEmitter(): Emitter;
    scrollTo(normalizetPercentagePosition: number): void;
    scrollBy(normalizetPercentageMovement: number): void;
}
