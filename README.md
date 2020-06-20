# Issue-Tracker application

Issue-Tracker app consists of two projects:
* [issue-tracker-api](https://github.com/TomasLight/issue-tracker-api)
* [issue-tracker-client](https://github.com/TomasLight/issue-tracker-client)

## <a name="iis"></a> IIS configuration
To configure IIS routing you should install follow extensions:
* [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
* [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing)

Default domains:
* http://issues.local:80 - client
* http://issues.local:8080 - api

If you want use other domain, you should change urls in `Issue-Tracker\Client\public\web.config` file
 