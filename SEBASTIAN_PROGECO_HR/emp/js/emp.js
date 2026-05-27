//# sourceMappingURL=emp.js.map
// Vote animation. Disabled.
function empVote() {
    $('.emp-new-vote').hover(function () {
        $(this).find('.shutter').stop(true, true).animate({
            bottom: '-36px'
        }, {
            duration: 300,
            easing: 'easeOutBounce'
        });
    }, function () {
        $(this).find('.shutter').stop(true, true).animate({
            bottom: 0
        }, {
            duration: 300,
            easing: 'easeOutBounce'
        });
    });
}
// Several areas. It stops bubble propagation when clicking on element.
function stopClickPropagation(element) {
    let count = 0;
    let a = setInterval(function () {
        if ($(element).length && count < 20) {
            clearInterval(a);
            $(element).click(function (event) {
                event.stopPropagation();
            });
        }
        else {
            count++;
        }
        ;
    }, 500);
    // Used elements 'a.PC_link'   '.PC_DownloadLinks'
}
// Holidays area. Html structure is modified. JS process in flexygo
function setCalendarHtml() {
    $(".jqyc-month").wrap("<div class='month-container'></div>");
    $(".jqyc-year-chooser .jqyc-next-year").click(function () {
        setCalendarHtml();
    });
    $(".jqyc-year-chooser .jqyc-prev-year").click(function () {
        setCalendarHtml();
    });
}
// Employees area. Change objectmenu icon
function changeIcon() {
    $("[data-type='objectmenu'] > i").removeClass().addClass("flx-icon icon-more icon-rotate-90");
    $("[data-type='objectmenu'] > span.caret").remove();
}
// Employee personal area. Get daily presences
function showDailyPresences(employeeId, year, month) {
    let template = `<div class="padding-s">
                      <div class="row nopadding emp-flex-align" style="height:42px">
                        <div class="col-2 nopadding emp-flex-align bg-primary opacity-70" style="height:42px"><span class="text-center">${flexygo.localization.translate('presences.day')}</span><br/></div>
                        <div class="col-2 nopadding emp-flex-align bg-outstanding opacity-70" style="height:42px"><span class="text-center">${flexygo.localization.translate('presences.workingHours')}</span><br/></div>
                        <div class="col-2 nopadding emp-flex-align bg-outstanding" style="height:42px"><span class="text-center">${flexygo.localization.translate('presences.absenceHours')}</span><br/></div>
                        <div class="col-2 nopadding emp-flex-align bg-outstanding opacity-70" style="height:42px"><span class="text-center">${flexygo.localization.translate('presences.workedHours')}</span><br/></div>
                        <div class="col-2 nopadding emp-flex-align bg-outstanding" style="height:42px"><span class="text-center">${flexygo.localization.translate('presences.difference')}</span><br/></div>
                      </div>`;
    let proc = new flexygo.Process('pPers_Sebastian_ShowDailyPresences', null, null);
    let params = new Array();
    let color = "";
    params.push({ "Key": 'EmployeeId', "Value": employeeId });
    params.push({ "Key": 'CurrentUser', "Value": flexygo.context['currentReference'] });
    params.push({ "Key": 'RoleId', "Value": flexygo.context['currentRoleId'] });
    params.push({ "Key": 'Year', "Value": year });
    params.push({ "Key": 'Month', "Value": month });
    proc.run(params, (ret) => {
        if (ret && ret.Data && ret.Data.Presences && ret.Data.Presences.length > 0) {
            let histObj = new flexygo.nav.FlexygoHistory;
            histObj.targetid = "modal600x600";
            let pageContainer = flexygo.targets.createContainer(histObj, true, null, true);
            pageContainer.empty();
            for (let i = 0; i < ret.Data.Presences.length; i++) {
                if (ret.Data.Presences[i].Festivo == 1) {
                    template = template + flexygo.utils.parser.recursiveCompile(ret.Data.Presences[i], `<div class="row size-s emp-flex-align">
                                                                                                          <div class="col-2 nopadding text-center">{{Dia|date:L}}<br/></div>
                                                                                                          <div class="col-8 nopadding text-center emp-bg-darkgrey text-uppercase">${flexygo.localization.translate('presences.nonBusinessDay')}<br/></div>
                                                                                                        </div>`);
                }
                else if (ret.Data.Presences[i].Vacaciones == 1) {
                    template = template + flexygo.utils.parser.recursiveCompile(ret.Data.Presences[i], `<div class="row size-s emp-flex-align">
                                                                                                          <div class="col-2 nopadding text-center">{{Dia|date:L}}<br/></div>
                                                                                                          <div class="col-8 nopadding text-center emp-bg-lightgreen text-uppercase">${flexygo.localization.translate('presences.holidays')}<br/></div>
                                                                                                        </div>`);
                }
                else {
                    color = (ret.Data.Presences[i].Diferencia > 0) ? "bg-outstanding" : "bg-danger";
                    template = template + flexygo.utils.parser.recursiveCompile(ret.Data.Presences[i], `<div class="row size-s emp-flex-align">
                                                                                                          <div class="col-2 nopadding text-center">{{Dia|date:L}}<br/></div>
                                                                                                          <div class="col-2 nopadding text-center bg-outstanding opacity-70">{{HorasJornada|decimal:2}}<br/></div>
                                                                                                          <div class="col-2 nopadding text-center bg-outstanding ">{{Horas_Ausencia|decimal:2}}<br/></div>
                                                                                                          <div class="col-2 nopadding text-center bg-outstanding opacity-70">{{Horas_Fichadas|decimal:2}}<br/></div>
                                                                                                          <div class="col-2 nopadding text-center ${color}">{{Diferencia|decimal:2}}<br/></div>
                                                                                                        </div>`);
                }
            }
            pageContainer.append(template + "</div>");
        }
    });
}
// It Changes icon direction and saves if acordion is collapsed or not
function showEquipment(elem, TypeId) {
    elem.find("i:first-child").toggleClass("icon-rotate-90");
    let isCollapsed = elem.hasClass("collapsed");
    let collapsed = JSON.parse(localStorage.getItem("emp-equipments-collapsed"));
    let i;
    if (collapsed) {
        i = collapsed[0].indexOf(TypeId);
        i != -1 ? collapsed[1][i] = isCollapsed : (collapsed[0].push(TypeId), collapsed[1].push(isCollapsed));
        localStorage.setItem("emp-equipments-collapsed", JSON.stringify(collapsed));
    }
    else {
        localStorage.setItem("emp-equipments-collapsed", JSON.stringify([[TypeId], [isCollapsed]]));
    }
}
// It shows not collapsed acordions
function showCollapsedEquipmentTypes() {
    let collapsed = JSON.parse(localStorage.getItem("emp-equipments-collapsed"));
    if (collapsed) {
        collapsed[0].forEach((element, index) => {
            if (collapsed[1][index]) {
                $("#collapse" + element).collapse('show');
                $("#collapse" + element).prev(".panel-heading").find("i:first-child").toggleClass("icon-rotate-90");
            }
        });
    }
}
//# sourceMappingURL=emp.js.map
// Flip effect
function flipCards() {
    $(".emp-flip .front").click(function () {
        var height = $(this).outerHeight() + 8;
        var margin = $(this).parents(".emp-request-card").css("margin-bottom");
        if (margin == "8px") {
            $(this).closest(".emp-card").toggleClass("flipped").parents(".emp-request-card").css({ marginBottom: height });
            $(this).css("border", "1px solid #cfd7df");
        }
        else {
            $(this).closest(".emp-card").toggleClass("flipped").parents(".emp-request-card").css({ marginBottom: 8 });
        }
    });
    $(".emp-flip .close").click(function () {
        $(this).closest(".emp-card").toggleClass("flipped").parents(".emp-request-card").css({ marginBottom: 8 });
        $(this).closest(".emp-card").find(".front").css("border", "unset");
    });
}
// Initializes the HHRR calendar
function schedulerInit(elem) {
    elem[0].me.filter = "-1";
    elem[0].init();
    //$("#mod-emp_Scheduler_Validation")[0].me.filter = "-1";
    //$("#mod-emp_Scheduler_Validation")[0].init();
    var observer = new MutationObserver(function (mutations) {
        if (document.contains($("flx-multicombo .combo")[0])) {
            $("flx-module[modulename='emp_Filter_Warning']").removeClass("hidden").addClass("animated bounceIn");
            $("flx-multicombo .combo").one("click", function () { $("flx-module[modulename='emp_Filter_Warning']").removeClass("bounceIn").addClass("bounceOut"); });
            //$("flx-multicombo .combo").on("change", function () {
            //    if (elem[0].me.filter && elem[0].me.filter.indexOf(",") == -1) {
            //        $("flx-navbutton[processname='pEmp_Choose_holidays']").attr("defaults", "{'Id':'" + elem[0].me.filter + "' }");
            //    } else {
            //        $("flx-navbutton[processname='pEmp_Choose_holidays']").attr("defaults", "{'Id':'{{EmployeeId}}' }");
            //    }
            //});
            observer.disconnect();
        }
    });
    observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
}
function colourFestives(elem) {
    let defaults = sebastian.utils.parseDefaults($(elem).closest('main'));
    let EmployeeId = defaults.EmployeeId;
    let proc = new flexygo.Process('HR_GetBankHolidaysEmployee', null, null);
    let params = new Array();
    params.push({ "Key": 'EmployeeId', "Value": EmployeeId });
    proc.run(params, (ret) => {
        if (ret) {
            let bh = ret.Data.BankHolidays;
            bh.forEach((elem) => {
                let date = elem.Date;
                let calendarDay = $(`td.jqyc-not-empty-td.jqyc-td[data-day-of-month="${elem.day}"][data-month="${elem.month}"][data-year="${elem.year}"]`);
                $(calendarDay).css("color", "#f97b4e");
                $(calendarDay).css("font-weight", "700");
            });
        }
        colourWeekends();
    });
}
function colourWeekends() {
    let date, day;
    setTimeout(function () {
        $(".jqyc-month td.jqyc-not-empty-td").each(function () {
            date = $(this).attr("currentdate");
            day = moment(date).isoWeekday();
            if (date && (day === 6 || day === 7)) {
                $(this).css("color", "#f97b4e");
                //$(this).css("color", "#000000");
                $(this).css("font-weight", "700");
            }
        });
    }, 2000);
}
//Initializes Google Places Autocomplete Address (emp_employeePersonalData_edit)
function initGooglePlaces() {
    if (flexygo.context.GoolgeAPIKey != '0' && !flexygo.utils.isBlank(flexygo.context.GoolgeAPIKey)) {
        flexygo.utils.googlePlaces.autocomplete.init('Address_Google', {}, {
            componentRestrictions: {
                country: ["es"]
            }
        }, function (ret) {
            applyFormData(ret);
        });
    }
    else {
        $('flx-text[property="Address_Google"]').closest('div.grid-stack-item').remove();
    }
}
function applyFormData(ret) {
    let form = $('flx-module form');
    if (form.find('flx-text[property=PostalCode]').length > 0) {
        if (flexygo.utils.isBlank(ret.postal_code)) {
            form.find('flx-text[property=PostalCode]').val('');
        }
        else {
            form.find('flx-text[property=PostalCode]').val(ret.postal_code);
        }
    }
    if (form.find('flx-text[property=Province-State]').length > 0) {
        if (flexygo.utils.isBlank(ret.administrative_area_level_2)) {
            form.find('flx-text[property=Province-State]').val('');
        }
        else {
            form.find('flx-text[property=Province-State]').val(ret.administrative_area_level_2);
        }
    }
    else if (form.find('flx-text[property=ProvinceState]').length > 0) {
        if (flexygo.utils.isBlank(ret.administrative_area_level_2)) {
            form.find('flx-text[property=ProvinceState]').val('');
        }
        else {
            form.find('flx-text[property=ProvinceState]').val(ret.administrative_area_level_2);
        }
    }
    if (form.find('flx-text[property=City]').length > 0) {
        form.find('flx-text[property=City]').val(ret.locality);
    }
    if (!flexygo.utils.isBlank(ret.route) && !flexygo.utils.isBlank(ret.street_number)) {
        let address = ret.route + ', ' + ret.street_number;
        form.find('flx-text[property=Address]').val(address);
    }
    else {
        form.find('flx-text[property=Address]').val(ret.route);
    }
    if (form.find('flx-dbcombo[property=Country]').length > 0) {
        form.find('flx-dbcombo[property=Country]').val(ret.country_short);
    }
    if (form.find('flx-text[property=Latitude]').length > 0) {
        form.find('flx-text[property=Latitude]').val(ret.lat);
    }
    if (form.find('flx-text[property=Longitude]').length > 0) {
        form.find('flx-text[property=Longitude]').val(ret.lng);
    }
}
//Initializes Google Places Autocomplete Address (Generic_Edit_LocationsHR)
function initGoogleAutocomplete() {
    if (flexygo.context.GoolgeAPIKey != '0' && !flexygo.utils.isBlank(flexygo.context.GoolgeAPIKey)) {
        flexygo.utils.googlePlaces.autocomplete.init('Address', {}, {
            componentRestrictions: {
                country: ["es"]
            }
        }, function (ret2) {
            applyFormData2(ret2);
        });
    }
}
function applyFormData2(ret2) {
    let form = $('flx-module[modulename="Generic_Edit_LocationsHR"] form');
    if (!flexygo.utils.isBlank(ret2.route) && !flexygo.utils.isBlank(ret2.street_number)) {
        let address = ret2.route + ', ' + ret2.street_number + ', ' + ret2.postal_code + ' ' + ret2.locality + ' ' + ret2.country_short;
        form.find('flx-text[property=Address]').val(address);
    }
    else {
        let address = ret2.route + ', ' + ret2.postal_code + ' ' + ret2.locality + ' ' + ret2.country_short;
        form.find('flx-text[property=Address]').val(address);
    }
    if (form.find('flx-text[property=Latitude]').length > 0) {
        form.find('flx-text[property=Latitude]').val(ret2.lat);
    }
    if (form.find('flx-text[property=Longuitude]').length > 0) {
        form.find('flx-text[property=Longuitude]').val(ret2.lng);
    }
    if (form.find('flx-text[property=Location]').length > 0) {
        let location = ret2.lat + ', ' + ret2.lng;
        form.find('flx-text[property=Location]').val(location);
    }
}
//Format bank account IBAN
function formatIBAN(iban) {
    iban = iban.replace(/\s/g, '').toUpperCase();
    let formatIban = '';
    let index = 0;
    for (let i = 0; i < iban.length; i++) {
        if (index == 4 || index == 9 || index == 14 || index == 17) {
            formatIban += " ";
        }
        formatIban += iban[i];
        index = formatIban.length;
    }
    return formatIban;
}
//init Organizational Unit View Module
function initOrganizationalUnitModules(module, unitId, controlMode, unitName) {
    $(module).closest('main').find('[modulename="emp_org_unit_employees_of_Groups"]').hide();
    $(module).closest('main').find('[modulename="emp_OrgUnit_Employees"]').hide();
    //$(module).closest('main').find('div.RightPosition').addClass('bg-white');
    //$(module).closest('main').find('div.RightPosition').addClass('border-grey-round');
    $(module).closest('main').find('div.RightPosition').addClass('unit-view-placeholder');
    $('main').animate({ scrollTop: 0 }, 200);
    let orgUnitView = $(module).closest('main').find('[modulename="emp_orgUnitMainView"] flx-view')[0];
    let unitmodule = $(orgUnitView).closest('flx-module')[0];
    if (unitmodule.objectdefaults == null || unitmodule.objectdefaults == undefined) {
        unitmodule.objectdefaults = { UnitId: unitId };
    }
    else {
        unitmodule.objectdefaults.UnitId = unitId;
    }
    $(orgUnitView).attr('ObjectWhere', 'Organizational_Units.UnitId=' + unitId);
    orgUnitView.init();
    //Lista Grupos
    let groupList = $(module).closest('main').find('[modulename="emp_orgUnitActiveGroups"] flx-list')[0];
    if (groupList) {
        $(groupList).attr('objectwhere', 'Organizational_Units.UnitId=' + unitId);
        groupList.init();
        ////Añadimos la unit a los defaults del modulo
        let moduleGroups = $(groupList).closest('flx-module')[0];
        if (moduleGroups.objectdefaults == null || moduleGroups.objectdefaults == undefined) {
            moduleGroups.objectdefaults = { UnitId: unitId };
        }
        else {
            moduleGroups.objectdefaults.UnitId = unitId;
        }
    }
    if (controlMode != 'NOT') {
        //Lista turnos
        let shiftList = $(module).closest('main').find('[modulename="emp_orgUnit_Shifts"] flx-list')[0];
        if (shiftList) {
            //let shiftListModule = (<flexygo.ui.wc.FlxModuleElement>$(module).closest('main').find('[modulename="emp_orgUnitView-ActiveShifts"]')[0]);
            let shiftListModule = shiftList.closest('flx-module');
            $(shiftList).attr('objectwhere', '(Shifts.UnitId=' + unitId + ')');
            shiftListModule.objectdefaults = { 'UnitId': unitId };
            shiftList.init();
            $(module).closest('main').find('[modulename="emp_orgUnitView-ActiveShifts"]').show();
        }
    }
    else {
        $(module).closest('main').find('[modulename="emp_orgUnitView-ActiveShifts"]').hide();
    }
    if (controlMode != 'PER') {
        $(module).closest('main').find('[modulename="emp_UnitShiftPeriod_EditList"]').hide();
    }
    else {
        //Lista Periodos de unidades
        let periodsList = $(module).closest('main').find('[modulename="emp_UnitShiftPeriod_EditList"] flx-list')[0];
        if (periodsList) {
            $(periodsList).attr('objectwhere', 'Units_Shifts_Periods.UnitId=' + unitId);
            ////Añadir defaults a modulo de periodos
            let periodsmodule = $(periodsList).closest('flx-module')[0];
            if (periodsmodule.objectdefaults == null || periodsmodule.objectdefaults == undefined) {
                periodsmodule.objectdefaults = { UnitId: unitId };
            }
            else {
                periodsmodule.objectdefaults.UnitId = unitId;
            }
            periodsList.init();
        }
        $(module).closest('main').find('[modulename="emp_UnitShiftPeriod_EditList"]').show();
    }
    if (unitName) {
        $('flx-module[modulename="emp_orgUnitMainView"] span.cntTitle').html(unitName);
    }
    let localStorageInfo = { 'UnitId': unitId, 'ControlMode': controlMode };
    localStorage.setItem('emp-Unit', JSON.stringify(localStorageInfo));
    if (controlMode != 'PLAN') {
        $('.gotoplanner-btn').remove();
    }
    flexygo.selection.clear('emp_Employee');
    //flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_Employee', null, flexygo.utils.getModule(module), $(module))
}
function OrgUnitListIsFiltered(elem) {
    let list = $(elem).closest('flx-module').find('flx-list[modulename="emp_organizational_unit_list"]')[0];
    if (!flexygo.utils.isBlank($(elem).find('flx-list')[0]["filterValues"])) {
        $(list).find('.nodes').removeClass('hidden');
        $(list).find('.hasChildren').removeClass('triggerDrawChildUnit').addClass('visibility-off');
    }
    else {
        $(list).find('.nodes.isChild').addClass('hidden');
        $(list).find('.hasChildren').addClass('triggerDrawChildUnit').removeClass('visibility-off');
    }
}
function drawChildUnitsList(elem, parentUnitId, ChildUnits) {
    let cont = $(`#UnitId${parentUnitId}`);
    if (cont.hasClass('collapse')) {
        cont.removeClass('collapse');
        if (!flexygo.utils.isBlank(ChildUnits)) {
            let items = "";
            const unitIds = JSON.parse(ChildUnits);
            unitIds.forEach(unitid => {
                items += flexygo.environment.getTemplate('emp_Organizational_Unit', `[Organizational_Units].[UnitId] = ${unitid}`, 'emp_organizational_unit_list_child');
            });
            cont.find('.childNodes').html(items);
            $(elem).find('i').css({
                'transform': 'rotate(180deg)',
                '-ms-transform': 'rotate(180deg)',
                '-webkit-transform': 'rotate(180deg)' /* Safari and Chrome */
            });
        }
    }
    else {
        cont.addClass('collapse');
        $(elem).find('i').css({
            'transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)' /* Safari and Chrome */
        });
    }
}
function setLastUnit(e) {
    let lastUnit = '', lastUnitControlMode = '', OrgUnit;
    if ($(e).closest('main').find('div.module-placeholder.unit-view-placeholder').length == 0) {
        if (localStorage.getItem('emp-Unit')) {
            let localStorageInfo = JSON.parse(localStorage.getItem("emp-Unit"));
            lastUnit = localStorageInfo["UnitId"];
            //lastUnitControlMode = localStorageInfo["ControlMode"];
            let OrgUnit = new flexygo.obj.Entity('emp_Organizational_Unit', `UnitId=${lastUnit}`);
            OrgUnit.read();
            lastUnitControlMode = OrgUnit.data['ControlPresenceModeId'].Value;
        }
        if (!flexygo.utils.isBlank(lastUnit)) {
            initOrganizationalUnitModules($(e), lastUnit, lastUnitControlMode, null);
            //console.log('Dentro:caution');
        }
    }
}
//init Organizational Unit Group Employee List 
function initOrganizationalUnitGroupEmployees(module, objWhere, e) {
    $(module).closest('main').find('[modulename="emp_OrgUnit_Employees"]').hide();
    $(module).closest('main').find('[modulename="emp_org_unit_employees_of_Groups"]').show();
    let employeeList = $(module).closest('main').find('[modulename="emp_org_unit_employees_of_Groups"] flx-list')[0];
    $(employeeList).attr('objectwhere', 'Employees.[Group]=' + objWhere);
    employeeList.init();
    $(e).closest(".row").siblings(".clickable").removeClass("hideAllAction").addClass("showAllAction");
}
//init Organizational Unit all Employee List 
function initOrganizationalUnitAllEmployees(module, objWhere, e) {
    if ($(e).hasClass("showAllAction")) {
        $(module).closest('main').find('[modulename="emp_org_unit_employees_of_Groups"]').hide();
        $(module).closest('main').find('[modulename="emp_OrgUnit_Employees"]').show();
        let employeeList = $(module).closest('main').find('[modulename="emp_OrgUnit_Employees"] flx-list')[0];
        $(employeeList).attr('objectwhere', 'OUE.UnitId=' + objWhere);
        employeeList.init();
    }
    else {
        $(module).closest('main').find('[modulename="emp_org_unit_employees_of_Groups"]').hide();
        $(module).closest('main').find('[modulename="emp_OrgUnit_Employees"]').hide();
    }
    $(e).toggleClass('showAllAction').toggleClass('hideAllAction');
}
let control;
function paintCustomEditList(propInfo, selector, newBtn) {
    let template;
    template = $('<table class="table"><thead><tr></tr></thead><tbody></tbody><tfoot></tfoot></table>');
    propInfo.forEach(function (valor, indice, array) {
        $(template).find("thead tr").append(`<th>${valor.label}</th>`);
    });
    if (newBtn) {
        $(template).find("thead tr").append(`<th><button class="btn btn-default" onclick="cloneEditListRow($(this));"><i class="fa fa-plus"></i></button></th></tr>`);
    }
    $(template).find("tfoot").append(paintCustomEditListRow(propInfo, newBtn));
    $(selector).html($(template)[0].outerHTML);
}
function paintCustomEditListRow(propInfo, newBtn) {
    let temp;
    temp = $('<tr></tr>');
    propInfo.forEach(function (valor, indice, array) {
        if (valor.control == 'flx-text') {
            control = `<flx-text class="${valor.class}" type="${valor.type}" property="${valor.property}" placeholder="${valor.label}" ${valor.required} value="${valor.default}"></flx-text>`;
        }
        else if (valor.control == 'flx-dbcombo') {
            control = `<flx-dbcombo class="${valor.class}" property="${valor.property}" pagesize="60" onchange="" objectname="${valor.objectName}" additionalwhere="" class="customInput"
                    viewname="${valor.viewName}" placeholder="${valor.label}" sqlvaluefield="${valor.valueField}" sqldisplayfield="${valor.displayField}" filtertype="dbcombo" ${valor.required}></flx-dbcombo>`;
        }
        $(temp).append(`<td><div>${control}</div></td>`);
    });
    if (newBtn) {
        $(temp).append(`<th><button class="btn btn-default" onclick="removeEditListRow($(this))"><i class="flx-icon icon-bin"></i></button></th></tr>`);
    }
    return $(temp)[0].outerHTML;
}
function cloneEditListRow(e) {
    let row = $(e).closest('table').find('tfoot tr').first().clone();
    $(e).closest('table').find('tfoot').append(row);
}
function removeEditListRow(e) {
    let row = $(e).closest('tr');
    if ($(e).closest('tfoot').find('tr').length > 1) {
        $(row).remove();
    }
}
function selectShiftToClone(e) {
    $(e).toggleClass("shiftNoSelected").toggleClass("shiftSelected");
    let nItems = e.closest('[modulename="emp_Shifts_List_Clone"]').find(".shiftSelected").length;
    $(e).closest(".flx-dialog-modal.flx-slide").find("#counter").html(nItems);
    $(e).closest(".flx-dialog-modal.flx-slide").find("button").removeClass("fadeIn", "animated");
    $(e).closest(".flx-dialog-modal.flx-slide").find("button")[0].classList.add("animated", "fadeIn");
}
function cloneShifts(UnitId, e) {
    let elm = $(e).closest(".flx-dialog-modal.flx-slide").find('[modulename="emp_Shifts_List_Clone"]');
    let selectedItems = elm.find(".shiftSelected");
    let ShiftsList = [];
    if (selectedItems.length > 0) {
        selectedItems.each(function (index) {
            ShiftsList.push({ 'ShiftId': $(this).attr('ShiftId') });
        });
        let params = [
            { Key: 'UnitId', Value: UnitId },
            { Key: 'CurrentUser', Value: flexygo.context.currentReference },
            { Key: 'Shifts', Value: JSON.stringify(ShiftsList) }
        ];
        flexygo.nav.execProcess('pCloneShifts', null, null, null, params, 'modal640x480', false, $(this), false, false);
    }
    else {
        flexygo.msg.warning(flexygo.localization.translate('emp.noItemsSelected'));
    }
}
function setButtonClone(e) {
    if ($(".btn-Shifts-Clone").length == 0) {
        let modal = $(e).closest(".flx-dialog-modal.flx-slide");
        let UnitId = $('[modulename="emp_orgUnitMainView"] flx-view')[0].data.UnitId.Value;
        let btn = $(`<button class="btn emp_buttonNotify btn-Shifts-Clone" onclick="cloneShifts('${UnitId}', $(this))">Clone<span id="counter">0</span></button>`);
        modal.prepend(btn);
    }
}
function setDateTitleDayliDB(element) {
    //let objwhere = element.objectwhere;
    //let date: string = (objwhere.split('=')[1]).replace(/\\/, '');
    let pageName = $(element).closest('main').attr('pagename');
    let defaults = sebastian.utils.parseDefaults(element);
    let daydate = defaults.DayDate;
    let html;
    let objectwherePrev = '';
    let objectwhereNext = '';
    objectwherePrev = `DateJourney=\\' ${moment(daydate).subtract(1, "days").format('YYYY-MM-DD')} \\'`;
    objectwhereNext = `DateJourney=\\' ${moment(daydate).add(1, "days").format('YYYY-MM-DD')} \\'`;
    //let prevArrow = `<i class="flx-icon icon-previous-1 size-l icon-margin-right clickable" onclick="flexygo.nav.openPageName('${pageName}', '', '${objectwherePrev}', '{\\'DayDate\\':\\' ${moment(daydate).subtract(1, "days").format('YYYY-MM-DD')}\\'}', 'current', false, $(this));"></i>`;
    //let nextArrow = `<i class="flx-icon icon-next-1 size-l icon-margin-left clickable" onclick="flexygo.nav.openPageName('${pageName}', '', '${objectwhereNext}', '{\\'DayDate\\':\\' ${moment(daydate).add(1, "days").format('YYYY-MM-DD')}\\'}', 'current', false, $(this));"></i>`;
    let prevArrow = `<i class="flx-icon icon-previous-1 size-s clickable" onclick="sebastian.workdays.manageMarkingMoveToDay('${moment(daydate).subtract(1, "days").format('YYYY-MM-DD')}')"></i>`;
    let nextArrow = `<i class="flx-icon icon-next-1 size-s clickable" onclick="sebastian.workdays.manageMarkingMoveToDay('${moment(daydate).add(1, "days").format('YYYY-MM-DD')}')"></i>`;
    /*let title = `<span style="padding: 0px 20px;">${moment(daydate).format('dddd, LL')}</span>`;*/
    let title = `
        <span style="padding: 0px 10px;" class="clickable bold">
            <flx-tooltip mode="popover" container="body">
                <flx-schedulerview objectname="" initialDate="${moment(daydate).format('YYYYMMDD')}" id="mod-emp_GeneralDB_JourneysCalendar" modulename="emp_GeneralDB_JourneysCalendar"></flx-schedulerview>
            </flx-tooltip>
            ${sebastian.utils.formatDate(daydate, 'dddd, LL', flexygo.context.currentUserCultureId)}
        </span>`;
    html = `<div class="hr-date-selector">${prevArrow}${title}${nextArrow}</div>`;
    $(element).find('flx-html div#titleDateD').html(html);
}
function setFillEmployeesCandidatePositions(el) {
    let me = $(el);
    let aWhere = me.attr("objectwhere").split('OR')[1].split('-')[1].trim();
    return aWhere.substring(0, aWhere.length - 1);
}
function goToOrgUnitList(elem, unitId, controlMode) {
    let module = '[modulename="emp_organizational_unit_list"]';
    flexygo.nav.openPage('list', 'emp_Organizational_Units', '', '', 'current', false);
    setTimeout(() => {
        initOrganizationalUnitModules(module, unitId, controlMode, null);
    }, 500);
}
function assignScopeShift(element) {
    let checkedEmployees = flexygo.selection.getArray('emp_vHR_Employee');
    let employeesIds = checkedEmployees.join(',');
    if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectAtLeastOneEmployee'));
    }
    else {
        //let defaults = { 'EmployeesIds': employeesIds.toString() };
        flexygo.nav.openProcessParams('pEmp_Assign_ScopeShift', null, null, `{'EmployeeIds':'${employeesIds}'}`, 'sliderightx800', false, $(element));
        flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_vHR_Employee', null, flexygo.utils.getModule(element), $(element));
    }
}
function enableShift(shiftId) {
    let shift = new flexygo.obj.Entity('emp_Shift', 'Shifts.ShiftId = ' + shiftId);
    if (shift.read()) {
        if (shift.data['Disabled'].Value === true) {
            shift.data['Disabled'].Value = false;
            shift.update();
        }
    }
}
function enableGroup(groupId) {
    let group = new flexygo.obj.Entity('emp_Group', 'Groups.GroupId= ' + groupId);
    if (group.read()) {
        if (group.data['Disabled'].Value === true) {
            group.data['Disabled'].Value = false;
            group.update();
        }
    }
}
function checkCurrentJourney(currentJourneyId, rowJourneyId) {
    return currentJourneyId === rowJourneyId ? 'txt-info' : '';
}
//Init Appeal Employees List
function initAppealEmployeesList(element, positionId, appealId) {
    let list = $(element).closest('main').find('[modulename="emp_AppealsEmployees_List"] flx-list')[0];
    let jqueryButtons = $(element).closest('div.buttons-cont').find('button.init-btn');
    jqueryButtons.each((index, elem) => {
        $(elem).removeClass('active');
    });
    $(element).addClass('active');
    $(list).attr('objectwhere', 'Appeals_Employees.AppealId = ' + appealId + ' AND Appeals_Employees.PositionId = ' + positionId);
    list.init();
}
function replaceUnitIds(element) {
    let defaults = sebastian.utils.parseDefaults($(element));
    if (defaults.UnitId != undefined) {
        let where = ` additionalWhere="Shifts.UnitId=${defaults.UnitId}"`;
        let groupWhere = ` additionalWhere="Groups.UnitId=${defaults.UnitId}"`;
        let replaces = [
            { '{{UnitId}}': where },
            { '{{GroupsUnitId}}': groupWhere },
        ];
        sebastian.utils.replaceValues(element, replaces);
    }
}
//Init HR Holidays and Absences calendar
function initHRCalendar(element) {
    let me = $(element);
    let calendarComponent = me.closest('#realMain').find('flx-scheduleryear#mod-emp_Scheduler_Validation')[0];
    sebastian.utils.filterModule(me, 'emp_Scheduler_Validation', true, 'flx-scheduleryear');
    colourWeekends();
}
//filter HR Holidays and Absences calendar after inserting a calendar event
function filterCalendarByEmployee(employeeId, employeeName) {
    let pagename = flexygo.history.get($('main')).pagename;
    if (pagename == "emp_RRHHProfile_initPage") {
        let multicombo = $('flx-multicombo[name="filter-employees"]')[0];
        multicombo.setValue(employeeId, employeeName);
        initHRCalendar(multicombo);
    }
}
function initEmployeeSchedulePlanner() {
    let scheduler = $('flx-scheduler#mod-Employee_Calendar_Planning')[0];
    let employeeId = scheduler.objectWhere.split('=')[1].trim().replace(')', '');
    scheduler.additionalWhere = ' and vEmployeeMonthPlanner.EmployeeId = ' + employeeId + ' ';
    if ($(scheduler).attr('manualInit')) {
        scheduler.init();
    }
}
function filterEmployeeViewPage(element) {
    let mainFilter = element.closest('#mainFilter');
    let combo = $(mainFilter).find('flx-dbcombo');
    let employeeId = $(combo).attr('value');
    let objectWhere = 'Employees.EmployeeId = ' + employeeId;
    flexygo.nav.openPage('view', 'Emp_Employee', objectWhere, `{'EmployeeId': ${employeeId}}`, 'current', false, $(element));
}
function initEmployeesIncidentsJourney(element) {
    let defaults = sebastian.utils.parseDefaults(element);
    let list = $(element).closest('#realMain').find('flx-list#mod-emp_Daily_EmployeesWithMarkingIncidents')[0];
    $(list).attr('objectWhere', `CONVERT(Date, Markings.CheckTime) = cast(REPLACE ('${defaults.DayDate}' , '-' , '' ) as date) and Markings.MarkingIncidentTypeId='2'`);
    list.init();
}
function getEmployeeId(element) {
    return $(element).closest('flx-list').attr('objectwhere').split('=')[1].trim().replace(/[()]/g, '');
}
function hideNewHolidayBtnCalendar(element) {
    let currentRole = flexygo.context.currentRoleId;
    if (currentRole === 'hresources' || currentRole === 'hresourcesLow' || currentRole === 'admins') {
        $(element).find('#btn-users').hide();
        $(element).find('#btn-change-status').show();
        $(element).find('#btn-hresources').show();
        $(element).find('#btn-change-comments').show();
    }
    else {
        $(element).find('#btn-users').show();
        $(element).find('#btn-change-status').hide();
        $(element).find('#btn-hresources').hide;
        $(element).find('#btn-change-comments').hide();
    }
}
//BALANCE FILTERS
function filterBalanceModules(elem) {
    sebastian.utils.filterModule(elem, 'emp_Balance_EmployeesList', true);
    sebastian.utils.filterModule(elem, 'emp_BalancesTotals_Head', true);
}
/*pattern*/
function generateColors() {
    let r = (Math.round(Math.random() * 127) + 127).toString(16);
    let g = (Math.round(Math.random() * 127) + 127).toString(16);
    let b = (Math.round(Math.random() * 127) + 127).toString(16);
    return '#' + r + g + b;
}
function updatePatternShift(elem, patternId, patternShift) {
    let combo = $('[name="PatternShift-' + patternShift + '"]');
    let shiftId = $(combo).attr('value');
    if (shiftId) {
        $(combo).closest('div.fixdbcombo').css('border', 'inherit');
        let patternShiftEntity = new flexygo.obj.Entity("emp_Patterns_Shift", '(Patterns_Shifts.PatternId = ' + patternId + ' AND Patterns_Shifts.PatternShift = ' + patternShift + ')');
        let sequencesList = $('flx-list#mod-emp_PatternsShift_Sequences')[0];
        patternShiftEntity.read();
        patternShiftEntity.data['ShiftId'].Value = shiftId;
        if (!patternShiftEntity.update()) {
            flexygo.msg.warning(flexygo.localization.translate('emp.errorUpdatingShift'));
        }
        else {
            sequencesList.refresh();
        }
    }
    else {
        $(combo).closest('div.fixdbcombo').css('border', '2px solid #fb8f69');
        $(combo).closest('div.fixdbcombo').css('border-radius', '5px');
    }
}
function setShiftComboValue(elem, patternId, patternShift) {
    let patternShiftEntity = new flexygo.obj.Entity("emp_Patterns_Shift", '(Patterns_Shifts.PatternId = ' + patternId + ' AND Patterns_Shifts.PatternShift = ' + patternShift + ')');
    patternShiftEntity.read();
    let shiftId = patternShiftEntity.data["ShiftId"].Value;
    if (shiftId != null && shiftId != '') {
        return shiftId;
    }
    else {
        return '';
    }
}
function selectPatternScheduleGroup(elem, cycleScheduleId, cycleId) {
    let combo = $('[name="CyclesGroup-' + cycleId + '"]');
    let groupId = $(combo).attr('value');
    let groupList = $('flx-list#mod-emp_PatternScheduler_Groups')[0];
    let proc = new flexygo.Process('emp_InsertPatternScheduleGroup', null, null);
    let params = new Array();
    params.push({ "Key": 'GroupId', "Value": groupId });
    params.push({ "Key": 'CycleScheduleId', "Value": cycleScheduleId });
    proc.run(params, (ret) => {
        if (ret.WarningMessage) {
            flexygo.msg.warning(ret.WarningMessage);
        }
        else {
            groupList.refresh();
        }
    });
}
function selectPatternScheduleEmployee(elem, cycleScheduleId, cycleId) {
    let combo = $('[name="CyclesEmployee-' + cycleId + '"]');
    let employeeId = $(combo).attr('value');
    let employeesList = $('flx-list#mod-emp_PatternScheduler_Employees')[0];
    let proc = new flexygo.Process('emp_InsertPatternScheduleEmployee', null, null);
    let params = new Array();
    params.push({ "Key": 'EmployeeId', "Value": employeeId });
    params.push({ "Key": 'CycleScheduleId', "Value": cycleScheduleId });
    proc.run(params, (ret) => {
        if (ret.WarningMessage) {
            flexygo.msg.warning(ret.WarningMessage);
        }
        else {
            employeesList.refresh();
        }
    });
}
function GetObjectWhereEmployeesPattern() {
    let def = sebastian.utils.parseDefaults('main');
    if (def.UnitId) {
        return `AND Employees.EmployeeId IN (SELECT E.EmployeeId
                    FROM Employees E 
                    CROSS APPLY dbo.fGiveMe_tbl_UnitEmployeeID(E.EmployeeId,GETDATE()) U
                    WHERE U.UnitId = ${def.UnitId})`;
    }
    else {
        return "";
    }
}
function hideGroupPatternModule() {
    let mod = $(`flx-module[modulename="emp_PatternScheduler_Groups"]`)[0];
    let def = sebastian.utils.parseDefaults('main');
    //if (def.NoUnit == '0') {
    if (def.UnitId) {
        $(mod).find('flx-list')[0].init();
    }
    else {
        $(mod).hide();
    }
}
function patternButtonEvent(element) {
    let def = sebastian.utils.parseDefaults(element);
    let unitId = def.UnitId;
    $('.patternButton').off('click');
    $('.patternButton').on('click', (e) => {
        flexygo.nav.openPageName('hr_Patterns_List', 'emp_patterns', `Patterns.UnitId IS NULL OR Patterns.UnitId = ${unitId}`, `{'NoUnit':'0', '_UnitId':'${unitId}','UnitId':'${unitId}'}`, 'slideright', false);
    });
}
///
function EmployeesStandbyIDBatch(element, processname) {
    let modObjectname = $(element).closest('flx-module').find('flx-list')[0].objectname;
    let objectanme = (new flexygo.obj.Entity(modObjectname).getConfig()).ObjectName;
    let checkedEmployees = flexygo.selection.getArray(objectanme);
    let employeesIds = checkedEmployees.join(',');
    if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectAtLeastOneEmployee'));
    }
    else {
        let defaults;
        let defaultsPage = sebastian.utils.parseDefaults($(element));
        if (defaultsPage.SchedulerDate != undefined) {
            defaults = '{\'EmployeesIds\':\'' + employeesIds + '\', \'DateDef\':\'' + defaultsPage.SchedulerDate + '\' }';
        }
        else {
            defaults = '{\'EmployeesIds\':\'' + employeesIds + '\'}';
        }
        flexygo.nav.openProcessParams(processname, null, null, defaults, 'sliderightx800', false, $(element));
        flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone(objectanme, null, flexygo.utils.getModule(element), $(element));
    }
}
function OrganizationalUnitsPositionsIBatch(element) {
    let checkedEmployees = flexygo.selection.getArray('emp_vHR_Employee');
    let employeesIds = checkedEmployees.join(',');
    let defaults;
    if (employeesIds == null || employeesIds == '') {
        defaults = '{\'EmployeeIds\':null}';
    }
    else {
        defaults = '{\'EmployeeIds\':\'' + employeesIds + '\'}';
    }
    /*if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning('Debe seleccionar al menos un empleado')
    } else {*/
    flexygo.nav.openProcessParams('pEmp_Organizational_Units_Positions_I_Batch', null, null, defaults, 'sliderightx800', false, $(element));
    flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_vHR_Employee', null, flexygo.utils.getModule(element), $(element));
    //}
}
function CountersEmployeesInitializeIBatch(element) {
    let checkedEmployees = flexygo.selection.getArray('emp_vHR_Employee');
    let employeesIds = checkedEmployees.join(',');
    let defaults;
    if (employeesIds == null || employeesIds == '') {
        defaults = '{\'EmployeeIds\':null}';
    }
    else {
        defaults = '{\'EmployeeIds\':\'' + employeesIds + '\'}';
    }
    /*if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning('Debe seleccionar al menos un empleado')
    } else {*/
    flexygo.nav.openProcessParams('pCounters_Employees_Initialize_Batch', null, null, defaults, 'sliderightx800', false, $(element));
    flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_vHR_Employee', null, flexygo.utils.getModule(element), $(element));
    //}
}
function CountersEmployeesInitializeIBatch_Lite(element) {
    let checkedEmployees = flexygo.selection.getArray('emp_Employee');
    let employeesIds = checkedEmployees.join(',');
    let defaults;
    if (employeesIds == null || employeesIds == '') {
        defaults = '{\'EmployeeIds\':null}';
    }
    else {
        defaults = '{\'EmployeeIds\':\'' + employeesIds + '\'}';
    }
    /*if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning('Debe seleccionar al menos un empleado')
    } else {*/
    flexygo.nav.openProcessParams('pCounters_Employees_Initialize_Batch', null, null, defaults, 'sliderightx800', false, $(element));
    flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_Employee', null, flexygo.utils.getModule(element), $(element));
    //}
}
function LocationControlRulesEmployeesInitializeIBatch(element) {
    let checkedEmployees = flexygo.selection.getArray('emp_vHR_Employee');
    let employeesIds = checkedEmployees.join(',');
    let defaults;
    if (employeesIds == null || employeesIds == '') {
        defaults = '{\'EmployeesIds\':null}';
    }
    else {
        defaults = '{\'EmployeesIds\':\'' + employeesIds + '\'}';
    }
    /*if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning('Debe seleccionar al menos un empleado')
    } else {*/
    flexygo.nav.openProcessParams('pLocation_ControlRules_Employees_Assignment_Batch', null, null, defaults, 'sliderightx800', false, $(element));
    flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_vHR_Employee', null, flexygo.utils.getModule(element), $(element));
    //}
}
function Employees_Add_Holidays_Periods_IBatch(element) {
    let checkedEmployees;
    if (flexygo.context.CurrentApplicationMode == 'PRO') {
        checkedEmployees = flexygo.selection.getArray('emp_vHR_Employee');
    }
    else {
        checkedEmployees = flexygo.selection.getArray('emp_Employee');
    }
    let employeesIds = checkedEmployees.join(',');
    let defaults;
    if (employeesIds == null || employeesIds == '') {
        defaults = '{\'EmployeesIds\':null}';
    }
    else {
        defaults = '{\'EmployeesIds\':\'' + employeesIds + '\'}';
    }
    /*if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning('Debe seleccionar al menos un empleado')
    } else {*/
    flexygo.nav.openProcessParams('pEmp_Choose_holidays_Multi_Batch', null, null, defaults, 'sliderightx800', false, $(element));
    flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_vHR_Employee', null, flexygo.utils.getModule(element), $(element));
    flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_Employee', null, flexygo.utils.getModule(element), $(element));
    //}
}
function EmployeesGroupsHistoricIBatch(elem) {
    let checkedEmployees = flexygo.selection.getArray('emp_employee');
    let employeesIds = checkedEmployees.join(',');
    if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectAtLeastOneEmployee'));
    }
    else {
        let unitId = $(elem).closest('flx-module').find('flx-list')[0].data[0].UnitId;
        let processName;
        let params = [
            { Key: 'EmployeesIds', employeesIds },
            { Key: 'UnitId', unitId },
        ];
        if (elem.classList.contains('AddEmp')) {
            processName = 'pEmp_Employees_Groups_Historic_I_Batch';
        }
        else if (elem.classList.contains('RemoveEmp')) {
            processName = 'pEmp_Employees_Groups_Historic_I_Batch_Remove';
        }
        flexygo.nav.openProcessParams(processName, null, null, '{\'EmployeesIds\':\'' + employeesIds + '\', \'UnitId\':' + unitId + '}', 'sliderightx850', false, $(elem));
        flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone('emp_Employee', null, flexygo.utils.getModule(elem), $(elem));
    }
}
//Performance evaluations
//Questions List
function setAnswerButtons(type, idQuestion, RedId, value) {
    let html = '';
    let swtch = false;
    let btns = false;
    if (type === 'TrueFalse') {
        html += '<flx-switch class="swtch-answer" idQuestion="' + idQuestion + '" redId="' + RedId + '" isSwitch="true" onchange="updateAnswerResult(this)"';
        if (value === 'true') {
            html += 'value="true"';
        }
        html += '></flx-switch>';
    }
    else if (type === '1to4' || type === '1to10') {
        var answers;
        if (type === '1to4') {
            answers = 4;
        }
        else if (type === '1to10') {
            answers = 10;
        }
        html += '<div class="answer-btn-container">';
        for (var i = 1; i <= answers; i++) {
            html += '<button  idQuestion="' + idQuestion + '" value="' + i + '" redId="' + RedId + '" onclick="updateAnswerResult(this)" isSwitch="false" class="emp-btn-answer  emp-no-clicked ';
            if (value === i.toString()) {
                html += 'emp-clicked';
            }
            html += ' ">' + i + '</button>';
        }
        html += '</div>';
    }
    return html;
}
function updateAnswerResult(control) {
    let idQuestion = $(control).attr('idQuestion');
    let result = $(control).attr('value');
    let idEvaluation = $(control).attr('redId');
    if ($(control).attr('isSwitch') === 'false') {
        $('#' + idQuestion).find('button').removeClass('emp-clicked');
        $(control).addClass('emp-clicked');
    }
    let process = new flexygo.Process('Emp_UpdateQuestionResult', 'emp_Performance_Evaluations_Question', '(QuestionId =\'' + idQuestion + '\' AND RedId=\'' + idEvaluation + '\')');
    let params = new Array();
    params.push({ "Key": 'result', "Value": result });
    process.run(params, () => { }, 'current', true, $(this));
}
function getBalanceListFilterFields_UpdateMasive(listId) {
    let filters = $(listId)[0].filterValues;
    let startDate, endDate, where = [];
    if (filters) {
        filters.forEach((elem, index) => {
            if (filters[index].objectproperty == 'Date') {
                startDate = moment((filters[index].value).split('|')[0]).format('YYYYMMDD');
                if ((filters[index].value).split('|')[1]) {
                    endDate = moment((filters[index].value).split('|')[1]).format('YYYYMMDD');
                    where.push(`([${filters[index].objectproperty}] between '${startDate}' AND '${endDate}')`);
                }
                else if ((filters[index].value).startsWith('|')) {
                    where.push(`([${filters[index].objectproperty}] <= '${startDate}')`);
                }
                else {
                    where.push(`([${filters[index].objectproperty}] >= '${startDate}')`);
                }
            }
            else {
                where.push(`([${filters[index].objectproperty}] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
        });
        if (where.length > 0) {
            flexygo.nav.openProcessParams('hr_dll_UpdateBalancesDataMasive', 'hr_vEmployee_Balances', where.join(' AND '), null, 'sliderightx50p', false, $(this));
        }
    }
    else {
        flexygo.msg.warning(flexygo.localization.translate('emp.applyFilterToModifyBalances'));
    }
}
function getBalanceListFilterFields(listId) {
    let filters = $(listId)[0].filterValues;
    let CompanyId, startDate, endDate, companyFilter = false, groupFilter = false, unitFilter = false, datesFilter = false, where = [];
    if (filters) {
        filters.forEach((elem, index) => {
            if (filters[index].objectproperty == 'CompanyId') {
                CompanyId = filters[index].value;
                companyFilter = true;
                where.push(`([${filters[index].objectproperty}] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'GroupId') {
                groupFilter = true;
                where.push(`([GroupId] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'UnitId') {
                unitFilter = true;
                where.push(`([UnitId] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'Date' && (filters[index].value).includes('|')) {
                startDate = (filters[index].value).split('|')[0];
                endDate = (filters[index].value).split('|')[1];
                datesFilter = true;
                where.push(`([${filters[index].objectproperty}] between ''${startDate}'' AND ''${endDate}'')`);
            }
            else {
                where.push(`([${filters[index].objectproperty}] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
        });
        if (datesFilter && (companyFilter || groupFilter || unitFilter)) {
            sebastian.utils.addLock(30000);
            let process = new flexygo.Process('emp_ExportBalanceList', 'hr_vEmployee_Balances', where.join(' AND '));
            let params = new Array();
            params.push({ "Key": 'CompanyId', "Value": companyFilter ? CompanyId : '' }, { "Key": 'StartDatePeriod', "Value": startDate }, { "Key": 'EndDatePeriod', "Value": endDate });
            process.run(params, (ret) => {
                sebastian.utils.removeLock();
                const returnjs = new Function(ret.JSCode);
                returnjs();
                flexygo.msg.success(ret.SuccessMessage);
            }, 'current', true, $(this));
        }
        else {
            flexygo.msg.warning(flexygo.localization.translate('emp.selectCompanyGroupUnitAndDateRange'));
        }
    }
    else {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectCompanyGroupUnitAndDateRange'));
    }
}
function getMarkingsListFilterFields(listId) {
    let filters = $(listId)[0].filterValues;
    let startDate, endDate, startDatetime, endDatetime, officeFilter = false, dptFilter = false, groupFilter = false, unitFilter = false, datesFilter = false, datetimeFilter = false, where = [];
    if (filters) {
        filters.forEach((elem, index) => {
            if (filters[index].objectproperty == 'Office') {
                officeFilter = true;
                where.push(`([${filters[index].objectproperty}] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'Department') {
                dptFilter = true;
                where.push(`([Department] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'GroupId') {
                groupFilter = true;
                where.push(`([GroupId] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'UnitId') {
                unitFilter = true;
                where.push(`([UnitId] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
            else if (filters[index].objectproperty == 'DateJourney' && (filters[index].value).split('|')[1] != "") {
                startDate = (filters[index].value).split('|')[0];
                endDate = (filters[index].value).split('|')[1];
                datesFilter = true;
                where.push(`([${filters[index].objectproperty}] between ''${startDate}'' AND ''${endDate}'')`);
            }
            else if (filters[index].objectproperty == 'Ckecktime' && (filters[index].value).includes('|')) {
                startDatetime = (filters[index].value).split('|')[0];
                endDatetime = (filters[index].value).split('|')[1];
                datetimeFilter = true;
                where.push(`([${filters[index].objectproperty}] between ''${startDatetime}'' AND ''${endDatetime}'')`);
            }
            else {
                where.push(`([${filters[index].objectproperty}] in ( ${(filters[index].value).split('|').join(',')}))`);
            }
        });
        if (datesFilter) {
            sebastian.utils.addLock(30000);
            let process = new flexygo.Process('emp_ExportMarkingList', 'HR_Markings', where.join(' AND '));
            let params = new Array();
            params.push({ "Key": 'StartDatePeriod', "Value": startDate }, { "Key": 'EndDatePeriod', "Value": endDate });
            process.run(params, (ret) => {
                sebastian.utils.removeLock();
                const returnjs = new Function(ret.JSCode);
                returnjs();
                flexygo.msg.success(ret.SuccessMessage);
            }, 'current', true, $(this));
        }
        else {
            flexygo.msg.warning(flexygo.localization.translate('emp.selectDateRange'));
        }
    }
    else {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectDateRange'));
    }
}
function exportPayrollRunExcelWithFilters(listId, RunId) {
    let existfilters = $(listId)[0];
    let where = [];
    let objectwhere = '';
    if (existfilters) {
        let filters = existfilters.filterValues;
        if (filters) {
            filters.forEach((elem, index) => {
                let whereItem;
                if (filters[index].objectproperty === 'Startdate' || filters[index].objectproperty === 'EndDate') {
                    let date1 = moment((filters[index].value).split('|')[0]).format('YYYYMMDD');
                    let date2 = moment((filters[index].value).split('|')[1]).format('YYYYMMDD');
                    whereItem = `([${filters[index].objectproperty}] BETWEEN  ''${date1}'' AND ''${date2}'')`;
                }
                else if (filters[index].objectproperty === 'Tea') {
                    let bitValue = filters[index].value ? 1 : 0;
                    whereItem = `([${filters[index].objectproperty}] = ${bitValue})`;
                }
                else {
                    whereItem = `([${filters[index].objectproperty}] in ( ${(filters[index].value).split('|').join(',')}))`;
                }
                where.push(whereItem);
            });
            objectwhere = where.join(' AND ');
        }
    }
    flexygo.msg.prompt(flexygo.localization.translate('emp.excelFileTitle'), flexygo.localization.translate('emp.excelFileMsg'), (filename => {
        let process = new flexygo.Process('emp_ExportAndSaveCompanyPayroll', 'PayrollRun_Employees', objectwhere);
        let params = new Array();
        params.push({ "Key": 'RunId', "Value": RunId }, { "Key": 'DocumentName', "Value": filename });
        sebastian.utils.addLock(30000);
        process.run(params, (ret) => {
            const returnjs = new Function(ret.JSCode);
            sebastian.utils.removeLock();
            flexygo.msg.success(ret.SuccessMessage);
            returnjs();
            $('flx-list#mod-emp_PayrollRun_EasyInfo')[0].refresh();
        }, 'current', true, $(this));
    }), flexygo.localization.translate('emp.excelFileTitle'), null);
}
function getComboAdditionalWhere(element) {
    let modFilter = $(element).closest('main').find('flx-html[modulename="hr_WorkingDays_GroupsFilter"]');
    if (modFilter.find('div.GroupsFilter.hide').length > 0) {
        modFilter.find('div.GroupsFilter.hide').removeClass('hide');
        let ids = Object.entries($(element).find('flx-list[modulename="emp_Markings_ManagedGroupstb"]')[0].data).map(itm => itm[1].GroupId).join(',');
        let multicomboGroups = modFilter.find('flx-multicombo')[0];
        if (ids) {
            multicomboGroups.additionalWhere = `Groups.GroupId in (${ids})`;
        }
        else {
            multicomboGroups.additionalWhere = '1=0';
        }
        multicomboGroups.refresh();
    }
}
function filterWorkingDayModulesByGroup(element, cleaning = false) {
    let modules = [
        '#mod-emp_WorkingDay_GroupingShift_Incidentes',
        '#mod-emp_WorkingDay_GroupingShift_Preview',
        '#mod-emp_WorkingDay_GroupingShift_MarkingPair',
        '#mod-emp_WorkingDay_GroupingShift_Balance',
        '#mod-hr_UnplannerAbsences_WorkingDayStripe',
        '#mod-emp_employees_PlannerAbsences',
        '#mod-emp_Markings_ManagedGroupstb'
        //, '#mod-hr_standbyEmployeesList'
    ];
    filterModulesByGroup(element, modules, cleaning);
}
function filterBalanceFullList() {
    let modules = [
        '#mod-emp_WorkingDay_GroupingShift_BalanceFullList'
    ];
    let element = $('#mod-hr_WorkingDays_GroupsFilter');
    filterModulesByGroup(element, modules);
}
function filterModulesByGroup(element, modules, cleaning = false) {
    let module = $(element).closest('flx-module')[0];
    let groupsIds = $('flx-multicombo[name= "filter-groups"]')[0].getValue().split('|').join(',');
    let currentFilter;
    if (cleaning == true) {
        $('flx-multicombo[name="filter-groups"]').val(null);
    }
    if (groupsIds != '' && !cleaning) {
        currentFilter = `Groups.GroupId in (${groupsIds})`;
    }
    else {
        currentFilter = ``;
    }
    let success = sebastian.utils.FilterSeveralModules(element, modules, currentFilter);
    if (success) {
        if (module.objectdefaults == null || module.objectdefaults == undefined) {
            module.objectdefaults = { markingsListWhere: currentFilter };
        }
        else {
            module.objectdefaults.markingsListWhere = currentFilter;
        }
        setAddtionalWhereGroupsManage(currentFilter);
    }
}
function setAddtionalWhereGroupsManage(currentFilter) {
    let list = $('flx-list[modulename="emp_Markings_ManagedGroupstb"]')[0];
    if (currentFilter) {
        list.additionalWhere = currentFilter;
    }
    else {
        list.additionalWhere = '1=0';
    }
    list.init();
}
function setMarkingsModulesAdditionalWhere(element, previewMod = false) {
    let module = $('flx-module[modulename="hr_WorkingDays_GroupsFilter"]')[0];
    let listm = $(element).find('flx-list')[0];
    if (module) {
        if (module.objectdefaults && module.objectdefaults.markingsListWhere) {
            if (previewMod && listm.moduleName == 'emp_WorkingDay_GroupingShift_Preview') {
            }
            else {
                if (listm.additionalWhere != module.objectdefaults.markingsListWhere) {
                    listm.additionalWhere = module.objectdefaults.markingsListWhere;
                    listm.refresh();
                }
            }
        }
    }
}
function EmployeeStandbyIBatchGroup(element, groupId, currentReference) {
    let dateFrom = sebastian.utils.parseDefaults(element).FormatDate;
    sebastian.utils.addLock(3000);
    let process = new flexygo.Process('pEmp_EmployeeStandby_I_Batch_Group');
    let params = new Array();
    params.push({ "Key": 'GroupId', "Value": groupId }, { "Key": 'dateFrom', "Value": dateFrom }, { "Key": 'currentReference', "Value": currentReference });
    process.run(params, (ret) => {
        EmployeeWorkingDatRefresh();
        sebastian.utils.removeLock();
    }, 'current', true, $(this));
}
function EmployeeStandbyDBatchGroup(element, groupId, currentReference) {
    let dateFrom = sebastian.utils.parseDefaults(element).FormatDate;
    sebastian.utils.addLock(3000);
    let process = new flexygo.Process('pEmp_EmployeeStandby_D_Batch_Group');
    let params = new Array();
    params.push({ "Key": 'GroupId', "Value": groupId }, { "Key": 'dateFrom', "Value": dateFrom }, { "Key": 'currentReference', "Value": currentReference });
    process.run(params, (ret) => {
        EmployeeWorkingDatRefresh();
        sebastian.utils.removeLock();
    }, 'current', true, $(this));
}
function EmployeeWorkingDatRefresh() {
    if ($('#mod-emp_Markings_ManagedGroups')[0])
        $('#mod-emp_Markings_ManagedGroups')[0].refresh();
    if ($('#mod-hr_UnplannerAbsences_WorkingDayStripe')[0])
        $('#mod-hr_UnplannerAbsences_WorkingDayStripe')[0].refresh();
    if ($('#mod-hr_standbyEmployeesList')[0])
        $('#mod-hr_standbyEmployeesList')[0].refresh();
    if ($('#mod-emp_employees_PlannerAbsences')[0])
        $('#mod-emp_employees_PlannerAbsences')[0].refresh();
    if ($('#mod-emp_WorkingDay_GroupingShift_Incidentes')[0])
        $('#mod-emp_WorkingDay_GroupingShift_Incidentes')[0].refresh();
    if ($('#mod-emp_WorkingDay_GroupingShift_Preview')[0])
        $('#mod-emp_WorkingDay_GroupingShift_Preview')[0].refresh();
    if ($('#mod-emp_WorkingDay_GroupingShift_MarkingPair')[0])
        $('#mod-emp_WorkingDay_GroupingShift_MarkingPair')[0].refresh();
    if ($('#mod-emp_WorkingDay_GroupingShift_Balance')[0])
        $('#mod-emp_WorkingDay_GroupingShift_Balance')[0].refresh();
}
function GroupMarkingsAllManaged(element, groupId, currentReference) {
    let dateFrom = sebastian.utils.parseDefaults(element).FormatDate;
    let shiftTypeId = sebastian.utils.parseDefaults(element).ShiftTypeId;
    let unitId = sebastian.utils.parseDefaults(element).UnitId;
    sebastian.utils.addLock(3000);
    let process = new flexygo.Process('pEmp_AllGroupMarkingsManaged');
    let params = new Array();
    params.push({ "Key": 'GroupId', "Value": groupId }, { "Key": 'dateFrom', "Value": dateFrom }, { "Key": 'currentReference', "Value": currentReference }, { "Key": 'UnitId', "Value": unitId }, { "Key": 'ShiftTypeId', "Value": shiftTypeId });
    process.run(params, (ret) => {
        if ($('#mod-emp_Markings_ManagedGroups')[0])
            $('#mod-emp_Markings_ManagedGroups')[0].refresh();
        sebastian.utils.removeLock();
    }, 'current', true, $(this));
}
function showBalanceTotals(element) {
    let mainList = $('flx-list[modulename="hr_EmployeesBalanceDefList"]')[0];
    let templateId = mainList.templateId;
    let modMonth = $('flx-list[modulename="hr_EmployeesBalances_Totals_Monthly"]')[0];
    let modDay = $('flx-list[modulename="hr_EmployeesBalances_Totals"]')[0];
    setTimeout(null, 3000);
    if (templateId === 'emp_EmployeesBalanceList_Month') {
        //modMonth.init();
        sebastian.utils.useFilterOnOtherModule('hr_EmployeesBalanceDefList', 'hr_EmployeesBalances_Totals_Monthly');
        $(modDay).closest('flx-module').addClass('hide');
        $(modMonth).closest('flx-module').removeClass('hide');
    }
    else if (templateId === 'emp_EmployeesBalanceList_Day') {
        //modDay.init();
        sebastian.utils.useFilterOnOtherModule('hr_EmployeesBalanceDefList', 'hr_EmployeesBalances_Totals');
        $(modMonth).closest('flx-module').addClass('hide');
        $(modDay).closest('flx-module').removeClass('hide');
    }
    let ev = {
        class: "module",
        type: "filtered",
        sender: $(mainList).closest('flx-module')[0],
        masterIdentity: mainList.objectname
    };
    flexygo.events.trigger(ev, $(this));
}
//init Settings list
function initSettingsList(module, groupId, title) {
    let modSettings = $(module).closest('main').find('[modulename="emp_list-settings-edit"] flx-list')[0];
    let moduleTitle = $(modSettings).closest('flx-module').find(".cntHeader .cntTitle")[0];
    moduleTitle ? moduleTitle.textContent = title : null;
    let additionalWhere;
    if (groupId != 4) {
        additionalWhere = "Settings.GroupId = " + groupId;
        $('flx-module[modulename="hr_IntegrationsOptions"]').addClass('hidden');
        $('flx-module[modulename="hr_cc_CompaniesList"]').addClass('hidden');
        $('flx-module[modulename="HR_EmployeePortalMigration_data"]').addClass('hidden');
    }
    else {
        additionalWhere = "1=0";
        $('flx-module[modulename="hr_IntegrationsOptions"]').removeClass('hidden');
    }
    modSettings.additionalWhere = additionalWhere;
    modSettings.init();
}
function hideSettingList(module) {
    let modSettings = $(module).closest('main').find('[modulename="emp_list-settings-edit"] flx-list')[0];
    modSettings.additionalWhere = "1=0";
    modSettings.init();
    $('flx-module[modulename="hr_IntegrationsOptions"]').addClass('hidden');
    $('flx-module[modulename="hr_cc_CompaniesList"]').addClass('hidden');
    $('flx-module[modulename="HR_EmployeePortalMigration_data"]').addClass('hidden');
}
function AhoraIntegrationOptions() {
    $('flx-module[modulename="hr_cc_CompaniesList"]').addClass('hidden');
    $('flx-module[modulename="HR_EmployeePortalMigration_data"]').addClass('hidden');
    $('flx-module[modulename="emp_list-settings-edit"]').removeClass('hidden');
    let modSettings = $('[modulename="emp_list-settings-edit"] flx-list')[0];
    modSettings.additionalWhere = "IdSettings in ('AhoraEmployees', 'AhoraERP', 'AhoraExpenses','AhoraSendExpensesDocuments')";
    modSettings.init();
}
function CDIntegrationOptions() {
    $('flx-module[modulename="hr_cc_CompaniesList"]').removeClass('hidden');
    $('flx-module[modulename="emp_list-settings-edit"]').addClass('hidden');
    $('flx-module[modulename="HR_EmployeePortalMigration_data"]').addClass('hidden');
    $('flx-list[modulename="hr_cc_CompaniesList"]')[0].init();
}
function EPmigration() {
    $('flx-module[modulename="hr_cc_CompaniesList"]').addClass('hidden');
    $('flx-module[modulename="emp_list-settings-edit"]').addClass('hidden');
    $('flx-module[modulename="HR_EmployeePortalMigration_data"]').removeClass('hidden');
    $('flx-list[modulename="HR_EmployeePortalMigration_data"]')[0].init();
}
function getLicense() {
    let proc = new flexygo.Process('hr_getLicenseType', null, null);
    proc.run(null, (ret) => {
        if (ret) {
            if (ret.Data.Success != 'False') {
                $('.CC-nolicense').hide();
            }
            else {
                $('.CC-btns').hide();
            }
        }
    });
}
//init ApprovalFlow list
function ApprovalFlow(module, groupId, title) {
    let mod = $(module).closest('main').find('flx-module[modulename="Instances_Types_ApprovalFlow"]')[0];
    let moduleTitle = $(mod).find(".cntHeader .cntTitle")[0];
    moduleTitle ? moduleTitle.textContent = title : null;
    let modList = $(mod).find('flx-list')[0];
    mod.objectdefaults = { "TypeId": groupId };
    modList.additionalWhere = "Instances_Types_ApprovalFlow.TypeId = " + groupId;
    modList.init();
    $(mod).removeClass('hide');
}
function updateApprovalFlowType(element, property, typeId) {
    let newValue = $(element).val();
    let entity = new flexygo.obj.Entity('Instance_Type', `Instances_Types.TypeId = ${typeId}`);
    if (entity.read()) {
        entity.data[property].Value = newValue;
        entity.update();
    }
}
function InsertAbscenceButtonHideControl(element) {
    var showButtonInterval = setInterval(() => {
        let module = $('flx-list[modulename="emp_WorkingDay_GroupingShift_MarkingPair"]');
        if (module.length > 0) {
            module = $('flx-list[modulename="emp_WorkingDay_GroupingShift_MarkingPair"]')[0];
            let button = $('.InsertAbsenceButton');
            if (button.length > 0) {
                let table = module.data;
                table.forEach(register => {
                    if (register.isNegative != 0 && register.ControlPresenceModeId != ("NOT")) {
                        button.removeClass("hidden");
                    }
                });
                clearInterval(showButtonInterval);
            }
        }
        else {
            clearInterval(showButtonInterval);
        }
    }, 1000);
}
function ChangeInstanceTypeOnPendings(module, TypeId) {
    let modPersonalData = $(module).closest('main').find('flx-module[modulename="emp_Instance_EmployeePersonalData"]');
    let modAddMarking = $(module).closest('main').find('flx-module[modulename="emp_Instance_AddMarking"]');
    let modModifyMarking = $(module).closest('main').find('flx-module[modulename="emp_Instance_ModifyMarking"]');
    let modHolidays = $(module).closest('main').find('flx-module[modulename="hr_instance_requestHolidays"]');
    modPersonalData.toggleClass("hidden", TypeId !== 0);
    modAddMarking.toggleClass("hidden", TypeId !== 1);
    modModifyMarking.toggleClass("hidden", TypeId !== 2);
    modHolidays.toggleClass("hidden", TypeId !== 3);
}
function initInstanceModules(element, typeId) {
    let list;
    let listModules = [];
    listModules.push('flx-list[modulename="emp_Instance_EmployeePersonalData"]', 'flx-list[modulename="emp_Instance_AddMarking"]', 'flx-list[modulename="emp_Instance_ModifyMarking"]', 'flx-list[modulename="HR_Instance_CancelHolidays"]', 'flx-list[modulename="hr_instance_requestHolidays"]', 'flx-list[modulename="HR_Instances_Request_module"]');
    listModules.forEach((value, index) => {
        $(element).closest('main').find(value).empty();
        $(value).closest('flx-module').addClass('hide');
    });
    switch (typeId) {
        case 0:
            list = $('flx-list[modulename="emp_Instance_EmployeePersonalData"]')[0];
            break;
        case 1:
            list = $('flx-list[modulename="emp_Instance_AddMarking"]')[0];
            break;
        case 2:
            list = $('flx-list[modulename="emp_Instance_ModifyMarking"]')[0];
            break;
        case 3:
            list = $('flx-list[modulename="hr_instance_requestHolidays"]')[0];
            list.additionalWhere = 'Holidays_Types_Groups.InstanceTypeId = 3';
            break;
        case 5:
            list = $('flx-list[modulename="hr_instance_requestHolidays"]')[0];
            list.additionalWhere = 'Holidays_Types_Groups.InstanceTypeId = 5';
            break;
        case 6:
            list = $('flx-list[modulename="HR_Instance_CancelHolidays"]')[0];
            break;
        default:
            if (typeId > 6) {
                list = $('flx-list[modulename="HR_Instances_Request_module"]')[0];
            }
            break;
    }
    if (list) {
        list.init();
        if (typeId === 3) {
            $(list).closest('flx-module').find('span.cntTitle').html(flexygo.localization.translate('emp.instanceAbsences'));
        }
        else if (typeId === 5) {
            $(list).closest('flx-module').find('span.cntTitle').html(flexygo.localization.translate('emp.instanceHolidays'));
        }
    }
}
//function ChangeDate(element, where) {
//    let modules = [
//        'flx-list[modulename="emp_hr_Employee_Markings"]'
//    ];
//    let newDate = sebastian.utils.ChangeDate(element, modules, where);
//    initEmployeesMarkingsModules(element, newDate);
//}
//function initEmployeesMarkingsModules(element, newDate) {
//    initEmployeesMarkingsTotals(element, newDate);
//    initEmployeesMarkingsAbsences(element, newDate);
//    initEmployeesMarkingsLocations(element, newDate);
//    initEmployeesMarkingsIncidents(element, newDate);
//}
//function initEmployeesMarkingsTotals(element, dayDate) {
//    let list = <flexygo.ui.wc.FlxListElement>$('flx-list[modulename="hr_mod_EmployeeMarkings_totals"]')[0];
//    if (dayDate == '' || dayDate == null) {
//        dayDate = moment(moment.now()).format('YYYYMMDD');
//    }
//    list.additionalWhere = `EHT.MonthDate = month('${dayDate}') AND EHT.YearDate = year('${dayDate}')`;
//    list.init();
//}
//function initEmployeesMarkingsAbsences(element, dayDate) {
//    let list = <flexygo.ui.wc.FlxListElement>$('flx-list[modulename="emp_hr_Employee_Info_Absences"]')[0];
//    if (dayDate == '' || dayDate == null) {
//        dayDate = moment(moment.now()).format('YYYYMMDD');
//    }
//    list.additionalWhere = `CAL.MonthDate = month('${dayDate}') AND CAL.YearDate = year('${dayDate}')`;
//    list.init();
//}
//function initEmployeesMarkingsLocations(element, dayDate) {
//    let list = <flexygo.ui.wc.FlxListElement>$('flx-list[modulename="emp_hr_Employee_info_Locations"]')[0];
//    if (dayDate == '' || dayDate == null) {
//        dayDate = moment(moment.now()).format('YYYYMMDD');
//    }
//    list.additionalWhere = `CAL.MonthDate = month('${dayDate}') AND CAL.YearDate = year('${dayDate}')`;
//    list.init();
//}
//function initEmployeesMarkingsIncidents(element, dayDate) {
//    let list = <flexygo.ui.wc.FlxListElement>$('flx-list[modulename="emp_hr_Employee_Info_Incidents"]')[0];
//    if (dayDate == '' || dayDate == null) {
//        dayDate = moment(moment.now()).format('YYYYMMDD');
//    }
//    list.additionalWhere = ` MONTH(A.DateJourney) = month('${dayDate}') AND  YEAR(A.DateJourney) = year('${dayDate}')`;
//    list.init();
//}
function EmployeeMarkingsFilterDateAfterLoad(e) {
    let main = $(e).closest('main');
    var loadtemplate = setInterval(() => {
        if ($(main).find('flx-list[modulename="emp_hr_Employee_Markings"]').length > 0) {
            clearInterval(loadtemplate);
            let list = $(main).find('flx-list[modulename="emp_hr_Employee_Markings"]');
            $(list)[0].additionalWhere = 'MONTH(EDD.DateJourney) = MONTH(GETDATE()) AND YEAR(EDD.DateJourney) = YEAR(GETDATE())';
            $(list)[0].init();
        }
    }, 200);
}
function DaydateSummaryDetailsTitle(elem) {
    let defaults = sebastian.utils.parseDefaults(elem);
    let title = defaults.Title;
    $(elem).find('div.cntHeader.bg-module > span.cntTitle').html(title);
}
function markingsCheckBalanceButton(module) {
    let modList = $(module).find("flx-list")[0];
    let def = sebastian.utils.parseDefaults(module);
    let viewFilter = "";
    if (modList.moduleName == "emp_hr_Employee_Markings") {
        if (flexygo.utils.isBlank(def["EmployeeId"])) {
            return;
        }
        let mod = $('flx-module[modulename="emp_hr_Employee_Markings_FilterDate"]');
        let dyear = $(mod).find(".emp-selector-arrow-container").attr("year"), dmonth = $(mod).find(".emp-selector-arrow-container").attr("month");
        let newDate;
        if (!dyear || !dmonth) {
            newDate = `${moment().format('YYYY')}-${moment().format('MM')}-01`;
        }
        else {
            newDate = `${dyear}-${dmonth}-01`;
        }
        viewFilter = `(vEmployee_Balance.EmployeeId IN(${def["EmployeeId"]}) AND (MONTH(vEmployee_Balance.Date) = MONTH(CAST('${newDate}' AS DATE)) AND YEAR(vEmployee_Balance.Date) = YEAR(CAST('${newDate}' AS DATE))))`;
    }
    else {
        viewFilter = `(vEmployee_Balance.EmployeeId IN(SELECT DISTINCT EmployeeId FROM vHR_Employee_Daydate WHERE ${modList.processwhere} ${!flexygo.utils.isBlank(modList.additionalWhere) ? " AND (" + modList.additionalWhere + ")" : ""}) AND CAST(vEmployee_Balance.Date AS DATE)=CAST('${def["DayDate"]}' AS DATE))`;
    }
    let obj = new flexygo.obj.Entity("hr_vEmployee_Balance", "");
    let balanceData = obj.getView("hr_vEmployee_Balance_Count", 0, 10, viewFilter);
    if (balanceData.length > 0) {
        if (balanceData[0]["NumReg"] > 0) {
            $(module).find(".emp-balance").removeClass("hide");
        }
    }
}
function drawBalanceButton(module) {
    let modList = $(module).find("flx-list")[0];
    let def = sebastian.utils.parseDefaults(module);
    let viewFilter = "";
    viewFilter = `(vEmployee_Balance.EmployeeId IN(SELECT DISTINCT EmployeeId FROM vHR_Employee_Daydate WHERE ${modList.processwhere} ${!flexygo.utils.isBlank(modList.additionalWhere) ? " AND (" + modList.additionalWhere + ")" : ""}) AND CAST(vEmployee_Balance.Date AS DATE)=CAST('${def["DayDate"]}' AS DATE))`;
    let obj = new flexygo.obj.Entity("hr_vEmployee_Balance", "");
    let balanceData = obj.getView("hr_vEmployee_Balance_Count", 0, 10, viewFilter);
    if (balanceData.length > 0) {
        if (balanceData[0]["NumReg"] > 0) {
            if ($(module).find(".cntBodyHeader .moduleButtons button.emp-balance").length == 0) {
                $(module).find(".cntBodyHeader .moduleButtons").prepend(`
                <div class="btn-group">
                    <button class="btn btn-default emp-new-btn padding-s emp-balance"
                        data-type="process"
                        onclick="flexygo.nav.execProcess('HR_GoToBalance_JS','vHR_Employee_Daydates','',null,null,'current',false,$(this))">
                        <span>See balance</span>
                    </button>
                </div>`);
            }
        }
        else {
            $(module).find(".cntBodyHeader .moduleButtons button.emp-balance").remove();
        }
    }
}
function overtimeRuleLines_Save(e) {
    let row = $(e).closest(".emp-row-list");
    let properties = {};
    let requeridProps = ["factor"];
    let days = $(row).find(".hr-overtime-day[propertyfield]");
    for (let i = 0; i < days.length; i++) {
        properties[$(days[i]).attr("propertyfield")] = $(days[i]).hasClass("checked") ? 1 : 0;
    }
    let otherFields = $(row).find(":not(.hr-overtime-day)[propertyfield]");
    for (let i = 0; i < otherFields.length; i++) {
        if ($.inArray($(otherFields[i]).attr("propertyfield").toLowerCase(), requeridProps) !== -1) {
            if (flexygo.utils.isBlank(otherFields[i].getValue())) {
                flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredsaving') + ' ' + $(otherFields[i]).attr("propertyfield").toLowerCase());
                return false;
            }
        }
        properties[$(otherFields[i]).attr("propertyfield")] = otherFields[i].getValue();
    }
    sebastian.utils.updateObject(e, properties);
}
function bagHoursLine_EnableEdit(e) {
    if ($(".inEdit").length == 0) {
        let line = $(e).closest('.emp-row-list');
        line.addClass("inEdit");
        line.find("[disabled]").prop("disabled", false);
        $(e).hide();
        line.find(".saveButton").show();
        $('flx-module[modulename="hr_BagHoursLines_Footer"]').removeClass("hide");
    }
}
function bagHoursLine_changeHourType(e) {
    let row = $(e).closest(".emp-row-list");
    let newPropertyField = $(e).val() == 0 ? "HoursToCompensate" : "DaysToCompensate";
    let hours = $(row).find('flx-text[propertyField="HoursToCompensate"]');
    let days = $(row).find('flx-text[propertyField="DaysToCompensate"]');
    $(hours)[0].setValue("");
    $(days)[0].setValue("");
    $(row).find('flx-text[type="number"]').hide();
    $(row).find(`flx-text[type="number"][propertyField="${newPropertyField}"]`).show();
    $(row).find(`flx-text[type="number"][propertyField="${newPropertyField}"] .hide`).removeClass("hide");
    row.find("[disabled]").prop("disabled", false);
}
function bagHoursLine_Save(e) {
    let row = $(e).closest(".emp-row-list");
    let properties = {};
    let requeridProps = ["compensationtypeid"];
    let otherFields = $(row).find("[propertyfield]");
    for (let i = 0; i < otherFields.length; i++) {
        if ($.inArray($(otherFields[i]).attr("propertyfield").toLowerCase(), requeridProps) !== -1) {
            if (flexygo.utils.isBlank(otherFields[i].getValue())) {
                flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredsaving') + ' ' + $(otherFields[i]).attr("propertyfield").toLowerCase());
                return false;
            }
        }
        properties[$(otherFields[i]).attr("propertyfield")] = otherFields[i].getValue();
    }
    sebastian.utils.updateObject(e, properties);
}
function openTotalHolidaysSummaryCalendar(element, employeeId) {
    let holidaysYear = $('flx-scheduleryear').find('.calendar .jqyc .jqyc-year-chooser').attr('data-current-year');
    flexygo.nav.openPageName('hr_EmployeesHolidaysTotals', 'emp_Employees_Holidays_Totals', `(Employees_Holidays_Totals.EmployeeId=${employeeId} AND Employees_Holidays_Totals.[Year] = ${holidaysYear})`, `{'EmployeeId': '${employeeId}', 'holidaysYear':'${holidaysYear}'}`, 'sliderightx60p', false, $(element));
}
function filterPatternsList(element) {
    let plannerMod = $(`flx-planner`).closest('flx-module')[0];
    let def = sebastian.utils.parseDefaults(plannerMod);
    let patternList = $('flx-list')[0];
    let additionalWhere;
    if (def.UnitId) {
        additionalWhere = `Patterns.UnitId IS NULL OR Patterns.UnitId = ${def.UnitId}`;
    }
    else {
        additionalWhere = `Patterns.UnitId IS NULL`;
    }
    patternList.additionalWhere = additionalWhere;
    patternList.refresh();
}
function plannerInsertAbsence(entity, groupId, plannerDate, triggerElement) {
    let typeId = entity.data.Type.Value;
    if (entity.data.Duration.Value == 1) {
        //dia completo, la metemos y ya
        let proc = new flexygo.Process('pEmp_Choose_holidaysRRHH', null, null);
        let params = new Array();
        params.push({ "Key": 'EmployeeId', "Value": groupId });
        params.push({ "Key": 'date1', "Value": plannerDate });
        params.push({ "Key": 'date2', "Value": plannerDate });
        params.push({ "Key": 'StatusId', "Value": 1 });
        params.push({ "Key": 'Type', "Value": typeId });
        proc.run(params, (ret) => {
            if (ret) {
                let planner = $('flx-planner')[0];
                let modeId = $(planner).find('div#planner-main').attr('modeid');
                ;
                planner.refreshCell(modeId, groupId, plannerDate, planner);
                if (ret.WarningMessage) {
                    flexygo.msg.warning(ret.WarningMessage);
                }
            }
        });
    }
    else {
        let module = $('flx-planner').closest('flx-module')[0];
        if (module.objectdefaults == null || module.objectdefaults == undefined) {
            module.objectdefaults = {
                plannerDate: plannerDate,
                groupId: groupId
            };
        }
        else {
            module.objectdefaults.plannerDate = plannerDate;
            module.objectdefaults.groupId = groupId;
        }
        //abrimos la pantalla de parámetros para que rellene las horas.
        flexygo.nav.execProcess("pEmp_Choose_holidaysRRHH", "", "", `{'EmployeeId':'${groupId}', 'AuxType':'${typeId}' ,'date1': '${plannerDate}','date2': '${plannerDate}'}`, null, "slideright", false, triggerElement, (response, groupId, plannerDate) => {
            let planner = $('flx-planner')[0];
            let mod = $('flx-planner').closest('flx-module')[0];
            let employeeId = mod.objectdefaults.groupId;
            let date = mod.objectdefaults.plannerDate;
            let modeId = $(planner).find('div#planner-main').attr('modeid');
            ;
            planner.refreshCell(modeId, employeeId, date, planner);
            flexygo.nav.closePage($('[pagename="syspage-processparams-default"]'));
        }, false);
    }
}
function plannerInsertEmployeeSchedule(entity, groupId, plannerDate, triggerElement) {
    // Función auxiliar para ejecutar la lógica de inserción
    const executeInsertLogic = () => {
        let scheduleEntity = new flexygo.obj.Entity('vHR_Employee_Daydates');
        let data = scheduleEntity.getView('emp_vHR_Employee_Daydate_view', 0, 1000, `EDD.EmployeeId = ${groupId} AND EDD.[Date] = '${plannerDate}'`, null, null, null, `[{"key": "DayDate", "value": "${plannerDate}"}]`);
        let shiftId = entity.data.ShiftId.Value;
        let process;
        let params = new Array();
        if (data.length > 0) {
            if (data[0]["StatusId"] != 0) {
                flexygo.msg.alert(`${flexygo.localization.translate('emp.cannotChangePlanificationStatus')} <b>${data[0]["DateStatusDescrip"]}</b>`);
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('emp.existingMarkingsConfirm'), (result) => {
                    if (result) {
                        process = new flexygo.Process('pEmployeeDate_ChangePlanification_NewShift');
                        params.push({ "Key": 'Date', "Value": plannerDate });
                        params.push({ "Key": 'CurrentReference', "Value": flexygo.context.currentReference });
                        params.push({ "Key": 'EmployeeId', "Value": groupId });
                        params.push({ "Key": 'NewShift', "Value": shiftId });
                        process.run(params, (ret) => {
                            if (ret) {
                                if (ret.LastException) {
                                    flexygo.msg.warning(ret.LastException.Message);
                                }
                                let planner = $('flx-planner')[0];
                                let modeId = $(planner).find('div#planner-main').attr('modeid');
                                ;
                                planner.refreshCell(modeId, groupId, plannerDate, planner);
                                $(`.pln-cell[datecolumn="${plannerDate}"][rowidvalue="${groupId}"]`).find('.pln-btn-menu').css('color', '#777');
                            }
                        });
                    }
                });
            }
        }
        else {
            process = new flexygo.Process('emp_InsertSelectionEmployeeSchedule');
            params.push({ "Key": 'Day', "Value": plannerDate });
            params.push({ "Key": 'Ids', "Value": shiftId });
            params.push({ "Key": 'EmployeeId', "Value": groupId });
            process.run(params, (ret) => {
                if (ret) {
                    if (ret.LastException) {
                        flexygo.msg.warning(ret.LastException.Message);
                    }
                    let planner = $('flx-planner')[0];
                    let modeId = $(planner).find('div#planner-main').attr('modeid');
                    ;
                    planner.refreshCell(modeId, groupId, plannerDate, planner);
                    $(`.pln-cell[datecolumn="${plannerDate}"][rowidvalue="${groupId}"]`).find('.pln-btn-menu').css('color', '#777');
                }
            });
        }
    };
    let employeePlanificationEntity = new flexygo.obj.Entity('Emp_Month_Planner');
    let planificationData = employeePlanificationEntity.getView('Emp_Month_PlannerDefaultList', 0, 1000, `vEmployeeMonthPlanner.EmployeeId = ${groupId} AND vEmployeeMonthPlanner.DateValue = '${plannerDate}'`, null, null, null, null);
    if (planificationData.length > 0 && planificationData[0]["Alias"] == 'FES') {
        // Es festivo: pedir confirmación
        let confMsg = "";
        if ($(triggerElement).find('div.shiftdata').attr('workonfestive') == 'true') {
            confMsg = "Estás insertando una planificación en un día festivo. ¿Quieres continuar?";
        }
        else {
            confMsg = `Estás insertando una planificación en un día festivo y el turno que estás intentando insertar no comprueba la asistencia en festivos,
            por lo que el empleado seguirá viendo el día como festivo y no se comprobará su asistencia. ¿Quieres continuar?`;
        }
        flexygo.msg.confirm(confMsg, (result) => {
            if (result) {
                executeInsertLogic();
            }
        });
    }
    else {
        // No es festivo: ejecutar directamente
        executeInsertLogic();
    }
}
function plannerInsertGroupSchedule(mode, entity, groupId, plannerDate, triggerElement) {
    let sGroupId, sShiftId;
    if (mode === 'group') {
        sShiftId = entity.data.ShiftId.Value;
        sGroupId = groupId;
    }
    else if (mode === 'shift') {
        sGroupId = entity.data.GroupId.Value;
        sShiftId = groupId;
    }
    let process = new flexygo.Process('emp_insertGroupScheduleSelection');
    let params = new Array();
    params.push({ "Key": 'Day', "Value": plannerDate });
    params.push({ "Key": 'shiftId', "Value": sShiftId });
    params.push({ "Key": 'groupId', "Value": sGroupId });
    params.push({ "Key": 'Mode', "Value": mode });
    process.run(params, (ret) => {
        if (ret) {
            if (ret.LastException) {
                flexygo.msg.warning(ret.LastException.Message);
            }
            else {
                let planner = $('flx-planner')[0];
                let modeId = $(planner).find('div#planner-main').attr('modeid');
                ;
                planner.refreshCell(modeId, groupId, plannerDate, planner);
            }
        }
    }, 'current', true, triggerElement);
}
function plannerMoveEmployeeSchedule(entity, groupId, plannerDate, triggerElement) {
    let oldEmployee = entity.data.EmployeeId.Value;
    let oldDate = moment(entity.data.Date.Value).format('YYYY-MM-DD');
    let planner = $('flx-planner')[0];
    let modeId = $(planner).find('div#planner-main').attr('modeid');
    if (plannerDate >= moment().format('YYYY-MM-DD') && oldDate >= moment().format('YYYY-MM-DD')) {
        let params = new Array();
        let process = new flexygo.Process('emp_pUpdateSchedule');
        params.push({ "Key": 'ScheduleType', "Value": 'employee' });
        params.push({ "Key": 'ScheduleId', "Value": entity.data.EmployeeScheduleId.Value });
        params.push({ "Key": 'TargetId', "Value": groupId });
        params.push({ "Key": 'ScheduleDate', "Value": plannerDate });
        process.run(params, (ret) => {
            if (!ret) {
                if (ret.WarningMessage || ret.LastException) {
                    flexygo.msg.warning(flexygo.localization.translate('emp.cantUpdateSchedule'));
                }
            }
            planner.refreshCell(modeId, groupId, plannerDate, planner);
            planner.refreshCell(modeId, oldEmployee, oldDate, planner);
        }, 'current', true, $(this));
    }
    else {
        planner.refreshCell(modeId, oldEmployee, oldDate, planner);
        flexygo.msg.warning(flexygo.localization.translate('emp.cannotModifyPastPlanification'));
    }
}
function cloneGroupSchedule(groupId, plannerDate, triggerElement, filterField) {
    let objwhere = `Groups_Schedule.Date = '${plannerDate}' AND Groups_Schedule.${filterField} = ${groupId}`;
    flexygo.nav.execProcess('emp_cloneGroupScheduleCol', 'emp_Groups_Schedule', objwhere, `{'Date':'${plannerDate}'}`, null, 'slideright', false, triggerElement);
}
function cloneEmployeeSchedules(groupId, plannerDate, triggerElement) {
    flexygo.nav.execProcess('CloneEmployeeScheduleCollection', 'emp_Employees_Schedules', `Employees_Schedule.[Date] = '${plannerDate}' AND Employees_Schedule.EmployeeId = '${groupId}'`, `{'Date':'${plannerDate}'}`, null, 'slideright', false, triggerElement);
}
function DeleteEmployeeSchedules(groupId, plannerDate, triggerElement) {
    flexygo.nav.execProcess('emp_DeleteEmployeeScheduleCollection', 'emp_Employees_Schedules', `Employees_Schedule.[Date] = '${plannerDate}' AND Employees_Schedule.EmployeeId = '${groupId}'`, `{'Date':'${plannerDate}'}`, null, 'slideright', false, triggerElement, (e) => {
        let planner = $('flx-planner')[0];
        let modeId = $(planner).find('div#planner-main').attr('modeid');
        ;
        planner.refreshCell(modeId, groupId, plannerDate, planner);
    });
}
function filterOrganizationalUnitsPlannerFilter(element) {
    let defaults = sebastian.utils.parseDefaults(element);
    let unitId = defaults.UnitId;
    let employeeCombo = $('flx-multicombo[object="emp_vHR_Employee"][property="EmployeeId"]')[0];
    if (employeeCombo) {
        employeeCombo.additionalWhere = `EmployeeId IN (SELECT EmployeeId FROM vHR_Employee WHERE UnitId = ${unitId})`;
        employeeCombo.refresh();
    }
    let groupsCombo = $('flx-multicombo[object="emp_vHR_Employee"][property="GroupId"]')[0];
    if (groupsCombo) {
        groupsCombo.additionalWhere = `Groups.UnitId = ${unitId}`;
        groupsCombo.refresh();
    }
    let shiftsCombo = $('flx-multicombo[object="emp_Shift"][property="ShiftId"]')[0];
    if (shiftsCombo) {
        shiftsCombo.additionalWhere = `Shifts.UnitId = ${unitId} OR Shifts.UnitId IS NULL`;
        shiftsCombo.refresh();
    }
}
function toggleFestiveDayMarkings(element, DayDate, EmployeeId, markedAsFestive) {
    if (markedAsFestive) {
        let proc = new flexygo.Process('hr_pEmployeeDate_ChangeFestiveWorked', null, null);
        let params = new Array();
        params.push({ "Key": 'EmployeeId', "Value": EmployeeId });
        params.push({ "Key": 'DayDate', "Value": DayDate });
        proc.run(params, (ret) => {
            if (ret) {
                flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
                $(element).closest('flx-list')[0].refresh();
                $('flx-list[modulename="MOD_HR_Employee_Daydate"]')[0].refresh();
            }
        });
    }
    else {
        flexygo.nav.openProcessParams('hr_pEmployeeDate_ChangeFestiveWorked', null, null, `{'EmployeeId':'${EmployeeId}', 'DayDate':'${DayDate}'}`, 'sliderightx850', false, $(element));
    }
}
function fillEmployeesHolidaysFromEmployeeWizard(EmployeeId, roundHolidays) {
    let params = new Array();
    //let entity = new flexygo.obj.Entity('emp_vHR_Employees', `vHR_Employee.EmployeeId in(${EmployeeId})`);
    let process = new flexygo.Process('Emp_FillHolidays', 'emp_vHR_Employees', `vHR_Employee.EmployeeId in(${EmployeeId})`);
    //params.push({ "Key": 'Entity', "Value": entity });
    params.push({ "Key": 'Year', "Value": moment().year() });
    params.push({ "Key": 'RoundDecimals', "Value": roundHolidays });
    process.run(params, (ret) => {
        if (ret) {
            if (ret.Success) {
                flexygo.msg.success(flexygo.localization.translate('emp.employeeCreated'));
            }
            else {
                flexygo.msg.warning(flexygo.localization.translate('emp.employeeCreatedHolidaysError'));
            }
        }
    }, 'current', true, $(this));
}
function showSelectedRowsMarkings(elem) {
    let checkedIds = flexygo.selection.getArray('emp_vHR_Employee_Daydate');
    $(elem).find('.counter-btn span').html(checkedIds.length.toString());
}
function selectAllListRowsMarkings(modulename, moduleType, element) {
    //sebastian.utils.selectAllListRows(modulename, moduleType, element)
    let moduleData = $(`${moduleType}[modulename="${modulename}"]`)[0].data;
    let module = $(`flx-module[modulename="${modulename}"]`)[0];
    let defaults = sebastian.utils.parseDefaults(element);
    let dayDate = defaults["DayDate"];
    let employeesIds = moduleData.map(employee => employee.EmployeeId);
    if (employeesIds.length > 0) {
        //flexygo.utils.getModule(element)
        module.bagSelectionAll('emp_vHR_Employee_Daydate', `(vHR_Employee_Daydate.DateJourney = '${dayDate}' AND vHR_Employee_Daydate.EmployeeId in (${employeesIds.join(', ')}))`, $(module), $(element));
    }
}
function removeEmployeesHolidays(processname, objectname, objectwhere, targetid, excludeHist, triggerElement, currentProcess, eventData) {
    var holidayObj = new flexygo.obj.Entity(objectname, objectwhere);
    holidayObj.read();
    let InsId = holidayObj.data.InsId.Value;
    let RegId = holidayObj.data.RegId.Value;
    let InsIdHolidaysEntity = new flexygo.obj.Entity(objectname, '');
    let InsIdHolidays = InsIdHolidaysEntity.getView("HR_Simple_EmployeeHoliday_List", 0, 10, `Employees_Holidays.InsId='${InsId}' AND Employees_Holidays.RegId <> '${RegId}'`);
    // Crear el listener ANTES de hacer el delete
    let deleteHandler = (e) => {
        if (e.class === "entity" && e.type === "deleted" && e.masterIdentity === objectname) {
            // Remover el listener inmediatamente
            flexygo.events.off(this, "entity", "deleted", deleteHandler);
            // El sender es la entidad completa, las propiedades están directamente en ella
            let entity = e.sender;
            // Verificar si hay JSCode y ejecutarlo
            if (entity.jsCode) {
                eval(entity.jsCode);
            }
            // Verificar si hay warningMessage
            if (entity.warningMessage) {
                flexygo.msg.warning(entity.warningMessage);
            }
            // Verificar si hay successMessage
            if (entity.successMessage) {
                flexygo.msg.success(entity.successMessage);
            }
        }
    };
    // Registrar el listener usando el sistema de eventos de Flexygo
    flexygo.events.on(this, "entity", "deleted", deleteHandler);
    if (InsIdHolidays.length > 0) {
        flexygo.msg.confirm(flexygo.localization.translate("warnings.removeHolidays"), (result) => {
            if (result) {
                holidayObj.delete();
            }
            else {
                // Si cancela, remover el listener
                flexygo.events.off(this, "entity", "deleted", deleteHandler);
            }
        });
    }
    else {
        holidayObj.delete();
    }
}
// REPORTS **************************************
function viewReport_LibroRegistroJornada(element) {
    // R18 · Libro de Registro de Jornada — lanzamiento directo sin pantalla de parámetros.
    // 1. Fuente primaria: defaults del módulo que contiene el botón disparador.
    //    execProcess inyecta EmployeeId, StartDate y EndDate en los objectdefaults del módulo.
    let moduleDefaults = sebastian.utils.parseDefaults($(element).closest('flx-module'));
    let employeeId = moduleDefaults.EmployeeId || null;
    let startDateRaw = moduleDefaults.StartDate || null;
    // 2. Fuentes de respaldo para EmployeeId
    if (!employeeId) {
        // Fuente 2a: objectwhere del módulo de fichajes (pantalla de jornada diaria)
        let markingsModule = $('flx-module[modulename="emp_hr_Employee_Markings"]')[0];
        if (markingsModule && markingsModule.objectwhere) {
            let match = markingsModule.objectwhere.match(/EmployeeId\s*=\s*(\d+)/);
            if (match)
                employeeId = match[1];
        }
    }
    if (!employeeId) {
        // Fuente 2b: defaults de la página principal (CV del empleado)
        let pageDefaults = sebastian.utils.parseDefaults($('main'));
        if (pageDefaults.EmployeeId)
            employeeId = pageDefaults.EmployeeId;
        if (!startDateRaw && pageDefaults.StartDate)
            startDateRaw = pageDefaults.StartDate;
    }
    // Fuente 3: currentReference (usuario logueado, válido en "Mi Jornada")
    if (!employeeId) {
        employeeId = flexygo.context.currentReference;
    }
    // 3. Calcular el período a partir de StartDate (acepta YYYYMMDD o YYYY-MM-DD) o mes actual
    let periodStr;
    if (startDateRaw && startDateRaw.length >= 6) {
        let normalized = startDateRaw.replace(/-/g, '');
        let y = normalized.substring(0, 4);
        let m = normalized.substring(4, 6);
        periodStr = `${y}-${m}`;
    }
    else {
        let now = new Date();
        let m = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
        periodStr = `${now.getFullYear()}-${m}`;
    }
    // 4. Abrir ventana con pantalla de carga para evitar popup blocker y about:blank
    let pdfWindow = window.open('about:blank', '_blank');
    if (pdfWindow) {
        pdfWindow.document.write(`<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><title>Generando informe...</title>
<style>
  body { margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
         height:100vh; font-family:Segoe UI,sans-serif; background:#f4f6fa; color:#444; }
  .spinner { width:48px; height:48px; border:5px solid #d0d8e8; border-top-color:#1a56a0;
             border-radius:50%; animation:spin 0.9s linear infinite; margin-bottom:20px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  p { font-size:15px; margin:0; } small { font-size:11px; color:#888; margin-top:6px; }
</style></head><body>
  <div class="spinner"></div>
  <p>Generando el Libro de Registro de Jornada&hellip;</p>
  <small>El PDF se abrirá automáticamente en esta pestaña.</small>
</body></html>`);
        pdfWindow.document.close();
    }
    // 5. Ejecutar directamente el proceso
    let empWhere = `vHR_Employee.EmployeeId = ${employeeId}`;
    let process = new flexygo.Process('LibroRegistroJornada_PDF', 'emp_vHR_Employees', empWhere);
    let params = [
        { "Key": "periodStr", "Value": periodStr },
        { "Key": "soloValidadosStr", "Value": "false" }
    ];
    sebastian.utils.addLock(15000);
    process.run(params, (ret) => {
        sebastian.utils.removeLock();
        if (ret) {
            if (ret.LastException) {
                if (pdfWindow)
                    pdfWindow.close();
                flexygo.msg.warning(ret.LastException.Message);
            }
            else if (ret.JSCode) {
                // Extraer la URL del window.open del JSCode retornado
                let urlMatch = ret.JSCode.match(/window\.open\('([^']+)'/);
                if (urlMatch && pdfWindow) {
                    pdfWindow.location.href = urlMatch[1];
                }
                else {
                    if (pdfWindow)
                        pdfWindow.close();
                    eval(ret.JSCode);
                }
            }
            else {
                if (pdfWindow)
                    pdfWindow.close();
            }
        }
        else {
            if (pdfWindow)
                pdfWindow.close();
        }
    });
}
function EditEmployeesDocumentsSignerConfFormAfterLoad() {
    $('.MessageId1-label').empty();
    $('.MessageId1-input').html(`<div style="font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 8px; padding: 20px; max-width: 600px; background-color: #f9f9f9;">
  <h2 class="txt-info"><i class="flx-icon icon-information-3"></i> Atención</h2>
  <div>El <b>primer firmante</b> es el empleado al que corresponde el documento y no se tiene que configurar.</div>
</div>
`);
}
function drawConfigureDocumentsSignerButton(module) {
    let btn;
    module.find("table").find("tr").each((index, elem) => {
        let trIndex = module.find("table").find("tr")[index];
        if (!$(trIndex).hasClass('rowInsert') && !$(trIndex).hasClass('rowHeader')) {
            let signerId = $(elem).find('td flx-text[property="SignerId"]').val();
            let category = $(elem).find('td flx-text[property="CategoryId"]').val();
            let objectname = $(elem).find('td flx-dbcombo[property="ObjectName"]').val();
            let AbhSignReportId = $(elem).find('td flx-text[property="AbhSignReportId"]').val();
            let config = new flexygo.obj.Entity("HR_EmployeesDocuments_SignerConf", `AbhSignReportId = '${AbhSignReportId}'`);
            let btnClass = "";
            config.read();
            if (config.data.AbhSignReportId.Value == null && signerId != 1) {
                btnClass = 'bg-danger';
            }
            btn = $(`<button class="btn btn-default ${btnClass}" type="button" title="Configuración del firmante"
                onclick="flexygo.nav.openPage('edit', 'HR_EmployeesDocuments_SignerConf', 'AbhSignReportId = \\'${AbhSignReportId}\\'', '{\\'AbhSignReportId\\':\\'${AbhSignReportId}\\',\\'ObjectName\\':\\'${objectname}\\',\\'SignerId\\':\\'${signerId}\\',\\'CategoryId\\':\\'${category}\\'}','sliderightx50p',false)">
                    <i class="flx-icon icon-user-21"/>
                </button>`);
            $(trIndex).find(".btn-group").append(btn);
        }
    });
}
function filterHourAttributesList(elem, oWhere) {
    let list = $('flx-list[modulename="HR_HourTypesAttributes_List"]')[0];
    list.additionalWhere = oWhere;
    list.refresh();
    list.closest('flx-module').setAttribute('filtered', "true");
}
function filterHourAttributesListRemoveFilter() {
    let list = $('flx-list[modulename="HR_HourTypesAttributes_List"]')[0];
    list.additionalWhere = '1=1';
    list.refresh();
    list.closest('flx-module').removeAttribute('filtered');
}
function paintHourAttributesListsRows(elem) {
    $('.emp-row-list').css('background-color', 'white');
    if ($(elem).attr("filtered")) {
        let list = $('flx-list[modulename="HR_HourTypesAttributes_List"]')[0];
        let data = list.data;
        $(data).each((index, el) => {
            $(`.parentList[HourTypeId = ${el["HourTypeId"]}]`).css('background-color', '#cbd4de');
            $(`.parentList[HourAttributeId = ${el["HourAttributeId"]}]`).css('background-color', '#cbd4de');
        });
    }
    else {
        $('.filterListBtn').hide();
    }
}
function documentsConfirmDeliveryShowButton() {
    let module = $('flx-module[modulename="emp_DocumentArticleContent"]');
    let view = $(module).find("flx-view")[0];
    let insertedBy = view.data.InsertedBy.Value;
    let btn = $(module).find('button.visibilityBtn');
    let roles = ['admins', 'hresources', 'hresourcesLow'];
    if (insertedBy == flexygo.context.currentReference || roles.indexOf(flexygo.context.currentRoleId) != -1) {
        btn.addClass('shown');
    }
    else {
        btn.addClass('hidden');
    }
}
function GenerateAbsencePendingJustificationBatch(elem, DayDate) {
    debugger;
    let list = $(elem).closest('flx-module').find('flx-list')[0];
    let checkedEmployees = flexygo.selection.getArray('emp_Employee');
    let proc = new flexygo.Process('pEmployeeDate_Generate_AllJourney_AbsencePendingJustification', null, null);
    let params = new Array();
    params.push({ "Key": 'DayDate', "Value": DayDate });
    params.push({ "Key": 'CurrentReference', "Value": flexygo.context.currentReference });
    if (flexygo.utils.isBlank(checkedEmployees)) {
        flexygo.msg.confirm(flexygo.localization.translate('messages.holidaysunplannedabsences'), (result) => {
            if (result) {
                proc.run(params, (ret) => {
                    list.refresh();
                    $('flx-list[modulename="hr_PlannedAbsencesDaily"]')[0].refresh();
                });
            }
        });
    }
    else {
        params.push({ "Key": 'EmployeesIds', "Value": checkedEmployees.join(',') });
        proc.run(params, (ret) => {
            list.refresh();
            flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone("emp_employee", null, flexygo.utils.getModule('flx-list'), $(this));
            flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone("emp_vHR_Employee", null, flexygo.utils.getModule('flx-list'), $(this));
            $('flx-list[modulename="hr_PlannedAbsencesDaily"]')[0].refresh();
        });
    }
}
function GenerateMarkingsAccordingToPlanning(elem, DayDate) {
    debugger;
    let checkedEmployees = flexygo.selection.getArray('emp_Employee');
    if (flexygo.utils.isBlank(checkedEmployees)) {
        flexygo.msg.confirm(flexygo.localization.translate('messages.markingsunplannedabsences'), (result) => {
            if (result) {
                flexygo.nav.execProcess("pEmployeeDate_Generate_AllJourney_Markings_AccordingToPlanning", null, null, `{'DayDate':'${DayDate}','CurrentReference':'${flexygo.context.currentReference}','EmployeesIds':''}`, null, "sliderightx800", false, $(elem));
            }
        });
    }
    else {
        flexygo.nav.execProcess("pEmployeeDate_Generate_AllJourney_Markings_AccordingToPlanning", null, null, `{'DayDate':'${DayDate}','CurrentReference':'${flexygo.context.currentReference}','EmployeesIds':'${checkedEmployees.join(',')}'}`, null, "sliderightx800", false, $(elem));
    }
}
function addACMEmployeesBatch(element) {
    let checkedEmployees = flexygo.selection.getArray('emp_Employee');
    let employeesIds = checkedEmployees.join(',');
    let defaults = sebastian.utils.parseDefaults($(element).closest('main'));
    let ACMId = defaults.ACMId;
    if (employeesIds == null || employeesIds == '') {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectAtLeastOneEmployee'));
    }
    else {
        flexygo.nav.execProcess("pACM_AddACMEmployeesBatch", null, null, `{'ACMId':'${ACMId}','CurrentReference':'${flexygo.context.currentReference}','EmployeesIds':'${checkedEmployees.join(',')}'}`, null, "sliderightx800", false, $(element));
        flexygo.nav.closePage($(element));
    }
}
function removeACMEmployeesBatch(element) {
    let checkedRegIds = flexygo.selection.getArray('HR_AccessControlManagement_Employee');
    let RegIds = checkedRegIds.join(',');
    let defaults = sebastian.utils.parseDefaults($(element).closest('main'));
    let ACMId = defaults.ACMId;
    if (RegIds == null || RegIds == '') {
        flexygo.msg.warning(flexygo.localization.translate('emp.selectAtLeastOneEmployee'));
    }
    else {
        flexygo.nav.execProcess("pACM_RemoveACMEmployeesBatch", null, null, `{'ACMId':'${ACMId}','RegIds':'${checkedRegIds.join(',')}'}`, null, "sliderightx800", false, $(element));
        $('flx-list[modulename="HR_AccessControlManagement_Employees"]')[0].refresh();
    }
}
function CoursesChangeStarsScore(elem, score) {
    debugger;
    let stars = $('.starsMainCont .scoreStar');
    //stars.removeClass('txt-warning').addClass('txt-muted')
    $('flx-text[property="Score"]').val(score);
    $(stars).each((index, star) => {
        const starScore = Number(star.getAttribute("score"));
        if (starScore <= score) {
            star.classList.add("txt-warning"); // clase que quieras añadir
            star.classList.remove("txt-muted"); // quitar muted, si aplica
        }
        else {
            star.classList.add("txt-muted");
            star.classList.remove("txt-warning");
        }
    });
}
//EMPLOYEES PAGE DOCUMENTS
const listFilters = {};
function filterEmployeeDocumentListByFolder(CategoryId, filteredListModuleName, elem) {
    let list = $(`flx-list[modulename="${filteredListModuleName}"]`)[0];
    // Inicializar filtros si no existen
    if (!listFilters[filteredListModuleName]) {
        listFilters[filteredListModuleName] = { categories: [], textSearch: null };
    }
    // Gestionar las categorías
    const categoryIndex = listFilters[filteredListModuleName].categories.indexOf(CategoryId);
    if (categoryIndex !== -1) {
        listFilters[filteredListModuleName].categories.splice(categoryIndex, 1);
        $(elem).find('.hr-card').removeClass('active');
        $(elem).removeClass('bold');
    }
    else {
        listFilters[filteredListModuleName].categories.push(CategoryId);
        $(elem).find('.hr-card').addClass('active');
        $(elem).addClass('bold');
    }
    // Aplicar los filtros combinados
    applyFilters(list, filteredListModuleName);
}
function filterEmployeePageDocumentsList(elem) {
    let listDocs = $(elem).closest("flx-module").find('flx-list[modulename="HR_OnlyDocuments_EmployeeSpace"]')[0];
    let listCat = $(elem).closest("flx-module").find('flx-list[modulename="HR_SysDocumentsCategories_FolderList"]')[0];
    let searchText = $(elem).val();
    const moduleNameDocs = "HR_OnlyDocuments_EmployeeSpace";
    const moduleNameCat = "HR_SysDocumentsCategories_FolderList";
    // Inicializar filtros si no existen
    if (!listFilters[moduleNameDocs]) {
        listFilters[moduleNameDocs] = { categories: [], textSearch: null };
    }
    if (!listFilters[moduleNameCat]) {
        listFilters[moduleNameCat] = { categories: [], textSearch: null };
    }
    // Actualizar el filtro de texto
    listFilters[moduleNameDocs].textSearch = flexygo.utils.isBlank(searchText) ? null : searchText;
    listFilters[moduleNameCat].textSearch = flexygo.utils.isBlank(searchText) ? null : searchText;
    // Aplicar los filtros combinados
    applyFilters(listDocs, moduleNameDocs);
    applyFilters(listCat, moduleNameCat);
}
function applyFilters(list, moduleName) {
    if (!listFilters[moduleName]) {
        listFilters[moduleName] = { categories: [], textSearch: null };
    }
    let filters = [];
    // Filtro de categorías
    if (listFilters[moduleName].categories.length > 0) {
        const categoryFilters = listFilters[moduleName].categories.map(function (id) {
            return `D.CategoryId = '${id}'`;
        }).join(' OR ');
        filters.push(listFilters[moduleName].categories.length > 1 ? `(${categoryFilters})` : categoryFilters);
    }
    // Filtro de texto
    if (!flexygo.utils.isBlank(listFilters[moduleName].textSearch)) {
        filters.push(`D.Name like '%${listFilters[moduleName].textSearch}%'`);
    }
    if (filters.length > 0) {
        list.additionalWhere = filters.join(' AND ');
    }
    else {
        list.additionalWhere = null;
    }
    list.refresh();
}
function restoreActiveCategoryStyles(moduleName) {
    // Verificar si hay categorías activas para este módulo
    if (!listFilters[moduleName] || listFilters[moduleName].categories.length === 0) {
        return;
    }
    // Obtener las categorías activas
    const activeCategories = listFilters[moduleName].categories;
    // Recorrer cada categoría activa y aplicar las clases
    activeCategories.forEach(function (categoryId) {
        const elem = $(`[categoryid="${categoryId}"]`);
        if (elem.length > 0) {
            elem.find('.hr-card').addClass('active');
            elem.addClass('bold');
        }
    });
}
//END EMPLOYEES PAGE DOCUMENTS
function updateDocumentEmployeeIdNumber(regId, element) {
    let entity = new flexygo.obj.Entity('HR_OpenAI_DocumentsUploads_Split', `OpenAI_DocumentsUploads_Splits.RegId = '${regId}'`);
    let employeeId = $(element).val();
    if (entity.read()) {
        entity.data['EmployeeId'].Value = employeeId;
        entity.data['SuccessLink'].Value = !flexygo.utils.isBlank(employeeId);
        if (entity.update()) {
            if (!flexygo.utils.isBlank(employeeId)) {
                $(element).closest('.doc-header-cnt').find('.isSuccess').removeClass('hidden');
                $(element).closest('.doc-header-cnt').find('.isFailed').addClass('hidden');
            }
            else {
                $(element).closest('.doc-header-cnt').find('.isSuccess').addClass('hidden');
                $(element).closest('.doc-header-cnt').find('.isFailed').removeClass('hidden');
            }
        }
    }
}
function plannerAfterLoad(elem) {
    let planner = $(elem).find('flx-planner');
    planner.find('#planner-withoutgroup-fold').on('click', () => {
        let itemsWithoutGroup = planner.find('#planner-withoutgroup');
        (itemsWithoutGroup.hasClass('folded')) ? $('.hr-pln-drg-filter').removeClass('drg-visible') : $('.hr-pln-drg-filter').addClass('drg-visible');
    });
    sebastian.utils.checkIfPlannerGroupsIsFiltered(elem, '.withCards');
    planner.find('.pln-date-cell[datecolumn]').off('dblclick');
}
function filterPlannerResourcesDraggableList(element, cleaning) {
    var _a;
    let planner = $(element).closest('flx-planner')[0];
    let modeCards = [
        { 'modeid': '840a54eb-9a01-4e82-8ead-72e032b92856', 'modecardid': '6EC9C556-7006-4551-9E07-05A6E3124B5F' },
        { 'modeid': '38c19b3a-0afc-4c44-8c0c-a4908a1a71ca', 'modecardid': 'CA0D9735-7722-4054-9BC7-8C9B84B6D715' }
    ];
    let modeId = $('div#planner-main').attr('modeid');
    let modeCardId = (_a = modeCards.find(x => x.modeid === modeId)) === null || _a === void 0 ? void 0 : _a.modecardid;
    let aWhere;
    if (!cleaning) {
        aWhere = sebastian.utils.getFilterString(element, true, '.hr-pln-drg-filter');
    }
    else {
        sebastian.utils.cleanCustomFilters(element, '.hr-pln-drg-filter');
        aWhere = null;
    }
    planner.draggableFilter = aWhere;
    planner.refreshDraggrableGroup(modeCardId);
    //}
    //plannerModule.setAttribute('startdate', startDate);
    //plannerModule.setAttribute('enddate', endDate);
}
function initAllDayDateDashboardList(element) {
    if (flexygo.utils.isBlank($('flx-text#startdate').val()) && flexygo.utils.isBlank($('flx-text#enddate').val())) {
        flexygo.msg.warning(flexygo.localization.translate('emp.filterByDateRequired'));
    }
    else {
        let startDate = moment($('flx-text#startdate').val()).format('YYYYMMDD');
        let endDate = moment($('flx-text#enddate').val()).format('YYYYMMDD');
        let where = sebastian.utils.getFilterString(element, true, '#mainFilter');
        flexygo.nav.openPageName('HR_Markings_DayDate_List', 'vHR_Employee_Daydates', where, `{'StartDate':'${startDate}','EndDate':'${endDate}'}`, 'current', true, $(this));
    }
}
function setDoughnutChart() {
    var dataforLineEx = {
        labels: ['Datos 1', 'Datos 2', 'Datos 3', 'Datos 4', 'Datos 5', 'Datos 6', 'Datos 7'],
        datasets: [{
                fillColor: 'rgba(0,0,0,0)',
                backgroundColor: 'rgba(151,187,205,0.5)',
                borderColor: 'rgba(151,187,205,0.5)',
                data: [60, 10, 40, 30, 80, 30, 20]
            }, {
                fillColor: 'rgba(0,0,0,0)',
                backgroundColor: "rgba(220,220,220,0.7)",
                borderColor: "rgba(220,220,220,0.7)",
                data: [20, 30, 80, 20, 40, 10, 60]
            }]
    };
    let chart = new flexygo.ui.wc.FlxChartElement();
    chart.data = dataforLineEx;
    chart.init();
}
function deleteDocumentByGuid(element) {
    // Obtener los atributos del elemento 
    debugger;
    let docGuid = $(element).attr('docguid');
    let objectName = $(element).attr('objectname');
    let objectId = $(element).attr('objectid');
    // Validar que los atributos existan
    if (!docGuid || !objectName || !objectId) {
        flexygo.msg.warning(flexygo.localization.translate('documents.missingData'));
        return;
    }
    // Pedir confirmación al usuario
    flexygo.msg.confirm(flexygo.localization.translate('documents.confirmDelete'), (result) => {
        if (result) {
            let process = new flexygo.Process('HR_DeleteDocumentByGuid');
            let params = new Array();
            params.push({ "Key": 'objectName', "Value": objectName });
            params.push({ "Key": 'objectId', "Value": objectId });
            params.push({ "Key": 'docGuid', "Value": docGuid });
            process.run(params, (ret) => {
                if (ret) {
                    if (ret.LastException) {
                        flexygo.msg.warning(ret.LastException.Message);
                    }
                    else {
                        flexygo.msg.success(flexygo.localization.translate('documents.deleteSuccess'));
                        // Refrescar el módulo/lista actual si existe
                        let module = $(element).closest('flx-module');
                        if (module.length > 0) {
                            let moduleElement = module[0];
                            if (moduleElement && moduleElement.refresh) {
                                moduleElement.refresh();
                            }
                        }
                    }
                }
            });
        }
    });
}
//# sourceMappingURL=emp.js.map