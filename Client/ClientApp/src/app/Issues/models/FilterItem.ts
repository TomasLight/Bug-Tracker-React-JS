import { FilterItemType } from "@app/Issues/models/FilterItemType";

export class FilterItem {
    public type: FilterItemType;
    public value: number;
    public isActive: boolean;

    constructor(type: FilterItemType, value: number) {
        this.type = type;
        this.value = value;
        this.isActive = false;
    }
}
