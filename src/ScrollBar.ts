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
        mark.getEmitter().on('wbMove', (position: number) => {
            this.emitter.emit('wbScroll', position);
        });

        this.element.addEventListener('mousedown', (event: any) => {
            if (event.button != 0) {
                return;
            }
            let percentage: number = (event.y - this.element.getBoundingClientRect().top - this.mark.getElement().offsetHeight / 2) / this.element.offsetHeight * 100;
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

    public scrollTo(percentage: number): void
    {
        this.mark.setTop(percentage);
    }

    public scrollBy(value: number): void
    {
        let height: number = this.element.offsetHeight;
        if (height == 0) {
            this.mark.setTop(0);
            return;
        }
        let position: number = this.mark.getTop();
        this.mark.setTop(position + value / height * 100);
    }

    public setProportion(heightProportion: number): void
    {
        this.mark.setHeight(heightProportion);
    }
}