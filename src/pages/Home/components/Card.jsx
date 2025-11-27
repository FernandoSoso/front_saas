import { Storefront, Truck, Notepad } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const Card = ({tipo}) =>{
    const navigate = useNavigate()
    let icone, titulo, paragrafo, textoBotao,link

    switch(tipo){
        case 1:
            icone = <Storefront size={80} color="black" fill="black"/>
            titulo="Catálogos das empresas"
            paragrafo="Consulte cortes, gramaturas, preços e disponibilidade para sua região."
            textoBotao="Abrir catálogos"
            link="/empresas"
            break;
        case 2:
            icone = <Notepad  size={80} color="black"/>
            titulo="Montar pedido"
            paragrafo="Escolha os itens, ajuste quantidades, selecione e veja o valor final na hora."
            textoBotao="Criar pedido"
            link="/pedir"
            break;
        case 3:
            icone = <Truck size={80} color="black" fill="black"/>
            titulo="Acompanhar pedido"
            paragrafo="Veja o status: solicitado, em análise, aprovado, produção, expedição e entrega."
            textoBotao="Acompanhar"
            link="/pedidos"
            break;
    }

    return(
        <div className="max-w-[30%] p-5 space-y-5 bg-white rounded-2xl flex flex-col justify-center items-center font-semibold">
            {icone}
            <h1 className="text-3xl text-center">{titulo}</h1>
            <p>{paragrafo}</p>
            <div onClick={() => navigate(link)} className="font-semibold w-[150px] cursor-pointer hover:bg-red-900 flex justify-center items-center gap-1 text-md text-white mb-[30px] bg-[#A8201A]  rounded-full px-2 py-2">
                <p>{textoBotao}</p>
            </div>  
        </div>
    )
}

export default Card