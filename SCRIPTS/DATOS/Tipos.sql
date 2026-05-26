CREATE TYPE [dbo].[PERS_MARCAJE_TYPE] AS TABLE(
	[IdClocking] [int] NOT NULL,
	[EmployeeId] [int] NULL,
	[AllDay] [bit] NULL,
	[CardNumber] [varchar](100) NULL,
	[ClockingType] [int] NULL,
	[DateTime] [datetime] NULL,
	[IdEmployer] [int] NULL,
	[IdReader] [int] NULL,
	[IdTerminal] [int] NULL,
	[IdTimetype] [int] NULL,
	[IdZone] [int] NULL,
	[Ip] [varchar](50) NULL,
	[Source] [int] NULL,
	[State] [int] NULL,
	[Usuario] [varchar](200) NULL,
	[TimeTypeDescr] [varchar](100) NULL,
	PRIMARY KEY CLUSTERED 
(
	[IdClocking] ASC
)WITH (IGNORE_DUP_KEY = ON)
)
GO
CREATE TYPE [dbo].[pers_marcaje_tipo_TYPE] AS TABLE(
	[IdTipoMarcaje] [int] NOT NULL,
	[Name] [nvarchar](50) NULL,
	PRIMARY KEY CLUSTERED 
(
	[IdTipoMarcaje] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO

