import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { ScrollModule } from '../src/ScrollModule';
import { ScrollBox } from '../src/ScrollBox';
import { DomService } from '@wildebeest/common';
import { ScrollBar } from '../src/ScrollBar';

let app: Application = new Application();
app.run([ScrollModule]);
let box: ScrollBox = null;
let domService: DomService = app.getContainer().get(DomService);
let element: HTMLElement = null;

beforeEach(() => {
    box = app.getContainer().get(ScrollBox);
});

test("no elements inside scroll box", () => {
    expect(() => {
        element = domService.create('<div id="box"></div>');
        box.initialize(element, {});
    }).toThrowError();
});

test("correct initialization", () => {
    element = domService.create('<div id="box"><div id="pane1"></div></div>');
    box.initialize(element, {});

    expect(box.getBar()).toBeInstanceOf(ScrollBar);
    expect(box.getPane()).toBeInstanceOf(HTMLElement);
    expect(box.getPane().outerHTML).toEqual('<div id="pane1"></div>');
});

test("multiple elements inside scroll box", () => {
    expect(() => {
        element = domService.create('<div id="box"><div id="pane1"></div><div id="pane2"></div></div>');
        box.initialize(element, {});
    }).toThrowError();
});