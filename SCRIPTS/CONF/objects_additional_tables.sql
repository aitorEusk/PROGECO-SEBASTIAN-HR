

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_EmployeePersonalData",
	"TableName":"PERS_CONF_Employees_PersonalData",
	"Schema":"dbo",
	"KeyMap":"EmployeeId=EmployeeId",
	"Descrip":"PERS_CONF_Employees_PersonalData",
	"InsertType":"standard",
	"UpdateType":"standard",
	"DeleteType":"standard",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-26T09:00:00",
	"flxUpdatedDate":"2026-05-26T09:00:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Additional_Tables] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[TableName] nvarchar(255) '$.TableName'
,[Schema] nvarchar(100) '$.Schema'
,[KeyMap] nvarchar(255) '$.KeyMap'
,[Descrip] nvarchar(255) '$.Descrip'
,[InsertType] nvarchar(10) '$.InsertType'
,[UpdateType] nvarchar(10) '$.UpdateType'
,[DeleteType] nvarchar(10) '$.DeleteType'
,[InsertProcessName] nvarchar(255) '$.InsertProcessName'
,[UpdateProcessName] nvarchar(255) '$.UpdateProcessName'
,[DeleteProcessName] nvarchar(255) '$.DeleteProcessName'
,[ConnStringId] nvarchar(50) '$.ConnStringId'
,[Offline] bit '$.Offline'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[TableName],[Schema],[KeyMap],[Descrip],[InsertType],[UpdateType],[DeleteType],[InsertProcessName],[UpdateProcessName],[DeleteProcessName],[ConnStringId],[Offline],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[TableName] = Source.[TableName])
WHEN MATCHED AND (
	NULLIF(Source.[Schema], Target.[Schema]) IS NOT NULL OR NULLIF(Target.[Schema], Source.[Schema]) IS NOT NULL OR 
	NULLIF(Source.[KeyMap], Target.[KeyMap]) IS NOT NULL OR NULLIF(Target.[KeyMap], Source.[KeyMap]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[InsertType], Target.[InsertType]) IS NOT NULL OR NULLIF(Target.[InsertType], Source.[InsertType]) IS NOT NULL OR 
	NULLIF(Source.[UpdateType], Target.[UpdateType]) IS NOT NULL OR NULLIF(Target.[UpdateType], Source.[UpdateType]) IS NOT NULL OR 
	NULLIF(Source.[DeleteType], Target.[DeleteType]) IS NOT NULL OR NULLIF(Target.[DeleteType], Source.[DeleteType]) IS NOT NULL OR 
	NULLIF(Source.[InsertProcessName], Target.[InsertProcessName]) IS NOT NULL OR NULLIF(Target.[InsertProcessName], Source.[InsertProcessName]) IS NOT NULL OR 
	NULLIF(Source.[UpdateProcessName], Target.[UpdateProcessName]) IS NOT NULL OR NULLIF(Target.[UpdateProcessName], Source.[UpdateProcessName]) IS NOT NULL OR 
	NULLIF(Source.[DeleteProcessName], Target.[DeleteProcessName]) IS NOT NULL OR NULLIF(Target.[DeleteProcessName], Source.[DeleteProcessName]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Schema] = Source.[Schema], 
  [KeyMap] = Source.[KeyMap], 
  [Descrip] = Source.[Descrip], 
  [InsertType] = Source.[InsertType], 
  [UpdateType] = Source.[UpdateType], 
  [DeleteType] = Source.[DeleteType], 
  [InsertProcessName] = Source.[InsertProcessName], 
  [UpdateProcessName] = Source.[UpdateProcessName], 
  [DeleteProcessName] = Source.[DeleteProcessName], 
  [ConnStringId] = Source.[ConnStringId], 
  [Offline] = Source.[Offline], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[TableName],[Schema],[KeyMap],[Descrip],[InsertType],[UpdateType],[DeleteType],[InsertProcessName],[UpdateProcessName],[DeleteProcessName],[ConnStringId],[Offline],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[TableName],Source.[Schema],Source.[KeyMap],Source.[Descrip],Source.[InsertType],Source.[UpdateType],Source.[DeleteType],Source.[InsertProcessName],Source.[UpdateProcessName],Source.[DeleteProcessName],Source.[ConnStringId],Source.[Offline],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





