using StreamMovi.HelperRepo;
using StreamMovi.Models.ReviewModel;
using StreamMovi.Repository.Review_Rep;
using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;

namespace StreamMovi.Repository.Review_Rep
{
    public class ReviewRepo : IReviewRepo
    {
        public void AddReview(ReviewMoviModel review)
            {
            using var con = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("AddReview", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MovieId", review.MovieId);
            cmd.Parameters.AddWithValue("@UserAccountId", review.UserAccountId);
            cmd.Parameters.AddWithValue("@ReviewText", review.ReviewText);
            con.Open();
            cmd.ExecuteNonQuery();
        }

        public IEnumerable<ReviewMoviModel> GetReviewsByMovie(int movieId)
        {
            var list = new List<ReviewMoviModel>();
            using var con = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("GetReviewsByMovie", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MovieId", movieId);
            con.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                list.Add(new ReviewMoviModel
                {
                    ReviewId = Convert.ToInt32(reader["ReviewId"]),
                    MovieId = Convert.ToInt32(reader["MovieId"]),
                    UserAccountId = reader["UserAccountId"].ToString(),
                    ReviewText = reader["ReviewText"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = reader["UpdatedAt"] != DBNull.Value ? Convert.ToDateTime(reader["UpdatedAt"]) : (DateTime?)null
                });
            }
            return list;
        }

        public ReviewMoviModel GetReviewById(int reviewId)
        {
            using var con = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("GetReviewById", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ReviewId", reviewId);
            con.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new ReviewMoviModel
                {
                    ReviewId = Convert.ToInt32(reader["ReviewId"]),
                    MovieId = Convert.ToInt32(reader["MovieId"]),
                    UserAccountId = reader["UserAccountId"].ToString(),
                    ReviewText = reader["ReviewText"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    UpdatedAt = reader["UpdatedAt"] != DBNull.Value ? Convert.ToDateTime(reader["UpdatedAt"]) : (DateTime?)null
                };
            }
            return null;
        }

        public void UpdateReview(ReviewMoviModel review)
        {
            using var con = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("UpdateReview", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ReviewId", review.ReviewId);
            cmd.Parameters.AddWithValue("@ReviewText", review.ReviewText);
            cmd.Parameters.AddWithValue("@UpdatedAt", DateTime.UtcNow);
            con.Open();
            cmd.ExecuteNonQuery();
        }

        public void DeleteReview(ReviewMoviModel review)
        {
            using var con = new SqlConnection(ConnectionFactory.GetConnectionString());
            using var cmd = new SqlCommand("DeleteReview", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ReviewId", review.ReviewId);
            con.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
