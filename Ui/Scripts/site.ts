import 'bootstrap';
import "../scss/_bootstrap-custom.scss";
import { Grid, GridOptions, RowNode, RowValueChangedEvent, RowDataUpdatedEvent, ColDef } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import * as signalR from "@aspnet/signalr";
import { Cat } from "./models";

class Site {
    protected gridOptions = <GridOptions>{};
    protected hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/HoldingsGrid/hub")
        .build();

    $catModal = $('#cat-modal');
    $catTitle = $('#cat-modal-title');
    $confirmSave = $('#confirm-save');

    $deleteModal = $('#delete-modal');
    $deleteCatName = $('#delete-modal-cat-name');
    $confirmDelete = $('#confirm-delete');

    constructor() {
        this.gridOptions.columnDefs = this.getColumns();
        this.gridOptions.getRowNodeId = (cat: Cat) => cat.id || "";
        this.gridOptions.rowSelection = 'single';
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableCellChangeFlash = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.rowData = [];

        const eGridDiv: HTMLElement = <HTMLElement>document.querySelector('#cat-grid');
        new Grid(eGridDiv, this.gridOptions);

        $('.modal-action').click((e: JQuery.ClickEvent) => {
            const $target = $(e.target);
            if ($target.data('action') && $target.data('target')) {
                $($target.data('target')).data('action', $target.data('action'));
            }
        });
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
}

new Site();