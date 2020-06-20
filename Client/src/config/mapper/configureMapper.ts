import { IssueMappingProfile } from "@config/mapper/profiles/IssueMappingProfile";
import { UserMappingProfile } from "@config/mapper/profiles/UserMappingProfile";
import { Mapper } from "@utils/mapping/Mapper";

export function configureMapper() {
    Mapper.addProfiles([
        new IssueMappingProfile(),
        new UserMappingProfile(),
    ]);
}
