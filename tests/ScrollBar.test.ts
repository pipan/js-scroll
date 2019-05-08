import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { ScrollModule } from '../src/ScrollModule';
import { ScrollBar } from '../src/ScrollBar';
import { ComponentBuilder } from '@wildebeest/component';

let app: Application = new Application();
app.run([ScrollModule]);
let builder: ComponentBuilder = app.getContainer().getNamed('ComponentBuilder', 'scroll-bar');

let component: ScrollBar = null;
beforeEach(() => {
    component = builder.build({}) as ScrollBar;
    component.getMark().setHeight(0.2);
});

test("test scroll to", () => {
    let scroll: number = 0;
    component.getEmitter().on('wbMove', (value: number) => {
        scroll = value;
    });
    component.scrollTo(0.1);

    expect(scroll).toEqual(0.1);
});

test("test scroll by", () => {
    let scroll: number = 0;
    component.scrollTo(0.2);
    component.getEmitter().on('wbMove', (value: number) => {
        scroll = value;
    });
    component.scrollBy(0.2);

    expect(scroll).toEqual(0.4);
});