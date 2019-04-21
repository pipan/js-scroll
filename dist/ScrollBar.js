"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollBar = (function () {
    function ScrollBar(element, mark, emitter) {
        var _this = this;
        this.element = element;
        this.mark = mark;
        this.emitter = emitter;
        mark.getEmitter().on('move', function (position) {
            _this.emitter.emit('scroll', position);
        });
        this.element.addEventListener('mousedown', function (event) {
            if (event.button != 0) {
                return;
            }
            var percentage = (event.y - _this.element.getBoundingClientRect().top - _this.mark.getElement().offsetHeight / 2) / _this.element.offsetHeight * 100;
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
    ScrollBar.prototype.scrollTo = function (percentage) {
        this.mark.setTop(percentage);
    };
    ScrollBar.prototype.scrollBy = function (value) {
        var height = this.element.offsetHeight;
        if (height == 0) {
            this.mark.setTop(0);
            return;
        }
        var position = this.mark.getTop();
        this.mark.setTop(position + value / height * 100);
    };
    ScrollBar.prototype.setProportion = function (heightProportion) {
        this.mark.setHeight(heightProportion);
    };
    return ScrollBar;
}());
exports.ScrollBar = ScrollBar;
//# sourceMappingURL=ScrollBar.js.map