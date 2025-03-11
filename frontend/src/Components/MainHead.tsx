import Banner from "./Banner"
import Footer from "./Footer"
import Header from "./Header"
import MenuSections from "./MenuSections"
import SectionNavbar from "./SectionNavbar"


const MainHead = () => {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            <Banner/>
            <SectionNavbar/>
            <MenuSections/>
            <Footer/>
        </div>
    )
}
export default MainHead