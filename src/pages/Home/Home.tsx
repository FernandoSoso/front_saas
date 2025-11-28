import Header       from "../../components/Header.tsx"
import Cards        from "./components/Cards.tsx"
import ParteInicial from "./components/ParteInicial.tsx"
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.tsx";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <ParteInicial/>
                { !user ? <Cards/> : null}
            </div>
        </div>
    )
}

export default Home
