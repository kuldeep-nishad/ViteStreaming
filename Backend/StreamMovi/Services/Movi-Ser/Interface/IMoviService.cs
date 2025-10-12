using StreamMovi.Models.MovieModel;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;


namespace StreamMovi.Services.Movi_Ser.Interface
{
    public interface IMoviService
    {
        string CreateMovi(MoviModel modelDT);
        string UpdateMovi(int id, MoviModel model);
        string DeleteMovi(int id);

         List<MoviModel> GetMovies();

        MoviModel GetMoviById(int id);

        Task<IEnumerable<MoviModel>> SearchMoviesAsync(string title);


    }
}
