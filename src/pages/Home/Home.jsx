import Header from "../../components/Header"
import Cards from "./components/Cards"
import ParteInicial from "./components/ParteInicial"

const Home = () => {

    return (
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <ParteInicial/>
                <Cards />
            </div>
        </div>
    )
}

export default Home