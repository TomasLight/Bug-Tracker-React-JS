import uuidv4 from "uuid/v4";

export class Guid {
    private guid: string;

    constructor() {
        this.guid = uuidv4();
    }

    public get get(): string {
        return this.guid;
    }

    public generate(): string {
        this.guid = uuidv4();
        return this.guid;
    }

    public static generate(): string {
        const guid = new Guid();
        return guid.generate();
    }
}
