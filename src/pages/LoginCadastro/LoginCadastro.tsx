import { useState, useEffect } from "react";
import fundo from "../../assets/fundo.png";
import logo_sem_fundo from "../../assets/logo_sem_fundo.png";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UsuarioLoginDTO } from "../../models/usuario-login.model";
import { UsuarioEmpresaCreateDTO } from "../../models/usuario-empresa-create.model";
import { EnderecoCreateDTO } from "../../models/endereco-create.model";
import { useServices } from "../../hooks/useServices";

const LoginCadastro = () => {
    const [aberto, setAberto] = useState(1);
    const [loginForm, setLoginForm] = useState<UsuarioLoginDTO>({ email: '', senha: '' });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [registerForm, setRegisterForm] = useState<UsuarioEmpresaCreateDTO>({
        nome_usuario: '',
        email: '',
        senha: '',
        nome_empresa: '',
        cnpj: '',
        descricao: '',
        pedido_minimo: 0,
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
        },
    });
    const [confirmSenha, setConfirmSenha] = useState('');
    const [registerError, setRegisterError] = useState<string | null>(null);

    const auth = useAuth();
    const navigate = useNavigate();
    const { usuarioService } = useServices();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/");
        }
    }, [auth.isAuthenticated, navigate]);

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        try {
            await auth.login(loginForm);
        } catch (error: any) {
            setLoginError(error.response?.data?.detail || "Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setRegisterForm(prev => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    [field]: value,
                },
            }));
        } else {
            setRegisterForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCepChange = async (e: React.FocusEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setRegisterForm(prev => ({
                        ...prev,
                        endereco: {
                            ...prev.endereco,
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.uf,
                            cep: data.cep,
                        },
                    }));
                } else {
                    setRegisterError("CEP não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                setRegisterError("Erro ao buscar CEP.");
            }
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError(null);

        if (registerForm.senha !== confirmSenha) {
            setRegisterError("As senhas não coincidem.");
            return;
        }

        try {
            await usuarioService.createUsuarioAndEmpresa(registerForm);
            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            setAberto(1); // Switch to login tab
            setRegisterForm({ // Clear form
                nome_usuario: '', email: '', senha: '', nome_empresa: '', cnpj: '', descricao: '', pedido_minimo: 0,
                endereco: { logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' }
            });
            setConfirmSenha('');
        } catch (error: any) {
            setRegisterError(error.response?.data?.detail || "Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <div 
            className="w-screen h-screen bg-cover relative flex  justify-end overflow-hidden"
            style={{ backgroundImage: `url(${fundo})`}}    
        >
            <img src={logo_sem_fundo} alt="logo" className="absolute top-5 left-5 "/>
            <div className="text-md font-semibold flex flex-col justify-center">
                <div onClick={() => setAberto(1)} className={` rounded-2xl rounded-r-none p-3 ${aberto === 1? "bg-[#FEF7EA] text-black" : "cursor-pointer text-white hover:bg-black/30"}`}>
                    <h1 className="ml-2">Login</h1>
                </div>
                <div onClick={() => setAberto(2)}  className={`rounded-2xl rounded-r-none p-3 ${aberto === 2? "bg-[#FEF7EA] text-black" : "cursor-pointer text-white  hover:bg-black/30"}`}>
                    <h1 className="ml-2 ">Cadastro</h1>
                </div>
            </div>

            <div className="relative bg-[#FEF7EA] h-screen w-3/5 flex flex-col overflow-hidden justify-center items-start">
                <div 
                    className={
                        `${aberto === 2 ? "translate-y-0 " : "translate-y-[200%]"} absolute transform transition-all duration-300 ease-in-out
                            flex flex-col items-center w-full h-full overflow-y-auto py-10`
                    }>
                    <h1 className="text-2xl font-semibold mb-3">Cadastre-se</h1>
                    <h2 className="text-md mb-8">Crie sua conta e use todos os recursos da plataforma</h2>
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col font-bold w-[80%]">
                        
                        {/* User Info */}
                        <label htmlFor="nome_usuario" className="ml-3 mb-3">Seu Nome Completo</label>
                        <input type="text" name="nome_usuario" id="nome_usuario" value={registerForm.nome_usuario} onChange={handleRegisterChange}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>

                        <label htmlFor="emailCadastro" className="ml-3 mb-3">Seu E-mail</label>
                        <input type="email" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="email" id="emailCadastro" value={registerForm.email} onChange={handleRegisterChange} required/>
                    
                        <div className="flex gap-4 mb-4"> {/* Group Senha and Confirmar Senha */}
                            <div className="flex-1">
                                <label htmlFor="senhaCadastro" className="ml-3 mb-3 block">Senha</label>
                                <input type="password" className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="senha" id="senhaCadastro" value={registerForm.senha} onChange={handleRegisterChange} required/>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="confirmSenha" className="ml-3 mb-3 block">Confirmar Senha</label>
                                <input type="password" className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="confirmSenha" id="confirmSenha" value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} required/>
                            </div>
                        </div>

                        {/* Company Info */}
                        <h3 className="text-xl font-semibold mt-8 mb-4">Informações da Empresa</h3>

                        <div className="flex gap-4 mb-4"> {/* Group Nome da Empresa and CNPJ */}
                            <div className="flex-1">
                                <label htmlFor="nome_empresa" className="ml-3 mb-3 block">Nome da Empresa</label>
                                <input type="text" name="nome_empresa" id="nome_empresa" value={registerForm.nome_empresa} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="cnpj" className="ml-3 mb-3 block">CNPJ</label>
                                <input type="text" name="cnpj" id="cnpj" value={registerForm.cnpj} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                            </div>
                        </div>

                        <label htmlFor="pedido_minimo" className="ml-3 mb-3">Pedido Mínimo (R$)</label>
                        <input type="number" name="pedido_minimo" id="pedido_minimo" value={registerForm.pedido_minimo} onChange={handleRegisterChange}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        {/* Address Info */}
                        <h3 className="text-xl font-semibold mt-8 mb-4">Endereço da Empresa</h3>

                        <label htmlFor="cep" className="ml-3 mb-3">CEP</label>
                        <input type="text" name="endereco.cep" id="cep" value={registerForm.endereco.cep} onChange={handleRegisterChange} onBlur={handleCepChange}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" maxLength={9} required/>

                        <div className="flex gap-4 mb-4"> {/* Group Logradouro and Número */}
                            <div className="flex-[3]"> {/* Logradouro takes more space */}
                                <label htmlFor="logradouro" className="ml-3 mb-3 block">Logradouro</label>
                                <input type="text" name="endereco.logradouro" id="logradouro" value={registerForm.endereco.logradouro} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="numero" className="ml-3 mb-3 block">Número</label>
                                <input type="text" name="endereco.numero" id="numero" value={registerForm.endereco.numero} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4"> {/* Group Complemento and Bairro */}
                            <div className="flex-1">
                                <label htmlFor="complemento" className="ml-3 mb-3 block">Complemento (Opcional)</label>
                                <input type="text" name="endereco.complemento" id="complemento" value={registerForm.endereco.complemento || ''} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="bairro" className="ml-3 mb-3 block">Bairro</label>
                                <input type="text" name="endereco.bairro" id="bairro" value={registerForm.endereco.bairro} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4"> {/* Group Cidade and Estado */}
                            <div className="flex-[3]"> {/* Cidade takes more space */}
                                <label htmlFor="cidade" className="ml-3 mb-3 block">Cidade</label>
                                <input type="text" name="endereco.cidade" id="cidade" value={registerForm.endereco.cidade} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="estado" className="ml-3 mb-3 block">Estado (UF)</label>
                                <input type="text" name="endereco.estado" id="estado" value={registerForm.endereco.estado} onChange={handleRegisterChange}
                                       className="w-full rounded-xl select-none px-4 py-3 bg-white shadow border border-black" maxLength={2} required/>
                            </div>
                        </div>

                        <label htmlFor="descricao" className="ml-3 mb-3">Descrição da Empresa</label> {/* Moved Descrição to the end of company info */}
                        <textarea name="descricao" id="descricao" value={registerForm.descricao} onChange={handleRegisterChange}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" required/>
                        
                        {registerError && <p className="text-red-500 text-sm mb-3 ml-3">{registerError}</p>}

                        <button type="submit" className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Cadastrar</button>
                    </form>
                    <div className="flex justify-start mt-3 space-x-2">
                        <p>Já tem uma conta?</p>
                        <p onClick={() => setAberto(1)} className="text-[#A8201A] cursor-pointer hover:underline">Acesse por aqui</p>
                    </div>
                </div>

                <div 
                    className={
                        `${aberto === 1 ? "translate-y-0 " : "translate-y-[-200%]"} absolute transform transition-all duration-300 ease-in-out
                            flex flex-col justify-center items-center w-full`
                    }>
                    <h1 className="text-2xl font-semibold mb-3">Acesse sua conta</h1>
                    <h2 className="text-md mb-8">Conecte-se e  monte o seu pedido</h2>
                    <form onSubmit={handleLoginSubmit} className="flex flex-col font-bold w-[60%]">
        
                        <input type="hidden" name="tipo" value="login" />

                        <label htmlFor="emailLogin" className="ml-3 mb-3">E-mail</label>
                        <input 
                            type="email" 
                            className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" 
                            name="email" 
                            id="emailLogin"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            required
                        />
                    
                        <label htmlFor="senhaLogin" className="ml-3 mb-3">Senha</label>
                        <input 
                            type="password" 
                            className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" 
                            name="senha" 
                            id="senhaLogin"
                            value={loginForm.senha}
                            onChange={handleLoginChange}
                            required
                        />
                        
                        {loginError && <p className="text-red-500 text-sm mb-3 ml-3">{loginError}</p>}

                        <button type="submit" className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Entrar</button>
                    </form>
                    <div className="flex justify-start mt-3 space-x-2">
                        <p>Ainda não tem uma conta?</p>
                        <p onClick={() => setAberto(2)} className="text-[#A8201A] cursor-pointer hover:underline">Cadastre-se</p>
                    </div>
                    <button 
                        onClick={() => navigate('/')} 
                        className="mt-6 text-[#A8201A] hover:underline cursor-pointer font-bold"
                    >
                        Voltar para a Página Inicial
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginCadastro
