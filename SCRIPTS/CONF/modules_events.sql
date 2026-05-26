

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ModuleEventId":"09e7767f-7fd2-4ecd-b401-ef70628010af",
	"ModuleName":"emp_my_documents",
	"EventClass":"document",
	"EventType":"uploaded",
	"EventAction":"process",
	"ProcessName":"NuevoDocumentoPost",
	"Active":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-04-09T21:07:00",
	"flxUpdatedDate":"2025-04-09T21:09:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleEventId":"0a0ecd2a-9948-4b76-a6e8-b72e5e40cf57",
	"ModuleName":"Pers_Notificacion_View_Module",
	"EventClass":"page",
	"EventType":"loaded",
	"EventAction":"process",
	"ProcessName":"PERS_Notificacion_Read_JS",
	"PageFilter":"Notificacion_View",
	"Active":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T21:46:00",
	"flxUpdatedDate":"2025-03-04T21:46:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleEventId":"471afe61-c9e5-4796-9fba-2d0698511f15",
	"ModuleName":"PERS_News_Categories_List_Module",
	"EventClass":"entity",
	"EventType":"all",
	"EventAction":"refresh",
	"Active":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T15:26:00",
	"flxUpdatedDate":"2025-03-05T15:26:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ModuleEventId":"965cc406-ad5a-4191-b9f8-6e580806ca8e",
	"ModuleName":"Pers_Notificacion_View_Module",
	"EventClass":"entity",
	"EventType":"all",
	"EventAction":"refresh",
	"Active":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T21:43:00",
	"flxUpdatedDate":"2025-03-04T21:43:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Modules_Events] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ModuleEventId] nvarchar(50) '$.ModuleEventId'
,[ModuleName] nvarchar(100) '$.ModuleName'
,[EventClass] nvarchar(50) '$.EventClass'
,[EventType] nvarchar(50) '$.EventType'
,[EventAction] nvarchar(50) '$.EventAction'
,[ProcessName] nvarchar(255) '$.ProcessName'
,[ObjectFilter] nvarchar(50) '$.ObjectFilter'
,[PropertyFilter] nvarchar(50) '$.PropertyFilter'
,[ProcessFilter] nvarchar(255) '$.ProcessFilter'
,[ModuleFilter] nvarchar(100) '$.ModuleFilter'
,[PageFilter] nvarchar(100) '$.PageFilter'
,[MethodFilter] nvarchar(255) '$.MethodFilter'
,[Active] bit '$.Active'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ModuleEventId],[ModuleName],[EventClass],[EventType],[EventAction],[ProcessName],[ObjectFilter],[PropertyFilter],[ProcessFilter],[ModuleFilter],[PageFilter],[MethodFilter],[Active],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ModuleEventId] = Source.[ModuleEventId])
WHEN MATCHED AND (
	NULLIF(Source.[ModuleName], Target.[ModuleName]) IS NOT NULL OR NULLIF(Target.[ModuleName], Source.[ModuleName]) IS NOT NULL OR 
	NULLIF(Source.[EventClass], Target.[EventClass]) IS NOT NULL OR NULLIF(Target.[EventClass], Source.[EventClass]) IS NOT NULL OR 
	NULLIF(Source.[EventType], Target.[EventType]) IS NOT NULL OR NULLIF(Target.[EventType], Source.[EventType]) IS NOT NULL OR 
	NULLIF(Source.[EventAction], Target.[EventAction]) IS NOT NULL OR NULLIF(Target.[EventAction], Source.[EventAction]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectFilter], Target.[ObjectFilter]) IS NOT NULL OR NULLIF(Target.[ObjectFilter], Source.[ObjectFilter]) IS NOT NULL OR 
	NULLIF(Source.[PropertyFilter], Target.[PropertyFilter]) IS NOT NULL OR NULLIF(Target.[PropertyFilter], Source.[PropertyFilter]) IS NOT NULL OR 
	NULLIF(Source.[ProcessFilter], Target.[ProcessFilter]) IS NOT NULL OR NULLIF(Target.[ProcessFilter], Source.[ProcessFilter]) IS NOT NULL OR 
	NULLIF(Source.[ModuleFilter], Target.[ModuleFilter]) IS NOT NULL OR NULLIF(Target.[ModuleFilter], Source.[ModuleFilter]) IS NOT NULL OR 
	NULLIF(Source.[PageFilter], Target.[PageFilter]) IS NOT NULL OR NULLIF(Target.[PageFilter], Source.[PageFilter]) IS NOT NULL OR 
	NULLIF(Source.[MethodFilter], Target.[MethodFilter]) IS NOT NULL OR NULLIF(Target.[MethodFilter], Source.[MethodFilter]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ModuleName] = Source.[ModuleName], 
  [EventClass] = Source.[EventClass], 
  [EventType] = Source.[EventType], 
  [EventAction] = Source.[EventAction], 
  [ProcessName] = Source.[ProcessName], 
  [ObjectFilter] = Source.[ObjectFilter], 
  [PropertyFilter] = Source.[PropertyFilter], 
  [ProcessFilter] = Source.[ProcessFilter], 
  [ModuleFilter] = Source.[ModuleFilter], 
  [PageFilter] = Source.[PageFilter], 
  [MethodFilter] = Source.[MethodFilter], 
  [Active] = Source.[Active], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ModuleEventId],[ModuleName],[EventClass],[EventType],[EventAction],[ProcessName],[ObjectFilter],[PropertyFilter],[ProcessFilter],[ModuleFilter],[PageFilter],[MethodFilter],[Active],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ModuleEventId],Source.[ModuleName],Source.[EventClass],Source.[EventType],Source.[EventAction],Source.[ProcessName],Source.[ObjectFilter],Source.[PropertyFilter],Source.[ProcessFilter],Source.[ModuleFilter],Source.[PageFilter],Source.[MethodFilter],Source.[Active],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





