export const appUrls = {
    rootPath: "/",
    issuesPath: "/issues",
    issuePath: "/issues/{:issueId}",
    getIssuePath: (issueId: number) => `/issues/${issueId}`,

    usersPath: "/users",
};

// todo: think about improvements
// export class appUrls {
//     // sample
//     public static readonly somePagePath = new RoutePath("/Home/SPA");
//
//     public static readonly rootPath = new RoutePath("/");
//     public static readonly logoutPath = new RoutePath("/Account/LogOff");
//
//     public static readonly firstConfigurationPath = new RoutePath("/FirstConfiguration");
//     public static readonly accommodationPath = new RoutePath("/Accommodations");
//     public static readonly myBookingsPath = new RoutePath("/MyBookings");
//     public static readonly availabilitySearchPath = new RoutePath("/Availability/Search", "searchKey");
//
//     public static readonly hotelDetailsPrintUrl = new RoutePath("/Hotel/:estabId/Details/Print");
//     public static readonly hotelDetailsEmailUrl = new RoutePath("/Hotel/:estabId/Details/Email");
//
//     public static readonly csrPath = new RoutePath("/CSR/Search");
//     public static readonly faqPath = new RoutePath("/Home/FAQ");
//     public static readonly apiSpecsPath = new RoutePath("/Home/ApiSpecs");
//
//     public static readonly cmsTool = new RoutePath("/Admin");
//
//     public static readonly searchBookingIdPath = new RoutePath("/Booking/SearchById");
//     public static readonly bookingDetailsPath = new RoutePath("/Booking/Details");
//
//     public static readonly getRateDetailsPath = new RoutePath<{ searchKey: string; bookingKey: string; }>(
//         "/Hotel/GetDetails",
//         "searchKey",
//         "bookingKey");
//
//     public static readonly hotelDetailsPreviewPath = new RoutePath<{ estabId: string; }>(
//         "/render/hotel-details/preview",
//         "estabId");
//
//
//     public static readonly changePasswordPath = new HashPath("#ChangePassword");
//     public static readonly settingsHash = new HashPath("#Settings");
// }
