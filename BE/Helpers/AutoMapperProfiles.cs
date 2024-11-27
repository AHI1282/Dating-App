using API.DTOs.InputDTOs;
using API.DTOs.OutputDTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserOutputDto>()
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));

            CreateMap<Photo, PhotoOutputDto>();

            CreateMap<UserUpdateInputDto, AppUser>();
        }
    }
}
