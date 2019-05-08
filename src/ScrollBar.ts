import { ScrollMark } from "./ScrollMark";
import { Emitter } from "@wildebeest/common";
import { Component } from "@wildebeest/component";

export class ScrollBar implements Component
{
    protected element: HTMLElement;
    protected mark: ScrollMark;
    protected emitter: Emitter;

    constructor(element: HTMLElement, mark: ScrollMark, emitter: Emitter)
    {
        this.element = element;
        this.mark = mark;
        this.emitter = emitter;

        this.element.addEventListener('mousedown', (event: any) => {
            if (event.button != 0) {
                return;
            }
            let percentage: number = (event.y - this.element.getBoundingClientRect().top) / this.element.offsetHeight;
            this.scrollTo(percentage);
        });
    }

    public getElement(): HTMLElement
    {
        return this.element;
    }

    public getMark(): ScrollMark
    {
        return this.mark;
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }

    public scrollTo(normalizetPercentagePosition: number): void
    {
        this.mark.setPosition(normalizetPercentagePosition);
    }

    public scrollBy(normalizetPercentageMovement: number): void
    {
        this.mark.addToPosition(normalizetPercentageMovement);
    }
}