/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"site": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./Scripts/site.ts","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/site.ts":
/*!*************************!*\
  !*** ./Scripts/site.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
__webpack_require__(/*! ../scss/_bootstrap-custom.scss */ "./scss/_bootstrap-custom.scss");
var ag_grid_community_1 = __webpack_require__(/*! ag-grid-community */ "./node_modules/ag-grid-community/main.js");
__webpack_require__(/*! ag-grid-community/dist/styles/ag-grid.css */ "./node_modules/ag-grid-community/dist/styles/ag-grid.css");
__webpack_require__(/*! ag-grid-community/dist/styles/ag-theme-balham.css */ "./node_modules/ag-grid-community/dist/styles/ag-theme-balham.css");
var signalR = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
var Site = /** @class */ (function () {
    function Site() {
        this.gridOptions = {};
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/HoldingsGrid/hub")
            .build();
        this.$catModal = $('#cat-modal');
        this.$catTitle = $('#cat-modal-title');
        this.$confirmSave = $('#confirm-save');
        this.$deleteModal = $('#delete-modal');
        this.$deleteCatName = $('#delete-modal-cat-name');
        this.$confirmDelete = $('#confirm-delete');
        this.gridOptions.columnDefs = this.getColumns();
        this.gridOptions.getRowNodeId = function (cat) { return cat.id || ""; };
        this.gridOptions.rowSelection = 'single';
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableCellChangeFlash = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.rowData = [];
        var eGridDiv = document.querySelector('#cat-grid');
        new ag_grid_community_1.Grid(eGridDiv, this.gridOptions);
        $('.modal-action').click(function (e) {
            var $target = $(e.target);
            if ($target.data('action') && $target.data('target')) {
                $($target.data('target')).data('action', $target.data('action'));
            }
        });
    }
    Site.prototype.getColumns = function () {
        return [
            { headerName: "Id", field: "id" },
            { headerName: "Name", field: "name" },
            { headerName: "Birth", field: "birth" },
            { headerName: "Hungry", field: "hungry" },
            { headerName: "Mood", field: "mood" }
        ];
    };
    return Site;
}());
new Site();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQkFBbUI7QUFDbkIsMENBQXdDO0FBQ3hDLHVEQUFrSDtBQUNsSCxxREFBbUQ7QUFDbkQsNkRBQTJEO0FBQzNELHlDQUEyQztBQUczQztJQWNJO1FBYlUsZ0JBQVcsR0FBZ0IsRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsb0JBQW9CLEVBQUU7YUFDdkQsT0FBTyxDQUFDLG1CQUFtQixDQUFDO2FBQzVCLEtBQUssRUFBRSxDQUFDO1FBRWIsY0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixjQUFTLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsaUJBQVksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbEMsaUJBQVksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEMsbUJBQWMsR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM3QyxtQkFBYyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBR2xDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxVQUFDLEdBQVEsSUFBSyxPQUFBLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFaLENBQVksQ0FBQztRQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFOUIsSUFBTSxRQUFRLEdBQTZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0UsSUFBSSx3QkFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQW9CO1lBQzFDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2xELENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDcEU7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCx5QkFBVSxHQUFWO1FBQ0ksT0FBTztZQUNILEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1lBQ2pDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1lBQ3JDLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQ3ZDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO1lBQ3pDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1NBQ3hDLENBQUE7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUFFRCxJQUFJLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdib290c3RyYXAnO1xyXG5pbXBvcnQgXCIuLi9zY3NzL19ib290c3RyYXAtY3VzdG9tLnNjc3NcIjtcclxuaW1wb3J0IHsgR3JpZCwgR3JpZE9wdGlvbnMsIFJvd05vZGUsIFJvd1ZhbHVlQ2hhbmdlZEV2ZW50LCBSb3dEYXRhVXBkYXRlZEV2ZW50LCBDb2xEZWYgfSBmcm9tIFwiYWctZ3JpZC1jb21tdW5pdHlcIjtcclxuaW1wb3J0IFwiYWctZ3JpZC1jb21tdW5pdHkvZGlzdC9zdHlsZXMvYWctZ3JpZC5jc3NcIjtcclxuaW1wb3J0IFwiYWctZ3JpZC1jb21tdW5pdHkvZGlzdC9zdHlsZXMvYWctdGhlbWUtYmFsaGFtLmNzc1wiO1xyXG5pbXBvcnQgKiBhcyBzaWduYWxSIGZyb20gXCJAYXNwbmV0L3NpZ25hbHJcIjtcclxuaW1wb3J0IHsgQ2F0IH0gZnJvbSBcIi4vbW9kZWxzXCI7XHJcblxyXG5jbGFzcyBTaXRlIHtcclxuICAgIHByb3RlY3RlZCBncmlkT3B0aW9ucyA9IDxHcmlkT3B0aW9ucz57fTtcclxuICAgIHByb3RlY3RlZCBodWJDb25uZWN0aW9uID0gbmV3IHNpZ25hbFIuSHViQ29ubmVjdGlvbkJ1aWxkZXIoKVxyXG4gICAgICAgIC53aXRoVXJsKFwiL0hvbGRpbmdzR3JpZC9odWJcIilcclxuICAgICAgICAuYnVpbGQoKTtcclxuXHJcbiAgICAkY2F0TW9kYWwgPSAkKCcjY2F0LW1vZGFsJyk7XHJcbiAgICAkY2F0VGl0bGUgPSAkKCcjY2F0LW1vZGFsLXRpdGxlJyk7XHJcbiAgICAkY29uZmlybVNhdmUgPSAkKCcjY29uZmlybS1zYXZlJyk7XHJcblxyXG4gICAgJGRlbGV0ZU1vZGFsID0gJCgnI2RlbGV0ZS1tb2RhbCcpO1xyXG4gICAgJGRlbGV0ZUNhdE5hbWUgPSAkKCcjZGVsZXRlLW1vZGFsLWNhdC1uYW1lJyk7XHJcbiAgICAkY29uZmlybURlbGV0ZSA9ICQoJyNjb25maXJtLWRlbGV0ZScpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuY29sdW1uRGVmcyA9IHRoaXMuZ2V0Q29sdW1ucygpO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZ2V0Um93Tm9kZUlkID0gKGNhdDogQ2F0KSA9PiBjYXQuaWQgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbiA9ICdzaW5nbGUnO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlU29ydGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVDZWxsQ2hhbmdlRmxhc2ggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQ29sUmVzaXplID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnJvd0RhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3QgZUdyaWREaXY6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtZ3JpZCcpO1xyXG4gICAgICAgIG5ldyBHcmlkKGVHcmlkRGl2LCB0aGlzLmdyaWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgJCgnLm1vZGFsLWFjdGlvbicpLmNsaWNrKChlOiBKUXVlcnkuQ2xpY2tFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpICYmICR0YXJnZXQuZGF0YSgndGFyZ2V0JykpIHtcclxuICAgICAgICAgICAgICAgICQoJHRhcmdldC5kYXRhKCd0YXJnZXQnKSkuZGF0YSgnYWN0aW9uJywgJHRhcmdldC5kYXRhKCdhY3Rpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldENvbHVtbnMoKTogQ29sRGVmW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJJZFwiLCBmaWVsZDogXCJpZFwiIH0sXHJcbiAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJOYW1lXCIsIGZpZWxkOiBcIm5hbWVcIiB9LFxyXG4gICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiQmlydGhcIiwgZmllbGQ6IFwiYmlydGhcIiB9LFxyXG4gICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiSHVuZ3J5XCIsIGZpZWxkOiBcImh1bmdyeVwiIH0sXHJcbiAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJNb29kXCIsIGZpZWxkOiBcIm1vb2RcIiB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgU2l0ZSgpOyJdfQ==
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vU2NyaXB0cy9zaXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQix1QkFBdUI7QUFDdkM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEpBLHlDQUFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQU8sQ0FBQyxnRUFBVztBQUNuQixtQkFBTyxDQUFDLHFFQUFnQztBQUN4QywwQkFBMEIsbUJBQU8sQ0FBQyxtRUFBbUI7QUFDckQsbUJBQU8sQ0FBQywyR0FBMkM7QUFDbkQsbUJBQU8sQ0FBQywySEFBbUQ7QUFDM0QsY0FBYyxtQkFBTyxDQUFDLHlFQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxxQkFBcUI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0NBQWdDO0FBQzdDLGFBQWEsb0NBQW9DO0FBQ2pELGFBQWEsc0NBQXNDO0FBQ25ELGFBQWEsd0NBQXdDO0FBQ3JELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSwyQ0FBMkMsMmxLIiwiZmlsZSI6InNpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNpdGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL1NjcmlwdHMvc2l0ZS50c1wiLFwidmVuZG9yc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnJlcXVpcmUoXCJib290c3RyYXBcIik7XHJcbnJlcXVpcmUoXCIuLi9zY3NzL19ib290c3RyYXAtY3VzdG9tLnNjc3NcIik7XHJcbnZhciBhZ19ncmlkX2NvbW11bml0eV8xID0gcmVxdWlyZShcImFnLWdyaWQtY29tbXVuaXR5XCIpO1xyXG5yZXF1aXJlKFwiYWctZ3JpZC1jb21tdW5pdHkvZGlzdC9zdHlsZXMvYWctZ3JpZC5jc3NcIik7XHJcbnJlcXVpcmUoXCJhZy1ncmlkLWNvbW11bml0eS9kaXN0L3N0eWxlcy9hZy10aGVtZS1iYWxoYW0uY3NzXCIpO1xyXG52YXIgc2lnbmFsUiA9IHJlcXVpcmUoXCJAYXNwbmV0L3NpZ25hbHJcIik7XHJcbnZhciBTaXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU2l0ZSgpIHtcclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zID0ge307XHJcbiAgICAgICAgdGhpcy5odWJDb25uZWN0aW9uID0gbmV3IHNpZ25hbFIuSHViQ29ubmVjdGlvbkJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAud2l0aFVybChcIi9Ib2xkaW5nc0dyaWQvaHViXCIpXHJcbiAgICAgICAgICAgIC5idWlsZCgpO1xyXG4gICAgICAgIHRoaXMuJGNhdE1vZGFsID0gJCgnI2NhdC1tb2RhbCcpO1xyXG4gICAgICAgIHRoaXMuJGNhdFRpdGxlID0gJCgnI2NhdC1tb2RhbC10aXRsZScpO1xyXG4gICAgICAgIHRoaXMuJGNvbmZpcm1TYXZlID0gJCgnI2NvbmZpcm0tc2F2ZScpO1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZU1vZGFsID0gJCgnI2RlbGV0ZS1tb2RhbCcpO1xyXG4gICAgICAgIHRoaXMuJGRlbGV0ZUNhdE5hbWUgPSAkKCcjZGVsZXRlLW1vZGFsLWNhdC1uYW1lJyk7XHJcbiAgICAgICAgdGhpcy4kY29uZmlybURlbGV0ZSA9ICQoJyNjb25maXJtLWRlbGV0ZScpO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuY29sdW1uRGVmcyA9IHRoaXMuZ2V0Q29sdW1ucygpO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZ2V0Um93Tm9kZUlkID0gZnVuY3Rpb24gKGNhdCkgeyByZXR1cm4gY2F0LmlkIHx8IFwiXCI7IH07XHJcbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb24gPSAnc2luZ2xlJztcclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVNvcnRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQ2VsbENoYW5nZUZsYXNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUNvbFJlc2l6ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5yb3dEYXRhID0gW107XHJcbiAgICAgICAgdmFyIGVHcmlkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhdC1ncmlkJyk7XHJcbiAgICAgICAgbmV3IGFnX2dyaWRfY29tbXVuaXR5XzEuR3JpZChlR3JpZERpdiwgdGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICAgICAgJCgnLm1vZGFsLWFjdGlvbicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpICYmICR0YXJnZXQuZGF0YSgndGFyZ2V0JykpIHtcclxuICAgICAgICAgICAgICAgICQoJHRhcmdldC5kYXRhKCd0YXJnZXQnKSkuZGF0YSgnYWN0aW9uJywgJHRhcmdldC5kYXRhKCdhY3Rpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFNpdGUucHJvdG90eXBlLmdldENvbHVtbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcIklkXCIsIGZpZWxkOiBcImlkXCIgfSxcclxuICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcIk5hbWVcIiwgZmllbGQ6IFwibmFtZVwiIH0sXHJcbiAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJCaXJ0aFwiLCBmaWVsZDogXCJiaXJ0aFwiIH0sXHJcbiAgICAgICAgICAgIHsgaGVhZGVyTmFtZTogXCJIdW5ncnlcIiwgZmllbGQ6IFwiaHVuZ3J5XCIgfSxcclxuICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcIk1vb2RcIiwgZmllbGQ6IFwibW9vZFwiIH1cclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTaXRlO1xyXG59KCkpO1xyXG5uZXcgU2l0ZSgpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljMmwwWlM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJbk5wZEdVdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4eFFrRkJiVUk3UVVGRGJrSXNNRU5CUVhkRE8wRkJRM2hETEhWRVFVRnJTRHRCUVVOc1NDeHhSRUZCYlVRN1FVRkRia1FzTmtSQlFUSkVPMEZCUXpORUxIbERRVUV5UXp0QlFVY3pRenRKUVdOSk8xRkJZbFVzWjBKQlFWY3NSMEZCWjBJc1JVRkJSU3hEUVVGRE8xRkJRemxDTEd0Q1FVRmhMRWRCUVVjc1NVRkJTU3hQUVVGUExFTkJRVU1zYjBKQlFXOUNMRVZCUVVVN1lVRkRka1FzVDBGQlR5eERRVUZETEcxQ1FVRnRRaXhEUVVGRE8yRkJRelZDTEV0QlFVc3NSVUZCUlN4RFFVRkRPMUZCUldJc1kwRkJVeXhIUVVGSExFTkJRVU1zUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXp0UlFVTTFRaXhqUVVGVExFZEJRVWNzUTBGQlF5eERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU03VVVGRGJFTXNhVUpCUVZrc1IwRkJSeXhEUVVGRExFTkJRVU1zWlVGQlpTeERRVUZETEVOQlFVTTdVVUZGYkVNc2FVSkJRVmtzUjBGQlJ5eERRVUZETEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1VVRkRiRU1zYlVKQlFXTXNSMEZCUnl4RFFVRkRMRU5CUVVNc2QwSkJRWGRDTEVOQlFVTXNRMEZCUXp0UlFVTTNReXh0UWtGQll5eEhRVUZITEVOQlFVTXNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eERRVUZETzFGQlIyeERMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4VlFVRlZMRVZCUVVVc1EwRkJRenRSUVVOb1JDeEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRmxCUVZrc1IwRkJSeXhWUVVGRExFZEJRVkVzU1VGQlN5eFBRVUZCTEVkQlFVY3NRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSU3hGUVVGYUxFTkJRVmtzUTBGQlF6dFJRVU16UkN4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExGbEJRVmtzUjBGQlJ5eFJRVUZSTEVOQlFVTTdVVUZEZWtNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eGhRVUZoTEVkQlFVY3NTVUZCU1N4RFFVRkRPMUZCUTNSRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNjVUpCUVhGQ0xFZEJRVWNzU1VGQlNTeERRVUZETzFGQlF6bERMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zWlVGQlpTeEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTjRReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEU5QlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkZPVUlzU1VGQlRTeFJRVUZSTEVkQlFUWkNMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdVVUZETDBVc1NVRkJTU3gzUWtGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03VVVGRmNrTXNRMEZCUXl4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eFZRVUZETEVOQlFXOUNPMWxCUXpGRExFbEJRVTBzVDBGQlR5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03V1VGRE5VSXNTVUZCU1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFVkJRVVU3WjBKQlEyeEVMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU03WVVGRGNFVTdVVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGRFJDeDVRa0ZCVlN4SFFVRldPMUZCUTBrc1QwRkJUenRaUVVOSUxFVkJRVVVzVlVGQlZTeEZRVUZGTEVsQlFVa3NSVUZCUlN4TFFVRkxMRVZCUVVVc1NVRkJTU3hGUVVGRk8xbEJRMnBETEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeEZRVUZGTzFsQlEzSkRMRVZCUVVVc1ZVRkJWU3hGUVVGRkxFOUJRVThzUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHl4RlFVRkZPMWxCUTNaRExFVkJRVVVzVlVGQlZTeEZRVUZGTEZGQlFWRXNSVUZCUlN4TFFVRkxMRVZCUVVVc1VVRkJVU3hGUVVGRk8xbEJRM3BETEVWQlFVVXNWVUZCVlN4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeEZRVUZGTzFOQlEzaERMRU5CUVVFN1NVRkRUQ3hEUVVGRE8wbEJRMHdzVjBGQlF6dEJRVUZFTEVOQlFVTXNRVUV4UTBRc1NVRXdRME03UVVGRlJDeEpRVUZKTEVsQlFVa3NSVUZCUlN4RFFVRkRJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJQ2RpYjI5MGMzUnlZWEFuTzF4eVhHNXBiWEJ2Y25RZ1hDSXVMaTl6WTNOekwxOWliMjkwYzNSeVlYQXRZM1Z6ZEc5dExuTmpjM05jSWp0Y2NseHVhVzF3YjNKMElIc2dSM0pwWkN3Z1IzSnBaRTl3ZEdsdmJuTXNJRkp2ZDA1dlpHVXNJRkp2ZDFaaGJIVmxRMmhoYm1kbFpFVjJaVzUwTENCU2IzZEVZWFJoVlhCa1lYUmxaRVYyWlc1MExDQkRiMnhFWldZZ2ZTQm1jbTl0SUZ3aVlXY3RaM0pwWkMxamIyMXRkVzVwZEhsY0lqdGNjbHh1YVcxd2IzSjBJRndpWVdjdFozSnBaQzFqYjIxdGRXNXBkSGt2WkdsemRDOXpkSGxzWlhNdllXY3RaM0pwWkM1amMzTmNJanRjY2x4dWFXMXdiM0owSUZ3aVlXY3RaM0pwWkMxamIyMXRkVzVwZEhrdlpHbHpkQzl6ZEhsc1pYTXZZV2N0ZEdobGJXVXRZbUZzYUdGdExtTnpjMXdpTzF4eVhHNXBiWEJ2Y25RZ0tpQmhjeUJ6YVdkdVlXeFNJR1p5YjIwZ1hDSkFZWE53Ym1WMEwzTnBaMjVoYkhKY0lqdGNjbHh1YVcxd2IzSjBJSHNnUTJGMElIMGdabkp2YlNCY0lpNHZiVzlrWld4elhDSTdYSEpjYmx4eVhHNWpiR0Z6Y3lCVGFYUmxJSHRjY2x4dUlDQWdJSEJ5YjNSbFkzUmxaQ0JuY21sa1QzQjBhVzl1Y3lBOUlEeEhjbWxrVDNCMGFXOXVjejU3ZlR0Y2NseHVJQ0FnSUhCeWIzUmxZM1JsWkNCb2RXSkRiMjV1WldOMGFXOXVJRDBnYm1WM0lITnBaMjVoYkZJdVNIVmlRMjl1Ym1WamRHbHZia0oxYVd4a1pYSW9LVnh5WEc0Z0lDQWdJQ0FnSUM1M2FYUm9WWEpzS0Z3aUwwaHZiR1JwYm1kelIzSnBaQzlvZFdKY0lpbGNjbHh1SUNBZ0lDQWdJQ0F1WW5WcGJHUW9LVHRjY2x4dVhISmNiaUFnSUNBa1kyRjBUVzlrWVd3Z1BTQWtLQ2NqWTJGMExXMXZaR0ZzSnlrN1hISmNiaUFnSUNBa1kyRjBWR2wwYkdVZ1BTQWtLQ2NqWTJGMExXMXZaR0ZzTFhScGRHeGxKeWs3WEhKY2JpQWdJQ0FrWTI5dVptbHliVk5oZG1VZ1BTQWtLQ2NqWTI5dVptbHliUzF6WVhabEp5azdYSEpjYmx4eVhHNGdJQ0FnSkdSbGJHVjBaVTF2WkdGc0lEMGdKQ2duSTJSbGJHVjBaUzF0YjJSaGJDY3BPMXh5WEc0Z0lDQWdKR1JsYkdWMFpVTmhkRTVoYldVZ1BTQWtLQ2NqWkdWc1pYUmxMVzF2WkdGc0xXTmhkQzF1WVcxbEp5azdYSEpjYmlBZ0lDQWtZMjl1Wm1seWJVUmxiR1YwWlNBOUlDUW9KeU5qYjI1bWFYSnRMV1JsYkdWMFpTY3BPMXh5WEc1Y2NseHVJQ0FnSUdOdmJuTjBjblZqZEc5eUtDa2dlMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaM0pwWkU5d2RHbHZibk11WTI5c2RXMXVSR1ZtY3lBOUlIUm9hWE11WjJWMFEyOXNkVzF1Y3lncE8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVozSnBaRTl3ZEdsdmJuTXVaMlYwVW05M1RtOWtaVWxrSUQwZ0tHTmhkRG9nUTJGMEtTQTlQaUJqWVhRdWFXUWdmSHdnWENKY0lqdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtZHlhV1JQY0hScGIyNXpMbkp2ZDFObGJHVmpkR2x2YmlBOUlDZHphVzVuYkdVbk8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVozSnBaRTl3ZEdsdmJuTXVaVzVoWW14bFUyOXlkR2x1WnlBOUlIUnlkV1U3WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTVuY21sa1QzQjBhVzl1Y3k1bGJtRmliR1ZEWld4c1EyaGhibWRsUm14aGMyZ2dQU0IwY25WbE8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVozSnBaRTl3ZEdsdmJuTXVaVzVoWW14bFEyOXNVbVZ6YVhwbElEMGdkSEoxWlR0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1keWFXUlBjSFJwYjI1ekxuSnZkMFJoZEdFZ1BTQmJYVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1pVZHlhV1JFYVhZNklFaFVUVXhGYkdWdFpXNTBJRDBnUEVoVVRVeEZiR1Z0Wlc1MFBtUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnlOallYUXRaM0pwWkNjcE8xeHlYRzRnSUNBZ0lDQWdJRzVsZHlCSGNtbGtLR1ZIY21sa1JHbDJMQ0IwYUdsekxtZHlhV1JQY0hScGIyNXpLVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdKQ2duTG0xdlpHRnNMV0ZqZEdsdmJpY3BMbU5zYVdOcktDaGxPaUJLVVhWbGNua3VRMnhwWTJ0RmRtVnVkQ2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0FrZEdGeVoyVjBJRDBnSkNobExuUmhjbWRsZENrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2tkR0Z5WjJWMExtUmhkR0VvSjJGamRHbHZiaWNwSUNZbUlDUjBZWEpuWlhRdVpHRjBZU2duZEdGeVoyVjBKeWtwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KSFJoY21kbGRDNWtZWFJoS0NkMFlYSm5aWFFuS1NrdVpHRjBZU2duWVdOMGFXOXVKeXdnSkhSaGNtZGxkQzVrWVhSaEtDZGhZM1JwYjI0bktTazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0I5S1R0Y2NseHVJQ0FnSUgxY2NseHVJQ0FnSUdkbGRFTnZiSFZ0Ym5Nb0tUb2dRMjlzUkdWbVcxMGdlMXh5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJiWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHNnYUdWaFpHVnlUbUZ0WlRvZ1hDSkpaRndpTENCbWFXVnNaRG9nWENKcFpGd2lJSDBzWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHNnYUdWaFpHVnlUbUZ0WlRvZ1hDSk9ZVzFsWENJc0lHWnBaV3hrT2lCY0ltNWhiV1ZjSWlCOUxGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCN0lHaGxZV1JsY2s1aGJXVTZJRndpUW1seWRHaGNJaXdnWm1sbGJHUTZJRndpWW1seWRHaGNJaUI5TEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0I3SUdobFlXUmxjazVoYldVNklGd2lTSFZ1WjNKNVhDSXNJR1pwWld4a09pQmNJbWgxYm1keWVWd2lJSDBzWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSHNnYUdWaFpHVnlUbUZ0WlRvZ1hDSk5iMjlrWENJc0lHWnBaV3hrT2lCY0ltMXZiMlJjSWlCOVhISmNiaUFnSUNBZ0lDQWdYVnh5WEc0Z0lDQWdmVnh5WEc1OVhISmNibHh5WEc1dVpYY2dVMmwwWlNncE95SmRmUT09Il0sInNvdXJjZVJvb3QiOiIifQ==