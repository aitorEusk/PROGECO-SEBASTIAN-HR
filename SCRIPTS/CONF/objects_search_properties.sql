

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"SearchId":"F31EBB1A-5B25-4B5D-A720-17DF80543743",
	"ObjectName":"emp_Employee",
	"PropertyName":"Area",
	"ObjectPath":"emp_Employee",
	"Size":2,
	"Order":1,
	"Label":"Area",
	"PropertySearchType":"dbcombo",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T15:44:00",
	"flxUpdatedDate":"2026-05-27T15:44:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"F31EBB1A-5B25-4B5D-A720-17DF80543743",
	"ObjectName":"emp_Employee",
	"PropertyName":"Department",
	"ObjectPath":"emp_Employee",
	"Size":2,
	"Order":0,
	"Label":"Department",
	"PropertySearchType":"dbcombo",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T15:44:00",
	"flxUpdatedDate":"2026-05-27T15:44:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"F31EBB1A-5B25-4B5D-A720-17DF80543743",
	"ObjectName":"emp_Employee",
	"PropertyName":"Name",
	"ObjectPath":"emp_Employee",
	"Size":2,
	"Order":3,
	"Label":"Nombre",
	"PropertySearchType":"text",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T15:44:00",
	"flxUpdatedDate":"2026-05-27T15:44:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"F31EBB1A-5B25-4B5D-A720-17DF80543743",
	"ObjectName":"emp_Employee",
	"PropertyName":"Office",
	"ObjectPath":"emp_Employee",
	"Size":2,
	"Order":2,
	"Label":"Office",
	"PropertySearchType":"dbcombo",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T15:44:00",
	"flxUpdatedDate":"2026-05-27T15:44:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"F31EBB1A-5B25-4B5D-A720-17DF80543743",
	"ObjectName":"emp_Employee",
	"PropertyName":"Surname",
	"ObjectPath":"emp_Employee",
	"Size":2,
	"Order":4,
	"Label":"Apellidos",
	"PropertySearchType":"text",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T15:44:00",
	"flxUpdatedDate":"2026-05-27T15:44:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"D402835A-7D55-47A1-90D6-A1438426FE8D",
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"Inserted",
	"ObjectPath":"PERS_Notificacion",
	"Size":2,
	"Order":1,
	"Label":"Fecha",
	"PropertySearchType":"date",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:36:00",
	"flxUpdatedDate":"2026-05-27T10:36:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"D402835A-7D55-47A1-90D6-A1438426FE8D",
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"Titulo",
	"ObjectPath":"PERS_Notificacion",
	"Size":2,
	"Order":0,
	"Label":"Titulo",
	"PropertySearchType":"text",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:36:00",
	"flxUpdatedDate":"2026-05-27T10:36:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"SearchId":"19EFADCE-C9B4-4A0D-AF50-AF6869A3E161",
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"DateTime",
	"ObjectPath":"Pers_Marcaje",
	"Size":2,
	"Order":0,
	"Label":"Fecha",
	"PropertySearchType":"date-range",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-26T08:53:00",
	"flxUpdatedDate":"2026-05-26T08:53:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Search_Properties] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[SearchId] uniqueidentifier '$.SearchId'
,[ObjectName] nvarchar(50) '$.ObjectName'
,[PropertyName] nvarchar(50) '$.PropertyName'
,[ObjectPath] nvarchar(500) '$.ObjectPath'
,[Size] int '$.Size'
,[Order] int '$.Order'
,[Label] nvarchar(250) '$.Label'
,[PropertySearchType] nvarchar(20) '$.PropertySearchType'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([SearchId],[ObjectName],[PropertyName],[ObjectPath],[Size],[Order],[Label],[PropertySearchType],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[SearchId] = Source.[SearchId] AND Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectPath], Target.[ObjectPath]) IS NOT NULL OR NULLIF(Target.[ObjectPath], Source.[ObjectPath]) IS NOT NULL OR 
	NULLIF(Source.[Size], Target.[Size]) IS NOT NULL OR NULLIF(Target.[Size], Source.[Size]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[PropertySearchType], Target.[PropertySearchType]) IS NOT NULL OR NULLIF(Target.[PropertySearchType], Source.[PropertySearchType]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectPath] = Source.[ObjectPath], 
  [Size] = Source.[Size], 
  [Order] = Source.[Order], 
  [Label] = Source.[Label], 
  [PropertySearchType] = Source.[PropertySearchType], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SearchId],[ObjectName],[PropertyName],[ObjectPath],[Size],[Order],[Label],[PropertySearchType],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[SearchId],Source.[ObjectName],Source.[PropertyName],Source.[ObjectPath],Source.[Size],Source.[Order],Source.[Label],Source.[PropertySearchType],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





