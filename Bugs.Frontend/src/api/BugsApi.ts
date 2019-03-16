export class BugsApi {
    public static getBugs() {
        return "api/bugs";
    }

    public static getBug(bugId: number) {
        return `api/bugs/${bugId}`;
    }

    public static postBug() {
        return "api/bugs/";
    }

    public static putBug(bugId:number) {
        return `api/bugs/${bugId}`;
    }

    public static deleteBug(bugId:number) {
        return `api/bugs/${bugId}`;
    }
}