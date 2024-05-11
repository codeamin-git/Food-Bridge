import { Link } from "react-router-dom";
import logo from "../../public/food-logo.png"
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
    const {user, logOut} = useAuth()
    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link>Available Foods</Link></li>
        <li><Link to='/addAFood'>Add A Food</Link></li>
        <li><Link>Manage My Foods</Link></li>
        <li><Link>My Food Request</Link></li>
    </>
    return (
        <div className="navbar bg-[#EF5350] text-[#FFFDE7]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#EF5350] rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex items-center">
                    <img className="w-10" src={logo} alt="" />
                <Link to='/' className="rounded-lg btn-ghost text-xl">Food Bridge</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end flex-col md:flex-row items-end text-black gap-2">
                {/* {
                    user ? <Link onClick={logOut} className="p-2 btn-ghost rounded-lg bg-[#FFFDE7]">Log Out</Link> : <>
                    <Link to='/login' className="p-2 btn-ghost rounded-lg bg-[#FFFDE7]">Login</Link>
                <Link to='/signup' className="p-2 btn-ghost rounded-lg bg-[#FFFDE7]">Sign Up</Link>
                    </>  
                } */}
                <Link to='/login' className="p-2 btn-ghost rounded-lg bg-[#FFFDE7]">Login</Link>
                <Link to='/signup' className="p-2 btn-ghost rounded-lg bg-[#FFFDE7]">Sign Up</Link>
                <Link onClick={logOut} className="p-2 btn-ghost rounded-lg bg-[#FFFDE7]">Log Out</Link>
            </div>
        </div>
    );
};

export default Navbar;