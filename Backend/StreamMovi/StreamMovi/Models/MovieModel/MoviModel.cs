using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace StreamMovi.Models.MovieModel
{
    public class MoviModel
    {
       
    
        
        
            public int MovieID { get; set; }

            [Required]
           [ StringLength(100)]
            public string Title { get; set; }

            [Required]
            public DateTime? ReleaseDate { get; set; }
  
            [Required]
            [StringLength(50)]
            public string? Runtime { get; set; }
           
            [Required]
            [StringLength(15)]
            public string? Rating { get; set; }
            [Required]
            [StringLength(15)]
            public string? AgeRecommendation { get; set; }
            [Required]
            [StringLength(250)]
            public string? MovieSummary { get; set; }
           
            [Required]
            [StringLength(200)]
            public string? Keywords { get; set; }
            [Required]
            [StringLength(80)]
            public string? PosterUrl { get; set; } 
            [Required]
            [StringLength(100)]
            public string? VideoUrl { get; set; }

            [Required]
            public string? Category  { get; set; }


        }
    }



