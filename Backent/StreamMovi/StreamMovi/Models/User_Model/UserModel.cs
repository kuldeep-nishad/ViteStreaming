using System.ComponentModel.DataAnnotations;

namespace StreamMovi.Models.User_Model
{
    public class UserModel
    {
        public int Id { get; set; }

        public string UserAccountId { get; set; }

        [StringLength(15)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(30)]
        public string Email { get; set; }

        [StringLength(20)]
        [Phone]
        
        public string PhoneNumber { get; set; }

        [StringLength(10)]
        public string OTP { get; set; }

        public DateTime ? OTPCreatedAt { get; set; }
    }
}
