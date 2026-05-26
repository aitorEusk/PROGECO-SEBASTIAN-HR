

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"TemplateId":"PERS_News_Category",
	"GroupField":"Descrip",
	"Order":0,
	"OrderType":"ASC",
	"Header":"<div class=\"col-4 col-l-4 col-m-6 col-s-12 emp-card-category emp-flex-wrap\"> \r\n',
N'  <div class=\"emp-border-hover\">\r\n',
N'    <div>\r\n',
N'    <h3 class=\"txt-info padding-m padding-left-l margin-bottom-xl\">\r\n',
N'      <i class=\"fa fa-book icon-margin-right icon-2x\"><\/i>\r\n',
N'      <flx-navbutton type=\"openpage\" pagetypeid=\"edit\" objectname=\"emp_News_Category\" objectwhere=\"News_Categories.CategoryId={{CategoryId}}\" defaults=\"\" targetid=\"popup800x600\" excludehist=\"false\">\r\n',
N'        <span class=\"clickable\">{{Descrip|string:20}}<\/span>\r\n',
N'      <\/flx-navbutton>\r\n',
N'      <div class=\"emp-card-counter right\">\r\n',
N'        <span class=\"txt-info\">{{TotalNews|isnull:0}}<\/span>\r\n',
N'      <\/div>\r\n',
N'    <\/h3>\r\n',
N'    <ul class=\"list-unstyled\">",
	"Footer":"      <\/ul>\r\n',
N'\t<\/div>\r\n',
N'    <flx-navbutton class=\"{{TotalNews|switch:[0:hidden,1:hidden,2:hidden,3:hidden,4:hidden,5:hidden,null:hidden,else:]}} clickable\" type=\"openpage\" pagetypeid=\"list\" objectname=\"emp_News_Articles\" objectwhere=\"News_Articles.CategoryId={{CategoryId}}\" defaults=\"{''CategoryId'':''{{CategoryId}}''}\" targetid=\"current\" excludehist=\"false\" showprogress=\"false\">\t  \r\n',
N'      <div class=\"title text-center emp-card-footer\">{{translate|View all}}<i class=\"fa fa-angle-right icon-margin-left\"><\/i><\/div>    \r\n',
N'    <\/flx-navbutton>\r\n',
N'  <\/div>\r\n',
N'<\/div>\r\n',
N'",
	"Offline":false,
	"UserDefault":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T15:40:00",
	"flxUpdatedDate":"2025-03-05T15:50:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Templates_Groups] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[TemplateId] nvarchar(50) '$.TemplateId'
,[GroupField] nvarchar(50) '$.GroupField'
,[Order] int '$.Order'
,[OrderType] nvarchar(4) '$.OrderType'
,[Header] nvarchar(max) '$.Header'
,[Footer] nvarchar(max) '$.Footer'
,[Offline] bit '$.Offline'
,[Label] varchar(250) '$.Label'
,[UserDefault] bit '$.UserDefault'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([TemplateId],[GroupField],[Order],[OrderType],[Header],[Footer],[Offline],[Label],[UserDefault],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[TemplateId] = Source.[TemplateId] AND Target.[GroupField] = Source.[GroupField])
WHEN MATCHED AND (
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[OrderType], Target.[OrderType]) IS NOT NULL OR NULLIF(Target.[OrderType], Source.[OrderType]) IS NOT NULL OR 
	NULLIF(Source.[Header], Target.[Header]) IS NOT NULL OR NULLIF(Target.[Header], Source.[Header]) IS NOT NULL OR 
	NULLIF(Source.[Footer], Target.[Footer]) IS NOT NULL OR NULLIF(Target.[Footer], Source.[Footer]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[UserDefault], Target.[UserDefault]) IS NOT NULL OR NULLIF(Target.[UserDefault], Source.[UserDefault]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Order] = Source.[Order], 
  [OrderType] = Source.[OrderType], 
  [Header] = Source.[Header], 
  [Footer] = Source.[Footer], 
  [Offline] = Source.[Offline], 
  [Label] = Source.[Label], 
  [UserDefault] = Source.[UserDefault], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([TemplateId],[GroupField],[Order],[OrderType],[Header],[Footer],[Offline],[Label],[UserDefault],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[TemplateId],Source.[GroupField],Source.[Order],Source.[OrderType],Source.[Header],Source.[Footer],Source.[Offline],Source.[Label],Source.[UserDefault],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





