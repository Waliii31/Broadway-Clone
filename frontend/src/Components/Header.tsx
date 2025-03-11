import logo from '../assets/logo.png'

const Header = () => {
    return (
        <header className="text-white w-full py-2 px-2 flex justify-between items-center">
            <img src={logo} className='h-12' alt="" />
            <a href="" className='bg-yellow-400 text-md text-[#121212] py-1 px-3 rounded-md'>Delivery/Pickup</a>
        </header>
    )
}

export default Header