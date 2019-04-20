import { DomService, EmitterService } from "@wildebeest/common";
import { Builder } from "./Builder";
import { ScrollMark } from "./ScrollMark";
import { injectable, inject } from "inversify";

@injectable()
export class ScrollMarkBuilder implements Builder
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

    build(data: any = {}): any
    {
        let scrollMarkElement = this.domService.create(this.template);
        return new ScrollMark(scrollMarkElement, this.emitterService);
    }

    setTemplate(template: string): void
    {
        this.template = template;
    }
}