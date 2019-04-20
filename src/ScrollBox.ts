import { DomService, EmitterService } from "@wildebeest/common";
import { TouchElement } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { ScrollBarBuilder } from "./ScrollBarBuilder";
import { injectable, inject, named } from "inversify";

@injectable()
export class ScrollBox 
{
    protected domService: DomService;
    protected scrollBarBuilder: ScrollBarBuilder;
    protected emitterService: EmitterService;
    protected scrollBar: ScrollBar;
    protected touchElement: TouchElement;
    protected element: any;
    protected pane: any;

    constructor(@inject(DomService) domService: DomService, @inject('Builder') @named('scroll-bar') scrollBarBuilder: ScrollBarBuilder, @inject(EmitterService) emitterService: EmitterService) 
    {
        this.domService = domService;
        this.scrollBarBuilder = scrollBarBuilder;
        this.emitterService = emitterService;
    }

    initialize(element: any): void
    {
        this.element = element;
        this.touchElement = new TouchElement(this.element, this.emitterService.createEmitter());
        this.pane = this.element.firstElementChild;
        if (this.element.children.length > 1) {
            console.log(this.element.childNodes);
            throw "Scroll Box cannot have more then 1 child element";
        }
        
        this.scrollBar = this.scrollBarBuilder.build();
        this.domService.insert(this.scrollBar.getElement(), this.element);

        this.element.addEventListener('mousewheel', (event: any) => {
            event.preventDefault();
            this.scrollBar.scrollBy(event.deltaY);
        });

        this.touchElement.getEmitter().on('touchScroll', (event: any) => {
            this.scrollBar.scrollBy(event.vertical);
        })

        this.scrollBar.getEmitter().on('scroll', this.scrollTo.bind(this));
        this.scrollBar.getMark().getEmitter().on('drag', (event: any) => {
            this.scrollBar.scrollBy(event.vertical);
        });

        this.recalc();
    }

    public scrollTo(interpolatePercentage: number): void
    {
        this.pane.style.top = (this.pane.offsetHeight - this.element.offsetHeight) * -1 * interpolatePercentage + "px";
    }

    public recalc(): void
    {
        if (!this.pane) {
            return;
        }    
        let heightPercentage: number = this.element.offsetHeight / this.pane.offsetHeight *100;
        this.scrollBar.setProportion(heightPercentage);
    }
}