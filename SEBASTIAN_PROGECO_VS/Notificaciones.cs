using FLEXYGO.Exceptions;
using FLEXYGO.Localization;
using FLEXYGO.Objects;
using FLEXYGO.Objects.Settings;
using FLEXYGO.Processing;
using FLEXYGO.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Channels;
using System.Text;
using System.Threading.Tasks;

namespace SEBASTIAN_PROGECO_VS
{
    class Notificaciones
    {
        public static bool ActualizarNotificacion(EntityObject Entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                Translator translator = new Translator(Ret.ConfToken.UserSecurity.CultureId);
                if (!Entity.CanUpdate)
                {
                    throw new Exception(translator.Translate("You do not have enough credentials to update this object", eTranslation_Areas.Exceptions));
                }
                else
                {
                    //Actualizamos los campos de fecha actualización y actualizado por
                    Entity["LastUpdate"] = DateTime.Now;
                    Entity["UpdateBy"] = Ret.ConfToken.UserSecurity.Reference;

                    if (!Entity.UpdateProcess(ObjectSettings.eUpdateType.Standard, ""))
                    {
                        throw new Exception(Entity.LastException.Message);
                    }
                
                    Ret.Success = true;
                }
            }
            catch(Exception ex)
            {
                Ret.Success = false;
                Ret.LastException = ex;
            }

            return Ret.Success;
        }

        public static bool NotificarNotificacion(EntityObject Entity, ProcessManager.ProcessHelper Ret)
        {
            try
            {
                if (!Procesos.EnviarCorreoNotificacion(Entity, Ret, int.Parse(Entity["EmployeeId"].ToString()), "Nuevo notificación"))
                {
                    Ret.Success = false;
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
