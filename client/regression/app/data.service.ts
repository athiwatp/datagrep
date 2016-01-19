var data = [
    ['test', 'lsdkfj'],
    ['blah', 'asdlkf']
];

export class DataService {
    getData() {
        return Promise.resolve(data);
    }
}