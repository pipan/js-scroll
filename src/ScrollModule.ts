import { Module } from "@wildebeest/js-modules";
import { Container, interfaces } from "inversify";
import { CommonModule } from "@wildebeest/common";
import { TouchModule } from "@wildebeest/touch";
import { DragModule } from "@wildebeest/drag";
import { ScrollBarBuilder } from "./ScrollBarBuilder";
import { ScrollMarkBuilder } from "./ScrollMarkBuilder";
import { ScrollBox } from "./ScrollBox";
import { ComponentBuilder, ComponentModule } from "@wildebeest/component";

export class ScrollModule implements Module
{
    register(container: Container): void
    {
        container.bind<ComponentBuilder>('ComponentBuilder').to(ScrollBarBuilder).inSingletonScope().whenTargetNamed('scroll-bar');
        container.bind<ComponentBuilder>('ComponentBuilder').to(ScrollMarkBuilder).inSingletonScope().whenTargetNamed('scroll-mark');
        container.bind<ScrollBox>(ScrollBox).toSelf();
    }

    boot(container: Container): void { }

    getDependencies(): Array<any>
    {
        return [CommonModule, ComponentModule, TouchModule, DragModule];
    }
}