var sebastian;
(function (sebastian) {
    var historiclist;
    (function (historiclist) {
        function toggleActiveGroups(elem) {
            let value = $(elem).val();
            let inputGroup = $(elem).attr('group');
            let jqueryChecks;
            if (inputGroup) {
                if (value) {
                    jqueryChecks = $('flx-check[listoption][group]').not(`[group="${inputGroup}"]`);
                    jqueryChecks.each((index, elem) => {
                        $(elem).find('input[type="checkbox"]').prop('disabled', true);
                        $(elem).find('label.nameproperty').css('color', '#c2c2c2');
                    });
                }
                else {
                    let jqueryChecksChecked = $('flx-check[listoption][group][checked="checked"]');
                    if (jqueryChecksChecked.length === 0) {
                        jqueryChecks = $('flx-check[listoption][group]');
                        jqueryChecks.each((index, elem) => {
                            $(elem).find('input[type="checkbox"]').prop('disabled', false);
                            $(elem).find('label.nameproperty').css('color', '#777');
                        });
                    }
                }
            }
        }
        historiclist.toggleActiveGroups = toggleActiveGroups;
        function getListOptions(elem) {
            let module = $(elem).closest('flx-module');
            let objectwhere = '';
            let comboswhere;
            let optionswhere;
            let dateswhere;
            /*DATA*/
            let jqueryChecksChecked = $('flx-check[listoption][checked="checked"]');
            let dataOptions = [];
            let groupOptions = jqueryChecksChecked.attr('group');
            if (jqueryChecksChecked.length == 0) {
                flexygo.msg.warning(flexygo.localization.translate('historiclst.selectoptionmsg'), null, flexygo.localization.translate('historiclst.selectoption'), 'bottom right');
                return false;
            }
            jqueryChecksChecked.each((index, element) => {
                if ($(element).attr('viewname')) {
                    let filter = `${$(element).attr('viewname')}.${$(element).attr('property')} =${$(element).attr('propertyid')}`;
                    dataOptions.push(filter);
                }
            });
            if (dataOptions.length > 0) {
                optionswhere = dataOptions.join(' OR ');
                optionswhere = `(${optionswhere})`;
            }
            /* FILTERS */
            let mainFilter = module.find('#mainFilter');
            //Dates
            let inputDateStart = $(mainFilter).find('flx-text[type="date"]#DateStart');
            let inputDateEnd = $(mainFilter).find('flx-text[type="date"]#DateEnd');
            let multicombos = $(mainFilter).find('flx-multicombo');
            let dateStart = '';
            let dateEnd = '';
            if (inputDateStart.val()) {
                dateStart = moment(inputDateStart.val()).format("YYYYMMDD");
            }
            if (inputDateEnd.val()) {
                dateEnd = moment(inputDateEnd.val()).format("YYYYMMDD");
            }
            if (dateStart != "" && dateEnd != "") {
                dateswhere = `(dateStart BETWEEN CONVERT(SMALLDATETIME,'${dateStart}',112) AND CONVERT(SMALLDATETIME,'${dateEnd}',112))`;
            }
            else if (dateStart != "") {
                dateswhere = `(dateStart >= CONVERT(SMALLDATETIME,'${dateStart}',112))`;
            }
            else if (dateEnd != "") {
                dateswhere = `(dateStart <= CONVERT(SMALLDATETIME,'${dateEnd}',112))`;
            }
            //Combos
            let filters = [];
            multicombos.each((index, element) => {
                if ($(element).val().length > 0) {
                    let filter = `${$(element).attr('tablealias')}.${$(element).attr('sqlvaluefield')} in (${$(element).val().split('|').join(',')})`;
                    filters.push(filter);
                }
            });
            if (filters.length > 0) {
                comboswhere = filters.join(' AND ');
                comboswhere = `(${comboswhere})`;
            }
            let wheres = [];
            if (comboswhere) {
                wheres.push(comboswhere);
            }
            if (optionswhere) {
                wheres.push(optionswhere);
            }
            if (dateswhere) {
                wheres.push(dateswhere);
            }
            objectwhere = wheres.join(' AND ');
            /*NAV TO REPORT PAGES*/
            let pagename;
            if (groupOptions) {
                switch (groupOptions) {
                    case 'employees':
                        pagename = 'hr_HistoricsLists_EmployeeDataGroup';
                        break;
                    case 'absences':
                        pagename = 'hr_HistoricsLists_AbsencesGroup';
                        break;
                    case 'contracts':
                        pagename = 'hr_HistoricsLists_ContractGroup';
                        break;
                    case 'standby':
                        pagename = 'hr_HistoricsLists_StanbyGroup';
                        break;
                    case 'ordercalling':
                        pagename = 'hr_HistoricsLists_PositionRankingGroup';
                        break;
                }
                flexygo.nav.openPageName(pagename, 'emp_employees', objectwhere, null, 'sliderightx90p', false, $(elem));
            }
            return true;
        }
        historiclist.getListOptions = getListOptions;
    })(historiclist = sebastian.historiclist || (sebastian.historiclist = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=HistoricsList.js.map