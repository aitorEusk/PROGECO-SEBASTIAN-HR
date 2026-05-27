

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"NoticeId":"076f68fb-e73b-4eb7-b566-1374782909b8",
	"Title":"Error Sending Email",
	"Message":"<span>No se especificó el host SMTP.<small class=\"txt-muted\"> (Nuevo notificación)<\/small><span>",
	"ReminderTime":"2026-05-26T09:55:00",
	"ExpiryTime":"2026-06-02T09:55:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-26T09:55:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"sysOutboxMail",
	"ObjectWhere":"(Id=''915ee448-09a2-401a-a951-552d24c171c4'')",
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-26T09:55:00",
	"flxUpdatedDate":"2026-05-26T09:55:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"0eec3ff1-9dcb-4078-9088-f403e0905853",
	"Title":"Tiene nuevos mensajes para leer",
	"Message":"sdf",
	"ReminderTime":"2026-05-27T10:06:00",
	"ExpiryTime":"2026-06-05T10:06:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":true,
	"AllUsersIsSent":true,
	"Error":false,
	"InsertDate":"2026-05-27T10:06:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"View",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId=22",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:07:00",
	"flxUpdatedDate":"2026-05-27T10:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"143aeb01-6ea0-4c46-9971-f49bc9b88f5e",
	"Title":"Noticia modificada",
	"Message":"Hay nuevas sugerencias pendientes",
	"ReminderTime":"2026-05-27T10:06:00",
	"ExpiryTime":"2026-06-03T10:06:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:06:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId =21",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:06:00",
	"flxUpdatedDate":"2026-05-27T10:06:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"16497d0f-bcf6-42d3-9762-5c9137a72ed7",
	"Title":"Noticia modificada",
	"Message":"Hay nuevas sugerencias pendientes",
	"ReminderTime":"2026-05-27T10:07:00",
	"ExpiryTime":"2026-06-03T10:07:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:06:53",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId =22",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:07:00",
	"flxUpdatedDate":"2026-05-27T10:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"40dffcb6-f330-4cb6-a3d5-2f9e1c29f8cb",
	"Title":"Tiene nuevos mensajes para leer",
	"Message":"Prueba",
	"ReminderTime":"2026-05-27T10:02:00",
	"ExpiryTime":"2026-05-31T10:02:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":true,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:02:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"View",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId=21",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:04:00",
	"flxUpdatedDate":"2026-05-27T10:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"47c9ea0d-8144-495b-be90-b9d65d23d4ca",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-27T11:05:00",
	"ExpiryTime":"2026-06-03T11:05:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T11:05:08",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''121''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T11:05:00",
	"flxUpdatedDate":"2026-05-27T11:05:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"4fae2f86-adda-49b0-95c1-772d89380f4f",
	"Title":"Nueva noticia publicada.",
	"Message":"Hay nuevas sugerencias pendientes",
	"ReminderTime":"2026-05-27T10:07:00",
	"ExpiryTime":"2026-06-03T10:07:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:06:34",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId =22",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:07:00",
	"flxUpdatedDate":"2026-05-27T10:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"58bee3da-e7a2-4b0e-a614-94be0698f442",
	"Title":"Tiene nuevos mensajes para leer",
	"Message":"Prueba",
	"ReminderTime":"2026-05-27T10:02:00",
	"ExpiryTime":"2026-05-31T10:02:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":true,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:02:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"View",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId=21",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:06:00",
	"flxUpdatedDate":"2026-05-27T10:06:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"5b286b32-5973-41ee-87cf-5346d60b8272",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-27T10:09:00",
	"ExpiryTime":"2026-06-03T10:09:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:09:14",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''111''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:09:00",
	"flxUpdatedDate":"2026-05-27T10:09:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"5e7b9d84-3a77-4132-926b-4f74763d2803",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-27T10:11:00",
	"ExpiryTime":"2026-06-03T10:11:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:10:57",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''112''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:11:00",
	"flxUpdatedDate":"2026-05-27T10:11:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"63760b29-109b-4396-9680-1f91e9b34b76",
	"Title":"Tiene nuevos mensajes para leer",
	"Message":"sdf",
	"ReminderTime":"2026-05-27T10:06:00",
	"ExpiryTime":"2026-06-05T10:06:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":true,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:06:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"View",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId=22",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:07:00",
	"flxUpdatedDate":"2026-05-27T10:07:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"64a43094-5031-41ba-84d5-e8049698603c",
	"Title":"Tiene nuevos mensajes para leer",
	"Message":"Prueba noticia",
	"ReminderTime":"2026-05-27T10:07:00",
	"ExpiryTime":"2026-06-05T10:07:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":true,
	"AllUsersIsSent":true,
	"Error":false,
	"InsertDate":"2026-05-27T10:07:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"View",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId=23",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:08:00",
	"flxUpdatedDate":"2026-05-27T10:08:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"69e3c650-9203-4f35-963a-7d8d5edee5a0",
	"Title":"Error Cron Job",
	"Message":"<span>Fail executing process pScheduled_ApplyUOPlannedChanges: Error Running Process pScheduled_ApplyUOPlannedChanges\r\n',
N'---------\r\n',
N'  - Registros con error: 0<small class=\"txt-muted\"> (Apply_Future_Changes_UO)<\/small><span>",
	"ReminderTime":"2026-05-26T12:05:00",
	"ExpiryTime":"2026-06-02T12:05:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-26T12:05:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"sysJob",
	"ObjectWhere":"(JobName=''Apply_Future_Changes_UO'')",
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-26T12:05:00",
	"flxUpdatedDate":"2026-05-26T12:05:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"6d152f83-574f-4bad-bfcf-d8cb70a1c45a",
	"Title":"Error Cron Job",
	"Message":"<span>Fail executing process pBalanceAuto_MonthlyPaymentsEmployees: Error Running Process pBalanceAuto_MonthlyPaymentsEmployees\r\n',
N'---------\r\n',
N'Error in Stored Results\r\n',
N'---------\r\n',
N'El nombre de objeto ''dbo.fGiveMe_Employee_tbl_HolyDay'' no es válido.\r\n',
N'El recuento de transacciones después de EXECUTE indica un número no coincidente de instrucciones BEGIN y COMMIT. Recuento anterior = 0, recuento actual = 1.<small class=\"txt-muted\"> (DailyBalanceAuto_MonthlyPaymentsEmployees_CRON)<\/small><span>",
	"ReminderTime":"2026-05-27T01:00:00",
	"ExpiryTime":"2026-06-03T01:00:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T01:00:01",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"sysJob",
	"ObjectWhere":"(JobName=''DailyBalanceAuto_MonthlyPaymentsEmployees_CRON'')",
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-27T01:00:00",
	"flxUpdatedDate":"2026-05-27T01:00:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"70b502f8-3dab-4f0c-afa9-51df200aaed0",
	"Title":"Error Cron Job",
	"Message":"<span>Fail executing process pCron_Incidences_Fast_Simple: Error Running Process pCron_Incidences_Fast_Simple\r\n',
N'---------\r\n',
N'Error in Stored Results\r\n',
N'---------\r\n',
N'Se agotó el tiempo de espera de ejecución. El período de tiempo de espera transcurrió antes de la finalización de la operación o el servidor no responde.\r\n',
N'---------\r\n',
N'Tiempo de espera de la operación de espera agotado<small class=\"txt-muted\"> (Cron_Incidence_Fast_Simple)<\/small><span>",
	"ReminderTime":"2026-05-26T09:55:00",
	"ExpiryTime":"2026-06-02T09:55:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-26T09:55:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"sysJob",
	"ObjectWhere":"(JobName=''Cron_Incidence_Fast_Simple'')",
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-26T09:55:00",
	"flxUpdatedDate":"2026-05-26T09:55:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"75a5c259-7716-4084-8404-958a2fc37787",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-27T11:01:00",
	"ExpiryTime":"2026-06-03T11:01:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T11:01:23",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''119''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T11:01:00",
	"flxUpdatedDate":"2026-05-27T11:01:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"86b5f360-ef9d-4345-8915-a8c094958abc",
	"Title":"Noticia modificada",
	"Message":"Hay nuevas sugerencias pendientes",
	"ReminderTime":"2026-05-27T10:04:00",
	"ExpiryTime":"2026-06-03T10:04:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:04:15",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId =21",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:04:00",
	"flxUpdatedDate":"2026-05-27T10:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"883a9bd9-ca83-4ed2-9001-1688ea1bda8c",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-27T11:04:00",
	"ExpiryTime":"2026-06-03T11:04:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T11:04:07",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''120''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T11:04:00",
	"flxUpdatedDate":"2026-05-27T11:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"96c8c2ac-73b2-49e6-9713-888a7705d297",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-26T09:34:00",
	"ExpiryTime":"2026-06-02T09:34:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-26T09:33:34",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''109''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-26T09:34:00",
	"flxUpdatedDate":"2026-05-26T09:34:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"98815df4-bd43-4f1b-8f56-5778c40292ed",
	"Title":"Nueva noticia publicada.",
	"Message":"Hay nuevas sugerencias pendientes",
	"ReminderTime":"2026-05-27T10:08:00",
	"ExpiryTime":"2026-06-03T10:08:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:07:38",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId =23",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:08:00",
	"flxUpdatedDate":"2026-05-27T10:08:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"9a794bed-96bc-44a9-8469-11e43f033900",
	"Title":"Error Cron Job",
	"Message":"<span>Fail executing process pMarkings_AutoEndOfShift_Target_All: Error Running Process pMarkings_AutoEndOfShift_Target_All\r\n',
N'---------\r\n',
N'Error in Stored Results\r\n',
N'---------\r\n',
N'Se agotó el tiempo de espera de ejecución. El período de tiempo de espera transcurrió antes de la finalización de la operación o el servidor no responde.\r\n',
N'---------\r\n',
N'Tiempo de espera de la operación de espera agotado<small class=\"txt-muted\"> (AutoEndOfShift_Markings)<\/small><span>",
	"ReminderTime":"2026-05-26T09:55:00",
	"ExpiryTime":"2026-06-02T09:55:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-26T09:55:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"sysJob",
	"ObjectWhere":"(JobName=''AutoEndOfShift_Markings'')",
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2026-05-26T09:55:00",
	"flxUpdatedDate":"2026-05-26T09:55:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"9bd87d52-bc6a-44ab-8215-234754eb6c8e",
	"Title":"Nuevo notificación",
	"Message":"Tienes una notificación nueva:",
	"ReminderTime":"2026-05-26T09:37:00",
	"ExpiryTime":"2026-06-02T09:37:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-26T09:37:18",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"PERS_Notificacion",
	"ObjectWhere":"IdNotificacion = ''110''",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-26T09:37:00",
	"flxUpdatedDate":"2026-05-26T09:37:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"9da31c9c-4d83-4af3-ae0a-b9c3540f43d9",
	"Title":"Nueva noticia publicada.",
	"Message":"Hay nuevas sugerencias pendientes",
	"ReminderTime":"2026-05-27T10:03:00",
	"ExpiryTime":"2026-06-03T10:03:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":false,
	"AllUsersIsSent":false,
	"Error":false,
	"InsertDate":"2026-05-27T10:03:10",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"view",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId =21",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:03:00",
	"flxUpdatedDate":"2026-05-27T10:03:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"NoticeId":"c0221b18-2580-4d82-baa4-7decceea3c1a",
	"Title":"Tiene nuevos mensajes para leer",
	"Message":"Prueba",
	"ReminderTime":"2026-05-27T10:02:00",
	"ExpiryTime":"2026-05-31T10:02:00",
	"MethodName":"app",
	"CausesSync":false,
	"AllUsers":true,
	"AllUsersIsSent":true,
	"Error":false,
	"InsertDate":"2026-05-27T10:02:00",
	"TypeId":"object",
	"TargetId":"current",
	"PageTypeId":"View",
	"ObjectName":"emp_News_Article",
	"ObjectWhere":"News_Articles.NewsId=21",
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:03:00",
	"flxUpdatedDate":"2026-05-27T10:03:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Notices] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[NoticeId] nvarchar(100) '$.NoticeId'
,[Title] nvarchar(500) '$.Title'
,[Message] nvarchar(max) '$.Message'
,[AfterClickEvent] nvarchar(max) '$.AfterClickEvent'
,[ReminderTime] smalldatetime '$.ReminderTime'
,[ExpiryTime] smalldatetime '$.ExpiryTime'
,[MethodName] nvarchar(15) '$.MethodName'
,[CausesSync] bit '$.CausesSync'
,[AllUsers] bit '$.AllUsers'
,[AllUsersIsSent] bit '$.AllUsersIsSent'
,[Error] bit '$.Error'
,[ErrorMsg] varchar(max) '$.ErrorMsg'
,[CSSClass] nvarchar(125) '$.CSSClass'
,[InsertDate] datetime '$.InsertDate'
,[TypeId] nvarchar(50) '$.TypeId'
,[Params] nvarchar(255) '$.Params'
,[Url] nvarchar(255) '$.Url'
,[TargetId] nvarchar(50) '$.TargetId'
,[ProcessName] nvarchar(255) '$.ProcessName'
,[PageTypeId] nvarchar(50) '$.PageTypeId'
,[PageName] nvarchar(100) '$.PageName'
,[ReportName] nvarchar(200) '$.ReportName'
,[HelpId] nvarchar(50) '$.HelpId'
,[ReportWhere] nvarchar(1000) '$.ReportWhere'
,[ObjectName] nvarchar(50) '$.ObjectName'
,[ObjectWhere] nvarchar(1000) '$.ObjectWhere'
,[SQLSentence] nvarchar(max) '$.SQLSentence'
,[SQLConStringId] nvarchar(50) '$.SQLConStringId'
,[WebComponent] nvarchar(1000) '$.WebComponent'
,[TableName] nvarchar(250) '$.TableName'
,[JavaFunction] nvarchar(max) '$.JavaFunction'
,[Defaults] varchar(2000) '$.Defaults'
,[flxInsertedBy] nvarchar(256) '$.flxInsertedBy'
,[flxUpdatedBy] nvarchar(256) '$.flxUpdatedBy'
,[flxInsertedDate] smalldatetime '$.flxInsertedDate'
,[flxUpdatedDate] smalldatetime '$.flxUpdatedDate'
,[OriginAddonId] nvarchar(256) '$.OriginAddonId'
,[OriginId] int '$.OriginId'
) 
) AS Source ([NoticeId],[Title],[Message],[AfterClickEvent],[ReminderTime],[ExpiryTime],[MethodName],[CausesSync],[AllUsers],[AllUsersIsSent],[Error],[ErrorMsg],[CSSClass],[InsertDate],[TypeId],[Params],[Url],[TargetId],[ProcessName],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[SQLSentence],[SQLConStringId],[WebComponent],[TableName],[JavaFunction],[Defaults],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[NoticeId] = Source.[NoticeId])
WHEN MATCHED AND (
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[Message], Target.[Message]) IS NOT NULL OR NULLIF(Target.[Message], Source.[Message]) IS NOT NULL OR 
	NULLIF(Source.[AfterClickEvent], Target.[AfterClickEvent]) IS NOT NULL OR NULLIF(Target.[AfterClickEvent], Source.[AfterClickEvent]) IS NOT NULL OR 
	NULLIF(Source.[ReminderTime], Target.[ReminderTime]) IS NOT NULL OR NULLIF(Target.[ReminderTime], Source.[ReminderTime]) IS NOT NULL OR 
	NULLIF(Source.[ExpiryTime], Target.[ExpiryTime]) IS NOT NULL OR NULLIF(Target.[ExpiryTime], Source.[ExpiryTime]) IS NOT NULL OR 
	NULLIF(Source.[MethodName], Target.[MethodName]) IS NOT NULL OR NULLIF(Target.[MethodName], Source.[MethodName]) IS NOT NULL OR 
	NULLIF(Source.[CausesSync], Target.[CausesSync]) IS NOT NULL OR NULLIF(Target.[CausesSync], Source.[CausesSync]) IS NOT NULL OR 
	NULLIF(Source.[AllUsers], Target.[AllUsers]) IS NOT NULL OR NULLIF(Target.[AllUsers], Source.[AllUsers]) IS NOT NULL OR 
	NULLIF(Source.[AllUsersIsSent], Target.[AllUsersIsSent]) IS NOT NULL OR NULLIF(Target.[AllUsersIsSent], Source.[AllUsersIsSent]) IS NOT NULL OR 
	NULLIF(Source.[Error], Target.[Error]) IS NOT NULL OR NULLIF(Target.[Error], Source.[Error]) IS NOT NULL OR 
	NULLIF(Source.[ErrorMsg], Target.[ErrorMsg]) IS NOT NULL OR NULLIF(Target.[ErrorMsg], Source.[ErrorMsg]) IS NOT NULL OR 
	NULLIF(Source.[CSSClass], Target.[CSSClass]) IS NOT NULL OR NULLIF(Target.[CSSClass], Source.[CSSClass]) IS NOT NULL OR 
	NULLIF(Source.[InsertDate], Target.[InsertDate]) IS NOT NULL OR NULLIF(Target.[InsertDate], Source.[InsertDate]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Params], Target.[Params]) IS NOT NULL OR NULLIF(Target.[Params], Source.[Params]) IS NOT NULL OR 
	NULLIF(Source.[Url], Target.[Url]) IS NOT NULL OR NULLIF(Target.[Url], Source.[Url]) IS NOT NULL OR 
	NULLIF(Source.[TargetId], Target.[TargetId]) IS NOT NULL OR NULLIF(Target.[TargetId], Source.[TargetId]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PageTypeId], Target.[PageTypeId]) IS NOT NULL OR NULLIF(Target.[PageTypeId], Source.[PageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PageName], Target.[PageName]) IS NOT NULL OR NULLIF(Target.[PageName], Source.[PageName]) IS NOT NULL OR 
	NULLIF(Source.[ReportName], Target.[ReportName]) IS NOT NULL OR NULLIF(Target.[ReportName], Source.[ReportName]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ReportWhere], Target.[ReportWhere]) IS NOT NULL OR NULLIF(Target.[ReportWhere], Source.[ReportWhere]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLConStringId], Target.[SQLConStringId]) IS NOT NULL OR NULLIF(Target.[SQLConStringId], Source.[SQLConStringId]) IS NOT NULL OR 
	NULLIF(Source.[WebComponent], Target.[WebComponent]) IS NOT NULL OR NULLIF(Target.[WebComponent], Source.[WebComponent]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[JavaFunction], Target.[JavaFunction]) IS NOT NULL OR NULLIF(Target.[JavaFunction], Source.[JavaFunction]) IS NOT NULL OR 
	NULLIF(Source.[Defaults], Target.[Defaults]) IS NOT NULL OR NULLIF(Target.[Defaults], Source.[Defaults]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedBy], Target.[flxInsertedBy]) IS NOT NULL OR NULLIF(Target.[flxInsertedBy], Source.[flxInsertedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedBy], Target.[flxUpdatedBy]) IS NOT NULL OR NULLIF(Target.[flxUpdatedBy], Source.[flxUpdatedBy]) IS NOT NULL OR 
	NULLIF(Source.[flxInsertedDate], Target.[flxInsertedDate]) IS NOT NULL OR NULLIF(Target.[flxInsertedDate], Source.[flxInsertedDate]) IS NOT NULL OR 
	NULLIF(Source.[flxUpdatedDate], Target.[flxUpdatedDate]) IS NOT NULL OR NULLIF(Target.[flxUpdatedDate], Source.[flxUpdatedDate]) IS NOT NULL OR 
	NULLIF(Source.[OriginAddonId], Target.[OriginAddonId]) IS NOT NULL OR NULLIF(Target.[OriginAddonId], Source.[OriginAddonId]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Title] = Source.[Title], 
  [Message] = Source.[Message], 
  [AfterClickEvent] = Source.[AfterClickEvent], 
  [ReminderTime] = Source.[ReminderTime], 
  [ExpiryTime] = Source.[ExpiryTime], 
  [MethodName] = Source.[MethodName], 
  [CausesSync] = Source.[CausesSync], 
  [AllUsers] = Source.[AllUsers], 
  [AllUsersIsSent] = Source.[AllUsersIsSent], 
  [Error] = Source.[Error], 
  [ErrorMsg] = Source.[ErrorMsg], 
  [CSSClass] = Source.[CSSClass], 
  [InsertDate] = Source.[InsertDate], 
  [TypeId] = Source.[TypeId], 
  [Params] = Source.[Params], 
  [Url] = Source.[Url], 
  [TargetId] = Source.[TargetId], 
  [ProcessName] = Source.[ProcessName], 
  [PageTypeId] = Source.[PageTypeId], 
  [PageName] = Source.[PageName], 
  [ReportName] = Source.[ReportName], 
  [HelpId] = Source.[HelpId], 
  [ReportWhere] = Source.[ReportWhere], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [SQLSentence] = Source.[SQLSentence], 
  [SQLConStringId] = Source.[SQLConStringId], 
  [WebComponent] = Source.[WebComponent], 
  [TableName] = Source.[TableName], 
  [JavaFunction] = Source.[JavaFunction], 
  [Defaults] = Source.[Defaults], 
  [flxInsertedBy] = Source.[flxInsertedBy], 
  [flxUpdatedBy] = Source.[flxUpdatedBy], 
  [flxInsertedDate] = Source.[flxInsertedDate], 
  [flxUpdatedDate] = Source.[flxUpdatedDate], 
  [OriginAddonId] = Source.[OriginAddonId], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NoticeId],[Title],[Message],[AfterClickEvent],[ReminderTime],[ExpiryTime],[MethodName],[CausesSync],[AllUsers],[AllUsersIsSent],[Error],[ErrorMsg],[CSSClass],[InsertDate],[TypeId],[Params],[Url],[TargetId],[ProcessName],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[SQLSentence],[SQLConStringId],[WebComponent],[TableName],[JavaFunction],[Defaults],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[NoticeId],Source.[Title],Source.[Message],Source.[AfterClickEvent],Source.[ReminderTime],Source.[ExpiryTime],Source.[MethodName],Source.[CausesSync],Source.[AllUsers],Source.[AllUsersIsSent],Source.[Error],Source.[ErrorMsg],Source.[CSSClass],Source.[InsertDate],Source.[TypeId],Source.[Params],Source.[Url],Source.[TargetId],Source.[ProcessName],Source.[PageTypeId],Source.[PageName],Source.[ReportName],Source.[HelpId],Source.[ReportWhere],Source.[ObjectName],Source.[ObjectWhere],Source.[SQLSentence],Source.[SQLConStringId],Source.[WebComponent],Source.[TableName],Source.[JavaFunction],Source.[Defaults],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





