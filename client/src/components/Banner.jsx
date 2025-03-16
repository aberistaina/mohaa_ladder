import { Link } from "react-router-dom";

// Iconos
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export const Banner = () => {
  return (
    <section className="w-full hidden md:block">
      <div className="py-5 mb-4 flex flex-col items-center justify-center rounded border-b-2 border-slate-400 bg-slate-950 shadow-xl">
        <img className="h-1/3 w-1/4 hover:scale-125 duration-500 transition-all hidden md:block" src="MOHAAX.png" alt="LogoHome" />
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
      </div>
    </section>
  )
}