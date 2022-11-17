using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Helpers;
using MoviesAPI.Models;
using MoviesAPI.Models.DTO_Models;
using MoviesAPI.Repository.IRepository;

namespace MoviesAPI.Controllers
{
    [Route("api/actors")]
    [ApiController]
   
    public class ActorsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IFileStorageService fileStorageService;

        public ActorsController(IUnitOfWork unitOfWork, IMapper mapper, IFileStorageService fileStorageService)
        {
            _unitOfWork = unitOfWork;
            _mapper     = mapper;
            this.fileStorageService = fileStorageService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ActorDTO>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queyable = _unitOfWork.Actor.GetAll().AsQueryable();
            HttpContext.InsertParametersPaginationHeader(queyable);
            var actor = queyable.OrderBy(x => x.Name).Paginate(paginationDTO).ToList();
            return _mapper.Map<List<ActorDTO>>(actor);
        }

        [HttpGet("{id:int}", Name = "getActor")]
        public ActionResult<ActorDTO> Get(int id)
        {

            var actor = _unitOfWork.Actor.GetFirstOrDefault(x => x.Id == id);
            if (actor != null)
            {
                var gen = _mapper.Map<ActorDTO>(actor);

                return gen;
            }
            return NoContent();

        }

        [HttpPost]
        public ActionResult Post([FromForm] ActorCreationDTO actorCreationDTO)
        {
            var actor = _mapper.Map<Actor>(actorCreationDTO);

            if (actor != null)
            {

                if (actorCreationDTO.Picture != null)
                {
                    actor.Picture = fileStorageService.SaveFile("actors", actorCreationDTO.Picture);
            }
                _unitOfWork.Actor.Add(actor);
                _unitOfWork.Save();
                return NoContent();
            }
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public ActionResult Put(int id, [FromForm] ActorCreationDTO actorCreationDTO)
        {

            var actor = _unitOfWork.Actor.GetFirstOrDefault(x=>x.Id == id);

                actor = _mapper.Map(actorCreationDTO,actor);

            if (actor != null)
            {

                if (actorCreationDTO.Picture != null)
                {
                    actor.Picture = fileStorageService.EditFile("actors", actorCreationDTO.Picture,actor.Picture);
                }
                _unitOfWork.Actor.Update(actor);
                _unitOfWork.Save();
                return NoContent();
            }
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public ActionResult<ActorDTO> Delete(int id)
        {

            var actor = _unitOfWork.Actor.GetFirstOrDefault(x => x.Id == id);
            if (actor != null)
            {
                _unitOfWork.Actor.Remove(actor);
                _unitOfWork.Save();
                fileStorageService.DeleteFile(actor.Picture, "actors");

            }
            return NoContent();

        }

    }
}
