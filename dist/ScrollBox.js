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
var ScrollBarBuilder_1 = require("./ScrollBarBuilder");
var inversify_1 = require("inversify");
var ScrollBox = (function () {
    function ScrollBox(domService, scrollBarBuilder, emitterService) {
        this.domService = domService;
        this.scrollBarBuilder = scrollBarBuilder;
        this.emitterService = emitterService;
        this.emitter = this.emitterService.createEmitter();
    }
    ScrollBox.prototype.initialize = function (element, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        this.element = element;
        this.config = config;
        this.touchElement = new touch_1.TouchElement(this.element, this.emitter);
        this.pane = this.element.firstElementChild;
        if (this.element.children.length > 1) {
            throw "Scroll Box cannot have more then 1 child element";
        }
        this.scrollBar = this.scrollBarBuilder.build({
            emitter: this.emitter
        });
        this.domService.insert(this.scrollBar.getElement(), this.element);
        this.element.addEventListener('mousewheel', function (event) {
            event.preventDefault();
            _this.scrollBar.scrollBy(event.deltaY);
        });
        this.touchElement.getEmitter().on('wbTouchscroll', function (event) {
            _this.scrollBar.scrollBy(event.vertical);
        });
        this.scrollBar.getEmitter().on('scroll', this.scrollTo.bind(this));
        this.scrollBar.getMark().getEmitter().on('drag', function (event) {
            _this.scrollBar.scrollBy(event.vertical);
        });
        this.recalc();
    };
    ScrollBox.prototype.scrollTo = function (interpolatePercentage) {
        this.pane.style.top = (this.pane.offsetHeight - this.element.offsetHeight) * -1 * interpolatePercentage + "px";
    };
    ScrollBox.prototype.recalc = function () {
        if (!this.pane) {
            return;
        }
        var heightPercentage = this.element.offsetHeight / this.pane.offsetHeight * 100;
        this.scrollBar.setProportion(heightPercentage);
    };
    ScrollBox.prototype.getBar = function () {
        return this.scrollBar;
    };
    ScrollBox.prototype.getPane = function () {
        return this.pane;
    };
    ScrollBox = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.DomService)), __param(1, inversify_1.inject('Builder')), __param(1, inversify_1.named('scroll-bar')), __param(2, inversify_1.inject(common_1.EmitterService)),
        __metadata("design:paramtypes", [common_1.DomService, ScrollBarBuilder_1.ScrollBarBuilder, common_1.EmitterService])
    ], ScrollBox);
    return ScrollBox;
}());
exports.ScrollBox = ScrollBox;
//# sourceMappingURL=ScrollBox.js.map