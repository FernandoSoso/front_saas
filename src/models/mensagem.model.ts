import {Pedido} from "./pedido.model"; // Ensure correct import path

export enum MensagemRole {
    MODEL = "model",
    USER = "user"
}

interface ChatRequest {
}

export class Mensagem {
    role?: MensagemRole;
    content?: string;
}

export class MensagemRequestDTO {
    empresa_uuid?: string;
    chat_history: Mensagem[];
    pedido_uuid?: string;
}

export class MensagemResponseDTO {
    pedido?: Pedido;
    response_text?: string;
}
