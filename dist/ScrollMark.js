"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drag_1 = require("@wildebeest/drag");
var ScrollMark = (function () {
    function ScrollMark(element, emitter) {
        this.position = 0;
        this.height = 0;
        this.element = element;
        this.emitter = emitter;
        new drag_1.DragableComponent(this.getElement(), this.getEmitter());
    }
    ScrollMark.prototype.getElement = function () {
        return this.element;
    };
    ScrollMark.prototype.getEmitter = function () {
        return this.emitter;
    };
    ScrollMark.prototype.setPosition = function (normalizedPosition) {
        normalizedPosition = Math.min(Math.max(normalizedPosition, 0), 1);
        var changed = this.position != normalizedPosition;
        this.position = normalizedPosition;
        if (changed) {
            this.updateElement();
            this.emitter.emit('wbMove', this.position);
        }
    };
    ScrollMark.prototype.addToPosition = function (normalizedPosition) {
        this.setPosition(this.position + normalizedPosition);
    };
    ScrollMark.prototype.setHeight = function (value) {
        this.height = value;
        this.updateElement();
    };
    ScrollMark.prototype.getPosition = function () {
        return this.position;
    };
    ScrollMark.prototype.getTopPercentage = function () {
        return (1 - this.height) * this.position * 100;
    };
    ScrollMark.prototype.getHeightPercentage = function () {
        return this.height * 100;
    };
    ScrollMark.prototype.updateElement = function () {
        this.element.style.height = this.getHeightPercentage() + "%";
        this.element.style.top = this.getTopPercentage() + "%";
    };
    return ScrollMark;
}());
exports.ScrollMark = ScrollMark;
//# sourceMappingURL=ScrollMark.js.map