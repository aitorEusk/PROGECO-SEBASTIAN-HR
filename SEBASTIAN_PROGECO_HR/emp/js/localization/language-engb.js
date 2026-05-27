/**
 * @namespace flexygo.culture.engb
 */
var flexygo;
(function (flexygo) {
    var culture;
    (function (culture) {
        var engb;
        (function (engb) {
            engb.presences = {
                day: 'Day',
                workingHours: 'Working hours',
                absenceHours: 'Absence hours',
                workedHours: 'Worked hours',
                difference: 'Difference',
                nonBusinessDay: 'Non-business day',
                holidays: 'Holidays',
                hours: 'Hours',
                days: 'Days'
            };
            engb.warnings = {
                filterHolidays: 'Filter employees to see their holidays/absences',
                removeHolidays: 'This record is integrated into an instance. Deleting it will delete all other days shared by the instance. Do you want to continue?'
            };
            engb.planner = {
                shifts: 'Shifts',
                groups: 'Groups',
                employees: 'Employees',
                shift: 'Shift',
                group: 'Group',
                employee: 'Employee',
                showdetails: 'Show details',
                showdraggables: 'Show draggables',
                today: 'Today',
                week: 'Week',
                month: 'Month',
                absences: 'Absences',
                patterns: 'Patterns',
                deleteplans: 'Delete planifications',
                EmployeeSchedule: 'Employee planification',
                GroupSchedule: 'Group planification',
                OfficePeriods: 'Office period',
                EmployeeRule0: 'Employee rule',
                EmployeePeriods: 'Employee period',
                GroupScheduleFreeDay: 'Group free day',
                PositionPeriods: 'Work place period',
                UnitsPeriods: 'Organizational unit period',
                ScopePeriods: 'Scope period',
                AssistenceShift: 'Recorded shift',
            };
            engb.emp = {
                nocalendar: 'No calendar data',
                deletebtn: 'Remove holiday',
                weeklyBtn: 'Insert weekly holiday',
                excelFileTitle: 'File name',
                excelFileMsg: 'Name the preview excel file',
                noItemsSelected: 'No items selected',
                selectAtLeastOneEmployee: 'You must select at least one employee',
                errorUpdatingShift: 'Error updating shift',
                applyFilterToModifyBalances: 'Please apply a filter to modify the balances.',
                selectCompanyGroupUnitAndDateRange: 'You must select a company, group or unit, and a date range (start and end) to export the data.',
                selectDateRange: 'You must select a date range (start and end) to export the data.',
                cannotChangePlanificationStatus: 'Cannot change the planification of an employee when their markings are in status',
                existingMarkingsConfirm: 'There are already markings for this day. Do you want to re-plan it?',
                cantUpdateSchedule: 'Can\'t update schedule',
                cannotModifyPastPlanification: 'Cannot modify a planification that has already passed.',
                employeeCreated: 'Employee created successfully',
                employeeCreatedHolidaysError: 'The employee was created but there was a problem filling in the total holidays',
                filterByDateRequired: 'A start date and an end date filter are required',
                instanceAbsences: 'Absences',
                instanceHolidays: 'Holidays',
            };
            engb.balance = {
                year: 'Year',
                month: 'Month',
                week: 'Week',
                back: 'Back',
                foward: 'Foward'
            };
            engb.employeemanager = {
                employee: 'Employee',
                employeePersonal: 'Personal data',
                employeeContract: 'Contract',
                employeeOrganization: 'Organization',
                save: 'Save',
                next: 'Next',
                exit: 'Exit',
                empmanagertitle: 'New employee'
            };
            engb.historiclst = {
                selectoption: 'Select an option',
                selectoptionmsg: 'Historic data cannot be generated if no option is selected.'
            };
            engb.months = {
                1: 'January',
                2: 'February',
                3: 'March',
                4: 'April',
                5: 'May',
                6: 'June',
                7: 'July',
                8: 'August',
                9: 'September',
                10: 'Octuber',
                11: 'November',
                12: 'December'
            };
            engb.weekdays = {
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
                sat: 'Sat',
                sun: 'Sun'
            };
            engb.accesspoint = {
                errormsg: 'Employee access code not found',
                exit: 'Exit',
                enter: 'Enter',
                helloexit: 'Hello',
                helloenter: 'Bye',
                lastmarking: 'Your last marking',
                noplanning: 'No planning for today',
                employeeNotFound: 'Employee not found',
                accessIdNotFound: 'Access code not found',
            };
            engb.messages = {
                multipleabsencescalendar: 'There is more than one vacation/absence record for this date, select the one you want to open from the pop-up list.',
                markingsunplannedabsences: 'You have not selected any employee, so markings will be inserted for all unplanned absences. do you want to continue ?',
                holidaysunplannedabsences: 'You have not selected any employee, so an unexcused absence will be inserted for all unplanned absences. do you want to continue? '
            };
            engb.documents = {
                missingData: 'Required data not found to delete the document',
                confirmDelete: 'Are you sure you want to delete this document?',
                deleteSuccess: 'Document successfully deleted'
            };
            engb.incidences = {
                selectResolutionType: 'Please select a resolution type',
                noResolutionType: 'Could not get the resolution type',
                noCurrentReference: 'Could not get the current reference',
                incidencesResolved: 'Incidences resolved successfully'
            };
            engb.workdays = {
                noWorkDaysSelected: 'No workdays selected to validate',
                workDaysValidated: 'Workdays validated successfully',
                noWorkDaysSelectedUndo: 'No workdays selected to unvalidate',
                workDaysUnvalidated: 'Workday validation undone successfully',
                noWorkDaysSelectedBalance: 'No workdays selected to consolidate balance',
                workDaysBalanced: 'Workday balance consolidated successfully',
                noWorkDaysSelectedBalanceUndo: 'No workdays selected to undo balance',
                workDaysBalanceUndone: 'Workday balance undone successfully',
                changeFestiveWorkedAllEmployeesConfirm: 'No elements selected. The process will run for all accessible employees. Do you want to continue?',
                changeFestiveWorkedSuccess: 'Process executed successfully',
                refreshDayDateBatchConfirm: 'No elements selected. The process will run for all accessible employees. Do you want to continue?',
                refreshAllDayDateBatchConfirm: 'No employees selected. The process will run for all accessible employees in the period. Do you want to continue?',
                changePlanificationAllDayDateBatchConfirm: 'No employees selected. The planification will be changed for all accessible employees in the period. Do you want to continue?',
                changePlanificationWrapperBatchConfirm: 'No elements selected. The planification will be changed for all accessible employees on this date. Do you want to continue?',
                changePlanificationWrapperBatchGroupedConfirm: 'No employees selected. The planification will be changed for all accessible employees in the period. Do you want to continue?',
                noEmployeesSelectedCannotExecute: 'No employees selected. Please select at least one employee to execute the process.',
                recalcMetricsDirtyBatchConfirm: 'No elements selected. Metrics will be recalculated for all dirty workdays of accessible employees on this date. Do you want to continue?',
                recalcMetricsDirtyGroupedConfirm: 'No employees selected. Metrics will be recalculated for all dirty workdays of accessible employees in the period. Do you want to continue?',
                recalcMetricsDirtySuccess: 'Dirty workdays recalculated successfully.',
                adminRecalcHistoryRangeConfirm: 'No elements selected. Full recalculation (metrics and incidences) will run for all accessible employees in the date range. Do you want to continue?',
                noHeaderDates: 'No dates found in the header',
                noModuleOrList: 'Module or list not found',
                monthly: 'Monthly',
                weekly: 'Weekly'
            };
            engb.dirtylog = {
                calendar: 'Calendar',
                date: 'Date',
                description: 'Description',
                view: 'View',
                type: 'Type',
                datestart: 'Start date',
                dateend: 'End date',
                reason: 'Reason',
                leavetype: 'Leave type',
                shift: 'Shift',
                breaksigned: 'Break signed',
                workonfestive: 'Work on holidays',
                line: 'Line',
                starttime: 'Start time',
                duration: 'Duration',
                hours: 'hours'
            };
            engb.heatmap = {
                noData: 'No data to display',
                less: 'Less',
                more: 'More',
                date: 'Date',
                healthScore: 'Health Score',
                status: 'Status',
                months: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
                days: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun'
            };
            engb.projects = {
                deleteweekplan: 'Are you sure you want to delete the weekly plan?'
            };
            engb.onlineapp = {
                welcome: 'Welcome to Sebastian',
                goodbye: 'Goodbye'
            };
            engb.climatepulse = {
                good: 'Good',
                neutral: 'Neutral',
                difficult: 'Difficult',
                send: 'Send',
                thanks: 'Thank you for sharing!',
                'comment.placeholder': 'Optional short comment...'
            };
            engb.testdatawizard = {
                title: 'Demo Data Generator',
                detecting: 'Detecting...',
                stepConfig: 'Configuration',
                stepPreview: 'Preview',
                stepResult: 'Result',
                restrictedTitle: 'Restricted Access',
                restrictedMsg1: 'Operational data has been detected in the database.',
                restrictedMsg2: 'For security reasons, <strong>generating test data</strong> on a live installation is not allowed.',
                backToHome: 'Back to Home',
                sectorLabel: '1. Select Sector',
                sectorOffices: 'Offices',
                sectorManufacturing: 'Manufacturing',
                sectorServices: 'Services',
                volumeLabel: '2. Employee Volume',
                volumeHint: 'Slide to adjust between 10 and 200 employees.',
                structureLabel: '3. Structural Options',
                multiCompany: 'Multi-company',
                multiOffice: 'Multi-office',
                circuitsLabel: '4. Data to Generate',
                circuitOrg: 'Organisational Structure',
                circuitEmployees: 'Employees & Profiles',
                circuitShifts: 'Shifts & Calendars',
                circuitAbsences: 'Demo Absences',
                circuitMarkings: 'Historical Markings (2 months)',
                circuitContracts: 'Contracts (PRO)',
                next: 'Next',
                previewTitle: 'Generation Review',
                previewDesc: 'Please confirm the data before launching the process. This process may take a few seconds.',
                previewSummary: 'Summary',
                previewSector: 'Sector:',
                previewStructure: 'Structure:',
                previewVolume: 'Volume:',
                previewEmployeesEst: 'Employees (estimated)',
                previewMode: 'Mode:',
                previewDetails: 'Details:',
                timeEstimate: 'Estimated time: <strong>30-60 seconds</strong>. Do not close this window.',
                back: 'Back',
                generate: 'Generate Data',
                generating: 'Generating data...',
                pleaseWait: 'Please wait',
                successTitle: 'Generation Complete!',
                companies: 'Companies',
                offices: 'Offices',
                employees: 'Employees',
                historicYears: 'Historic Years',
                demoModeTitle: 'Demo mode active',
                demoModeWarning: 'While test data is present in the system, any data inserted manually in the application will also be deleted when you click <em>Delete Data</em>. The database will be left completely empty.',
                deleteData: 'Delete Data',
                finish: 'Finish',
                licensePrefix: 'Licence: ',
                testDataActive: 'Test Data Active',
                generationComplete: 'Generation complete',
                confirmDelete: 'Are you sure you want to DELETE the generated data?',
                deletingData: 'Deleting data...',
                errorGenerating: 'Error generating data: ',
                errorDeleting: 'Error deleting data: ',
                detailsBase: 'Base data, Employees, Shifts, Absences',
                detailsMarkings: ', Markings',
                detailsContracts: ', Contracts',
                structureCompany: '1 Company',
                structureCompanies: ' Companies',
                structureOffice: ', 1 Office/Company',
                structureOffices: ' Offices/Company'
            };
        })(engb = culture.engb || (culture.engb = {}));
    })(culture = flexygo.culture || (flexygo.culture = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=language-engb.js.map