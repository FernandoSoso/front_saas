import http from "./http.js";

export const listarEmpresas = async () => {
  //return http.get("/empresas")
  return {
    data: [
      { id: 1, nome: "Açougue Boi Forte", cnpj: "12.345.678/0001-90" },
      { id: 2, nome: "Premium Carnes RS", cnpj: "45.987.321/0001-12" },
      { id: 3, nome: "Frigorífico São Carlos", cnpj: "33.112.569/0001-44" },
      { id: 4, nome: "Carnes do Vale", cnpj: "09.876.543/0001-00" },
      { id: 5, nome: "Casa de Carne União", cnpj: "77.654.321/0001-55" },
      { id: 6, nome: "Butcher House", cnpj: "28.999.113/0001-81" },
      { id: 7, nome: "Frigorífico Mata Sul", cnpj: "66.200.458/0001-07" },
      { id: 8, nome: "Carne & Cia", cnpj: "81.540.777/0001-33" }
    ]
  };
};

export const listarCatalogo = (empresaId) => {
    //return http.get(`/empresas/${empresaId}/catalogo`)
    return {
        data : [
            { id: 1, nome: "Picanha Bovina", quantidade: 12 },
            { id: 2, nome: "Fraldinha", quantidade: 8 },
            { id: 3, nome: "Costela Suína", quantidade: 20 },
            { id: 4, nome: "Linguiça Toscana", quantidade: 35 },
            { id: 5, nome: "Coxa de Frango", quantidade: 50 },
            { id: 6, nome: "Carne Moída 2ª", quantidade: 18 }
        ]
    }
}

export const cadastrarProduto = (produto, empresaId) => {
    return http.post(`/empresas/${empresaId}/catalogo/cadastrar`, produto)
}