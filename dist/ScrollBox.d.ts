import { DomService, EmitterService } from "@wildebeest/common";
import { TouchElement } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { ScrollBarBuilder } from "./ScrollBarBuilder";
export declare class ScrollBox {
    protected domService: DomService;
    protected scrollBarBuilder: ScrollBarBuilder;
    protected emitterService: EmitterService;
    protected scrollBar: ScrollBar;
    protected touchElement: TouchElement;
    protected element: any;
    protected pane: any;
    constructor(domService: DomService, scrollBarBuilder: ScrollBarBuilder, emitterService: EmitterService);
    initialize(element: any): void;
    scrollTo(interpolatePercentage: number): void;
    recalc(): void;
}
