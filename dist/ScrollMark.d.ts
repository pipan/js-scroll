import { Emitter, EmitterService } from "@wildebeest/common";
export declare class ScrollMark {
    protected element: any;
    protected emitter: Emitter;
    protected position: number;
    protected height: number;
    constructor(element: any, emitterService: EmitterService);
    getElement(): any;
    getEmitter(): Emitter;
    setTop(value: number): void;
    protected getInterpolatedPosition(): number;
    setHeight(value: number): void;
    getTop(): number;
}
