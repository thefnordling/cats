"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap");
require("../scss/_bootstrap-custom.scss");
var ag_grid_community_1 = require("ag-grid-community");
require("ag-grid-community/dist/styles/ag-grid.css");
require("ag-grid-community/dist/styles/ag-theme-balham.css");
var signalR = require("@aspnet/signalr");
var client_1 = require("./nswag/client");
var moment = require("moment");
var Site = /** @class */ (function () {
    function Site() {
        var _this = this;
        this.gridOptions = {};
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/cats/hub")
            .build();
        this.catsClient = new client_1.CatsClient("/cats");
        this.$catModal = $('#cat-modal');
        this.$catTitle = $('#cat-modal-title');
        this.$confirmSave = $('#confirm-save');
        this.$deleteModal = $('#delete-modal');
        this.$deleteCatName = $('#delete-modal-cat-name');
        this.$confirmDelete = $('#confirm-delete');
        this.$catId = $('#cat-id');
        this.$catName = $('#cat-name');
        this.$catBirth = $('#cat-birth');
        this.$catMood = $('#cat-mood');
        this.$catHungry = $('#cat-hungry');
        this.gridOptions.columnDefs = this.getColumns();
        this.gridOptions.getRowNodeId = function (cat) { return cat.id || ""; };
        this.gridOptions.rowSelection = 'single';
        this.gridOptions.defaultColDef = {
            sortable: true,
            resizable: true
        };
        this.gridOptions.enableCellChangeFlash = true;
        this.gridOptions.rowData = [];
        this.gridOptions.onSelectionChanged = function (event) { return _this.gridSelectionChanged(event); };
        var eGridDiv = document.querySelector('#cat-grid');
        new ag_grid_community_1.Grid(eGridDiv, this.gridOptions);
        this.catsClient.get(function (cats) { return _this.loadCats(cats); });
        $('.modal-action').click(function (e) {
            var $target = $(e.target);
            if ($target.data('action') && $target.data('target')) {
                $($target.data('target')).data('action', $target.data('action'));
            }
        });
        this.$catModal.on('show.bs.modal', function () { return _this.catModalShown(); });
        this.$deleteModal.on('show.bs.modal', function () { return _this.deleteModalShown(); });
        this.catFlatpicker = window.flatpickr(document.querySelector('#cat-birth'), {
            enableTime: true
        });
        this.$confirmSave.click(function () { return _this.saveCat(); });
        this.$confirmDelete.click(function () { return _this.deleteCat(); });
        this.hubConnection.start().catch(function (err) { return console.log(err); });
        this.hubConnection.on("updateCat", function (c) { return _this.updateCat(c); });
        this.hubConnection.on("deleteCat", function (c) { return _this.removeCat(c); });
    }
    Site.prototype.updateCat = function (c) {
        if (!c || !c.id) {
            return;
        }
        if (this.gridOptions.api.getRowNode(c.id)) {
            this.gridOptions.api.updateRowData({ update: [c] });
        }
        else {
            this.gridOptions.api.updateRowData({ add: [c] });
        }
    };
    Site.prototype.removeCat = function (c) {
        if (!c || !c.id) {
            return;
        }
        this.gridOptions.api.updateRowData({ remove: [c] });
    };
    Site.prototype.saveCat = function () {
        var _this = this;
        var cat = this.getCatFromModal();
        this.catsClient.insertUpdate(cat, function (c) {
            if (c) {
                _this.hubConnection.invoke("catUpdated", c);
                _this.$catModal.modal('hide');
            }
        });
    };
    Site.prototype.deleteCat = function () {
        var _this = this;
        var cat = this.getSelectedCat();
        if (cat) {
            this.catsClient.delete(cat, function (c) {
                if (c) {
                    _this.hubConnection.invoke("catDeleted", c);
                    _this.$deleteModal.modal('hide');
                }
            });
        }
    };
    Site.prototype.gridSelectionChanged = function (event) {
        var selected = this.getSelectedCat();
        if (selected) {
            $('.selection-required').prop('disabled', false);
        }
        else {
            $('.selection-required').prop('disabled', true);
        }
    };
    Site.prototype.catModalShown = function () {
        if (this.$catModal.data('action') == 'add') {
            this.setModalFromCat();
            this.$catTitle.text("Add A Cat");
        }
        else {
            var selected = this.getSelectedCat() || new client_1.Cat();
            this.setModalFromCat(selected);
            this.$catTitle.text("Edit A Cat");
        }
    };
    Site.prototype.deleteModalShown = function () {
        var selected = this.getSelectedCat();
        if (selected && selected.name) {
            this.$deleteCatName.text(selected.name);
        }
        else if (selected) {
            this.$deleteCatName.text(selected.id || "Undefined");
        }
    };
    Site.prototype.loadCats = function (cats) {
        this.gridOptions.api.setRowData(cats || []);
    };
    Site.prototype.getColumns = function () {
        var _this = this;
        return [
            { headerName: "Id", field: "id", hide: true },
            { headerName: "Name", field: "name" },
            { headerName: "Birth", field: "birth", valueFormatter: function (params) { return _this.formatBirth(params); } },
            { headerName: "Hungry", field: "hungry", cellRenderer: function (p) { return _this.renderHungry(p); } },
            { headerName: "Mood", field: "mood", cellRenderer: function (p) { return _this.renderMood(p); } }
        ];
    };
    Site.prototype.formatBirth = function (p) {
        if (!p.value) {
            return "";
        }
        return moment(p.value).format("YYYY-MM-DD hh:mm");
    };
    Site.prototype.renderHungry = function (p) {
        if (p.data && p.data.hungry) {
            return '<i class="far fa-check-square"></i>';
        }
        else {
            return '<i class="far fa-square"></i>';
        }
    };
    Site.prototype.renderMood = function (p) {
        if (!p.data || !p.data.mood) {
            return '<i class="far"></i>';
        }
        else {
            switch (p.data.mood) {
                case 1:
                    return '<i class="fas fa-square" style="color: red"></i> Red';
                case 2:
                    return '<i class="fas fa-square" style="color: #FFBF00"></i> Amber';
                case 3:
                    return '<i class="fas fa-square" style="color: green"></i> Green';
                default:
                    return '<i class="far"></i>';
            }
        }
    };
    Site.prototype.getSelectedCat = function () {
        var selected = this.gridOptions.api.getSelectedNodes();
        if (selected && selected.length) {
            return selected[0].data;
        }
        return undefined;
    };
    Site.prototype.getCatFromModal = function () {
        return new client_1.Cat({
            id: this.getInputString(this.$catId),
            name: this.getInputString(this.$catName),
            birth: this.getInputDate(this.$catBirth),
            hungry: this.getInputBoolean(this.$catHungry),
            mood: this.getInputMood(this.$catMood)
        });
    };
    Site.prototype.setModalFromCat = function (cat) {
        cat = cat || new client_1.Cat();
        this.$catId.val(cat.id || "");
        this.$catName.val(cat.name || "");
        //this.$catBirth.val(moment(cat.birth).format());
        this.catFlatpicker.setDate(cat.birth);
        this.$catHungry.prop('checked', cat.hungry);
        this.$catMood.val(cat.mood);
    };
    Site.prototype.getInputString = function ($input) {
        var val = $input.val();
        if (val !== 0 && !val) {
            return undefined;
        }
        return String(val);
    };
    Site.prototype.getInputDate = function ($input) {
        var m = moment($input.val());
        if (!m.isValid()) {
            return moment().toDate();
        }
        else {
            return m.toDate();
        }
    };
    Site.prototype.getInputBoolean = function ($input) {
        return $input.is(':checked') || false;
    };
    Site.prototype.getInputMood = function ($input) {
        var val = $input.val();
        if (val == client_1.Mood.Amber) {
            return client_1.Mood.Amber;
        }
        else if (val == client_1.Mood.Green) {
            return client_1.Mood.Green;
        }
        else if (val == client_1.Mood.Red) {
            return client_1.Mood.Red;
        }
        else {
            return client_1.Mood.None;
        }
    };
    return Site;
}());
new Site();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQkFBbUI7QUFDbkIsMENBQXdDO0FBQ3hDLHVEQUFzTjtBQUN0TixxREFBbUQ7QUFDbkQsNkRBQTJEO0FBQzNELHlDQUEyQztBQUMzQyx5Q0FBdUQ7QUFDdkQsK0JBQWtDO0FBRWxDO0lBdUJJO1FBQUEsaUJBbUNDO1FBekRTLGdCQUFXLEdBQWdCLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksT0FBTyxDQUFDLG9CQUFvQixFQUFFO2FBQ3ZELE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDcEIsS0FBSyxFQUFFLENBQUM7UUFFYixlQUFVLEdBQUcsSUFBSSxtQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLGNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUIsY0FBUyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWxDLGlCQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV0QyxXQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixhQUFRLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLGVBQVUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFLMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFB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dGVudCI6WyJpbXBvcnQgJ2Jvb3RzdHJhcCc7XHJcbmltcG9ydCBcIi4uL3Njc3MvX2Jvb3RzdHJhcC1jdXN0b20uc2Nzc1wiO1xyXG5pbXBvcnQgeyBHcmlkLCBHcmlkT3B0aW9ucywgUm93Tm9kZSwgUm93VmFsdWVDaGFuZ2VkRXZlbnQsIFJvd0RhdGFVcGRhdGVkRXZlbnQsIENvbERlZiwgU2VsZWN0aW9uQ2hhbmdlZEV2ZW50LCBWYWx1ZUZvcm1hdHRlclBhcmFtcywgVmFsdWVHZXR0ZXJQYXJhbXMsIElDZWxsUmVuZGVyZXJQYXJhbXMsIElDZWxsUmVuZGVyZXIgfSBmcm9tIFwiYWctZ3JpZC1jb21tdW5pdHlcIjtcclxuaW1wb3J0IFwiYWctZ3JpZC1jb21tdW5pdHkvZGlzdC9zdHlsZXMvYWctZ3JpZC5jc3NcIjtcclxuaW1wb3J0IFwiYWctZ3JpZC1jb21tdW5pdHkvZGlzdC9zdHlsZXMvYWctdGhlbWUtYmFsaGFtLmNzc1wiO1xyXG5pbXBvcnQgKiBhcyBzaWduYWxSIGZyb20gXCJAYXNwbmV0L3NpZ25hbHJcIjtcclxuaW1wb3J0IHsgQ2F0c0NsaWVudCwgQ2F0LCBNb29kIH0gZnJvbSBcIi4vbnN3YWcvY2xpZW50XCI7XHJcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcclxuXHJcbmNsYXNzIFNpdGUge1xyXG4gICAgcHJvdGVjdGVkIGdyaWRPcHRpb25zID0gPEdyaWRPcHRpb25zPnt9O1xyXG4gICAgcHJvdGVjdGVkIGh1YkNvbm5lY3Rpb24gPSBuZXcgc2lnbmFsUi5IdWJDb25uZWN0aW9uQnVpbGRlcigpXHJcbiAgICAgICAgLndpdGhVcmwoXCIvY2F0cy9odWJcIilcclxuICAgICAgICAuYnVpbGQoKTtcclxuICAgIFxyXG4gICAgY2F0c0NsaWVudCA9IG5ldyBDYXRzQ2xpZW50KFwiL2NhdHNcIik7XHJcbiAgICAkY2F0TW9kYWwgPSAkKCcjY2F0LW1vZGFsJyk7XHJcbiAgICAkY2F0VGl0bGUgPSAkKCcjY2F0LW1vZGFsLXRpdGxlJyk7XHJcbiAgICAkY29uZmlybVNhdmUgPSAkKCcjY29uZmlybS1zYXZlJyk7XHJcblxyXG4gICAgJGRlbGV0ZU1vZGFsID0gJCgnI2RlbGV0ZS1tb2RhbCcpO1xyXG4gICAgJGRlbGV0ZUNhdE5hbWUgPSAkKCcjZGVsZXRlLW1vZGFsLWNhdC1uYW1lJyk7XHJcbiAgICAkY29uZmlybURlbGV0ZSA9ICQoJyNjb25maXJtLWRlbGV0ZScpO1xyXG5cclxuICAgICRjYXRJZCA9ICQoJyNjYXQtaWQnKTtcclxuICAgICRjYXROYW1lID0gJCgnI2NhdC1uYW1lJyk7XHJcbiAgICAkY2F0QmlydGggPSAkKCcjY2F0LWJpcnRoJyk7XHJcbiAgICAkY2F0TW9vZCA9ICQoJyNjYXQtbW9vZCcpO1xyXG4gICAgJGNhdEh1bmdyeSA9ICQoJyNjYXQtaHVuZ3J5Jyk7XHJcblxyXG4gICAgY2F0RmxhdHBpY2tlcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuY29sdW1uRGVmcyA9IHRoaXMuZ2V0Q29sdW1ucygpO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZ2V0Um93Tm9kZUlkID0gKGNhdDogQ2F0KSA9PiBjYXQuaWQgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbiA9ICdzaW5nbGUnO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdENvbERlZiA9IHtcclxuICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHJlc2l6YWJsZTogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVDZWxsQ2hhbmdlRmxhc2ggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucm93RGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMub25TZWxlY3Rpb25DaGFuZ2VkID0gKGV2ZW50OiBTZWxlY3Rpb25DaGFuZ2VkRXZlbnQpID0+IHRoaXMuZ3JpZFNlbGVjdGlvbkNoYW5nZWQoZXZlbnQpO1xyXG4gICAgICAgIGNvbnN0IGVHcmlkRGl2OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2F0LWdyaWQnKTtcclxuICAgICAgICBuZXcgR3JpZChlR3JpZERpdiwgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0c0NsaWVudC5nZXQoKGNhdHM6IENhdFtdIHwgbnVsbCkgPT4gdGhpcy5sb2FkQ2F0cyhjYXRzKSlcclxuXHJcbiAgICAgICAgJCgnLm1vZGFsLWFjdGlvbicpLmNsaWNrKChlOiBKUXVlcnkuQ2xpY2tFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpICYmICR0YXJnZXQuZGF0YSgndGFyZ2V0JykpIHtcclxuICAgICAgICAgICAgICAgICQoJHRhcmdldC5kYXRhKCd0YXJnZXQnKSkuZGF0YSgnYWN0aW9uJywgJHRhcmdldC5kYXRhKCdhY3Rpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kY2F0TW9kYWwub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB0aGlzLmNhdE1vZGFsU2hvd24oKSk7XHJcbiAgICAgICAgdGhpcy4kZGVsZXRlTW9kYWwub24oJ3Nob3cuYnMubW9kYWwnLCAoKSA9PiB0aGlzLmRlbGV0ZU1vZGFsU2hvd24oKSk7XHJcbiAgICAgICAgdGhpcy5jYXRGbGF0cGlja2VyID0gKDxhbnk+d2luZG93KS5mbGF0cGlja3IoPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXQtYmlydGgnKSwge1xyXG4gICAgICAgICAgICBlbmFibGVUaW1lOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGNvbmZpcm1TYXZlLmNsaWNrKCgpID0+IHRoaXMuc2F2ZUNhdCgpKTtcclxuICAgICAgICB0aGlzLiRjb25maXJtRGVsZXRlLmNsaWNrKCgpID0+IHRoaXMuZGVsZXRlQ2F0KCkpO1xyXG5cclxuICAgICAgICB0aGlzLmh1YkNvbm5lY3Rpb24uc3RhcnQoKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgICAgdGhpcy5odWJDb25uZWN0aW9uLm9uKFwidXBkYXRlQ2F0XCIsIChjOiBDYXQpID0+IHRoaXMudXBkYXRlQ2F0KGMpKTtcclxuICAgICAgICB0aGlzLmh1YkNvbm5lY3Rpb24ub24oXCJkZWxldGVDYXRcIiwgKGM6IENhdCkgPT4gdGhpcy5yZW1vdmVDYXQoYykpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ2F0KGM6IENhdCkge1xyXG4gICAgICAgIGlmICghYyB8fCAhYy5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5hcGkhLmdldFJvd05vZGUoYy5pZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkhLnVwZGF0ZVJvd0RhdGEoeyB1cGRhdGU6IFtjXSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaSEudXBkYXRlUm93RGF0YSh7IGFkZDogW2NdIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZUNhdChjOiBDYXQpIHtcclxuICAgICAgICBpZiAoIWMgfHwgIWMuaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyaWRPcHRpb25zLmFwaSEudXBkYXRlUm93RGF0YSh7IHJlbW92ZTogW2NdIH0pO1xyXG4gICAgfVxyXG4gICAgc2F2ZUNhdCgpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSB0aGlzLmdldENhdEZyb21Nb2RhbCgpO1xyXG4gICAgICAgIHRoaXMuY2F0c0NsaWVudC5pbnNlcnRVcGRhdGUoY2F0LCAoYzogQ2F0IHwgbnVsbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odWJDb25uZWN0aW9uLmludm9rZShcImNhdFVwZGF0ZWRcIiwgYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kY2F0TW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlQ2F0KCkge1xyXG4gICAgICAgIGNvbnN0IGNhdCA9IHRoaXMuZ2V0U2VsZWN0ZWRDYXQoKTtcclxuICAgICAgICBpZiAoY2F0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0c0NsaWVudC5kZWxldGUoY2F0LCAoYzogQ2F0IHwgbnVsbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh1YkNvbm5lY3Rpb24uaW52b2tlKFwiY2F0RGVsZXRlZFwiLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRkZWxldGVNb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBncmlkU2VsZWN0aW9uQ2hhbmdlZChldmVudDogU2VsZWN0aW9uQ2hhbmdlZEV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmdldFNlbGVjdGVkQ2F0KCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICQoJy5zZWxlY3Rpb24tcmVxdWlyZWQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuc2VsZWN0aW9uLXJlcXVpcmVkJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRNb2RhbFNob3duKCkge1xyXG4gICAgICAgIGlmICh0aGlzLiRjYXRNb2RhbC5kYXRhKCdhY3Rpb24nKSA9PSAnYWRkJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vZGFsRnJvbUNhdCgpO1xyXG4gICAgICAgICAgICB0aGlzLiRjYXRUaXRsZS50ZXh0KFwiQWRkIEEgQ2F0XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuZ2V0U2VsZWN0ZWRDYXQoKSB8fCBuZXcgQ2F0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kYWxGcm9tQ2F0KHNlbGVjdGVkKTtcclxuICAgICAgICAgICAgdGhpcy4kY2F0VGl0bGUudGV4dChcIkVkaXQgQSBDYXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlTW9kYWxTaG93bigpIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZ2V0U2VsZWN0ZWRDYXQoKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRkZWxldGVDYXROYW1lLnRleHQoc2VsZWN0ZWQubmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLiRkZWxldGVDYXROYW1lLnRleHQoc2VsZWN0ZWQuaWQgfHwgXCJVbmRlZmluZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9hZENhdHMoY2F0czogQ2F0W10gfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5hcGkhLnNldFJvd0RhdGEoY2F0cyB8fCBbXSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb2x1bW5zKCk6IENvbERlZltdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiSWRcIiwgZmllbGQ6IFwiaWRcIiwgaGlkZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB7IGhlYWRlck5hbWU6IFwiTmFtZVwiLCBmaWVsZDogXCJuYW1lXCIgfSxcclxuICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcIkJpcnRoXCIsIGZpZWxkOiBcImJpcnRoXCIsIHZhbHVlRm9ybWF0dGVyOiAocGFyYW1zOiBWYWx1ZUZvcm1hdHRlclBhcmFtcykgPT4gdGhpcy5mb3JtYXRCaXJ0aChwYXJhbXMpfSxcclxuICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcIkh1bmdyeVwiLCBmaWVsZDogXCJodW5ncnlcIiwgY2VsbFJlbmRlcmVyOiAocDogSUNlbGxSZW5kZXJlclBhcmFtcykgPT4gdGhpcy5yZW5kZXJIdW5ncnkocCkgfSxcclxuICAgICAgICAgICAgeyBoZWFkZXJOYW1lOiBcIk1vb2RcIiwgZmllbGQ6IFwibW9vZFwiLCBjZWxsUmVuZGVyZXI6IChwOiBJQ2VsbFJlbmRlcmVyUGFyYW1zKSA9PiB0aGlzLnJlbmRlck1vb2QocCl9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgZm9ybWF0QmlydGgocDogVmFsdWVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcgIHtcclxuICAgICAgICBpZiAoIXAudmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9tZW50KHAudmFsdWUpLmZvcm1hdChcIllZWVktTU0tREQgaGg6bW1cIik7XHJcbiAgICB9XHJcbiAgICByZW5kZXJIdW5ncnkocDogSUNlbGxSZW5kZXJlclBhcmFtcykge1xyXG4gICAgICAgIGlmIChwLmRhdGEgJiYgcC5kYXRhLmh1bmdyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJzxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLXNxdWFyZVwiPjwvaT4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnPGkgY2xhc3M9XCJmYXIgZmEtc3F1YXJlXCI+PC9pPic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyTW9vZChwOiBJQ2VsbFJlbmRlcmVyUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCFwLmRhdGEgfHwgIXAuZGF0YS5tb29kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnPGkgY2xhc3M9XCJmYXJcIj48L2k+JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHAuZGF0YS5tb29kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aSBjbGFzcz1cImZhcyBmYS1zcXVhcmVcIiBzdHlsZT1cImNvbG9yOiByZWRcIj48L2k+IFJlZCc7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aSBjbGFzcz1cImZhcyBmYS1zcXVhcmVcIiBzdHlsZT1cImNvbG9yOiAjRkZCRjAwXCI+PC9pPiBBbWJlcic7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aSBjbGFzcz1cImZhcyBmYS1zcXVhcmVcIiBzdHlsZT1cImNvbG9yOiBncmVlblwiPjwvaT4gR3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpIGNsYXNzPVwiZmFyXCI+PC9pPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRTZWxlY3RlZENhdCgpOiBDYXQgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5ncmlkT3B0aW9ucy5hcGkhLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZFswXS5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2F0RnJvbU1vZGFsKCk6IENhdCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDYXQoe1xyXG4gICAgICAgICAgICBpZDogdGhpcy5nZXRJbnB1dFN0cmluZyh0aGlzLiRjYXRJZCksXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuZ2V0SW5wdXRTdHJpbmcodGhpcy4kY2F0TmFtZSksXHJcbiAgICAgICAgICAgIGJpcnRoOiB0aGlzLmdldElucHV0RGF0ZSh0aGlzLiRjYXRCaXJ0aCksXHJcbiAgICAgICAgICAgIGh1bmdyeTogdGhpcy5nZXRJbnB1dEJvb2xlYW4odGhpcy4kY2F0SHVuZ3J5KSxcclxuICAgICAgICAgICAgbW9vZDogdGhpcy5nZXRJbnB1dE1vb2QodGhpcy4kY2F0TW9vZClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsRnJvbUNhdChjYXQ/OiBDYXQpIHtcclxuICAgICAgICBjYXQgPSBjYXQgfHwgbmV3IENhdCgpO1xyXG5cclxuICAgICAgICB0aGlzLiRjYXRJZC52YWwoY2F0LmlkIHx8IFwiXCIpO1xyXG4gICAgICAgIHRoaXMuJGNhdE5hbWUudmFsKGNhdC5uYW1lIHx8IFwiXCIpO1xyXG4gICAgICAgIC8vdGhpcy4kY2F0QmlydGgudmFsKG1vbWVudChjYXQuYmlydGgpLmZvcm1hdCgpKTtcclxuICAgICAgICB0aGlzLmNhdEZsYXRwaWNrZXIuc2V0RGF0ZShjYXQuYmlydGgpO1xyXG4gICAgICAgIHRoaXMuJGNhdEh1bmdyeS5wcm9wKCdjaGVja2VkJywgY2F0Lmh1bmdyeSk7XHJcbiAgICAgICAgdGhpcy4kY2F0TW9vZC52YWwoY2F0Lm1vb2QpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW5wdXRTdHJpbmcoJGlucHV0OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBjb25zdCB2YWwgPSAkaW5wdXQudmFsKCk7XHJcbiAgICAgICAgaWYgKHZhbCAhPT0gMCAmJiAhdmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsKTtcclxuICAgIH1cclxuICAgIGdldElucHV0RGF0ZSgkaW5wdXQ6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBEYXRlIHtcclxuICAgICAgICBjb25zdCBtID0gbW9tZW50KCRpbnB1dC52YWwoKSk7XHJcbiAgICAgICAgaWYgKCFtLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KCkudG9EYXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG0udG9EYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0SW5wdXRCb29sZWFuKCRpbnB1dDogSlF1ZXJ5PEhUTUxFbGVtZW50Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAkaW5wdXQuaXMoJzpjaGVja2VkJykgfHwgZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRJbnB1dE1vb2QoJGlucHV0OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogTW9vZCB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gJGlucHV0LnZhbCgpO1xyXG4gICAgICAgIGlmICh2YWwgPT0gTW9vZC5BbWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9vZC5BbWJlcjtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbCA9PSBNb29kLkdyZWVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb29kLkdyZWVuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsID09IE1vb2QuUmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb29kLlJlZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9vZC5Ob25lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IFNpdGUoKTsiXX0=