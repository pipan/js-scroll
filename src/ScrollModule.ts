import { Module } from "@wildebeest/js-modules";
import { Container, interfaces } from "inversify";
import { CommonModule } from "@wildebeest/common";
import { TouchModule } from "@wildebeest/touch";
import { DragModule } from "@wildebeest/drag";
import { ScrollBarBuilder } from "./ScrollBarBuilder";
import { ScrollMarkBuilder } from "./ScrollMarkBuilder";
import { Builder } from "./Builder";
import { ScrollBox } from "./ScrollBox";

export class ScrollModule implements Module
{
    register(container: Container): void
    {
        container.bind<Builder>('Builder').to(ScrollBarBuilder).inSingletonScope().whenTargetNamed('scroll-bar');
        container.bind<Builder>('Builder').to(ScrollMarkBuilder).inSingletonScope().whenTargetNamed('scroll-mark');
        container.bind<ScrollBox>(ScrollBox).toSelf();

        container.bind<interfaces.Factory<Builder>>('Factory<Builder>').toFactory<Builder>((context: interfaces.Context) => {
            return (name: string) => {
                return context.container.getNamed('Builder', name);
            };
        });
    }

    boot(container: Container): void { }

    getDependencies(): Array<any>
    {
        return [CommonModule, TouchModule, DragModule];
    }
}