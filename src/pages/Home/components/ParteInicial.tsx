import {MapPinned, Star, Volume2, VolumeX} from "lucide-react";
import cozinheiro from "../../../assets/cozinheiro.png";
import JonPork from "../../../assets/JonPork.jpg";
import videoIntro from "../../../assets/rafael_intro.mp4";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";


const ParteInicial = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);

    // State for video controls and visibility
    const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay and avoid NotAllowedError
    const [videoEndedOnce, setVideoEndedOnce] = useState(false);
    const [showVideo, setShowVideo] = useState(true); // Controls if video container is rendered

    // Initial play effect: Start muted to avoid NotAllowedError
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true; // Explicitly set muted
            videoRef.current.play().catch(error => {
                console.error("Erro ao tentar tocar o vídeo:", error);
                // If autoplay with sound is blocked, try playing muted as a fallback
                if (error.name === "NotAllowedError") {
                    console.warn("Autoplay with sound was blocked by the browser. Video will start muted.");
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        setIsMuted(true);
                        videoRef.current.play().catch(e => console.error("Fallback muted play failed:", e));
                    }
                }
            });
        }
    }, []);

    // Handler for when the video ends
    const handleVideoEnded = () => {
        if (!videoEndedOnce) { // Only execute this logic the first time the video ends
            setVideoEndedOnce(true);
            setIsMuted(true); // Ensure it's muted after first play
            if (videoRef.current) {
                videoRef.current.pause(); // Pause after first play
            }
            // Video disappears instantly after ending
            setShowVideo(false);
        }
    };

    const handleMuteToggle = () => {
        setIsMuted(prev => !prev);
    };


    return (
        <div className="flex gap-[50px] relative">
            <div className="space-y-5 w-4/5">
                <div className="text-4xl flex gap-5 font-semibold">
                    <h1 className="text-white bg-gradient-to-t from-orange-500 to-[#A8201A] rounded-xl py-1 px-2 rotate-[-11deg]">N°1</h1>
                    <h1>Em produtos cárneos!</h1>
                </div>
                <h2 className="text-4xl font-semibold">
                    Faça seus pedidos do jeito certo — rápido, fácil e sem erros.
                </h2>
                <p className="text-xl">
                    Monte pedidos personalizados, veja preços, consulte disponibilidade e acompanhe todas as etapas do
                    seu pedido em um só lugar.
                </p>

                <div onClick={() => navigate("/pedir")}
                     className="font-semibold w-[130px] cursor-pointer hover:bg-red-900 flex justify-center items-center gap-1 text-md text-white mb-[30px] bg-[#A8201A]  rounded-full px-2 py-2">
                    <p>Peça agora!</p>
                </div>
            </div>

            {/* Container da direita com a imagem de fundo e o vídeo sobreposto */}
            <div className={` ${showVideo ? 'w-[400px]' : 'w-2/3'} h-[400px] rounded-3xl rounded-br-none rounded-tr-none bg-orange-500 relative overflow-hidden`}>
                {/* Background image - z-0 */}
                <img src={cozinheiro} alt="cozinheiro" className="absolute inset-0 h-full w-full object-cover z-0"/>

                {/* Video container - now square and centered, conditionally rendered */}
                {showVideo && (
                    <div
                        className="relative w-[400px] h-[400px] rounded-3xl overflow-hidden shadow-2xl"> {/* Fixed square size, z-index to be above background */}
                        <video
                            ref={videoRef}
                            className="w-[400px] h-[400px] object-cover"
                            src={videoIntro}
                            muted={isMuted} // Controlled by state
                            onEnded={handleVideoEnded} // Use the new handler
                            // No loop attribute
                        >
                            Seu navegador não suporta o elemento de vídeo.
                        </video>
                        <button onClick={handleMuteToggle} className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-opacity">
                            {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                        </button>
                    </div>
                )}
            </div>

            <div
                className="bg-white rounded-2xl w-[200px] h-[50px] flex justify-between items-center absolute right-[-80px] bottom-[20px]">
                <img src={JonPork} alt="Jon-Pork" className="ml-2 rounded-full object-cover h-[80%] "/>
                <div className="mr-[20px]">
                    <h1 className="text-md font-bold">Jonny Pórque</h1>
                    <div className="flex text-sm items-center gap-2">
                        <Star size={14} fill="black"/>
                        <h2>9.9</h2>
                        <p>"Excelente!"</p>
                    </div>
                </div>
            </div>

            {/*<div*/}
            {/*    className="z-30 font-bold cursor-pointer hover:bg-stone-400 bg-white rounded-2xl w-[130px] h-[40px] flex justify-around items-center absolute right-[440px] top-[10px]">*/}
            {/*    <MapPinned color="#DD7B04" size={20}/>*/}
            {/*    <h1>Localização</h1>*/}
            {/*</div>*/}
        </div>
    )
}

export default ParteInicial
