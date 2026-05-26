UPDATE E
SET E.NSS = D.NumSS
FROM PERS_CONF_Employees_PersonalData D
JOIN Employees_PersonalData E
ON E.EmployeeId = E.EmployeeId