

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_Employee_ContractData",
	"KeyProperty":"ContractId",
	"RootPath":"~\/custom\/images\/",
	"TypeId":"flexygo",
	"DefaultCategoryId":"sysimg-generic",
	"ExtensionId":"sysImages",
	"Compression":0,
	"CreateObjectIDFolder":true,
	"DownloadBDName":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-25T14:51:00",
	"flxUpdatedDate":"2026-05-25T14:51:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Images_Settings] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[KeyProperty] nvarchar(150) '$.KeyProperty'
,[RootPath] nvarchar(250) '$.RootPath'
,[TypeId] nvarchar(50) '$.TypeId'
,[ERPObjectName] nvarchar(250) '$.ERPObjectName'
,[DefaultCategoryId] nvarchar(50) '$.DefaultCategoryId'
,[ExtensionId] nvarchar(100) '$.ExtensionId'
,[OfflineFilter] nvarchar(max) '$.OfflineFilter'
,[Compression] smallint '$.Compression'
,[MaxWidth] smallint '$.MaxWidth'
,[MaxHeight] smallint '$.MaxHeight'
,[CreateObjectIDFolder] bit '$.CreateObjectIDFolder'
,[MaximumSize] int '$.MaximumSize'
,[DownloadBDName] bit '$.DownloadBDName'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[KeyProperty],[RootPath],[TypeId],[ERPObjectName],[DefaultCategoryId],[ExtensionId],[OfflineFilter],[Compression],[MaxWidth],[MaxHeight],[CreateObjectIDFolder],[MaximumSize],[DownloadBDName],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[KeyProperty] = Source.[KeyProperty])
WHEN MATCHED AND (
	NULLIF(Source.[RootPath], Target.[RootPath]) IS NOT NULL OR NULLIF(Target.[RootPath], Source.[RootPath]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[ERPObjectName], Target.[ERPObjectName]) IS NOT NULL OR NULLIF(Target.[ERPObjectName], Source.[ERPObjectName]) IS NOT NULL OR 
	NULLIF(Source.[DefaultCategoryId], Target.[DefaultCategoryId]) IS NOT NULL OR NULLIF(Target.[DefaultCategoryId], Source.[DefaultCategoryId]) IS NOT NULL OR 
	NULLIF(Source.[ExtensionId], Target.[ExtensionId]) IS NOT NULL OR NULLIF(Target.[ExtensionId], Source.[ExtensionId]) IS NOT NULL OR 
	NULLIF(Source.[OfflineFilter], Target.[OfflineFilter]) IS NOT NULL OR NULLIF(Target.[OfflineFilter], Source.[OfflineFilter]) IS NOT NULL OR 
	NULLIF(Source.[Compression], Target.[Compression]) IS NOT NULL OR NULLIF(Target.[Compression], Source.[Compression]) IS NOT NULL OR 
	NULLIF(Source.[MaxWidth], Target.[MaxWidth]) IS NOT NULL OR NULLIF(Target.[MaxWidth], Source.[MaxWidth]) IS NOT NULL OR 
	NULLIF(Source.[MaxHeight], Target.[MaxHeight]) IS NOT NULL OR NULLIF(Target.[MaxHeight], Source.[MaxHeight]) IS NOT NULL OR 
	NULLIF(Source.[CreateObjectIDFolder], Target.[CreateObjectIDFolder]) IS NOT NULL OR NULLIF(Target.[CreateObjectIDFolder], Source.[CreateObjectIDFolder]) IS NOT NULL OR 
	NULLIF(Source.[MaximumSize], Target.[MaximumSize]) IS NOT NULL OR NULLIF(Target.[MaximumSize], Source.[MaximumSize]) IS NOT NULL OR 
	NULLIF(Source.[DownloadBDName], Target.[DownloadBDName]) IS NOT NULL OR NULLIF(Target.[DownloadBDName], Source.[DownloadBDName]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [RootPath] = Source.[RootPath], 
  [TypeId] = Source.[TypeId], 
  [ERPObjectName] = Source.[ERPObjectName], 
  [DefaultCategoryId] = Source.[DefaultCategoryId], 
  [ExtensionId] = Source.[ExtensionId], 
  [OfflineFilter] = Source.[OfflineFilter], 
  [Compression] = Source.[Compression], 
  [MaxWidth] = Source.[MaxWidth], 
  [MaxHeight] = Source.[MaxHeight], 
  [CreateObjectIDFolder] = Source.[CreateObjectIDFolder], 
  [MaximumSize] = Source.[MaximumSize], 
  [DownloadBDName] = Source.[DownloadBDName], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[KeyProperty],[RootPath],[TypeId],[ERPObjectName],[DefaultCategoryId],[ExtensionId],[OfflineFilter],[Compression],[MaxWidth],[MaxHeight],[CreateObjectIDFolder],[MaximumSize],[DownloadBDName],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[KeyProperty],Source.[RootPath],Source.[TypeId],Source.[ERPObjectName],Source.[DefaultCategoryId],Source.[ExtensionId],Source.[OfflineFilter],Source.[Compression],Source.[MaxWidth],Source.[MaxHeight],Source.[CreateObjectIDFolder],Source.[MaximumSize],Source.[DownloadBDName],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





