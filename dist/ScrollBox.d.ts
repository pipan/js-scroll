import { DomService, EmitterService, Emitter } from "@wildebeest/common";
import { TouchComponent } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { ComponentBuilder } from "@wildebeest/component";
export declare class ScrollBox {
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
    protected scrollTo(interpolatePercentage: number): void;
    recalc(): void;
    getBar(): ScrollBar;
    getPane(): HTMLElement;
}
