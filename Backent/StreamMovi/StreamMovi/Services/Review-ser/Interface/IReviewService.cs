using StreamMovi.Models.ReviewModel;
namespace StreamMovi.Services.Review_ser.Interface

{
    public interface IReviewService
    {
        public void AddReview(int movieId, string userAccountId, string text);
       public  IEnumerable<ReviewMoviModel> GetReviewsByMovie(int movieId);
        void UpdateReview(int reviewId, string userAccountId, string text);
        void DeleteReview(int reviewId, string userAccountId);
    }
}
