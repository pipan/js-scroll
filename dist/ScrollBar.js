"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollBar = (function () {
    function ScrollBar(element, mark, emitter) {
        var _this = this;
        this.element = element;
        this.mark = mark;
        this.emitter = emitter;
        this.element.addEventListener('mousedown', function (event) {
            if (event.button != 0) {
                return;
            }
            var percentage = (event.y - _this.element.getBoundingClientRect().top) / _this.element.offsetHeight;
            _this.scrollTo(percentage);
        });
    }
    ScrollBar.prototype.getElement = function () {
        return this.element;
    };
    ScrollBar.prototype.getMark = function () {
        return this.mark;
    };
    ScrollBar.prototype.getEmitter = function () {
        return this.emitter;
    };
    ScrollBar.prototype.scrollTo = function (normalizetPercentagePosition) {
        this.mark.setPosition(normalizetPercentagePosition);
    };
    ScrollBar.prototype.scrollBy = function (normalizetPercentageMovement) {
        this.mark.addToPosition(normalizetPercentageMovement);
    };
    return ScrollBar;
}());
exports.ScrollBar = ScrollBar;
//# sourceMappingURL=ScrollBar.js.map