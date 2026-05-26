CREATE   OR ALTER  VIEW [dbo].[VPERS_Empleados_Usuarios] AS  
SELECT  E.FullName, isnull(Email, E.Mail) AS Email, A.Id, E.EmployeeId, A.UserName  
FROM Employees E   
JOIN [SEBASTIAN_HR_PROGECO_IC].dbo.AspNetUsers A  
ON E.EmployeeId = A.Reference  
WHERE A.OriginId =2
AND LEN(Email) > 0
GO