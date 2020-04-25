import { IssueMappingProfile } from "@config/mapper/profiles/IssueMappingProfile";
import { Mapper } from "@utils/mapping/Mapper";

export function configureMapper() {
    Mapper.addProfiles([
        new IssueMappingProfile(),
    ]);
}
