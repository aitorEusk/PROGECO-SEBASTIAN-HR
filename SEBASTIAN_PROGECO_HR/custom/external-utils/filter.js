var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//MODULE FILTER UTILS
var flexygo;
(function (flexygo) {
    var external;
    (function (external) {
        var filter;
        (function (filter_1) {
            function toggleFilterList(element, modulename) {
                let jqueryList;
                if (modulename != '' && modulename != null) {
                    jqueryList = $('flx-list[modulename="' + modulename + '"]');
                    $(element).closest('#mainFilter').find('[filter]').removeClass('active');
                }
                else {
                    jqueryList = $(element).closest('flx-list');
                }
                let filter = $(element).attr('filter');
                let list = jqueryList[0];
                if (list.additionalWhere == filter) {
                    list.additionalWhere = null;
                }
                else {
                    list.additionalWhere = filter;
                    $(element).addClass('active');
                }
                list.init();
            }
            filter_1.toggleFilterList = toggleFilterList;
            function checkButtonsFilterList(element) {
                setTimeout(() => {
                    let jqueryButtons = $(element).closest('main').find('button[filter]');
                    jqueryButtons.each((index, elem) => {
                        let filter = $(elem).attr('filter');
                        let jqueryList = $(element).find('flx-list');
                        let list = jqueryList[0];
                        if (list.additionalWhere == filter) {
                            $(elem).addClass('active');
                        }
                    });
                }, 500);
            }
            filter_1.checkButtonsFilterList = checkButtonsFilterList;
            function toggleProcessFilterList(element, filter, controlCLass) {
                let jqueryModule = $(element).closest('flx-module');
                let module = jqueryModule[0];
                let jqueryList = $(module).find('flx-list');
                let list = jqueryList[0];
                if (list.additionalWhere == filter) {
                    list.additionalWhere = null;
                    if (module.objectdefaults != null && module.objectdefaults != undefined) {
                        module.objectdefaults.processFilterClass = null;
                    }
                }
                else {
                    list.additionalWhere = filter;
                    if (module.objectdefaults == null || module.objectdefaults == undefined) {
                        module.objectdefaults = { processFilterClass: controlCLass };
                    }
                    else {
                        module.objectdefaults.processFilterClass = controlCLass;
                    }
                }
                let main = $(element).closest('main');
                let filterDiv = main.find('#mainFilter');
                if (filterDiv.length > 0) {
                    let filterModule = filterDiv.closest('flx-html')[0];
                    filterModule.refresh();
                }
                list.init();
            }
            filter_1.toggleProcessFilterList = toggleProcessFilterList;
            function defaultFilterList(element, filter, controlCLass) {
                let list = $(element).find('flx-list')[0];
                if (flexygo.utils.isBlank(list.additionalWhere) && list.additionalWhere !== null) {
                    flexygo.external.filter.toggleProcessFilterList(element, filter, controlCLass);
                }
                flexygo.external.filter.checkProcessButtonsFilterList(element);
            }
            filter_1.defaultFilterList = defaultFilterList;
            function checkProcessButtonsFilterList(element) {
                setTimeout(() => {
                    let jqueryButtons = $(element).find('.cntBodyHeader button.btn-actions');
                    jqueryButtons.each((index, elem) => {
                        let jqueryModule = $(element).closest('flx-module');
                        let module = jqueryModule[0];
                        if (module.objectdefaults && module.objectdefaults.processFilterClass) {
                            if ($(elem).hasClass(module.objectdefaults.processFilterClass)) {
                                $(elem).addClass('active');
                            }
                        }
                    });
                }, 500);
            }
            filter_1.checkProcessButtonsFilterList = checkProcessButtonsFilterList;
            function filterModule(element, modulename, useAliases, moduleType) {
                return __awaiter(this, void 0, void 0, function* () {
                    let mainFilter = element.closest('#mainFilter');
                    let multicombos = $(mainFilter).find('flx-multicombo:not([ignoreFilter])').not($('flx-multicombo[between]'));
                    let dbcombos = $(mainFilter).find('flx-dbcombo:not([ignoreFilter])').not($('flx-dbcombo[between]'));
                    let flxtext = $(mainFilter).find('flx-text:not([ignoreFilter])').not($('flx-text[between]'));
                    let flxcheck = $(mainFilter).find('flx-check:not([ignoreFilter])').not($('flx-check[between]'));
                    let elements = [...multicombos.toArray(), ...dbcombos.toArray(), ...flxtext.toArray(), ...flxcheck.toArray()];
                    let component;
                    let filterValues = [];
                    let combosWhere = '';
                    let datesWhere = '';
                    let additionalWhere;
                    elements.forEach((elem, index) => {
                        let customWhereFunction = $(elem).attr('customWhere') ? 1 : 0;
                        let value = elem.getValue();
                        let sql;
                        if (value != null && value != '') {
                            //let filterValue = {}
                            if (customWhereFunction == 0) {
                                sql = getWhere(elem, useAliases);
                            }
                            else {
                                sql = eval($(elem).attr('customWhere'));
                            }
                            filterValues.push(sql);
                        }
                    });
                    multicombos = $(mainFilter).find('flx-multicombo[between=min]:not([ignoreFilter])');
                    dbcombos = $(mainFilter).find('flx-dbcombo[between=min]:not([ignoreFilter])');
                    flxtext = $(mainFilter).find('flx-text[between=min]:not([ignoreFilter])');
                    flxcheck = $(mainFilter).find('flx-check[between=min]:not([ignoreFilter])');
                    elements = [...multicombos.toArray(), ...dbcombos.toArray(), ...flxtext.toArray(), ...flxcheck.toArray()];
                    elements.forEach((elem, index) => {
                        let customWhereFunction = $(elem).attr('customWhere') ? 1 : 0;
                        let value = elem.getValue();
                        let sql;
                        if (value != null && value != '') {
                            //let filterValue = {}
                            if (customWhereFunction == 0) {
                                sql = getWhere(elem, useAliases, 1);
                            }
                            else {
                                sql = eval($(elem).attr('customWhere'));
                            }
                            filterValues.push(sql);
                        }
                    });
                    if (moduleType == null) {
                        moduleType = 'flx-list';
                    }
                    component = $('[modulename="' + modulename + '"]' + moduleType)[0];
                    let moduleFilters = mainFilter.closest('flx-module');
                    if (moduleFilters.objectdefaults && moduleFilters.objectdefaults.DatesFilter) {
                        datesWhere = moduleFilters.objectdefaults.DatesFilter;
                    }
                    if (filterValues.length > 0) {
                        combosWhere = filterValues.join(' and ');
                        if (!moduleFilters.objectdefaults) {
                            moduleFilters.objectdefaults = { CombosFilter: combosWhere };
                        }
                        else {
                            moduleFilters.objectdefaults.CombosFilter = combosWhere;
                        }
                        if (datesWhere != '') {
                            additionalWhere = combosWhere + ' AND ' + datesWhere;
                        }
                        else {
                            additionalWhere = combosWhere;
                        }
                    }
                    else if (datesWhere != '') {
                        moduleFilters.objectdefaults.CombosFilter = null;
                        additionalWhere = datesWhere;
                    }
                    else {
                        moduleFilters.objectdefaults.CombosFilter = null;
                        additionalWhere = null;
                    }
                    if (additionalWhere != component.additionalWhere) {
                        component.additionalWhere = additionalWhere;
                    }
                    if ($(component).attr('manualInit') == 'true') {
                        component.init();
                    }
                    else {
                        //component.init();
                        component.page = 0;
                        component.refresh();
                    }
                });
            }
            filter_1.filterModule = filterModule;
            function getWhere(elem, useAliases, between) {
                let value = elem.getValue();
                var isTrueSet = (value === true) ? 1 : 0;
                let property = $(elem).attr('FilterProperty');
                let TableAlias = $(elem).attr('TableAlias');
                let sql = '';
                let maxValue;
                if (between) {
                    maxValue = $(elem).closest('#mainFilter').find(`[FilterProperty=${property}][between=max]`)[0].getValue();
                }
                let identifier = useAliases ? TableAlias + '.' + property : property;
                if ((between && maxValue) || !between)
                    switch ($(elem).prop('nodeName').toLowerCase()) {
                        case 'flx-multicombo':
                            if (!between) {
                                value = value.split('|');
                                sql = identifier + ` in ('${value.join(`','`)}')`;
                            }
                            break;
                        case 'flx-dbcombo':
                            if (!between)
                                sql = identifier + ' = \'' + value + '\'';
                            break;
                        case 'flx-check':
                            if (!between)
                                sql = identifier + ' = ' + isTrueSet;
                            break;
                        case 'flx-text':
                            if (!between) {
                                if ($(elem).attr("type") == "date") {
                                    let date = moment(value).format("YYYYMMDD");
                                    sql = 'CAST(' + identifier + ' as date) = ' + '\'' + date + '\'';
                                }
                                else if ($(elem).attr("type") == "number") {
                                    sql = `${identifier} = ${value}`;
                                }
                                else {
                                    sql = `${identifier} like '%${value}%'`;
                                }
                            }
                            else {
                                if ($(elem).attr("type") == "date") {
                                    let date = moment(value).format("YYYYMMDD");
                                    let maxdate = moment(maxValue).format("YYYYMMDD");
                                    sql = `CAST(${identifier} as date) between '${date}' and '${maxdate}'`;
                                }
                                else if ($(elem).attr("type") == "number") {
                                    sql = `${identifier} between ${value} and ${maxValue}`;
                                }
                            }
                            break;
                    }
                return sql;
            }
            filter_1.getWhere = getWhere;
            function cleanFilterModule(element, modulename, moduleType) {
                let filterModule = $(element).closest('flx-html')[0];
                if (moduleType == null) {
                    moduleType = 'flx-list';
                }
                let component = $('[modulename="' + modulename + '"]' + moduleType)[0];
                filterModule.refresh();
                component.additionalWhere = '';
                component.init();
            }
            filter_1.cleanFilterModule = cleanFilterModule;
            function clearFilterList(element, modulename) {
                let list = $(element).closest('main').find('flx-list[modulename="' + modulename + '"]')[0];
                list.additionalWhere = '';
                list.refresh();
            }
            filter_1.clearFilterList = clearFilterList;
            //Filter one o more lists using navigations buttons. Acepts year, month and single day modes.
            function filterDateModules(elem, mode, action, tableAlias, property, ...filteredLists) {
                let filterModule = $(elem).closest('flx-module')[0];
                let filterDate;
                let filterMode;
                let datesWhere;
                let combosWhere = '';
                let additionalWhere;
                if (mode != null && mode != '') {
                    filterMode = mode;
                }
                else if (filterModule.objectdefaults && filterModule.objectdefaults.moduleFilterDateMode) {
                    filterMode = filterModule.objectdefaults.moduleFilterDateMode;
                }
                else {
                    filterMode = 'month';
                }
                if (filterModule.objectdefaults && filterModule.objectdefaults.moduleFilterDate) {
                    filterDate = filterModule.objectdefaults.moduleFilterDate;
                }
                else {
                    filterDate = moment();
                }
                filterDate = getFilterDate(filterMode, action, filterDate);
                datesWhere = getFilterSqlDate(filterMode, action, filterDate, tableAlias, property);
                if (!filterModule.objectdefaults) {
                    filterModule.objectdefaults = { moduleFilterDateMode: filterMode, moduleFilterDate: filterDate, DatesFilter: datesWhere };
                }
                else {
                    filterModule.objectdefaults.moduleFilterDateMode = filterMode;
                    filterModule.objectdefaults.moduleFilterDate = filterDate;
                    filterModule.objectdefaults.DatesFilter = datesWhere;
                }
                if (filterModule.objectdefaults && filterModule.objectdefaults.CombosFilter) {
                    combosWhere = filterModule.objectdefaults.CombosFilter;
                }
                if (combosWhere != '') {
                    additionalWhere = combosWhere + ' AND ' + datesWhere;
                }
                else {
                    additionalWhere = datesWhere;
                }
                filteredLists.forEach((elem, index) => {
                    let list = $('flx-list[modulename = "' + elem + '"]')[0];
                    list.additionalWhere = additionalWhere;
                    list.refresh();
                });
            }
            filter_1.filterDateModules = filterDateModules;
            function getFilterDate(mode, action, fDate) {
                if (action === null || action === '') {
                    action = 'current';
                }
                if (action === 'substract') {
                    fDate = fDate.add(-1, mode);
                }
                else if (action === 'add') {
                    fDate = fDate.add(1, mode);
                }
                else {
                    fDate = moment();
                }
                return fDate;
            }
            filter_1.getFilterDate = getFilterDate;
            function getFilterSqlDate(mode, action, date, tableAlias, property) {
                let sqlFilter;
                if (mode === 'year') {
                    sqlFilter = 'YEAR(' + tableAlias + '.' + property + ') = \'' + date.year() + '\'';
                }
                else if (mode === 'month') {
                    sqlFilter = 'MONTH(' + tableAlias + '.' + property + ') = \'' + (parseInt(date.month()) + 1) + '\' AND YEAR(' + tableAlias + '.' + property + ') = \'' + date.year() + '\'';
                }
                else {
                    sqlFilter = 'CAST(' + tableAlias + '.' + property + ' as date) = ' + '\'' + date.format('YYYY-MM-DD') + '\'';
                }
                return sqlFilter;
            }
            filter_1.getFilterSqlDate = getFilterSqlDate;
            function setFilterDateMode(element) {
                setTimeout(() => {
                    let filterModule = $('#DatesFilter')[0].closest('flx-module');
                    let filterMode;
                    let filterDate;
                    let dateInfoSpan = $('#fltr-date');
                    let dateInfoFormat;
                    let todayButton = $('#fltr-btn-today');
                    let todayInfo;
                    if (filterModule.objectdefaults && filterModule.objectdefaults.moduleFilterDateMode) {
                        filterMode = filterModule.objectdefaults.moduleFilterDateMode;
                        filterDate = filterModule.objectdefaults.moduleFilterDate;
                    }
                    let modeButtons = $('#fltr-modes button');
                    modeButtons.each((index, elem) => {
                        if (elem.id === 'fltr-btn-' + filterMode) {
                            $(elem).addClass('active');
                        }
                        else {
                            $(elem).removeClass('active');
                        }
                    });
                    if (filterMode === 'day') {
                        dateInfoFormat = filterDate.format('dddd, DD MMMM YYYY');
                        // todayInfo = 'Hoy'
                    }
                    else if (filterMode === 'month') {
                        dateInfoFormat = filterDate.format('MMMM YYYY');
                        //todayInfo = moment().format('MMMM');
                    }
                    else if (filterMode === 'year') {
                        dateInfoFormat = filterDate.format('YYYY');
                        //todayInfo = moment().format('YYYY');
                    }
                    dateInfoSpan.empty();
                    dateInfoSpan.html(dateInfoFormat);
                    //todayButton.empty();
                    //todayButton.html(todayInfo);
                }, 500);
            }
            filter_1.setFilterDateMode = setFilterDateMode;
            function useFilterOnOtherModule(mainModuleName, dependingModuleName) {
                let mainListMod = $('flx-module[modulename="' + mainModuleName + '"] flx-list');
                let dependingListMod = $('flx-module[modulename="' + dependingModuleName + '"] flx-list');
                if (mainListMod[0] && dependingListMod[0]) {
                    let mainList = $(mainListMod)[0];
                    let dependingList = $(dependingListMod)[0];
                    dependingList.presets = mainList.presets;
                    flexygo.events.off(mainListMod, 'module', 'filtered');
                    flexygo.events.on(mainListMod, 'module', 'filtered', (e) => {
                        if (e.sender === mainListMod.closest('flx-module')[0]) {
                            dependingList.activeFilter = mainList.activeFilter;
                            dependingList.filterValues = mainList.filterValues;
                            dependingList.setPreset(mainList.presetId, mainList.presetText, mainList.presetIcon);
                        }
                    });
                }
            }
            filter_1.useFilterOnOtherModule = useFilterOnOtherModule;
        })(filter = external.filter || (external.filter = {}));
    })(external = flexygo.external || (flexygo.external = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=filter.js.map