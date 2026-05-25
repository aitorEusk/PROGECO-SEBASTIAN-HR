

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"Id":"PERS_ADMIN_PROGECO",
	"Name":"Administrador Progeco",
	"NormalizedName":"ADMINISTRADOR PROGECO",
	"IsDesigner":false,
	"IsAdmin":true,
	"TwoFactorEnabled":false,
	"Hidden":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [AspNetRoles] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[Id] nvarchar(128) '$.Id'
,[Name] nvarchar(256) '$.Name'
,[NormalizedName] nvarchar(256) '$.NormalizedName'
,[ConcurrencyStamp] nvarchar(max) '$.ConcurrencyStamp'
,[IsDesigner] bit '$.IsDesigner'
,[IsAdmin] bit '$.IsAdmin'
,[TwoFactorEnabled] bit '$.TwoFactorEnabled'
,[Hidden] bit '$.Hidden'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([Id],[Name],[NormalizedName],[ConcurrencyStamp],[IsDesigner],[IsAdmin],[TwoFactorEnabled],[Hidden],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[Id] = Source.[Id])
WHEN MATCHED AND (
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[NormalizedName], Target.[NormalizedName]) IS NOT NULL OR NULLIF(Target.[NormalizedName], Source.[NormalizedName]) IS NOT NULL OR 
	NULLIF(Source.[ConcurrencyStamp], Target.[ConcurrencyStamp]) IS NOT NULL OR NULLIF(Target.[ConcurrencyStamp], Source.[ConcurrencyStamp]) IS NOT NULL OR 
	NULLIF(Source.[IsDesigner], Target.[IsDesigner]) IS NOT NULL OR NULLIF(Target.[IsDesigner], Source.[IsDesigner]) IS NOT NULL OR 
	NULLIF(Source.[IsAdmin], Target.[IsAdmin]) IS NOT NULL OR NULLIF(Target.[IsAdmin], Source.[IsAdmin]) IS NOT NULL OR 
	NULLIF(Source.[TwoFactorEnabled], Target.[TwoFactorEnabled]) IS NOT NULL OR NULLIF(Target.[TwoFactorEnabled], Source.[TwoFactorEnabled]) IS NOT NULL OR 
	NULLIF(Source.[Hidden], Target.[Hidden]) IS NOT NULL OR NULLIF(Target.[Hidden], Source.[Hidden]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Name] = Source.[Name], 
  [NormalizedName] = Source.[NormalizedName], 
  [ConcurrencyStamp] = Source.[ConcurrencyStamp], 
  [IsDesigner] = Source.[IsDesigner], 
  [IsAdmin] = Source.[IsAdmin], 
  [TwoFactorEnabled] = Source.[TwoFactorEnabled], 
  [Hidden] = Source.[Hidden], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([Id],[Name],[NormalizedName],[ConcurrencyStamp],[IsDesigner],[IsAdmin],[TwoFactorEnabled],[Hidden],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[Id],Source.[Name],Source.[NormalizedName],Source.[ConcurrencyStamp],Source.[IsDesigner],Source.[IsAdmin],Source.[TwoFactorEnabled],Source.[Hidden],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





