using StreamMovi.Models.User_Model;

namespace StreamMovi.Services.User_Ser.Interface
{
    public interface IUserService
    {
        string CreateUser(UserModel modelDT);
        string UpdateUser(int id ,UserModel model);
        string DeleteUser(int id);

        void GenerateOtp(string email);

        string VerifyOtp(string email, string otp);

        UserModel GetUserByEmail(string email);

        

        void CompleteSignup(string email, string name, string phone);

    }
}
