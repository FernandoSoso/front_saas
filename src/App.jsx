import { useState } from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from './pages/Catalogo/Catalogo';
import Pedidos from './pages/Pedidos/Pedidos';
import Usuarios from './pages/Usuarios/Usuarios';
import ChatPedido from './pages/ChatPedido/ChatPedido';
import LoginCadastro from './pages/LoginCadastro/LoginCadastro';
import Empresas from './pages/Empresas/Empresas';
import SelecionarEmpresaPraPedir from './pages/SelecionarEmpresaPraPedir/SelecionarEmpresaPraPedir';
import Produto from './pages/Produto/Produto';
import DetalhesPedido from './pages/DetalhesPedido/DetalhesPedido';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/empresas" element={<Empresas/>}/>
          <Route path="/:empresaId/catalogo" element={<Catalogo/>}/>
          <Route path="/produto/:produtoId" element={<Produto />}/>
          <Route path="/pedidos" element={<Pedidos/>}/>
          <Route path="/pedido/:pedidoId" element={<DetalhesPedido />}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
          <Route path="/pedir" element={<SelecionarEmpresaPraPedir/>}/>
          <Route path="/:empresaId/chat-pedido" element={<ChatPedido />}/>
          <Route path="/login" element={<LoginCadastro />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
