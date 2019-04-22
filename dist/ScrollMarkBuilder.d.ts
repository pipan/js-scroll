import { DomService, EmitterService } from "@wildebeest/common";
import { Component, ComponentBuilder } from "@wildebeest/component";
export declare class ScrollMarkBuilder implements ComponentBuilder {
    protected domService: DomService;
    protected emitterService: EmitterService;
    protected template: string;
    constructor(domService: DomService, emitterService: EmitterService);
    build(data?: any): Component;
    setTemplate(template: string): void;
}
