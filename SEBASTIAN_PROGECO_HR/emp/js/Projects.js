var sebastian;
(function (sebastian) {
    var projects;
    (function (projects) {
        //export function initProjectPeriodModules(element, PeriodProjectId) {
        //    let periodsModule = (<flexygo.ui.wc.FlxListElement>$('flx-list[modulename="HR_ProjectPlanningPeriods_Selected"]')[0])
        //    let resourcesList = (<flexygo.ui.wc.FlxListElement>$('flx-list[modulename="HR_ProjectPlanningPeriodsEmployee_List"]')[0])
        //    let slotsList = (<flexygo.ui.wc.FlxListElement>$('flx-list[modulename="HR_Projects_Planning_Periods_TimeSlots_CompactList"]')[0])
        //    let planningList = (<flexygo.ui.wc.FlxListElement>$('flx-list[modulename="HR_ProjectPeriod_WeeklyPlanning"]')[0])
        //    let additionalWhere = `Projects_Planning_Periods.PeriodProjectId = ${PeriodProjectId}`
        //    periodsModule.additionalWhere = additionalWhere;
        //    resourcesList.additionalWhere = additionalWhere;
        //    slotsList.additionalWhere = additionalWhere;
        //    planningList.additionalWhere = additionalWhere;
        //    periodsModule.init();
        //    resourcesList.init();
        //    slotsList.init();
        //    planningList.init();
        //    $(periodsModule).closest('flx-module').removeClass('hidden')
        //    $(resourcesList).closest('flx-module').removeClass('hidden')
        //    $(slotsList).closest('flx-module').removeClass('hidden')
        //    $(planningList ).closest('flx-module').removeClass('hidden')
        //    $(element).find('.emp-row-list').removeClass('.selected-row');
        //    $(element).addClass('.selected-row')
        //}
        function saveProjectPeriodWeekPlanning(element, PeriodProjectId) {
            //sebastian.projects.saveProjectPeriodWeekPlanning($(this),{{PeriodProjectId}})
            const rows = $(element).closest("flx-module").find("tr.prj-row");
            const data = rows
                .map((_, row) => {
                const employeeId = $(row).attr("employeeid");
                return $(row)
                    .find('[dayenable="true"][slotid="null"]')
                    .map((_, e) => {
                    const weekDay = $(e).attr("day");
                    const slotId = $(e).find("flx-combo").val();
                    return {
                        employeeId,
                        weekDay,
                        slotId
                    };
                })
                    .get();
            })
                .get();
            let proc = new flexygo.Process('pHR_Projects_SavePlanningPeriodsEmployeesWeekPlan', null, null);
            let params = new Array();
            params.push({ "Key": 'JsonData', "Value": JSON.stringify(data) });
            params.push({ "Key": 'PeriodProjectId', "Value": PeriodProjectId });
            params.push({ "Key": 'currentReference', "Value": flexygo.context.currentReference });
            proc.run(params, (ret) => {
                $(element).closest('flx-list')[0].refresh();
            });
        }
        projects.saveProjectPeriodWeekPlanning = saveProjectPeriodWeekPlanning;
        function deleteProjectWeekPlanification(element, PeriodProjectId) {
            //sebastian.projects.deleteProjectWeekPlanification($(this),{{PeriodProjectId}})
            flexygo.msg.confirm(flexygo.localization.translate('projects.deleteweekplan'), (result) => {
                if (result) {
                    let proc = new flexygo.Process('pHR_Projects_DeletePlanningPeriodsEmployeesWeekPlan', null, null);
                    let params = new Array();
                    params.push({ "Key": 'PeriodProjectId', "Value": PeriodProjectId });
                    proc.run(params, (ret) => {
                        $(element).closest('flx-list')[0].refresh();
                    });
                }
            });
        }
        projects.deleteProjectWeekPlanification = deleteProjectWeekPlanification;
        function clickProjectWeekPlanDay(element) {
            //sebastian.projects.clickProjectWeekPlanDay($(this))
            $(element).hide();
            $(element).closest('.hr-proj-wd-cnt').find('.hr-proj-cmb').removeClass('hidden');
            $(element).closest('td').attr('slotid', 'null');
        }
        projects.clickProjectWeekPlanDay = clickProjectWeekPlanDay;
        function saveProjectPeriodMonthAndDays(element, PeriodProjectId) {
            //sebastian.projects.saveProjectPeriodMonthAndDays()
            let ProjectPeriod = new flexygo.obj.Entity('HR_ProjectPlanningPeriod', `Projects_Planning_Periods.PeriodProjectId=${PeriodProjectId}`);
            ProjectPeriod.read();
            let properties = $(element).closest('.prj-period-cnt').find('.prj-period-conf [field]');
            properties.each((index, elem) => {
                ProjectPeriod.data[$(elem).attr("field")].Value = $(elem).val();
            });
            ProjectPeriod.update();
            $('flx-list[modulename="HR_ProjectPeriod_WeeklyPlanning"]')[0].refresh();
        }
        projects.saveProjectPeriodMonthAndDays = saveProjectPeriodMonthAndDays;
        function toggleAllChecks(mainInput, inputClass) {
            //sebastian.projects.toggleAllChecks($(this),'')
            const checked = mainInput.val();
            document.querySelectorAll(`.${inputClass} flx-check`).forEach(el => {
                $(el).val(checked);
            });
        }
        projects.toggleAllChecks = toggleAllChecks;
    })(projects = sebastian.projects || (sebastian.projects = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=Projects.js.map