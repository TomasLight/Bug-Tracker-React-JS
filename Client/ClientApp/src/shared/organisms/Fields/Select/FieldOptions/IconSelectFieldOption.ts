import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";

export class IconSelectFieldOption extends SelectFieldOption<number> {
    constructor(option?: { id: any; title: any }) {
        super(option);
    }

    public emptySingleValue(): number {
        return 0;
    }

    public emptyOption = (): IconSelectFieldOption => {
        return new IconSelectFieldOption();
    };
}
