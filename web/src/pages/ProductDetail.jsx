import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useFavorite } from '../hooks/useFavorite';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, User, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, toggleFavorite, loading: favLoading } = useFavorite(id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="w-full md:w-1/2 aspect-square bg-slate-200 rounded-3xl"></div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                        <div className="h-10 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded"></div>
                            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500">Product not found.</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-primary-600 font-bold">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Results
            </button>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-1/2"
                >
                    <div className="aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-1/2 flex flex-col"
                >
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-bold tracking-tight mb-4">
                            {product.category}
                        </span>
                        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                            {product.title}
                        </h1>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                            <span className="text-slate-400 text-sm">Free shipping included</span>
                        </div>
                    </div>

                    <div className="prose prose-slate mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
                        <p className="text-slate-600 leading-relaxed italic font-light">
                            "{product.description}"
                        </p>
                    </div>

                    <div className="space-y-6 mt-auto">
                        <div className="flex items-center gap-4">
                            <button className="flex-1 btn-primary h-14 flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary-500/30">
                                <ShoppingBag size={20} />
                                Add to Cart
                            </button>
                            {user && (
                                <button
                                    onClick={toggleFavorite}
                                    disabled={favLoading}
                                    className={`h-14 w-14 flex items-center justify-center rounded-2xl border transition-all ${isFavorite
                                            ? 'bg-red-50 border-red-200 text-red-500 shadow-lg shadow-red-500/10'
                                            : 'border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500'
                                        }`}
                                >
                                    <motion.div
                                        animate={isFavorite ? { scale: [1, 1.4, 1] } : {}}
                                    >
                                        <Heart size={28} fill={isFavorite ? 'currentColor' : 'none'} />
                                    </motion.div>
                                </button>
                            )}
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Sold by</p>
                                    <p className="text-sm font-semibold text-slate-900">{product.seller?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                                <ShieldCheck size={14} />
                                Verified Seller
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
