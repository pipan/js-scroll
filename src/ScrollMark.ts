import { Emitter, EmitterService } from "@wildebeest/common";
import { DragableElement } from "@wildebeest/drag";

export class ScrollMark
{
    protected element: any;
    protected emitter: Emitter;
    protected position: number = 0;
    protected height: number = 0;

    constructor(element: any, emitterService: EmitterService)
    {
        this.element = element;
        this.emitter = emitterService.createEmitter();

        let dragable: DragableElement = new DragableElement(this.element, this.emitter);
    }

    public getElement(): any
    {
        return this.element;
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }

    public setTop(value: number): void
    {
        if (value < 0) {
            value = 0;
        }
        if (value > 100 - this.height) {
            value = 100 - this.height;
        }
        let changed: boolean = this.position != value;
        this.position = value;
        this.element.style.top = value + "%";
        if (changed) {
            this.emitter.emit('move', this.getInterpolatedPosition());
        }
    }

    protected getInterpolatedPosition(): number
    {
        return this.position / (100 - this.height);
    }

    public setHeight(value: number): void {
        this.height = value;
        this.element.style.height = this.height + "%";
        this.setTop(this.position);
    }

    public getTop(): number
    {
        return this.position;
    }
}