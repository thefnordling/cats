"use strict";
/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v12.0.13.0 (NJsonSchema v9.13.17.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jQuery = require("jquery");
var CatsClient = /** @class */ (function () {
    function CatsClient(baseUrl) {
        this.beforeSend = undefined;
        this.jsonParseReviver = undefined;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost/Cats";
    }
    CatsClient.prototype.get = function (onSuccess, onFail) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Cats";
        url_ = url_.replace(/[?&]$/, "");
        var jqXhr = jQuery.ajax({
            url: url_,
            beforeSend: this.beforeSend,
            type: "get",
            dataType: "text",
            headers: {
                "Accept": "application/json"
            }
        });
        jqXhr.done(function (_data, _textStatus, xhr) {
            _this.processGetWithCallbacks(url_, xhr, onSuccess, onFail);
        }).fail(function (xhr) {
            _this.processGetWithCallbacks(url_, xhr, onSuccess, onFail);
        });
        return jqXhr;
    };
    CatsClient.prototype.processGetWithCallbacks = function (_url, xhr, onSuccess, onFail) {
        try {
            var result = this.processGet(xhr);
            if (onSuccess !== undefined)
                onSuccess(result);
        }
        catch (e) {
            if (onFail !== undefined)
                onFail(e, "http_service_exception");
        }
    };
    CatsClient.prototype.processGet = function (xhr) {
        var status = xhr.status;
        var _headers = {};
        if (status === 200) {
            var _responseText = xhr.responseText;
            var result200 = null;
            var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (var _i = 0, resultData200_1 = resultData200; _i < resultData200_1.length; _i++) {
                    var item = resultData200_1[_i];
                    result200.push(Cat.fromJS(item));
                }
            }
            return result200;
        }
        else if (status !== 200 && status !== 204) {
            var _responseText = xhr.responseText;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return null;
    };
    CatsClient.prototype.insertUpdate = function (c, onSuccess, onFail) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Cats";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(c);
        var jqXhr = jQuery.ajax({
            url: url_,
            beforeSend: this.beforeSend,
            type: "post",
            data: content_,
            dataType: "text",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        jqXhr.done(function (_data, _textStatus, xhr) {
            _this.processInsertUpdateWithCallbacks(url_, xhr, onSuccess, onFail);
        }).fail(function (xhr) {
            _this.processInsertUpdateWithCallbacks(url_, xhr, onSuccess, onFail);
        });
        return jqXhr;
    };
    CatsClient.prototype.processInsertUpdateWithCallbacks = function (_url, xhr, onSuccess, onFail) {
        try {
            var result = this.processInsertUpdate(xhr);
            if (onSuccess !== undefined)
                onSuccess(result);
        }
        catch (e) {
            if (onFail !== undefined)
                onFail(e, "http_service_exception");
        }
    };
    CatsClient.prototype.processInsertUpdate = function (xhr) {
        var status = xhr.status;
        var _headers = {};
        if (status === 200) {
            var _responseText = xhr.responseText;
            var result200 = null;
            var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Cat.fromJS(resultData200) : null;
            return result200;
        }
        else if (status !== 200 && status !== 204) {
            var _responseText = xhr.responseText;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return null;
    };
    CatsClient.prototype.delete = function (c, onSuccess, onFail) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Cats";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(c);
        var jqXhr = jQuery.ajax({
            url: url_,
            beforeSend: this.beforeSend,
            type: "delete",
            data: content_,
            dataType: "text",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        jqXhr.done(function (_data, _textStatus, xhr) {
            _this.processDeleteWithCallbacks(url_, xhr, onSuccess, onFail);
        }).fail(function (xhr) {
            _this.processDeleteWithCallbacks(url_, xhr, onSuccess, onFail);
        });
        return jqXhr;
    };
    CatsClient.prototype.processDeleteWithCallbacks = function (_url, xhr, onSuccess, onFail) {
        try {
            var result = this.processDelete(xhr);
            if (onSuccess !== undefined)
                onSuccess(result);
        }
        catch (e) {
            if (onFail !== undefined)
                onFail(e, "http_service_exception");
        }
    };
    CatsClient.prototype.processDelete = function (xhr) {
        var status = xhr.status;
        var _headers = {};
        if (status === 200) {
            var _responseText = xhr.responseText;
            var result200 = null;
            var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Cat.fromJS(resultData200) : null;
            return result200;
        }
        else if (status !== 200 && status !== 204) {
            var _responseText = xhr.responseText;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return null;
    };
    return CatsClient;
}());
exports.CatsClient = CatsClient;
var Cat = /** @class */ (function () {
    function Cat(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    Cat.prototype.init = function (data) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.birth = data["birth"] ? new Date(data["birth"].toString()) : undefined;
            this.mood = data["mood"];
            this.hungry = data["hungry"];
        }
    };
    Cat.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new Cat();
        result.init(data);
        return result;
    };
    Cat.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["birth"] = this.birth ? this.birth.toISOString() : undefined;
        data["mood"] = this.mood;
        data["hungry"] = this.hungry;
        return data;
    };
    return Cat;
}());
exports.Cat = Cat;
var Mood;
(function (Mood) {
    Mood[Mood["None"] = 0] = "None";
    Mood[Mood["Red"] = 1] = "Red";
    Mood[Mood["Amber"] = 2] = "Amber";
    Mood[Mood["Green"] = 3] = "Green";
})(Mood = exports.Mood || (exports.Mood = {}));
var SwaggerException = /** @class */ (function (_super) {
    __extends(SwaggerException, _super);
    function SwaggerException(message, status, response, headers, result) {
        var _this = _super.call(this) || this;
        _this.isSwaggerException = true;
        _this.message = message;
        _this.status = status;
        _this.response = response;
        _this.headers = headers;
        _this.result = result;
        return _this;
    }
    SwaggerException.isSwaggerException = function (obj) {
        return obj.isSwaggerException === true;
    };
    return SwaggerException;
}(Error));
exports.SwaggerException = SwaggerException;
function throwException(message, status, response, headers, result) {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsd0JBQXdCO0FBQ3hCLG1CQUFtQjtBQUNuQiw2SEFBNkg7QUFDN0gsb0JBQW9CO0FBQ3BCLHdCQUF3QjtBQUN4Qix1Q0FBdUM7Ozs7Ozs7Ozs7Ozs7OztBQUV2QywrQkFBaUM7QUFFakM7SUFLSSxvQkFBWSxPQUFnQjtRQUg1QixlQUFVLEdBQVEsU0FBUyxDQUFDO1FBQ2xCLHFCQUFnQixHQUFtRCxTQUFTLENBQUM7UUFHbkYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUM7SUFDL0QsQ0FBQztJQUVELHdCQUFHLEdBQUgsVUFBSSxTQUEwQyxFQUFFLE1BQW9EO1FBQXBHLGlCQXFCQztRQXBCRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNwQixHQUFHLEVBQUUsSUFBSTtZQUNULFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixJQUFJLEVBQUUsS0FBSztZQUNYLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVBQUUsa0JBQWtCO2FBQy9CO1NBQ0osQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRztZQUMvQixLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMs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QUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN6QixDQUFDO0lBSU0sbUNBQWtCLEdBQXpCLFVBQTBCLEdBQVE7UUFDOUIsT0FBTyxHQUFHLENBQUMsa0JBQWtCLEtBQUssSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUF0QkQsQ0FBc0MsS0FBSyxHQXNCMUM7QUF0QlksNENBQWdCO0FBd0I3QixTQUFTLGNBQWMsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLFFBQWdCLEVBQUUsT0FBZ0MsRUFBRSxNQUFZO0lBQ3JILElBQUcsTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUztRQUN0QyxNQUFNLE1BQU0sQ0FBQzs7UUFFYixNQUFNLElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA8YXV0by1nZW5lcmF0ZWQ+XG4vLyAgICAgR2VuZXJhdGVkIHVzaW5nIHRoZSBOU3dhZyB0b29sY2hhaW4gdjEyLjAuMTMuMCAoTkpzb25TY2hlbWEgdjkuMTMuMTcuMCAoTmV3dG9uc29mdC5Kc29uIHYxMS4wLjAuMCkpIChodHRwOi8vTlN3YWcub3JnKVxuLy8gPC9hdXRvLWdlbmVyYXRlZD5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUmVTaGFycGVyIGRpc2FibGUgSW5jb25zaXN0ZW50TmFtaW5nXG5cbmltcG9ydCAqIGFzIGpRdWVyeSBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY2xhc3MgQ2F0c0NsaWVudCB7XG4gICAgYmFzZVVybDogc3RyaW5nO1xuICAgIGJlZm9yZVNlbmQ6IGFueSA9IHVuZGVmaW5lZDtcbiAgICBwcm90ZWN0ZWQganNvblBhcnNlUmV2aXZlcjogKChrZXk6IHN0cmluZywgdmFsdWU6IGFueSkgPT4gYW55KSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gYmFzZVVybCA/IGJhc2VVcmwgOiBcImh0dHA6Ly9sb2NhbGhvc3QvQ2F0c1wiO1xuICAgIH1cblxuICAgIGdldChvblN1Y2Nlc3M/OiAocmVzdWx0OiBDYXRbXSB8IG51bGwpID0+IHZvaWQsIG9uRmFpbD86IChleGNlcHRpb246IHN0cmluZywgcmVhc29uOiBzdHJpbmcpID0+IHZvaWQpOiBKUXVlcnlYSFIge1xuICAgICAgICBsZXQgdXJsXyA9IHRoaXMuYmFzZVVybCArIFwiL2FwaS9DYXRzXCI7XG4gICAgICAgIHVybF8gPSB1cmxfLnJlcGxhY2UoL1s/Jl0kLywgXCJcIik7XG5cbiAgICAgICAgbGV0IGpxWGhyID0galF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmxfLFxuICAgICAgICAgICAgYmVmb3JlU2VuZDogdGhpcy5iZWZvcmVTZW5kLFxuICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG4gICAgICAgIFxuICAgICAgICBqcVhoci5kb25lKChfZGF0YSwgX3RleHRTdGF0dXMsIHhocikgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzR2V0V2l0aENhbGxiYWNrcyh1cmxfLCB4aHIsIG9uU3VjY2Vzcywgb25GYWlsKTtcbiAgICAgICAgfSkuZmFpbCgoeGhyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NHZXRXaXRoQ2FsbGJhY2tzKHVybF8sIHhociwgb25TdWNjZXNzLCBvbkZhaWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ganFYaHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzR2V0V2l0aENhbGxiYWNrcyhfdXJsOiBzdHJpbmcsIHhocjogYW55LCBvblN1Y2Nlc3M/OiBhbnksIG9uRmFpbD86IGFueSk6IHZvaWQge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucHJvY2Vzc0dldCh4aHIpO1xuICAgICAgICAgICAgaWYgKG9uU3VjY2VzcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG9uU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAob25GYWlsICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgb25GYWlsKGUsIFwiaHR0cF9zZXJ2aWNlX2V4Y2VwdGlvblwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcm9jZXNzR2V0KHhocjogYW55KTogQ2F0W10gfCBudWxsIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cbiAgICAgICAgbGV0IF9oZWFkZXJzOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBfcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIGxldCByZXN1bHQyMDA6IGFueSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcmVzdWx0RGF0YTIwMCA9IF9yZXNwb25zZVRleHQgPT09IFwiXCIgPyBudWxsIDogSlNPTi5wYXJzZShfcmVzcG9uc2VUZXh0LCB0aGlzLmpzb25QYXJzZVJldml2ZXIpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdERhdGEyMDAgJiYgcmVzdWx0RGF0YTIwMC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQyMDAgPSBbXSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiByZXN1bHREYXRhMjAwKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQyMDAhLnB1c2goQ2F0LmZyb21KUyhpdGVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0MjAwO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyAhPT0gMjAwICYmIHN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgICAgICBjb25zdCBfcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0V4Y2VwdGlvbihcIkFuIHVuZXhwZWN0ZWQgc2VydmVyIGVycm9yIG9jY3VycmVkLlwiLCBzdGF0dXMsIF9yZXNwb25zZVRleHQsIF9oZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpbnNlcnRVcGRhdGUoYzogQ2F0LCBvblN1Y2Nlc3M/OiAocmVzdWx0OiBDYXQgfCBudWxsKSA9PiB2b2lkLCBvbkZhaWw/OiAoZXhjZXB0aW9uOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nKSA9PiB2b2lkKTogSlF1ZXJ5WEhSIHtcbiAgICAgICAgbGV0IHVybF8gPSB0aGlzLmJhc2VVcmwgKyBcIi9hcGkvQ2F0c1wiO1xuICAgICAgICB1cmxfID0gdXJsXy5yZXBsYWNlKC9bPyZdJC8sIFwiXCIpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRfID0gSlNPTi5zdHJpbmdpZnkoYyk7XG5cbiAgICAgICAgbGV0IGpxWGhyID0galF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmxfLFxuICAgICAgICAgICAgYmVmb3JlU2VuZDogdGhpcy5iZWZvcmVTZW5kLFxuICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXG4gICAgICAgICAgICBkYXRhOiBjb250ZW50XyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgICAgICBcbiAgICAgICAganFYaHIuZG9uZSgoX2RhdGEsIF90ZXh0U3RhdHVzLCB4aHIpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0luc2VydFVwZGF0ZVdpdGhDYWxsYmFja3ModXJsXywgeGhyLCBvblN1Y2Nlc3MsIG9uRmFpbCk7XG4gICAgICAgIH0pLmZhaWwoKHhocikgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzSW5zZXJ0VXBkYXRlV2l0aENhbGxiYWNrcyh1cmxfLCB4aHIsIG9uU3VjY2Vzcywgb25GYWlsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGpxWGhyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0luc2VydFVwZGF0ZVdpdGhDYWxsYmFja3MoX3VybDogc3RyaW5nLCB4aHI6IGFueSwgb25TdWNjZXNzPzogYW55LCBvbkZhaWw/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnByb2Nlc3NJbnNlcnRVcGRhdGUoeGhyKTtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKG9uRmFpbCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG9uRmFpbChlLCBcImh0dHBfc2VydmljZV9leGNlcHRpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0luc2VydFVwZGF0ZSh4aHI6IGFueSk6IENhdCB8IG51bGwgfCBudWxsIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0geGhyLnN0YXR1cztcblxuICAgICAgICBsZXQgX2hlYWRlcnM6IGFueSA9IHt9O1xuICAgICAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IF9yZXNwb25zZVRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgbGV0IHJlc3VsdDIwMDogYW55ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCByZXN1bHREYXRhMjAwID0gX3Jlc3BvbnNlVGV4dCA9PT0gXCJcIiA/IG51bGwgOiBKU09OLnBhcnNlKF9yZXNwb25zZVRleHQsIHRoaXMuanNvblBhcnNlUmV2aXZlcik7XG4gICAgICAgICAgICByZXN1bHQyMDAgPSByZXN1bHREYXRhMjAwID8gQ2F0LmZyb21KUyhyZXN1bHREYXRhMjAwKSA6IDxhbnk+bnVsbDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQyMDA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzICE9PSAyMDAgJiYgc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgICAgIGNvbnN0IF9yZXNwb25zZVRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXhjZXB0aW9uKFwiQW4gdW5leHBlY3RlZCBzZXJ2ZXIgZXJyb3Igb2NjdXJyZWQuXCIsIHN0YXR1cywgX3Jlc3BvbnNlVGV4dCwgX2hlYWRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRlbGV0ZShjOiBDYXQsIG9uU3VjY2Vzcz86IChyZXN1bHQ6IENhdCB8IG51bGwpID0+IHZvaWQsIG9uRmFpbD86IChleGNlcHRpb246IHN0cmluZywgcmVhc29uOiBzdHJpbmcpID0+IHZvaWQpOiBKUXVlcnlYSFIge1xuICAgICAgICBsZXQgdXJsXyA9IHRoaXMuYmFzZVVybCArIFwiL2FwaS9DYXRzXCI7XG4gICAgICAgIHVybF8gPSB1cmxfLnJlcGxhY2UoL1s/Jl0kLywgXCJcIik7XG5cbiAgICAgICAgY29uc3QgY29udGVudF8gPSBKU09OLnN0cmluZ2lmeShjKTtcblxuICAgICAgICBsZXQganFYaHIgPSBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybF8sXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiB0aGlzLmJlZm9yZVNlbmQsXG4gICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgZGF0YTogY29udGVudF8sXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIFxuICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcbiAgICAgICAgXG4gICAgICAgIGpxWGhyLmRvbmUoKF9kYXRhLCBfdGV4dFN0YXR1cywgeGhyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NEZWxldGVXaXRoQ2FsbGJhY2tzKHVybF8sIHhociwgb25TdWNjZXNzLCBvbkZhaWwpO1xuICAgICAgICB9KS5mYWlsKCh4aHIpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0RlbGV0ZVdpdGhDYWxsYmFja3ModXJsXywgeGhyLCBvblN1Y2Nlc3MsIG9uRmFpbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqcVhocjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NEZWxldGVXaXRoQ2FsbGJhY2tzKF91cmw6IHN0cmluZywgeGhyOiBhbnksIG9uU3VjY2Vzcz86IGFueSwgb25GYWlsPzogYW55KTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wcm9jZXNzRGVsZXRlKHhocik7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChvbkZhaWwgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBvbkZhaWwoZSwgXCJodHRwX3NlcnZpY2VfZXhjZXB0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NEZWxldGUoeGhyOiBhbnkpOiBDYXQgfCBudWxsIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cbiAgICAgICAgbGV0IF9oZWFkZXJzOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBfcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIGxldCByZXN1bHQyMDA6IGFueSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgcmVzdWx0RGF0YTIwMCA9IF9yZXNwb25zZVRleHQgPT09IFwiXCIgPyBudWxsIDogSlNPTi5wYXJzZShfcmVzcG9uc2VUZXh0LCB0aGlzLmpzb25QYXJzZVJldml2ZXIpO1xuICAgICAgICAgICAgcmVzdWx0MjAwID0gcmVzdWx0RGF0YTIwMCA/IENhdC5mcm9tSlMocmVzdWx0RGF0YTIwMCkgOiA8YW55Pm51bGw7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0MjAwO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyAhPT0gMjAwICYmIHN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgICAgICBjb25zdCBfcmVzcG9uc2VUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0V4Y2VwdGlvbihcIkFuIHVuZXhwZWN0ZWQgc2VydmVyIGVycm9yIG9jY3VycmVkLlwiLCBzdGF0dXMsIF9yZXNwb25zZVRleHQsIF9oZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXQgaW1wbGVtZW50cyBJQ2F0IHtcbiAgICBpZD86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBuYW1lPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGJpcnRoITogRGF0ZTtcbiAgICBtb29kITogTW9vZDtcbiAgICBodW5ncnkhOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YT86IElDYXQpIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnRoaXMpW3Byb3BlcnR5XSA9ICg8YW55PmRhdGEpW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoZGF0YT86IGFueSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IGRhdGFbXCJpZFwiXTtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGRhdGFbXCJuYW1lXCJdO1xuICAgICAgICAgICAgdGhpcy5iaXJ0aCA9IGRhdGFbXCJiaXJ0aFwiXSA/IG5ldyBEYXRlKGRhdGFbXCJiaXJ0aFwiXS50b1N0cmluZygpKSA6IDxhbnk+dW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tb29kID0gZGF0YVtcIm1vb2RcIl07XG4gICAgICAgICAgICB0aGlzLmh1bmdyeSA9IGRhdGFbXCJodW5ncnlcIl07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUpTKGRhdGE6IGFueSk6IENhdCB7XG4gICAgICAgIGRhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgPyBkYXRhIDoge307XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2F0KCk7XG4gICAgICAgIHJlc3VsdC5pbml0KGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRvSlNPTihkYXRhPzogYW55KSB7XG4gICAgICAgIGRhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgPyBkYXRhIDoge307XG4gICAgICAgIGRhdGFbXCJpZFwiXSA9IHRoaXMuaWQ7XG4gICAgICAgIGRhdGFbXCJuYW1lXCJdID0gdGhpcy5uYW1lO1xuICAgICAgICBkYXRhW1wiYmlydGhcIl0gPSB0aGlzLmJpcnRoID8gdGhpcy5iaXJ0aC50b0lTT1N0cmluZygpIDogPGFueT51bmRlZmluZWQ7XG4gICAgICAgIGRhdGFbXCJtb29kXCJdID0gdGhpcy5tb29kO1xuICAgICAgICBkYXRhW1wiaHVuZ3J5XCJdID0gdGhpcy5odW5ncnk7XG4gICAgICAgIHJldHVybiBkYXRhOyBcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNhdCB7XG4gICAgaWQ/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbmFtZT86IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBiaXJ0aDogRGF0ZTtcbiAgICBtb29kOiBNb29kO1xuICAgIGh1bmdyeTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGVudW0gTW9vZCB7XG4gICAgTm9uZSA9IDAsIFxuICAgIFJlZCA9IDEsIFxuICAgIEFtYmVyID0gMiwgXG4gICAgR3JlZW4gPSAzLCBcbn1cblxuZXhwb3J0IGNsYXNzIFN3YWdnZXJFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHN0YXR1czogbnVtYmVyOyBcbiAgICByZXNwb25zZTogc3RyaW5nOyBcbiAgICBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfTtcbiAgICByZXN1bHQ6IGFueTsgXG5cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCByZXNwb25zZTogc3RyaW5nLCBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSwgcmVzdWx0OiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNTd2FnZ2VyRXhjZXB0aW9uID0gdHJ1ZTtcblxuICAgIHN0YXRpYyBpc1N3YWdnZXJFeGNlcHRpb24ob2JqOiBhbnkpOiBvYmogaXMgU3dhZ2dlckV4Y2VwdGlvbiB7XG4gICAgICAgIHJldHVybiBvYmouaXNTd2FnZ2VyRXhjZXB0aW9uID09PSB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGhyb3dFeGNlcHRpb24obWVzc2FnZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgcmVzcG9uc2U6IHN0cmluZywgaGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0sIHJlc3VsdD86IGFueSk6IGFueSB7XG4gICAgaWYocmVzdWx0ICE9PSBudWxsICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aHJvdyByZXN1bHQ7XG4gICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgU3dhZ2dlckV4Y2VwdGlvbihtZXNzYWdlLCBzdGF0dXMsIHJlc3BvbnNlLCBoZWFkZXJzLCBudWxsKTtcbn0iXX0=