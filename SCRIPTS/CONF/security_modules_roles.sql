

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ModuleName":"emp_Change_Status_holidays",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_contratctInfo",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_GeneralDB_JourneysCalendar",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_InsertMarking_Home_withLocation",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T15:34:00",
	"flxUpdatedDate":"2026-05-25T15:34:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_InsertMarking_Home_withLocation",
	"RoleId":"users",
	"CanView":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T15:34:00",
	"flxUpdatedDate":"2026-05-25T15:34:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_MyPayrollAdjusts",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_PayrollRun_EasyInfo",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"emp_ReadersPendingToConfirm",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"HR_EmployeeSpace_ComboFilter",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"HR_EmployeeWorkday_IncidentsWarnings",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"HR_Travels_Management",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"HR_Travels_Management",
	"RoleId":"users",
	"CanView":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T15:35:00",
	"flxUpdatedDate":"2026-05-25T15:35:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"HR_WorkingDay_Employee_Buttons",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"mod_employee_WeekPlanning",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T15:35:00",
	"flxUpdatedDate":"2026-05-25T15:35:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleName":"mod_employee_WeekPlanning",
	"RoleId":"users",
	"CanView":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T15:35:00",
	"flxUpdatedDate":"2026-05-25T15:35:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Security_Modules_Roles] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ModuleName] nvarchar(100) '$.ModuleName'
,[RoleId] nvarchar(128) '$.RoleId'
,[CanView] bit '$.CanView'
,[ViewFilter] nvarchar(2048) '$.ViewFilter'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ModuleName],[RoleId],[CanView],[ViewFilter],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ModuleName] = Source.[ModuleName] AND Target.[RoleId] = Source.[RoleId])
WHEN MATCHED AND (
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[ViewFilter], Target.[ViewFilter]) IS NOT NULL OR NULLIF(Target.[ViewFilter], Source.[ViewFilter]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CanView] = Source.[CanView], 
  [ViewFilter] = Source.[ViewFilter], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ModuleName],[RoleId],[CanView],[ViewFilter],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ModuleName],Source.[RoleId],Source.[CanView],Source.[ViewFilter],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





