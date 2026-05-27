-- Notificaciones
CREATE TABLE [dbo].[PERS_Notificaciones](
	[IdNotificacion] [int] NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[Texto] [varchar](max) NOT NULL,
	[Titulo] [varchar](1000) NOT NULL,
	[InsertedBy] [int] NOT NULL,
	[UpdateBy] [int] NOT NULL,
	[Inserted] [datetime] NOT NULL,
	[LastUpdate] [datetime] NOT NULL,
 CONSTRAINT [PK_PERS_Notificaciones] PRIMARY KEY CLUSTERED 
(
	[IdNotificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Notificaciones reads
CREATE TABLE [dbo].[PERS_Notificaciones_Reads](
	[IdNotificacion] [int] NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[FirstReadDate] [smalldatetime] NULL,
	[LastReadDate] [smalldatetime] NULL,
	[ReadTimes] [int] NULL,
 CONSTRAINT [PK_PERS_Notificaciones_Reads] PRIMARY KEY CLUSTERED 
(
	[IdNotificacion] ASC,
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


-- Marcajes
CREATE TABLE [dbo].[Pers_Marcaje](
	[IdClocking] [int] NOT NULL,
	[EmployeeId] [int] NULL,
	[AllDay] [bit] NULL,
	[CardNumber] [varchar](50) NULL,
	[ClockingType] [int] NULL,
	[DateTime] [datetime] NULL,
	[IdEmployer] [int] NULL,
	[IdReader] [int] NULL,
	[IdTerminal] [int] NULL,
	[IdTimeType] [int] NULL,
	[IdZone] [int] NULL,
	[Ip] [varchar](50) NULL,
	[Source] [int] NULL,
	[State] [int] NULL,
	[Usuario] [varchar](50) NULL,
	[TimeTypeDescr] [varchar](50) NULL,
	[FechaHora] [datetime] NULL,
 CONSTRAINT [PK_Pers_Marcaje] PRIMARY KEY CLUSTERED 
(
	[IdClocking] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Pers_Marcaje] ADD  CONSTRAINT [DF_Pers_Marcaje_FechaHora]  DEFAULT (getdate()) FOR [FechaHora]
GO



-- Marcajes tipo
CREATE TABLE [dbo].[PERS_Marcaje_tipo](
	[IdTipoMarcaje] [int] NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_pers_marcaje_tipo] PRIMARY KEY CLUSTERED 
(
	[IdTipoMarcaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


-- PERS CONF Employee personal data
CREATE TABLE [dbo].[PERS_CONF_Employees_PersonalData](
	[EmployeeId] [int] NOT NULL,
	[NumSS] [varchar](20) NULL,
	[IdEmpleadoNetTime] [int] NULL,
 CONSTRAINT [PK_PERS_CONF_Employees_PersonalData] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO





