import http from "./http.js";

export const listarPedidos = (empresaId) => {
    return {
        data: [
            {
                id: 101,
                nome: "Pedido - 101",
                status: "PENDENTE",
                empresa_id: 1,

                comprador: {
                    id: 1,
                    nome: "João Silva",
                    telefone: "11988884444",
                    email: "joao@example.com"
                },

                endereco_entrega: {
                    id: 1,
                    logradouro: "Av. Paulista",
                    numero: "1000",
                    complemento: "Apto 101",
                    bairro: "Bela Vista",
                    cidade: "São Paulo",
                    estado: "SP",
                    cep: "01311-000"
                },

                produtos: [
                    { id: 1, nome: "Picanha Premium", valor: 89.90, quantidade: 2, unidade_medida: "kg", empresa_id: 1 },
                    { id: 3, nome: "Linguiça Toscana", valor: 22.50, quantidade: 3, unidade_medida: "kg", empresa_id: 1 }
                ]
            },

            {
                id: 102,
                nome: "Pedido - 102",
                status: "PENDENTE",
                empresa_id: 1,

                comprador: {
                    id: 2,
                    nome: "Maria Oliveira",
                    telefone: "11999995555",
                    email: "maria@example.com"
                },

                endereco_entrega: {
                    id: 2,
                    logradouro: "Rua das Flores",
                    numero: "200",
                    complemento: null,
                    bairro: "Centro",
                    cidade: "Curitiba",
                    estado: "PR",
                    cep: "80010-050"
                },

                produtos: [
                    { id: 4, nome: "Costela Bovina", valor: 39.90, quantidade: 5, unidade_medida: "kg", empresa_id: 1 }
                ]
            },

            {
                id: 103,
                nome: "Pedido - 103",
                status: "CONCLUIDO",
                empresa_id: 1,

                comprador: {
                    id: 3,
                    nome: "Pedro Souza",
                    telefone: "31977776666",
                    email: "pedro@example.com"
                },

                endereco_entrega: {
                    id: 3,
                    logradouro: "Av. Brasil",
                    numero: "300",
                    complemento: "Casa 2",
                    bairro: "Jardim Europa",
                    cidade: "Belo Horizonte",
                    estado: "MG",
                    cep: "30140-001"
                },

                produtos: [
                    { id: 5, nome: "Fraldinha", valor: 49.90, quantidade: 1.5, unidade_medida: "kg", empresa_id: 1 },
                    { id: 2, nome: "File Mignon", valor: 119.90, quantidade: 1, unidade_medida: "kg", empresa_id: 1 }
                ]
            },

            {
                id: 104,
                nome: "Pedido - 104",
                status: "CONCLUIDO",
                empresa_id: 1,

                comprador: {
                    id: 4,
                    nome: "Ana Costa",
                    telefone: "21955553333",
                    email: "ana@example.com"
                },

                endereco_entrega: {
                    id: 4,
                    logradouro: "Rua Verde",
                    numero: "45",
                    complemento: null,
                    bairro: "Copacabana",
                    cidade: "Rio de Janeiro",
                    estado: "RJ",
                    cep: "22060-010"
                },

                produtos: [
                    { id: 6, nome: "Cupim", valor: 32.50, quantidade: 4, unidade_medida: "kg", empresa_id: 1 }
                ]
            },

            {
                id: 105,
                nome: "Pedido - 105",
                status: "PENDENTE",
                empresa_id: 1,

                comprador: {
                    id: 5,
                    nome: "Lucas Pereira",
                    telefone: "11933332222",
                    email: "lucas@example.com"
                },

                endereco_entrega: {
                    id: 5,
                    logradouro: "Rua das Palmeiras",
                    numero: "22",
                    complemento: "Bloco B",
                    bairro: "Moema",
                    cidade: "São Paulo",
                    estado: "SP",
                    cep: "04523-000"
                },

                produtos: [
                    { id: 7, nome: "Carne Moída", valor: 29.90, quantidade: 2, unidade_medida: "kg", empresa_id: 1 }
                ]
            },

            {
                id: 106,
                nome: "Pedido - 106",
                status: "PENDENTE",
                empresa_id: 2,

                comprador: {
                    id: 6,
                    nome: "Fernanda Lima",
                    telefone: "41955556666",
                    email: "fernanda@example.com"
                },

                endereco_entrega: {
                    id: 6,
                    logradouro: "Rua Azul",
                    numero: "150",
                    complemento: "",
                    bairro: "Mercês",
                    cidade: "Curitiba",
                    estado: "PR",
                    cep: "80710-000"
                },

                produtos: [
                    { id: 8, nome: "Alcatra", valor: 55.90, quantidade: 3, unidade_medida: "kg", empresa_id: 2 }
                ]
            },

            {
                id: 107,
                nome: "Pedido - 107",
                status: "PENDENTE",
                empresa_id: 2,

                comprador: {
                    id: 7,
                    nome: "Carlos Mendes",
                    telefone: "61988887777",
                    email: "carlos@example.com"
                },

                endereco_entrega: {
                    id: 7,
                    logradouro: "SQN 202",
                    numero: "Bloco A",
                    complemento: "Ap 404",
                    bairro: "Asa Norte",
                    cidade: "Brasília",
                    estado: "DF",
                    cep: "70832-200"
                },

                produtos: [
                    { id: 9, nome: "Coxão Mole", valor: 45.90, quantidade: 2.3, unidade_medida: "kg", empresa_id: 2 }
                ]
            },

            {
                id: 108,
                nome: "Pedido - 108",
                status: "CONCLUIDO",
                empresa_id: 3,

                comprador: {
                    id: 8,
                    nome: "Juliana Rocha",
                    telefone: "11966664444",
                    email: "juliana@example.com"
                },

                endereco_entrega: {
                    id: 8,
                    logradouro: "Rua Argentina",
                    numero: "99",
                    complemento: "Fundos",
                    bairro: "Novo Mundo",
                    cidade: "Curitiba",
                    estado: "PR",
                    cep: "81050-000"
                },

                produtos: [
                    { id: 10, nome: "Costela Suína", valor: 27.90, quantidade: 3, unidade_medida: "kg", empresa_id: 3 }
                ]
            }
        ]
    };
};

export const getPedido = (pedidoId) => {
    // chamar com o link dps
    return {
        data :    {
                id: 101,
                nome: "Pedido - 101",
                status: "PENDENTE",
                empresa_id: 1,

                comprador: {
                    id: 1,
                    nome: "João Silva",
                    telefone: "11988884444",
                    email: "joao@example.com"
                },

                endereco_entrega: {
                    id: 1,
                    logradouro: "Av. Paulista",
                    numero: "1000",
                    complemento: "Apto 101",
                    bairro: "Bela Vista",
                    cidade: "São Paulo",
                    estado: "SP",
                    cep: "01311-000"
                },

                produtos: [
                    { id: 1, nome: "Picanha Premium", valor: 89.90, quantidade: 2, unidade_medida: "kg", empresa_id: 1 },
                    { id: 3, nome: "Linguiça Toscana", valor: 22.50, quantidade: 3, unidade_medida: "kg", empresa_id: 1 }
                ]
            },
    }
};

export const concluirPedido = (pedidoId) => {
    //chamar end
}