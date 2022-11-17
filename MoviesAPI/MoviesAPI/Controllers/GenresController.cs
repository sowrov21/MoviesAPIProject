using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Helpers;
using MoviesAPI.Models;
using MoviesAPI.Models.DTO_Models;
using MoviesAPI.Repository.IRepository;

namespace MoviesAPI.Controllers
{
 
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

       public GenresController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }



        //[HttpGet("Get")]
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<GenreDTO>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queyable = _unitOfWork.Genre.GetAll().AsQueryable();
            HttpContext.InsertParametersPaginationHeader(queyable);
            var genre = queyable.OrderBy(x => x.Name).Paginate(paginationDTO).ToList();
            #region  Default Mapping Example
/*            var genreDTOList = new List<GenreDTO>();

            foreach (var item in genre)
            {
                GenreDTO gnDTO = new GenreDTO()
                {
                    Id = item.Id,
                    Name = item.Name,
                };
                genreDTOList.Add(gnDTO);
            }

            return genreDTOList;*/
            #endregion
            return _mapper.Map<List<GenreDTO>>(genre);
        }

        [HttpPost]
        public ActionResult Post(GenreCreationDTO genreDTO)
        {
            var genre = _mapper.Map<Genre>(genreDTO);
            if (genre != null)
            {
                _unitOfWork.Genre.Add(genre);
                _unitOfWork.Save();
                return NoContent();
            }
            return NoContent();
        }

        [HttpGet("{id:int}", Name ="getGenre")]
        public ActionResult<GenreDTO> Get(int id)
        {

            var genre = _unitOfWork.Genre.GetFirstOrDefault(x => x.Id == id);
            if (genre != null)
            {
                var gen = _mapper.Map<GenreDTO>(genre);

                return gen;
            }
            return NoContent();

        }
        [HttpPut("{id:int}")]
        public ActionResult Put(int id,Genre gen)
        {
            _unitOfWork.Genre.Update(gen);
            _unitOfWork.Save();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public ActionResult<GenreDTO> Delete(int id)
        {

            var genre = _unitOfWork.Genre.GetFirstOrDefault(x => x.Id == id);
            if (genre != null)
            {
                _unitOfWork.Genre.Remove(genre);
                _unitOfWork.Save();
            }
            return NoContent();

        }

    }
}
