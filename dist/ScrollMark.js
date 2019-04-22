"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollMark = (function () {
    function ScrollMark(element, emitter) {
        this.position = 0;
        this.height = 0;
        this.element = element;
        this.emitter = emitter;
    }
    ScrollMark.prototype.getElement = function () {
        return this.element;
    };
    ScrollMark.prototype.getEmitter = function () {
        return this.emitter;
    };
    ScrollMark.prototype.setTop = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 100 - this.height) {
            value = 100 - this.height;
        }
        var changed = this.position != value;
        this.position = value;
        this.element.style.top = value + "%";
        if (changed) {
            this.emitter.emit('wbMove', this.getInterpolatedPosition());
        }
    };
    ScrollMark.prototype.getInterpolatedPosition = function () {
        return this.position / (100 - this.height);
    };
    ScrollMark.prototype.setHeight = function (value) {
        this.height = value;
        this.element.style.height = this.height + "%";
        this.setTop(this.position);
    };
    ScrollMark.prototype.getTop = function () {
        return this.position;
    };
    return ScrollMark;
}());
exports.ScrollMark = ScrollMark;
//# sourceMappingURL=ScrollMark.js.map