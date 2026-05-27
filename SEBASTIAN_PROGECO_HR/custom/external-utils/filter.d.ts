declare namespace flexygo.external.filter {
    function toggleFilterList(element: any, modulename?: any): void;
    function checkButtonsFilterList(element: any): void;
    function toggleProcessFilterList(element: any, filter: any, controlCLass: any): void;
    function defaultFilterList(element: any, filter: any, controlCLass: any): void;
    function checkProcessButtonsFilterList(element: any): void;
    function filterModule(element: any, modulename: any, useAliases: any, moduleType?: any): Promise<void>;
    function getWhere(elem: any, useAliases: any, between?: any): string;
    function cleanFilterModule(element: any, modulename: any, moduleType?: any): void;
    function clearFilterList(element: any, modulename: any): void;
    function filterDateModules(elem: any, mode: any, action: any, tableAlias: any, property: any, ...filteredLists: any[]): void;
    function getFilterDate(mode: string, action: string, fDate: any): object;
    function getFilterSqlDate(mode: string, action: string, date: any, tableAlias: string, property: string): string;
    function setFilterDateMode(element: any): void;
    function useFilterOnOtherModule(mainModuleName: string, dependingModuleName: string): void;
}
