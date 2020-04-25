export const appUrls = {
    rootPath: "/",

    issuesPath: "/issues",
    issuePath: "/issues/{:issueId}",
    getIssuePath: (issueId: number) => `/issues/${issueId}`,

    usersPath: "/users",
};
