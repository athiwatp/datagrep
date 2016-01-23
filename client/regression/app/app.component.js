System.register(['angular2/core', './data.service', './data-grid.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, data_service_1, data_grid_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (data_grid_component_1_1) {
                data_grid_component_1 = data_grid_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_dataService) {
                    this._dataService = _dataService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    // this.getData();
                };
                AppComponent.prototype.getData = function () {
                    this._dataService.getData().then(function (data) {
                        // this.data = data;
                        // console.log('data: ', data);
                    });
                };
                AppComponent.prototype.readFileAsText = function (event) {
                    var _this = this;
                    var input = event.target, files = input.files, file = files[0], reader;
                    if (file) {
                        reader = new FileReader(file);
                        reader.onload = function () { return _this.parseCsv(reader.result); };
                        reader.readAsText(file);
                    }
                };
                AppComponent.prototype.parseCsv = function (csvText) {
                    var rows = csvText.split(/\r\n|\r|\n/), data = rows.map(function (row) { return row.split(/,(?![^"][^,]+"[^$])/g); }), len = data.length;
                    if (data[len - 1].length < data[0].length) {
                        data.pop();
                    }
                    console.log('data: ', data);
                    this.data = data;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'linear-regression',
                        template: "\n        <input type=\"file\" accept=\"text/csv\" (change)=\"readFileAsText($event)\">\n        <data-plot></data-plot>\n        <data-grid [data]=\"data\"></data-grid>\n    ",
                        providers: [data_service_1.DataService],
                        directives: [data_grid_component_1.DataGridComponent]
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map