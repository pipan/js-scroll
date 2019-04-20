import { DomService, EmitterService } from "@wildebeest/common";
import { Builder } from "./Builder";
export declare class ScrollMarkBuilder implements Builder {
    protected domService: DomService;
    protected emitterService: EmitterService;
    protected template: string;
    constructor(domService: DomService, emitterService: EmitterService);
    build(data?: any): any;
    setTemplate(template: string): void;
}
