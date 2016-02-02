System.register(['angular2/core', './data.service'], function(exports_1) {
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
    var core_1, data_service_1;
    var DataPlotComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            DataPlotComponent = (function () {
                function DataPlotComponent(_dataService) {
                    this._dataService = _dataService;
                }
                DataPlotComponent.prototype.ngOnChanges = function (changes) {
                    var _data_currentValue = changes['_data'].currentValue, clonedData;
                    if (!_data_currentValue)
                        return;
                    clonedData = this._dataService.clone(_data_currentValue);
                    this._headers = clonedData.shift();
                    this._rows = clonedData;
                    debugger;
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Array)
                ], DataPlotComponent.prototype, "_data", void 0);
                DataPlotComponent = __decorate([
                    core_1.Component({
                        selector: 'data-plot',
                        template: "data plot component"
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], DataPlotComponent);
                return DataPlotComponent;
            }());
            exports_1("DataPlotComponent", DataPlotComponent);
        }
    }
});
//# sourceMappingURL=data-plot.component.js.map