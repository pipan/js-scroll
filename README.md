# Scroll Module

Enables scrolling in absolute and fixed elements

## Installation

```sh
npm install --save @wildebeest/scroll
```

## Requirements

It's usefull to know these libraries:

* inversify
* @wildebeest/js-modules

## Preview

![](https://media.giphy.com/media/UuHW8aLzpAh2GABnub/giphy.gif)

## Usage

After the application starts with `app.run([ScrollModule])` you can create scroll boxes. `ScrollBox` is enabled by creating new instance of this class. First select DOM element that is suppous to became scrollale and then create new instance of `ScrollBox` an `initialize it.

```ts
let app: Application = new Application();
app.run([ScrollBox]);

let element: HTMLElement = document.querySelector('.scroll-box');
let scrollBox: ScrollBox = app.getContainer().get(ScrollBox);
scrollBox.initialize(element, {});
```

Second, initialize parameter allows you to customize behavior of this scroll box.

ScrollBar and ScrollMark will have `scroll-bar` and `scroll-bar__mark` css class by default. You should add style to those two classes in your css file.

```css
.scroll-box {
    position: absolute;
    overflow: hidden;
}

.scroll-box--hover:hover .scroll-bar, .scroll-box--show .scroll-bar, .scroll-box--always-show .scroll-bar {
    transform: translateX(0%);
}

.scroll-bar {
    position: absolute;
    width: 4px;
    right: 0px;
    top: 0px;
    height: 100%;
    transform: translateX(100%);
    transition: transform ease 160ms;
}

.scroll-bar__mark--move {
    cursor: move;
}

.scroll-bar__mark {
    position: absolute;
    width: 4px;
    right: 0px;
    top: 50%;
    cursor: grab;
}
```

## Scroll Event

ScrollBox emits `wbScroll` event that contains 4 values:

* vertical: float number in <0, 1> range that represent the percentage of vertical scroll position
* horizontal: float number in <0, 1> range that represent the percentage of horizontal scroll position
* x: number that represents scrol value from left in pixels
* y: number that represents scrol value from top in pixels

## Customization

This module should be highly customizable. You can add your own css classes and change visuals.

### Custom ScrollBar class

To add specific class to all scroll bars, just set template for creating scroll bars.

```ts
let app: Application = new Application();
app.run([ScrollModule]);

let builder: ComponentBuilder = app.getContainer().getNamed('ComponentBuilder', 'scroll-bar');
builder.setTemplate('<div class="my-scroll-bar-class"></div>');
```

### Custom ScrollMark class

Scroll mark is a litle nob that moves inside of scroll bar. To add specific class to all scroll marks, just set template for creating scroll marks.

```ts
let app: Application = new Application();
app.run([ScrollModule]);

let builder: ComponentBuilder = app.getContainer().getNamed('ComponentBuilder', 'scroll-mark');
builder.setTemplate('<div class="my-scroll-mark-class"></div>');
```

