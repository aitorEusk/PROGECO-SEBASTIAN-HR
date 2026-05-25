

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_Employee",
	"ProcessName":"Add_User",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee",
	"ProcessName":"emp_ImportEmployees",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee",
	"ProcessName":"pEmp_Choose_holidaysRRHH",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_ContractData",
	"ProcessName":"pEmp_InsertEmployeeContractData",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_Holiday",
	"ProcessName":"emp_InsertAbsenceHR_AbsenceTypes",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_Holiday",
	"ProcessName":"emp_InsertAbsenceHR_HolidaysTypes",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_Leave",
	"ProcessName":"hr_NewEmployeeLeave",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employees",
	"ProcessName":"emp_ImportEmployees",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employees_Holidays",
	"ProcessName":"emp_InsertAbsenceHR_HolidaysTypes",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Part_Expenses",
	"ProcessName":"pEmp_CancelExpensesStatus",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Part_Expenses",
	"ProcessName":"pEmp_ValidateExpensesStatus",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Parts_Expenses",
	"ProcessName":"pEmp_ConfirmGeneratedExpensesStatus",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_vHR_Employee",
	"ProcessName":"pEmp_Choose_holidaysRRHH",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_vHR_Employee_Daydate",
	"ProcessName":"hr_pEmployeeDate_Refresh",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_vHR_Employees",
	"ProcessName":"emp_ImportEmployees",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_vHR_Employees",
	"ProcessName":"Emp_OpenNewEmployeeEdit",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Employees_Admonition",
	"ProcessName":"hr_NewAdmonition",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"HR_Marking",
	"ProcessName":"pEmp_Markings_IgnoreRegister",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"HR_Marking",
	"ProcessName":"pEmp_RemoveMarking",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"HR_Marking",
	"ProcessName":"pEmployeeDate_ChangePlanification_NewSchedule",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"HR_Marking",
	"ProcessName":"pEmployeeDate_ChangePlanification_NewShift",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"ProcessName":"ChangePasswordAdmin",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"ProcessName":"ConfirmEmailUser",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"ProcessName":"Lock_user",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"ProcessName":"ResendConfirmationToken",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"ProcessName":"UnlockUser",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Security_Objects_Processes_Roles] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[ProcessName] nvarchar(255) '$.ProcessName'
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
) AS Source ([ObjectName],[ProcessName],[RoleId],[CanView],[ViewFilter],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[RoleId] = Source.[RoleId] AND Target.[ObjectName] = Source.[ObjectName] AND Target.[ProcessName] = Source.[ProcessName])
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
 INSERT([ObjectName],[ProcessName],[RoleId],[CanView],[ViewFilter],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[ProcessName],Source.[RoleId],Source.[CanView],Source.[ViewFilter],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





