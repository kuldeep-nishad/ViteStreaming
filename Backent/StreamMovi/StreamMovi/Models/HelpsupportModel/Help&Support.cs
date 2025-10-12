namespace StreamMovi.Models.HelpsupportModel
{
    public class HelpSupport
    {
        public int TicketId { get; set; }
        public string UserAccountId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }  // matches DB
        public string Status { get; set; }       // Pending/Solved
        public string AdminResponse { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }


}
