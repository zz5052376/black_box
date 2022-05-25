import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const fetchData2 = query => {
    return request({
        url: './table2.json',
        method: 'get',
        params: query
    });
};

export const nodeInfo1 = query => {
    return request({
        url: './nodeinfo1.json',
        method: 'get',
        params: query
    });
};


export const queryAllMods = (snapshot) => {
    return request({
        url: "./queryAllMods.json",
        method: 'get',
        params: {"snapshot":snapshot}
    });
};
export const queryCFGsByModuleName = (snapshot,module) => {
    return request({
        url: "./queryCFGsByModuleName.json",
        method: 'get',
        params: {
            "snapshot":snapshot,
            "module":module
    }
    });
};

export const queryBlksByModuleNameAndFunction = (snapshot,module,func) => {
    return request({
        url: "./queryBlksByModuleNameAndFunction.json",
        method: 'get',
        params: {
            "snapshot":snapshot,
            "module":module,
            "func":func
    }
    });
};

export const querySinpleFuctions = (snapshot,sinpleFunc) => {
    return request({
        url: "./querySinpleFuctions.json",
        method: 'get',
        params: {
            "snapshot":snapshot,
            "sinpleFunc":sinpleFunc
    }
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