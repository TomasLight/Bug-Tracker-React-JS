export class AppProviderStore {
    public initialized: boolean;

    public targetActionsAmount: number;
    public initializedActionsAmount: number;

    constructor() {
        this.initialized = false;

        this.initializedActionsAmount = 0;
        this.targetActionsAmount = 0;
    }
}
