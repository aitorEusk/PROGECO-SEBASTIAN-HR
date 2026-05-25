

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_Employee",
	"PropertyName":"HideSalary",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_Holiday",
	"PropertyName":"DenyReason",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_Holiday",
	"PropertyName":"StatusId",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"CheckTime",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"Closed",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"EmployeeId",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"Ignore",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"MarkingIncidentTypeId",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"MarkingTypeId",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Marking",
	"PropertyName":"TerminalCode",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Part_Expenses",
	"PropertyName":"EmployeeId",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Suggestion_Mailbox",
	"PropertyName":"Comments",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Suggestion_Mailbox",
	"PropertyName":"StatusId",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Instance",
	"PropertyName":"Description",
	"RoleId":"PERS_ADMIN_PROGECO",
	"CanView":true,
	"CanEdit":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:07:00",
	"flxUpdatedDate":"2026-05-25T15:07:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Security_Objects_Properties_Roles] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[PropertyName] nvarchar(50) '$.PropertyName'
,[RoleId] nvarchar(128) '$.RoleId'
,[CanView] bit '$.CanView'
,[CanEdit] bit '$.CanEdit'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[PropertyName],[RoleId],[CanView],[CanEdit],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName] AND Target.[RoleId] = Source.[RoleId])
WHEN MATCHED AND (
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[CanEdit], Target.[CanEdit]) IS NOT NULL OR NULLIF(Target.[CanEdit], Source.[CanEdit]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CanView] = Source.[CanView], 
  [CanEdit] = Source.[CanEdit], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[PropertyName],[RoleId],[CanView],[CanEdit],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[PropertyName],Source.[RoleId],Source.[CanView],Source.[CanEdit],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





