

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_Employee",
	"ChildCollection":"sysChatters",
	"ObjectRelation":"EmployeeId=DestinationObjectId|''emp_Employee''=DestinationObjectName",
	"ObjectDefaults":"EmployeeId=DestinationObjectId|''emp_Employee''=DestinationObjectName",
	"ShowInMenu":true,
	"ShowInAnalysis":false,
	"OneToOneRelation":false,
	"Order":0,
	"RemoveOnDelete":true,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-25T15:57:00",
	"flxUpdatedDate":"2026-05-25T15:57:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee",
	"ChildCollection":"sysObjectImages",
	"ObjectRelation":"EmployeeId=ObjectId|''emp_Employee''=ObjectName",
	"ObjectDefaults":"EmployeeId=ObjectId|''emp_Employee''=ObjectName",
	"ShowInMenu":true,
	"ShowInAnalysis":false,
	"OneToOneRelation":false,
	"Order":0,
	"RemoveOnDelete":true,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T14:51:00",
	"flxUpdatedDate":"2026-05-25T14:51:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Employee_ContractData",
	"ChildCollection":"sysObjectImages",
	"ObjectRelation":"ContractId=ObjectId|''emp_Employee_ContractData''=ObjectName",
	"ObjectDefaults":"ContractId=ObjectId|''emp_Employee_ContractData''=ObjectName",
	"ShowInMenu":true,
	"ShowInAnalysis":false,
	"OneToOneRelation":false,
	"Order":0,
	"RemoveOnDelete":true,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T14:51:00",
	"flxUpdatedDate":"2026-05-25T14:51:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Part_Expenses",
	"ChildCollection":"sysObjectImages",
	"ObjectRelation":"PartId=ObjectId|''emp_Part_Expenses''=ObjectName",
	"ObjectDefaults":"PartId=ObjectId|''emp_Part_Expenses''=ObjectName",
	"ShowInMenu":true,
	"ShowInAnalysis":false,
	"OneToOneRelation":false,
	"Order":0,
	"RemoveOnDelete":true,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T14:51:00",
	"flxUpdatedDate":"2026-05-25T14:51:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_Suggestion_Mailbox",
	"ChildCollection":"sysObjectImages",
	"ObjectRelation":"SuggestionId=ObjectId|''emp_Suggestion_Mailbox''=ObjectName",
	"ObjectDefaults":"SuggestionId=ObjectId|''emp_Suggestion_Mailbox''=ObjectName",
	"ShowInMenu":true,
	"ShowInAnalysis":false,
	"OneToOneRelation":false,
	"Order":0,
	"RemoveOnDelete":true,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T14:51:00",
	"flxUpdatedDate":"2026-05-25T14:51:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Objects] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[ChildCollection] nvarchar(50) '$.ChildCollection'
,[ObjectRelation] nvarchar(255) '$.ObjectRelation'
,[ObjectDefaults] nvarchar(255) '$.ObjectDefaults'
,[ShowInMenu] bit '$.ShowInMenu'
,[ShowInAnalysis] bit '$.ShowInAnalysis'
,[OneToOneRelation] bit '$.OneToOneRelation'
,[Order] int '$.Order'
,[RemoveOnDelete] bit '$.RemoveOnDelete'
,[SQLEnabled] nvarchar(max) '$.SQLEnabled'
,[SQLEnabledDescrip] nvarchar(255) '$.SQLEnabledDescrip'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[ChildCollection],[ObjectRelation],[ObjectDefaults],[ShowInMenu],[ShowInAnalysis],[OneToOneRelation],[Order],[RemoveOnDelete],[SQLEnabled],[SQLEnabledDescrip],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ChildCollection] = Source.[ChildCollection] AND Target.[ObjectName] = Source.[ObjectName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectRelation], Target.[ObjectRelation]) IS NOT NULL OR NULLIF(Target.[ObjectRelation], Source.[ObjectRelation]) IS NOT NULL OR 
	NULLIF(Source.[ObjectDefaults], Target.[ObjectDefaults]) IS NOT NULL OR NULLIF(Target.[ObjectDefaults], Source.[ObjectDefaults]) IS NOT NULL OR 
	NULLIF(Source.[ShowInMenu], Target.[ShowInMenu]) IS NOT NULL OR NULLIF(Target.[ShowInMenu], Source.[ShowInMenu]) IS NOT NULL OR 
	NULLIF(Source.[ShowInAnalysis], Target.[ShowInAnalysis]) IS NOT NULL OR NULLIF(Target.[ShowInAnalysis], Source.[ShowInAnalysis]) IS NOT NULL OR 
	NULLIF(Source.[OneToOneRelation], Target.[OneToOneRelation]) IS NOT NULL OR NULLIF(Target.[OneToOneRelation], Source.[OneToOneRelation]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[RemoveOnDelete], Target.[RemoveOnDelete]) IS NOT NULL OR NULLIF(Target.[RemoveOnDelete], Source.[RemoveOnDelete]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabled], Target.[SQLEnabled]) IS NOT NULL OR NULLIF(Target.[SQLEnabled], Source.[SQLEnabled]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabledDescrip], Target.[SQLEnabledDescrip]) IS NOT NULL OR NULLIF(Target.[SQLEnabledDescrip], Source.[SQLEnabledDescrip]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectRelation] = Source.[ObjectRelation], 
  [ObjectDefaults] = Source.[ObjectDefaults], 
  [ShowInMenu] = Source.[ShowInMenu], 
  [ShowInAnalysis] = Source.[ShowInAnalysis], 
  [OneToOneRelation] = Source.[OneToOneRelation], 
  [Order] = Source.[Order], 
  [RemoveOnDelete] = Source.[RemoveOnDelete], 
  [SQLEnabled] = Source.[SQLEnabled], 
  [SQLEnabledDescrip] = Source.[SQLEnabledDescrip], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ChildCollection],[ObjectRelation],[ObjectDefaults],[ShowInMenu],[ShowInAnalysis],[OneToOneRelation],[Order],[RemoveOnDelete],[SQLEnabled],[SQLEnabledDescrip],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[ChildCollection],Source.[ObjectRelation],Source.[ObjectDefaults],Source.[ShowInMenu],Source.[ShowInAnalysis],Source.[OneToOneRelation],Source.[Order],Source.[RemoveOnDelete],Source.[SQLEnabled],Source.[SQLEnabledDescrip],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





