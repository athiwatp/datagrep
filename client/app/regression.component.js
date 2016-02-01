System.register(['angular2/core', './csv-importer.component', './data-grid.component', './data-plot.component', 'immutable'], function(exports_1) {
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
    var core_1, csv_importer_component_1, data_grid_component_1, data_plot_component_1, Immutable;
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
            function (Immutable_1) {
                Immutable = Immutable_1;
            }],
        execute: function() {
            RegressionComponent = (function () {
                function RegressionComponent() {
                }
                RegressionComponent.prototype.onDataImported = function (data) {
                    var immutableData = Immutable.fromJS(data);
                    this.data = immutableData.toJS();
                };
                RegressionComponent = __decorate([
                    core_1.Component({
                        selector: 'regression',
                        template: "\n        <csv-importer (data-imported)=\"onDataImported($event)\"></csv-importer>\n        <data-grid *ngIf=\"data\" [data]=\"data\" (output)=\"onDataSaved($event)\"></data-grid>\n        <data-plot *ngIf=\"data\" [data]=\"data\"></data-plot>\n    ",
                        directives: [csv_importer_component_1.CSVImporterComponent, data_grid_component_1.DataGridComponent, data_plot_component_1.DataPlotComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RegressionComponent);
                return RegressionComponent;
            }());
            exports_1("RegressionComponent", RegressionComponent);
        }
    }
});
//# sourceMappingURL=regression.component.js.map