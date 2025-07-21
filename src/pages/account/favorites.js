import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import * as styles from './favorites.module.css';

import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import Layout from '../../components/Layout/Layout';
import Modal from '../../components/Modal';

import { isAuth } from '../../helpers/general';
import { supabase } from '../../lib/supabase';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUserId(user.id);

      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error.message);
      } else {
        setFavorites(data || []);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async () => {
    if (!selectedFavoriteId) return;

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('id', selectedFavoriteId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing favorite:', error.message);
    } else {
      setFavorites(favorites.filter(fav => fav.id !== selectedFavoriteId));
      setShowDelete(false);
    }
  };

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Home' },
              { link: '/account/favorites', label: 'Favorites' },
            ]}
          />
          <h1>Favorites</h1>

          {favorites.length === 0 ? (
            <p>No favorite items saved.</p>
          ) : (
            <div className={styles.favoriteListContainer}>
              {favorites.map((fav) => (
                <FavoriteCard
                  key={fav.id}
                  color={fav.color}
                  size={fav.size}
                  img={fav.img_url}
                  alt={fav.product_name}
                  showConfirmDialog={() => {
                    setSelectedFavoriteId(fav.id);
                    setShowDelete(true);
                  }}
                />
              ))}
            </div>
          )}
        </Container>
      </div>

      <Modal visible={showDelete} close={() => setShowDelete(false)}>
        <div className={styles.confirmDeleteContainer}>
          <h4>Remove from Favorites?</h4>
          <p>
            Are you sure you want to remove this from your favorites? You cannot
            undo this action once you press <strong>'Delete'</strong>.
          </p>
          <div className={styles.actionContainer}>
            <Button onClick={handleRemoveFavorite} level="primary">
              Delete
            </Button>
            <Button onClick={() => setShowDelete(false)} level="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default FavoritesPage;
