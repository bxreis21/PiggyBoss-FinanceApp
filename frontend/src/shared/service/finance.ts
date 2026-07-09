import API from "./api.js";

export interface IFinanceService {
    entity: string;

    get(): Promise<any>;
    post(data: any): Promise<any>;
    put(data: any): Promise<any>;
    delete(id: number): Promise<any>;
}

export default class FinanceService implements IFinanceService {
    constructor(public entity: string) {}

    async get(): Promise<any> {
        return API["finance"].get(`/${this.entity}/`);
    }

    async post(data: any): Promise<any> {
        return API["finance"].post(`/${this.entity}/`, data);
    }

    async put(data: any): Promise<any> {
        return API["finance"].put(`/${this.entity}/${data.id}/`, data);
    }

    async delete(id: number): Promise<any> {
        return API["finance"].delete(`/${this.entity}/${id}/`);
    }
}
