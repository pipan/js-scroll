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
var ScrollBar_1 = require("./ScrollBar");
var inversify_1 = require("inversify");
var ScrollMarkBuilder_1 = require("./ScrollMarkBuilder");
var ScrollBarBuilder = (function () {
    function ScrollBarBuilder(domService, scrollMarkBuilder, emitterService) {
        this.domService = domService;
        this.scrollMarkBuilder = scrollMarkBuilder;
        this.emitterService = emitterService;
        this.template = '<div class="scroll-bar"></div>';
    }
    ScrollBarBuilder.prototype.build = function (data) {
        if (data === void 0) { data = {}; }
        var scrollMark = this.scrollMarkBuilder.build();
        var scrollBarElement = this.domService.create(this.template);
        this.domService.insert(scrollMark.getElement(), scrollBarElement);
        if (!data.emitter) {
            data.emitter = this.emitterService.createEmitter();
        }
        return new ScrollBar_1.ScrollBar(scrollBarElement, scrollMark, data.emitter);
    };
    ScrollBarBuilder.prototype.setTemplate = function (template) {
        this.template = template;
    };
    ScrollBarBuilder = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.DomService)), __param(1, inversify_1.inject('Builder')), __param(1, inversify_1.named('scroll-mark')), __param(2, inversify_1.inject(common_1.EmitterService)),
        __metadata("design:paramtypes", [common_1.DomService, ScrollMarkBuilder_1.ScrollMarkBuilder, common_1.EmitterService])
    ], ScrollBarBuilder);
    return ScrollBarBuilder;
}());
exports.ScrollBarBuilder = ScrollBarBuilder;
//# sourceMappingURL=ScrollBarBuilder.js.map