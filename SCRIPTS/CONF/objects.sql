

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"Pers_Marcaje",
	"Iscollection":false,
	"TableName":"Pers_Marcaje",
	"Schema":"dbo",
	"ConfigDB":false,
	"Descrip":"Pers_Marcajes",
	"IconName":"clock5",
	"ShowDefaultMenu":false,
	"DefaultPageSize":200,
	"ParsedDescrip":"Pers_Marcaje",
	"Auditable":0,
	"AuditableErrors":1,
	"Active":true,
	"CanInsert":true,
	"CanUpdate":true,
	"CanDelete":true,
	"CanView":true,
	"CanPrint":true,
	"InsertType":"standard",
	"UpdateType":"standard",
	"DeleteType":"standard",
	"InsertTriggerEvent":false,
	"UpdateTriggerEvent":false,
	"DeleteTriggerEvent":false,
	"Clonable":true,
	"IgnoreDBRequired":false,
	"ConnStringID":"DataConnectionString",
	"TransactionOn":true,
	"Offline":false,
	"ConfirmOkText":true,
	"Reserved":false,
	"FriendlyURL":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcajes",
	"Iscollection":true,
	"ObjectChildName":"Pers_Marcaje",
	"TableName":"Pers_Marcaje",
	"Schema":"dbo",
	"ConfigDB":false,
	"Descrip":"Pers_Marcajes",
	"IconName":"clock5",
	"ShowDefaultMenu":false,
	"DefaultPageSize":200,
	"ParsedDescrip":"Pers_Marcajes",
	"Auditable":0,
	"AuditableErrors":1,
	"Active":true,
	"CanInsert":true,
	"CanUpdate":true,
	"CanDelete":true,
	"CanView":true,
	"CanPrint":true,
	"InsertType":"standard",
	"UpdateType":"standard",
	"DeleteType":"standard",
	"InsertTriggerEvent":false,
	"UpdateTriggerEvent":false,
	"DeleteTriggerEvent":false,
	"Clonable":true,
	"IgnoreDBRequired":false,
	"ConnStringID":"DataConnectionString",
	"TransactionOn":true,
	"Offline":false,
	"ConfirmOkText":true,
	"Reserved":false,
	"FriendlyURL":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"Iscollection":false,
	"TableName":"PERS_Notificaciones",
	"Schema":"dbo",
	"ConfigDB":false,
	"Descrip":"Notificaciones",
	"IconName":"bell-2",
	"ShowDefaultMenu":false,
	"DefaultPageSize":200,
	"ParsedDescrip":"Notificacion",
	"Auditable":0,
	"AuditableErrors":1,
	"Active":true,
	"CanInsert":true,
	"CanUpdate":true,
	"CanDelete":true,
	"CanView":true,
	"CanPrint":true,
	"InsertType":"standard",
	"UpdateType":"dll",
	"DeleteType":"standard",
	"UpdateProcessName":"ActualizarNotificacion",
	"InsertTriggerEvent":false,
	"UpdateTriggerEvent":false,
	"DeleteTriggerEvent":false,
	"Clonable":true,
	"IgnoreDBRequired":false,
	"ConnStringID":"DataConnectionString",
	"TransactionOn":true,
	"Offline":false,
	"AfterInsert":"NotificarNotificacion",
	"ConfirmOkText":true,
	"Reserved":false,
	"FriendlyURL":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T17:01:00",
	"flxUpdatedDate":"2025-03-05T12:51:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificaciones",
	"Iscollection":true,
	"ObjectChildName":"PERS_Notificacion",
	"TableName":"PERS_Notificaciones",
	"Schema":"dbo",
	"ConfigDB":false,
	"Descrip":"Notificaciones",
	"IconName":"bell-2",
	"ShowDefaultMenu":false,
	"DefaultPageSize":200,
	"ParsedDescrip":"Notificaciones",
	"Auditable":0,
	"AuditableErrors":1,
	"Active":true,
	"CanInsert":true,
	"CanUpdate":true,
	"CanDelete":true,
	"CanView":true,
	"CanPrint":true,
	"InsertType":"standard",
	"UpdateType":"standard",
	"DeleteType":"standard",
	"InsertTriggerEvent":false,
	"UpdateTriggerEvent":false,
	"DeleteTriggerEvent":false,
	"Clonable":true,
	"IgnoreDBRequired":false,
	"ConnStringID":"DataConnectionString",
	"TransactionOn":true,
	"Offline":false,
	"ConfirmOkText":true,
	"Reserved":false,
	"FriendlyURL":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T17:01:00",
	"flxUpdatedDate":"2025-03-04T17:01:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[Iscollection] bit '$.Iscollection'
,[ObjectChildName] nvarchar(50) '$.ObjectChildName'
,[TableName] nvarchar(255) '$.TableName'
,[Schema] nvarchar(100) '$.Schema'
,[WhereSentence] nvarchar(1000) '$.WhereSentence'
,[ConfigDB] bit '$.ConfigDB'
,[OrderBy] varchar(100) '$.OrderBy'
,[Descrip] nvarchar(255) '$.Descrip'
,[IconName] nvarchar(100) '$.IconName'
,[UniqueIdentifierField] nvarchar(50) '$.UniqueIdentifierField'
,[ShowDefaultMenu] bit '$.ShowDefaultMenu'
,[DefaultPageSize] int '$.DefaultPageSize'
,[ParsedDescrip] nvarchar(255) '$.ParsedDescrip'
,[Auditable] int '$.Auditable'
,[AuditableErrors] int '$.AuditableErrors'
,[Active] bit '$.Active'
,[CanInsert] bit '$.CanInsert'
,[CanUpdate] bit '$.CanUpdate'
,[CanDelete] bit '$.CanDelete'
,[CanView] bit '$.CanView'
,[CanPrint] bit '$.CanPrint'
,[InsertType] nvarchar(10) '$.InsertType'
,[UpdateType] nvarchar(10) '$.UpdateType'
,[DeleteType] nvarchar(10) '$.DeleteType'
,[InsertProcessName] nvarchar(255) '$.InsertProcessName'
,[UpdateProcessName] nvarchar(255) '$.UpdateProcessName'
,[DeleteProcessName] nvarchar(255) '$.DeleteProcessName'
,[LoadProcessName] nvarchar(255) '$.LoadProcessName'
,[InsertTriggerEvent] bit '$.InsertTriggerEvent'
,[UpdateTriggerEvent] bit '$.UpdateTriggerEvent'
,[DeleteTriggerEvent] bit '$.DeleteTriggerEvent'
,[HelpId] nvarchar(50) '$.HelpId'
,[OverrideObjectName] nvarchar(50) '$.OverrideObjectName'
,[OverrideObjectWhere] nvarchar(1000) '$.OverrideObjectWhere'
,[NavigateNodeId] uniqueidentifier '$.NavigateNodeId'
,[Clonable] bit '$.Clonable'
,[ViewKeys] nvarchar(100) '$.ViewKeys'
,[IgnoreDBRequired] bit '$.IgnoreDBRequired'
,[ConnStringID] nvarchar(50) '$.ConnStringID'
,[TransactionOn] bit '$.TransactionOn'
,[InsertFlowText] nvarchar(500) '$.InsertFlowText'
,[UpdateFlowText] nvarchar(500) '$.UpdateFlowText'
,[DeleteFlowText] nvarchar(500) '$.DeleteFlowText'
,[Offline] bit '$.Offline'
,[BeforeUpdate] nvarchar(255) '$.BeforeUpdate'
,[BeforeInsert] nvarchar(255) '$.BeforeInsert'
,[BeforeDelete] nvarchar(255) '$.BeforeDelete'
,[AfterUpdate] nvarchar(255) '$.AfterUpdate'
,[AfterInsert] nvarchar(255) '$.AfterInsert'
,[AfterDelete] nvarchar(255) '$.AfterDelete'
,[ConfirmOkText] bit '$.ConfirmOkText'
,[Reserved] bit '$.Reserved'
,[FriendlyURL] bit '$.FriendlyURL'
,[DeleteConfirm] nvarchar(500) '$.DeleteConfirm'
,[AIDescrip] nvarchar(max) '$.AIDescrip'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[Iscollection],[ObjectChildName],[TableName],[Schema],[WhereSentence],[ConfigDB],[OrderBy],[Descrip],[IconName],[UniqueIdentifierField],[ShowDefaultMenu],[DefaultPageSize],[ParsedDescrip],[Auditable],[AuditableErrors],[Active],[CanInsert],[CanUpdate],[CanDelete],[CanView],[CanPrint],[InsertType],[UpdateType],[DeleteType],[InsertProcessName],[UpdateProcessName],[DeleteProcessName],[LoadProcessName],[InsertTriggerEvent],[UpdateTriggerEvent],[DeleteTriggerEvent],[HelpId],[OverrideObjectName],[OverrideObjectWhere],[NavigateNodeId],[Clonable],[ViewKeys],[IgnoreDBRequired],[ConnStringID],[TransactionOn],[InsertFlowText],[UpdateFlowText],[DeleteFlowText],[Offline],[BeforeUpdate],[BeforeInsert],[BeforeDelete],[AfterUpdate],[AfterInsert],[AfterDelete],[ConfirmOkText],[Reserved],[FriendlyURL],[DeleteConfirm],[AIDescrip],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName])
WHEN MATCHED AND (
	NULLIF(Source.[Iscollection], Target.[Iscollection]) IS NOT NULL OR NULLIF(Target.[Iscollection], Source.[Iscollection]) IS NOT NULL OR 
	NULLIF(Source.[ObjectChildName], Target.[ObjectChildName]) IS NOT NULL OR NULLIF(Target.[ObjectChildName], Source.[ObjectChildName]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[Schema], Target.[Schema]) IS NOT NULL OR NULLIF(Target.[Schema], Source.[Schema]) IS NOT NULL OR 
	NULLIF(Source.[WhereSentence], Target.[WhereSentence]) IS NOT NULL OR NULLIF(Target.[WhereSentence], Source.[WhereSentence]) IS NOT NULL OR 
	NULLIF(Source.[ConfigDB], Target.[ConfigDB]) IS NOT NULL OR NULLIF(Target.[ConfigDB], Source.[ConfigDB]) IS NOT NULL OR 
	NULLIF(Source.[OrderBy], Target.[OrderBy]) IS NOT NULL OR NULLIF(Target.[OrderBy], Source.[OrderBy]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[UniqueIdentifierField], Target.[UniqueIdentifierField]) IS NOT NULL OR NULLIF(Target.[UniqueIdentifierField], Source.[UniqueIdentifierField]) IS NOT NULL OR 
	NULLIF(Source.[ShowDefaultMenu], Target.[ShowDefaultMenu]) IS NOT NULL OR NULLIF(Target.[ShowDefaultMenu], Source.[ShowDefaultMenu]) IS NOT NULL OR 
	NULLIF(Source.[DefaultPageSize], Target.[DefaultPageSize]) IS NOT NULL OR NULLIF(Target.[DefaultPageSize], Source.[DefaultPageSize]) IS NOT NULL OR 
	NULLIF(Source.[ParsedDescrip], Target.[ParsedDescrip]) IS NOT NULL OR NULLIF(Target.[ParsedDescrip], Source.[ParsedDescrip]) IS NOT NULL OR 
	NULLIF(Source.[Auditable], Target.[Auditable]) IS NOT NULL OR NULLIF(Target.[Auditable], Source.[Auditable]) IS NOT NULL OR 
	NULLIF(Source.[AuditableErrors], Target.[AuditableErrors]) IS NOT NULL OR NULLIF(Target.[AuditableErrors], Source.[AuditableErrors]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[CanInsert], Target.[CanInsert]) IS NOT NULL OR NULLIF(Target.[CanInsert], Source.[CanInsert]) IS NOT NULL OR 
	NULLIF(Source.[CanUpdate], Target.[CanUpdate]) IS NOT NULL OR NULLIF(Target.[CanUpdate], Source.[CanUpdate]) IS NOT NULL OR 
	NULLIF(Source.[CanDelete], Target.[CanDelete]) IS NOT NULL OR NULLIF(Target.[CanDelete], Source.[CanDelete]) IS NOT NULL OR 
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[CanPrint], Target.[CanPrint]) IS NOT NULL OR NULLIF(Target.[CanPrint], Source.[CanPrint]) IS NOT NULL OR 
	NULLIF(Source.[InsertType], Target.[InsertType]) IS NOT NULL OR NULLIF(Target.[InsertType], Source.[InsertType]) IS NOT NULL OR 
	NULLIF(Source.[UpdateType], Target.[UpdateType]) IS NOT NULL OR NULLIF(Target.[UpdateType], Source.[UpdateType]) IS NOT NULL OR 
	NULLIF(Source.[DeleteType], Target.[DeleteType]) IS NOT NULL OR NULLIF(Target.[DeleteType], Source.[DeleteType]) IS NOT NULL OR 
	NULLIF(Source.[InsertProcessName], Target.[InsertProcessName]) IS NOT NULL OR NULLIF(Target.[InsertProcessName], Source.[InsertProcessName]) IS NOT NULL OR 
	NULLIF(Source.[UpdateProcessName], Target.[UpdateProcessName]) IS NOT NULL OR NULLIF(Target.[UpdateProcessName], Source.[UpdateProcessName]) IS NOT NULL OR 
	NULLIF(Source.[DeleteProcessName], Target.[DeleteProcessName]) IS NOT NULL OR NULLIF(Target.[DeleteProcessName], Source.[DeleteProcessName]) IS NOT NULL OR 
	NULLIF(Source.[LoadProcessName], Target.[LoadProcessName]) IS NOT NULL OR NULLIF(Target.[LoadProcessName], Source.[LoadProcessName]) IS NOT NULL OR 
	NULLIF(Source.[InsertTriggerEvent], Target.[InsertTriggerEvent]) IS NOT NULL OR NULLIF(Target.[InsertTriggerEvent], Source.[InsertTriggerEvent]) IS NOT NULL OR 
	NULLIF(Source.[UpdateTriggerEvent], Target.[UpdateTriggerEvent]) IS NOT NULL OR NULLIF(Target.[UpdateTriggerEvent], Source.[UpdateTriggerEvent]) IS NOT NULL OR 
	NULLIF(Source.[DeleteTriggerEvent], Target.[DeleteTriggerEvent]) IS NOT NULL OR NULLIF(Target.[DeleteTriggerEvent], Source.[DeleteTriggerEvent]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[OverrideObjectName], Target.[OverrideObjectName]) IS NOT NULL OR NULLIF(Target.[OverrideObjectName], Source.[OverrideObjectName]) IS NOT NULL OR 
	NULLIF(Source.[OverrideObjectWhere], Target.[OverrideObjectWhere]) IS NOT NULL OR NULLIF(Target.[OverrideObjectWhere], Source.[OverrideObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[NavigateNodeId], Target.[NavigateNodeId]) IS NOT NULL OR NULLIF(Target.[NavigateNodeId], Source.[NavigateNodeId]) IS NOT NULL OR 
	NULLIF(Source.[Clonable], Target.[Clonable]) IS NOT NULL OR NULLIF(Target.[Clonable], Source.[Clonable]) IS NOT NULL OR 
	NULLIF(Source.[ViewKeys], Target.[ViewKeys]) IS NOT NULL OR NULLIF(Target.[ViewKeys], Source.[ViewKeys]) IS NOT NULL OR 
	NULLIF(Source.[IgnoreDBRequired], Target.[IgnoreDBRequired]) IS NOT NULL OR NULLIF(Target.[IgnoreDBRequired], Source.[IgnoreDBRequired]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringID], Target.[ConnStringID]) IS NOT NULL OR NULLIF(Target.[ConnStringID], Source.[ConnStringID]) IS NOT NULL OR 
	NULLIF(Source.[TransactionOn], Target.[TransactionOn]) IS NOT NULL OR NULLIF(Target.[TransactionOn], Source.[TransactionOn]) IS NOT NULL OR 
	NULLIF(Source.[InsertFlowText], Target.[InsertFlowText]) IS NOT NULL OR NULLIF(Target.[InsertFlowText], Source.[InsertFlowText]) IS NOT NULL OR 
	NULLIF(Source.[UpdateFlowText], Target.[UpdateFlowText]) IS NOT NULL OR NULLIF(Target.[UpdateFlowText], Source.[UpdateFlowText]) IS NOT NULL OR 
	NULLIF(Source.[DeleteFlowText], Target.[DeleteFlowText]) IS NOT NULL OR NULLIF(Target.[DeleteFlowText], Source.[DeleteFlowText]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[BeforeUpdate], Target.[BeforeUpdate]) IS NOT NULL OR NULLIF(Target.[BeforeUpdate], Source.[BeforeUpdate]) IS NOT NULL OR 
	NULLIF(Source.[BeforeInsert], Target.[BeforeInsert]) IS NOT NULL OR NULLIF(Target.[BeforeInsert], Source.[BeforeInsert]) IS NOT NULL OR 
	NULLIF(Source.[BeforeDelete], Target.[BeforeDelete]) IS NOT NULL OR NULLIF(Target.[BeforeDelete], Source.[BeforeDelete]) IS NOT NULL OR 
	NULLIF(Source.[AfterUpdate], Target.[AfterUpdate]) IS NOT NULL OR NULLIF(Target.[AfterUpdate], Source.[AfterUpdate]) IS NOT NULL OR 
	NULLIF(Source.[AfterInsert], Target.[AfterInsert]) IS NOT NULL OR NULLIF(Target.[AfterInsert], Source.[AfterInsert]) IS NOT NULL OR 
	NULLIF(Source.[AfterDelete], Target.[AfterDelete]) IS NOT NULL OR NULLIF(Target.[AfterDelete], Source.[AfterDelete]) IS NOT NULL OR 
	NULLIF(Source.[ConfirmOkText], Target.[ConfirmOkText]) IS NOT NULL OR NULLIF(Target.[ConfirmOkText], Source.[ConfirmOkText]) IS NOT NULL OR 
	NULLIF(Source.[Reserved], Target.[Reserved]) IS NOT NULL OR NULLIF(Target.[Reserved], Source.[Reserved]) IS NOT NULL OR 
	NULLIF(Source.[FriendlyURL], Target.[FriendlyURL]) IS NOT NULL OR NULLIF(Target.[FriendlyURL], Source.[FriendlyURL]) IS NOT NULL OR 
	NULLIF(Source.[DeleteConfirm], Target.[DeleteConfirm]) IS NOT NULL OR NULLIF(Target.[DeleteConfirm], Source.[DeleteConfirm]) IS NOT NULL OR 
	NULLIF(Source.[AIDescrip], Target.[AIDescrip]) IS NOT NULL OR NULLIF(Target.[AIDescrip], Source.[AIDescrip]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Iscollection] = Source.[Iscollection], 
  [ObjectChildName] = Source.[ObjectChildName], 
  [TableName] = Source.[TableName], 
  [Schema] = Source.[Schema], 
  [WhereSentence] = Source.[WhereSentence], 
  [ConfigDB] = Source.[ConfigDB], 
  [OrderBy] = Source.[OrderBy], 
  [Descrip] = Source.[Descrip], 
  [IconName] = Source.[IconName], 
  [UniqueIdentifierField] = Source.[UniqueIdentifierField], 
  [ShowDefaultMenu] = Source.[ShowDefaultMenu], 
  [DefaultPageSize] = Source.[DefaultPageSize], 
  [ParsedDescrip] = Source.[ParsedDescrip], 
  [Auditable] = Source.[Auditable], 
  [AuditableErrors] = Source.[AuditableErrors], 
  [Active] = Source.[Active], 
  [CanInsert] = Source.[CanInsert], 
  [CanUpdate] = Source.[CanUpdate], 
  [CanDelete] = Source.[CanDelete], 
  [CanView] = Source.[CanView], 
  [CanPrint] = Source.[CanPrint], 
  [InsertType] = Source.[InsertType], 
  [UpdateType] = Source.[UpdateType], 
  [DeleteType] = Source.[DeleteType], 
  [InsertProcessName] = Source.[InsertProcessName], 
  [UpdateProcessName] = Source.[UpdateProcessName], 
  [DeleteProcessName] = Source.[DeleteProcessName], 
  [LoadProcessName] = Source.[LoadProcessName], 
  [InsertTriggerEvent] = Source.[InsertTriggerEvent], 
  [UpdateTriggerEvent] = Source.[UpdateTriggerEvent], 
  [DeleteTriggerEvent] = Source.[DeleteTriggerEvent], 
  [HelpId] = Source.[HelpId], 
  [OverrideObjectName] = Source.[OverrideObjectName], 
  [OverrideObjectWhere] = Source.[OverrideObjectWhere], 
  [NavigateNodeId] = Source.[NavigateNodeId], 
  [Clonable] = Source.[Clonable], 
  [ViewKeys] = Source.[ViewKeys], 
  [IgnoreDBRequired] = Source.[IgnoreDBRequired], 
  [ConnStringID] = Source.[ConnStringID], 
  [TransactionOn] = Source.[TransactionOn], 
  [InsertFlowText] = Source.[InsertFlowText], 
  [UpdateFlowText] = Source.[UpdateFlowText], 
  [DeleteFlowText] = Source.[DeleteFlowText], 
  [Offline] = Source.[Offline], 
  [BeforeUpdate] = Source.[BeforeUpdate], 
  [BeforeInsert] = Source.[BeforeInsert], 
  [BeforeDelete] = Source.[BeforeDelete], 
  [AfterUpdate] = Source.[AfterUpdate], 
  [AfterInsert] = Source.[AfterInsert], 
  [AfterDelete] = Source.[AfterDelete], 
  [ConfirmOkText] = Source.[ConfirmOkText], 
  [Reserved] = Source.[Reserved], 
  [FriendlyURL] = Source.[FriendlyURL], 
  [DeleteConfirm] = Source.[DeleteConfirm], 
  [AIDescrip] = Source.[AIDescrip], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[Iscollection],[ObjectChildName],[TableName],[Schema],[WhereSentence],[ConfigDB],[OrderBy],[Descrip],[IconName],[UniqueIdentifierField],[ShowDefaultMenu],[DefaultPageSize],[ParsedDescrip],[Auditable],[AuditableErrors],[Active],[CanInsert],[CanUpdate],[CanDelete],[CanView],[CanPrint],[InsertType],[UpdateType],[DeleteType],[InsertProcessName],[UpdateProcessName],[DeleteProcessName],[LoadProcessName],[InsertTriggerEvent],[UpdateTriggerEvent],[DeleteTriggerEvent],[HelpId],[OverrideObjectName],[OverrideObjectWhere],[NavigateNodeId],[Clonable],[ViewKeys],[IgnoreDBRequired],[ConnStringID],[TransactionOn],[InsertFlowText],[UpdateFlowText],[DeleteFlowText],[Offline],[BeforeUpdate],[BeforeInsert],[BeforeDelete],[AfterUpdate],[AfterInsert],[AfterDelete],[ConfirmOkText],[Reserved],[FriendlyURL],[DeleteConfirm],[AIDescrip],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[Iscollection],Source.[ObjectChildName],Source.[TableName],Source.[Schema],Source.[WhereSentence],Source.[ConfigDB],Source.[OrderBy],Source.[Descrip],Source.[IconName],Source.[UniqueIdentifierField],Source.[ShowDefaultMenu],Source.[DefaultPageSize],Source.[ParsedDescrip],Source.[Auditable],Source.[AuditableErrors],Source.[Active],Source.[CanInsert],Source.[CanUpdate],Source.[CanDelete],Source.[CanView],Source.[CanPrint],Source.[InsertType],Source.[UpdateType],Source.[DeleteType],Source.[InsertProcessName],Source.[UpdateProcessName],Source.[DeleteProcessName],Source.[LoadProcessName],Source.[InsertTriggerEvent],Source.[UpdateTriggerEvent],Source.[DeleteTriggerEvent],Source.[HelpId],Source.[OverrideObjectName],Source.[OverrideObjectWhere],Source.[NavigateNodeId],Source.[Clonable],Source.[ViewKeys],Source.[IgnoreDBRequired],Source.[ConnStringID],Source.[TransactionOn],Source.[InsertFlowText],Source.[UpdateFlowText],Source.[DeleteFlowText],Source.[Offline],Source.[BeforeUpdate],Source.[BeforeInsert],Source.[BeforeDelete],Source.[AfterUpdate],Source.[AfterInsert],Source.[AfterDelete],Source.[ConfirmOkText],Source.[Reserved],Source.[FriendlyURL],Source.[DeleteConfirm],Source.[AIDescrip],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





