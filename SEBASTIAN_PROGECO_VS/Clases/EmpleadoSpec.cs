using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SEBASTIAN_PROGECO_VS.Clases
{
    class EmpleadoSpec
    {
        //Atributos
        #region Atributos
        private int id;
        private string name;
        private List<Marcaje> lista_marcajes;
        #endregion

        //Constructores
        #region Constructores
        public EmpleadoSpec(int id, string name)
        {
            this.id = id;
            this.name = name;
            lista_marcajes = new List<Marcaje>();
        }
        public EmpleadoSpec()
        {
            lista_marcajes = new List<Marcaje>();
        }
        #endregion

        //Getters de las variables miembro
        #region Getters
        public int Get_id()
        {
            return id;
        }
        public string Get_mame()
        {
            return name;
        }
        public List<Marcaje> Get_lista_marcajes()
        {
            return lista_marcajes;
        }
        #endregion

        //Setters de las variables miembro
        #region Setters
        public void Set_id(int id)
        {
            this.id = id;
        }
        public void Set_name(string name)
        {
            this.name = name;
        }
        public void Set_lista_marcajes(List<Marcaje> lista_marcajes)
        {
            this.lista_marcajes.AddRange(lista_marcajes);
        }
        #endregion
    }
}
