var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var sebastian;
(function (sebastian) {
    var utils;
    (function (utils) {
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
        utils.toggleFilterList = toggleFilterList;
        function toggleFilterSeveralModules(element, modules, currentFilter) {
            let listAdditionalWhere;
            if (modules.length > 0) {
                $(modules).each((index, elem) => {
                    let currentmodule = $(`flx-list${elem}`)[0];
                    if (currentmodule) {
                        listAdditionalWhere = currentmodule.additionalWhere;
                        if (listAdditionalWhere != null && listAdditionalWhere != '') {
                            let wheres = [];
                            if (listAdditionalWhere.indexOf(currentFilter) !== -1) {
                                wheres = listAdditionalWhere.split(' OR ');
                                let delIndex = wheres.indexOf(currentFilter);
                                wheres.splice(delIndex, 1);
                                listAdditionalWhere = wheres.join(' OR ');
                            }
                            else {
                                wheres = listAdditionalWhere.split(' OR ');
                                wheres.push(currentFilter);
                                listAdditionalWhere = wheres.join(' OR ');
                            }
                        }
                        else {
                            listAdditionalWhere = currentFilter;
                        }
                        currentmodule.additionalWhere = listAdditionalWhere;
                        currentmodule.init();
                    }
                });
            }
            else {
                return false;
            }
            return listAdditionalWhere;
        }
        utils.toggleFilterSeveralModules = toggleFilterSeveralModules;
        function FilterSeveralModules(element, modules, filter) {
            if (modules.length > 0) {
                $(modules).each((index, elem) => {
                    let currentmodule = $(`flx-list${elem}`)[0];
                    if (currentmodule) {
                        currentmodule.additionalWhere = filter;
                        currentmodule.init();
                    }
                });
            }
            else {
                return false;
            }
            return true;
        }
        utils.FilterSeveralModules = FilterSeveralModules;
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
        utils.checkButtonsFilterList = checkButtonsFilterList;
        /**
         * Checks active filters in multiple modules and highlights corresponding filter buttons
         * Supports multiple simultaneous filters from different buttons
         * Call: sebastian.utils.checkActiveFiltersInModules(element, modules)
         * @param element - The element containing filter buttons
         * @param modules - Array of module selectors to check for active filters
         */
        function checkActiveFiltersInModules(element, modules) {
            setTimeout(() => {
                // Get all filter buttons
                let filterButtons = $(element).closest('main').find('button[filter]');
                // First remove all active classes
                filterButtons.removeClass('active');
                if (modules && modules.length > 0) {
                    // Collect all active filters from all modules
                    let allActiveFilters = [];
                    $(modules).each((index, moduleSelector) => {
                        let currentModule = $(`flx-list${moduleSelector}`)[0];
                        if (currentModule && currentModule.additionalWhere) {
                            let additionalWhere = currentModule.additionalWhere;
                            // Split by OR to get individual filters
                            let filters = additionalWhere.split(' OR ').map(f => f.trim());
                            allActiveFilters = allActiveFilters.concat(filters);
                        }
                    });
                    // Remove duplicates
                    allActiveFilters = [...new Set(allActiveFilters)];
                    // Check each filter button against active filters
                    filterButtons.each((btnIndex, btn) => {
                        let filterValue = $(btn).attr('filter');
                        if (filterValue) {
                            // Check if this exact filter is in the active filters
                            if (allActiveFilters.indexOf(filterValue) !== -1) {
                                $(btn).addClass('active');
                            }
                        }
                    });
                }
            }, 500);
        }
        utils.checkActiveFiltersInModules = checkActiveFiltersInModules;
        function toggleProcessFilterList(element, filter, controlCLass, overwrites = true) {
            let jqueryModule = $(element).closest('flx-module');
            let module = jqueryModule[0];
            let jqueryList = $(module).find('flx-list');
            let list = jqueryList[0];
            if (overwrites) {
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
            }
            else {
                let wheres = list.additionalWhere.split('AND');
                if (list.additionalWhere.includes(filter)) {
                    wheres = removeStringFromArray(wheres, filter);
                    //quitar filtro del additional where
                }
                else {
                    //añadir filtro al additional where
                    wheres.push(filter);
                }
                list.additionalWhere = wheres.join(' AND ');
                if (module.objectdefaults == null || module.objectdefaults == undefined) {
                    module.objectdefaults = { processFilterClass: controlCLass, additionalWhere: wheres.join(' AND ') };
                }
                else {
                    module.objectdefaults.processFilterClass = controlCLass;
                    module.objectdefaults.additionalWhere = wheres.join(' AND ');
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
        utils.toggleProcessFilterList = toggleProcessFilterList;
        function defaultFilterList(element, filter, controlCLass) {
            let list = $(element).find('flx-list')[0];
            if (flexygo.utils.isBlank(list.additionalWhere) && list.additionalWhere !== null) {
                sebastian.utils.toggleProcessFilterList(element, filter, controlCLass);
            }
            sebastian.utils.checkProcessButtonsFilterList(element);
        }
        utils.defaultFilterList = defaultFilterList;
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
        utils.checkProcessButtonsFilterList = checkProcessButtonsFilterList;
        function showRegisterCount(element) {
            setTimeout(() => {
                let me = $(element);
                let listElements = me.find('flx-list');
                listElements.each((i, el) => {
                    let list = el;
                    let number = list.maxRows;
                    let span = $(list).find('#listCounter');
                    span.html('Total: ' + number.toString());
                });
            }, 500);
        }
        utils.showRegisterCount = showRegisterCount;
        function filterModule(element, modulename, useAliases, moduleType) {
            let additionalWhere = getFilterString(element, useAliases, '#mainFilter');
            if (moduleType == null) {
                moduleType = 'flx-list';
            }
            let component = $('[modulename="' + modulename + '"]' + moduleType)[0];
            if (additionalWhere != component.additionalWhere) {
                component.page = 0;
                component.additionalWhere = additionalWhere;
                component.init();
            }
        }
        utils.filterModule = filterModule;
        function filterModuleRefresh(element, modulename, useAliases, moduleType) {
            if (window._hrFilterRestoring)
                return;
            let additionalWhere = getFilterString(element, useAliases, '#mainFilter');
            if (moduleType == null) {
                moduleType = 'flx-list';
            }
            let component = $('[modulename="' + modulename + '"]' + moduleType)[0];
            if (additionalWhere != component.additionalWhere) {
                // Save all multicombo values before re-render
                let mainFilter = $(element).closest('#mainFilter');
                let savedStates = [];
                mainFilter.find('flx-multicombo').each(function () {
                    let mc = this;
                    let name = $(this).attr('name');
                    let val = mc.getValue();
                    if (name && val) {
                        savedStates.push({ name: name, value: val });
                    }
                });
                component.page = 0;
                component.additionalWhere = additionalWhere;
                // Observe header re-render and restore values
                if (savedStates.length > 0) {
                    let mod = $(component).closest('flx-module')[0];
                    let obs = new MutationObserver(() => {
                        let allFound = savedStates.every(s => mod.querySelector('flx-multicombo[name="' + s.name + '"]'));
                        if (allFound) {
                            obs.disconnect();
                            window._hrFilterRestoring = true;
                            savedStates.forEach(s => {
                                let mc = mod.querySelector('flx-multicombo[name="' + s.name + '"]');
                                if (mc)
                                    mc.setValue(s.value);
                            });
                            setTimeout(() => { window._hrFilterRestoring = false; }, 300);
                        }
                    });
                    obs.observe(mod, { childList: true, subtree: true });
                }
                $(component).removeAttr('manualInit');
                component.refresh();
            }
        }
        utils.filterModuleRefresh = filterModuleRefresh;
        function getFilterString(element, useAliases, cntFilterSelector) {
            let mainFilter = element.closest(`${cntFilterSelector}`);
            let multicombos = $(mainFilter).find('flx-multicombo');
            let dbcombos = $(mainFilter).find('flx-dbcombo');
            let texts = $(mainFilter).find('flx-text:not([perioddates])');
            let periodDates = $(mainFilter).find('flx-text[perioddates]');
            let elements = [...multicombos.toArray(), ...dbcombos.toArray(), ...texts.toArray()];
            let filterValues = [];
            let combosWhere = '';
            let datesWhere = '';
            let additionalWhere;
            //Combos,multicombos,textos y fechas simples
            elements.forEach((elem, index) => {
                let value = elem.getValue();
                let property = $(elem).attr('FilterProperty');
                let TableAlias = $(elem).attr('TableAlias');
                if (value != null && value != '' && !flexygo.utils.isBlank(property)) {
                    //let filterValue = {}
                    let identifier = useAliases ? TableAlias + '.' + property : property;
                    let sql;
                    switch ($(elem).prop('nodeName').toLowerCase()) {
                        case 'flx-multicombo':
                            value = value.split('|');
                            value.forEach((elem, index) => {
                                value[index] = `'${elem}'`;
                            });
                            sql = identifier + ' in (' + value.join(',') + ')';
                            break;
                        case 'flx-dbcombo':
                        case 'flx-text':
                            if ($(elem).attr('type') === 'date') {
                                sql = `CAST(${identifier} AS DATE) = '${moment(value).format('YYYY-MM-DD')}'`;
                            }
                            else {
                                sql = identifier + ' like \'%' + value + '%\'';
                            }
                            break;
                    }
                    filterValues.push(sql);
                }
            });
            //Periodos de fechas
            let filters = {};
            periodDates.each(function () {
                let el = $(this);
                let alias = el.attr('TableAlias');
                let prop = el.attr('FilterProperty');
                let key = alias + '.' + prop;
                let value = el.val();
                if (!filters[key]) {
                    filters[key] = { from: null, to: null };
                }
                if (el.is('[datefrominput]')) {
                    filters[key].from = value;
                }
                else if (el.is('[dateendinput]')) {
                    filters[key].to = value;
                }
            });
            for (let key in filters) {
                let whereSql = '';
                let { from, to } = filters[key];
                if (from && to) {
                    if (whereSql !== '')
                        whereSql += ' AND ';
                    whereSql += `${key} BETWEEN CAST('${moment(from).format('YYYY-MM-DD')}'  AS DATE) AND CAST('${moment(to).format('YYYY-MM-DD')}' AS DATE) `;
                }
                else if (from) {
                    if (whereSql !== '')
                        whereSql += ' AND ';
                    whereSql += `${key} >= CAST('${moment(from).format('YYYY-MM-DD')}' AS DATE) `;
                }
                else if (to) {
                    if (whereSql !== '')
                        whereSql += ' AND ';
                    whereSql += `${key} <= CAST('${moment(to).format('YYYY-MM-DD')}' AS DATE) `;
                }
                if (whereSql != '') {
                    filterValues.push(whereSql);
                }
            }
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
                if (moduleFilters.objectdefaults) {
                    moduleFilters.objectdefaults.CombosFilter = null;
                }
                additionalWhere = datesWhere;
            }
            else {
                if (moduleFilters.objectdefaults) {
                    moduleFilters.objectdefaults.CombosFilter = null;
                }
                additionalWhere = null;
            }
            return additionalWhere;
        }
        utils.getFilterString = getFilterString;
        function cleanFilterModule(element, modulename, moduleType, refreshFilter) {
            let filterModule;
            if (refreshFilter != null) {
                filterModule = $(element).closest('flx-html')[0];
                filterModule.refresh();
            }
            if (moduleType == null) {
                moduleType = 'flx-list';
            }
            let component = $('[modulename="' + modulename + '"]' + moduleType)[0];
            component.page = 0;
            component.additionalWhere = '';
            component.init();
        }
        utils.cleanFilterModule = cleanFilterModule;
        function cleanCustomFilters(element, cntFilterId) {
            let mainFilter = element.closest(`${cntFilterId}`);
            let multicombos = $(mainFilter).find('flx-multicombo');
            let dbcombos = $(mainFilter).find('flx-dbcombo');
            let texts = $(mainFilter).find('flx-text');
            let elements = [...multicombos.toArray(), ...dbcombos.toArray(), ...texts.toArray()];
            elements.forEach((elem, index) => {
                switch ($(elem).prop('nodeName').toLowerCase()) {
                    case 'flx-text':
                        $(elem).val('');
                        break;
                    default:
                        $(elem).value = '';
                        $(elem).find('.cleared i').click();
                }
            });
        }
        utils.cleanCustomFilters = cleanCustomFilters;
        function clearFilterList(element, modulename) {
            let list = $(element).closest('main').find('flx-list[modulename="' + modulename + '"]')[0];
            list.additionalWhere = '';
            list.page = 0;
            list.refresh();
        }
        utils.clearFilterList = clearFilterList;
        //Executes bag processes manually from a buttom, adding the parameter ids with the ids selected of a desired object
        function execBagProcess(element, object, process, params) {
            let checkedIds = flexygo.selection.getArray(object);
            let ids = checkedIds.join(',');
            params.push({ Key: 'ids', Value: ids });
            flexygo.nav.execProcess(process, null, null, '{\'ids\':\'' + ids + '\'}', params, 'sliderightx850', false, $(element));
            flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone(object, null, flexygo.utils.getModule(element), $(element));
        }
        utils.execBagProcess = execBagProcess;
        //Replaces values in a html element, used to parse values not availables on the actual scope
        function replaceValues(element, values) {
            values.forEach(value => {
                $(element).html($(element).html().replace(Object.keys(value)[0], value[Object.keys(value)[0]]));
                $(element).html($(element).html().replace(Object.keys(value)[0].toLowerCase(), value[Object.keys(value)[0]]));
            });
        }
        utils.replaceValues = replaceValues;
        function parseDefaults(element) {
            let pageHistory = flexygo.history.get($(element));
            let defaults;
            if (pageHistory) {
                if (pageHistory.defaults)
                    defaults = JSON.parse(pageHistory.defaults.replace(/'/gm, '"'));
            }
            return defaults || {};
        }
        utils.parseDefaults = parseDefaults;
        //modulename = module with a sticky header, is has to contain an #stickyHeader element
        //elementToStickOn = element after wich we will put the #stickyHeader element
        //the function relies on:
        //#stickyGroup = elemento que agrupa toda la informacion (incluida cabecera) que pertenece al grupo sticky
        //#stickyHeader = elemento que se reposicionara debajo del elementToStickOn al llegar a la parte superior de la pagina
        //.headerSuffix (opcional) = elemento que se reposicionara debajo del #stickyHeader al llegar a la parte superior de la pagina
        //.stickyHeaderLine = lineas de informacion del #stickyGroup, se utilizan como referencia de un elemento estatico para contolar el cambio de #stickyHeader
        function stickyOnScroll(moduleName, elementToStickOn) {
            //FLEXYGO TODO: 
            //check size on resize
            // multiple suffixes
            // sticky hasta que el modulo desaparezca
            // copiar el contenido al sticky, no mover el sticky, moverlo hace que suba la platilla del modulo ya que hay una parte de este que desaparece
            if ($(`[modulename=${moduleName}]`).length === 0) {
                $('[id=realMain]').off('scroll.stickyOn' + moduleName);
                console.log(`unsubscribing event "stickyOn${moduleName}" as the module not exists`);
                return;
            }
            let stickyGroups = $(`[modulename=${moduleName}]`).find('[id*=stickyGroup]');
            let newStickyHeaderTop = $(elementToStickOn).offset().top + $(elementToStickOn).outerHeight();
            let offsetIzqModulo = $(`flx-module[modulename=${moduleName}]`).offset().left;
            let widthModulo = $(`flx-module[modulename=${moduleName}]`).outerWidth();
            let affixStyle = {
                'top': newStickyHeaderTop,
                'width': widthModulo,
                'left': offsetIzqModulo,
                'box-shadow': '0px 5px 5px -5px rgb(0 0 0 / 40%)',
                'z-index': '1'
            };
            if ($(`flx-module[modulename=${moduleName}]`).css('border')) {
                affixStyle['border-left'] = $(`flx-module[modulename=${moduleName}]`).css('border');
                affixStyle['border-right'] = $(`flx-module[modulename=${moduleName}]`).css('border');
            }
            let stickySidebar;
            let stickyHeader;
            stickyGroups.each((i, elem) => {
                stickyHeader = $(elem).find('[id*=stickyHeader]');
                let firstStickyHeaderLine = $(elem).find('.stickyHeaderLine:first');
                stickySidebar = firstStickyHeaderLine.offset().top - firstStickyHeaderLine.outerHeight() - newStickyHeaderTop + 30; //MADRE MIA QUE CHAPUZA
                //let sidebar = stickyHeader.find('.sidebar')
                if (stickySidebar < 0) {
                    stickyHeader.addClass('affix');
                    stickyHeader.css(affixStyle);
                    if (stickyHeader.css('background-color') === 'rgba(0, 0, 0, 0)') {
                        stickyHeader.css('background', '#ffffff');
                    }
                }
                else {
                    stickyHeader.removeClass('affix');
                    stickyHeader.removeAttr('style');
                    /*stickyHeader.css('box-shadow', '');
                    stickyHeader.css('top', '');
                    stickyHeader.css('width', '');
                    stickyHeader.css('left', '');
                    stickyHeader.css('border', '');*/
                }
            });
            /*let headerInitialSuffixStyle = {
                'top': 'initial',
                'width': '',
                'left': 'initial',
                'box-shadow': 'initial',
                'position': 'initial',
                'background': 'initial',
                'border-left': 'initial',
                'border-right': 'initial'
            }*/
            // $('.headerSuffix').removeClass('cabfijada');
            //$('.headerSuffix').css(headerInitialSuffixStyle);
            $('.headerSuffix').removeAttr('style');
            if ($('.affix').length > 0) {
                let lastSuffix;
                $('.headerSuffix').each((i, elem) => {
                    stickySidebar = $(elem).offset().top - $(elem).outerHeight() - ($('.affix:first').offset().top - 1 + $('.affix:first').outerHeight());
                    if (stickySidebar < 0) {
                        lastSuffix = elem;
                    }
                });
                if (lastSuffix) {
                    //check if the fixed header is visible
                    if ($('.affix:first').is(':hidden')) {
                        $(lastSuffix).css({
                            'top': newStickyHeaderTop,
                        });
                    }
                    else {
                        $(lastSuffix).css({
                            'top': $('.affix:first').offset().top - 1 + $('.affix:first').outerHeight(),
                        });
                    }
                    $('.affix').css('box-shadow', 'unset');
                    $(lastSuffix).css({
                        'width': widthModulo,
                        'left': offsetIzqModulo,
                        'position': 'fixed',
                        'box-shadow': '0px 5px 5px -5px rgb(0 0 0 / 40%)'
                    });
                    if ($(`flx-module[modulename=${moduleName}]`).css('border')) {
                        $(lastSuffix).css('border-left', $(`flx-module[modulename=${moduleName}]`).css('border'));
                        $(lastSuffix).css('border-right', $(`flx-module[modulename=${moduleName}]`).css('border'));
                    }
                    if ($(lastSuffix).css('background-color') === 'rgba(0, 0, 0, 0)') {
                        $(lastSuffix).css('background', '#ffffff');
                    }
                }
            }
        }
        utils.stickyOnScroll = stickyOnScroll;
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
        utils.filterDateModules = filterDateModules;
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
        utils.getFilterDate = getFilterDate;
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
        utils.getFilterSqlDate = getFilterSqlDate;
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
        utils.setFilterDateMode = setFilterDateMode;
        function selectTargetsClick(event, element) {
            if ($(element).hasClass('target')) {
                $(element).removeClass('target');
            }
            else {
                if (event.shiftKey) {
                    let cont = $(element).closest('.selectClickCont');
                    let selectedItems = $(cont).find('.target');
                    $('.selectClickItem').removeClass('target');
                    if (selectedItems.length > 0) {
                        let firstItem = parseInt(selectedItems[0].id.split('-')[1]);
                        let currentItem = parseInt(element.id.split('-')[1]);
                        if (firstItem < currentItem) {
                            for (let i = firstItem; i <= currentItem; i++) {
                                $(cont).find('#selectClickItem-' + i).addClass('target');
                            }
                        }
                        else if (firstItem > currentItem) {
                            for (let i = currentItem; i <= firstItem; i++) {
                                $(cont).find('#selectClickItem-' + i).addClass('target');
                            }
                        }
                    }
                    else {
                        $(element).addClass('target');
                    }
                }
                else if (event.ctrlKey) {
                    $(element).addClass('target');
                }
                else {
                    let parentCont = $(element).closest('div.selectClickCont');
                    let otherTarget = $('.target');
                    otherTarget.each((index, elem) => {
                        if (!$(elem.parentElement).is(parentCont)) {
                            $(elem).removeClass('target');
                        }
                    });
                    $(element).addClass('target');
                }
            }
        }
        utils.selectTargetsClick = selectTargetsClick;
        function setOptionToTargetClick(element, processName, patternType, patternShiftId) {
            //ESTO QUE HACE AQUÍ?
            let ids = [];
            let cycleId;
            let targetItems = $('.target');
            if (targetItems.length > 0) {
                cycleId = targetItems[0].closest('.selectClickCont').id.split('-')[1];
                targetItems.each((index, elem) => {
                    ids.push(elem.id.split('-')[1]);
                });
                let params = [
                    { Key: 'PatternShiftId', value: parseInt(patternShiftId) },
                    { Key: 'CycleId', value: parseInt(cycleId) },
                    { Key: 'SequenceIds', Value: ids.join(',') },
                    { Key: 'PatternTypeId', Value: parseInt(patternType) }
                ];
                flexygo.nav.execProcess(processName, null, null, null, params, 'popup', false, $(element), false, false);
            }
        }
        utils.setOptionToTargetClick = setOptionToTargetClick;
        function useFilterOnOtherModule(mainModuleName, dependingModuleName, mainModuleInTab = false) {
            let dependingListMod = $('flx-module[modulename="' + dependingModuleName + '"] flx-list');
            let mainListMod = mainModuleInTab ? $('flx-moduletab flx-list[modulename="' + mainModuleName + '"]') : $('flx-module[modulename="' + mainModuleName + '"] flx-list');
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
        utils.useFilterOnOtherModule = useFilterOnOtherModule;
        function ComboGoToPage(elem, pageName, tableAlias, propertyWhere, objectName = '', otherDefaults, otherWhere) {
            let value = $(elem).val();
            let defaults = otherDefaults != '' ? `{${otherDefaults}, '${propertyWhere}' : '${value}'}` : '';
            let where = otherWhere != '' ? `${otherWhere} AND ${tableAlias}.${propertyWhere} = ${value}` : `${tableAlias}.${propertyWhere} = ${value}`;
            flexygo.nav.openPageName(pageName, objectName, where, defaults, 'current', false);
        }
        utils.ComboGoToPage = ComboGoToPage;
        function addLock(time = 5000) {
            setLoadingAnimation();
            setTimeout(function () {
                sebastian.utils.removeLock();
            }, time);
        }
        utils.addLock = addLock;
        function removeLock() {
            removeLoadingAnimation();
        }
        utils.removeLock = removeLock;
        function initialFilterList(controlModuleId, filteredModuleId, filterId, wheres) {
            let firstLoad = $(controlModuleId)[0]; //#FirstLoad
            let counter = 0;
            if (firstLoad.value) {
                firstLoad.value = "false";
                const filterInterval = setInterval(() => {
                    let moduleFilter = $(filteredModuleId).find('flx-filter')[0];
                    counter++;
                    if (counter == 100 || !filteredModuleId) {
                        clearInterval(filterInterval);
                    }
                    if (moduleFilter) {
                        clearInterval(filterInterval);
                        moduleFilter.renderFilter(filterId);
                        let objectwhere = wheres.split('/');
                        objectwhere.forEach((elem, index) => {
                            let prop = elem.split(':')[0];
                            let value = elem.split(':')[1];
                            let combo = $(`[property="${prop}"]`);
                            combo.val(value);
                        });
                        $(filteredModuleId).find(".filterButtons.btn-group").find(".icon-search").parent("button").click();
                    }
                }, 100);
            }
        }
        utils.initialFilterList = initialFilterList;
        function toggleBackgroundColor(element) {
            let newBackColor = $(element).css('color');
            let newTextColor = $(element).css('background-color');
            $(element).css('color', newTextColor);
            $(element).css('background-color', newBackColor);
            $(element).toggleClass('active');
        }
        utils.toggleBackgroundColor = toggleBackgroundColor;
        utils.openImage = (Image, title) => {
            if (Image.length === 0) {
                return;
            }
            let imageContainer = $(`<div class=""><img class="img-responsive" src="${Image}"></div>`);
            imageContainer.dialog({
                position: { my: "center top", at: "center top", of: $('body') },
                title: title,
                resizable: true,
                width: "50%",
                height: "auto",
                modal: true,
                open: (Image) => {
                    if ($(window).width() < 600) {
                        $(Image).parent().css("max-width", "100%");
                    }
                    else {
                        $(Image).parent().css("max-width", "auto");
                    }
                },
                close: (Image) => { $(Image.target).dialog('destroy').remove(); }
            }).dialogExtend({
                "closable": true,
                "maximizable": false,
                "minimizable": false,
                "collapsable": false,
                "dblclick": false,
                "modal": true,
                "close": (Image) => { $(Image.target).remove(); }
            });
        };
        function extractNumbersParenthesis(string) {
            const regex = /\((.*?)\)/;
            const matches = string.match(regex);
            if (matches && matches.length > 1) {
                return matches[1].split(',').map(n => n.trim()).join(',');
            }
            else {
                return '';
            }
        }
        utils.extractNumbersParenthesis = extractNumbersParenthesis;
        function removeStringFromArray(arr, str) {
            const index = arr.indexOf(str);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        }
        utils.removeStringFromArray = removeStringFromArray;
        /**
         *
         * @param controlSelector cobntrol selector that has to be on the dom to keep the interval active
         * @param targetSelector jquery selector that executes the callback function when it exists
         * @param callback callback function
         */
        function fakeAfterLoad(controlSelector, targetSelector, callback) {
            let interval = setInterval(() => {
                let controlElement = $(controlSelector);
                if (controlElement.length > 0) {
                    let targetElement = $(targetSelector);
                    if (targetElement.length > 0) {
                        callback();
                        clearInterval(interval);
                    }
                }
                else {
                    clearInterval(interval);
                }
            }, 1000);
        }
        utils.fakeAfterLoad = fakeAfterLoad;
        function closeNavMenu() {
            if ($("#miniButton i").hasClass("flipped") && !flexygo.utils.isSizeSmartphone()) {
                flexygo.nav.toggleNavBar();
            }
        }
        utils.closeNavMenu = closeNavMenu;
        function goHomeIfMobile() {
            //sebastian.utils.goHomeIfMobile()
            if (flexygo.utils.isSizeSmartphone()) {
                flexygo.nav.goHome();
            }
        }
        utils.goHomeIfMobile = goHomeIfMobile;
        function hideEmptyModule(module) {
            //sebastian.utils.hideEmptyModule(this);
            let modulename = $(module).attr('modulename');
            let dataLength = $(`[modulename="${modulename}"]`).find($(`[modulename="${modulename}"]`))[0].data.length;
            if (!dataLength) {
                $(module).addClass('hidden');
            }
        }
        utils.hideEmptyModule = hideEmptyModule;
        // Elimina etiquetas html y devuelve texto
        function extractTextFromNode(node) {
            return __awaiter(this, void 0, void 0, function* () {
                let text = node;
                // Si el nodo es de tipo texto, agrega su contenido al resultado
                if (node.nodeType === Node.TEXT_NODE) {
                    text += node.textContent;
                }
                else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Si el nodo es un elemento, recorre sus nodos hijos
                    for (const childNode of node.childNodes) {
                        text += yield extractTextFromNode(childNode);
                    }
                }
                let title = text;
                if (flexygo.utils.isBlank(text)) {
                    text = "&nbsp;";
                }
                if (text.length > 80) {
                    text = text.substring(0, 80);
                    text = text + "...";
                }
                return `<span class="col-12 block" title="${title}">${text}</span>`;
            });
        }
        utils.extractTextFromNode = extractTextFromNode;
        ;
        function isAlphanumericKey(keyCode) {
            return ((keyCode >= 48 && keyCode <= 57) ||
                ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 122))) && (keyCode < 112 || keyCode > 123);
        }
        utils.isAlphanumericKey = isAlphanumericKey;
        function ChangeDate(element, modules, where) {
            if (modules.length > 0) {
                let dyear, dmonth;
                let dcontainer = $(element).closest('.emp-selector-arrow-container');
                let pickerContainer = $(element).closest('.emp-selector-arrow');
                let type = $(pickerContainer).attr('type'); // 0: year 1: month 2: today
                let mode = $(element).attr('mode');
                dyear = $(dcontainer).attr("year");
                dmonth = $(dcontainer).attr("month");
                if (type == 0) {
                    dyear = parseInt(dyear) + (mode == 'prev' ? (-1) : (+1));
                }
                else if (type == 1) {
                    dmonth = parseInt(dmonth) + (mode == 'prev' ? (-1) : (+1));
                    dyear = (dmonth > 12 ? (parseInt(dyear) + 1) : (dmonth < 1 ? (parseInt(dyear) - 1) : dyear));
                    dmonth = (dmonth > 12 ? 1 : (dmonth < 1 ? 12 : dmonth));
                }
                else {
                    dmonth = moment().format("M");
                    dyear = moment().format("YYYY");
                }
                UpdateSelectorDate(element, dyear, dmonth);
                let newCurrentDate = `${dyear}-${dmonth}-01`;
                where = flexygo.utils.parser.compile({ newCurrentDate: newCurrentDate }, where);
                $(modules).each((index, elem) => {
                    if ($(elem)[0]) {
                        $(elem)[0].additionalWhere = where;
                        $(elem)[0].refresh();
                    }
                });
                flexygo.selection.clear("emp_vHR_Employee_Daydate");
                return newCurrentDate;
            }
        }
        utils.ChangeDate = ChangeDate;
        function UpdateSelectorDate(e, dyear, dmonth) {
            let dcontainer = $(e).closest('.emp-selector-arrow-container');
            $(dcontainer).attr("year", dyear);
            $(dcontainer).find('.emp-selector-arrow[type="0"] .emp-selector-arrow-value').html(dyear);
            $(dcontainer).attr("month", dmonth);
            $(dcontainer).find('.emp-selector-arrow[type="1"] .emp-selector-arrow-value').html(flexygo.localization.translate(`months.${dmonth}`));
        }
        utils.UpdateSelectorDate = UpdateSelectorDate;
        function saveFilterValueHistory(history, moduleName, activeFilter, filters) {
            let page = 0;
            if (!history.filtersValues) {
                history.filtersValues = new flexygo.nav.ModuleFilterHistory();
            }
            let histElem = {
                activeFilter: activeFilter,
                activePage: page,
                properties: filters
            };
            history.filtersValues[moduleName] = histElem;
            flexygo.history.historyLog.add('', history.description, history);
        }
        utils.saveFilterValueHistory = saveFilterValueHistory;
        function updatePropertyTable(el, valor) {
            let objName = el.closest('.dataObject').attr('obj');
            let objValue = el.closest('.dataObject').attr('pk');
            let objWhere = "";
            let objConf = new flexygo.obj.Entity(objName, "");
            let objPK = objConf.getConfig().KeyFields;
            for (let i = 0; i < objPK.length; i++) {
                if (objWhere !== "") {
                    objWhere += " AND ";
                }
                objWhere += objPK[i] + '=\'' + objValue.split("|")[i] + '\'';
            }
            let obj = new flexygo.obj.Entity(objName, objWhere);
            obj.read();
            obj.data[el.attr('propertyField')].Value = valor;
            if (obj.update()) {
                flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
            }
        }
        utils.updatePropertyTable = updatePropertyTable;
        function updateObject(el, properties = {}) {
            let objName = el.closest('.dataObject').attr('obj');
            let objValue = el.closest('.dataObject').attr('pk');
            let objWhere = "";
            let objConf = new flexygo.obj.Entity(objName, "");
            let objPK = objConf.getConfig().KeyFields;
            if (!flexygo.utils.isBlank(objValue)) {
                for (let i = 0; i < objPK.length; i++) {
                    if (objWhere !== "") {
                        objWhere += " AND ";
                    }
                    objWhere += objPK[i] + '=\'' + objValue.split("|")[i] + '\'';
                }
            }
            let obj = new flexygo.obj.Entity(objName, objWhere);
            obj.read();
            for (let propName in properties) {
                if (properties.hasOwnProperty(propName)) {
                    let val = properties[propName];
                    obj.data[propName].Value = val;
                }
            }
            if (flexygo.utils.isBlank(objWhere)) {
                if (obj.insert()) {
                    flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
                }
            }
            else {
                if (obj.update()) {
                    flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
                }
            }
        }
        utils.updateObject = updateObject;
        utils.paintInlineForm = (objectName, objectWhere, defaults, moduleName, returnItemTemplate, hiddenProperties, customSaveFuncion, customDeleteFuncion, customWidthInputs, customClassContainer) => {
            $(returnItemTemplate).html('');
            $(returnItemTemplate).addClass('padding-0').removeClass('align-vertical-center').css("border", "none");
            let flxmodule = $('<flx-module class="align-items-middle margin-bottom-0 border-left-outstanding"><div class="form-left"/><div class="form-center"/><div class="form-right"/></flx-module>');
            let flxedit = $(`<flx-edit objectname="${objectName}" objectwhere="${objectWhere}" defaults='${(defaults ? flexygo.utils.parser.replaceAll(defaults, "'", '"') : defaults)}' modulename="${moduleName}" class="form-inline"/>`);
            let btnDelete = $(`<button title="${(!flexygo.utils.isBlank(objectWhere) ? flexygo.localization.translate('generic.cancel') : flexygo.localization.translate('generic.remove'))}" class="gBtn-danger"><i class="${(!flexygo.utils.isBlank(objectWhere) ? 'flx-icon icon-bin' : 'fa fa-close')}"></i></button>`);
            let btnSave = $(`<button title="${flexygo.localization.translate('flxedit.save')}" class="gBtn-info saveBtn"> <i class="flx-icon icon-save-2"></i></button>`);
            let SaveFunction, DeleteFunction;
            if (!flexygo.utils.isBlank(customSaveFuncion)) {
                SaveFunction = eval(customSaveFuncion);
            }
            if (!flexygo.utils.isBlank(customDeleteFuncion)) {
                DeleteFunction = eval(customDeleteFuncion);
            }
            btnSave.on('click', (ev) => {
                if (typeof SaveFunction === 'function') {
                    SaveFunction($(returnItemTemplate));
                }
                else {
                    //flexygo.utils.simpleSaveForm(objectName, objectWhere, [], true, $(flxedit));
                    flexygo.ui.wc.FlxModuleElement.prototype.saveModule(objectName, objectWhere, $(flxedit), $(flxedit));
                }
            });
            btnDelete.on('click', (ev) => {
                if (typeof DeleteFunction === 'function') {
                    DeleteFunction($(returnItemTemplate));
                }
                else if (!flexygo.utils.isBlank(objectWhere)) {
                    //flexygo.gmao.utils.simpleSaveForm(objectName, objectWhere, [], true, $(flxedit));
                    flexygo.ui.wc.FlxModuleElement.prototype.deleteModule(objectName, objectWhere, $(flxedit), $(flxedit));
                }
                else {
                    $(flxedit).closest('flx-module').remove();
                }
            });
            flxmodule.find('.form-center').append(flxedit);
            flxmodule.find('.form-right').append(btnSave);
            flxmodule.find('.form-left').append(btnDelete);
            $(returnItemTemplate).addClass(customClassContainer);
            $(returnItemTemplate).append(flxmodule);
            // Corrección de tab index hacia el btn de guardado y control de tamaño de inputs
            var loadFlxEdit = setInterval(() => {
                if (!flexygo.utils.isBlank($(flxedit).attr('controlsnumber'))) {
                    clearInterval(loadFlxEdit);
                    $(flxedit).closest('flx-module').find('.saveBtn').attr('tabindex', $(flxedit).attr('controlsnumber'));
                    let def;
                    if (customWidthInputs) {
                        if (typeof customWidthInputs == 'string') {
                            def = JSON.parse(flexygo.utils.parser.replaceAll(customWidthInputs, "'", '"'));
                        }
                        else {
                            def = defaults;
                        }
                        for (let prop in def) {
                            if ($(`[property="${prop}"]`).length > 0) {
                                if ($(`[property="${prop}"]`).find('.input-group').length > 0) {
                                    $(`[property="${prop}"]`).find('.input-group').css('width', `${def[prop]}px`);
                                }
                                else {
                                    $(`[property="${prop}"]`).find('input').css('width', `${def[prop]}px`);
                                }
                            }
                        }
                    }
                    let hideProps;
                    if (hiddenProperties) {
                        if (typeof hiddenProperties == 'string') {
                            hideProps = hiddenProperties.split("|");
                            ;
                        }
                        else {
                            hideProps = hiddenProperties;
                        }
                        for (var i = 0; i < hideProps.length; i++) {
                            let prop = hideProps[i];
                            if ($(`[property="${prop}"]`).length > 0) {
                                $(`[property="${prop}"]`).closest('.grid-stack-item').addClass('hide');
                            }
                        }
                    }
                }
            }, 200);
        };
        function setLoadingAnimation() {
            //$('body').append(`<div id="loadingAnimation" class="fullscreen fullbackground">
            //                        <div class="animation-cont">
            //                            <div class="dot-windmill"></div>
            //                        </div>
            //                    </div>`);
            $('body').append(`<div id="loadingAnimation" class="fullscreen fullbackground">
                                <div class="animation-cont">
                                    <div class="hr-loader"></div> 
                                </div>
                            </div>`);
        }
        utils.setLoadingAnimation = setLoadingAnimation;
        function removeLoadingAnimation() {
            if ($('#loadingAnimation').length > 0) {
                $('#loadingAnimation').remove();
            }
        }
        utils.removeLoadingAnimation = removeLoadingAnimation;
        function selectAllRowsFromList(currentProcess) {
            let list = currentProcess.module.module[0];
            let data = list.data;
            let insIds = data.map(item => item.InsId);
            if (insIds.length > 0) {
                flexygo.selection.setArray(currentProcess.module.module[0].objectname, insIds);
                list.init();
            }
        }
        utils.selectAllRowsFromList = selectAllRowsFromList;
        function removeSelectionAllRowsFromList(currentProcess) {
            let list = currentProcess.module.module[0];
            flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone(currentProcess.module.module[0].objectname, null, $(currentProcess.module), $(this));
            if ($(list)) {
                list.init();
            }
        }
        utils.removeSelectionAllRowsFromList = removeSelectionAllRowsFromList;
        function toggleSelectionFromList(currentProcess, selected, triggerElement) {
            if (selected) {
                sebastian.utils.selectAllRowsFromList(currentProcess);
            }
            else {
                sebastian.utils.removeSelectionAllRowsFromList(currentProcess);
            }
            //showSelectedRowsList(triggerElement,currentProcess.module.module[0].objectname)
        }
        utils.toggleSelectionFromList = toggleSelectionFromList;
        function showSelectedRowsList(elem, objectName) {
            let checkedIds = flexygo.selection.getArray(objectName);
            $(elem).closest('.cntBodyHeader').find('.counter-btn span').html(checkedIds.length.toString());
        }
        utils.showSelectedRowsList = showSelectedRowsList;
        function checkIfPlannerGroupsIsFiltered(element, selector) {
            //flexygo.gmao.utils.checkIfPlannerGroupsIsFiltered(this)
            let planner = $(element).closest('flx-module').find('flx-planner')[0];
            if (flexygo.utils.isBlank(planner.groupsFilter)) {
                $(element).find(selector).removeClass('active');
            }
            else {
                $(element).find(selector).addClass('active');
            }
        }
        utils.checkIfPlannerGroupsIsFiltered = checkIfPlannerGroupsIsFiltered;
        /**
         * Oculta un módulo si alguno de sus elementos contiene la clase 'hr-hidden-module-no-regs'
         * @param element - Elemento del módulo a evaluar
         */
        function hideModuleByHiddenModuleNoRegsClass(element) {
            let $module = $(element).closest('flx-module');
            if ($(element).find('.hr-hidden-module-no-regs').length > 0) {
                $module.addClass('hidden');
            }
        }
        utils.hideModuleByHiddenModuleNoRegsClass = hideModuleByHiddenModuleNoRegsClass;
        /**
         * Formats a date using moment.js with a specific culture/locale.
         * If no culture is provided, uses the current global moment locale.
         * Call: sebastian.utils.formatDate(date, 'dddd, LL', 'es-ES')
         * @param date    - The date to format (any value accepted by moment())
         * @param format  - Moment.js format string (e.g. 'dddd', 'LL', 'MMMM yyyy')
         * @param culture - Optional BCP47 culture code (e.g. 'es-ES', 'en-GB'). Case-insensitive.
         * @returns Formatted date string in the requested locale
         */
        function formatDate(date, format, culture) {
            if (culture) {
                return moment(date).locale(culture.toLowerCase()).format(format);
            }
            return moment(date).format(format);
        }
        utils.formatDate = formatDate;
        /**
         * Clears all objectdefaults from the given module element
         * Call: sebastian.utils.clearModuleDefaults(element)
         * @param element - The flx-module element
         */
        function clearModuleDefaults(element) {
            const moduleElement = element;
            if (!moduleElement)
                return;
            moduleElement.objectdefaults = null;
        }
        utils.clearModuleDefaults = clearModuleDefaults;
    })(utils = sebastian.utils || (sebastian.utils = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=utils.js.map