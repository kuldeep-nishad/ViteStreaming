using StreamMovi.Models.ReviewModel;

namespace StreamMovi.Repository.Review_Rep


{
    public interface IReviewRepo
    {
        void AddReview(ReviewMoviModel review);
        IEnumerable<ReviewMoviModel> GetReviewsByMovie(int movieId);
        ReviewMoviModel GetReviewById(int reviewId);
        void UpdateReview(ReviewMoviModel review);
        void DeleteReview(ReviewMoviModel review);
    }
}
