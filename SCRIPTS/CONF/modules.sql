

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ModuleName":"PERS_emp_welcomeEmployee",
	"TypeId":"flx-sqllist",
	"ClassId":"project",
	"ObjectFilter":"(Employees.EmployeeId = {{currentReference}})",
	"Descrip":"PERS Welcome Employee",
	"Title":"Welcome",
	"ContainerId":"none",
	"CollapsibleButton":true,
	"FullscreenButton":true,
	"RefreshButton":true,
	"SearchButton":false,
	"SQlSentence":"SELECT DISTINCT Employees.EmployeeId\r\n',
N', Employees.Photo AS Photo\r\n',
N', Employees.FullName\r\n',
N', Employees.Name\r\n',
N', Employees.Photo AS [flxpath|emp_Employee|Photo]\r\n',
N' , SUBSTRING(Employees.[Name],1,1) + SUBSTRING(Employees.[Surname],1,1) as imgText\r\n',
N', Departments.Descrip as Departament\r\n',
N', PINS.PendingInstances as totalInstances\r\n',
N', PAI.PendingInstances as PendingInstances\r\n',
N', ISNULL(PH.HolidaysCount,0) as PendingHolidays\r\n',
N', ISNULL(AH.HolidaysCount,0) as AcceptedHolidays\r\n',
N', coalesce(Employees_Holidays_Totals.Holidays,0)\r\n',
N'\t+ coalesce(Employees_Holidays_Totals.HolidaysLastYears,0)\r\n',
N'\t+ coalesce(Employees_Holidays_Totals.Adjust,0)\r\n',
N'\t+ coalesce(Employees_Holidays_Totals.BankHolidaysRecognition,0)\r\n',
N'\t+ coalesce(Employees_Holidays_Totals.BagCompensationDays,0)\r\n',
N'\t+ coalesce(Employees_Holidays_Totals.Other,0)\r\n',
N'as TotalHolidays\r\n',
N', CASE WHEN Employees_PersonalData.EmployeeId IS NULL THEN 0 ELSE 1 END AS HasPersonalData\r\n',
N', (SELECT Disabled FROM Instances_Types WHERE TypeId = 0) as PersonalDisabled\r\n',
N', (SELECT Disabled FROM Instances_Types WHERE TypeId = 1) as AddMarkingDisabled\r\n',
N', (SELECT Disabled FROM Instances_Types WHERE TypeId = 2) as ModMarkingDisabled\r\n',
N', (SELECT Disabled FROM Instances_Types WHERE TypeId = 6) as CancelHolidaysDisabled\r\n',
N', (SELECT CASE WHEN COUNT(1) > 0 THEN 1 ELSE 0 END FROM Instances_Types WHERE OriginId > 1 AND ISNULL(Disabled,0) = 0) AS CustomInstances\r\n',
N',    CAST(CASE WHEN ISNULL(Inc.NumberIncident, 0) > 0 THEN 1 ELSE 0 END AS BIT) AS HasIncident\r\n',
N',    ISNULL(Inc.NumberIncident, 0) AS NumberPendingIncidents\r\n',
N', DATEADD(DAY, -ISNULL(Settings.PrevDays, 0), CAST(GETDATE() AS DATE)) AS IncidentStartDate\r\n',
N', DATEADD(DAY, -1, CAST(GETDATE() AS DATE)) AS IncidentEndDate\r\n',
N'FROM Employees\r\n',
N'LEFT JOIN Departments ON Employees.Department = Departments.Department\r\n',
N'LEFT JOIN (SELECT COUNT(*) as PendingInstances, EmployeeId FROM Instances WHERE StatusId = 0 GROUP BY EmployeeId) PINS ON Employees.EmployeeId = PINS.EmployeeId\r\n',
N'LEFT JOIN (SELECT Employees_Holidays.EmployeeId\r\n',
N'\t\t, COUNT(Employees_Holidays.RegId)OVER(PARTITION BY Employees_Holidays.EmployeeId, Employees_Holidays.StatusId) HolidaysCount\r\n',
N'\t\tFROM Employees_Holidays \r\n',
N'\t\tLEFT JOIN Holidays_Status ON Employees_Holidays.StatusId = Holidays_Status.StatusId\r\n',
N'\t\tLEFT JOIN Holidays_Types ON Employees_Holidays.Type = Holidays_Types.Type\r\n',
N'\t\tLEFT JOIN Holidays_Types_Groups ON Holidays_Types.GroupId = Holidays_Types_Groups.GroupId\r\n',
N'\t\tWHERE Holidays_Types_Groups.GroupId = 1 \r\n',
N'\t\tAND YEAR(Employees_Holidays.date) = YEAR(GETDATE()) \r\n',
N'\t\tAND Employees_Holidays.StatusId = 2) PH ON Employees.EmployeeId = PH.EmployeeId\r\n',
N'LEFT JOIN (SELECT COUNT(I.InsId) as PendingInstances, IAM.EmployeeId as EmpManager\r\n',
N'     FROM Instances I\r\n',
N'     LEFT JOIN Instances_Approval_Steps_Managers IAM ON I.InsId = IAM.InsId\r\n',
N'\t LEFT JOIN Instances_Approval_Steps ON I.InsId = Instances_Approval_Steps.InsId AND IAM.step = Instances_Approval_Steps.step\r\n',
N'     WHERE Instances_Approval_Steps.StatusId = 0 and AutoAccepted=0\r\n',
N'     GROUP BY IAM.EmployeeId) PAI ON  Employees.EmployeeId = PAI.EmpManager\r\n',
N'\r\n',
N'LEFT JOIN (SELECT Employees_Holidays.EmployeeId\r\n',
N'\t\t, COUNT(Employees_Holidays.RegId)OVER(PARTITION BY Employees_Holidays.EmployeeId, Employees_Holidays.StatusId) HolidaysCount\r\n',
N'\t\tFROM Employees_Holidays \r\n',
N'\t\tLEFT JOIN Holidays_Status ON Employees_Holidays.StatusId = Holidays_Status.StatusId\r\n',
N'\t\tLEFT JOIN Holidays_Types ON Employees_Holidays.Type = Holidays_Types.Type\r\n',
N'\t\tLEFT JOIN Holidays_Types_Groups ON Holidays_Types.GroupId = Holidays_Types_Groups.GroupId\r\n',
N'\t\tWHERE Holidays_Types_Groups.GroupId = 1 \r\n',
N'\t\tAND YEAR(Employees_Holidays.date) = YEAR(GETDATE()) \r\n',
N'\t\tAND Employees_Holidays.StatusId = 1) AH ON Employees.EmployeeId = AH.EmployeeId\r\n',
N'LEFT JOIN Employees_Holidays_Totals ON Employees.EmployeeId = Employees_Holidays_Totals.EmployeeId AND Employees_Holidays_Totals.Year = YEAR(GETDATE())\r\n',
N'LEFT JOIN Employees_PersonalData ON Employees.EmployeeId = Employees_PersonalData.EmployeeId\r\n',
N'CROSS APPLY (\r\n',
N'    SELECT TRY_CAST(Content AS INT) AS PrevDays \r\n',
N'    FROM Settings \r\n',
N'    WHERE IdSettings = ''PrevDaysIncWarning''\r\n',
N') Settings\r\n',
N'OUTER APPLY (\r\n',
N'    SELECT NumberIncident \r\n',
N'    FROM dbo.fnEmployeeIncidentsInRange(\r\n',
N'        Employees.EmployeeId, \r\n',
N'        DATEADD(DAY, -ISNULL(Settings.PrevDays, 0), CAST(GETDATE() AS DATE)), \r\n',
N'        DATEADD(DAY, -1, CAST(GETDATE() AS DATE)) \r\n',
N'    )\r\n',
N') Inc\r\n',
N'",
	"HTMLText":"<div class=\"col-12\">\r\n',
N'    <div class=\"col-6 col-l-12 emp-flex-Valign\">\r\n',
N'        <div class=\"col-3 hidden-m hidden-m emp-flex-align\">\r\n',
N'            <img src=\"{{Photo|isnull:,{{flxpath|emp_Employee|Photo|url}}}}\"\r\n',
N'                 style=\"max-width: 100px;max-height: 100px;\"\r\n',
N'                 class=\"img-circle hr-box-shadow-s {{Photo|isnull:,clickable}}\"\r\n',
N'                 onclick=\"event.preventDefault();event.stopPropagation();{{Photo|isnull:,sebastian.utils.openImage(''{{flxpath|emp_Employee|Photo|url}}'', ''{{EmployeeId}} {{Fullname}}'')}}\"\r\n',
N'                 title=\"{{translate|See photo}}\"\r\n',
N'                  is=\"flx-img\" alt=\"{{imgText}}\" \/>\r\n',
N'        <\/div>\r\n',
N'        <div class=\"col-9 col-m-12 padding-xl\">\r\n',
N'            <h3 class=\"txt-notify bold margin-bottom-s\" style=\"\">{{translate|Hello}} {{Name}}<\/h3>\r\n',
N'            <span class=\"size-l\">{{Departament}}<\/span>\r\n',
N'        <\/div>\r\n',
N'    <\/div>\r\n',
N'\r\n',
N'    <!--\r\n',
N'    <div class=\"col-6 col-l-12 emp-flex-wrap\">\r\n',
N'\r\n',
N'        <div class=\"col-6 col-l-12 emp-flex-wrap padding-m\">\r\n',
N'            <div class=\"col-12 hr-card bg-white padding-l roundBorders emp-grid-center emp-flex-wrap text-center\"\r\n',
N'                style=\"width:100%; height:100%;position:relative;\">\r\n',
N'\r\n',
N'                      <flx-navbutton class=\"clickable\" type=\"openpagename\" pagename=\"HR_Daydate_Incidents\" \r\n',
N'                            objectname=\"vHR_Employee_Daydates\"                         \r\n',
N'                            objectwhere=\"(vHR_Employee_Daydate.EmployeeId=''{{currentReference}}'' AND vHR_Employee_Daydate.DateJourney BETWEEN ''{{IncidentStartDate|date:YYYY-MM-DD}}'' AND ''{{IncidentEndDate|date:YYYY-MM-DD}}'' AND EAI.Incidences IS NOT NULL AND EXISTS (SELECT 1 FROM dbo.Employees_Assistence_Incidences x WHERE x.EmployeeId = vHR_Employee_Daydate.EmployeeId AND x.Date = vHR_Employee_Daydate.DateJourney AND x.StatusCode = ''PENDING'' AND x.IncidenceTypeId IN (4, 8, 10, 13, 14, 16, 17, 18, 19)))\"\r\n',
N'                            defaults=\"{''EmployeeId'': {{currentReference}}, ''StartDate'':''{{IncidentStartDate|date:YYYY-MM-DD}}'',''EndDate'':''{{IncidentEndDate|date:YYYY-MM-DD}}''}\" targetid=\"sliderightx60p\"\r\n',
N'                            excludehist=\"false\">\r\n',
N'                        <div class=\"{{HasIncident|bool:,hide}} incident-warning\">\r\n',
N'                            <div class=\"pulse-effect\"><\/div>\r\n',
N'                            <div class=\"warning-icon\">\r\n',
N'                                <i class=\"bi bi-exclamation-triangle-fill icon\"><\/i>\r\n',
N'                                <span class=\"badge-count\">{{NumberPendingIncidents}}<\/span>\r\n',
N'                            <\/div>\r\n',
N'                        <\/div>\r\n',
N'                    <\/flx-navbutton>\r\n',
N'                <div class=\"container-btn\" style=\"position: absolute;top: 15px;right: 15px;\">\r\n',
N'                    <div class=\"dropdown clickable\">\r\n',
N'                        <span class=\"\" type=\"button\" data-toggle=\"dropdown\">\r\n',
N'                       <i class=\"fa fa-plus-circle icon-lg txt-muted emp-hover-notify clickable\" ><\/i>\r\n',
N'                    <\/span>\r\n',
N'                        <ul style=\"\" class=\"dropdown-menu hr-dropdown-mobile-menu-right\">\r\n',
N'\r\n',
N'                            <li class=\"clickable padding-s {{HasPersonalData|bool:{{PersonalDisabled|bool:hide,}},hide}} \">\r\n',
N'                                <a class=\"emp-flex-Valign\"\r\n',
N'                                     onclick=\"flexygo.nav.execProcess(''hr_InstanceModifyPersonalData'','''','''',''{\\''EmployeeId\\'':\\''{{EmployeeId}}\\''}'',null,''sliderightx60%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))\">\r\n',
N'                                    <i class=\"icon-margin-right flx-icon icon-edit-contact\"><\/i>\r\n',
N'                                    {{translate|Change personal data}}\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n',
N'\r\n',
N'                            <li class=\"padding-s {{HasPersonalData|bool:hide,{{PersonalDisabled|bool:hide,}}}} txt-muted \" disabled title=\"{{translate|Your personal data is not filled}}\">\r\n',
N'                                <a class=\"emp-flex-Valign\">\r\n',
N'                                    <i class=\"icon-margin-right flx-icon icon-edit-contact\"><\/i>\r\n',
N'                                    {{translate|Change personal data}}\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n',
N'\r\n',
N'                            <li class=\"clickable padding-s {{AddMarkingDisabled|bool:hide,}}\">\r\n',
N'                                <a class=\"emp-flex-Valign\"\r\n',
N'                                    onclick=\"flexygo.nav.execProcess(''hr_InstanceAddMarking'','''','''',''{\\''EmployeeId\\'':\\''{{EmployeeId}}\\''}'',null,''sliderightx30%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))\">\r\n',
N'                                    <i class=\"icon-margin-right flx-icon icon-fingerprint-scan\"><\/i>\r\n',
N'                                    {{translate|New marking}}\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n',
N'\r\n',
N'                            <li class=\"clickable padding-s {{ModMarkingDisabled|bool:hide,}}\">\r\n',
N'                                <a class=\"emp-flex-Valign\"\r\n',
N'                                    onclick=\"flexygo.nav.execProcess(''hr_InstanceModifyMarking'','''','''',''{\\''EmployeeId\\'':\\''{{EmployeeId}}\\''}'',null,''sliderightx30%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))\">\r\n',
N'                                    <i class=\"icon-margin-right flx-icon icon-edit-3\"><\/i>\r\n',
N'                                    {{translate|Modify marking}}\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n',
N'\r\n',
N'                            <li class=\"clickable padding-s {{CustomInstances|bool:,hide}}\">\r\n',
N'                                <a class=\"emp-flex-Valign\"\r\n',
N'                                    onclick=\"flexygo.nav.execProcess(''hr_InstanceAddRequest'','''','''',''{\\''EmployeeId\\'':\\''{{EmployeeId}}\\''}'',null,''sliderightx30%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))\">\r\n',
N'                                    <i class=\"icon-margin-right flx-icon icon-document-new\"><\/i>\r\n',
N'                                    {{translate|New request}}\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n',
N'                        <\/ul>\r\n',
N'                    <\/div>\r\n',
N'                <\/div>\r\n',
N'\r\n',
N'                <i class=\"col-12 flx-icon icon-form2 icon-lg txt-notify\"><\/i>\r\n',
N'\r\n',
N'                <span class=\"col-12 bold txt-notify padding-top-s margin-bottom-m\">{{translate|My Instances}}<\/span>\r\n',
N'\r\n',
N'                <div class=\"col-12 size-s emp-flex-align hr-box-lightgrey\">\r\n',
N'                    <span class=\"col-6 col-l-12 emp-grid-center hover-bold clickable {{PendingInstances|isnull:hide,}}\" onclick=\"flexygo.nav.openPageName(''emp_pending_instances'','''','''',null,''sliderightx85%'',false ,' + convert(nvarchar(max),NCHAR(36)) + N'(this));\">\r\n',
N'                <span>{{PendingInstances|isnull:0}}<\/span>\r\n',
N'                    <span>{{translate|To manage}}<\/span>\r\n',
N'                    <\/span>\r\n',
N'                    <span class=\"col-6 col-l-12 emp-grid-center hover-bold clickable\" onclick=\"flexygo.nav.openPageName(''emp_my-instances'',''Instances'',''Employees.EmployeeId = {{currentReference}}'',null,''sliderightx60%'',false, ' + convert(nvarchar(max),NCHAR(36)) + N'(this),false,null,''InstancesPending'');\">\r\n',
N'                <span>{{totalInstances|isnull:0}}<\/span>\r\n',
N'                    <span>{{translate|Pending}}<\/span>\r\n',
N'                    <\/span>\r\n',
N'                <\/div>\r\n',
N'\r\n',
N'            <\/div>\r\n',
N'        <\/div>\r\n',
N'\r\n',
N'        <div class=\"col-6 col-l-12 emp-flex-wrap padding-m\">\r\n',
N'            <div class=\"col-12 hr-card bg-white padding-l roundBorders emp-grid-center emp-flex-wrap text-center\"\r\n',
N'                style=\"width:100%; height:100%;position:relative;\">\r\n',
N'                <div class=\"container-btn\" style=\"position: absolute;top: 15px;right: 15px;\">\r\n',
N'                    <div class=\"dropdown clickable\">\r\n',
N'                        <span class=\"\" type=\"button\" data-toggle=\"dropdown\">\r\n',
N'                       <i class=\"fa fa-plus-circle icon-lg txt-muted emp-hover-notify clickable\" ><\/i>\r\n',
N'                    <\/span>\r\n',
N'                        <ul style=\"\" class=\"dropdown-menu hr-dropdown-mobile-menu-right\">\r\n',
N'\r\n',
N'                            <li class=\"clickable padding-s\">\r\n',
N'                                <a class=\"emp-flex-Valign\"\r\n',
N'                                     onclick=\"flexygo.nav.openPageName(''emp_Absences_Leaves_EmployeeCalendar'',''emp_Employee'',''Employees.EmployeeId = {{currentReference}}'',''{\\''EmployeeId\\'':\\''{{currentReference}}\\''}'',''sliderightx95%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this));\"\">\r\n',
N'                                    <i class=\"icon-margin-right flx-icon icon-calendar-31\"><\/i>\r\n',
N'                                    {{translate|Solicite Holidays\/Absences}}\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n',
N'\r\n',
N'                            <li class=\"clickable padding-s\">\r\n',
N'                                <a class=\"emp-flex-Valign\"\r\n',
N'                                     onclick=\"flexygo.nav.execProcess(''hr_InstanceRemoveHolidays'','''','''',''{\\''EmployeeId\\'':\\''{{currentReference}}\\''}'',null,''sliderightx60%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))\">\r\n',
N'                                    <span class=\"txt-danger\"><i class=\"icon-margin-right flx-icon icon-calendar-9\"><\/i>\r\n',
N'                                    {{translate|Cancel Holidays\/Absences}}<\/span>\r\n',
N'                                <\/a>\r\n',
N'                            <\/li>\r\n                        <\/ul>\r\n')+
concat(convert(nvarchar(max),''),N'                    <\/div>\r\n',
N'                <\/div>\r\n',
N'                <i class=\"col-12 flx-icon icon-calendar-21 icon-lg txt-notify\"><\/i>\r\n',
N'\r\n',
N'                <span class=\"col-12 bold txt-notify padding-top-s margin-bottom-m\">{{translate|Holidays and absences}}<\/span>\r\n',
N'\r\n',
N'                <div class=\"col-12 size-s hr-box-lightgrey emp-flex-wrap\" >\r\n',
N'\r\n',
N'                    <span class=\"col-4 col-l-12 emp-grid-center hover-bold clickable\"\r\n',
N'                onclick=\"flexygo.nav.openPageName(''emp_Absences_Leaves_EmployeeCalendar'',''emp_Employee'',''Employees.EmployeeId = {{currentReference}}'',''{\\''EmployeeId\\'':\\''{{currentReference}}\\''}'',''sliderightx95%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this));\">\r\n',
N'                <span class=\"\">{{TotalHolidays|isnull:0}}<\/span>\r\n',
N'                    <span class=\"txt-info\">{{currentYear}}<\/span>\r\n',
N'                    <\/span>\r\n',
N'\r\n',
N'                    <span class=\"col-4 col-l-12 emp-grid-center hover-bold clickable\"\r\n',
N'                onclick=\"flexygo.nav.openPageName(''emp_Absences_Leaves_EmployeeCalendar'',''emp_Employee'',''Employees.EmployeeId = {{currentReference}}'',''{\\''EmployeeId\\'':\\''{{currentReference}}\\''}'',''sliderightx95%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this));\">\r\n',
N'                        <span class=\"\">{{AcceptedHolidays|isnull:0}}<\/span>\r\n',
N'                        <span class=\"txt-success\">{{translate|Accepted}}<\/span>\r\n',
N'                    <\/span>\r\n',
N'\r\n',
N'                    <span class=\"col-4 col-l-12 emp-grid-center hover-bold clickable\"\r\n',
N'                onclick=\"flexygo.nav.openPageName(''emp_Absences_Leaves_EmployeeCalendar'',''emp_Employee'',''Employees.EmployeeId = {{currentReference}}'',''{\\''EmployeeId\\'':\\''{{currentReference}}\\''}'',''sliderightx95%'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this));\">\r\n',
N'                        <span class=\"\">{{PendingHolidays|isnull:0}}<\/span>\r\n',
N'                        <span class=\"txt-warning\">{{translate|Pending}}<\/span>\r\n',
N'                    <\/span>\r\n',
N'                <\/div>\r\n',
N'\r\n',
N'            <\/div>\r\n',
N'        <\/div>\r\n',
N'\r\n',
N'    <\/div>\r\n',
N'\r\n',
N'\r\n',
N'-->\r\n',
N'<\/div>",
	"IconName":"noicon",
	"ConnStringID":"DataConnectionString",
	"JSAfterLoad":"sebastian.utils.closeNavMenu();",
	"Searcher":false,
	"ShowWhenNew":false,
	"ManualInit":false,
	"Reserved":false,
	"Cache":0,
	"Offline":false,
	"RemovePreset":false,
	"ChartLineBorderDash":false,
	"ChartLineFill":false,
	"ModuleViewers":false,
	"Active":true,
	"SkeletonId":"HR_HomeWelcomeEmployee",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:51:00",
	"flxUpdatedDate":"2026-05-25T15:52:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Modules] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ModuleName] nvarchar(100) '$.ModuleName'
,[TypeId] nvarchar(50) '$.TypeId'
,[ClassId] nvarchar(50) '$.ClassId'
,[ObjectName] nvarchar(50) '$.ObjectName'
,[ObjectFilter] nvarchar(1000) '$.ObjectFilter'
,[Descrip] nvarchar(250) '$.Descrip'
,[Title] nvarchar(250) '$.Title'
,[ContainerId] nvarchar(50) '$.ContainerId'
,[CollapsibleButton] bit '$.CollapsibleButton'
,[FullscreenButton] bit '$.FullscreenButton'
,[RefreshButton] bit '$.RefreshButton'
,[SearchButton] bit '$.SearchButton'
,[SQlSentence] nvarchar(max) '$.SQlSentence'
,[Header] nvarchar(max) '$.Header'
,[HTMLText] nvarchar(max) '$.HTMLText'
,[Footer] nvarchar(max) '$.Footer'
,[Empty] nvarchar(max) '$.Empty'
,[CssText] nvarchar(max) '$.CssText'
,[ScriptText] nvarchar(max) '$.ScriptText'
,[ChartTypeId] nvarchar(50) '$.ChartTypeId'
,[ChartSettingName] nvarchar(100) '$.ChartSettingName'
,[Series] nvarchar(500) '$.Series'
,[Labels] nvarchar(500) '$.Labels'
,[Value] nvarchar(500) '$.Value'
,[Params] nvarchar(255) '$.Params'
,[JsonOptions] nvarchar(500) '$.JsonOptions'
,[Path] nvarchar(255) '$.Path'
,[TransFormFilePath] nvarchar(255) '$.TransFormFilePath'
,[IconName] nvarchar(100) '$.IconName'
,[PagerId] nvarchar(50) '$.PagerId'
,[PageSize] int '$.PageSize'
,[ConnStringID] nvarchar(50) '$.ConnStringID'
,[ToolbarName] nvarchar(50) '$.ToolbarName'
,[GridbarName] nvarchar(50) '$.GridbarName'
,[TemplateId] nvarchar(50) '$.TemplateId'
,[HeaderClass] nvarchar(50) '$.HeaderClass'
,[ModuleClass] nvarchar(50) '$.ModuleClass'
,[JSAfterLoad] nvarchar(500) '$.JSAfterLoad'
,[Searcher] bit '$.Searcher'
,[ShowWhenNew] bit '$.ShowWhenNew'
,[ManualInit] bit '$.ManualInit'
,[SchedulerName] nvarchar(20) '$.SchedulerName'
,[TimelineSettingName] nvarchar(50) '$.TimelineSettingName'
,[KanbanSettingsName] nvarchar(50) '$.KanbanSettingsName'
,[ChartBackground] nvarchar(255) '$.ChartBackground'
,[ChartBorder] nvarchar(255) '$.ChartBorder'
,[Reserved] bit '$.Reserved'
,[Cache] int '$.Cache'
,[Offline] bit '$.Offline'
,[PresetName] nvarchar(50) '$.PresetName'
,[RemovePreset] bit '$.RemovePreset'
,[MixedChartTypes] nvarchar(255) '$.MixedChartTypes'
,[MixedChartLabels] nvarchar(255) '$.MixedChartLabels'
,[ChartLineBorderDash] bit '$.ChartLineBorderDash'
,[ChartLineFill] bit '$.ChartLineFill'
,[HTMLInit] nvarchar(max) '$.HTMLInit'
,[ModuleViewers] bit '$.ModuleViewers'
,[PlannerSettings] nvarchar(100) '$.PlannerSettings'
,[Active] bit '$.Active'
,[SkeletonId] nvarchar(100) '$.SkeletonId'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ModuleName],[TypeId],[ClassId],[ObjectName],[ObjectFilter],[Descrip],[Title],[ContainerId],[CollapsibleButton],[FullscreenButton],[RefreshButton],[SearchButton],[SQlSentence],[Header],[HTMLText],[Footer],[Empty],[CssText],[ScriptText],[ChartTypeId],[ChartSettingName],[Series],[Labels],[Value],[Params],[JsonOptions],[Path],[TransFormFilePath],[IconName],[PagerId],[PageSize],[ConnStringID],[ToolbarName],[GridbarName],[TemplateId],[HeaderClass],[ModuleClass],[JSAfterLoad],[Searcher],[ShowWhenNew],[ManualInit],[SchedulerName],[TimelineSettingName],[KanbanSettingsName],[ChartBackground],[ChartBorder],[Reserved],[Cache],[Offline],[PresetName],[RemovePreset],[MixedChartTypes],[MixedChartLabels],[ChartLineBorderDash],[ChartLineFill],[HTMLInit],[ModuleViewers],[PlannerSettings],[Active],[SkeletonId],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ModuleName] = Source.[ModuleName])
WHEN MATCHED AND (
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[ClassId], Target.[ClassId]) IS NOT NULL OR NULLIF(Target.[ClassId], Source.[ClassId]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectFilter], Target.[ObjectFilter]) IS NOT NULL OR NULLIF(Target.[ObjectFilter], Source.[ObjectFilter]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[ContainerId], Target.[ContainerId]) IS NOT NULL OR NULLIF(Target.[ContainerId], Source.[ContainerId]) IS NOT NULL OR 
	NULLIF(Source.[CollapsibleButton], Target.[CollapsibleButton]) IS NOT NULL OR NULLIF(Target.[CollapsibleButton], Source.[CollapsibleButton]) IS NOT NULL OR 
	NULLIF(Source.[FullscreenButton], Target.[FullscreenButton]) IS NOT NULL OR NULLIF(Target.[FullscreenButton], Source.[FullscreenButton]) IS NOT NULL OR 
	NULLIF(Source.[RefreshButton], Target.[RefreshButton]) IS NOT NULL OR NULLIF(Target.[RefreshButton], Source.[RefreshButton]) IS NOT NULL OR 
	NULLIF(Source.[SearchButton], Target.[SearchButton]) IS NOT NULL OR NULLIF(Target.[SearchButton], Source.[SearchButton]) IS NOT NULL OR 
	NULLIF(Source.[SQlSentence], Target.[SQlSentence]) IS NOT NULL OR NULLIF(Target.[SQlSentence], Source.[SQlSentence]) IS NOT NULL OR 
	NULLIF(Source.[Header], Target.[Header]) IS NOT NULL OR NULLIF(Target.[Header], Source.[Header]) IS NOT NULL OR 
	NULLIF(Source.[HTMLText], Target.[HTMLText]) IS NOT NULL OR NULLIF(Target.[HTMLText], Source.[HTMLText]) IS NOT NULL OR 
	NULLIF(Source.[Footer], Target.[Footer]) IS NOT NULL OR NULLIF(Target.[Footer], Source.[Footer]) IS NOT NULL OR 
	NULLIF(Source.[Empty], Target.[Empty]) IS NOT NULL OR NULLIF(Target.[Empty], Source.[Empty]) IS NOT NULL OR 
	NULLIF(Source.[CssText], Target.[CssText]) IS NOT NULL OR NULLIF(Target.[CssText], Source.[CssText]) IS NOT NULL OR 
	NULLIF(Source.[ScriptText], Target.[ScriptText]) IS NOT NULL OR NULLIF(Target.[ScriptText], Source.[ScriptText]) IS NOT NULL OR 
	NULLIF(Source.[ChartTypeId], Target.[ChartTypeId]) IS NOT NULL OR NULLIF(Target.[ChartTypeId], Source.[ChartTypeId]) IS NOT NULL OR 
	NULLIF(Source.[ChartSettingName], Target.[ChartSettingName]) IS NOT NULL OR NULLIF(Target.[ChartSettingName], Source.[ChartSettingName]) IS NOT NULL OR 
	NULLIF(Source.[Series], Target.[Series]) IS NOT NULL OR NULLIF(Target.[Series], Source.[Series]) IS NOT NULL OR 
	NULLIF(Source.[Labels], Target.[Labels]) IS NOT NULL OR NULLIF(Target.[Labels], Source.[Labels]) IS NOT NULL OR 
	NULLIF(Source.[Value], Target.[Value]) IS NOT NULL OR NULLIF(Target.[Value], Source.[Value]) IS NOT NULL OR 
	NULLIF(Source.[Params], Target.[Params]) IS NOT NULL OR NULLIF(Target.[Params], Source.[Params]) IS NOT NULL OR 
	NULLIF(Source.[JsonOptions], Target.[JsonOptions]) IS NOT NULL OR NULLIF(Target.[JsonOptions], Source.[JsonOptions]) IS NOT NULL OR 
	NULLIF(Source.[Path], Target.[Path]) IS NOT NULL OR NULLIF(Target.[Path], Source.[Path]) IS NOT NULL OR 
	NULLIF(Source.[TransFormFilePath], Target.[TransFormFilePath]) IS NOT NULL OR NULLIF(Target.[TransFormFilePath], Source.[TransFormFilePath]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[PagerId], Target.[PagerId]) IS NOT NULL OR NULLIF(Target.[PagerId], Source.[PagerId]) IS NOT NULL OR 
	NULLIF(Source.[PageSize], Target.[PageSize]) IS NOT NULL OR NULLIF(Target.[PageSize], Source.[PageSize]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringID], Target.[ConnStringID]) IS NOT NULL OR NULLIF(Target.[ConnStringID], Source.[ConnStringID]) IS NOT NULL OR 
	NULLIF(Source.[ToolbarName], Target.[ToolbarName]) IS NOT NULL OR NULLIF(Target.[ToolbarName], Source.[ToolbarName]) IS NOT NULL OR 
	NULLIF(Source.[GridbarName], Target.[GridbarName]) IS NOT NULL OR NULLIF(Target.[GridbarName], Source.[GridbarName]) IS NOT NULL OR 
	NULLIF(Source.[TemplateId], Target.[TemplateId]) IS NOT NULL OR NULLIF(Target.[TemplateId], Source.[TemplateId]) IS NOT NULL OR 
	NULLIF(Source.[HeaderClass], Target.[HeaderClass]) IS NOT NULL OR NULLIF(Target.[HeaderClass], Source.[HeaderClass]) IS NOT NULL OR 
	NULLIF(Source.[ModuleClass], Target.[ModuleClass]) IS NOT NULL OR NULLIF(Target.[ModuleClass], Source.[ModuleClass]) IS NOT NULL OR 
	NULLIF(Source.[JSAfterLoad], Target.[JSAfterLoad]) IS NOT NULL OR NULLIF(Target.[JSAfterLoad], Source.[JSAfterLoad]) IS NOT NULL OR 
	NULLIF(Source.[Searcher], Target.[Searcher]) IS NOT NULL OR NULLIF(Target.[Searcher], Source.[Searcher]) IS NOT NULL OR 
	NULLIF(Source.[ShowWhenNew], Target.[ShowWhenNew]) IS NOT NULL OR NULLIF(Target.[ShowWhenNew], Source.[ShowWhenNew]) IS NOT NULL OR 
	NULLIF(Source.[ManualInit], Target.[ManualInit]) IS NOT NULL OR NULLIF(Target.[ManualInit], Source.[ManualInit]) IS NOT NULL OR 
	NULLIF(Source.[SchedulerName], Target.[SchedulerName]) IS NOT NULL OR NULLIF(Target.[SchedulerName], Source.[SchedulerName]) IS NOT NULL OR 
	NULLIF(Source.[TimelineSettingName], Target.[TimelineSettingName]) IS NOT NULL OR NULLIF(Target.[TimelineSettingName], Source.[TimelineSettingName]) IS NOT NULL OR 
	NULLIF(Source.[KanbanSettingsName], Target.[KanbanSettingsName]) IS NOT NULL OR NULLIF(Target.[KanbanSettingsName], Source.[KanbanSettingsName]) IS NOT NULL OR 
	NULLIF(Source.[ChartBackground], Target.[ChartBackground]) IS NOT NULL OR NULLIF(Target.[ChartBackground], Source.[ChartBackground]) IS NOT NULL OR 
	NULLIF(Source.[ChartBorder], Target.[ChartBorder]) IS NOT NULL OR NULLIF(Target.[ChartBorder], Source.[ChartBorder]) IS NOT NULL OR 
	NULLIF(Source.[Reserved], Target.[Reserved]) IS NOT NULL OR NULLIF(Target.[Reserved], Source.[Reserved]) IS NOT NULL OR 
	NULLIF(Source.[Cache], Target.[Cache]) IS NOT NULL OR NULLIF(Target.[Cache], Source.[Cache]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[PresetName], Target.[PresetName]) IS NOT NULL OR NULLIF(Target.[PresetName], Source.[PresetName]) IS NOT NULL OR 
	NULLIF(Source.[RemovePreset], Target.[RemovePreset]) IS NOT NULL OR NULLIF(Target.[RemovePreset], Source.[RemovePreset]) IS NOT NULL OR 
	NULLIF(Source.[MixedChartTypes], Target.[MixedChartTypes]) IS NOT NULL OR NULLIF(Target.[MixedChartTypes], Source.[MixedChartTypes]) IS NOT NULL OR 
	NULLIF(Source.[MixedChartLabels], Target.[MixedChartLabels]) IS NOT NULL OR NULLIF(Target.[MixedChartLabels], Source.[MixedChartLabels]) IS NOT NULL OR 
	NULLIF(Source.[ChartLineBorderDash], Target.[ChartLineBorderDash]) IS NOT NULL OR NULLIF(Target.[ChartLineBorderDash], Source.[ChartLineBorderDash]) IS NOT NULL OR 
	NULLIF(Source.[ChartLineFill], Target.[ChartLineFill]) IS NOT NULL OR NULLIF(Target.[ChartLineFill], Source.[ChartLineFill]) IS NOT NULL OR 
	NULLIF(Source.[HTMLInit], Target.[HTMLInit]) IS NOT NULL OR NULLIF(Target.[HTMLInit], Source.[HTMLInit]) IS NOT NULL OR 
	NULLIF(Source.[ModuleViewers], Target.[ModuleViewers]) IS NOT NULL OR NULLIF(Target.[ModuleViewers], Source.[ModuleViewers]) IS NOT NULL OR 
	NULLIF(Source.[PlannerSettings], Target.[PlannerSettings]) IS NOT NULL OR NULLIF(Target.[PlannerSettings], Source.[PlannerSettings]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[SkeletonId], Target.[SkeletonId]) IS NOT NULL OR NULLIF(Target.[SkeletonId], Source.[SkeletonId]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [TypeId] = Source.[TypeId], 
  [ClassId] = Source.[ClassId], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectFilter] = Source.[ObjectFilter], 
  [Descrip] = Source.[Descrip], 
  [Title] = Source.[Title], 
  [ContainerId] = Source.[ContainerId], 
  [CollapsibleButton] = Source.[CollapsibleButton], 
  [FullscreenButton] = Source.[FullscreenButton], 
  [RefreshButton] = Source.[RefreshButton], 
  [SearchButton] = Source.[SearchButton], 
  [SQlSentence] = Source.[SQlSentence], 
  [Header] = Source.[Header], 
  [HTMLText] = Source.[HTMLText], 
  [Footer] = Source.[Footer], 
  [Empty] = Source.[Empty], 
  [CssText] = Source.[CssText], 
  [ScriptText] = Source.[ScriptText], 
  [ChartTypeId] = Source.[ChartTypeId], 
  [ChartSettingName] = Source.[ChartSettingName], 
  [Series] = Source.[Series], 
  [Labels] = Source.[Labels], 
  [Value] = Source.[Value], 
  [Params] = Source.[Params], 
  [JsonOptions] = Source.[JsonOptions], 
  [Path] = Source.[Path], 
  [TransFormFilePath] = Source.[TransFormFilePath], 
  [IconName] = Source.[IconName], 
  [PagerId] = Source.[PagerId], 
  [PageSize] = Source.[PageSize], 
  [ConnStringID] = Source.[ConnStringID], 
  [ToolbarName] = Source.[ToolbarName], 
  [GridbarName] = Source.[GridbarName], 
  [TemplateId] = Source.[TemplateId], 
  [HeaderClass] = Source.[HeaderClass], 
  [ModuleClass] = Source.[ModuleClass], 
  [JSAfterLoad] = Source.[JSAfterLoad], 
  [Searcher] = Source.[Searcher], 
  [ShowWhenNew] = Source.[ShowWhenNew], 
  [ManualInit] = Source.[ManualInit], 
  [SchedulerName] = Source.[SchedulerName], 
  [TimelineSettingName] = Source.[TimelineSettingName], 
  [KanbanSettingsName] = Source.[KanbanSettingsName], 
  [ChartBackground] = Source.[ChartBackground], 
  [ChartBorder] = Source.[ChartBorder], 
  [Reserved] = Source.[Reserved], 
  [Cache] = Source.[Cache], 
  [Offline] = Source.[Offline], 
  [PresetName] = Source.[PresetName], 
  [RemovePreset] = Source.[RemovePreset], 
  [MixedChartTypes] = Source.[MixedChartTypes], 
  [MixedChartLabels] = Source.[MixedChartLabels], 
  [ChartLineBorderDash] = Source.[ChartLineBorderDash], 
  [ChartLineFill] = Source.[ChartLineFill], 
  [HTMLInit] = Source.[HTMLInit], 
  [ModuleViewers] = Source.[ModuleViewers], 
  [PlannerSettings] = Source.[PlannerSettings], 
  [Active] = Source.[Active], 
  [SkeletonId] = Source.[SkeletonId], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ModuleName],[TypeId],[ClassId],[ObjectName],[ObjectFilter],[Descrip],[Title],[ContainerId],[CollapsibleButton],[FullscreenButton],[RefreshButton],[SearchButton],[SQlSentence],[Header],[HTMLText],[Footer],[Empty],[CssText],[ScriptText],[ChartTypeId],[ChartSettingName],[Series],[Labels],[Value],[Params],[JsonOptions],[Path],[TransFormFilePath],[IconName],[PagerId],[PageSize],[ConnStringID],[ToolbarName],[GridbarName],[TemplateId],[HeaderClass],[ModuleClass],[JSAfterLoad],[Searcher],[ShowWhenNew],[ManualInit],[SchedulerName],[TimelineSettingName],[KanbanSettingsName],[ChartBackground],[ChartBorder],[Reserved],[Cache],[Offline],[PresetName],[RemovePreset],[MixedChartTypes],[MixedChartLabels],[ChartLineBorderDash],[ChartLineFill],[HTMLInit],[ModuleViewers],[PlannerSettings],[Active],[SkeletonId],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ModuleName],Source.[TypeId],Source.[ClassId],Source.[ObjectName],Source.[ObjectFilter],Source.[Descrip],Source.[Title],Source.[ContainerId],Source.[CollapsibleButton],Source.[FullscreenButton],Source.[RefreshButton],Source.[SearchButton],Source.[SQlSentence],Source.[Header],Source.[HTMLText],Source.[Footer],Source.[Empty],Source.[CssText],Source.[ScriptText],Source.[ChartTypeId],Source.[ChartSettingName],Source.[Series],Source.[Labels],Source.[Value],Source.[Params],Source.[JsonOptions],Source.[Path],Source.[TransFormFilePath],Source.[IconName],Source.[PagerId],Source.[PageSize],Source.[ConnStringID],Source.[ToolbarName],Source.[GridbarName],Source.[TemplateId],Source.[HeaderClass],Source.[ModuleClass],Source.[JSAfterLoad],Source.[Searcher],Source.[ShowWhenNew],Source.[ManualInit],Source.[SchedulerName],Source.[TimelineSettingName],Source.[KanbanSettingsName],Source.[ChartBackground],Source.[ChartBorder],Source.[Reserved],Source.[Cache],Source.[Offline],Source.[PresetName],Source.[RemovePreset],Source.[MixedChartTypes],Source.[MixedChartLabels],Source.[ChartLineBorderDash],Source.[ChartLineFill],Source.[HTMLInit],Source.[ModuleViewers],Source.[PlannerSettings],Source.[Active],Source.[SkeletonId],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 2 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





