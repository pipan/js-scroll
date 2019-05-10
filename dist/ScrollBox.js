"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@wildebeest/common");
var touch_1 = require("@wildebeest/touch");
var inversify_1 = require("inversify");
var ScrollBox = (function () {
    function ScrollBox(domService, scrollBarBuilder, emitterService) {
        this.scrollClassTimeout = null;
        this.domService = domService;
        this.scrollBarBuilder = scrollBarBuilder;
        this.emitterService = emitterService;
        this.emitter = this.emitterService.createEmitter();
    }
    ScrollBox.prototype.initialize = function (element, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var barEmmiter = this.emitterService.createEmitter();
        this.element = element;
        this.element.style.overflow = "hidden";
        this.config = config;
        this.touchComponent = new touch_1.TouchComponent(this.element, barEmmiter);
        this.pane = this.element.firstElementChild;
        this.pane.style.position = "relative";
        if (this.element.children.length == 0) {
            throw "Scroll Box has to have 1 child element";
        }
        if (this.element.children.length > 1) {
            throw "Scroll Box cannot have more then 1 child element";
        }
        this.scrollBar = this.scrollBarBuilder.build({
            emitter: barEmmiter
        });
        this.domService.insert([this.scrollBar.getElement()], this.element);
        this.scrollBar.getEmitter().on('wbMove', function (position) {
            _this.emitter.emit('wbScroll', {
                vertical: position,
                horizontal: 0,
                x: 0,
                y: _this.getScrollTop()
            });
            _this.updateView(position);
        });
        var scrollMark = this.getBar().getMark();
        scrollMark.getEmitter().on('wbDrag', function (event) {
            _this.scrollBar.scrollBy(event.vertical / (_this.scrollBar.getElement().offsetHeight - scrollMark.getElement().offsetHeight));
        });
        this.element.addEventListener('mousewheel', function (event) {
            event.preventDefault();
            _this.scrollBar.scrollBy(_this.normalizeRemaining(event.deltaY));
        });
        this.touchComponent.getEmitter().on('wbTouchscroll', function (event) {
            _this.scrollBar.scrollBy(_this.normalizeRemaining(event.vertical));
        });
        this.recalc();
    };
    ScrollBox.prototype.updateView = function (interpolatePercentage) {
        var _this = this;
        if (this.config.onScroll.class) {
            if (this.scrollClassTimeout) {
                clearTimeout(this.scrollClassTimeout);
            }
            this.scrollClassTimeout = setTimeout(function () {
                _this.element.classList.remove(_this.config.onScroll.class);
            }, this.config.onScroll.delay);
            this.element.classList.add(this.config.onScroll.class);
        }
        this.recalc();
    };
    ScrollBox.prototype.recalc = function () {
        if (!this.pane) {
            return;
        }
        if (this.pane.offsetHeight == 0) {
            this.scrollBar.getMark().setHeight(0);
        }
        else {
            this.scrollBar.getMark().setHeight(Math.min(this.element.offsetHeight / this.pane.offsetHeight, 1));
        }
        this.pane.style.top = this.getScrollTop() + "px";
    };
    ScrollBox.prototype.getScrollTop = function () {
        return (this.pane.offsetHeight - this.element.offsetHeight) * -1 * this.getBar().getMark().getPosition();
    };
    ScrollBox.prototype.getBar = function () {
        return this.scrollBar;
    };
    ScrollBox.prototype.getPane = function () {
        return this.pane;
    };
    ScrollBox.prototype.getElement = function () {
        return this.element;
    };
    ScrollBox.prototype.getEmitter = function () {
        return this.emitter;
    };
    ScrollBox.prototype.normalizeRemaining = function (pixelValue) {
        var remaining = this.pane.offsetHeight - this.element.offsetHeight;
        if (remaining <= 0) {
            return 0;
        }
        return pixelValue / remaining;
    };
    ScrollBox.prototype.normalize = function (pixelValue) {
        if (this.element.offsetHeight <= 0) {
            return 0;
        }
        return pixelValue / this.scrollBar.getElement().offsetHeight;
    };
    ScrollBox = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.DomService)), __param(1, inversify_1.inject('ComponentBuilder')), __param(1, inversify_1.named('scroll-bar')), __param(2, inversify_1.inject(common_1.EmitterService)),
        __metadata("design:paramtypes", [common_1.DomService, Object, common_1.EmitterService])
    ], ScrollBox);
    return ScrollBox;
}());
exports.ScrollBox = ScrollBox;
//# sourceMappingURL=ScrollBox.js.map