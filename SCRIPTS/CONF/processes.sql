

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ProcessName":"ActualizarNotificacion",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"ActualizarNotificacion",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Notificaciones",
	"Method":"ActualizarNotificacion",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":true,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T12:28:00",
	"flxUpdatedDate":"2025-03-05T12:28:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"EditarNoticia",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"EditarNoticia",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Noticias",
	"Method":"EditarNoticia",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":true,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-04-09T21:33:00",
	"flxUpdatedDate":"2025-04-09T21:33:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"NotificarNotificacion",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"NotificarNotificacion",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Notificaciones",
	"Method":"NotificarNotificacion",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":true,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T12:50:00",
	"flxUpdatedDate":"2025-03-05T12:50:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"NuevaNoticia",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"NuevaNoticia",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Noticias",
	"Method":"NuevaNoticia",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":true,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-04-09T21:32:00",
	"flxUpdatedDate":"2025-04-09T21:32:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"NuevoDocumentoPost",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"NuevoDocumentoPost",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Documentos",
	"Method":"NuevoDocumentoPost",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":true,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-04-09T21:06:00",
	"flxUpdatedDate":"2025-04-09T21:06:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"PERS_CambiaFechaSincronizacion",
	"TypeId":0,
	"ClassId":"product",
	"ProcessDescrip":"PERS_CambiaFechaSincronizacion",
	"StoredName":"PPERS_CambiarFechaSincronizacion",
	"TimeOut":0,
	"ConnStringId":"DataConnectionString",
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":false,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"PERS_Notificacion_Read_JS",
	"TypeId":3,
	"ClassId":"product",
	"ProcessDescrip":"PERS_Notificacion_Read_JS",
	"Code":"flexygo.nav.execProcess(''PPERS_Emp_reads_Notificaciones'',''PERS_Notificacion'','''',null,[{''key'':''IdNotificacion'',''value'': {{IdNotificacion}}}],''popup'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this),false,false)",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":0,
	"AuditableErrors":1,
	"Refresh":false,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":false,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T21:45:00",
	"flxUpdatedDate":"2025-03-05T09:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"PPERS_Emp_reads_Notificaciones",
	"TypeId":0,
	"ClassId":"product",
	"ProcessDescrip":"PPERS_Emp_reads_Notificaciones",
	"StoredName":"PPERS_Emp_reads_Notificaciones",
	"TimeOut":0,
	"ConnStringId":"DataConnectionString",
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":true,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":false,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T09:01:00",
	"flxUpdatedDate":"2025-03-05T09:06:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"SincronizarEmpleadosNetTime",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"SincronizarEmpleadosNetTime",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Procesos",
	"Method":"SincronizarEmpleadosNetTime",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":false,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"SincronizarMarcajes",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"SincronizarMarcajes",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Procesos",
	"Method":"SincronizarMarcajes",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":false,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-03-12T11:45:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"SincronizarMarcajesTipos",
	"TypeId":1,
	"ClassId":"product",
	"ProcessDescrip":"SincronizarMarcajesTipos",
	"File":"~\/custom\/bin\/SEBASTIAN_PROGECO_VS.dll",
	"Class":"SEBASTIAN_PROGECO_VS.Procesos",
	"Method":"SincronizarMarcajesTipos",
	"TimeOut":0,
	"TargetId":"modal640x480",
	"Auditable":1,
	"AuditableErrors":1,
	"Refresh":false,
	"IsTransacted":false,
	"AdminOnly":false,
	"ConfirmOkText":true,
	"CloseDialogOnOk":false,
	"GipeParams":false,
	"Reserved":false,
	"Offline":false,
	"LoadFromMemory":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Processes] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ProcessName] nvarchar(255) '$.ProcessName'
,[TypeId] int '$.TypeId'
,[ClassId] nvarchar(50) '$.ClassId'
,[ConfirmText] varchar(200) '$.ConfirmText'
,[LoadingMessage] nvarchar(500) '$.LoadingMessage'
,[ProcessDescrip] nvarchar(500) '$.ProcessDescrip'
,[ParamsDescrip] nvarchar(500) '$.ParamsDescrip'
,[ReturnDescrip] nvarchar(500) '$.ReturnDescrip'
,[JSforParams] varchar(2000) '$.JSforParams'
,[File] varchar(255) '$.File'
,[Class] varchar(255) '$.Class'
,[Method] varchar(50) '$.Method'
,[StoredName] varchar(255) '$.StoredName'
,[Code] varchar(max) '$.Code'
,[ExternalUrl] varchar(255) '$.ExternalUrl'
,[PageTypeId] nvarchar(50) '$.PageTypeId'
,[PageName] nvarchar(100) '$.PageName'
,[ReportName] nvarchar(200) '$.ReportName'
,[HelpId] uniqueidentifier '$.HelpId'
,[ReportWhere] nvarchar(1000) '$.ReportWhere'
,[ObjectName] nvarchar(50) '$.ObjectName'
,[ObjectWhere] nvarchar(1000) '$.ObjectWhere'
,[Defaults] varchar(2000) '$.Defaults'
,[TimeOut] int '$.TimeOut'
,[ConnStringId] nvarchar(255) '$.ConnStringId'
,[TargetId] nvarchar(50) '$.TargetId'
,[ProcessFlowText] nvarchar(500) '$.ProcessFlowText'
,[Auditable] int '$.Auditable'
,[AuditableErrors] int '$.AuditableErrors'
,[Refresh] bit '$.Refresh'
,[IsTransacted] bit '$.IsTransacted'
,[AdminOnly] bit '$.AdminOnly'
,[ConfirmOkText] bit '$.ConfirmOkText'
,[CloseDialogOnOk] bit '$.CloseDialogOnOk'
,[RunButtonText] nvarchar(100) '$.RunButtonText'
,[RunButtonIconName] nvarchar(100) '$.RunButtonIconName'
,[LoadProcessName] nvarchar(255) '$.LoadProcessName'
,[GipeParams] bit '$.GipeParams'
,[Summary] nvarchar(max) '$.Summary'
,[ReturnTableNames] nvarchar(max) '$.ReturnTableNames'
,[Reserved] bit '$.Reserved'
,[Offline] bit '$.Offline'
,[BeforeExec] nvarchar(255) '$.BeforeExec'
,[AfterExec] nvarchar(255) '$.AfterExec'
,[LoadFromMemory] bit '$.LoadFromMemory'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ProcessName],[TypeId],[ClassId],[ConfirmText],[LoadingMessage],[ProcessDescrip],[ParamsDescrip],[ReturnDescrip],[JSforParams],[File],[Class],[Method],[StoredName],[Code],[ExternalUrl],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[TimeOut],[ConnStringId],[TargetId],[ProcessFlowText],[Auditable],[AuditableErrors],[Refresh],[IsTransacted],[AdminOnly],[ConfirmOkText],[CloseDialogOnOk],[RunButtonText],[RunButtonIconName],[LoadProcessName],[GipeParams],[Summary],[ReturnTableNames],[Reserved],[Offline],[BeforeExec],[AfterExec],[LoadFromMemory],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ProcessName] = Source.[ProcessName])
WHEN MATCHED AND (
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[ClassId], Target.[ClassId]) IS NOT NULL OR NULLIF(Target.[ClassId], Source.[ClassId]) IS NOT NULL OR 
	NULLIF(Source.[ConfirmText], Target.[ConfirmText]) IS NOT NULL OR NULLIF(Target.[ConfirmText], Source.[ConfirmText]) IS NOT NULL OR 
	NULLIF(Source.[LoadingMessage], Target.[LoadingMessage]) IS NOT NULL OR NULLIF(Target.[LoadingMessage], Source.[LoadingMessage]) IS NOT NULL OR 
	NULLIF(Source.[ProcessDescrip], Target.[ProcessDescrip]) IS NOT NULL OR NULLIF(Target.[ProcessDescrip], Source.[ProcessDescrip]) IS NOT NULL OR 
	NULLIF(Source.[ParamsDescrip], Target.[ParamsDescrip]) IS NOT NULL OR NULLIF(Target.[ParamsDescrip], Source.[ParamsDescrip]) IS NOT NULL OR 
	NULLIF(Source.[ReturnDescrip], Target.[ReturnDescrip]) IS NOT NULL OR NULLIF(Target.[ReturnDescrip], Source.[ReturnDescrip]) IS NOT NULL OR 
	NULLIF(Source.[JSforParams], Target.[JSforParams]) IS NOT NULL OR NULLIF(Target.[JSforParams], Source.[JSforParams]) IS NOT NULL OR 
	NULLIF(Source.[File], Target.[File]) IS NOT NULL OR NULLIF(Target.[File], Source.[File]) IS NOT NULL OR 
	NULLIF(Source.[Class], Target.[Class]) IS NOT NULL OR NULLIF(Target.[Class], Source.[Class]) IS NOT NULL OR 
	NULLIF(Source.[Method], Target.[Method]) IS NOT NULL OR NULLIF(Target.[Method], Source.[Method]) IS NOT NULL OR 
	NULLIF(Source.[StoredName], Target.[StoredName]) IS NOT NULL OR NULLIF(Target.[StoredName], Source.[StoredName]) IS NOT NULL OR 
	NULLIF(Source.[Code], Target.[Code]) IS NOT NULL OR NULLIF(Target.[Code], Source.[Code]) IS NOT NULL OR 
	NULLIF(Source.[ExternalUrl], Target.[ExternalUrl]) IS NOT NULL OR NULLIF(Target.[ExternalUrl], Source.[ExternalUrl]) IS NOT NULL OR 
	NULLIF(Source.[PageTypeId], Target.[PageTypeId]) IS NOT NULL OR NULLIF(Target.[PageTypeId], Source.[PageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PageName], Target.[PageName]) IS NOT NULL OR NULLIF(Target.[PageName], Source.[PageName]) IS NOT NULL OR 
	NULLIF(Source.[ReportName], Target.[ReportName]) IS NOT NULL OR NULLIF(Target.[ReportName], Source.[ReportName]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ReportWhere], Target.[ReportWhere]) IS NOT NULL OR NULLIF(Target.[ReportWhere], Source.[ReportWhere]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[Defaults], Target.[Defaults]) IS NOT NULL OR NULLIF(Target.[Defaults], Source.[Defaults]) IS NOT NULL OR 
	NULLIF(Source.[TimeOut], Target.[TimeOut]) IS NOT NULL OR NULLIF(Target.[TimeOut], Source.[TimeOut]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[TargetId], Target.[TargetId]) IS NOT NULL OR NULLIF(Target.[TargetId], Source.[TargetId]) IS NOT NULL OR 
	NULLIF(Source.[ProcessFlowText], Target.[ProcessFlowText]) IS NOT NULL OR NULLIF(Target.[ProcessFlowText], Source.[ProcessFlowText]) IS NOT NULL OR 
	NULLIF(Source.[Auditable], Target.[Auditable]) IS NOT NULL OR NULLIF(Target.[Auditable], Source.[Auditable]) IS NOT NULL OR 
	NULLIF(Source.[AuditableErrors], Target.[AuditableErrors]) IS NOT NULL OR NULLIF(Target.[AuditableErrors], Source.[AuditableErrors]) IS NOT NULL OR 
	NULLIF(Source.[Refresh], Target.[Refresh]) IS NOT NULL OR NULLIF(Target.[Refresh], Source.[Refresh]) IS NOT NULL OR 
	NULLIF(Source.[IsTransacted], Target.[IsTransacted]) IS NOT NULL OR NULLIF(Target.[IsTransacted], Source.[IsTransacted]) IS NOT NULL OR 
	NULLIF(Source.[AdminOnly], Target.[AdminOnly]) IS NOT NULL OR NULLIF(Target.[AdminOnly], Source.[AdminOnly]) IS NOT NULL OR 
	NULLIF(Source.[ConfirmOkText], Target.[ConfirmOkText]) IS NOT NULL OR NULLIF(Target.[ConfirmOkText], Source.[ConfirmOkText]) IS NOT NULL OR 
	NULLIF(Source.[CloseDialogOnOk], Target.[CloseDialogOnOk]) IS NOT NULL OR NULLIF(Target.[CloseDialogOnOk], Source.[CloseDialogOnOk]) IS NOT NULL OR 
	NULLIF(Source.[RunButtonText], Target.[RunButtonText]) IS NOT NULL OR NULLIF(Target.[RunButtonText], Source.[RunButtonText]) IS NOT NULL OR 
	NULLIF(Source.[RunButtonIconName], Target.[RunButtonIconName]) IS NOT NULL OR NULLIF(Target.[RunButtonIconName], Source.[RunButtonIconName]) IS NOT NULL OR 
	NULLIF(Source.[LoadProcessName], Target.[LoadProcessName]) IS NOT NULL OR NULLIF(Target.[LoadProcessName], Source.[LoadProcessName]) IS NOT NULL OR 
	NULLIF(Source.[GipeParams], Target.[GipeParams]) IS NOT NULL OR NULLIF(Target.[GipeParams], Source.[GipeParams]) IS NOT NULL OR 
	NULLIF(Source.[Summary], Target.[Summary]) IS NOT NULL OR NULLIF(Target.[Summary], Source.[Summary]) IS NOT NULL OR 
	NULLIF(Source.[ReturnTableNames], Target.[ReturnTableNames]) IS NOT NULL OR NULLIF(Target.[ReturnTableNames], Source.[ReturnTableNames]) IS NOT NULL OR 
	NULLIF(Source.[Reserved], Target.[Reserved]) IS NOT NULL OR NULLIF(Target.[Reserved], Source.[Reserved]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[BeforeExec], Target.[BeforeExec]) IS NOT NULL OR NULLIF(Target.[BeforeExec], Source.[BeforeExec]) IS NOT NULL OR 
	NULLIF(Source.[AfterExec], Target.[AfterExec]) IS NOT NULL OR NULLIF(Target.[AfterExec], Source.[AfterExec]) IS NOT NULL OR 
	NULLIF(Source.[LoadFromMemory], Target.[LoadFromMemory]) IS NOT NULL OR NULLIF(Target.[LoadFromMemory], Source.[LoadFromMemory]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [TypeId] = Source.[TypeId], 
  [ClassId] = Source.[ClassId], 
  [ConfirmText] = Source.[ConfirmText], 
  [LoadingMessage] = Source.[LoadingMessage], 
  [ProcessDescrip] = Source.[ProcessDescrip], 
  [ParamsDescrip] = Source.[ParamsDescrip], 
  [ReturnDescrip] = Source.[ReturnDescrip], 
  [JSforParams] = Source.[JSforParams], 
  [File] = Source.[File], 
  [Class] = Source.[Class], 
  [Method] = Source.[Method], 
  [StoredName] = Source.[StoredName], 
  [Code] = Source.[Code], 
  [ExternalUrl] = Source.[ExternalUrl], 
  [PageTypeId] = Source.[PageTypeId], 
  [PageName] = Source.[PageName], 
  [ReportName] = Source.[ReportName], 
  [HelpId] = Source.[HelpId], 
  [ReportWhere] = Source.[ReportWhere], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [Defaults] = Source.[Defaults], 
  [TimeOut] = Source.[TimeOut], 
  [ConnStringId] = Source.[ConnStringId], 
  [TargetId] = Source.[TargetId], 
  [ProcessFlowText] = Source.[ProcessFlowText], 
  [Auditable] = Source.[Auditable], 
  [AuditableErrors] = Source.[AuditableErrors], 
  [Refresh] = Source.[Refresh], 
  [IsTransacted] = Source.[IsTransacted], 
  [AdminOnly] = Source.[AdminOnly], 
  [ConfirmOkText] = Source.[ConfirmOkText], 
  [CloseDialogOnOk] = Source.[CloseDialogOnOk], 
  [RunButtonText] = Source.[RunButtonText], 
  [RunButtonIconName] = Source.[RunButtonIconName], 
  [LoadProcessName] = Source.[LoadProcessName], 
  [GipeParams] = Source.[GipeParams], 
  [Summary] = Source.[Summary], 
  [ReturnTableNames] = Source.[ReturnTableNames], 
  [Reserved] = Source.[Reserved], 
  [Offline] = Source.[Offline], 
  [BeforeExec] = Source.[BeforeExec], 
  [AfterExec] = Source.[AfterExec], 
  [LoadFromMemory] = Source.[LoadFromMemory], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProcessName],[TypeId],[ClassId],[ConfirmText],[LoadingMessage],[ProcessDescrip],[ParamsDescrip],[ReturnDescrip],[JSforParams],[File],[Class],[Method],[StoredName],[Code],[ExternalUrl],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[TimeOut],[ConnStringId],[TargetId],[ProcessFlowText],[Auditable],[AuditableErrors],[Refresh],[IsTransacted],[AdminOnly],[ConfirmOkText],[CloseDialogOnOk],[RunButtonText],[RunButtonIconName],[LoadProcessName],[GipeParams],[Summary],[ReturnTableNames],[Reserved],[Offline],[BeforeExec],[AfterExec],[LoadFromMemory],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ProcessName],Source.[TypeId],Source.[ClassId],Source.[ConfirmText],Source.[LoadingMessage],Source.[ProcessDescrip],Source.[ParamsDescrip],Source.[ReturnDescrip],Source.[JSforParams],Source.[File],Source.[Class],Source.[Method],Source.[StoredName],Source.[Code],Source.[ExternalUrl],Source.[PageTypeId],Source.[PageName],Source.[ReportName],Source.[HelpId],Source.[ReportWhere],Source.[ObjectName],Source.[ObjectWhere],Source.[Defaults],Source.[TimeOut],Source.[ConnStringId],Source.[TargetId],Source.[ProcessFlowText],Source.[Auditable],Source.[AuditableErrors],Source.[Refresh],Source.[IsTransacted],Source.[AdminOnly],Source.[ConfirmOkText],Source.[CloseDialogOnOk],Source.[RunButtonText],Source.[RunButtonIconName],Source.[LoadProcessName],Source.[GipeParams],Source.[Summary],Source.[ReturnTableNames],Source.[Reserved],Source.[Offline],Source.[BeforeExec],Source.[AfterExec],Source.[LoadFromMemory],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





