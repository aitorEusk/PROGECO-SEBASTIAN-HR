

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_Suggestion_Mailbox",
	"PropertyName":"TypeId",
	"DependingPropertyName":"Anonymous_suggestion",
	"Order":2,
	"Active":true,
	"HiddenValues":"complain",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-29T13:57:00",
	"flxUpdatedDate":"2026-05-29T13:57:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Suggestion_Mailbox",
	"PropertyName":"TypeId",
	"DependingPropertyName":"ComplaintTypeId",
	"Order":3,
	"Active":true,
	"VisibleValues":"complain",
	"RequiredValues":"complain",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-29T13:57:00",
	"flxUpdatedDate":"2026-05-29T13:57:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Suggestion_Mailbox",
	"PropertyName":"TypeId",
	"DependingPropertyName":"Public",
	"Order":1,
	"Active":false,
	"HiddenValues":"complain",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-29T13:57:00",
	"flxUpdatedDate":"2026-05-29T13:57:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"PropertyName":"Reference",
	"DependingPropertyName":"Email",
	"Order":2,
	"Active":true,
	"Descrip":"Load employye Email",
	"SQLValue":"select Mail from Employees where EmployeeId={{Reference}}",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T12:58:00",
	"flxUpdatedDate":"2026-05-25T12:58:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"PropertyName":"Reference",
	"DependingPropertyName":"Name",
	"Order":3,
	"Active":true,
	"Descrip":"Load Employee Name",
	"SQLValue":"select Name from Employees where EmployeeId={{Reference}}",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T12:58:00",
	"flxUpdatedDate":"2026-05-25T12:58:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"PropertyName":"Reference",
	"DependingPropertyName":"PhoneNumber",
	"Order":6,
	"Active":true,
	"Descrip":"Load Employee Phone",
	"SQLValue":"select Phone from Employees where EmployeeId={{Reference}}",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T12:58:00",
	"flxUpdatedDate":"2026-05-25T12:58:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"PropertyName":"Reference",
	"DependingPropertyName":"SurName",
	"Order":4,
	"Active":true,
	"Descrip":"Load Employee Surname",
	"SQLValue":"select SurName from Employees where EmployeeId={{Reference}}",
	"ConnStringId":"DataConnectionString",
	"Offline":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T12:58:00",
	"flxUpdatedDate":"2026-05-25T12:58:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Properties_Dependencies] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[PropertyName] nvarchar(50) '$.PropertyName'
,[DependingPropertyName] nvarchar(50) '$.DependingPropertyName'
,[Order] int '$.Order'
,[Active] bit '$.Active'
,[Descrip] nvarchar(255) '$.Descrip'
,[SQLValue] nvarchar(max) '$.SQLValue'
,[SQLComboSentence] nvarchar(max) '$.SQLComboSentence'
,[SQLComboFilter] nvarchar(max) '$.SQLComboFilter'
,[SQLEnabled] nvarchar(max) '$.SQLEnabled'
,[EnabledValues] nvarchar(max) '$.EnabledValues'
,[DisabledValues] nvarchar(max) '$.DisabledValues'
,[SQLVisible] nvarchar(max) '$.SQLVisible'
,[VisibleValues] nvarchar(max) '$.VisibleValues'
,[HiddenValues] nvarchar(max) '$.HiddenValues'
,[SQLClass] nvarchar(max) '$.SQLClass'
,[SQLRequired] nvarchar(max) '$.SQLRequired'
,[RequiredValues] nvarchar(max) '$.RequiredValues'
,[NotRequiredValues] nvarchar(max) '$.NotRequiredValues'
,[SQLLabel] nvarchar(max) '$.SQLLabel'
,[PropertyValue] nvarchar(max) '$.PropertyValue'
,[CusPropName] nvarchar(max) '$.CusPropName'
,[SQLCustomProperty] nvarchar(max) '$.SQLCustomProperty'
,[ConnStringId] nvarchar(255) '$.ConnStringId'
,[Offline] bit '$.Offline'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[PropertyName],[DependingPropertyName],[Order],[Active],[Descrip],[SQLValue],[SQLComboSentence],[SQLComboFilter],[SQLEnabled],[EnabledValues],[DisabledValues],[SQLVisible],[VisibleValues],[HiddenValues],[SQLClass],[SQLRequired],[RequiredValues],[NotRequiredValues],[SQLLabel],[PropertyValue],[CusPropName],[SQLCustomProperty],[ConnStringId],[Offline],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName] AND Target.[DependingPropertyName] = Source.[DependingPropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[SQLValue], Target.[SQLValue]) IS NOT NULL OR NULLIF(Target.[SQLValue], Source.[SQLValue]) IS NOT NULL OR 
	NULLIF(Source.[SQLComboSentence], Target.[SQLComboSentence]) IS NOT NULL OR NULLIF(Target.[SQLComboSentence], Source.[SQLComboSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLComboFilter], Target.[SQLComboFilter]) IS NOT NULL OR NULLIF(Target.[SQLComboFilter], Source.[SQLComboFilter]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabled], Target.[SQLEnabled]) IS NOT NULL OR NULLIF(Target.[SQLEnabled], Source.[SQLEnabled]) IS NOT NULL OR 
	NULLIF(Source.[EnabledValues], Target.[EnabledValues]) IS NOT NULL OR NULLIF(Target.[EnabledValues], Source.[EnabledValues]) IS NOT NULL OR 
	NULLIF(Source.[DisabledValues], Target.[DisabledValues]) IS NOT NULL OR NULLIF(Target.[DisabledValues], Source.[DisabledValues]) IS NOT NULL OR 
	NULLIF(Source.[SQLVisible], Target.[SQLVisible]) IS NOT NULL OR NULLIF(Target.[SQLVisible], Source.[SQLVisible]) IS NOT NULL OR 
	NULLIF(Source.[VisibleValues], Target.[VisibleValues]) IS NOT NULL OR NULLIF(Target.[VisibleValues], Source.[VisibleValues]) IS NOT NULL OR 
	NULLIF(Source.[HiddenValues], Target.[HiddenValues]) IS NOT NULL OR NULLIF(Target.[HiddenValues], Source.[HiddenValues]) IS NOT NULL OR 
	NULLIF(Source.[SQLClass], Target.[SQLClass]) IS NOT NULL OR NULLIF(Target.[SQLClass], Source.[SQLClass]) IS NOT NULL OR 
	NULLIF(Source.[SQLRequired], Target.[SQLRequired]) IS NOT NULL OR NULLIF(Target.[SQLRequired], Source.[SQLRequired]) IS NOT NULL OR 
	NULLIF(Source.[RequiredValues], Target.[RequiredValues]) IS NOT NULL OR NULLIF(Target.[RequiredValues], Source.[RequiredValues]) IS NOT NULL OR 
	NULLIF(Source.[NotRequiredValues], Target.[NotRequiredValues]) IS NOT NULL OR NULLIF(Target.[NotRequiredValues], Source.[NotRequiredValues]) IS NOT NULL OR 
	NULLIF(Source.[SQLLabel], Target.[SQLLabel]) IS NOT NULL OR NULLIF(Target.[SQLLabel], Source.[SQLLabel]) IS NOT NULL OR 
	NULLIF(Source.[PropertyValue], Target.[PropertyValue]) IS NOT NULL OR NULLIF(Target.[PropertyValue], Source.[PropertyValue]) IS NOT NULL OR 
	NULLIF(Source.[CusPropName], Target.[CusPropName]) IS NOT NULL OR NULLIF(Target.[CusPropName], Source.[CusPropName]) IS NOT NULL OR 
	NULLIF(Source.[SQLCustomProperty], Target.[SQLCustomProperty]) IS NOT NULL OR NULLIF(Target.[SQLCustomProperty], Source.[SQLCustomProperty]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Order] = Source.[Order], 
  [Active] = Source.[Active], 
  [Descrip] = Source.[Descrip], 
  [SQLValue] = Source.[SQLValue], 
  [SQLComboSentence] = Source.[SQLComboSentence], 
  [SQLComboFilter] = Source.[SQLComboFilter], 
  [SQLEnabled] = Source.[SQLEnabled], 
  [EnabledValues] = Source.[EnabledValues], 
  [DisabledValues] = Source.[DisabledValues], 
  [SQLVisible] = Source.[SQLVisible], 
  [VisibleValues] = Source.[VisibleValues], 
  [HiddenValues] = Source.[HiddenValues], 
  [SQLClass] = Source.[SQLClass], 
  [SQLRequired] = Source.[SQLRequired], 
  [RequiredValues] = Source.[RequiredValues], 
  [NotRequiredValues] = Source.[NotRequiredValues], 
  [SQLLabel] = Source.[SQLLabel], 
  [PropertyValue] = Source.[PropertyValue], 
  [CusPropName] = Source.[CusPropName], 
  [SQLCustomProperty] = Source.[SQLCustomProperty], 
  [ConnStringId] = Source.[ConnStringId], 
  [Offline] = Source.[Offline], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[PropertyName],[DependingPropertyName],[Order],[Active],[Descrip],[SQLValue],[SQLComboSentence],[SQLComboFilter],[SQLEnabled],[EnabledValues],[DisabledValues],[SQLVisible],[VisibleValues],[HiddenValues],[SQLClass],[SQLRequired],[RequiredValues],[NotRequiredValues],[SQLLabel],[PropertyValue],[CusPropName],[SQLCustomProperty],[ConnStringId],[Offline],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[PropertyName],Source.[DependingPropertyName],Source.[Order],Source.[Active],Source.[Descrip],Source.[SQLValue],Source.[SQLComboSentence],Source.[SQLComboFilter],Source.[SQLEnabled],Source.[EnabledValues],Source.[DisabledValues],Source.[SQLVisible],Source.[VisibleValues],Source.[HiddenValues],Source.[SQLClass],Source.[SQLRequired],Source.[RequiredValues],Source.[NotRequiredValues],Source.[SQLLabel],Source.[PropertyValue],Source.[CusPropName],Source.[SQLCustomProperty],Source.[ConnStringId],Source.[Offline],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





