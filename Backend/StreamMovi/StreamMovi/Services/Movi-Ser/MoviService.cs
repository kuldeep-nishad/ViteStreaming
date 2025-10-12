
using StreamMovi.Models.MovieModel;
using StreamMovi.Repository.Movi_Rep;
using StreamMovi.Repository.Movi_Rep.Interface;
using StreamMovi.Services.Movi_Ser.Interface;
using System.ComponentModel.DataAnnotations;
using System.Data;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace StreamMovi.Services.Movi_Ser
{
    public class MoviService : IMoviService
    {
        private readonly IMoviRepository _moviRepository;
        public MoviService(IMoviRepository moviRepository)
        {
            _moviRepository = moviRepository;
        }

        public string CreateMovi(MoviModel modelDT)
        {

            string Result = String.Empty;

            try
            {
                Result = _moviRepository.CreateMovi(modelDT);
            }
            catch (Exception)
            {

                throw;
            }
            return Result;
        }

        public string DeleteMovi(int id)
        {

            string Result = String.Empty;

            try
            {
                Result = _moviRepository.DeleteMovi(id);
            }
            catch (Exception)
            {

                throw;
            }
            return Result;
        }

        public string UpdateMovi(int id, MoviModel model)
        {

            string Result = String.Empty;

            try
            {
                Result = _moviRepository.UpdateMovi(id, model);
            }
            catch (Exception)
            {

                throw;
            }
            return Result;
        }


        public List<MoviModel> GetMovies()
        {
            try
            {
                List<MoviModel> movies = new List<MoviModel>();
                DataTable datTab = _moviRepository.GetMovies(); 

                foreach (DataRow row in datTab.Rows)
                {
                    MoviModel movi = new MoviModel()
                    {
                        MovieID = Convert.ToInt32(row["MovieID"]),
                        Title = row["Title"].ToString(),
                        ReleaseDate = Convert.ToDateTime(row["ReleaseDate"]),
                        Runtime = row["Runtime"].ToString(),
                        Rating = row["Rating"].ToString(),
                        AgeRecommendation = row["AgeRecommendation"].ToString(),
                        MovieSummary = row["MovieSummary"].ToString(),
                        Keywords = row["Keywords"].ToString(),
                        PosterUrl = row["PosterUrl"].ToString(),
                        VideoUrl = row["VideoUrl"].ToString(),
                        Category = row["Category"].ToString(),
                    };

                    movies.Add(movi);
                }

                return movies; 
            }
            catch (Exception)
            {
                throw;
            }
        }

        public MoviModel GetMoviById(int id) { 

           return _moviRepository.GetMoviById(id);
        
            
        }


        public async Task<IEnumerable<MoviModel>> SearchMoviesAsync(string title)
        {
            return await _moviRepository.SearchMoviesByTitleAsync(title);
        }



    }

}


 