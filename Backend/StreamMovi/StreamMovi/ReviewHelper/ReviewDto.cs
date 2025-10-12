using System.ComponentModel.DataAnnotations;

namespace StreamMovi.ReviewHelper
{
    public class ReviewDto
    {
        [Required]
        public int MovieId { get; set; }
        [Required]
        public string UserAccountId { get; set; }
        [Required]
        public string ReviewText { get; set; } = string.Empty;
    }
}
