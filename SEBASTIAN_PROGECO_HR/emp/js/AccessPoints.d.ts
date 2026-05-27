declare namespace sebastian.accesspoint {
    function clickNumber(value: any, elem: any): void;
    function restartEmployee(): void;
    function eraseCode(elem: any): void;
    function getLastMarking(employeeId: any): void;
    function validateCode(accessCode: any): boolean;
    function clickValidateButton(elem: any): void;
    function setEmployeeInfo(lastMarkingData: any, employeeId: any): void;
    function setInitialConfiguration(elem: any): void;
    function insertMarking(elem: any): void;
    function setClockEvents(): void;
    function refreshMarkingTime(elem: HTMLElement, MarkingTypeId: string, HPlanificadas: number | null | undefined, LastTime: string, HMarcajes: number, percentage: number): void;
}
