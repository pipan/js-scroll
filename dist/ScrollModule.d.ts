import { Module } from "@wildebeest/js-modules";
import { Container } from "inversify";
export declare class ScrollModule implements Module {
    register(container: Container): void;
    boot(container: Container): void;
    getDependencies(): Array<any>;
}
