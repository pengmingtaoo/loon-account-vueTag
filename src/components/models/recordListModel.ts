const localStorageKeyName = 'recordStorage';
const recordListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') as RecordItem[];
  },
  clone(data:RecordItem[]|RecordItem){
    return JSON.parse(JSON.stringify(data));
  },
  save(data:RecordItem[]) {
    window.localStorage.setItem('localStorageKeyName', JSON.stringify(data));
  }
};
export default recordListModel;