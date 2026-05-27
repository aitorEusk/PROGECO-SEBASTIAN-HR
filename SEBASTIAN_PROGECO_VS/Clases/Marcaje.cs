using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SEBASTIAN_PROGECO_VS.Clases
{
    class Marcaje
    {
        #region Atributos
        private bool all_day;
        private string card_number;
        private int clocking_type;
        private DateTime date_time;
        private int id_clocking;
        private int id_employer;
        private int id_reader;
        private int id_terminal;
        private int id_time_type;
        private int id_zone;
        private string ip;
        private int source;
        private int state;
        private string user;
        private int employee_id;
        private string time_type_descr;
        #endregion

        #region Constructor
        public Marcaje(int id_clocking)
        {
            this.id_clocking = id_clocking;
        }
        public Marcaje(int id_clocking, int employee_id, bool all_day, string card_number, int clocking_type, DateTime date_time, int id_employer, int id_reader, int id_terminal, int id_time_type, int id_zone, string ip, int source, int state, string user, string time_type_descr)
        {
            this.id_clocking = id_clocking;
            this.employee_id = employee_id;
            this.all_day = all_day;
            this.card_number = card_number;
            this.clocking_type = clocking_type;
            this.date_time = date_time;
            this.id_employer = id_employer;
            this.id_reader = id_reader;
            this.id_terminal = id_terminal;
            this.id_time_type = id_time_type;
            this.id_zone = id_zone;
            this.ip = ip;
            this.source = source;
            this.state = state;
            this.user = user;
            this.time_type_descr = time_type_descr;
        }
        #endregion

        #region Getters
        public bool Get_all_Day()
        {
            return all_day;
        }
        public string Get_card_numer()
        {
            string aux;
            if (card_number == null)
            {
                aux = "";
            }
            else
            {
                aux = card_number;
            }
            return aux;
        }
        public int Get_clocking_type()
        {
            return clocking_type;
        }
        public DateTime Get_date_time()
        {
            return date_time;
        }
        public int Get_id_clocking()
        {
            return id_clocking;
        }
        public int Get_id_employer()
        {
            return id_employer;
        }
        public int Get_id_reader()
        {
            return id_reader;
        }
        public int Get_id_terminal()
        {
            return id_terminal;
        }
        public int Get_id_time_type()
        {
            return id_time_type;
        }
        public int Get_id_zone()
        {
            return id_zone;
        }
        public string Get_ip()
        {
            return ip;
        }
        public int Get_source()
        {
            return source;
        }
        public int Get_state()
        {
            return state;
        }
        public string Get_user()
        {
            return user;
        }
        public int Get_employee_id()
        {
            return employee_id;
        }
        public string Get_time_type_descr()
        {
            return time_type_descr;
        }
        #endregion

        #region Setters
        public void Set_all_day(bool all_day)
        {
            this.all_day = all_day;
        }
        public void Set_card_number(string card_number)
        {
            this.card_number = card_number;
        }
        public void Set_clocking_type(int clocking_type)
        {
            this.clocking_type = clocking_type;
        }
        public void Set_date_time(DateTime date_time)
        {
            this.date_time = date_time;
        }
        public void Set_id_clocking(int id_clocking)
        {
            this.id_clocking = id_clocking;
        }
        public void Set_id_employer(int id_employer)
        {
            this.id_employer = id_employer;
        }
        public void Set_id_reader(int id_reader)
        {
            this.id_reader = id_reader;
        }
        public void Set_id_terminal(int id_terminal)
        {
            this.id_terminal = id_terminal;
        }
        public void Set_id_time_type(int id_time_type)
        {
            this.id_time_type = id_time_type;
        }
        public void Set_id_zone(int id_zone)
        {
            this.id_zone = id_zone;
        }
        public void Set_ip(string ip)
        {
            this.ip = ip;
        }
        public void Set_source(int source)
        {
            this.source = source;
        }
        public void Set_state(int state)
        {
            this.state = state;
        }
        public void Set_user(string user)
        {
            this.user = user;
        }
        public void Set_employee_id(int employee_id)
        {
            this.employee_id = employee_id;
        }
        public void Set_time_type_descr(string time_type_descr)
        {
            this.time_type_descr = time_type_descr;
        }
        #endregion
    }
}
