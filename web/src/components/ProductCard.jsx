import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorite } from '../hooks/useFavorite';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { isFavorite, toggleFavorite, loading } = useFavorite(product._id);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const background = useMotionTemplate`radial-gradient(
        650px circle at ${mouseX}px ${mouseY}px,
        rgba(14, 165, 233, 0.10),
        transparent 80%
    )`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onMouseMove={handleMouseMove}
            className="product-card group relative overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{ background }}
            />
            <Link to={`/products/${product._id}`} className="block relative z-10">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 right-3 z-10">
                        {user && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleFavorite();
                                }}
                                disabled={loading}
                                className={`p-2.5 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 ${isFavorite
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white'
                                    }`}
                            >
                                <motion.div
                                    animate={isFavorite ? { scale: [1, 1.4, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
                                </motion.div>
                            </button>
                        )}
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-lg text-slate-800 shadow-sm">
                            {product.category}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="p-5 relative z-10">
                <Link to={`/products/${product._id}`}>
                    <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors duration-300 text-lg">
                        {product.title}
                    </h3>
                </Link>
                <p className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed min-h-[40px]">
                    {product.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Price</span>
                        <span className="text-xl font-extrabold text-slate-900">${product.price}</span>
                    </div>
                    <Link
                        to={`/products/${product._id}`}
                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
