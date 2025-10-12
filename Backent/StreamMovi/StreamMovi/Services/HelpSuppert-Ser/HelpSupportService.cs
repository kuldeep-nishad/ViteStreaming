using StreamMovi.Models.HelpsupportModel;
using StreamMovi.Repository.HelpSupp_Rep;
using StreamMovi.Services.User_Ser.Interface;
using static System.Object;

namespace StreamMovi.Services.HelpSuppert_Ser
{
    public class HelpSupportService : IHelpSupportService

    {
        private readonly IHelpSuppRepo _helpRepo;
        private readonly IUserService _userService;

        public HelpSupportService (IHelpSuppRepo helpRepo, IUserService userService)
        {
            _helpRepo = helpRepo;
            _userService = userService;
        }

        public void CreateTicket(string email, string subject, string description)
        {
            var user = _userService.GetUserByEmail(email);
            if (user == null) throw new Exception("User not found");

            var ticket = new HelpSupport
            {
                UserAccountId = user.UserAccountId,
                Subject = subject,
                Description = description,
                Status = "Pending",
                CreatedAt = DateTime.Now
            };

            _helpRepo.CreateTicket(ticket);
        }

        public IEnumerable<HelpSupport> GetUserTickets(string userAccountId)
        {
            return _helpRepo.GetTicketsByUser(userAccountId);
        }

        public IEnumerable<HelpSupport> GetAllTickets()
        {
            return _helpRepo.GetAllTickets();
        }

        public void UpdateTicket(int ticketId, string response, string status)
        {
            var ticket = _helpRepo.GetTicketById(ticketId);
            if (ticket == null) throw new Exception("Ticket not found");

            ticket.AdminResponse = response;
            ticket.Status = status;
            ticket.UpdatedAt = DateTime.Now;

            _helpRepo.UpdateTicket(ticket);
        }
    }
}

