declare namespace sebastian.onlineapp {
    export function refreshMarkingTime(elem: HTMLElement, MarkingTypeId: string, HPlanificadas: number | null | undefined, LastTime: string, HMarcajes: number, percentage: number): void;
    interface HourAndZone {
        currentTime: string;
        timeZone: string;
    }
    export function getHourUTC(): HourAndZone;
    export function execProcessParams(processname: any, objectname: any, objectwhere: any, defaults: any, module: any, button: any, callBack?: any): void;
    export function registerMarking(IsWorking: Boolean, EmployeeId: any, e: any): void;
    export function showSuccessModal(message: any, subtitle: any, icon: any, duration?: number): void;
    export function showsModal(template: JQuery, customClass: any, height?: number, duration?: number): void;
    export function initialInstancesTabs(element: any): void;
    export function showInstances(typeId: number, element: any): void;
    export function showMarkingLines(employeeId: any, dayDate: any, element: any): void;
    export function showModifyMarkingForm(regId: any, element: any): void;
    export function modifyMarking(e: any): void;
    export class HRSwiper extends HTMLElement {
        constructor();
        swiperTemplate: string;
        container: any;
        button: any;
        fill: any;
        input: any;
        text: string;
        icon: string;
        initialColor: any;
        baseWidth: number;
        maxMove: any;
        startX: number;
        currentX: number;
        isSwiping: boolean;
        connectedCallback(): void;
        init(): void;
        updateMaxMove: () => void;
        setConfig(): void;
        render(): void;
        mainEvents(): void;
        updateValue(val: any): void;
        startSwipe(x: any): void;
        moveSwipe(x: any): void;
        endSwipe(): void;
        getValue(): string;
        paintLoading(): void;
        removeLoading(): void;
        disconnectedCallback(): void;
    }
    export class HRCombo extends HTMLElement {
        constructor();
        comboTemplate: string;
        control: any;
        input: any;
        controlid: any;
        label: string;
        placeholder: string;
        icon: string;
        property: string;
        objectName: string;
        objectWhere: string;
        viewName: string;
        valueField: string;
        descripField: string;
        defaultValue: string;
        defaultValueText: string;
        connectedCallback(): void;
        init(): void;
        render(): void;
        mainEvents(): void;
        setValue(newValue: any, newText: any, isChange?: boolean): void;
        getValue(): string;
        disconnectedCallback(): void;
    }
    export class HRSelector extends HTMLElement {
        constructor();
        selectorTemplate: string;
        emptyTemplate: string;
        additionalClass: string;
        objectname: string;
        objectwhere: string;
        viewName: string;
        valuefield: string;
        descripfield: string;
        subdescripfield: string;
        icon: string;
        defaultValue: string;
        data: Object[];
        selecteddata: any[];
        multiselect: boolean;
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        init(): void;
        clear(): void;
        render(): void;
        renderItems(): void;
        mainEvents(): void;
        setValue(newValue: any, isChange?: boolean, isSelected?: boolean): void;
        getValue(): string;
        paintLoading(): void;
        removeLoading(): void;
        paintLoadingItem(e: any): void;
        removeLoadingItem(e: any): void;
        disconnectedCallback(): void;
    }
    export {};
}
