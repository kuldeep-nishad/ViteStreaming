using Microsoft.Data.SqlClient;
using StreamMovi.HelperRepo;
using StreamMovi.Models.User_Model;
using StreamMovi.Repository.User_Rep.Interface;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StreamMovi.Repository.User_Rep
{
    public class UserReposotory : IUserRepository
    {
        public string CreateUser(UserModel modelDT)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("INSERT_USERDETAIL", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Name", modelDT.Name ?? "");
            cmd.Parameters.AddWithValue("@Email", modelDT.Email);
            cmd.Parameters.AddWithValue("@PhoneNumber", modelDT.PhoneNumber ?? "");
            conne.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? "User Added Successfully" : "User Fail To Add";
        }

        public string UpdateUser(int id, UserModel model)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("UPDATE_USERDETAIL", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@Name", model.Name ?? "");
            cmd.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber ?? "");
            conne.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? "User Updated Successfully" : "Update Failed";
        }


        public string DeleteUser(int id)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("DELETE_USER", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", id);
            conne.Open();
            int rows = cmd.ExecuteNonQuery();
            return rows > 0 ? "User Deleted Successfully" : "Delete Failed";
        }

        public bool UpdateOtp(string email, string otp)
        {
            using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("UPDATE_USER_OTP", conne);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@OTP", (object)otp ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@OTPCreatedAt", DateTime.UtcNow);
            conne.Open();
            return cmd.ExecuteNonQuery() > 0;
        }

            public UserModel GetUserByEmail(string email)
            {
                using var conne = new SqlConnection(ConnectionFactory.GetConnectionString());
                using var cmd = new SqlCommand("GET_USER_BY_EMAIL", conne);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Email", email);
                conne.Open();
                using var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                return new UserModel
                {
                    Id = Convert.ToInt32(reader["Userid"]),
                    Name = reader["Name"].ToString(),
                    Email = reader["Email"].ToString(),
                    PhoneNumber = reader["PhoneNumber"].ToString(),
                    OTP = reader["OTP"]?.ToString(),
                    OTPCreatedAt = reader["OTPCreatedAt"] != DBNull.Value ? Convert.ToDateTime(reader["OTPCreatedAt"]) : (DateTime?)null,
                    UserAccountId = reader["UserAccountId"].ToString()   // <--- add this line
                };

            }
            return null;
            }


        }
    }
