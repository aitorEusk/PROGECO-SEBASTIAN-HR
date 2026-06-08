

BEGIN TRY

DECLARE @DATA nvarchar(max)  = convert(nvarchar(max),'')+concat(convert(nvarchar(max),''),N'
[{
	"ObjectName":"emp_EmployeePersonalData",
	"PropertyName":"IdEmpleadoNetTime",
	"Label":"IdEmpleadoNetTime",
	"PositionY":10,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":true,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"emp_EmployeePersonalData",
	"PropertyName":"NumSS",
	"Label":"Nº Seguridad Social",
	"PositionY":2,
	"PositionX":9,
	"Width":3,
	"Height":1,
	"Hide":true,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"text",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"IconName":"document2",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2026-05-26T09:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"AllDay",
	"Label":"AllDay",
	"PositionY":2,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"switch",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"CardNumber",
	"Label":"CardNumber",
	"PositionY":3,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"text",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"ClockingType",
	"Label":"ClockingType",
	"PositionY":4,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"SQLValueField":"IdTipoMarcaje",
	"SQLDisplayField":"Name",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"ConnStringId":"DataConnectionString",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"DateTime",
	"Label":"DateTime",
	"PositionY":5,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"datetime",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"EmployeeId",
	"Label":"EmployeeId",
	"PositionY":1,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"IdClocking",
	"Label":"IdClocking",
	"PositionY":0,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"IdEmployer",
	"Label":"IdEmployer",
	"PositionY":6,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"IdReader",
	"Label":"IdReader",
	"PositionY":7,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"IdTerminal",
	"Label":"IdTerminal",
	"PositionY":8,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"IdTimeType",
	"Label":"IdTimeType",
	"PositionY":9,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"dbcombo",
	"Locked":false,
	"SQlSentence":"SELECT IdTipoMarcaje, Name\n',
N'FROM PERS_Marcaje_tipo",
	"SQLValueField":"IdTipoMarcaje",
	"SQLDisplayField":"Name",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"ConnStringId":"DataConnectionString",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"IdZone",
	"Label":"IdZone",
	"PositionY":10,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"Ip",
	"Label":"Ip",
	"PositionY":11,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"text",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"Source",
	"Label":"Source",
	"PositionY":12,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"State",
	"Label":"State",
	"PositionY":13,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"TimeTypeDescr",
	"Label":"TimeTypeDescr",
	"PositionY":15,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"text",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"Pers_Marcaje",
	"PropertyName":"Usuario",
	"Label":"Usuario",
	"PositionY":14,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"text",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":false,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysAll",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"unknown",
	"flxUpdatedBy":"unknown",
	"flxInsertedDate":"2025-02-13T17:04:00",
	"flxUpdatedDate":"2025-02-13T17:04:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"EmployeeId",
	"Label":"Empleado",
	"PositionY":0,
	"PositionX":8,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"custom",
	"Locked":false,
	"CustomPropName":"emp_ComboEmployees",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-05-27T10:43:00",
	"flxUpdatedDate":"2026-05-27T10:43:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"IdNotificacion",
	"Label":"IdNotificacion",
	"PositionY":7,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":true,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"custom",
	"Locked":true,
	"CustomPropName":"emp_ComboEmployees",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"man",
	"Separator":"|",
	"AutoIncrement":true,
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
	"flxInsertedDate":"2025-03-04T17:01:00",
	"flxUpdatedDate":"2025-03-04T17:02:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"Inserted",
	"Label":"Inserted",
	"PositionY":6,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"datetime",
	"Locked":true,
	"DefaultValue":"{{currentDateTime}}",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"calendar-day-1",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T10:17:00",
	"flxUpdatedDate":"2025-03-05T10:21:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"InsertedBy",
	"Label":"Inserted By",
	"PositionY":5,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"custom",
	"Locked":true,
	"CustomPropName":"emp_ComboEmployees",
	"DefaultValue":"{{currentReference}}",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"employees",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T10:17:00",
	"flxUpdatedDate":"2025-03-05T10:21:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"LastUpdate",
	"Label":"Last Update",
	"PositionY":6,
	"PositionX":4,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"datetime",
	"Locked":true,
	"DefaultValue":"{{currentDateTime}}",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"calendar-day-1",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T10:17:00",
	"flxUpdatedDate":"2025-03-05T10:23:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"separator1",
	"Label":"Updates:",
	"PositionY":4,
	"PositionX":0,
	"Width":12,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"separator",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":true,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"CSSClass":"txt-outstanding",
	"IsRequired":false,
	"IconName":"bullet-list-3",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T10:19:00",
	"flxUpdatedDate":"2025-03-05T10:19:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"Texto",
	"Label":"Texto",
	"PositionY":1,
	"PositionX":0,
	"Width":12,
	"Height":3,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"multiline",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"text",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T17:01:00",
	"flxUpdatedDate":"2025-03-04T17:02:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"Titulo",
	"Label":"Titulo",
	"PositionY":0,
	"PositionX":0,
	"Width":8,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"text",
	"Locked":false,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"text",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-04T17:01:00",
	"flxUpdatedDate":"2025-03-04T17:02:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"PERS_Notificacion",
	"PropertyName":"UpdateBy",
	"Label":"Update By",
	"PositionY":5,
	"PositionX":4,
	"Width":4,
	"Height":1,
	"Hide":false,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"custom",
	"Locked":true,
	"CustomPropName":"emp_ComboEmployees",
	"DefaultValue":"{{currentReference}}",
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"IconName":"employees",
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2025-03-05T10:17:00",
	"flxUpdatedDate":"2025-03-05T10:21:00",
	"OriginAddonId":"Main",
	"OriginId":2
},{
	"ObjectName":"sysUser",
	"PropertyName":"OriginId",
	"Label":"OriginId",
	"PositionY":16,
	"PositionX":0,
	"Width":4,
	"Height":1,
	"Hide":true,
	"ClientReadOnly":false,
	"FormDisplay":true,
	"TypeId":"number",
	"Locked":true,
	"PersistDefaultValue":false,
	"IgnoreDBDefaultValue":false,
	"DetachedFromDB":false,
	"TargetIdAllowNew":"modal",
	"ObjModeLink":"View",
	"TargetIdLink":"popup",
	"IsRequired":true,
	"Separator":"|",
	"AutoIncrement":false,
	"CascadeDependencies":false,
	"RootPathType":"RelativePath",
	"Offline":false,
	"ExtensionId":"sysWhiteList",
	"Autoselect":false,
	"ThrowDependenciesOnInvalid":true,
	"ComboAllowSave":false,
	"ShowValuesInApi":false,
	"flxInsertedBy":"admin",
	"flxUpdatedBy":"admin",
	"flxInsertedDate":"2026-06-05T10:13:00",
	"flxUpdatedDate":"2026-06-05T10:13:00",
	"OriginAddonId":"Main",
	"OriginId":2}]')


MERGE INTO [Objects_Properties] AS Target
USING ( 
SELECT * from OPENJSON(@DATA) WITH (
[ObjectName] nvarchar(50) '$.ObjectName'
,[PropertyName] nvarchar(50) '$.PropertyName'
,[Label] varchar(500) '$.Label'
,[PositionY] smallint '$.PositionY'
,[PositionX] smallint '$.PositionX'
,[Width] smallint '$.Width'
,[Height] smallint '$.Height'
,[Hide] bit '$.Hide'
,[ClientReadOnly] bit '$.ClientReadOnly'
,[FormDisplay] bit '$.FormDisplay'
,[TypeId] nvarchar(50) '$.TypeId'
,[Locked] bit '$.Locked'
,[CustomPropName] nvarchar(50) '$.CustomPropName'
,[Mask] nvarchar(250) '$.Mask'
,[SQlSentence] nvarchar(max) '$.SQlSentence'
,[SQLEditSentence] nvarchar(max) '$.SQLEditSentence'
,[SQLFilter] nvarchar(1000) '$.SQLFilter'
,[SQLValueField] nvarchar(100) '$.SQLValueField'
,[SQLDisplayField] nvarchar(500) '$.SQLDisplayField'
,[SQLObjectName] nvarchar(50) '$.SQLObjectName'
,[SQLViewName] nvarchar(255) '$.SQLViewName'
,[SQLOfflineSentence] nvarchar(max) '$.SQLOfflineSentence'
,[SQLOfflineOrderBy] nvarchar(max) '$.SQLOfflineOrderBy'
,[WhereSentence] nvarchar(1000) '$.WhereSentence'
,[DefaultValue] nvarchar(250) '$.DefaultValue'
,[PersistDefaultValue] bit '$.PersistDefaultValue'
,[IgnoreDBDefaultValue] bit '$.IgnoreDBDefaultValue'
,[DetachedFromDB] bit '$.DetachedFromDB'
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
,[DirectTemplate] nvarchar(max) '$.DirectTemplate'
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
,[AutoIncrement] bit '$.AutoIncrement'
,[AutoIncrementFunction] nvarchar(1000) '$.AutoIncrementFunction'
,[CascadeDependencies] bit '$.CascadeDependencies'
,[RootPathType] nvarchar(25) '$.RootPathType'
,[PageSize] int '$.PageSize'
,[ImageCompressionType] smallint '$.ImageCompressionType'
,[ImageMaxWidth] smallint '$.ImageMaxWidth'
,[ImageMaxHeight] smallint '$.ImageMaxHeight'
,[Offline] bit '$.Offline'
,[ExtensionId] nvarchar(100) '$.ExtensionId'
,[Autoselect] bit '$.Autoselect'
,[ThrowDependenciesOnInvalid] bit '$.ThrowDependenciesOnInvalid'
,[BarcodeReaders] nvarchar(max) '$.BarcodeReaders'
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
) AS Source ([ObjectName],[PropertyName],[Label],[PositionY],[PositionX],[Width],[Height],[Hide],[ClientReadOnly],[FormDisplay],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLEditSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[SQLObjectName],[SQLViewName],[SQLOfflineSentence],[SQLOfflineOrderBy],[WhereSentence],[DefaultValue],[PersistDefaultValue],[IgnoreDBDefaultValue],[DetachedFromDB],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[AllowNewDefaults],[TargetIdAllowNew],[ObjNameLink],[ObjWhereLink],[ObjModeLink],[PageNameLink],[TargetIdLink],[ChatGPTSettingId],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[SQLValidator],[ValidatorMessage],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[AutoIncrement],[AutoIncrementFunction],[CascadeDependencies],[RootPathType],[PageSize],[ImageCompressionType],[ImageMaxWidth],[ImageMaxHeight],[Offline],[ExtensionId],[Autoselect],[ThrowDependenciesOnInvalid],[BarcodeReaders],[ComboAllowSave],[ComboAllowSave_Object],[ComboAllowSave_DisplayField],[ComboAllowSave_ValueField],[ComboAllowSave_Defaults],[ComboAllowSave_WarningMessage],[ShowValuesInApi],[DescriptionInApi],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[PositionY], Target.[PositionY]) IS NOT NULL OR NULLIF(Target.[PositionY], Source.[PositionY]) IS NOT NULL OR 
	NULLIF(Source.[PositionX], Target.[PositionX]) IS NOT NULL OR NULLIF(Target.[PositionX], Source.[PositionX]) IS NOT NULL OR 
	NULLIF(Source.[Width], Target.[Width]) IS NOT NULL OR NULLIF(Target.[Width], Source.[Width]) IS NOT NULL OR 
	NULLIF(Source.[Height], Target.[Height]) IS NOT NULL OR NULLIF(Target.[Height], Source.[Height]) IS NOT NULL OR 
	NULLIF(Source.[Hide], Target.[Hide]) IS NOT NULL OR NULLIF(Target.[Hide], Source.[Hide]) IS NOT NULL OR 
	NULLIF(Source.[ClientReadOnly], Target.[ClientReadOnly]) IS NOT NULL OR NULLIF(Target.[ClientReadOnly], Source.[ClientReadOnly]) IS NOT NULL OR 
	NULLIF(Source.[FormDisplay], Target.[FormDisplay]) IS NOT NULL OR NULLIF(Target.[FormDisplay], Source.[FormDisplay]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Locked], Target.[Locked]) IS NOT NULL OR NULLIF(Target.[Locked], Source.[Locked]) IS NOT NULL OR 
	NULLIF(Source.[CustomPropName], Target.[CustomPropName]) IS NOT NULL OR NULLIF(Target.[CustomPropName], Source.[CustomPropName]) IS NOT NULL OR 
	NULLIF(Source.[Mask], Target.[Mask]) IS NOT NULL OR NULLIF(Target.[Mask], Source.[Mask]) IS NOT NULL OR 
	NULLIF(Source.[SQlSentence], Target.[SQlSentence]) IS NOT NULL OR NULLIF(Target.[SQlSentence], Source.[SQlSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLEditSentence], Target.[SQLEditSentence]) IS NOT NULL OR NULLIF(Target.[SQLEditSentence], Source.[SQLEditSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLFilter], Target.[SQLFilter]) IS NOT NULL OR NULLIF(Target.[SQLFilter], Source.[SQLFilter]) IS NOT NULL OR 
	NULLIF(Source.[SQLValueField], Target.[SQLValueField]) IS NOT NULL OR NULLIF(Target.[SQLValueField], Source.[SQLValueField]) IS NOT NULL OR 
	NULLIF(Source.[SQLDisplayField], Target.[SQLDisplayField]) IS NOT NULL OR NULLIF(Target.[SQLDisplayField], Source.[SQLDisplayField]) IS NOT NULL OR 
	NULLIF(Source.[SQLObjectName], Target.[SQLObjectName]) IS NOT NULL OR NULLIF(Target.[SQLObjectName], Source.[SQLObjectName]) IS NOT NULL OR 
	NULLIF(Source.[SQLViewName], Target.[SQLViewName]) IS NOT NULL OR NULLIF(Target.[SQLViewName], Source.[SQLViewName]) IS NOT NULL OR 
	NULLIF(Source.[SQLOfflineSentence], Target.[SQLOfflineSentence]) IS NOT NULL OR NULLIF(Target.[SQLOfflineSentence], Source.[SQLOfflineSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLOfflineOrderBy], Target.[SQLOfflineOrderBy]) IS NOT NULL OR NULLIF(Target.[SQLOfflineOrderBy], Source.[SQLOfflineOrderBy]) IS NOT NULL OR 
	NULLIF(Source.[WhereSentence], Target.[WhereSentence]) IS NOT NULL OR NULLIF(Target.[WhereSentence], Source.[WhereSentence]) IS NOT NULL OR 
	NULLIF(Source.[DefaultValue], Target.[DefaultValue]) IS NOT NULL OR NULLIF(Target.[DefaultValue], Source.[DefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[PersistDefaultValue], Target.[PersistDefaultValue]) IS NOT NULL OR NULLIF(Target.[PersistDefaultValue], Source.[PersistDefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[IgnoreDBDefaultValue], Target.[IgnoreDBDefaultValue]) IS NOT NULL OR NULLIF(Target.[IgnoreDBDefaultValue], Source.[IgnoreDBDefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[DetachedFromDB], Target.[DetachedFromDB]) IS NOT NULL OR NULLIF(Target.[DetachedFromDB], Source.[DetachedFromDB]) IS NOT NULL OR 
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
	NULLIF(Source.[AutoIncrement], Target.[AutoIncrement]) IS NOT NULL OR NULLIF(Target.[AutoIncrement], Source.[AutoIncrement]) IS NOT NULL OR 
	NULLIF(Source.[AutoIncrementFunction], Target.[AutoIncrementFunction]) IS NOT NULL OR NULLIF(Target.[AutoIncrementFunction], Source.[AutoIncrementFunction]) IS NOT NULL OR 
	NULLIF(Source.[CascadeDependencies], Target.[CascadeDependencies]) IS NOT NULL OR NULLIF(Target.[CascadeDependencies], Source.[CascadeDependencies]) IS NOT NULL OR 
	NULLIF(Source.[RootPathType], Target.[RootPathType]) IS NOT NULL OR NULLIF(Target.[RootPathType], Source.[RootPathType]) IS NOT NULL OR 
	NULLIF(Source.[PageSize], Target.[PageSize]) IS NOT NULL OR NULLIF(Target.[PageSize], Source.[PageSize]) IS NOT NULL OR 
	NULLIF(Source.[ImageCompressionType], Target.[ImageCompressionType]) IS NOT NULL OR NULLIF(Target.[ImageCompressionType], Source.[ImageCompressionType]) IS NOT NULL OR 
	NULLIF(Source.[ImageMaxWidth], Target.[ImageMaxWidth]) IS NOT NULL OR NULLIF(Target.[ImageMaxWidth], Source.[ImageMaxWidth]) IS NOT NULL OR 
	NULLIF(Source.[ImageMaxHeight], Target.[ImageMaxHeight]) IS NOT NULL OR NULLIF(Target.[ImageMaxHeight], Source.[ImageMaxHeight]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[ExtensionId], Target.[ExtensionId]) IS NOT NULL OR NULLIF(Target.[ExtensionId], Source.[ExtensionId]) IS NOT NULL OR 
	NULLIF(Source.[Autoselect], Target.[Autoselect]) IS NOT NULL OR NULLIF(Target.[Autoselect], Source.[Autoselect]) IS NOT NULL OR 
	NULLIF(Source.[ThrowDependenciesOnInvalid], Target.[ThrowDependenciesOnInvalid]) IS NOT NULL OR NULLIF(Target.[ThrowDependenciesOnInvalid], Source.[ThrowDependenciesOnInvalid]) IS NOT NULL OR 
	NULLIF(Source.[BarcodeReaders], Target.[BarcodeReaders]) IS NOT NULL OR NULLIF(Target.[BarcodeReaders], Source.[BarcodeReaders]) IS NOT NULL OR 
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
  [Label] = Source.[Label], 
  [PositionY] = Source.[PositionY], 
  [PositionX] = Source.[PositionX], 
  [Width] = Source.[Width], 
  [Height] = Source.[Height], 
  [Hide] = Source.[Hide], 
  [ClientReadOnly] = Source.[ClientReadOnly], 
  [FormDisplay] = Source.[FormDisplay], 
  [TypeId] = Source.[TypeId], 
  [Locked] = Source.[Locked], 
  [CustomPropName] = Source.[CustomPropName], 
  [Mask] = Source.[Mask], 
  [SQlSentence] = Source.[SQlSentence], 
  [SQLEditSentence] = Source.[SQLEditSentence], 
  [SQLFilter] = Source.[SQLFilter], 
  [SQLValueField] = Source.[SQLValueField], 
  [SQLDisplayField] = Source.[SQLDisplayField], 
  [SQLObjectName] = Source.[SQLObjectName], 
  [SQLViewName] = Source.[SQLViewName], 
  [SQLOfflineSentence] = Source.[SQLOfflineSentence], 
  [SQLOfflineOrderBy] = Source.[SQLOfflineOrderBy], 
  [WhereSentence] = Source.[WhereSentence], 
  [DefaultValue] = Source.[DefaultValue], 
  [PersistDefaultValue] = Source.[PersistDefaultValue], 
  [IgnoreDBDefaultValue] = Source.[IgnoreDBDefaultValue], 
  [DetachedFromDB] = Source.[DetachedFromDB], 
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
  [AutoIncrement] = Source.[AutoIncrement], 
  [AutoIncrementFunction] = Source.[AutoIncrementFunction], 
  [CascadeDependencies] = Source.[CascadeDependencies], 
  [RootPathType] = Source.[RootPathType], 
  [PageSize] = Source.[PageSize], 
  [ImageCompressionType] = Source.[ImageCompressionType], 
  [ImageMaxWidth] = Source.[ImageMaxWidth], 
  [ImageMaxHeight] = Source.[ImageMaxHeight], 
  [Offline] = Source.[Offline], 
  [ExtensionId] = Source.[ExtensionId], 
  [Autoselect] = Source.[Autoselect], 
  [ThrowDependenciesOnInvalid] = Source.[ThrowDependenciesOnInvalid], 
  [BarcodeReaders] = Source.[BarcodeReaders], 
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
 INSERT([ObjectName],[PropertyName],[Label],[PositionY],[PositionX],[Width],[Height],[Hide],[ClientReadOnly],[FormDisplay],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLEditSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[SQLObjectName],[SQLViewName],[SQLOfflineSentence],[SQLOfflineOrderBy],[WhereSentence],[DefaultValue],[PersistDefaultValue],[IgnoreDBDefaultValue],[DetachedFromDB],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[AllowNewDefaults],[TargetIdAllowNew],[ObjNameLink],[ObjWhereLink],[ObjModeLink],[PageNameLink],[TargetIdLink],[ChatGPTSettingId],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[SQLValidator],[ValidatorMessage],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[AutoIncrement],[AutoIncrementFunction],[CascadeDependencies],[RootPathType],[PageSize],[ImageCompressionType],[ImageMaxWidth],[ImageMaxHeight],[Offline],[ExtensionId],[Autoselect],[ThrowDependenciesOnInvalid],[BarcodeReaders],[ComboAllowSave],[ComboAllowSave_Object],[ComboAllowSave_DisplayField],[ComboAllowSave_ValueField],[ComboAllowSave_Defaults],[ComboAllowSave_WarningMessage],[ShowValuesInApi],[DescriptionInApi],[flxInsertedBy],[flxUpdatedBy],[flxInsertedDate],[flxUpdatedDate],[OriginAddonId],[OriginId])
 VALUES(Source.[ObjectName],Source.[PropertyName],Source.[Label],Source.[PositionY],Source.[PositionX],Source.[Width],Source.[Height],Source.[Hide],Source.[ClientReadOnly],Source.[FormDisplay],Source.[TypeId],Source.[Locked],Source.[CustomPropName],Source.[Mask],Source.[SQlSentence],Source.[SQLEditSentence],Source.[SQLFilter],Source.[SQLValueField],Source.[SQLDisplayField],Source.[SQLObjectName],Source.[SQLViewName],Source.[SQLOfflineSentence],Source.[SQLOfflineOrderBy],Source.[WhereSentence],Source.[DefaultValue],Source.[PersistDefaultValue],Source.[IgnoreDBDefaultValue],Source.[DetachedFromDB],Source.[SearchFunction],Source.[SearchCollection],Source.[SearchWhere],Source.[SearchReturnFields],Source.[SecurityObject],Source.[AllowNew],Source.[AllowNewFunction],Source.[AllowNewReturnFields],Source.[AllowNewDefaults],Source.[TargetIdAllowNew],Source.[ObjNameLink],Source.[ObjWhereLink],Source.[ObjModeLink],Source.[PageNameLink],Source.[TargetIdLink],Source.[ChatGPTSettingId],Source.[Style],Source.[CSSClass],Source.[LabelStyle],Source.[LabelCSSClass],Source.[DecimalPlaces],Source.[RootPath],Source.[FormatString],Source.[DirectTemplate],Source.[Tag],Source.[HelpId],Source.[ConnStringId],Source.[IsRequired],Source.[IsRequiredMessage],Source.[minValue],Source.[minValueMessage],Source.[maxValue],Source.[maxValueMessage],Source.[RegExp],Source.[RegExpText],Source.[SQLValidator],Source.[ValidatorMessage],Source.[OnChangeJsFunction],Source.[OnChangeProcessName],Source.[PlaceHolder],Source.[IconName],Source.[ToolbarName],Source.[Separator],Source.[AutoIncrement],Source.[AutoIncrementFunction],Source.[CascadeDependencies],Source.[RootPathType],Source.[PageSize],Source.[ImageCompressionType],Source.[ImageMaxWidth],Source.[ImageMaxHeight],Source.[Offline],Source.[ExtensionId],Source.[Autoselect],Source.[ThrowDependenciesOnInvalid],Source.[BarcodeReaders],Source.[ComboAllowSave],Source.[ComboAllowSave_Object],Source.[ComboAllowSave_DisplayField],Source.[ComboAllowSave_ValueField],Source.[ComboAllowSave_Defaults],Source.[ComboAllowSave_WarningMessage],Source.[ShowValuesInApi],Source.[DescriptionInApi],Source.[flxInsertedBy],Source.[flxUpdatedBy],Source.[flxInsertedDate],Source.[flxUpdatedDate],Source.[OriginAddonId],Source.[OriginId])
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





