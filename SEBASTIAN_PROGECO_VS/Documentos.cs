using FLEXYGO.Data;
using FLEXYGO.Objects;
using FLEXYGO.Processing;
using FLEXYGO.UI;
using SEBASTIAN_PROGECO_VS.Clases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;

namespace SEBASTIAN_PROGECO_VS
{
    public class Documentos
    {

        public static bool NuevoDocumentoPost(EntityObject entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                DataTable dtUsuarios = new DataTable();

                string mensaje = string.Empty;
                string IdPagina = string.Empty;

                switch (entity.Name)
                {
                    case "emp_Documents_Article":

                        dtUsuarios = entity.DataManager.DataTable("SELECT FullName, EMail, Id, EmployeeId, UserName FROM VPERS_Empleados_Usuarios");

                        mensaje = "Se ha añadido un nuevo documento. Podeis entrar al portal para verlo";
                        IdPagina = "A7462AAB-E09A-4E1D-9D68-4BB3F212C6FB";
                        break;
                    case "emp_Employee":
                        dtUsuarios = entity.DataManager.DataTable(string.Format("SELECT FullName, EMail, Id, EmployeeId, UserName FROM VPERS_Empleados_Usuarios WHERE EmployeeId = {0}", entity["EmployeeId"]));
                        mensaje = "Se te ha añadido un nuevo documento. Puedes entrar al portal para verlo";
                        break;
                    default:
                        break;
                }

                if (!Procesos.EnviarCorreoDocumento(entity, Ret, dtUsuarios, IdPagina, "Nuevo documento añadido", mensaje))
                {
                    Ret.Success = false;
                }


            }
            catch (Exception ex)
            {
                Ret.LastException = ex;
                Ret.Success = false;
            }

            return Ret.Success;
        }

        public static bool NuevoDocumentoEmpleado(ProcessManager.ProcessHelper Ret, int employeeId, string document)
        {
            //Creamos una trasaccion
            DataManager dt = new DataManager("ConfConnectionString");
            try
            {
                dt.BeginTrans();

                //Creamos el identificador del documento
                Guid guid = Guid.NewGuid();

                //Creamos la ruta donde va ir el archivo
                string documentPath = string.Format("~/custom/documents/{0}/{1}", employeeId, Path.GetFileName(document));

                //Insertamos el en la tabla objects
                EntityObject documentObj = new EntityObject("Document", Ret.ConfToken);
                documentObj["CategoryId"] = "sysdoc-generic";
                documentObj["CreationDate"] = DateTime.Now;
                documentObj["Description"] = null;
                documentObj["DocGuid"] = guid;
                documentObj["Name"] = Path.GetFileNameWithoutExtension(document);

                //Insertamos
                if (!documentObj.Insert())
                {
                    throw documentObj.LastException;
                }

                //Tabla documents versions
                EntityObject documentObjectVersion = new EntityObject("Document_Version", Ret.ConfToken);
                documentObjectVersion["CloudID"] = null;
                documentObjectVersion["DocGuid"] = guid;
                documentObjectVersion["DocumentTypeName"] = "diskfile";
                documentObjectVersion["DownloadLink"] = documentPath;
                documentObjectVersion["FilePath"] = documentPath;
                documentObjectVersion["InProgress"] = 0;
                documentObjectVersion["Revision"] = 0;

                //Obtenemos la extensión sin el punto
                //Buscar en la tabla documents_extensions. Si no existe, poner valor "FILE"
                object origin = dt.GetValue(string.Format("SELECT Origin FROM Documents_Extensions WHERE Extension = '{0}'", Path.GetExtension(document)),null);

                documentObjectVersion["Origin"] = origin ?? "FILE";

                //Insertamos
                if (!documentObjectVersion.Insert())
                {
                    throw documentObjectVersion.LastException;
                }

                //Tabla documents objects
                EntityObject documentObject = new EntityObject("Document_Object", Ret.ConfToken);
                documentObject["ObjectName"] = "emp_Employee";
                documentObject["DocGuid"] = guid;
                documentObject["ObjectId"] = employeeId;

                //Insertamos
                if (!documentObject.Insert())
                {
                    throw documentObject.LastException;
                }

                Ret.Success = true;

                dt.CommitTrans();
            }
            catch (Exception ex)
            {
                Ret.Success = false;
                Ret.LastException = ex;
                if (dt.InTrans)
                {
                    dt.RollbackTrans();
                }
            }

            return Ret.Success;
        }

    }
}
