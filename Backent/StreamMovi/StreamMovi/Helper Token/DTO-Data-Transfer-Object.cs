using System.ComponentModel.DataAnnotations;

namespace StreamMovi.Helper_Token
{
    public class DTO_Data_Transfer_Object
    {

        // For OTP generation (email only)
        public class GenerateOtpDto
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }

        // For OTP verification (email, otp, optionally name & phone for signup)
        public class VerifyOtpDto
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; } = string.Empty;

            [Required]
            public string Otp { get; set; } = string.Empty;

            // Optional for signup
            public string? Name { get; set; }

            [Phone]
            public string? Phone { get; set; }
        }

        public class UpdateUserDto
        {
            [StringLength(15)]
            public string? Name { get; set; }

            public string Email { get; set; } = string.Empty;

            [Phone]
            [StringLength(20)]
            public string? PhoneNumber { get; set; }
        }

    }
}
