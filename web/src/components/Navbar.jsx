import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Heart, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:rotate-6 transition-transform duration-300">
                            <ShoppingCart size={22} strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                            Micro<span className="text-sky-600">Market</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link
                                    to="/favorites"
                                    className="relative p-2.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 group"
                                    title="Favorites"
                                >
                                    <Heart size={24} strokeWidth={2} />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
                                </Link>
                                <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 hidden sm:block">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-300"
                                    title="Logout"
                                >
                                    <LogOut size={22} strokeWidth={2} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-sky-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary py-2 text-sm">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
