const Mensagem = ({mensagem, loading}) => {
    const isBot = mensagem.remetente === "bot"

    return(
        <div className={`flex ${isBot? "justify-start" : "justify-end"}`} >
            <div className={`max-w-xs lg:max-w-md px-5 py-4 rounded-2xl shadow-2xl  cursor-pointer
                ${isBot?"bg-amber-600 font-semibold text-white text-black rounded-bl-none" : 
                    "bg-white text-black rounded-br-none"}
                `}>
                <p className="text-sm whitespace-pre-line">{mensagem.text}</p>
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-stone-600 rounded-bl-none rounded-2xl">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-[#A8201A] rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse delay-100"></div>
                                <div className="w-3 h-3 bg-[#A8201A] rounded-full animate-pulse delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Mensagem