import HttpService from './http-service.ts';
import { singleton } from "tsyringe";
import { APIS } from '../../environment/environment.dev';
import { Usuario } from '../models/usuario.model.ts';
import { UsuarioCreateDTO } from '../models/usuario-create.model.ts';
import { UsuarioEmpresaCreateDTO } from '../models/usuario-empresa-create.model.ts'; // Assuming this DTO exists or will be created
import { UsuarioLoginDTO } from '../models/usuario-login.model.ts';
import { UsuarioUpdateDTO } from '../models/usuario-update.model.ts';

@singleton()
export class UsuarioService extends HttpService {
    URL = `${APIS.API_URL}/usuarios`;

    constructor() {
        super();
    }

    /**
     * Fetches all users.
     * @returns {Promise<AxiosResponse<Usuario[]>>}
     */
    getAllUsuarios() {
        return this.get<Usuario[]>(this.URL);
    }

    /**
     * Creates a new user.
     * @param {UsuarioCreateDTO} data - The user data to create.
     * @returns {Promise<AxiosResponse<Usuario>>}
     */
    createUsuario(data: UsuarioCreateDTO) {
        return this.post<Usuario>(this.URL, data);
    }

    /**
     * Creates a new user and company.
     * @param {UsuarioEmpresaCreateDTO} data - The user and company data to create.
     * @returns {Promise<AxiosResponse<Usuario>>}
     */
    createUsuarioAndEmpresa(data: UsuarioEmpresaCreateDTO) {
        return this.post<Usuario>(`${this.URL}/empresa`, data);
    }

    /**
     * Fetches a single user by its UUID.
     * @param {string} user_uuid - The UUID of the user.
     * @returns {Promise<AxiosResponse<Usuario>>}
     */
    getUsuarioByUuid(user_uuid: string) {
        return this.get<Usuario>(`${this.URL}/${user_uuid}`);
    }

    /**
     * Updates a user.
     * @param {string} user_uuid - The UUID of the user to update.
     * @param {UsuarioUpdateDTO} data - The updated user data.
     * @returns {Promise<AxiosResponse<Usuario>>}
     */
    updateUsuario(user_uuid: string, data: UsuarioUpdateDTO) {
        return this.put<Usuario>(`${this.URL}/${user_uuid}`, data);
    }

    /**
     * Deletes a user by its UUID.
     * @param {string} user_uuid - The UUID of the user to delete.
     * @returns {Promise<AxiosResponse<void>>}
     */
    deleteUsuario(user_uuid: string) {
        return this.delete<void>(`${this.URL}/${user_uuid}`);
    }

    /**
     * Fetches users by company UUID.
     * @param {string} empresa_uuid - The UUID of the company.
     * @returns {Promise<AxiosResponse<Usuario[]>>}
     */
    getUsuariosByEmpresaUuid(empresa_uuid: string) {
        return this.get<Usuario[]>(`${this.URL}/empresa/${empresa_uuid}`);
    }

    /**
     * Performs user login.
     * @param {UsuarioLoginDTO} data - The login credentials.
     * @returns {Promise<AxiosResponse<Usuario>>}
     */
    fazerLogin(data: UsuarioLoginDTO) {
        return this.post<Usuario>(`${this.URL}/login`, data);
    }
}
