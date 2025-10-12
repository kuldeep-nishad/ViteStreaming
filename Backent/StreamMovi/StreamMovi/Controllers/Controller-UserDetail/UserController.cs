using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamMovi.Helper_Token;
using StreamMovi.Models.User_Model;
using StreamMovi.Services.User_Ser.Interface;
using static StreamMovi.Helper_Token.DTO_Data_Transfer_Object;

namespace StreamMovi.Controllers.Controller_UserDetail
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
            public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<String> PostUser(UserModel modelDT)
        {
            string Result = String.Empty;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Result = _userService.CreateUser(modelDT);
            }
            catch (Exception)
            {
                throw;
            }
            return Result;
        }

        [HttpDelete("{id}")]
        public ActionResult<String> DeleteUser(int id) {

            string Result = String.Empty;
            if (id <= 0)
            {
                return "Invalid user id.";
            }

            try
            {
                string result = _userService.DeleteUser(id);
                return result;
            }
            catch (Exception ex)
            {
                // Optional: log exception here
                return StatusCode(500, $"Error deleting user: {ex.Message}");
            }
        }

        [HttpPut]
        public ActionResult<UserModel> PutUser([FromBody] UpdateUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = _userService.GetUserByEmail(dto.Email);
                if (user == null) return NotFound("User not found.");

                // Update allowed fields
                user.Name = dto.Name ?? user.Name;
                user.PhoneNumber = dto.PhoneNumber ?? user.PhoneNumber;

                _userService.UpdateUser(user.Id, user);

                var updatedUser = _userService.GetUserByEmail(user.Email);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating user: {ex.Message}");
            }
        }



        [HttpPost("generate-otp")]
        public IActionResult GenerateOtp([FromBody] GenerateOtpDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _userService.GenerateOtp(dto.Email); // Generate OTP & send email
                return Ok(new { message = "OTP sent to your email" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var token = _userService.VerifyOtp(dto.Email, dto.Otp);
                if (token == null) return Unauthorized("Invalid or expired OTP");

                var user = _userService.GetUserByEmail(dto.Email);


                // If signup (name or phone provided), complete signup
                if (!string.IsNullOrEmpty(dto.Name) || !string.IsNullOrEmpty(dto.Phone))
                {
                    _userService.CompleteSignup(dto.Email, dto.Name??"", dto.Phone??"");
                    
                }

                return Ok(new { token,
                    userAccountId = user.UserAccountId,
                    name = user.Name,
                    email = user.Email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("get-user")]
        public ActionResult<UserModel> GetUser([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest("Email is required");

            try
            {
                var user = _userService.GetUserByEmail(email);
                if (user == null) return NotFound("User not found");
                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
