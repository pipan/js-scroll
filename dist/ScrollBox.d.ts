import { DomService, EmitterService, Emitter } from "@wildebeest/common";
import { TouchComponent } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { ComponentBuilder, Component } from "@wildebeest/component";
export declare class ScrollBox implements Component {
    protected domService: DomService;
    protected scrollBarBuilder: ComponentBuilder;
    protected emitterService: EmitterService;
    protected emitter: Emitter;
    protected scrollBar: ScrollBar;
    protected touchComponent: TouchComponent;
    protected element: HTMLElement;
    protected pane: HTMLElement;
    protected config: any;
    protected scrollClassTimeout: any;
    constructor(domService: DomService, scrollBarBuilder: ComponentBuilder, emitterService: EmitterService);
    initialize(element: HTMLElement, config?: any): void;
    protected updateView(interpolatePercentage: number): void;
    recalc(): void;
    getBar(): ScrollBar;
    getPane(): HTMLElement;
    getElement(): HTMLElement;
    getEmitter(): Emitter;
    protected normalizeRemaining(pixelValue: number): number;
}
