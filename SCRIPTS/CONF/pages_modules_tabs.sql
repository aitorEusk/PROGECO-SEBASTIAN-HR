

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"TabModuleName":"emp_HolidaysAndAbsencesEmployeeTab",
	"ModuleName":"emp_MyAbsenceList",
	"Order":1,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-06-01T11:09:00",
	"flxUpdatedDate":"2026-06-01T11:09:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"TabModuleName":"emp_HolidaysAndAbsencesEmployeeTab",
	"ModuleName":"emp_myHolidays",
	"Order":0,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-06-01T11:09:00",
	"flxUpdatedDate":"2026-06-01T11:09:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Pages_Modules_Tabs] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[TabModuleName] nvarchar(100) '$.TabModuleName'
,[ModuleName] nvarchar(100) '$.ModuleName'
,[Order] int '$.Order'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([TabModuleName],[ModuleName],[Order],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[TabModuleName] = Source.[TabModuleName] AND Target.[ModuleName] = Source.[ModuleName])
WHEN MATCHED AND (
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Order] = Source.[Order], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([TabModuleName],[ModuleName],[Order],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[TabModuleName],Source.[ModuleName],Source.[Order],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





