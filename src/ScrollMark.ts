import { Emitter } from "@wildebeest/common";
import { Component } from "@wildebeest/component";
import { DragableComponent } from "@wildebeest/drag";

export class ScrollMark implements Component
{
    protected element: any;
    protected emitter: Emitter;
    protected position: number = 0;
    protected height: number = 0;

    constructor(element: any, emitter: Emitter)
    {
        this.element = element;
        this.emitter = emitter;

        new DragableComponent(this.getElement(), this.getEmitter());
    }

    public getElement(): any
    {
        return this.element;
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }

    public setPosition(normalizedPosition: number): void
    {
        normalizedPosition = Math.min(Math.max(normalizedPosition, 0), 1);
        let changed: boolean = this.position != normalizedPosition;
        this.position = normalizedPosition;
        if (changed) {
            this.emitter.emit('wbMove', this.position);
        }
    }

    public addToPosition(normalizedPosition: number): void
    {
        this.setPosition(this.position + normalizedPosition);
    }

    public setHeight(value: number): void {
        this.height = value;
        this.updateElement();
        
    }

    public getPosition(): number
    {
        return this.position;
    }

    protected getTopPercentage(): number
    {
        return (1 - this.height) * this.position * 100;
    }

    protected getHeightPercentage(): number
    {
        return this.height * 100;
    }

    protected updateElement(): void
    {
        this.element.style.height = this.getHeightPercentage() + "%";
        this.element.style.top = this.getTopPercentage() + "%";
    }
}