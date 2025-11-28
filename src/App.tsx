import Home from './pages/Home/Home.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from './pages/Catalogo/Catalogo.tsx';
import Pedidos from './pages/Pedidos/Pedidos.tsx';
import Usuarios      from './pages/Usuarios/Usuarios.tsx';
import ChatPedido    from './pages/ChatPedido/ChatPedido.tsx';
import LoginCadastro             from './pages/LoginCadastro/LoginCadastro.tsx';
import Empresas                  from './pages/Empresas/Empresas.tsx';
import SelecionarEmpresaPraPedir from './pages/SelecionarEmpresaPraPedir/SelecionarEmpresaPraPedir.tsx';
import SelecionarEmpresaParaChat from './pages/SelecionarEmpresaPraPedir/SelecionarEmpresaParaChat.tsx'; // New import
import Produto                   from './pages/Produto/Produto.tsx';
import DetalhesPedido from './pages/DetalhesPedido/DetalhesPedido.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/empresas" element={<Empresas/>}/>
            <Route path="/:empresaUuid/catalogo" element={<Catalogo/>}/>
            <Route path="/produto/:produtoUuid" element={<Produto />}/>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/pedido/:pedidoUuid" element={<DetalhesPedido />}/>
            <Route path="/usuarios" element={<Usuarios/>}/>
            <Route path="/pedir" element={<SelecionarEmpresaPraPedir/>}/>
            <Route path="/selecionar-empresa-chat" element={<SelecionarEmpresaParaChat />} /> {/* New route */}
            <Route path="/chat-pedido/:empresaUuid" element={<ChatPedido />} /> {/* Updated route */}
            <Route path="/login" element={<LoginCadastro />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
