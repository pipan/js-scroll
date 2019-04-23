import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { ScrollModule } from '../src/ScrollModule';
import { ComponentBuilder } from '@wildebeest/component';
import { ScrollMark } from '../src/ScrollMark';

let app: Application = new Application();
app.run([ScrollModule]);

let component: ScrollMark = null;
beforeEach(() => {
    let builder: ComponentBuilder = app.getContainer().getNamed('ComponentBuilder', 'scroll-mark');
    component = builder.build({}) as ScrollMark;
})

let positions: Array<any> = [
    [0.2, 0.1, 0.1],
    [0.1, -0.1, 0],
    [0.1, 0, 0],
    [0.1, 0.9, 0.9],
    [0.1, 0.91, 0.91],
    [0.5, 1, 1],
    [0.5, 1.5, 1]
];

let emitValues: Array<any> = [
    [0.2, 0.1, 0.1],
    [0.3, 1, 1],
    [0.3, 0.6, 0.6],
    [0.8, 0, 0],
    [0.8, 0.05, 0.05]
];

test.each(positions)("set position", (height: number, top: number, result: number) => {
    component.setHeight(height);
    component.setPosition(top);

    expect(component.getPosition()).toEqual(result);
});

test.each(emitValues)("emit move event", (height: number, top: number, result: number) => {
    let position: number = 0;
    component.setHeight(height);
    component.getEmitter().on('wbMove', (value: number) => {
        position = value;
    });
    component.setPosition(top);

    expect(position).toEqual(result);
});

test.each(emitValues)("no change no emit", () => {
    let emitted: boolean = false;
    component.setHeight(0.2);
    component.setPosition(0.1);
    component.getEmitter().on('wbMove', (value: number) => {
        emitted = true;
    });
    component.setPosition(0.1);

    expect(emitted).toEqual(false);
});