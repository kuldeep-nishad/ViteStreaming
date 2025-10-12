using MailKit.Net.Smtp;
using MimeKit;
namespace StreamMovi.Email
{

    public class EmailService
    {
        public void SendOtpEmail(string toEmail, string otp)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("gsjdbisvsidv38@gmail.com"));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = "Your OTP for StreamMovi Signup";
            email.Body = new TextPart("plain") { Text = $"Your OTP is: {otp}" };

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate("gsjdbisvsidv38@gmail.com", "ekxh afgc khgx akjm");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }
}
