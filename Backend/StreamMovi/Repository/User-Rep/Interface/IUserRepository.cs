using StreamMovi.Models.User_Model;

namespace StreamMovi.Repository.User_Rep.Interface
{
    public interface IUserRepository
    {
        string CreateUser(UserModel modelDT);
        string UpdateUser(int id, UserModel model);
        string DeleteUser(int id);

        bool UpdateOtp(string email, string otp);
        UserModel GetUserByEmail(string email);
    }
}
