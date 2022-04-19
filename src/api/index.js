import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const graphData1 = query => {
    return request({
        url: './graphData1.json',
        method: 'get',
        params: query
    });
};

export const graphData2 = query => {
    return request({
        url: query,
        method: 'get',
        params: ''
    });
};