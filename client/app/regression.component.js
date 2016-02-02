System.register(['angular2/core', './csv-importer.component', './data-grid.component', './data-plot.component', './data.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, csv_importer_component_1, data_grid_component_1, data_plot_component_1, data_service_1;
    var RegressionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (csv_importer_component_1_1) {
                csv_importer_component_1 = csv_importer_component_1_1;
            },
            function (data_grid_component_1_1) {
                data_grid_component_1 = data_grid_component_1_1;
            },
            function (data_plot_component_1_1) {
                data_plot_component_1 = data_plot_component_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            RegressionComponent = (function () {
                function RegressionComponent(_dataService) {
                    this._dataService = _dataService;
                }
                RegressionComponent.prototype._onDataImported = function (data) {
                    this._dataService.setData(data);
                    this._data = this._dataService.getData();
                };
                RegressionComponent = __decorate([
                    core_1.Component({
                        selector: 'regression',
                        template: "\n        <csv-importer (data-imported)=\"_onDataImported($event)\"></csv-importer>\n        <data-grid *ngIf=\"_data\" [data]=\"_data\"></data-grid>\n        <data-plot *ngIf=\"_data\" [data]=\"_data\"></data-plot>\n    ",
                        directives: [csv_importer_component_1.CSVImporterComponent, data_grid_component_1.DataGridComponent, data_plot_component_1.DataPlotComponent],
                        providers: [data_service_1.DataService]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], RegressionComponent);
                return RegressionComponent;
            }());
            exports_1("RegressionComponent", RegressionComponent);
        }
    }
});
//# sourceMappingURL=regression.component.js.map