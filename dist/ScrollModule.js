"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@wildebeest/common");
var touch_1 = require("@wildebeest/touch");
var drag_1 = require("@wildebeest/drag");
var ScrollBarBuilder_1 = require("./ScrollBarBuilder");
var ScrollMarkBuilder_1 = require("./ScrollMarkBuilder");
var ScrollBox_1 = require("./ScrollBox");
var component_1 = require("@wildebeest/component");
var ScrollModule = (function () {
    function ScrollModule() {
    }
    ScrollModule.prototype.register = function (container) {
        container.bind('ComponentBuilder').to(ScrollBarBuilder_1.ScrollBarBuilder).inSingletonScope().whenTargetNamed('scroll-bar');
        container.bind('ComponentBuilder').to(ScrollMarkBuilder_1.ScrollMarkBuilder).inSingletonScope().whenTargetNamed('scroll-mark');
        container.bind(ScrollBox_1.ScrollBox).toSelf();
        container.bind("Factory<ScrollBox>").toAutoFactory(ScrollBox_1.ScrollBox);
    };
    ScrollModule.prototype.boot = function (container) { };
    ScrollModule.prototype.getDependencies = function () {
        return [common_1.CommonModule, component_1.ComponentModule, touch_1.TouchModule, drag_1.DragModule];
    };
    return ScrollModule;
}());
exports.ScrollModule = ScrollModule;
//# sourceMappingURL=ScrollModule.js.map