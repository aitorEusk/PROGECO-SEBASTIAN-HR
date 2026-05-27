using FLEXYGO.Data;
using FLEXYGO.Exceptions;
using FLEXYGO.Localization;
using FLEXYGO.Objects;
using FLEXYGO.Objects.Settings;
using FLEXYGO.Processing;
using FLEXYGO.Utilities.General;
using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SEBASTIAN_PROGECO_VS
{
    public static class Noticias
    {
        public static bool NuevaNoticia(EntityObject Entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                Ret.Success = true;
                Translator translator = new Translator();
                if (!Entity.CanInsert)
                {
                    Ret.LastException = new LocalizedException("You do not have enough credentials to insert this object", LocalizedException.SeverityTypes.Error, null);
                    Ret.Success = false;
                }
                else if (Entity.InsertProcess(Entity.TableName, ObjectSettings.eUpdateType.Standard, ""))
                {
                    if (Operators.ConditionalCompareObjectEqual(Entity["TypeId"], 1, false))
                    {
                        EntityObject entityObject = new EntityObject("sysNotice", Ret.ConfToken);
                        entityObject["Title"] = translator.Translate("You have a new article you must read ", eTranslation_Areas.Messages);
                        entityObject["Message"] = RuntimeHelpers.GetObjectValue(Entity["Title"]);
                        entityObject["ReminderTime"] = RuntimeHelpers.GetObjectValue(Entity["PubDate"]);
                        entityObject["ExpiryTime"] = RuntimeHelpers.GetObjectValue(Entity["EndDate"]);
                        entityObject["AllUsers"] = "true";
                        entityObject["AllUsersIsSent"] = "true";
                        entityObject["MethodName"] = "app";
                        entityObject["TypeId"] = "object";
                        entityObject["PageTypeId"] = "View";
                        entityObject["ObjectName"] = "emp_News_Article";
                        entityObject["ObjectWhere"] = "News_Articles.NewsId=" + Entity["NewsId"].ToString();
                        entityObject["TargetId"] = "current";
                        entityObject["InsertDate"] = RuntimeHelpers.GetObjectValue(Entity["Inserted"]);
                        if (!entityObject.Insert())
                        {
                            throw new Exception(entityObject.LastException.Message);

                        }
                        
                

                    /*  Enviamos el correo a los empleados para informar de que tienen una nueva noticia  */
                    string str1 = Conversions.ToString(Entity["Title"]);
                    string str2 = Conversions.ToString(Entity["Descrip"]);

                    DataManager dataManager1 = new DataManager("ConfConnectionString");
                    DataManager dataManager2 = new DataManager("DataConnectionString");

                    //Obtenemos todos los empleados menos el 0
                    DataTable dataTable = dataManager2.DataTable("SELECT FullName, EMail, Id, EmployeeId, UserName FROM VPERS_Empleados_Usuarios");

                    string str3 = URL.GeObjecttUrlByName("D1BFA1B4-FBFF-4AEF-B821-C6C5BDB208C5", "emp_News_Article", Conversions.ToString(Operators.ConcatenateObject((object)"NewsId=", Entity["NewsId"])));
                    string aValue = Ret.ConfToken.AppFullPath + str3.Substring(1);

                    string str4;

                    if (Util.IsBlank(aValue))
                        str4 = "<h3 style='margin-bottom: 20px'>" + str1 + "</h3>";
                    else
                        str4 = "<h3 style='margin-bottom: 20px; cursor: pointer;'><a href='" + aValue + "'>" + str1 + "</a></h3>";
                    string str5 = str4 + "<p>" + str2 + "</p>";

                    //Recorremos el bucle
                    foreach (DataRow row in dataTable.Rows)
                    {
                        if (!Util.IsBlank(RuntimeHelpers.GetObjectValue(row["UserName"])) && !Util.IsBlank(RuntimeHelpers.GetObjectValue(row["Email"])))
                        {
                            EntityObject entityObject1 = new EntityObject("sysOutboxMail", Ret.ConfToken);
                            entityObject1["FromName"] = "Info Sebastian";
                            entityObject1["FromEmail"] = NewLateBinding.LateGet(ConfigurationManager.GetSection("system.net/mailSettings/smtp"), (Type)null, "From", new object[0], (string[])null, (Type[])null, (bool[])null).ToString();
                            entityObject1["To"] = RuntimeHelpers.GetObjectValue(row["Email"]);
                            entityObject1["Subject"] = translator.Translate("Nueva noticia publicada", eTranslation_Areas.Messages);
                            entityObject1["Body"] = "<h1 style='color:#1d92e5'>Sebastian</span> <span style='color: black;font-size: smaller;'>by </span> <span style='color:#2DB7B0'>flexy</span><span style='color:black'>Go</span></h1>\r\n                                        <br><p>" + translator.Translate("Se ha publicado una nueva noticia en el portal de Sebastian.", eTranslation_Areas.Messages) + "</p> \r\n                                         <div style='padding: 15px;border: 1px solid #ffffff00;width: fit-content;margin: 30px;border-radius: 5px;box-shadow: 2px 2px 5px #999;text-align: justify;'>" + str5 + "</div>";
                            entityObject1["UserId"] = RuntimeHelpers.GetObjectValue(row["Id"]);
                            entityObject1["SendDate"] = DateTime.Now;
                            entityObject1["Status"] = 1;
                            if (entityObject1.InsertProcess(entityObject1.TableName, ObjectSettings.eUpdateType.Standard, null))
                            {
                                EntityObject entityObject2 = new EntityObject("sysNotice", Ret.ConfToken);
                                entityObject2["Title"] = translator.Translate("Nueva noticia publicada.", eTranslation_Areas.Messages);
                                entityObject2["Message"] = translator.Translate("There are new suggestions which need your attention.", eTranslation_Areas.Messages);
                                entityObject2["ReminderTime"] = DateTime.Now;
                                entityObject2["ExpiryTime"] = DateTime.Now.AddDays(7.0);
                                entityObject2["AllUsers"] = "false";
                                entityObject2["AllUsersIsSent"] = "false";
                                entityObject2["MethodName"] = "app";
                                entityObject2["TypeId"] = "object";
                                entityObject2["ObjectName"] = "emp_News_Article";
                                entityObject2["ObjectWhere"] = Operators.ConcatenateObject("News_Articles.NewsId =", Entity["NewsId"]);
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
                                    Ret.Success = true;
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

                    /* FIN  Enviamos el correo a los empleados para informar de que tienen una nueva noticia  */
                    }
                }
                else
                {
                    Ret.Success = false;
                    Ret.LastException = Entity.LastException;
                }
            }
            catch (Exception ex)
            {
                Ret.Success = false;
                Ret.LastException = ex;
            }
            return Ret.Success;
        }

        public static bool EditarNoticia(EntityObject Entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                Ret.Success = true;
                Translator translator = new Translator();
                if (!Entity.CanInsert)
                {
                    Ret.LastException = new LocalizedException("You do not have enough credentials to insert this object", LocalizedException.SeverityTypes.Error, null);
                    Ret.Success = false;
                }
                else
                {
                    Entity.GetData.Tables[0].GetChanges();
                    if (Entity.UpdateProcess(ObjectSettings.eUpdateType.Standard, ""))
                    {
                        if (Operators.ConditionalCompareObjectEqual(Entity["TypeId"], (object)1, false))
                        {
                            if (!new EntityObject("sysNotice", Ret.ConfToken)
                            {
                                ["Title"] = ((object)translator.Translate("You have a new article you must read ", eTranslation_Areas.Messages)),
                                ["Message"] = RuntimeHelpers.GetObjectValue(Entity["Title"]),
                                ["ReminderTime"] = RuntimeHelpers.GetObjectValue(Entity["PubDate"]),
                                ["ExpiryTime"] = RuntimeHelpers.GetObjectValue(Entity["EndDate"]),
                                ["AllUsers"] = ((object)"true"),
                                ["MethodName"] = ((object)"app"),
                                ["TypeId"] = ((object)"object"),
                                ["PageTypeId"] = ((object)"View"),
                                ["ObjectName"] = ((object)"emp_News_Article"),
                                ["ObjectWhere"] = ((object)("News_Articles.NewsId=" + Entity["NewsId"].ToString())),
                                ["TargetId"] = ((object)"current"),
                                ["InsertDate"] = RuntimeHelpers.GetObjectValue(Entity["Inserted"])
                            }.Update())
                            {
                                throw new Exception(Entity.LastException.Message);
                            }
                      

                        /*  Enviamos el correo a los empleados para informar de que tienen una nueva noticia  */
                        string str1 = Conversions.ToString(Entity["Title"]);
                        string str2 = Conversions.ToString(Entity["Descrip"]);

                        DataManager dataManager1 = new DataManager("ConfConnectionString");
                        DataManager dataManager2 = new DataManager("DataConnectionString");

                        //Obtenemos todos los empleados menos el 0
                        DataTable dataTable = dataManager2.DataTable("SELECT FullName, EMail, Id, EmployeeId, UserName FROM VPERS_Empleados_Usuarios");

                        string str3 = URL.GeObjecttUrlByName("D1BFA1B4-FBFF-4AEF-B821-C6C5BDB208C5", "emp_News_Article", Conversions.ToString(Operators.ConcatenateObject((object)"NewsId=", Entity["NewsId"])));
                        string aValue = Ret.ConfToken.AppFullPath + str3.Substring(1);

                        string str4;

                        if (Util.IsBlank(aValue))
                            str4 = "<h3 style='margin-bottom: 20px'>" + str1 + "</h3>";
                        else
                            str4 = "<h3 style='margin-bottom: 20px; cursor: pointer;'><a href='" + aValue + "'>" + str1 + "</a></h3>";
                        string str5 = str4 + "<p>" + str2 + "</p>";

                        //Recorremos el bucle
                        foreach (DataRow row in dataTable.Rows)
                        {
                            if (!Util.IsBlank(RuntimeHelpers.GetObjectValue(row["UserName"])) && !Util.IsBlank(RuntimeHelpers.GetObjectValue(row["Email"])))
                            {
                                EntityObject entityObject1 = new EntityObject("sysOutboxMail", Ret.ConfToken);
                                entityObject1["FromName"] = "Info Sebastian";
                                entityObject1["FromEmail"] = NewLateBinding.LateGet(ConfigurationManager.GetSection("system.net/mailSettings/smtp"), (Type)null, "From", new object[0], (string[])null, (Type[])null, (bool[])null).ToString();
                                entityObject1["To"] = RuntimeHelpers.GetObjectValue(row["Email"]);
                                entityObject1["Subject"] = translator.Translate("Noticia modificada", eTranslation_Areas.Messages);
                                entityObject1["Body"] = "<h1 style='color:#1d92e5'>Sebastian</span> <span style='color: black;font-size: smaller;'>by </span> <span style='color:#2DB7B0'>flexy</span><span style='color:black'>Go</span></h1>\r\n                                        <br><p>" + translator.Translate("Se ha publicado una nueva noticia en el portal de Sebastian.", eTranslation_Areas.Messages) + "</p> \r\n                                         <div style='padding: 15px;border: 1px solid #ffffff00;width: fit-content;margin: 30px;border-radius: 5px;box-shadow: 2px 2px 5px #999;text-align: justify;'>" + str5 + "</div>";
                                entityObject1["UserId"] = RuntimeHelpers.GetObjectValue(row["Id"]);
                                entityObject1["SendDate"] = DateTime.Now;
                                entityObject1["Status"] = 1;
                                if (entityObject1.InsertProcess(entityObject1.TableName, ObjectSettings.eUpdateType.Standard, null))
                                {
                                    EntityObject entityObject2 = new EntityObject("sysNotice", Ret.ConfToken);
                                    entityObject2["Title"] = translator.Translate("Noticia modificada", eTranslation_Areas.Messages);
                                    entityObject2["Message"] = translator.Translate("There are new suggestions which need your attention.", eTranslation_Areas.Messages);
                                    entityObject2["ReminderTime"] = DateTime.Now;
                                    entityObject2["ExpiryTime"] = DateTime.Now.AddDays(7.0);
                                    entityObject2["AllUsers"] = "false";
                                    entityObject2["AllUsersIsSent"] = "false";
                                    entityObject2["MethodName"] = "app";
                                    entityObject2["TypeId"] = "object";
                                    entityObject2["ObjectName"] = "emp_News_Article";
                                    entityObject2["ObjectWhere"] = Operators.ConcatenateObject("News_Articles.NewsId =", Entity["NewsId"]);
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

                        /* FIN  Enviamos el correo a los empleados para informar de que tienen una nueva noticia  */
                        }
                    }
                    else
                    {
                        Ret.Success = false;
                        Ret.LastException = Entity.LastException;
                    }
                }
            }
            catch (Exception ex)
            {
                Ret.Success = false;
                Ret.LastException = ex;
            }
            return Ret.Success;
        }

    }
}
