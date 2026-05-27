using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SEBASTIAN_PROGECO_VS.Clases
{
    public class ListtoDataTableConverter
    {
        public DataTable ListToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Obtenermos las propiedades de la lista
            PropertyInfo[] Props = typeof(T).GetProperties();
            foreach (PropertyInfo prop in Props)
            {
                //Añadimos las columnas al datatable
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //Introducimos el valor al datatable
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }
    }
}
