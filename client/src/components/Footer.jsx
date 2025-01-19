import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="lg:h-20 flex items-center justify-evenly bg-slate-950 border-t border-slate-500">
            <section className="flex flex-col gap-y-2 p-2 lg:p-0 lg:pr-2">
                <p className="text-slate-300 font-normal text-xs lg:text-base">
                    <span className="text-slate-500">Creado por </span> 
                    <span className="font-semibold">Alejandro Beristain </span>
                    <span className="text-slate-500"> (SpideRRojO) </span> 
                </p>

                <p className="text-slate-300 font-normal text-xs lg:text-sm">
                    <span className="text-slate-500">Colaboradores: </span> 
                    <span className="font-semibold">Gonzalo Beristain</span> 
                    <span className="text-slate-500"> (GxAxBxA)</span>
                </p>
            </section>
            <section>
                <p className="text-slate-300 font-semibold hidden lg:block">© 2025</p>
            </section>
            <section className="flex flex-col items-center">

                <section className="flex gap-x-1 pr-2 pb-1 lg:pb-0 lg:pr-0 lg:gap-x-3">
                    <Link to="https://web.facebook.com/MOhaa.CL">
                        <FaFacebook className="fill-[#FFFFFF] text-xl lg:text-3xl hover:fill-[#0b34e9] transition-all duration-500 hover:scale-125" />
                    </Link>
                    <Link to="https://www.instagram.com/mohaa.cl?igsh=Zjg1dWo2dHdwMWFy">
                        <FaInstagram className="fill-[#FFFFFF] text-xl lg:text-3xl hover:fill-[#e621a4] transition-all duration-500 hover:scale-125" />
                    </Link>
                    <Link to="https://www.youtube.com/channel/UC0VfLrZsgXXteG8QNn6GFPw">
                        <FaYoutube className="fill-[#FFFFFF] text-xl lg:text-3xl hover:fill-[#c92222] transition-all duration-500 hover:scale-125" />
                    </Link>
                    <Link to="https://www.tiktok.com/@zurf_rf?is_from_webapp=1&sender_device=pc">
                        <FaTiktok className="fill-[#FFFFFF] text-xl lg:text-3xl hover:fill-[#818492] transition-all duration-500 hover:scale-125" />
                    </Link>
                    <Link to="https://chat.whatsapp.com/BaLhaDWgmee10uU0lcaU9T">
                        <FaWhatsapp className="fill-[#FFFFFF] text-xl lg:text-3xl hover:fill-[#066b25] transition-all duration-500 hover:scale-125" />
                    </Link>
                </section>
                <section className="lg:hidden">
                    <p className="text-slate-300 font-semibold text-xs">© 2025</p>
                </section>



            </section>

        </div>
    )
};