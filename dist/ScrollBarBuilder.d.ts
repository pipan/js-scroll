import { EmitterService, DomService } from "@wildebeest/common";
import { ScrollMarkBuilder } from "./ScrollMarkBuilder";
import { ComponentBuilder } from "@wildebeest/component";
export declare class ScrollBarBuilder implements ComponentBuilder {
    protected domService: DomService;
    protected scrollMarkBuilder: ScrollMarkBuilder;
    protected emitterService: EmitterService;
    protected template: string;
    constructor(domService: DomService, scrollMarkBuilder: ScrollMarkBuilder, emitterService: EmitterService);
    build(data?: any): any;
    setTemplate(template: string): void;
}
