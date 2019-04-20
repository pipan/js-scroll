import { EmitterService, DomService } from "@wildebeest/common";
import { Builder } from "./Builder";
import { ScrollMarkBuilder } from "./ScrollMarkBuilder";
export declare class ScrollBarBuilder implements Builder {
    protected domService: DomService;
    protected scrollMarkBuilder: ScrollMarkBuilder;
    protected emitterService: EmitterService;
    protected template: string;
    constructor(domService: DomService, scrollMarkBuilder: ScrollMarkBuilder, emitterService: EmitterService);
    build(data?: any): any;
    setTemplate(template: string): void;
}
