import Slogan from "../components/Slogan";
import Presentation from "../components/Presentation"
import Mission from "../components/Mission"
import WorkWithUs from "../components/WorkWithUs";

const Home = () => {
    return (
     <div className="flex flex-col">
        <Slogan />
        <Presentation />
        <Mission />
        <WorkWithUs />
     </div>   
    )
}

export default Home;






