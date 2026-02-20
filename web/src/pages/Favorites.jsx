import { useState, useEffect } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/favorites');
            setFavorites(data);
        } catch (error) {
            console.error('Failed to fetch favorites', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                    <Heart className="text-red-500 fill-current" />
                    My Favorites
                </h1>
                <p className="text-slate-500 mt-2">All the items you've saved for later</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : favorites.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {favorites.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200"
                >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={40} className="text-slate-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Your favorites list is empty</h2>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                        Explore our collection and save items you love to see them here.
                    </p>
                    <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                        Go Shopping
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default Favorites;
