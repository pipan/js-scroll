import { DomService, EmitterService, Emitter } from "@wildebeest/common";
import { TouchComponent } from "@wildebeest/touch";
import { ScrollBar } from "./ScrollBar";
import { injectable, inject, named } from "inversify";
import { ScrollMark } from "./ScrollMark";
import { ComponentBuilder, Component } from "@wildebeest/component";

@injectable()
export class ScrollBox  implements Component
{
    protected domService: DomService;
    protected scrollBarBuilder: ComponentBuilder;
    protected emitterService: EmitterService;
    protected emitter: Emitter;
    protected scrollBar: ScrollBar;
    protected touchComponent: TouchComponent;
    protected element: HTMLElement;
    protected pane: HTMLElement;
    protected config: any;
    protected scrollClassTimeout: any = null;

    constructor(@inject(DomService) domService: DomService, @inject('ComponentBuilder') @named('scroll-bar') scrollBarBuilder: ComponentBuilder, @inject(EmitterService) emitterService: EmitterService) 
    {
        this.domService = domService;
        this.scrollBarBuilder = scrollBarBuilder;
        this.emitterService = emitterService;
        this.emitter = this.emitterService.createEmitter();
    }

    initialize(element: HTMLElement, config: any = {}): void
    {
        let barEmmiter: Emitter = this.emitterService.createEmitter();
        this.element = element;
        this.config = config;
        this.touchComponent = new TouchComponent(this.element, barEmmiter);
        this.pane = this.element.firstElementChild as HTMLElement;
        if (this.element.children.length == 0) {
            throw "Scroll Box has to have 1 child element";
        }
        if (this.element.children.length > 1) {
            throw "Scroll Box cannot have more then 1 child element";
        }
        
        this.scrollBar = this.scrollBarBuilder.build({
            emitter: barEmmiter
        }) as ScrollBar;
        this.domService.insert([this.scrollBar.getElement()], this.element);
        this.scrollBar.getEmitter().on('wbMove', (position: number) => {
            this.emitter.emit('wbScroll', {
                vertical: position,
                horizontal: 0,
                x: 0,
                y: this.getScrollTop()
            });
            this.updateView(position);
        });

        let scrollMark: ScrollMark = this.getBar().getMark();
        scrollMark.getEmitter().on('wbDrag', (event: any) => {
            this.scrollBar.scrollBy(event.vertical / (this.scrollBar.getElement().offsetHeight - scrollMark.getElement().offsetHeight));
        });

        this.element.addEventListener('mousewheel', (event: WheelEvent) => {
            event.preventDefault();
            this.scrollBar.scrollBy(this.normalizeRemaining(event.deltaY));
        });

        this.touchComponent.getEmitter().on('wbTouchscroll', (event: any) => {
            this.scrollBar.scrollBy(this.normalizeRemaining(event.vertical));
        });

        this.recalc();
    }

    protected updateView(interpolatePercentage: number): void
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
        this.recalc();
    }

    public recalc(): void
    {
        if (!this.pane) {
            return;
        }
        if (this.pane.offsetHeight == 0) {
            this.scrollBar.getMark().setHeight(0);
        } else {
            this.scrollBar.getMark().setHeight(Math.min(this.element.offsetHeight / this.pane.offsetHeight, 1));
        }
        this.pane.style.top = this.getScrollTop() + "px";
    }

    public getScrollTop(): number
    {
        return (this.pane.offsetHeight - this.element.offsetHeight) * -1 * this.getBar().getMark().getPosition();
    }

    public getBar(): ScrollBar
    {
        return this.scrollBar;
    }

    public getPane(): HTMLElement
    {
        return this.pane;
    }

    public getElement(): HTMLElement
    {
        return this.element;
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }

    protected normalizeRemaining(pixelValue: number): number
    {
        let remaining: number = this.pane.offsetHeight - this.element.offsetHeight;
        if (remaining <= 0) {
            return 0;
        }
        return pixelValue / remaining;
    }

    protected normalize(pixelValue: number): number
    {
        if (this.element.offsetHeight <= 0) {
            return 0;
        }
        return pixelValue / this.scrollBar.getElement().offsetHeight;
    }
}