import Usuarios from "../pages/Usuarios/Usuarios.jsx";
import http from "./http.js";

export const listarUsuariosEmpresa = (empresaId) => {
    //http.get(`/empresa/${empresaId}/get-usuarios`)
    return {
        data : [
    {
        id: 1,
        nome: "André Santos",
        email: "andre.santos@example.com",
        senha: "senha123"
    },
    {
        id: 2,
        nome: "Mariana Silva",
        email: "mariana.silva@example.com",
        senha: "abc456"
    },
    {
        id: 3,
        nome: "João Pereira",
        email: "joao.pereira@example.com",
        senha: "teste789"
    },
    {
        id: 4,
        nome: "Larissa Martins",
        email: "larissa.martins@example.com",
        senha: "minhasenha"
    }
    ]
    }
}

export const inativarUsuario = (usuarioId) => {
    //chamar link na api
}