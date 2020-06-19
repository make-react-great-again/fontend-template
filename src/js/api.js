import http from './axios';
export const getMockListData = (params) =>
  http.get('/backend/mock/envirchck/listInterface.json', params);
export const postMockImportData = (data, extra) =>
  http.post('/backend/mock/envirchck/importData.json', data, extra);
