using Microsoft.Data.SqlClient;
using StreamMovi.HelperRepo;
using StreamMovi.Models.HelpsupportModel;
using StreamMovi.Repository.HelpSupp_Rep;
using System.Data;

namespace StreamMovi.Repository.HelpSupp_Rep
{
    public class HelpSuppRepo : IHelpSuppRepo
    {
        public void CreateTicket(HelpSupport ticket)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("INSERT_HELPSUPPORT", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserAccountId", ticket.UserAccountId);
            cmd.Parameters.AddWithValue("@Subject", ticket.Subject ?? "");
            cmd.Parameters.AddWithValue("@Description", ticket.Description ?? "");
            cmd.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
            conne.Open();
            cmd.ExecuteNonQuery();
        }

        public IEnumerable<HelpSupport> GetTicketsByUser(string userAccountId)
        {
            var tickets = new List<HelpSupport>();
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("GET_TICKETS_BY_USER", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserAccountId", userAccountId);
            conne.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                tickets.Add(new HelpSupport
                {
                    TicketId = Convert.ToInt32(reader["TicketId"]),
                    UserAccountId = reader["UserAccountId"].ToString(),
                    Subject = reader["Subject"].ToString(),
                    Description = reader["Description"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                });
            }
            return tickets;
        }

        public IEnumerable<HelpSupport> GetAllTickets()
        {
            var tickets = new List<HelpSupport>();
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("GET_ALL_TICKETS", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            conne.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                tickets.Add(new HelpSupport
                {
                    TicketId = Convert.ToInt32(reader["TicketId"]),
                    UserAccountId = reader["UserAccountId"].ToString(),
                    Subject = reader["Subject"].ToString(),
                    Description = reader["Description"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                });
            }
            return tickets;
        }

        public HelpSupport GetTicketById(int ticketId)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("GET_TICKET_BY_ID", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TicketId", ticketId);
            conne.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new HelpSupport
                {
                    TicketId = Convert.ToInt32(reader["TicketId"]),
                    UserAccountId = reader["UserAccountId"].ToString(),
                    Subject = reader["Subject"].ToString(),
                    Description = reader["Description"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"])
                };
            }
            return null;
        }

        public void UpdateTicket(HelpSupport ticket)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("UPDATE_TICKET", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TicketId", ticket.TicketId);
            cmd.Parameters.AddWithValue("@Subject", ticket.Subject ?? "");
            cmd.Parameters.AddWithValue("@Description", ticket.Description ?? "");
            conne.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
