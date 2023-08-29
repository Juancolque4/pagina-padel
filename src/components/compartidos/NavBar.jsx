import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RiHome6Line, RiMailLine, RiSettings4Line, RiLogoutCircleRLine } from "react-icons/ri";
import { MdSportsTennis } from "react-icons/md";

const NavBar = (props) => {
    const { mostrarMenu } = props;

    return (
        <>     
        <div className={`bg-[#1F1D2B] fixed lg:left-0 top-0 w-2 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all hover:w-28 hover:shadow-lg 
        ${mostrarMenu ? "left-0" : "-left-full"}`}>
            <div>
                <ul className="pl-0">
                    <Link to="/">
                        <li className="hover:bg-[#262837] p-4 group transition-colors">
                            <a className="group-hover:bg-[#00df9a] p-4 flex justify-center rounded-xl text-[#00df9a] group-hover:text-white transition-colors">
                                <RiHome6Line className="text-2xl" />
                            </a>
                        </li>
                    </Link>

                    <Link to="Paletas">
                    <li className="hover:bg-[#262837] p-4 group transition-colors">
                        <a className="group-hover:bg-[#00df9a] p-4 flex justify-center rounded-xl text-[#00df9a] group-hover:text-white transition-colors">
                            <MdSportsTennis className="text-2xl" />
                        </a>
                    </li>
                    </Link>
                    
                    <Link to="Contactos">
                    <li className="hover:bg-[#262837] p-4 group transition-colors">
                        <a className="group-hover:bg-[#00df9a] p-4 flex justify-center rounded-xl text-[#00df9a] group-hover:text-white transition-colors">
                            <RiMailLine className="text-2xl" />
                        </a>
                    </li>
                    </Link>
                   
                    <Link to="Configuracion">
                    <li className="hover:bg-[#262837] p-4 group transition-colors">
                        <a className="group-hover:bg-[#00df9a] p-4 flex justify-center rounded-xl text-[#00df9a] group-hover:text-white transition-colors">
                            <RiSettings4Line className="text-2xl" />
                        </a>
                    </li>
                    </Link>
                    
                </ul>
            </div>
            <div>
                <ul className="pl-4">
                    <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
                        <a className="group-hover:bg-[#00df9a] p-4 flex justify-center rounded-xl text-[#00df9a] group-hover:text-white transition-colors">
                            <RiLogoutCircleRLine className="text-2xl" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <section>
        <Outlet></Outlet>
    </section>
    </>
    )
}

export default NavBar