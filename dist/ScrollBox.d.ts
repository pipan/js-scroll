import { DomService, EmitterService, Emitter } from "@wildebeest/common";
import { TouchElement } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { ScrollBarBuilder } from "./ScrollBarBuilder";
export declare class ScrollBox {
    protected domService: DomService;
    protected scrollBarBuilder: ScrollBarBuilder;
    protected emitterService: EmitterService;
    protected emitter: Emitter;
    protected scrollBar: ScrollBar;
    protected touchElement: TouchElement;
    protected element: HTMLElement;
    protected pane: HTMLElement;
    protected config: any;
    protected scrollClassTimeout: any;
    constructor(domService: DomService, scrollBarBuilder: ScrollBarBuilder, emitterService: EmitterService);
    initialize(element: HTMLElement, config?: any): void;
    protected scrollTo(interpolatePercentage: number): void;
    recalc(): void;
    getBar(): ScrollBar;
    getPane(): HTMLElement;
}
