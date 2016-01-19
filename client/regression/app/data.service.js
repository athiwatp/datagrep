System.register([], function(exports_1) {
    var data, DataService;
    return {
        setters:[],
        execute: function() {
            data = [
                ['test', 'lsdkfj'],
                ['blah', 'asdlkf']
            ];
            DataService = (function () {
                function DataService() {
                }
                DataService.prototype.getData = function () {
                    return Promise.resolve(data);
                };
                return DataService;
            })();
            exports_1("DataService", DataService);
        }
    }
});
//# sourceMappingURL=data.service.js.map