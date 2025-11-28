import HttpService from './http-service.ts';
import { singleton } from "tsyringe";
import { APIS } from '../../environment/environment.dev';
import {Empresa} from "../models/empresa.model.ts";
import { EmpresaUpdateDTO } from '../models/empresa-update.model.ts'; // Import the new DTO

@singleton()
export class EmpresaService extends HttpService {
    URL = `${APIS.API_URL}/empresas`;

    constructor() {
        super();
    }

    /**
     * Fetches all empresas.
     * @returns {Promise<AxiosResponse<Empresa[]>>}
     */
    getEmpresas() {
        return this.get<Empresa[]>(this.URL);
    }

    /**
     * Fetches a single empresa by its UUID.
     * @param {string} uuid - The UUID of the empresa.
     * @returns {Promise<AxiosResponse<Empresa>>}
     */
    getEmpresaByUuid(uuid: string) { // Added type for uuid
        return this.get<Empresa>(`${this.URL}/${uuid}`); // Corrected URL
    }

    /**
     * Updates an empresa.
     * @param {string} uuid - The UUID of the empresa to update.
     * @param {EmpresaUpdateDTO} data - The updated empresa data. // Changed type to EmpresaUpdateDTO
     * @returns {Promise<AxiosResponse<Empresa>>}
     */
    updateEmpresa(uuid: string, data: EmpresaUpdateDTO) { // Added types for uuid and data
        return this.put<Empresa>(`${this.URL}/${uuid}`, data);
    }

    /**
     * Deletes an empresa by its UUID.
     * @param {string} uuid - The UUID of the empresa to delete.
     * @returns {Promise<AxiosResponse<void>>}
     */
    deleteEmpresa(uuid: string) { // Added type for uuid
        return this.delete<void>(`${this.URL}/${uuid}`);
    }
}
