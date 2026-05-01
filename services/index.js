import instance from "../config/axios";
import { ErrorHandler } from "../config/ErrorHandler";

const isSuccess = (status) => [200, 201, 202, 206].includes(status);

export const get = async (endPoint, params) => {
    try {
        const result = await instance.get(endPoint, { params: params });
        if (isSuccess(result.status)) return result.data;
        else throw result;
    } catch (e) {
        throw ErrorHandler(e);
    }
};

export const post = async (endPoint, data) => {
    try {
        const result = await instance.post(endPoint, data);
        if (isSuccess(result.status)) return result.data;
        else throw result;
    } catch (e) {
        throw ErrorHandler(e);
    }
};

export const put = async (endPoint, data) => {
    try {
        const result = await instance.put(endPoint, data);
        if (isSuccess(result.status)) return result.data;
        else throw result;
    } catch (e) {
        throw ErrorHandler(e);
    }
};

export const patch = async (endPoint, data) => {
    try {
        const result = await instance.patch(endPoint, data);
        if (isSuccess(result.status)) return result.data;
        else throw result;
    } catch (e) {
        throw ErrorHandler(e);
    }
};

export const deleted = async (endPoint, params) => {
    try {
        const result = await instance.delete(endPoint, { params: params });
        if (isSuccess(result.status)) return result.data;
        else throw result;
    } catch (e) {
        throw ErrorHandler(e);
    }
};
