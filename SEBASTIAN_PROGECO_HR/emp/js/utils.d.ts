declare namespace sebastian.utils {
    function toggleFilterList(element: any, modulename?: any): void;
    function toggleFilterSeveralModules(element: any, modules: any, currentFilter: any): any;
    function FilterSeveralModules(element: any, modules: any, filter: any): boolean;
    function checkButtonsFilterList(element: any): void;
    /**
     * Checks active filters in multiple modules and highlights corresponding filter buttons
     * Supports multiple simultaneous filters from different buttons
     * Call: sebastian.utils.checkActiveFiltersInModules(element, modules)
     * @param element - The element containing filter buttons
     * @param modules - Array of module selectors to check for active filters
     */
    function checkActiveFiltersInModules(element: any, modules: any): void;
    function toggleProcessFilterList(element: any, filter: any, controlCLass: any, overwrites?: boolean): void;
    function defaultFilterList(element: any, filter: any, controlCLass: any): void;
    function checkProcessButtonsFilterList(element: any): void;
    function showRegisterCount(element: any): void;
    function filterModule(element: any, modulename: any, useAliases: any, moduleType?: any): void;
    function filterModuleRefresh(element: any, modulename: any, useAliases: any, moduleType?: any): void;
    function getFilterString(element: any, useAliases: any, cntFilterSelector: any): string;
    function cleanFilterModule(element: any, modulename: any, moduleType?: any, refreshFilter?: any): void;
    function cleanCustomFilters(element: any, cntFilterId: any): void;
    function clearFilterList(element: any, modulename: any): void;
    function execBagProcess(element: any, object: any, process: any, params: any): void;
    function replaceValues(element: any, values: any): void;
    function parseDefaults(element: any): any;
    function stickyOnScroll(moduleName: any, elementToStickOn: any): void;
    function filterDateModules(elem: any, mode: any, action: any, tableAlias: any, property: any, ...filteredLists: any[]): void;
    function getFilterDate(mode: string, action: string, fDate: any): object;
    function getFilterSqlDate(mode: string, action: string, date: any, tableAlias: string, property: string): string;
    function setFilterDateMode(element: any): void;
    function selectTargetsClick(event: any, element: any): void;
    function setOptionToTargetClick(element: any, processName: any, patternType: any, patternShiftId: any): void;
    function useFilterOnOtherModule(mainModuleName: string, dependingModuleName: string, mainModuleInTab?: boolean): void;
    function ComboGoToPage(elem: any, pageName: any, tableAlias: any, propertyWhere: any, objectName: string, otherDefaults: any, otherWhere: any): void;
    function addLock(time?: number): void;
    function removeLock(): void;
    function initialFilterList(controlModuleId: any, filteredModuleId: any, filterId: any, wheres: any): void;
    function toggleBackgroundColor(element: any): void;
    const openImage: (Image: string, title: string) => void;
    function extractNumbersParenthesis(string: any): any;
    function removeStringFromArray(arr: any, str: any): any;
    /**
     *
     * @param controlSelector cobntrol selector that has to be on the dom to keep the interval active
     * @param targetSelector jquery selector that executes the callback function when it exists
     * @param callback callback function
     */
    function fakeAfterLoad(controlSelector: any, targetSelector: any, callback: any): void;
    function closeNavMenu(): void;
    function goHomeIfMobile(): void;
    function hideEmptyModule(module: any): void;
    function extractTextFromNode(node: any): Promise<string>;
    function isAlphanumericKey(keyCode: any): boolean;
    function ChangeDate(element: any, modules: any, where: any): string;
    function UpdateSelectorDate(e: any, dyear: any, dmonth: any): void;
    function saveFilterValueHistory(history: any, moduleName: any, activeFilter: any, filters: any): void;
    function updatePropertyTable(el: any, valor: any): void;
    function updateObject(el: any, properties?: {
        [clave: string]: any;
    }): void;
    const paintInlineForm: (objectName: string, objectWhere: string, defaults: string, moduleName: string, returnItemTemplate: string, hiddenProperties?: string, customSaveFuncion?: string, customDeleteFuncion?: string, customWidthInputs?: string, customClassContainer?: string) => void;
    function setLoadingAnimation(): void;
    function removeLoadingAnimation(): void;
    function selectAllRowsFromList(currentProcess: any): void;
    function removeSelectionAllRowsFromList(currentProcess: any): void;
    function toggleSelectionFromList(currentProcess: any, selected: any, triggerElement: any): void;
    function showSelectedRowsList(elem: any, objectName: any): void;
    function checkIfPlannerGroupsIsFiltered(element: any, selector: any): void;
    /**
     * Oculta un módulo si alguno de sus elementos contiene la clase 'hr-hidden-module-no-regs'
     * @param element - Elemento del módulo a evaluar
     */
    function hideModuleByHiddenModuleNoRegsClass(element: any): void;
    /**
     * Formats a date using moment.js with a specific culture/locale.
     * If no culture is provided, uses the current global moment locale.
     * Call: sebastian.utils.formatDate(date, 'dddd, LL', 'es-ES')
     * @param date    - The date to format (any value accepted by moment())
     * @param format  - Moment.js format string (e.g. 'dddd', 'LL', 'MMMM yyyy')
     * @param culture - Optional BCP47 culture code (e.g. 'es-ES', 'en-GB'). Case-insensitive.
     * @returns Formatted date string in the requested locale
     */
    function formatDate(date: any, format: string, culture?: string): string;
    /**
     * Clears all objectdefaults from the given module element
     * Call: sebastian.utils.clearModuleDefaults(element)
     * @param element - The flx-module element
     */
    function clearModuleDefaults(element: HTMLElement): void;
}
