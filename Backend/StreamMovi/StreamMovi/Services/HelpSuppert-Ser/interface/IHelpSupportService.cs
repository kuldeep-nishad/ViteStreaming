using StreamMovi.Models.HelpsupportModel;

namespace StreamMovi.Services.HelpSuppert_Ser
{
    public interface IHelpSupportService
    {
        void CreateTicket(string email, string subject, string description);
        IEnumerable<HelpSupport> GetUserTickets(string userAccountId);
        IEnumerable<HelpSupport> GetAllTickets();
        void UpdateTicket(int ticketId, string response, string status);
    }
}
