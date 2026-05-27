

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"PageName":"emp_InitPage",
	"ModuleName":"PERS_emp_welcomeEmployee",
	"LayoutPositionId":"TopPosition",
	"Order":1,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:51:00",
	"flxUpdatedDate":"2026-05-25T15:51:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"PageName":"emp_MyCV",
	"ModuleName":"PERS_Empleados_Marcajes",
	"LayoutPositionId":"CenterPosition",
	"Order":3,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-26T08:57:00",
	"flxUpdatedDate":"2026-05-26T08:57:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"PageName":"emp_MyCV",
	"ModuleName":"PERS_Notificaciones_Empleado",
	"LayoutPositionId":"CenterRightPosition",
	"Order":0,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:16:00",
	"flxUpdatedDate":"2026-05-27T10:16:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"PageName":"Notificacion_View",
	"ModuleName":"Pers_Notificacion_View_Module",
	"LayoutPositionId":"TopPosition",
	"Order":0,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T21:42:00",
	"flxUpdatedDate":"2025-03-04T21:42:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"PageName":"Notificacion_View",
	"ModuleName":"PERS_Notificaciones_Reads_Module",
	"LayoutPositionId":"RightPosition",
	"Order":1,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T08:52:00",
	"flxUpdatedDate":"2025-03-05T08:52:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"PageName":"Notificacion_View",
	"ModuleName":"PERS_Notiificaciones_Likeas_Module",
	"LayoutPositionId":"RightPosition",
	"Order":0,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T08:46:00",
	"flxUpdatedDate":"2025-03-05T08:46:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"PageName":"PERS_News",
	"ModuleName":"PERS_News_Categories_List_Module",
	"LayoutPositionId":"TopPosition",
	"Order":0,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T15:31:00",
	"flxUpdatedDate":"2025-03-05T15:31:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Pages_Modules] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[PageName] nvarchar(100) '$.PageName'
,[ModuleName] nvarchar(100) '$.ModuleName'
,[LayoutPositionId] nvarchar(50) '$.LayoutPositionId'
,[RelationWhere] nvarchar(1000) '$.RelationWhere'
,[Order] int '$.Order'
,[SQlEnabled] nvarchar(max) '$.SQlEnabled'
,[SQLEnabledDescrip] nvarchar(250) '$.SQLEnabledDescrip'
,[Title] nvarchar(250) '$.Title'
,[IconName] nvarchar(100) '$.IconName'
,[HeaderClass] nvarchar(50) '$.HeaderClass'
,[ModuleClass] nvarchar(50) '$.ModuleClass'
,[ConnStringID] nvarchar(50) '$.ConnStringID'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([PageName],[ModuleName],[LayoutPositionId],[RelationWhere],[Order],[SQlEnabled],[SQLEnabledDescrip],[Title],[IconName],[HeaderClass],[ModuleClass],[ConnStringID],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[PageName] = Source.[PageName] AND Target.[ModuleName] = Source.[ModuleName])
WHEN MATCHED AND (
	NULLIF(Source.[LayoutPositionId], Target.[LayoutPositionId]) IS NOT NULL OR NULLIF(Target.[LayoutPositionId], Source.[LayoutPositionId]) IS NOT NULL OR 
	NULLIF(Source.[RelationWhere], Target.[RelationWhere]) IS NOT NULL OR NULLIF(Target.[RelationWhere], Source.[RelationWhere]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[SQlEnabled], Target.[SQlEnabled]) IS NOT NULL OR NULLIF(Target.[SQlEnabled], Source.[SQlEnabled]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabledDescrip], Target.[SQLEnabledDescrip]) IS NOT NULL OR NULLIF(Target.[SQLEnabledDescrip], Source.[SQLEnabledDescrip]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[HeaderClass], Target.[HeaderClass]) IS NOT NULL OR NULLIF(Target.[HeaderClass], Source.[HeaderClass]) IS NOT NULL OR 
	NULLIF(Source.[ModuleClass], Target.[ModuleClass]) IS NOT NULL OR NULLIF(Target.[ModuleClass], Source.[ModuleClass]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringID], Target.[ConnStringID]) IS NOT NULL OR NULLIF(Target.[ConnStringID], Source.[ConnStringID]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [LayoutPositionId] = Source.[LayoutPositionId], 
  [RelationWhere] = Source.[RelationWhere], 
  [Order] = Source.[Order], 
  [SQlEnabled] = Source.[SQlEnabled], 
  [SQLEnabledDescrip] = Source.[SQLEnabledDescrip], 
  [Title] = Source.[Title], 
  [IconName] = Source.[IconName], 
  [HeaderClass] = Source.[HeaderClass], 
  [ModuleClass] = Source.[ModuleClass], 
  [ConnStringID] = Source.[ConnStringID], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PageName],[ModuleName],[LayoutPositionId],[RelationWhere],[Order],[SQlEnabled],[SQLEnabledDescrip],[Title],[IconName],[HeaderClass],[ModuleClass],[ConnStringID],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[PageName],Source.[ModuleName],Source.[LayoutPositionId],Source.[RelationWhere],Source.[Order],Source.[SQlEnabled],Source.[SQLEnabledDescrip],Source.[Title],Source.[IconName],Source.[HeaderClass],Source.[ModuleClass],Source.[ConnStringID],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





