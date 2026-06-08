Update [Objects] set [flxUpdatedDate]='2026-06-03T15:24:00' where [ObjectName]=N'sysObject'
Update [Objects_Search] set [Name]='Propiedades' where [SearchId]=N'3FCB5A50-DDCC-4E95-86BC-2CB55A7FC6FB'
Update [Objects_Search] set [SQLSentence]='( EXISTS (
 SELECT * FROM [dbo].[AspNetUsers] FlxTblFilter 
 LEFT JOIN (Select Id, Name from ASPNetRoles where Hidden=0 ) [FlxCmb1] ON [FlxCmb1].[Id]=[AspNetUsers].[RoleId] 
 LEFT JOIN (SELECT [ProfileName], [Descrip] from AspNetProfiles ) [FlxCmb2] ON [FlxCmb2].[ProfileName]=[AspNetUsers].[ProfileName] 

 WHERE ( [AspNetUsers].[UserName]  LIKE {~@Param1|16|258|FindString~} 
 or  [FlxCmb1].[Name]  LIKE {~@Param2|16|200|FindString~} 
 or  [FlxCmb2].[Descrip]  LIKE {~@Param3|16|200|FindString~} 
 or  [AspNetUsers].[Email]  LIKE {~@Param4|16|258|FindString~} 
 or  [AspNetUsers].[Name]  LIKE {~@Param5|16|102|FindString~} 
 or  [AspNetUsers].[SurName]  LIKE {~@Param6|16|102|FindString~} 
)
 AND  [AspNetUsers].[Id] = [FlxTblFilter].[Id] 

))
' where [SearchId]=N'53AFF8FC-5D04-4358-9B17-8302EF6E25D8'
Update [AspNetRoles] set [Hidden]=1 where [Id]=N'admins'
Update [AspNetUsers] set [Email]='sebastian@euskodata.com' where [Id]=N'1'
Update [AspNetUsers] set [NormalizedEmail]='SEBASTIAN@EUSKODATA.COM' where [Id]=N'1'
Update [AspNetUsers] set [PasswordHash]='AEdQTjgpHt65HUjftBJiPaoLhwkKjH1YhrlMq1Mpy/x5vsfckbkHg9c8xlAr7itgIw==' where [Id]=N'1'
Update [AspNetUsers] set [CultureId]='es-ES' where [Id]=N'1'
Update [AspNetUsers] set [flxUpdatedDate]='2026-05-27T12:46:00' where [Id]=N'1'
Update [Documents_Category] set [Category]='Genérico' where [CategoryId]=N'sysdoc-generic'
Update [Interfaces] set [SkinId]='flexy2022' where [InterfaceName]=N'mobiledefault'
Update [Interfaces] set [SkinId]='flexy2022' where [InterfaceName]=N'mobileguest'
Update [Interfaces] set [SkinId]='flexy2022' where [InterfaceName]=N'webdefault'
Update [Interfaces] set [SkinId]='flexy2022' where [InterfaceName]=N'webguest'
