import { EmitterService, DomService } from "@wildebeest/common";
import { ScrollBar } from "./ScrollBar";
import { ScrollMark } from "./ScrollMark";
import { inject, injectable, named } from "inversify";
import { ScrollMarkBuilder } from "./ScrollMarkBuilder";
import { ComponentBuilder } from "@wildebeest/component";

@injectable()
export class ScrollBarBuilder implements ComponentBuilder
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
        let scrollMark: ScrollMark = this.scrollMarkBuilder.build() as ScrollMark;
        let scrollBarElement = this.domService.create(this.template);
        this.domService.insert(scrollMark.getElement(), scrollBarElement);
        if (!data.emitter) {
            data.emitter = this.emitterService.createEmitter();
        }
        return new ScrollBar(scrollBarElement, scrollMark, data.emitter);
    }

    setTemplate(template: string): void
    {
        this.template = template;
    }
}