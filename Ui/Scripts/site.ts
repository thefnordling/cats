import 'bootstrap';
import "../scss/_bootstrap-custom.scss";
import { Grid, GridOptions, RowNode, RowValueChangedEvent, RowDataUpdatedEvent, ColDef, SelectionChangedEvent, ValueFormatterParams, ValueGetterParams, ICellRendererParams, ICellRenderer } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import * as signalR from "@aspnet/signalr";
import { CatsClient, Cat, Mood } from "./nswag/client";
import moment = require('moment');

class Site {
    siteRoot: string = (<any>window).__site_root;

    protected gridOptions = <GridOptions>{};
    protected hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.siteRoot}/hub`)
        .build();

    catsClient = new CatsClient(this.siteRoot);
    $catModal = $('#cat-modal');
    $catTitle = $('#cat-modal-title');
    $confirmSave = $('#confirm-save');

    $deleteModal = $('#delete-modal');
    $deleteCatName = $('#delete-modal-cat-name');
    $confirmDelete = $('#confirm-delete');

    $catId = $('#cat-id');
    $catName = $('#cat-name');
    $catBirth = $('#cat-birth');
    $catMood = $('#cat-mood');
    $catHungry = $('#cat-hungry');

    catFlatpicker: any;

    constructor() {
        this.gridOptions.columnDefs = this.getColumns();
        this.gridOptions.getRowNodeId = (cat: Cat) => cat.id || "";
        this.gridOptions.rowSelection = 'single';
        this.gridOptions.defaultColDef = {
            sortable: true,
            resizable: true
        };
        this.gridOptions.enableCellChangeFlash = true;
        this.gridOptions.rowData = [];
        this.gridOptions.onSelectionChanged = (event: SelectionChangedEvent) => this.gridSelectionChanged(event);
        const eGridDiv: HTMLElement = <HTMLElement>document.querySelector('#cat-grid');
        new Grid(eGridDiv, this.gridOptions);

        this.catsClient.get((cats: Cat[] | null) => this.loadCats(cats))

        $('.modal-action').click((e: JQuery.ClickEvent) => {
            const $target = $(e.target);
            if ($target.data('action') && $target.data('target')) {
                $($target.data('target')).data('action', $target.data('action'));
            }
        });

        this.$catModal.on('show.bs.modal', () => this.catModalShown());
        this.$deleteModal.on('show.bs.modal', () => this.deleteModalShown());
        this.catFlatpicker = (<any>window).flatpickr(<HTMLElement>document.querySelector('#cat-birth'), {
            enableTime: true
        });

        this.$confirmSave.click(() => this.saveCat());
        this.$confirmDelete.click(() => this.deleteCat());

        this.hubConnection.start().catch(err => console.log(err));
        this.hubConnection.on("updateCat", (c: Cat) => this.updateCat(c));
        this.hubConnection.on("deleteCat", (c: Cat) => this.removeCat(c));
    }
    updateCat(c: Cat) {
        if (!c || !c.id) {
            return;
        }

        if (this.gridOptions.api!.getRowNode(c.id)) {
            this.gridOptions.api!.updateRowData({ update: [c] });
        } else {
            this.gridOptions.api!.updateRowData({ add: [c] });
        }
    }
    removeCat(c: Cat) {
        if (!c || !c.id) {
            return;
        }
        this.gridOptions.api!.updateRowData({ remove: [c] });
    }
    saveCat() {
        const cat = this.getCatFromModal();
        this.catsClient.insertUpdate(cat, (c: Cat | null) => {
            if (c) {
                this.hubConnection.invoke("catUpdated", c);

                this.$catModal.modal('hide');
            }
        });
    }
    deleteCat() {
        const cat = this.getSelectedCat();
        if (cat) {
            this.catsClient.delete(cat, (c: Cat | null) => {
                if (c) {
                    this.hubConnection.invoke("catDeleted", c);
                    this.$deleteModal.modal('hide');
                }
            });
        }
    }
    gridSelectionChanged(event: SelectionChangedEvent) {
        const selected = this.getSelectedCat();
        if (selected) {
            $('.selection-required').prop('disabled', false);
        } else {
            $('.selection-required').prop('disabled', true);
        }
    }
    catModalShown() {
        if (this.$catModal.data('action') == 'add') {
            this.setModalFromCat();
            this.$catTitle.text("Add A Cat");
        } else {
            let selected = this.getSelectedCat() || new Cat();
            this.setModalFromCat(selected);
            this.$catTitle.text("Edit A Cat");
        }
    }
    deleteModalShown() {
        const selected = this.getSelectedCat();
        if (selected && selected.name) {
            this.$deleteCatName.text(selected.name);
        } else if (selected) {
            this.$deleteCatName.text(selected.id || "Undefined");
        }
    }
    loadCats(cats: Cat[] | null) {
        this.gridOptions.api!.setRowData(cats || []);
    }
    getColumns(): ColDef[] {
        return [
            { headerName: "Id", field: "id", hide: true },
            { headerName: "Name", field: "name" },
            { headerName: "Birth", field: "birth", valueFormatter: (params: ValueFormatterParams) => this.formatBirth(params) },
            { headerName: "Hungry", field: "hungry", cellRenderer: (p: ICellRendererParams) => this.renderHungry(p) },
            { headerName: "Mood", field: "mood", cellRenderer: (p: ICellRendererParams) => this.renderMood(p) }
        ]
    }
    formatBirth(p: ValueFormatterParams): string {
        if (!p.value) {
            return "";
        }

        return moment(p.value).format("YYYY-MM-DD hh:mm");
    }
    renderHungry(p: ICellRendererParams) {
        if (p.data && p.data.hungry) {
            return '<i class="far fa-check-square"></i>';
        } else {
            return '<i class="far fa-square"></i>';
        }
    }
    renderMood(p: ICellRendererParams) {
        if (!p.data || !p.data.mood) {
            return '<i class="far"></i>';
        } else {
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
    }
    getSelectedCat(): Cat | undefined {
        const selected = this.gridOptions.api!.getSelectedNodes();
        if (selected && selected.length) {
            return selected[0].data;
        }
        return undefined;
    }
    getCatFromModal(): Cat {
        return new Cat({
            id: this.getInputString(this.$catId),
            name: this.getInputString(this.$catName),
            birth: this.getInputDate(this.$catBirth),
            hungry: this.getInputBoolean(this.$catHungry),
            mood: this.getInputMood(this.$catMood)
        });
    }
    setModalFromCat(cat?: Cat) {
        cat = cat || new Cat();

        this.$catId.val(cat.id || "");
        this.$catName.val(cat.name || "");
        this.catFlatpicker.setDate(cat.birth);
        this.$catHungry.prop('checked', cat.hungry);
        this.$catMood.val(cat.mood);
    }
    getInputString($input: JQuery<HTMLElement>): string | undefined {
        const val = $input.val();
        if (val !== 0 && !val) {
            return undefined;
        }
        return String(val);
    }
    getInputDate($input: JQuery<HTMLElement>): Date {
        const m = moment($input.val());
        if (!m.isValid()) {
            return moment().toDate();
        } else {
            return m.toDate();
        }
    }
    getInputBoolean($input: JQuery<HTMLElement>): boolean {
        return $input.is(':checked') || false;
    }
    getInputMood($input: JQuery<HTMLElement>): Mood {
        const val = $input.val();
        if (val == Mood.Amber) {
            return Mood.Amber;
        } else if (val == Mood.Green) {
            return Mood.Green;
        } else if (val == Mood.Red) {
            return Mood.Red;
        } else {
            return Mood.None;
        }
    }
}

new Site();