using AutoMapper;
using MoviesAPI.Models;
using MoviesAPI.Models.DTO_Models;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfileSettings : Profile
    {
        public AutoMapperProfileSettings()
        {
           // CreateMap<Tsource, TDestination>();
           CreateMap<GenreDTO,Genre>().ReverseMap();
           CreateMap<GenreCreationDTO,Genre>().ReverseMap();
            CreateMap<ActorDTO, Actor>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>().ReverseMap();
        }
    }
}
