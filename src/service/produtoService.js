import http from "./http.js";

export const getProduto = (produtoId) => {
    //return http.get(`/produto/${produtoId}`)
    return {
        data: {
            id : 1, 
            nome : "Linguiça",
            quantidade : 100,
            preco: 10,
            unidade_medida : "kg",
            empresa_id : 1
        }
    }
}

export const editProduto = (produto) => {
    return http.patch(`/produto${produto.id}/editar`, produto)
}