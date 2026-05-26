

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_Employee",
	"ViewName":"PERS_emp_EmployeeExtendedInfo",
	"Descrip":"PERS_Employee Extended Info",
	"ConnStringId":"DataConnectionString",
	"SQLSentence":"SELECT distinct Employees.[EmployeeId]\r\n',
N',[Employees].[Name]\r\n',
N',[Employees].[Surname]\r\n',
N',Employees.[Category]\r\n',
N',Employees.[Office]\r\n',
N',o.Descrip as OfficeDescrip \r\n',
N',Employees.[Area]\r\n',
N',Areas.Descrip as AreaDescrip \r\n',
N',[Photo] \r\n',
N',ISNULL([Mail], ED.PersonalEmail) AS Mail,[Phone] \r\n',
N',[Experience] \r\n',
N',Employees.[Department]\r\n',
N', d.Descrip as DepartmentDescrip \r\n',
N',[Group]\r\n',
N', g.Descrip as GroupDescrip \r\n',
N',[ResponsableId] \r\n',
N',[Gender]\r\n',
N',[Discharge]\r\n',
N',[FullName] \r\n',
N',[Blocked]\r\n',
N',[GPRD]\r\n',
N',Employees.[WPD]\r\n',
N',Employees.[InsertedBy]\r\n',
N',Employees.[UpdateBy]\r\n',
N',Employees.[Inserted]\r\n',
N',Employees.[LastUpdate],\r\n',
N'Photo as [flxpath|emp_Employee|Photo]\r\n',
N',WD.Descrip AS WPDDescrip\r\n',
N',WD.FullDefinition AS FullDefinition\r\n',
N',HasLang\r\n',
N',CASE WHEN (SELECT count(Id) \r\n',
N'\tFROM {~ConfConnectionString~}.dbo.AspNetUsers \r\n',
N'\tWHERE Reference =[Employees].[EmployeeId] ) > 0 then 0 else 1 END AS EnableButton\r\n',
N',SUBSTRING(Employees.[Name],1,1) + SUBSTRING(Employees.[Surname],1,1) as imgText\r\n',
N'  FROM [Employees]  \r\n',
N'  LEFT JOIN Areas on Employees.Area=Areas.Area  \r\n',
N'  LEFT JOIN Offices o  on Employees.Office=o.Office  \r\n',
N'  LEFT JOIN Departments d on Employees.Department=d.Department  \r\n',
N'  LEFT JOIN Groups g on Employees.[Group]=g.[GroupId]\r\n',
N'  LEFT JOIN [Categories] C ON C.Category = Employees.Category\r\n',
N'  LEFT JOIN [Areas] A ON A.Area=Employees.Area\r\n',
N'  LEFT JOIN [WorkPlace_Definition] WD ON WD.WPD= Employees.WPD\r\n',
N'  LEFT JOIN (select count(1) as HasLang, EmployeeId as EId from Employees_Languages group By EmployeeId)t ON t.EId=Employees.EmployeeId\r\n',
N'  LEFT JOIN {~ConfConnectionString~}.dbo.AspNetUsers U ON U.Reference = Employees.EmployeeId\r\n',
N'  LEFT JOIN Employees_PersonalData ED ON Employees.EmployeeId = ED.EmployeeId\r\n',
N'",
	"NoFilter":false,
	"ShowAsGrid":false,
	"Active":true,
	"System":false,
	"IsDefault":true,
	"OrderBy":"Surname,Name",
	"Offline":false,
	"BufferSize":500,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-04-07T16:09:00",
	"flxUpdatedDate":"2025-04-07T16:17:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"ViewName":"PERS_Marcaje_Empleado",
	"Descrip":"PERS_Marcaje_Empleado",
	"ConnStringId":"DataConnectionString",
	"SQLSentence":"SELECT CONF.EmployeeId, CONF.IdEmpleadoNetTime, Pers_Marcaje.DateTime, PMT.Name AS TimeTypeDescr, Pers_Marcaje.IdTimeType \n',
N'FROM Pers_Marcaje \n',
N'JOIN pers_marcaje_tipo PMT\n',
N'ON Pers_Marcaje.IdTimeType = PMT.IdTipoMarcaje\n',
N'JOIN PERS_CONF_Employees_PersonalData CONF\n',
N'ON Pers_Marcaje.EmployeeId = CONF.IdEmpleadoNetTime\n',
N'JOIN Employees E ON CONF.EmployeeId = E.EmployeeId",
	"NoFilter":false,
	"ShowAsGrid":false,
	"Active":true,
	"System":false,
	"IsDefault":false,
	"OrderBy":"DateTime DESC",
	"Offline":false,
	"BufferSize":500,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"ViewName":"Pers_MarcajeDefaultList",
	"Descrip":"Pers_MarcajeDefaultList",
	"ConnStringId":"DataConnectionString",
	"SQLSentence":" SELECT [Pers_Marcaje].[IdClocking], [Pers_Marcaje].[IdClocking] as [IdClocking_1], [Pers_Marcaje].[EmployeeId] as [EmployeeId], [Pers_Marcaje].[AllDay] as [AllDay], [Pers_Marcaje].[CardNumber] as [CardNumber], [Pers_Marcaje].[ClockingType] as [ClockingType], [Pers_Marcaje].[DateTime] as [DateTime], [Pers_Marcaje].[IdEmployer] as [IdEmployer], [Pers_Marcaje].[IdReader] as [IdReader], [Pers_Marcaje].[IdTerminal] as [IdTerminal], [Pers_Marcaje].[IdTimeType] as [IdTimeType], [Pers_Marcaje].[IdZone] as [IdZone], [Pers_Marcaje].[Ip] as [Ip], [Pers_Marcaje].[Source] as [Source], [Pers_Marcaje].[State] as [State], [Pers_Marcaje].[Usuario] as [Usuario], [Pers_Marcaje].[TimeTypeDescr] as [TimeTypeDescr] FROM [Pers_Marcaje] \r\n',
N'\r\n',
N'",
	"NoFilter":false,
	"ShowAsGrid":true,
	"Active":true,
	"System":false,
	"IsDefault":true,
	"Offline":false,
	"BufferSize":500,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"ViewName":"Notificaciones_Contador_Visitas",
	"Descrip":"Notificaciones_Contador_Visitas",
	"ConnStringId":"DataConnectionString",
	"SQLSentence":"SELECT IdNotificacion, SUM(ReadTimes) as TotalReads FROM PERS_Notificaciones_Reads\r\n',
N'GROUP BY IdNotificacion",
	"NoFilter":false,
	"ShowAsGrid":false,
	"Active":true,
	"System":false,
	"IsDefault":false,
	"Offline":false,
	"BufferSize":500,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T08:49:00",
	"flxUpdatedDate":"2025-03-05T08:49:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"ViewName":"PERS_NotificacionDefaultList",
	"Descrip":"PERS_NotificacionDefaultList",
	"ConnStringId":"DataConnectionString",
	"SQLSentence":" SELECT [PERS_Notificaciones].[IdNotificacion], [FlxCmb1].[FullName] as [IdNotificacion_1], [FlxCmb2].[FullName] as [Empleado], [PERS_Notificaciones].[Texto] as [Texto], [PERS_Notificaciones].[Titulo] as [Titulo], [FlxCmb3].[FullName] as [Inserted By], [FlxCmb4].[FullName] as [Update By], [PERS_Notificaciones].[Inserted] as [Inserted], [PERS_Notificaciones].[LastUpdate] as [Last Update] FROM [PERS_Notificaciones] \n',
N'  LEFT JOIN (SELECT [EmployeeId] ,[Name] ,[Surname],[FullName],[Blocked]  \n',
N'FROM [Employees] ) [FlxCmb1] ON [FlxCmb1].[EmployeeId]=[PERS_Notificaciones].[IdNotificacion] \n',
N'  LEFT JOIN (SELECT [EmployeeId] ,[Name] ,[Surname],[FullName],[Blocked]  \n',
N'FROM [Employees] ) [FlxCmb2] ON [FlxCmb2].[EmployeeId]=[PERS_Notificaciones].[IdEmpleado] \n',
N'  LEFT JOIN (SELECT [EmployeeId] ,[Name] ,[Surname],[FullName],[Blocked]  \n',
N'FROM [Employees] ) [FlxCmb3] ON [FlxCmb3].[EmployeeId]=[PERS_Notificaciones].[InsertedBy] \n',
N'  LEFT JOIN (SELECT [EmployeeId] ,[Name] ,[Surname],[FullName],[Blocked]  \n',
N'FROM [Employees] ) [FlxCmb4] ON [FlxCmb4].[EmployeeId]=[PERS_Notificaciones].[UpdateBy] \n',
N'\n',
N'",
	"NoFilter":false,
	"ShowAsGrid":true,
	"Active":true,
	"System":false,
	"IsDefault":true,
	"OrderBy":"IdNotificacion DESC",
	"Offline":false,
	"BufferSize":500,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T17:03:00",
	"flxUpdatedDate":"2026-05-26T09:23:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"ViewName":"PERS_Notificaciones_Reads",
	"Descrip":"PERS_Notificaciones_Reads",
	"ConnStringId":"DataConnectionString",
	"SQLSentence":"SELECT PERS_Notificaciones_Reads.*, e.Name as Name, e.Surname as Surname, a.Descrip AS Area, a.Area AS AreaId, e.[Photo] AS Photo\r\n',
N'FROM PERS_Notificaciones_Reads\r\n',
N'INNER JOIN Employees e ON PERS_Notificaciones_Reads.EmployeeId=e.EmployeeId\r\n',
N'LEFT JOIN Areas a ON e.Area = a.Area",
	"NoFilter":false,
	"ShowAsGrid":false,
	"Active":true,
	"System":false,
	"IsDefault":false,
	"Offline":false,
	"BufferSize":500,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T08:53:00",
	"flxUpdatedDate":"2025-03-05T08:53:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Views] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[ViewName] nvarchar(255) '$.ViewName'
,[Descrip] nvarchar(255) '$.Descrip'
,[ConnStringId] nvarchar(50) '$.ConnStringId'
,[SQLSentence] nvarchar(max) '$.SQLSentence'
,[NoFilter] bit '$.NoFilter'
,[ShowAsGrid] bit '$.ShowAsGrid'
,[Active] bit '$.Active'
,[System] bit '$.System'
,[IsDefault] bit '$.IsDefault'
,[OrderBy] nvarchar(max) '$.OrderBy'
,[Offline] bit '$.Offline'
,[PrimaryKeys] nvarchar(max) '$.PrimaryKeys'
,[IndexFields] nvarchar(max) '$.IndexFields'
,[BufferSize] int '$.BufferSize'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([ObjectName],[ViewName],[Descrip],[ConnStringId],[SQLSentence],[NoFilter],[ShowAsGrid],[Active],[System],[IsDefault],[OrderBy],[Offline],[PrimaryKeys],[IndexFields],[BufferSize],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ViewName] = Source.[ViewName])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[NoFilter], Target.[NoFilter]) IS NOT NULL OR NULLIF(Target.[NoFilter], Source.[NoFilter]) IS NOT NULL OR 
	NULLIF(Source.[ShowAsGrid], Target.[ShowAsGrid]) IS NOT NULL OR NULLIF(Target.[ShowAsGrid], Source.[ShowAsGrid]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[System], Target.[System]) IS NOT NULL OR NULLIF(Target.[System], Source.[System]) IS NOT NULL OR 
	NULLIF(Source.[IsDefault], Target.[IsDefault]) IS NOT NULL OR NULLIF(Target.[IsDefault], Source.[IsDefault]) IS NOT NULL OR 
	NULLIF(Source.[OrderBy], Target.[OrderBy]) IS NOT NULL OR NULLIF(Target.[OrderBy], Source.[OrderBy]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[PrimaryKeys], Target.[PrimaryKeys]) IS NOT NULL OR NULLIF(Target.[PrimaryKeys], Source.[PrimaryKeys]) IS NOT NULL OR 
	NULLIF(Source.[IndexFields], Target.[IndexFields]) IS NOT NULL OR NULLIF(Target.[IndexFields], Source.[IndexFields]) IS NOT NULL OR 
	NULLIF(Source.[BufferSize], Target.[BufferSize]) IS NOT NULL OR NULLIF(Target.[BufferSize], Source.[BufferSize]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [ConnStringId] = Source.[ConnStringId], 
  [SQLSentence] = Source.[SQLSentence], 
  [NoFilter] = Source.[NoFilter], 
  [ShowAsGrid] = Source.[ShowAsGrid], 
  [Active] = Source.[Active], 
  [System] = Source.[System], 
  [IsDefault] = Source.[IsDefault], 
  [OrderBy] = Source.[OrderBy], 
  [Offline] = Source.[Offline], 
  [PrimaryKeys] = Source.[PrimaryKeys], 
  [IndexFields] = Source.[IndexFields], 
  [BufferSize] = Source.[BufferSize], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ViewName],[Descrip],[ConnStringId],[SQLSentence],[NoFilter],[ShowAsGrid],[Active],[System],[IsDefault],[OrderBy],[Offline],[PrimaryKeys],[IndexFields],[BufferSize],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[ViewName],Source.[Descrip],Source.[ConnStringId],Source.[SQLSentence],Source.[NoFilter],Source.[ShowAsGrid],Source.[Active],Source.[System],Source.[IsDefault],Source.[OrderBy],Source.[Offline],Source.[PrimaryKeys],Source.[IndexFields],Source.[BufferSize],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





