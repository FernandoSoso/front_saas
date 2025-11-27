import Mensagem from "./Mensagem"

const ListaMensagens = ({mensagens, loading}) => {

    
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mensagens.map(mensagem =>(
                <Mensagem mensagem={mensagem} loading={loading}/>
            ))}
        </div>
    )
}

export default ListaMensagens