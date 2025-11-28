import HttpService from './http-service.ts';
import {singleton} from "tsyringe";
import {MensagemRequestDTO, MensagemResponseDTO} from "../models/mensagem.model.ts";
import { APIS } from '../../environment/environment.dev.ts';

@singleton()
export class MensagemService extends HttpService {
    URL = `${APIS.API_URL}/mensagem`

    constructor() {
        super();
    }

    public enviarMensagem(mensagem: MensagemRequestDTO) {
        return this.post<MensagemResponseDTO>(`${this.URL}/enviar`, mensagem);
    }
}
