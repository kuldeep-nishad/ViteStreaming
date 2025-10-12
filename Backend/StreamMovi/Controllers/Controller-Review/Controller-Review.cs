using Microsoft.AspNetCore.Mvc;
using StreamMovi.Services.Review_ser.Interface;
using StreamMovi.ReviewHelper;

namespace StreamMovi.Controllers.Controller_Review
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        // Add new review
        [HttpPost("add")]
        public IActionResult AddReview([FromBody] ReviewDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                _reviewService.AddReview(dto.MovieId, dto.UserAccountId, dto.ReviewText);
                return Ok(new { message = "Review added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Get reviews for a movie
        [HttpGet("movie/{movieId}")]
        public IActionResult GetReviews(int movieId)
        {
            try
            {
                var reviews = _reviewService.GetReviewsByMovie(movieId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Update review
        [HttpPut("update/{reviewId}")]
        public IActionResult UpdateReview(int reviewId, [FromBody] ReviewDto dto)
        {
            try
            {
                _reviewService.UpdateReview(reviewId, dto.UserAccountId, dto.ReviewText);
                return Ok(new { message = "Review updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete review
        [HttpDelete("delete/{reviewId}")]
        public IActionResult DeleteReview(int reviewId, [FromQuery] string userAccountId)
        {
            try
            {
                _reviewService.DeleteReview(reviewId, userAccountId);
                return Ok(new { message = "Review deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
