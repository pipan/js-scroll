import { EmitterService, DomService } from "@wildebeest/common";
import { ComponentBuilder } from "@wildebeest/component";
export declare class ScrollBarBuilder implements ComponentBuilder {
    protected domService: DomService;
    protected scrollMarkBuilder: ComponentBuilder;
    protected emitterService: EmitterService;
    protected template: string;
    constructor(domService: DomService, scrollMarkBuilder: ComponentBuilder, emitterService: EmitterService);
    build(data?: any): any;
    setTemplate(template: string): void;
}
