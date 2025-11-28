import HttpService from './http-service.ts';
import { singleton } from "tsyringe";
import { APIS } from '../../environment/environment.dev';
import { Produto } from '../models/produto.model.ts';
import { ProdutoCreateDTO } from '../models/produto-create.model.ts';
import { ProdutoUpdateDTO } from '../models/produto-update.model.ts';

@singleton()
export class ProdutoService extends HttpService {
    URL = `${APIS.API_URL}/produtos`;

    constructor() {
        super();
    }

    /**
     * Fetches all products.
     * @returns {Promise<AxiosResponse<Produto[]>>}
     */
    getAllProdutos() {
        return this.get<Produto[]>(this.URL);
    }

    /**
     * Creates a new product.
     * @param {ProdutoCreateDTO} data - The product data to create.
     * @returns {Promise<AxiosResponse<Produto>>}
     */
    createProduto(data: ProdutoCreateDTO) {
        return this.post<Produto>(this.URL, data);
    }

    /**
     * Fetches a single product by its UUID.
     * @param {string} uuid - The UUID of the product.
     * @returns {Promise<AxiosResponse<Produto>>}
     */
    getProdutoByUuid(uuid: string) {
        return this.get<Produto>(`${this.URL}/${uuid}`);
    }

    /**
     * Updates a product.
     * @param {string} uuid - The UUID of the product to update.
     * @param {ProdutoUpdateDTO} data - The updated product data.
     * @returns {Promise<AxiosResponse<Produto>>}
     */
    updateProduto(uuid: string, data: ProdutoUpdateDTO) {
        return this.put<Produto>(`${this.URL}/${uuid}`, data);
    }

    /**
     * Deletes a product by its UUID.
     * @param {string} uuid - The UUID of the product to delete.
     * @returns {Promise<AxiosResponse<void>>}
     */
    deleteProduto(uuid: string) {
        return this.delete<void>(`${this.URL}/${uuid}`);
    }

    /**
     * Fetches products by company UUID.
     * @param {string} empresa_uuid - The UUID of the company.
     * @returns {Promise<AxiosResponse<Produto[]>>}
     */
    getProdutosByEmpresaUuid(empresa_uuid: string) {
        return this.get<Produto[]>(`${this.URL}/empresa/${empresa_uuid}`);
    }
}
