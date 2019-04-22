import { DomService, EmitterService, Emitter } from "@wildebeest/common";
import { TouchComponent } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { ScrollBarBuilder } from "./ScrollBarBuilder";
import { injectable, inject, named } from "inversify";
import { ScrollMark } from "./ScrollMark";
import { DragableComponent } from "@wildebeest/drag";

@injectable()
export class ScrollBox 
{
    protected domService: DomService;
    protected scrollBarBuilder: ScrollBarBuilder;
    protected emitterService: EmitterService;
    protected emitter: Emitter;
    protected scrollBar: ScrollBar;
    protected touchComponent: TouchComponent;
    protected element: HTMLElement;
    protected pane: HTMLElement;
    protected config: any;
    protected scrollClassTimeout: any = null;

    constructor(@inject(DomService) domService: DomService, @inject('Builder') @named('scroll-bar') scrollBarBuilder: ScrollBarBuilder, @inject(EmitterService) emitterService: EmitterService) 
    {
        this.domService = domService;
        this.scrollBarBuilder = scrollBarBuilder;
        this.emitterService = emitterService;
        this.emitter = this.emitterService.createEmitter();
    }

    initialize(element: HTMLElement, config: any = {}): void
    {
        this.element = element;
        this.config = config;
        this.touchComponent = new TouchComponent(this.element, this.emitter);
        this.pane = this.element.firstElementChild as HTMLElement;
        if (this.element.children.length > 1) {
            throw "Scroll Box cannot have more then 1 child element";
        }
        
        this.scrollBar = this.scrollBarBuilder.build({
            emitter: this.emitter
        });
        this.domService.insert(this.scrollBar.getElement(), this.element);

        let mark: ScrollMark = this.getBar().getMark();
        new DragableComponent(mark.getElement(), mark.getEmitter());
        mark.getEmitter().on('wbDrag', (event: any) => {
            this.scrollBar.scrollBy(event.vertical);
        });

        this.element.addEventListener('mousewheel', (event: WheelEvent) => {
            event.preventDefault();
            this.scrollBar.scrollBy(event.deltaY);
        });

        this.touchComponent.getEmitter().on('wbTouchscroll', (event: any) => {
            this.scrollBar.scrollBy(event.vertical);
        })

        this.scrollBar.getEmitter().on('wbScroll', this.scrollTo.bind(this));        

        this.recalc();
    }

    protected scrollTo(interpolatePercentage: number): void
    {
        if (this.config.onScroll.class) {
            if (this.scrollClassTimeout) {
                clearTimeout(this.scrollClassTimeout);
            }
            this.scrollClassTimeout = setTimeout(() => {
                this.element.classList.remove(this.config.onScroll.class);
            }, this.config.onScroll.delay);
            this.element.classList.add(this.config.onScroll.class);
        }
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

    public getBar(): ScrollBar
    {
        return this.scrollBar;
    }

    public getPane(): HTMLElement
    {
        return this.pane;
    }
}