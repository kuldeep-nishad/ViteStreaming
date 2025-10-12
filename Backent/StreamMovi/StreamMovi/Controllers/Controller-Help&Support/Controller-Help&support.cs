//using Microsoft.AspNetCore.Mvc;
//using StreamMovi.Services.HelpSuppert_Ser;
//using System.ComponentModel.Design;
//using static System.Object;
//using StreamMovi.ReviewHelper;


//namespace StreamMovi.Controllers.Controller_Help_Support
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class HelpsupportController : Controller
//    {
//        private readonly IHelpSupportService _helpService;

//        public HelpsupportController(IHelpSupportService helpService)
//        {
//            _helpService = helpService;
//        }

//        // User creates ticket
//        [HttpPost("create")]
//        public IActionResult CreateTicket([FromBody] HelpSuppDTO dto)
//        {
//            if (!ModelState.IsValid) return BadRequest(ModelState);

//            try
//            {
//                _helpService.CreateTicket(dto.Email, dto.Subject, dto.Description);
//                return Ok(new { message = "Ticket created successfully" });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        // User gets their tickets
//        [HttpGet("mytickets/{userAccountId}")]
//        public IActionResult GetUserTickets(string userAccountId)
//        {
//            try
//            {
//                var tickets = _helpService.GetUserTickets(userAccountId);
//                return Ok(tickets);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        // Admin gets all tickets
//        [HttpGet("all")]
//        public IActionResult GetAllTickets()
//        {
//            try
//            {
//                var tickets = _helpService.GetAllTickets();
//                return Ok(tickets);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }

//        // Admin responds to ticket
//        [HttpPut("respond/{ticketId}")]
//        public IActionResult RespondToTicket(int ticketId, [FromBody] AdminResponseDto dto)
//        {
//            try
//            {
//                _helpService.UpdateTicket(ticketId, dto.Response, "Solved");
//                return Ok(new { message = "Response submitted" });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }
//    }

//}
