export class TempAjax {
    static Get = (url, callback, isAsync = true) => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", url, isAsync);
        xhr.onload = function () {
            callback(JSON.parse(xhr.responseText));
        }.bind(this);
        xhr.send();
    };
    
    static Send = (postData, postUrl, callback) => {
        $.ajax({
            url: postUrl,
            type: "POST",
            data: postData,
            success: function (data) {
                callback(data);
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    };
}