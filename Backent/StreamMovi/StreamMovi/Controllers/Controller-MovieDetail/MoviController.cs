using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamMovi.Models.MovieModel;
using StreamMovi.Services.Movi_Ser;
using StreamMovi.Services.Movi_Ser.Interface;


namespace StreamMovi.Controllers.Controller_MovieDetail
{

    [ApiController]
    [Route("api/[controller]")]
    public class MoviController : Controller
    {
        private readonly IMoviService _moviService;
        public MoviController(IMoviService moviService)
        {
            _moviService = moviService;
        }

        [HttpPost]
        public ActionResult<String> PostUser(MoviModel modelDT)
        {
            string Result = String.Empty;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Result = _moviService.CreateMovi(modelDT);
            }
            catch (Exception)
            {
                throw;
            }
            return Result;
        }

        [HttpDelete("{id}")]
        public ActionResult<String> DeleteUser(int id)
        {

            string Result = String.Empty;
            if (id > 0)
            {
                try
                {
                    Result = _moviService.DeleteMovi(id);
                }
                catch (Exception)
                {

                    throw;
                }
            }
            return Result;

        }


        [HttpPut("{id}")]

        public ActionResult<String> PutUser(int id, MoviModel model)
        {

            string Result = String.Empty;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Result = _moviService.UpdateMovi(id, model);
            }
            catch (Exception)
            {

                throw;
            }
            return Result;
        }


        [HttpGet(Name ="GetMovies")]

        public List<MoviModel> GetMovies() 
        {

            List<MoviModel> movies;

                try
            {
                movies = _moviService.GetMovies().ToList();
            } catch (Exception) { 
            
                throw;
            }
            return movies;
        }


        [HttpGet("{id}")]

        public ActionResult<MoviModel> GetMoviById(int id) {


            var MoviDtil = _moviService.GetMoviById(id);
               if (MoviDtil == null)
            {
                return NotFound();
            }
            return MoviDtil;
           

        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string title)
        {
            if (string.IsNullOrEmpty(title))
                return BadRequest("Search title cannot be empty");

            var movies = await _moviService.SearchMoviesAsync(title);
            return Ok(movies);
        }


    }
}

