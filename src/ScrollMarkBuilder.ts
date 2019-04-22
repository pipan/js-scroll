import { DomService, EmitterService } from "@wildebeest/common";
import { ScrollMark } from "./ScrollMark";
import { injectable, inject } from "inversify";
import { DragableComponent } from "@wildebeest/drag";
import { Component, ComponentBuilder } from "@wildebeest/component";

@injectable()
export class ScrollMarkBuilder implements ComponentBuilder
{
    protected domService: DomService;
    protected emitterService: EmitterService;
    protected template: string;

    constructor(@inject(DomService) domService: DomService, @inject(EmitterService) emitterService: EmitterService)
    {
        this.domService = domService;
        this.emitterService = emitterService;
        this.template = '<div class="scroll-bar__mark"></div>';
    }

    build(data: any = {}): Component
    {
        let scrollMarkElement = this.domService.create(this.template);
        return new ScrollMark(scrollMarkElement, this.emitterService.createEmitter());
    }

    setTemplate(template: string): void
    {
        this.template = template;
    }
}