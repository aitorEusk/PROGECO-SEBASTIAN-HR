

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ProcessName":"PPERS_Emp_reads_Notificaciones",
	"ParamName":"EmployeeId",
	"Hide":false,
	"ParamTypeId":"integer",
	"DefaultValue":"{{currentReference}}",
	"Label":"EmployeeId",
	"IOTypeId":"IO",
	"PositionX":0,
	"PositionY":1,
	"Width":4,
	"Height":1,
	"TypeId":"number",
	"Locked":false,
	"DetachedFromProcess":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"ConnStringId":"DataConnectionString",
	"IsRequired":true,
	"Separator":"|",
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ComboAllowSave_WarningMessage":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T09:01:00",
	"flxUpdatedDate":"2025-03-05T09:01:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"PPERS_Emp_reads_Notificaciones",
	"ParamName":"FirstReadDate",
	"Hide":false,
	"ParamTypeId":"datetime",
	"DefaultValue":"{{currentDateTime}}",
	"Label":"FirstReadDate",
	"IOTypeId":"IO",
	"PositionX":0,
	"PositionY":2,
	"Width":4,
	"Height":1,
	"TypeId":"datetime",
	"Locked":false,
	"DetachedFromProcess":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"ConnStringId":"DataConnectionString",
	"IsRequired":true,
	"Separator":"|",
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ComboAllowSave_WarningMessage":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T09:01:00",
	"flxUpdatedDate":"2025-03-05T09:02:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"PPERS_Emp_reads_Notificaciones",
	"ParamName":"IdNotificacion",
	"Hide":false,
	"ParamTypeId":"integer",
	"DefaultValue":"{{IdNotificacion}}",
	"Label":"IdNotificacion",
	"IOTypeId":"IO",
	"PositionX":0,
	"PositionY":0,
	"Width":4,
	"Height":1,
	"TypeId":"number",
	"Locked":false,
	"DetachedFromProcess":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"ConnStringId":"DataConnectionString",
	"IsRequired":true,
	"Separator":"|",
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ComboAllowSave_WarningMessage":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T09:01:00",
	"flxUpdatedDate":"2025-03-05T09:02:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ProcessName":"PPERS_Emp_reads_Notificaciones",
	"ParamName":"LastReadDate",
	"Hide":false,
	"ParamTypeId":"datetime",
	"DefaultValue":"{{currentDateTime}}",
	"Label":"LastReadDate",
	"IOTypeId":"IO",
	"PositionX":0,
	"PositionY":3,
	"Width":4,
	"Height":1,
	"TypeId":"datetime",
	"Locked":false,
	"DetachedFromProcess":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"ConnStringId":"DataConnectionString",
	"IsRequired":true,
	"Separator":"|",
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ComboAllowSave_WarningMessage":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T09:01:00",
	"flxUpdatedDate":"2025-03-05T09:02:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Processes_Params] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ProcessName] nvarchar(255) '$.ProcessName'
,[ParamName] nvarchar(50) '$.ParamName'
,[Hide] bit '$.Hide'
,[ParamTypeId] nvarchar(50) '$.ParamTypeId'
,[TableName] nvarchar(250) '$.TableName'
,[ObjectName] nvarchar(50) '$.ObjectName'
,[DefaultValue] nvarchar(250) '$.DefaultValue'
,[Label] varchar(250) '$.Label'
,[IOTypeId] nvarchar(5) '$.IOTypeId'
,[PositionX] smallint '$.PositionX'
,[PositionY] smallint '$.PositionY'
,[Width] smallint '$.Width'
,[Height] smallint '$.Height'
,[TypeId] nvarchar(50) '$.TypeId'
,[Locked] bit '$.Locked'
,[CustomPropName] nvarchar(50) '$.CustomPropName'
,[Mask] nvarchar(250) '$.Mask'
,[SQlSentence] nvarchar(max) '$.SQlSentence'
,[SQLFilter] nvarchar(1000) '$.SQLFilter'
,[SQLValueField] nvarchar(100) '$.SQLValueField'
,[SQLDisplayField] nvarchar(500) '$.SQLDisplayField'
,[SQLObjectName] nvarchar(50) '$.SQLObjectName'
,[SQLViewName] nvarchar(255) '$.SQLViewName'
,[SQLOfflineSentence] nvarchar(max) '$.SQLOfflineSentence'
,[SQLOfflineOrderBy] nvarchar(max) '$.SQLOfflineOrderBy'
,[WhereSentence] nvarchar(1000) '$.WhereSentence'
,[DetachedFromProcess] bit '$.DetachedFromProcess'
,[SearchFunction] nvarchar(250) '$.SearchFunction'
,[SearchCollection] nvarchar(50) '$.SearchCollection'
,[SearchWhere] nvarchar(500) '$.SearchWhere'
,[SearchReturnFields] nvarchar(250) '$.SearchReturnFields'
,[SecurityObject] nvarchar(50) '$.SecurityObject'
,[AllowNew] nvarchar(50) '$.AllowNew'
,[AllowNewFunction] nvarchar(250) '$.AllowNewFunction'
,[AllowNewReturnFields] nvarchar(250) '$.AllowNewReturnFields'
,[AllowNewDefaults] nvarchar(500) '$.AllowNewDefaults'
,[TargetIdAllowNew] nvarchar(50) '$.TargetIdAllowNew'
,[ObjNameLink] nvarchar(50) '$.ObjNameLink'
,[ObjWhereLink] nvarchar(1000) '$.ObjWhereLink'
,[ObjModeLink] nvarchar(20) '$.ObjModeLink'
,[PageNameLink] nvarchar(100) '$.PageNameLink'
,[TargetIdLink] nvarchar(50) '$.TargetIdLink'
,[ChatGPTSettingId] nvarchar(100) '$.ChatGPTSettingId'
,[Style] nvarchar(100) '$.Style'
,[CSSClass] nvarchar(100) '$.CSSClass'
,[LabelStyle] nvarchar(100) '$.LabelStyle'
,[LabelCSSClass] nvarchar(100) '$.LabelCSSClass'
,[DecimalPlaces] int '$.DecimalPlaces'
,[RootPath] nvarchar(255) '$.RootPath'
,[FormatString] nvarchar(100) '$.FormatString'
,[DirectTemplate] nvarchar(500) '$.DirectTemplate'
,[Tag] varchar(500) '$.Tag'
,[HelpId] nvarchar(50) '$.HelpId'
,[ConnStringId] nvarchar(50) '$.ConnStringId'
,[IsRequired] bit '$.IsRequired'
,[IsRequiredMessage] nvarchar(255) '$.IsRequiredMessage'
,[minValue] nvarchar(50) '$.minValue'
,[minValueMessage] nvarchar(255) '$.minValueMessage'
,[maxValue] nvarchar(50) '$.maxValue'
,[maxValueMessage] nvarchar(255) '$.maxValueMessage'
,[RegExp] nvarchar(500) '$.RegExp'
,[RegExpText] nvarchar(50) '$.RegExpText'
,[SQLValidator] nvarchar(500) '$.SQLValidator'
,[ValidatorMessage] nvarchar(255) '$.ValidatorMessage'
,[OnChangeJsFunction] nvarchar(500) '$.OnChangeJsFunction'
,[OnChangeProcessName] nvarchar(255) '$.OnChangeProcessName'
,[PlaceHolder] nvarchar(100) '$.PlaceHolder'
,[IconName] nvarchar(100) '$.IconName'
,[ToolbarName] nvarchar(50) '$.ToolbarName'
,[Separator] nvarchar(1) '$.Separator'
,[CascadeDependencies] bit '$.CascadeDependencies'
,[RootPathType] nvarchar(25) '$.RootPathType'
,[ImageCompressionType] smallint '$.ImageCompressionType'
,[ImageMaxWidth] smallint '$.ImageMaxWidth'
,[ImageMaxHeight] smallint '$.ImageMaxHeight'
,[Offline] bit '$.Offline'
,[ExtensionId] nvarchar(100) '$.ExtensionId'
,[Autoselect] bit '$.Autoselect'
,[ThrowDependenciesOnInvalid] bit '$.ThrowDependenciesOnInvalid'
,[BarcodeReaders] nvarchar(max) '$.BarcodeReaders'
,[PageSize] int '$.PageSize'
,[ComboAllowSave] bit '$.ComboAllowSave'
,[ComboAllowSave_Object] nvarchar(50) '$.ComboAllowSave_Object'
,[ComboAllowSave_DisplayField] nvarchar(100) '$.ComboAllowSave_DisplayField'
,[ComboAllowSave_ValueField] nvarchar(100) '$.ComboAllowSave_ValueField'
,[ComboAllowSave_Defaults] nvarchar(500) '$.ComboAllowSave_Defaults'
,[ComboAllowSave_WarningMessage] bit '$.ComboAllowSave_WarningMessage'
,[ShowValuesInApi] bit '$.ShowValuesInApi'
,[DescriptionInApi] nvarchar(max) '$.DescriptionInApi'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ProcessName],[ParamName],[Hide],[ParamTypeId],[TableName],[ObjectName],[DefaultValue],[Label],[IOTypeId],[PositionX],[PositionY],[Width],[Height],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[SQLObjectName],[SQLViewName],[SQLOfflineSentence],[SQLOfflineOrderBy],[WhereSentence],[DetachedFromProcess],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[AllowNewDefaults],[TargetIdAllowNew],[ObjNameLink],[ObjWhereLink],[ObjModeLink],[PageNameLink],[TargetIdLink],[ChatGPTSettingId],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[SQLValidator],[ValidatorMessage],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[CascadeDependencies],[RootPathType],[ImageCompressionType],[ImageMaxWidth],[ImageMaxHeight],[Offline],[ExtensionId],[Autoselect],[ThrowDependenciesOnInvalid],[BarcodeReaders],[PageSize],[ComboAllowSave],[ComboAllowSave_Object],[ComboAllowSave_DisplayField],[ComboAllowSave_ValueField],[ComboAllowSave_Defaults],[ComboAllowSave_WarningMessage],[ShowValuesInApi],[DescriptionInApi],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ProcessName] = Source.[ProcessName] AND Target.[ParamName] = Source.[ParamName])
WHEN MATCHED AND (
	NULLIF(Source.[Hide], Target.[Hide]) IS NOT NULL OR NULLIF(Target.[Hide], Source.[Hide]) IS NOT NULL OR 
	NULLIF(Source.[ParamTypeId], Target.[ParamTypeId]) IS NOT NULL OR NULLIF(Target.[ParamTypeId], Source.[ParamTypeId]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[DefaultValue], Target.[DefaultValue]) IS NOT NULL OR NULLIF(Target.[DefaultValue], Source.[DefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[IOTypeId], Target.[IOTypeId]) IS NOT NULL OR NULLIF(Target.[IOTypeId], Source.[IOTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PositionX], Target.[PositionX]) IS NOT NULL OR NULLIF(Target.[PositionX], Source.[PositionX]) IS NOT NULL OR 
	NULLIF(Source.[PositionY], Target.[PositionY]) IS NOT NULL OR NULLIF(Target.[PositionY], Source.[PositionY]) IS NOT NULL OR 
	NULLIF(Source.[Width], Target.[Width]) IS NOT NULL OR NULLIF(Target.[Width], Source.[Width]) IS NOT NULL OR 
	NULLIF(Source.[Height], Target.[Height]) IS NOT NULL OR NULLIF(Target.[Height], Source.[Height]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Locked], Target.[Locked]) IS NOT NULL OR NULLIF(Target.[Locked], Source.[Locked]) IS NOT NULL OR 
	NULLIF(Source.[CustomPropName], Target.[CustomPropName]) IS NOT NULL OR NULLIF(Target.[CustomPropName], Source.[CustomPropName]) IS NOT NULL OR 
	NULLIF(Source.[Mask], Target.[Mask]) IS NOT NULL OR NULLIF(Target.[Mask], Source.[Mask]) IS NOT NULL OR 
	NULLIF(Source.[SQlSentence], Target.[SQlSentence]) IS NOT NULL OR NULLIF(Target.[SQlSentence], Source.[SQlSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLFilter], Target.[SQLFilter]) IS NOT NULL OR NULLIF(Target.[SQLFilter], Source.[SQLFilter]) IS NOT NULL OR 
	NULLIF(Source.[SQLValueField], Target.[SQLValueField]) IS NOT NULL OR NULLIF(Target.[SQLValueField], Source.[SQLValueField]) IS NOT NULL OR 
	NULLIF(Source.[SQLDisplayField], Target.[SQLDisplayField]) IS NOT NULL OR NULLIF(Target.[SQLDisplayField], Source.[SQLDisplayField]) IS NOT NULL OR 
	NULLIF(Source.[SQLObjectName], Target.[SQLObjectName]) IS NOT NULL OR NULLIF(Target.[SQLObjectName], Source.[SQLObjectName]) IS NOT NULL OR 
	NULLIF(Source.[SQLViewName], Target.[SQLViewName]) IS NOT NULL OR NULLIF(Target.[SQLViewName], Source.[SQLViewName]) IS NOT NULL OR 
	NULLIF(Source.[SQLOfflineSentence], Target.[SQLOfflineSentence]) IS NOT NULL OR NULLIF(Target.[SQLOfflineSentence], Source.[SQLOfflineSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLOfflineOrderBy], Target.[SQLOfflineOrderBy]) IS NOT NULL OR NULLIF(Target.[SQLOfflineOrderBy], Source.[SQLOfflineOrderBy]) IS NOT NULL OR 
	NULLIF(Source.[WhereSentence], Target.[WhereSentence]) IS NOT NULL OR NULLIF(Target.[WhereSentence], Source.[WhereSentence]) IS NOT NULL OR 
	NULLIF(Source.[DetachedFromProcess], Target.[DetachedFromProcess]) IS NOT NULL OR NULLIF(Target.[DetachedFromProcess], Source.[DetachedFromProcess]) IS NOT NULL OR 
	NULLIF(Source.[SearchFunction], Target.[SearchFunction]) IS NOT NULL OR NULLIF(Target.[SearchFunction], Source.[SearchFunction]) IS NOT NULL OR 
	NULLIF(Source.[SearchCollection], Target.[SearchCollection]) IS NOT NULL OR NULLIF(Target.[SearchCollection], Source.[SearchCollection]) IS NOT NULL OR 
	NULLIF(Source.[SearchWhere], Target.[SearchWhere]) IS NOT NULL OR NULLIF(Target.[SearchWhere], Source.[SearchWhere]) IS NOT NULL OR 
	NULLIF(Source.[SearchReturnFields], Target.[SearchReturnFields]) IS NOT NULL OR NULLIF(Target.[SearchReturnFields], Source.[SearchReturnFields]) IS NOT NULL OR 
	NULLIF(Source.[SecurityObject], Target.[SecurityObject]) IS NOT NULL OR NULLIF(Target.[SecurityObject], Source.[SecurityObject]) IS NOT NULL OR 
	NULLIF(Source.[AllowNew], Target.[AllowNew]) IS NOT NULL OR NULLIF(Target.[AllowNew], Source.[AllowNew]) IS NOT NULL OR 
	NULLIF(Source.[AllowNewFunction], Target.[AllowNewFunction]) IS NOT NULL OR NULLIF(Target.[AllowNewFunction], Source.[AllowNewFunction]) IS NOT NULL OR 
	NULLIF(Source.[AllowNewReturnFields], Target.[AllowNewReturnFields]) IS NOT NULL OR NULLIF(Target.[AllowNewReturnFields], Source.[AllowNewReturnFields]) IS NOT NULL OR 
	NULLIF(Source.[AllowNewDefaults], Target.[AllowNewDefaults]) IS NOT NULL OR NULLIF(Target.[AllowNewDefaults], Source.[AllowNewDefaults]) IS NOT NULL OR 
	NULLIF(Source.[TargetIdAllowNew], Target.[TargetIdAllowNew]) IS NOT NULL OR NULLIF(Target.[TargetIdAllowNew], Source.[TargetIdAllowNew]) IS NOT NULL OR 
	NULLIF(Source.[ObjNameLink], Target.[ObjNameLink]) IS NOT NULL OR NULLIF(Target.[ObjNameLink], Source.[ObjNameLink]) IS NOT NULL OR 
	NULLIF(Source.[ObjWhereLink], Target.[ObjWhereLink]) IS NOT NULL OR NULLIF(Target.[ObjWhereLink], Source.[ObjWhereLink]) IS NOT NULL OR 
	NULLIF(Source.[ObjModeLink], Target.[ObjModeLink]) IS NOT NULL OR NULLIF(Target.[ObjModeLink], Source.[ObjModeLink]) IS NOT NULL OR 
	NULLIF(Source.[PageNameLink], Target.[PageNameLink]) IS NOT NULL OR NULLIF(Target.[PageNameLink], Source.[PageNameLink]) IS NOT NULL OR 
	NULLIF(Source.[TargetIdLink], Target.[TargetIdLink]) IS NOT NULL OR NULLIF(Target.[TargetIdLink], Source.[TargetIdLink]) IS NOT NULL OR 
	NULLIF(Source.[ChatGPTSettingId], Target.[ChatGPTSettingId]) IS NOT NULL OR NULLIF(Target.[ChatGPTSettingId], Source.[ChatGPTSettingId]) IS NOT NULL OR 
	NULLIF(Source.[Style], Target.[Style]) IS NOT NULL OR NULLIF(Target.[Style], Source.[Style]) IS NOT NULL OR 
	NULLIF(Source.[CSSClass], Target.[CSSClass]) IS NOT NULL OR NULLIF(Target.[CSSClass], Source.[CSSClass]) IS NOT NULL OR 
	NULLIF(Source.[LabelStyle], Target.[LabelStyle]) IS NOT NULL OR NULLIF(Target.[LabelStyle], Source.[LabelStyle]) IS NOT NULL OR 
	NULLIF(Source.[LabelCSSClass], Target.[LabelCSSClass]) IS NOT NULL OR NULLIF(Target.[LabelCSSClass], Source.[LabelCSSClass]) IS NOT NULL OR 
	NULLIF(Source.[DecimalPlaces], Target.[DecimalPlaces]) IS NOT NULL OR NULLIF(Target.[DecimalPlaces], Source.[DecimalPlaces]) IS NOT NULL OR 
	NULLIF(Source.[RootPath], Target.[RootPath]) IS NOT NULL OR NULLIF(Target.[RootPath], Source.[RootPath]) IS NOT NULL OR 
	NULLIF(Source.[FormatString], Target.[FormatString]) IS NOT NULL OR NULLIF(Target.[FormatString], Source.[FormatString]) IS NOT NULL OR 
	NULLIF(Source.[DirectTemplate], Target.[DirectTemplate]) IS NOT NULL OR NULLIF(Target.[DirectTemplate], Source.[DirectTemplate]) IS NOT NULL OR 
	NULLIF(Source.[Tag], Target.[Tag]) IS NOT NULL OR NULLIF(Target.[Tag], Source.[Tag]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[IsRequired], Target.[IsRequired]) IS NOT NULL OR NULLIF(Target.[IsRequired], Source.[IsRequired]) IS NOT NULL OR 
	NULLIF(Source.[IsRequiredMessage], Target.[IsRequiredMessage]) IS NOT NULL OR NULLIF(Target.[IsRequiredMessage], Source.[IsRequiredMessage]) IS NOT NULL OR 
	NULLIF(Source.[minValue], Target.[minValue]) IS NOT NULL OR NULLIF(Target.[minValue], Source.[minValue]) IS NOT NULL OR 
	NULLIF(Source.[minValueMessage], Target.[minValueMessage]) IS NOT NULL OR NULLIF(Target.[minValueMessage], Source.[minValueMessage]) IS NOT NULL OR 
	NULLIF(Source.[maxValue], Target.[maxValue]) IS NOT NULL OR NULLIF(Target.[maxValue], Source.[maxValue]) IS NOT NULL OR 
	NULLIF(Source.[maxValueMessage], Target.[maxValueMessage]) IS NOT NULL OR NULLIF(Target.[maxValueMessage], Source.[maxValueMessage]) IS NOT NULL OR 
	NULLIF(Source.[RegExp], Target.[RegExp]) IS NOT NULL OR NULLIF(Target.[RegExp], Source.[RegExp]) IS NOT NULL OR 
	NULLIF(Source.[RegExpText], Target.[RegExpText]) IS NOT NULL OR NULLIF(Target.[RegExpText], Source.[RegExpText]) IS NOT NULL OR 
	NULLIF(Source.[SQLValidator], Target.[SQLValidator]) IS NOT NULL OR NULLIF(Target.[SQLValidator], Source.[SQLValidator]) IS NOT NULL OR 
	NULLIF(Source.[ValidatorMessage], Target.[ValidatorMessage]) IS NOT NULL OR NULLIF(Target.[ValidatorMessage], Source.[ValidatorMessage]) IS NOT NULL OR 
	NULLIF(Source.[OnChangeJsFunction], Target.[OnChangeJsFunction]) IS NOT NULL OR NULLIF(Target.[OnChangeJsFunction], Source.[OnChangeJsFunction]) IS NOT NULL OR 
	NULLIF(Source.[OnChangeProcessName], Target.[OnChangeProcessName]) IS NOT NULL OR NULLIF(Target.[OnChangeProcessName], Source.[OnChangeProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PlaceHolder], Target.[PlaceHolder]) IS NOT NULL OR NULLIF(Target.[PlaceHolder], Source.[PlaceHolder]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[ToolbarName], Target.[ToolbarName]) IS NOT NULL OR NULLIF(Target.[ToolbarName], Source.[ToolbarName]) IS NOT NULL OR 
	NULLIF(Source.[Separator], Target.[Separator]) IS NOT NULL OR NULLIF(Target.[Separator], Source.[Separator]) IS NOT NULL OR 
	NULLIF(Source.[CascadeDependencies], Target.[CascadeDependencies]) IS NOT NULL OR NULLIF(Target.[CascadeDependencies], Source.[CascadeDependencies]) IS NOT NULL OR 
	NULLIF(Source.[RootPathType], Target.[RootPathType]) IS NOT NULL OR NULLIF(Target.[RootPathType], Source.[RootPathType]) IS NOT NULL OR 
	NULLIF(Source.[ImageCompressionType], Target.[ImageCompressionType]) IS NOT NULL OR NULLIF(Target.[ImageCompressionType], Source.[ImageCompressionType]) IS NOT NULL OR 
	NULLIF(Source.[ImageMaxWidth], Target.[ImageMaxWidth]) IS NOT NULL OR NULLIF(Target.[ImageMaxWidth], Source.[ImageMaxWidth]) IS NOT NULL OR 
	NULLIF(Source.[ImageMaxHeight], Target.[ImageMaxHeight]) IS NOT NULL OR NULLIF(Target.[ImageMaxHeight], Source.[ImageMaxHeight]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[ExtensionId], Target.[ExtensionId]) IS NOT NULL OR NULLIF(Target.[ExtensionId], Source.[ExtensionId]) IS NOT NULL OR 
	NULLIF(Source.[Autoselect], Target.[Autoselect]) IS NOT NULL OR NULLIF(Target.[Autoselect], Source.[Autoselect]) IS NOT NULL OR 
	NULLIF(Source.[ThrowDependenciesOnInvalid], Target.[ThrowDependenciesOnInvalid]) IS NOT NULL OR NULLIF(Target.[ThrowDependenciesOnInvalid], Source.[ThrowDependenciesOnInvalid]) IS NOT NULL OR 
	NULLIF(Source.[BarcodeReaders], Target.[BarcodeReaders]) IS NOT NULL OR NULLIF(Target.[BarcodeReaders], Source.[BarcodeReaders]) IS NOT NULL OR 
	NULLIF(Source.[PageSize], Target.[PageSize]) IS NOT NULL OR NULLIF(Target.[PageSize], Source.[PageSize]) IS NOT NULL OR 
	NULLIF(Source.[ComboAllowSave], Target.[ComboAllowSave]) IS NOT NULL OR NULLIF(Target.[ComboAllowSave], Source.[ComboAllowSave]) IS NOT NULL OR 
	NULLIF(Source.[ComboAllowSave_Object], Target.[ComboAllowSave_Object]) IS NOT NULL OR NULLIF(Target.[ComboAllowSave_Object], Source.[ComboAllowSave_Object]) IS NOT NULL OR 
	NULLIF(Source.[ComboAllowSave_DisplayField], Target.[ComboAllowSave_DisplayField]) IS NOT NULL OR NULLIF(Target.[ComboAllowSave_DisplayField], Source.[ComboAllowSave_DisplayField]) IS NOT NULL OR 
	NULLIF(Source.[ComboAllowSave_ValueField], Target.[ComboAllowSave_ValueField]) IS NOT NULL OR NULLIF(Target.[ComboAllowSave_ValueField], Source.[ComboAllowSave_ValueField]) IS NOT NULL OR 
	NULLIF(Source.[ComboAllowSave_Defaults], Target.[ComboAllowSave_Defaults]) IS NOT NULL OR NULLIF(Target.[ComboAllowSave_Defaults], Source.[ComboAllowSave_Defaults]) IS NOT NULL OR 
	NULLIF(Source.[ComboAllowSave_WarningMessage], Target.[ComboAllowSave_WarningMessage]) IS NOT NULL OR NULLIF(Target.[ComboAllowSave_WarningMessage], Source.[ComboAllowSave_WarningMessage]) IS NOT NULL OR 
	NULLIF(Source.[ShowValuesInApi], Target.[ShowValuesInApi]) IS NOT NULL OR NULLIF(Target.[ShowValuesInApi], Source.[ShowValuesInApi]) IS NOT NULL OR 
	NULLIF(Source.[DescriptionInApi], Target.[DescriptionInApi]) IS NOT NULL OR NULLIF(Target.[DescriptionInApi], Source.[DescriptionInApi]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Hide] = Source.[Hide], 
  [ParamTypeId] = Source.[ParamTypeId], 
  [TableName] = Source.[TableName], 
  [ObjectName] = Source.[ObjectName], 
  [DefaultValue] = Source.[DefaultValue], 
  [Label] = Source.[Label], 
  [IOTypeId] = Source.[IOTypeId], 
  [PositionX] = Source.[PositionX], 
  [PositionY] = Source.[PositionY], 
  [Width] = Source.[Width], 
  [Height] = Source.[Height], 
  [TypeId] = Source.[TypeId], 
  [Locked] = Source.[Locked], 
  [CustomPropName] = Source.[CustomPropName], 
  [Mask] = Source.[Mask], 
  [SQlSentence] = Source.[SQlSentence], 
  [SQLFilter] = Source.[SQLFilter], 
  [SQLValueField] = Source.[SQLValueField], 
  [SQLDisplayField] = Source.[SQLDisplayField], 
  [SQLObjectName] = Source.[SQLObjectName], 
  [SQLViewName] = Source.[SQLViewName], 
  [SQLOfflineSentence] = Source.[SQLOfflineSentence], 
  [SQLOfflineOrderBy] = Source.[SQLOfflineOrderBy], 
  [WhereSentence] = Source.[WhereSentence], 
  [DetachedFromProcess] = Source.[DetachedFromProcess], 
  [SearchFunction] = Source.[SearchFunction], 
  [SearchCollection] = Source.[SearchCollection], 
  [SearchWhere] = Source.[SearchWhere], 
  [SearchReturnFields] = Source.[SearchReturnFields], 
  [SecurityObject] = Source.[SecurityObject], 
  [AllowNew] = Source.[AllowNew], 
  [AllowNewFunction] = Source.[AllowNewFunction], 
  [AllowNewReturnFields] = Source.[AllowNewReturnFields], 
  [AllowNewDefaults] = Source.[AllowNewDefaults], 
  [TargetIdAllowNew] = Source.[TargetIdAllowNew], 
  [ObjNameLink] = Source.[ObjNameLink], 
  [ObjWhereLink] = Source.[ObjWhereLink], 
  [ObjModeLink] = Source.[ObjModeLink], 
  [PageNameLink] = Source.[PageNameLink], 
  [TargetIdLink] = Source.[TargetIdLink], 
  [ChatGPTSettingId] = Source.[ChatGPTSettingId], 
  [Style] = Source.[Style], 
  [CSSClass] = Source.[CSSClass], 
  [LabelStyle] = Source.[LabelStyle], 
  [LabelCSSClass] = Source.[LabelCSSClass], 
  [DecimalPlaces] = Source.[DecimalPlaces], 
  [RootPath] = Source.[RootPath], 
  [FormatString] = Source.[FormatString], 
  [DirectTemplate] = Source.[DirectTemplate], 
  [Tag] = Source.[Tag], 
  [HelpId] = Source.[HelpId], 
  [ConnStringId] = Source.[ConnStringId], 
  [IsRequired] = Source.[IsRequired], 
  [IsRequiredMessage] = Source.[IsRequiredMessage], 
  [minValue] = Source.[minValue], 
  [minValueMessage] = Source.[minValueMessage], 
  [maxValue] = Source.[maxValue], 
  [maxValueMessage] = Source.[maxValueMessage], 
  [RegExp] = Source.[RegExp], 
  [RegExpText] = Source.[RegExpText], 
  [SQLValidator] = Source.[SQLValidator], 
  [ValidatorMessage] = Source.[ValidatorMessage], 
  [OnChangeJsFunction] = Source.[OnChangeJsFunction], 
  [OnChangeProcessName] = Source.[OnChangeProcessName], 
  [PlaceHolder] = Source.[PlaceHolder], 
  [IconName] = Source.[IconName], 
  [ToolbarName] = Source.[ToolbarName], 
  [Separator] = Source.[Separator], 
  [CascadeDependencies] = Source.[CascadeDependencies], 
  [RootPathType] = Source.[RootPathType], 
  [ImageCompressionType] = Source.[ImageCompressionType], 
  [ImageMaxWidth] = Source.[ImageMaxWidth], 
  [ImageMaxHeight] = Source.[ImageMaxHeight], 
  [Offline] = Source.[Offline], 
  [ExtensionId] = Source.[ExtensionId], 
  [Autoselect] = Source.[Autoselect], 
  [ThrowDependenciesOnInvalid] = Source.[ThrowDependenciesOnInvalid], 
  [BarcodeReaders] = Source.[BarcodeReaders], 
  [PageSize] = Source.[PageSize], 
  [ComboAllowSave] = Source.[ComboAllowSave], 
  [ComboAllowSave_Object] = Source.[ComboAllowSave_Object], 
  [ComboAllowSave_DisplayField] = Source.[ComboAllowSave_DisplayField], 
  [ComboAllowSave_ValueField] = Source.[ComboAllowSave_ValueField], 
  [ComboAllowSave_Defaults] = Source.[ComboAllowSave_Defaults], 
  [ComboAllowSave_WarningMessage] = Source.[ComboAllowSave_WarningMessage], 
  [ShowValuesInApi] = Source.[ShowValuesInApi], 
  [DescriptionInApi] = Source.[DescriptionInApi], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProcessName],[ParamName],[Hide],[ParamTypeId],[TableName],[ObjectName],[DefaultValue],[Label],[IOTypeId],[PositionX],[PositionY],[Width],[Height],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[SQLObjectName],[SQLViewName],[SQLOfflineSentence],[SQLOfflineOrderBy],[WhereSentence],[DetachedFromProcess],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[AllowNewDefaults],[TargetIdAllowNew],[ObjNameLink],[ObjWhereLink],[ObjModeLink],[PageNameLink],[TargetIdLink],[ChatGPTSettingId],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[SQLValidator],[ValidatorMessage],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[CascadeDependencies],[RootPathType],[ImageCompressionType],[ImageMaxWidth],[ImageMaxHeight],[Offline],[ExtensionId],[Autoselect],[ThrowDependenciesOnInvalid],[BarcodeReaders],[PageSize],[ComboAllowSave],[ComboAllowSave_Object],[ComboAllowSave_DisplayField],[ComboAllowSave_ValueField],[ComboAllowSave_Defaults],[ComboAllowSave_WarningMessage],[ShowValuesInApi],[DescriptionInApi],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ProcessName],Source.[ParamName],Source.[Hide],Source.[ParamTypeId],Source.[TableName],Source.[ObjectName],Source.[DefaultValue],Source.[Label],Source.[IOTypeId],Source.[PositionX],Source.[PositionY],Source.[Width],Source.[Height],Source.[TypeId],Source.[Locked],Source.[CustomPropName],Source.[Mask],Source.[SQlSentence],Source.[SQLFilter],Source.[SQLValueField],Source.[SQLDisplayField],Source.[SQLObjectName],Source.[SQLViewName],Source.[SQLOfflineSentence],Source.[SQLOfflineOrderBy],Source.[WhereSentence],Source.[DetachedFromProcess],Source.[SearchFunction],Source.[SearchCollection],Source.[SearchWhere],Source.[SearchReturnFields],Source.[SecurityObject],Source.[AllowNew],Source.[AllowNewFunction],Source.[AllowNewReturnFields],Source.[AllowNewDefaults],Source.[TargetIdAllowNew],Source.[ObjNameLink],Source.[ObjWhereLink],Source.[ObjModeLink],Source.[PageNameLink],Source.[TargetIdLink],Source.[ChatGPTSettingId],Source.[Style],Source.[CSSClass],Source.[LabelStyle],Source.[LabelCSSClass],Source.[DecimalPlaces],Source.[RootPath],Source.[FormatString],Source.[DirectTemplate],Source.[Tag],Source.[HelpId],Source.[ConnStringId],Source.[IsRequired],Source.[IsRequiredMessage],Source.[minValue],Source.[minValueMessage],Source.[maxValue],Source.[maxValueMessage],Source.[RegExp],Source.[RegExpText],Source.[SQLValidator],Source.[ValidatorMessage],Source.[OnChangeJsFunction],Source.[OnChangeProcessName],Source.[PlaceHolder],Source.[IconName],Source.[ToolbarName],Source.[Separator],Source.[CascadeDependencies],Source.[RootPathType],Source.[ImageCompressionType],Source.[ImageMaxWidth],Source.[ImageMaxHeight],Source.[Offline],Source.[ExtensionId],Source.[Autoselect],Source.[ThrowDependenciesOnInvalid],Source.[BarcodeReaders],Source.[PageSize],Source.[ComboAllowSave],Source.[ComboAllowSave_Object],Source.[ComboAllowSave_DisplayField],Source.[ComboAllowSave_ValueField],Source.[ComboAllowSave_Defaults],Source.[ComboAllowSave_WarningMessage],Source.[ShowValuesInApi],Source.[DescriptionInApi],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





