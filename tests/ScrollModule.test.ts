import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { ScrollModule } from '../src/ScrollModule';
import { ScrollBox } from '../src/ScrollBox';
import { ScrollBarBuilder } from '../src/ScrollBarBuilder';
import { ScrollMarkBuilder } from '../src/ScrollMarkBuilder';

let app: Application = new Application();
app.run([ScrollModule]);

test("register services", () => {
    expect(app.getContainer().get(ScrollBox)).toBeInstanceOf(ScrollBox);
    expect(app.getContainer().getNamed('ComponentBuilder', 'scroll-bar')).toBeInstanceOf(ScrollBarBuilder);
    expect(app.getContainer().getNamed('ComponentBuilder', 'scroll-mark')).toBeInstanceOf(ScrollMarkBuilder);
    let factory: any = app.getContainer().get('Factory<ComponentBuilder>');
    expect(factory('scroll-bar')).toBeInstanceOf(ScrollBarBuilder);
    expect(factory('scroll-mark')).toBeInstanceOf(ScrollMarkBuilder);
});