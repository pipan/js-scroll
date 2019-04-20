import { EmitterService, DomService } from "@wildebeest/common";
import { Builder } from "./Builder";
import { ScrollBar } from "./ScrollBar";
import { ScrollMark } from "./ScrollMark";
import { inject, injectable, named } from "inversify";
import { ScrollMarkBuilder } from "./ScrollMarkBuilder";

@injectable()
export class ScrollBarBuilder implements Builder
{
    protected domService: DomService;
    protected scrollMarkBuilder: ScrollMarkBuilder;
    protected emitterService: EmitterService;
    protected template: string;

    constructor(@inject(DomService) domService: DomService, @inject('Builder') @named('scroll-mark') scrollMarkBuilder: ScrollMarkBuilder, @inject(EmitterService) emitterService: EmitterService)
    {
        this.domService = domService;
        this.scrollMarkBuilder = scrollMarkBuilder;
        this.emitterService = emitterService;
        this.template = '<div class="scroll-bar"></div>';
    }

    public build(data: any = {}): any
    {
        let scrollMark: ScrollMark = this.scrollMarkBuilder.build();
        let scrollBarElement = this.domService.create(this.template);
        this.domService.insert(scrollMark.getElement(), scrollBarElement);
        return new ScrollBar(scrollBarElement, scrollMark, this.emitterService.createEmitter());
    }

    setTemplate(template: string): void
    {
        this.template = template;
    }
}