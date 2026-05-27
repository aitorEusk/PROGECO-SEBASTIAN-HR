using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FLEXYGO.Objects;
using FLEXYGO.Processing;
using FLEXYGO.Data;
using SEBASTIAN_PROGECO_VS.web_service_spec;
using SEBASTIAN_PROGECO_VS.Clases;
using System.Xml.Linq;
using System.Reflection;
using FLEXYGO.Utilities.General;
using System.Runtime.Serialization.Configuration;
using Microsoft.VisualBasic;
using Microsoft.VisualBasic.CompilerServices;
using FLEXYGO.Localization;
using FLEXYGO.Objects.Settings;
using System.Configuration;
using System.Runtime.CompilerServices;

namespace SEBASTIAN_PROGECO_VS
{
    public static class Procesos
    {
        public static bool SincronizarMarcajesTipos(EntityObject entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                DataManager dmData = new DataManager("DataConnectionString");

                //DataTable de los tipos de marcajes
                DataTable dtMarcajesTipos = new DataTable();
                dtMarcajesTipos.Columns.Add("IdTipoMarcaje", typeof(int));
                dtMarcajesTipos.Columns.Add("Name", typeof(string));


                WebServiceContractClient w = new WebServiceContractClient();
                WSElement tipo_marcaje = w.ListFields(WSContainer.TimeType, new string[] { "id", "name" }, null);


                //Añadir los valores al datatable
                foreach (KeyValuePair<string, object> o in tipo_marcaje.Data)
                {
                    dtMarcajesTipos.Rows.Add(((WSElement)o.Value).Data["id"].ToString(), ((WSElement)o.Value).Data["name"].ToString());
                }


                //Parametros
                BaseCollection parametros = new BaseCollection();
                parametros.Add("p_Tipos", dtMarcajesTipos);


                if (dmData.ExecuteStored("PPERS_PERS_MARCAJE_TIPO_SINCRONIZAR", parametros))
                {
                    Ret.Success = true;
                }
                else
                {
                    throw new Exception(dmData.LastException.Message);
                }
            }
            catch (Exception ex)
            {
                Ret.Success = false;
                Ret.LastException = ex;
            }

            return Ret.Success;
        }

        public static bool SincronizarEmpleadosNetTime(EntityObject entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                string[] Campos = { "id" };

                //Obtenemos los empleados de Sebastian
                EntityCollection empleados = new EntityCollection("emp_EmployeesPersonalData", Ret.ConfToken);

                //Recorremos los empleados para obtener su DNI
                foreach (EntityObject empleado in empleados)
                {
                    //Obtenemos el código del que dispone en NetTime
                    WebServiceContractClient w = new WebServiceContractClient();
                    WSElement lista = w.ListFields(WSContainer.Employee, Campos, string.Format("this.nif='{0}'", empleado["IDNumber"].ToString()));

                    //Recorremos los valores para obtener el código del empleado de NetTime
                    foreach (KeyValuePair<string, object> campo in lista.Data)
                    {
                        empleado["IdEmpleadoNetTime"] = Int32.Parse(((WSElement)campo.Value).Data["id"].ToString());

                        if (empleado.CanUpdate)
                        {
                            if (!empleado.Update())
                            {
                                throw new Exception(empleado.LastException.Message);
                            }
                        }
                    }
                }
                Ret.Success = true;
            }
            catch (Exception ex)
            {
                Ret.LastException = ex;
                Ret.Success = false;
            }
            return Ret.Success;
        }

        public static bool SincronizarMarcajes(EntityObject entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                DataManager dmData = new DataManager("DataConnectionString");

                //DateTime fechaInicio = DateTime.Parse("1999-02-02");
                //DateTime fechaFinal = DateTime.Now;
                List<EmpleadoSpec> lista_empleados = new List<EmpleadoSpec>();
                ListtoDataTableConverter converter = new ListtoDataTableConverter();

                //Datatable de los marcajaes
                DataTable dtMarcajes = new DataTable();
                dtMarcajes.Columns.Add("id_clocking", typeof(int));
                dtMarcajes.Columns.Add("employee_id", typeof(int));
                dtMarcajes.Columns.Add("all_day", typeof(bool));
                dtMarcajes.Columns.Add("card_number", typeof(string));
                dtMarcajes.Columns.Add("clocking_type", typeof(int));
                dtMarcajes.Columns.Add("date_time", typeof(DateTime));
                dtMarcajes.Columns.Add("id_employer", typeof(int));
                dtMarcajes.Columns.Add("id_reader", typeof(int));
                dtMarcajes.Columns.Add("id_terminal", typeof(int));
                dtMarcajes.Columns.Add("id_time_type", typeof(int));
                dtMarcajes.Columns.Add("id_zone", typeof(int));
                dtMarcajes.Columns.Add("ip", typeof(string));
                dtMarcajes.Columns.Add("source", typeof(int));
                dtMarcajes.Columns.Add("state", typeof(int));
                dtMarcajes.Columns.Add("usuario", typeof(string));
                dtMarcajes.Columns.Add("time_type_descr", typeof(string));


                //Obtenemos los empleados
                lista_empleados = CargarEmpleados();

                lista_empleados = GetMarcajesEmpleados(Ret, lista_empleados, 0);

                //Rellenamos el DataTable
                for (int i = 0; i < lista_empleados.Count; i++)
                {
                    for (int k = 0; k < lista_empleados[i].Get_lista_marcajes().Count; k++)
                    {
                        dtMarcajes.Rows.Add(
                                lista_empleados[i].Get_lista_marcajes()[k].Get_id_clocking(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_employee_id(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_all_Day(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_card_numer(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_clocking_type(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_date_time(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_id_employer(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_id_reader(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_id_terminal(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_id_time_type(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_id_zone(),
                                ComprobarVacio(lista_empleados[i].Get_lista_marcajes()[k].Get_ip()),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_source(),
                                lista_empleados[i].Get_lista_marcajes()[k].Get_state(),
                                ComprobarVacio(lista_empleados[i].Get_lista_marcajes()[k].Get_user())
                            );
                    }
                }

                //Parametros
                BaseCollection parametros = new BaseCollection();
                parametros.Add("p_Marcajes", dtMarcajes);

                if (dmData.ExecuteStored("PPERS_PERS_MARCAJE_SINCRONIZAR", parametros))
                {
                    Ret.Success = true;
                }
                else
                {
                    throw new Exception(dmData.LastException.Message);
                }

                Ret.Success = true;
            }
            catch (Exception ex)
            {
                Ret.LastException = ex;
                Ret.Success = false;
            }

            return Ret.Success;
        }

        private static List<EmpleadoSpec> CargarEmpleados()
        {
            List<EmpleadoSpec> lista_empleados = new List<EmpleadoSpec>();

            WebServiceContractClient w = new WebServiceContractClient();
            WSElement lista = w.List(WSContainer.Employee);

            int cont = 0;

            foreach (KeyValuePair<string, object> x in lista.Data)
            {
                lista_empleados.Add(new EmpleadoSpec());
                lista_empleados[cont].Set_id(Int32.Parse(((WSElement)x.Value).Data["id"].ToString()));
                lista_empleados[cont].Set_name(((WSElement)x.Value).Data["name"].ToString());


                cont++;
            }
            return lista_empleados;
        }

        private static List<EmpleadoSpec> GetMarcajesEmpleados(ProcessManager.ProcessHelper Ret, List<EmpleadoSpec> lista_empleados, int type)
        {
            int IdEmpleado;
            DateTime FechaAux;
            DateTime FechaFinal;
            DateTime FechaInicio;

            WebServiceContractClient w = new WebServiceContractClient();
            Clocking[] lista_clocking;
            List<Marcaje> lista_marcajes;
            ClockingType tipo_clocking;
            switch (type)
            {
                case 0:
                    tipo_clocking = ClockingType.Attendance;
                    break;
                case 1:
                    tipo_clocking = ClockingType.Access;
                    break;
                case 2:
                    tipo_clocking = ClockingType.Visit;
                    break;
                default:
                    tipo_clocking = ClockingType.SDK;
                    break;
            }

            //Obtenemos la fecha inicio de la sincronización
            EntityObject Entfecha = new EntityObject("sysSetting", "Settings.SettingName ='EUSK_FechaInicio'", Ret.ConfToken);
            FechaAux = DateTime.Parse(Entfecha["SettingValue"].ToString());


            //Igualamos la fecha Inicio a la fecha inicial
            FechaInicio = FechaAux;
            FechaFinal = DateTime.Now;

            //Recorremos los días hasta llegar a la fecha actual
            while (FechaInicio <= FechaFinal)
            {
                //Recorremos los empleados
                for (int x = 0; x < lista_empleados.Count; x++)
                {
                    IdEmpleado = lista_empleados[x].Get_id();

                    //Obtenemos los clockings del empleado
                    lista_clocking = w.Clockings(IdEmpleado, FechaInicio, FechaInicio.AddDays(1), tipo_clocking);

                    //Instanciamos una lista para guardar los marcajes
                    lista_marcajes = new List<Marcaje>();

                    //Recorremos los clockings
                    for (int i = 0; i < lista_clocking.Length; i++)
                    {
                        //Añadimos el marcaje a la lista
                        lista_marcajes.Add(new Marcaje(lista_clocking[i].IdClocking, IdEmpleado, lista_clocking[i].AllDay, lista_clocking[i].CardNumber, lista_clocking[i].ClockingType, lista_clocking[i].Datetime, lista_clocking[i].IdEmployer, lista_clocking[i].IdReader, lista_clocking[i].IdTerminal, lista_clocking[i].IdTimeType, lista_clocking[i].IdZone, lista_clocking[i].IP, lista_clocking[i].Source, lista_clocking[i].State, lista_clocking[i].User, ""));
                    }

                    //Asignamos los marcajes al empleado
                    lista_empleados[x].Set_lista_marcajes(lista_marcajes);
                }//Fin Bucle Empleados
                //Sumamos un día a FechaInicio
                FechaInicio = FechaInicio.AddDays(1);

            }
            return lista_empleados;
        }

        private static string ComprobarVacio(object origen)
        {
            string res = "";
            if (origen != null)
                res = origen.ToString();
            return res;

        }

        public static bool EnviarCorreoDocumento(EntityObject Entity, ProcessManager.ProcessHelper Ret, DataTable dtUsuarios, string pageId, string subject, string mensaje)
        {
            Ret.Success = true;
            Translator translator = new Translator();


            DataManager dataManager1 = new DataManager("ConfConnectionString");
            DataManager dataManager2 = new DataManager("DataConnectionString");

            string ObjectWhere = ObtenerWhere(Entity);


            /*Obtenemos la url del documento*/
            string str3 = URL.GeObjecttUrlByName(pageId, Entity.Name, string.Concat(Entity.TableName, ".", ObjectWhere));
            string aValue = Ret.ConfToken.AppFullPath + str3.Substring(1);

            string str4;
            string str2 = string.Empty;
            string str1 = "Acceder";
            string str5 = string.Empty;


            if (Util.IsBlank(aValue))
            {
                str4 = "<h3 style='margin-bottom: 20px'>" + str1 + "</h3>";
            }
            else
            {
                str4 = "<h3 style='margin-bottom: 20px; cursor: pointer;'><a href='" + aValue + "'>" + str1 + "</a></h3>";
            }


            if (Entity.Name == "emp_Documents_Article")
            {
                str2 = Entity["Descrip"].ToString();
                str5 = str4 + "<p><h3><b>" + str2 + "</b> </h3> </p><p>" + Entity["FullText"].ToString() + "</p>";
            }
            else if (Entity.Name == "emp_Employee")
            {
                //str2 = Entity["Descrip"].ToString();
                //str5 = str4 + "<p><h3><b>" + str2 + "</b> </h3> </p><p>" + Entity["FullText"].ToString() + "</p>";
            }
            else
            {
                //Obtenemos el nombre del archivo
                EntityObject documentObject = new EntityObject("Document", string.Format("DocGuid = '{0}'", Entity["DocGuid"]), Ret.ConfToken);
                str2 = documentObject["Name"].ToString();
                str5 = str4 + "<p><b>Nombre del documento:</b> " + str2 + "</p>";
            }



            /*Recorremos los usuarios*/
            foreach (DataRow row in dtUsuarios.Rows)
            {
                if (!Util.IsBlank(RuntimeHelpers.GetObjectValue(row["UserName"])) && !Util.IsBlank(RuntimeHelpers.GetObjectValue(row["EMail"])))
                {
                    EntityObject entityObject1 = new EntityObject("sysOutboxMail", Ret.ConfToken);
                    entityObject1["FromName"] = "Info Sebastian";
                    entityObject1["FromEmail"] = NewLateBinding.LateGet(ConfigurationManager.GetSection("system.net/mailSettings/smtp"), (Type)null, "From", new object[0], (string[])null, (Type[])null, (bool[])null).ToString();
                    entityObject1["To"] = RuntimeHelpers.GetObjectValue(row["Email"]);
                    entityObject1["Subject"] = subject;
                    entityObject1["Body"] = "<h1 style='color:#1d92e5'>Sebastian</span> <span style='color: black;font-size: smaller;'>by </span> <span style='color:#2DB7B0'>flexy</span><span style='color:black'>Go</span></h1>\r\n                                        <br><p>" + mensaje + "<span><a href='\">" + aValue + " </a></span></p> \r\n                                         <div style='padding: 15px;border: 1px solid #ffffff00;width: fit-content;margin: 30px;border-radius: 5px;box-shadow: 2px 2px 5px #999;text-align: justify;'>" + str5 + "</div>";
                    entityObject1["UserId"] = RuntimeHelpers.GetObjectValue(row["Id"]);
                    entityObject1["SendDate"] = DateTime.Now;
                    entityObject1["Status"] = 1;
                    if (entityObject1.InsertProcess(entityObject1.TableName, ObjectSettings.eUpdateType.Standard, null))
                    {
                        EntityObject entityObject2 = new EntityObject("sysNotice", Ret.ConfToken);
                        entityObject2["Title"] = subject;
                        entityObject2["Message"] = mensaje;
                        entityObject2["ReminderTime"] = DateTime.Now;
                        entityObject2["ExpiryTime"] = DateTime.Now.AddDays(7.0);
                        entityObject2["AllUsers"] = "false";
                        entityObject2["AllUsersIsSent"] = "false";
                        entityObject2["MethodName"] = "app";
                        entityObject2["TypeId"] = "object";
                        entityObject2["ObjectName"] = Entity.Name;
                        entityObject2["ObjectWhere"] = ObjectWhere;
                        entityObject2["PageTypeId"] = "view";
                        entityObject2["TargetId"] = "current";
                        entityObject2["InsertDate"] = DateTime.Now;

                        if (entityObject2.InsertProcess(entityObject2.TableName, ObjectSettings.eUpdateType.Standard, null))
                        {
                            EntityObject entityObject3 = new EntityObject("sysNoticeUser", Ret.ConfToken);
                            entityObject3["NoticeId"] = RuntimeHelpers.GetObjectValue(entityObject2["NoticeId"]);
                            entityObject3["UserId"] = RuntimeHelpers.GetObjectValue(row["Id"]);
                            if (!entityObject3.InsertProcess(entityObject3.TableName, ObjectSettings.eUpdateType.Standard, null))
                            {
                                Ret.LastException = entityObject3.LastException;
                                Ret.Success = false;
                            }
                        }
                        else
                        {
                            Ret.LastException = entityObject2.LastException;
                            Ret.Success = false;
                        }
                    }
                    else
                    {
                        Ret.LastException = entityObject1.LastException;
                        Ret.Success = false;
                    }
                }
            }

            return Ret.Success;
        }

        private static string ObtenerWhere(EntityObject entity)
        {
            string ObjectWhere = string.Empty;
            for (int i = 0; i < entity.KeyCollection.Count; i++)
            {
                KeyValuePair<string, dynamic> clave = entity.KeyCollection.ElementAt(i);

                ObjectWhere = string.Concat(ObjectWhere, string.Format("{0} = '{1}'", clave.Key, clave.Value));

                if (i < entity.KeyCollection.Count && i > 0)
                {
                    ObjectWhere = string.Concat(ObjectWhere, " AND ");
                }
            }

            return ObjectWhere;
        }

        public static bool EnviarCorreoNotificacion(EntityObject Entity, ProcessManager.ProcessHelper Ret, int employeeId, string subject)
        {
            Ret.Success = true;
            Translator translator = new Translator();


            DataManager dataManager1 = new DataManager("ConfConnectionString");
            DataManager dataManager2 = new DataManager("DataConnectionString");

            string ObjectWhere = ObtenerWhere(Entity);


            /*Obtenemos la url de la notificacion*/
            string pageId = "Notificacion_View";
            string mensaje = "Tienes una notificación nueva:";
            string str3 = URL.GeObjecttUrlByName(pageId, Entity.Name, string.Concat(Entity.TableName, ".", ObjectWhere));
            string aValue = Ret.ConfToken.AppFullPath + str3.Substring(1);

            string str4;
            string str2 = string.Empty;
            string str1 = "Acceder";
            string str5 = string.Empty;

            EntityObject userObject = new EntityObject("sysUser", string.Format("Reference = {0}", employeeId), Ret.ConfToken);


            if (Util.IsBlank(aValue))
            {
                str4 = "<h3 style='margin-bottom: 20px'>" + str1 + "</h3>";
            }
            else
            {
                str4 = "<h3 style='margin-bottom: 20px; cursor: pointer;'><a href='" + aValue + "'>" + str1 + "</a></h3>";
            }


            str2 = Entity["Titulo"].ToString();
            str5 =  "<p><h3><b>" + str2 + "</b> </h3>" + str4;



            if (!Util.IsBlank(RuntimeHelpers.GetObjectValue(userObject["UserName"])) && !Util.IsBlank(RuntimeHelpers.GetObjectValue(userObject["EMail"])))
            {
                EntityObject entityObject1 = new EntityObject("sysOutboxMail", Ret.ConfToken);
                entityObject1["FromName"] = "Info Sebastian";
                entityObject1["FromEmail"] = NewLateBinding.LateGet(ConfigurationManager.GetSection("system.net/mailSettings/smtp"), (Type)null, "From", new object[0], (string[])null, (Type[])null, (bool[])null).ToString();
                entityObject1["To"] = RuntimeHelpers.GetObjectValue(userObject["Email"]);
                entityObject1["Subject"] = subject;
                entityObject1["Body"] = "<h1 style='color:#1d92e5'>Sebastian</span> <span style='color: black;font-size: smaller;'>by </span> <span style='color:#2DB7B0'>flexy</span><span style='color:black'>Go</span></h1>\r\n                                        <br><p>" + mensaje + "<span><a href='\">" + aValue + " </a></span></p> \r\n                                         <div style='padding: 15px;border: 1px solid #ffffff00;width: fit-content;margin: 30px;border-radius: 5px;box-shadow: 2px 2px 5px #999;text-align: justify;'>" + str5 + "</div>";
                entityObject1["UserId"] = RuntimeHelpers.GetObjectValue(userObject["Id"]);
                entityObject1["SendDate"] = DateTime.Now;
                entityObject1["Status"] = 1;
                if (entityObject1.InsertProcess(entityObject1.TableName, ObjectSettings.eUpdateType.Standard, null))
                {
                    EntityObject entityObject2 = new EntityObject("sysNotice", Ret.ConfToken);
                    entityObject2["Title"] = subject;
                    entityObject2["Message"] = mensaje;
                    entityObject2["ReminderTime"] = DateTime.Now;
                    entityObject2["ExpiryTime"] = DateTime.Now.AddDays(7.0);
                    entityObject2["AllUsers"] = "false";
                    entityObject2["AllUsersIsSent"] = "false";
                    entityObject2["MethodName"] = "app";
                    entityObject2["TypeId"] = "object";
                    entityObject2["ObjectName"] = Entity.Name;
                    entityObject2["ObjectWhere"] = ObjectWhere;
                    entityObject2["PageTypeId"] = "view";
                    entityObject2["TargetId"] = "current";
                    entityObject2["InsertDate"] = DateTime.Now;

                    if (entityObject2.InsertProcess(entityObject2.TableName, ObjectSettings.eUpdateType.Standard, null))
                    {
                        EntityObject entityObject3 = new EntityObject("sysNoticeUser", Ret.ConfToken);
                        entityObject3["NoticeId"] = RuntimeHelpers.GetObjectValue(entityObject2["NoticeId"]);
                        entityObject3["UserId"] = RuntimeHelpers.GetObjectValue(userObject["Id"]);
                        if (!entityObject3.InsertProcess(entityObject3.TableName, ObjectSettings.eUpdateType.Standard, null))
                        {
                            Ret.LastException = entityObject3.LastException;
                            Ret.Success = false;
                        }
                    }
                    else
                    {
                        Ret.LastException = entityObject2.LastException;
                        Ret.Success = false;
                    }
                }
                else
                {
                    Ret.LastException = entityObject1.LastException;
                    Ret.Success = false;
                }
            }


            return Ret.Success;
        }

    }
}
