namespace StreamMovi.Models.ReviewModel
{
    public class ReviewMoviModel
    {
        public int ReviewId { get; set; }
        public int MovieId { get; set; }
        public string UserAccountId { get; set; }
        public string ReviewText { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
