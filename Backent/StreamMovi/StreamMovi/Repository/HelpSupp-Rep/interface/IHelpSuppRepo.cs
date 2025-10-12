using StreamMovi.Models.HelpsupportModel;

namespace StreamMovi.Repository.HelpSupp_Rep
{
    public interface IHelpSuppRepo
    {
        void CreateTicket(HelpSupport ticket);
        IEnumerable<HelpSupport> GetTicketsByUser(string userAccountId);
        IEnumerable<HelpSupport> GetAllTickets();
        HelpSupport GetTicketById(int ticketId);
        void UpdateTicket(HelpSupport ticket);
    }
}
