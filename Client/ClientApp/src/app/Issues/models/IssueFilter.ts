import { FilterItem } from "@app/Issues/models/FilterItem";
import { FilterItemType } from "@app/Issues/models/FilterItemType";
import { IssueType } from "@app/Issues/models/IssueType";
import { Priority } from "@app/Issues/models/Priority";

export class IssueFilter {
    public filterItems: FilterItem[];

    constructor() {
        this.filterItems = [
            new FilterItem(FilterItemType.Priority, Priority.OnHold),
            new FilterItem(FilterItemType.Priority, Priority.Low),
            new FilterItem(FilterItemType.Priority, Priority.Medium),
            new FilterItem(FilterItemType.Priority, Priority.High),
            new FilterItem(FilterItemType.Priority, Priority.Critical),

            new FilterItem(FilterItemType.IssueType, IssueType.Bug),
            new FilterItem(FilterItemType.IssueType, IssueType.Investigation),
            new FilterItem(FilterItemType.IssueType, IssueType.Task),
        ];
    }

    public reassignReference(): IssueFilter {
        const filter = new IssueFilter();
        filter.filterItems = [ ...this.filterItems ];
        return filter;
    }

    public toggleItemActivation(filterItem: FilterItem) {
        const itemIndex = this.filterItems.indexOf(filterItem);
        if (itemIndex > -1) {
            filterItem.isActive = !filterItem.isActive;
            return;
        }

        const targetItem = this.filterItems.find(
            (item: FilterItem) =>
                item.type === filterItem.type &&
                item.value === filterItem.value
        );
        targetItem.isActive = !targetItem.isActive;
    }

    public any(): boolean {
        return this.count() > 0;
    }

    public count(): number {
        return this.getActiveFilters().length;
    }

    public getIssueTypeFilter(): (type: IssueType) => boolean {
        return this.getIssueFilter(FilterItemType.IssueType);
    }

    public getPriorityFilter(): (priority: Priority) => boolean {
        return this.getIssueFilter(FilterItemType.Priority);
    }

    private getIssueFilter(filterItemType: FilterItemType): (value: number) => boolean {
        return (value: number) => {
            const issueFilterItems: FilterItem[] = this
                .getActiveFilters()
                .filter((item: FilterItem) => item.type === filterItemType);

            if (issueFilterItems.length === 0) {
                return true;
            }

            return issueFilterItems.some((item: FilterItem) => item.value === value);
        };
    }

    private getActiveFilters(): FilterItem[] {
        return this.filterItems.filter((item: FilterItem) => item.isActive);
    }
}
