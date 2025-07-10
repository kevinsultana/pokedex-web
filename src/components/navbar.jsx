import { AiFillHome } from "react-icons/ai";
import { MdCatchingPokemon } from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import input from "daisyui/components/input";
import { GiRegeneration } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router";

function Logo() {
  return (
    <div className="logo w-32 h-12">
      <img
        src="https://vanilla-web-pokedex.pages.dev/assets/images/pokedex-logo.png"
        alt="logo"
        className=""
      />
    </div>
  );
}

function DropdownBtn() {
  const navigate = useNavigate();
  return (
    <div className="dropdown relative ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <HiViewList className="text-white text-2xl" />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-rose-800 rounded-box z-1 mt-3 w-52 p-2 shadow top-[40px] right-0"
      >
        <li className="capitalize">
          <a onClick={() => navigate("/")}>
            <AiFillHome /> home
          </a>
        </li>
        <li>
          <a onClick={() => navigate("/my-pokemon")} className="capitalize">
            <MdCatchingPokemon />
            pokemon
          </a>
        </li>
        <li className="capitalize">
          <a onClick={() => navigate("/evolve")}>
            <GiRegeneration /> generation detail
          </a>
        </li>
      </ul>
    </div>
  );
}

function NavbarSec() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="navbar bg-red-500/50  flex-row px-8">
      <div className="navbar-start">
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li
            className={`capitalize ${
              location.pathname === "/" ? "bg-rose-800" : ""
            } text-white text-[16px] rounded-2xl`}
          >
            <a onClick={() => navigate("/")}>
              <AiFillHome /> home
            </a>
          </li>
          <li
            className={`capitalize ${
              location.pathname === "/my-pokemon" ? "bg-rose-800" : ""
            } text-white text-[16px] rounded-2xl`}
          >
            <a onClick={() => navigate("/my-pokemon")}>
              <MdCatchingPokemon />
              My pokemon
            </a>
          </li>
          <li
            className={`capitalize ${
              location.pathname === "/evolve" ? "bg-rose-800" : ""
            } text-white text-[16px] rounded-2xl`}
          >
            <a onClick={() => navigate("/evolve")}>
              <GiRegeneration /> generation detail
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex text-[#DD092F]">.</div>
      <div className="navbar-end lg:hidden ">
        <DropdownBtn />
      </div>
    </nav>
  );
}
export default NavbarSec;
