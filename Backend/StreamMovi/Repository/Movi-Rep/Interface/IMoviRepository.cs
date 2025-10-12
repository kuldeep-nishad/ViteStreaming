using StreamMovi.Models.MovieModel;
using System.Data;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;


namespace StreamMovi.Repository.Movi_Rep.Interface
{
    public interface IMoviRepository
    {
        string CreateMovi(MoviModel modelDT);
        string UpdateMovi(int id, MoviModel model);
        string DeleteMovi(int id);

        DataTable GetMovies();

        MoviModel GetMoviById(int id);

        Task<IEnumerable<MoviModel>> SearchMoviesByTitleAsync(string title);
    }
}
