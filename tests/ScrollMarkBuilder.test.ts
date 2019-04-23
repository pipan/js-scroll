import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { ScrollModule } from '../src/ScrollModule';
import { ComponentBuilder, Component } from '@wildebeest/component';

let app: Application = new Application();
app.run([ScrollModule]);

test("test creating default element", () => {
    let builder: ComponentBuilder = app.getContainer().getNamed('ComponentBuilder', 'scroll-mark');
    let component: Component = builder.build({});

    expect(component.getElement().outerHTML).toEqual('<div class="scroll-bar__mark"></div>');
});

test("test set template", () => {
    let builder: ComponentBuilder = app.getContainer().getNamed('ComponentBuilder', 'scroll-mark');
    builder.setTemplate('<p id="test-id"></p>');
    let component: Component = builder.build({});

    expect(component.getElement().outerHTML).toEqual('<p id="test-id"></p>');
});