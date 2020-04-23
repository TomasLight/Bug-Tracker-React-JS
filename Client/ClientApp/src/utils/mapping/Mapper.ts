import { IMapKey } from "./IMapKey";
import { IMapFunction } from "./IMapFunction";
import { IMappingProfile } from "./IMappingProfile";

export class Mapper {
    private static mapFunctions: IMapFunction[] = [];

    private static findByKey(key: IMapKey) {
        return Mapper.find(key.sourceType, key.destinationType);
    }

    private static find(sourceType: string, destinationType: string) {
        return Mapper.mapFunctions.find(
            (mapFunction: IMapFunction) =>
                mapFunction.key.sourceType === sourceType &&
                mapFunction.key.destinationType === destinationType
        );
    }

    public static addProfiles(profiles: IMappingProfile[]) {
        profiles.forEach((profile: IMappingProfile) => Mapper.addProfile(profile));
    }

    public static addProfile(profile: IMappingProfile) {
        profile.get().forEach((mapFunction: IMapFunction) => {
            const addedMapFunction = Mapper.findByKey(mapFunction.key);
            if (addedMapFunction) {
                throw Error(`Adding mapping failed: the mapping key already added (sourceType: ${mapFunction.key.sourceType}, destinationType: ${mapFunction.key.destinationType})`);
            }

            Mapper.mapFunctions.push(mapFunction);
        });
    }

    public static map<TDestination>(
        sourceType: string,
        destinationType: string,
        sourceModel: any,
        destinationModel?: TDestination
    ): TDestination {
        const mapFunction: IMapFunction = Mapper.find(sourceType, destinationType);
        if (!mapFunction) {
            throw Error(`A mapping for types not registered (sourceType: ${mapFunction.key.sourceType}, destinationType: ${mapFunction.key.destinationType})`);
        }
        return mapFunction.map(sourceModel, destinationModel);
    }
}
