export interface Builder
{
    build(data: any): any;
    setTemplate(template: string): void;
}