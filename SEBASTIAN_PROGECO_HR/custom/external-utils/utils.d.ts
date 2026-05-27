declare namespace flexygo.external.utils {
    function parseDefaults(element: any): any;
    function execBagProcess(element: any, object: any, process: any, params: any): void;
    function replaceValues(element: any, values: any): void;
    function stickyOnScroll(moduleName: any, elementToStickOn: any): void;
    function selectTargetsClick(event: any, element: any): void;
    function setOptionToTargetClick(element: any, processName: any, patternType: any, patternShiftId: any): void;
    function showRegisterCount(element: any): void;
    const propertyUpdate: (el: any) => void;
    function objectUpdate(element: any, value: any): void;
}
