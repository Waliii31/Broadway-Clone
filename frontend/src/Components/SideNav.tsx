import { House, Menu, ScrollText, ShoppingCart, User } from "lucide-react"

const SideNav = () => {
    return (
        <div className="flex sticky top-0 left-0 bg-[#202020] h-full min-h-screen w-20 flex-col justify-between border-e border-[#202020]">
            <div>
                <div className="px-4">
                    <ul className="space-y-10 pt-3">
                        <li>
                            <a
                                href="#"
                                className="group bg-black relative flex justify-center rounded-full px-2 py-3"
                            >
                                <Menu color="#fff" strokeWidth={2} />
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="group relative flex justify-center rounded-full px-2 py-2.5 bg-yellow-400"
                            >
                                <House color="#fff" />
                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Order
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="group relative flex justify-center rounded-sm px-2 py-2.5"
                            >
                                <ScrollText size={30} color="#fff" />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Menu
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="group relative flex justify-center rounded-sm px-2 py-2.5"
                            >
                                <ShoppingCart size={30} color="#fff" />
                                <span className="absolute top-0 right-0 bg-yellow-400 text-white text-sm py-0.2 rounded-full px-1.5 font-semibold">
                                    0
                                </span>


                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Cart
                                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="group relative flex justify-center rounded-sm px-2 py-2.5"
                            >
                                <User size={30} color="#fff" />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Account
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideNav