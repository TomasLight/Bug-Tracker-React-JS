# Issue-Tracker application

* [Demo](#demo)
* [IIS configuration](#iis)


### <a name="demo"></a> Demo

App interface implementation

### <a name="demo-youtube"></a> Youtube video
[Youtube](https://youtu.be/zve6vxPFMuQ)

### <a name="demo-screenshots"></a> Screenshots
##### Issue page
![Issue page screenshot 1](./README/IssuePage_001.png)

##### Filter issues
![Issue page screenshot 2](./README/IssuePage_002.png)
![Issue page screenshot 3](./README/IssuePage_003.png)

##### Create issue
![Issue page - Create new issue screenshot 1](./README/IssuePage_Create_001.png)
![Issue page - Create new issue screenshot 2](./README/IssuePage_Create_002.png)

##### Edit issue
![Issue page - Edit issue screenshot 1](./README/IssuePage_Edit_001.png)

## <a name="iis"></a> IIS configuration
To configure IIS routing you should install follow extensions:
* [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
* [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing)

Default domains:
* http://issues.local:80 - client
* http://issues.local:8080 - api

If you want use other domain, you should change urls in `Issue-Tracker\Client\public\web.config` file
 