using StreamMovi.Models.User_Model;
using StreamMovi.Repository.User_Rep.Interface;
using StreamMovi.Services.User_Ser.Interface;
using System.IdentityModel.Tokens.Jwt;
using StreamMovi.Helper;
using StreamMovi.Email;


namespace StreamMovi.Services.User_Ser
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;
        private readonly EmailService _emailService;
        public UserService(IUserRepository userRepository, EmailService emailService)
        {
            _userRepository = userRepository;
            _emailService = emailService;
        }
        public string CreateUser(UserModel modelDT)
        {

            string Result =String.Empty;

            try
            {
                Result= _userRepository.CreateUser(modelDT);
            }
            catch (Exception) {

                throw;
            }
            return Result;
        }

        public string DeleteUser(int id)
        {
            string Result = String.Empty;

            try
            {
                Result = _userRepository.DeleteUser(id);
            }
            catch (Exception)
            {

                throw;
            }
            return Result;  
        }

        public string UpdateUser(int id, UserModel model)
        {
            string Result = String.Empty;

            try
            {
                Result =_userRepository.UpdateUser(id, model);
            }
            catch (Exception)
            {

                throw;
            }return Result;
        }



            public void GenerateOtp(string email)
            {
                // 1️⃣ Check if user exists
                var user = _userRepository.GetUserByEmail(email);
                if (user == null)
                {
                    user = new UserModel { Email = email };
                    _userRepository.CreateUser(user);
                }

                // 2️⃣ Generate OTP
                Random rnd = new Random();
                string otp = rnd.Next(100000, 999999).ToString();

                // 3️⃣ Save OTP and timestamp in database
                bool saved = _userRepository.UpdateOtp(email, otp);
                if (!saved)
                    throw new Exception("Failed to save OTP. Please try again.");

                // 4️⃣ Send OTP email
                _emailService.SendOtpEmail(email, otp);
            }



            // Verify OTP, return JWT token
            public string VerifyOtp(string email, string otp)
            {
                var user = _userRepository.GetUserByEmail(email);
                if (user == null) return null;

                if (user.OTP != otp) return null;

                if ((DateTime.UtcNow - user.OTPCreatedAt.Value).TotalMinutes > 10)
                    return null;

                _userRepository.UpdateOtp(email, null); // clear OTP
                return JwtHelper.GenerateToken(user.Email, user.Id);
            }

            // Complete signup (set name, phone)
            public void CompleteSignup(string email, string name, string phone)
            {
                var user = _userRepository.GetUserByEmail(email);
                if (user == null) throw new Exception("User not found");

                user.Name = name;
                user.PhoneNumber = phone;
                _userRepository.UpdateUser(user.Id, user);
            }

        public UserModel GetUserByEmail(string email)
        {
            try
            {
                return _userRepository.GetUserByEmail(email);
            }
            catch (Exception)
            {
                throw;
            }
        }


       
    }
}
