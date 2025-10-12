using StreamMovi.Models.ReviewModel;
using StreamMovi.Repository.Review_Rep;
using StreamMovi.Repository.User_Rep.Interface;
using StreamMovi.Services.Review_ser.Interface;

namespace StreamMovi.Services.Review_ser
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepo _reviewRepo;
        private readonly IUserRepository _userRepo;

        public ReviewService(IReviewRepo reviewRepo , IUserRepository userRepo)
        {
            _reviewRepo = reviewRepo;
            _userRepo = userRepo;
        }

        public void AddReview(int movieId, string userAccountId, string reviewText)
        {
            if (string.IsNullOrEmpty(userAccountId))
                throw new Exception("UserAccountId is required");

            var review = new ReviewMoviModel
            {
                MovieId = movieId,
                UserAccountId = userAccountId, 
                ReviewText = reviewText,
                CreatedAt = DateTime.UtcNow
            };

            _reviewRepo.AddReview(review);
        }


        public IEnumerable<ReviewMoviModel> GetReviewsByMovie(int movieId)
        {
            return _reviewRepo.GetReviewsByMovie(movieId);
        }

        public void UpdateReview(int reviewId, string userAccountId, string text)
        {
            var review = _reviewRepo.GetReviewById(reviewId);
            if (review == null || review.UserAccountId != userAccountId)
                throw new Exception("Review not found or unauthorized");

            review.ReviewText = text;
            review.UpdatedAt = DateTime.Now;

            _reviewRepo.UpdateReview(review);
        }

        public void DeleteReview(int reviewId, string userAccountId)
        {
            var review = _reviewRepo.GetReviewById(reviewId);
            if (review == null || review.UserAccountId != userAccountId)
                throw new Exception("Review not found or unauthorized");

            _reviewRepo.DeleteReview(review);
        }
    }
}
