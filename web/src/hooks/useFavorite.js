import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export const useFavorite = (productId) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.favorites) {
            setIsFavorite(user.favorites.some(fav => (fav._id || fav) === productId));
        }
    }, [user, productId]);

    const toggleFavorite = async () => {
        if (!user) return;
        setLoading(true);
        try {
            if (isFavorite) {
                await API.delete(`/favorites/${productId}`);
                setIsFavorite(false);
            } else {
                await API.post(`/favorites/${productId}`);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Failed to toggle favorite', error);
        } finally {
            setLoading(false);
        }
    };

    return { isFavorite, toggleFavorite, loading };
};
