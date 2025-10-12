using Microsoft.Data.SqlClient;
using StreamMovi.HelperRepo;
using StreamMovi.Models.MovieModel;
using StreamMovi.Repository.Movi_Rep.Interface;
using StreamMovi.Services.Movi_Ser;
using System.Data;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;
using Dapper;

namespace StreamMovi.Repository.Movi_Rep
{
    public class MoviRepository : IMoviRepository
    {


        public string CreateMovi(MoviModel modelDT)
        {
            bool inserted = false;
            String Result = String.Empty;
            try
            {

                using (var conne = new SqlConnection(ConnectionFactory.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("InsertMoviDetail", conne))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Title", modelDT.Title);
                        cmd.Parameters.AddWithValue("@ReleaseDate", modelDT.ReleaseDate);
                        cmd.Parameters.AddWithValue("@Runtime", modelDT.Runtime);
                        cmd.Parameters.AddWithValue("@Rating", modelDT.Rating);
                        cmd.Parameters.AddWithValue("@AgeRecommendation", modelDT.AgeRecommendation);
                        cmd.Parameters.AddWithValue("@MovieSummary", modelDT.MovieSummary);
                        cmd.Parameters.AddWithValue("@Keywords", modelDT.Keywords);
                        cmd.Parameters.AddWithValue("@PosterUrl", modelDT.PosterUrl);
                        cmd.Parameters.AddWithValue("@VideoUrl", modelDT.VideoUrl);
                        cmd.Parameters.AddWithValue("@Category", modelDT.Category);
                        conne.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        inserted = rowsAffected > 0;
                        Result = inserted ? "User Added Successfully" : "User Fail To Add";
                    }
                }
                return Result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string DeleteMovi(int id)
        {

            string Result = String.Empty;
            try
            {
                using (var conne = new SqlConnection(ConnectionFactory.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("DeleteMoviDetail", conne))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@movId", id);

                        conne.Open();
                        int rows = cmd.ExecuteNonQuery();
                        Result = rows > 0 ? "Movie deleted successfully" : "Movie not found";


                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Result;
        }


        public string UpdateMovi(int id, MoviModel model)
        {
            string Result = string.Empty;
            try
            {
                using (var conne = new SqlConnection(ConnectionFactory.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("UpdateMoviDetail", conne))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;


                        cmd.Parameters.AddWithValue("@movId", id);
                        cmd.Parameters.AddWithValue("@Title", model.Title);
                        cmd.Parameters.AddWithValue("@ReleaseDate", model.ReleaseDate);
                        cmd.Parameters.AddWithValue("@Runtime", model.Runtime);
                        cmd.Parameters.AddWithValue("@Rating", model.Rating);
                        cmd.Parameters.AddWithValue("@AgeRecommendation", model.AgeRecommendation);
                        cmd.Parameters.AddWithValue("@MovieSummary", model.MovieSummary);
                        cmd.Parameters.AddWithValue("@Keywords", model.Keywords);
                        cmd.Parameters.AddWithValue("@PosterUrl", model.PosterUrl);
                        cmd.Parameters.AddWithValue("@VideoUrl", model.VideoUrl);
                        cmd.Parameters.AddWithValue("@Category", model.Category);

                        conne.Open();
                        int rows = cmd.ExecuteNonQuery(); // executes update
                        Result = rows > 0 ? "Movie updated successfully" : "Movie not found";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Result;
        }





        public DataTable GetMovies()
        {
            DataTable datTab = new DataTable();

            using (var conne = new SqlConnection(ConnectionFactory.GetConnectionString()))
            {
                using (var cmd = new SqlCommand("GetMoviDetail", conne))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(datTab);
                    }
                }
            }

            return datTab;
        }

        public MoviModel GetMoviById(int id)
        {
            using (var conne = new SqlConnection(ConnectionFactory.GetConnectionString()))
            {
                using (var cmd = new SqlCommand("GetMoviById", conne))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@MoById", id);

                    conne.Open();
                    using (var reader = cmd.ExecuteReader())
                    {

                        if (reader.Read())
                        {
                            return new MoviModel
                            {
                                MovieID = (int)reader["MovieID"],
                                Title = reader["Title"].ToString(),
                                Runtime = reader["Runtime"].ToString(),
                                ReleaseDate = Convert.ToDateTime(reader["ReleaseDate"]),
                                Rating = reader["Rating"].ToString(),
                                AgeRecommendation = reader["AgeRecommendation"].ToString(),
                                MovieSummary = reader["MovieSummary"].ToString(),
                                Keywords = reader["Keywords"].ToString(),
                                PosterUrl = reader["PosterUrl"].ToString(),
                                VideoUrl = reader["VideoUrl"].ToString(),
                                Category = reader["Category"].ToString(),

                            };

                        }
                        return null;
                    }


                }


            }




        }
        public async Task<IEnumerable<MoviModel>> SearchMoviesByTitleAsync(string title)
        {
            var movieList = new List<MoviModel>();

            using (var conne = new SqlConnection(ConnectionFactory.GetConnectionString()))
            {
                using (var cmd = new SqlCommand("SearchMoviesByTitle", conne))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Title", title);

                    await conne.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            movieList.Add(new MoviModel
                            {
                                MovieID = (int)reader["MovieID"],
                                Title = reader["Title"].ToString(),
                                Runtime = reader["Runtime"].ToString(),
                                ReleaseDate = Convert.ToDateTime(reader["ReleaseDate"]),
                                Rating = reader["Rating"].ToString(),
                                AgeRecommendation = reader["AgeRecommendation"].ToString(),
                                MovieSummary = reader["MovieSummary"].ToString(),
                                Keywords = reader["Keywords"].ToString(),
                                PosterUrl = reader["PosterUrl"].ToString(),
                                VideoUrl = reader["VideoUrl"].ToString(),
                                Category = reader["Category"].ToString(),
                            });
                        }
                    }
                }
            }

            return movieList;
        }
    
    }

    }
