System.register(['angular2/core', './data.service'], function(exports_1) {
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
    var DataGridComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }],
        execute: function() {
            DataGridComponent = (function () {
                function DataGridComponent(_dataService) {
                    this._dataService = _dataService;
                    // this.headers = ['col1', 'col2'];
                }
                DataGridComponent.prototype.ngAfterViewInit = function () {
                    // var that = this;
                    // $(document).ready(function() {
                    //     $('#table_id').DataTable({
                    //         data: that.data
                    //     });
                    // });
                };
                DataGridComponent.prototype.ngOnChanges = function () {
                    var _this = this;
                    if (arguments[0] && arguments[0].data && arguments[0].data.currentValue instanceof Array) {
                        this.headers = this.data.splice(0, 1)[0];
                        setTimeout(function () {
                            $(document).ready(function () {
                                $('#table_id').DataTable({
                                    "data": _this.data,
                                    "columns": _this.headers.map(function (header) { return { title: header }; }),
                                    "processing": true,
                                    "deferRender": true
                                });
                            });
                        }, 0);
                    }
                };
                DataGridComponent = __decorate([
                    core_1.Component({
                        selector: 'data-grid',
                        inputs: ['data'],
                        template: "\n        <table id=\"table_id\" class=\"display\"></table>\n    "
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], DataGridComponent);
                return DataGridComponent;
            })();
            exports_1("DataGridComponent", DataGridComponent);
        }
    }
});
//# sourceMappingURL=data-grid.component.js.map