import HttpService from './http-service.ts';
import { singleton } from "tsyringe";
import { APIS } from '../../environment/environment.dev';
import { Pedido } from '../models/pedido.model.ts';
import { PedidoCreateDTO } from '../models/pedido-create.model.ts';
import { PedidoUpdateDTO } from '../models/pedido-update.model.ts';

@singleton()
export class PedidoService extends HttpService {
    URL = `${APIS.API_URL}/pedidos`;

    constructor() {
        super();
    }

    /**
     * Fetches all orders.
     * @returns {Promise<AxiosResponse<Pedido[]>>}
     */
    getAllPedidos() {
        return this.get<Pedido[]>(this.URL);
    }

    /**
     * Creates a new order.
     * @param {PedidoCreateDTO} data - The order data to create.
     * @returns {Promise<AxiosResponse<Pedido>>}
     */
    createPedido(data: PedidoCreateDTO) {
        return this.post<Pedido>(this.URL, data);
    }

    /**
     * Fetches a single order by its UUID.
     * @param {string} pedido_uuid - The UUID of the order.
     * @returns {Promise<AxiosResponse<Pedido>>}
     */
    getPedidoByUuid(pedido_uuid: string) {
        return this.get<Pedido>(`${this.URL}/${pedido_uuid}`);
    }

    /**
     * Updates an order.
     * @param {string} pedido_uuid - The UUID of the order to update.
     * @param {PedidoUpdateDTO} data - The updated order data.
     * @returns {Promise<AxiosResponse<Pedido>>}
     */
    updatePedido(pedido_uuid: string, data: PedidoUpdateDTO) {
        return this.put<Pedido>(`${this.URL}/${pedido_uuid}`, data);
    }

    /**
     * Deletes an order by its UUID.
     * @param {string} pedido_uuid - The UUID of the order to delete.
     * @returns {Promise<AxiosResponse<void>>}
     */
    deletePedido(pedido_uuid: string) {
        return this.delete<void>(`${this.URL}/${pedido_uuid}`);
    }

    /**
     * Concludes an order by setting its status to CONCLUIDO.
     * @param {string} pedido_uuid - The UUID of the order to conclude.
     * @param status
     * @returns {Promise<AxiosResponse<Pedido>>}
     */
    changeStatus(pedido_uuid: string, status: string) {
        const data: PedidoUpdateDTO = {
            status: status,
            concluido: status === 'CONCLUIDO',
        };
        return this.updatePedido(pedido_uuid, data);
    }

    /**
     * Fetches orders by company UUID.
     * @param {string} empresa_uuid - The UUID of the company.
     * @returns {Promise<AxiosResponse<Pedido[]>>}
     */
    getPedidosByEmpresaUuid(empresa_uuid: string) {
        return this.get<Pedido[]>(`${this.URL}/empresa/${empresa_uuid}`);
    }
}
