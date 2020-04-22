export class MappingProfileBase {
    protected static autoMap<TSource, TDestination>(
        sourceModel: TSource,
        destinationModel: TDestination
    ): TDestination {

        const destinationPropertyNames = Object.keys(destinationModel);
        destinationPropertyNames.forEach((propertyName: string) => {
            if (propertyName in sourceModel) {
                destinationModel[propertyName] = sourceModel[propertyName];
            }
        });

        return destinationModel;
    }
}
