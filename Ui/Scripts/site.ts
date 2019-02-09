import 'bootstrap';
import "../scss/_bootstrap-custom.scss";
import { Grid, GridOptions, RowNode, RowValueChangedEvent, RowDataUpdatedEvent, ColDef, SelectionChangedEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import * as signalR from "@aspnet/signalr";
import { CatsClient, Cat, Mood } from "./nswag/client";
import { Moment } from "moment";
import moment = require('moment');

class Site {
    protected gridOptions = <GridOptions>{};
    protected hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/HoldingsGrid/hub")
        .build();
    catsClient = new CatsClient();
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

    constructor() {
        this.gridOptions.columnDefs = this.getColumns();
        this.gridOptions.getRowNodeId = (cat: Cat) => cat.id || "";
        this.gridOptions.rowSelection = 'single';
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableCellChangeFlash = true;
        this.gridOptions.enableColResize = true;
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
        let selected = this.getSelectedCat() || new Cat();
        this.setModalFromCat(selected);
        this.$catTitle.text("Add A Cat");
    }
    deleteModalShown() {

    }
    loadCats(cats: Cat[] | null) {
        this.gridOptions.api!.setRowData(cats || []);
    }
    getColumns(): ColDef[] {
        return [
            { headerName: "Id", field: "id" },
            { headerName: "Name", field: "name" },
            { headerName: "Birth", field: "birth" },
            { headerName: "Hungry", field: "hungry" },
            { headerName: "Mood", field: "mood" }
        ]
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
    setModalFromCat(cat: Cat) {
        this.$catId.val(cat.id || "");
        this.$catName.val(cat.name || "");
        this.$catBirth.val(moment(cat.birth).format());
        this.$catHungry.prop('checked', cat.hungry);
        this.$catModal.val(cat.mood);
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