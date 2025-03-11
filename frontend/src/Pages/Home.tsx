import MainHead from "../Components/MainHead"
import SideNav from "../Components/SideNav"


const Home = () => {
  return (
    <div className="bg-[#121212] w-full h-full min-h-screen flex justify-between items-start"> 
        <SideNav/>
        <MainHead/>
    </div>
  )
}

export default Home