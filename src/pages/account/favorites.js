import React, { useState, useEffect } from 'react';
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
  const [showDelete, setShowDelete] = useState(false);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          id,
          color,
          size,
          product_id,
          products ( title, image, alt_text )
        `)
        .eq('user_id', user.id);

      if (!error) setFavorites(data);
    };

    fetchFavorites();
  }, []);

  const handleRemove = async () => {
    if (!selectedFavoriteId) return;
    await supabase.from('user_favorites').delete().eq('id', selectedFavoriteId);
    setFavorites((prev) => prev.filter((fav) => fav.id !== selectedFavoriteId));
    setShowDelete(false);
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
          <div className={styles.favoriteListContainer}>
            {favorites.map((fav) => (
              <FavoriteCard
                key={fav.id}
                data={fav}
                showConfirmDialog={() => {
                  setSelectedFavoriteId(fav.id);
                  setShowDelete(true);
                }}
              />
            ))}
          </div>
        </Container>
      </div>

      <Modal visible={showDelete} close={() => setShowDelete(false)}>
        <div className={styles.confirmDeleteContainer}>
          <h4>Remove from Favorites?</h4>
          <p>
            Are you sure you want to remove this from your favorites? You cannot undo this action.
          </p>
          <div className={styles.actionContainer}>
            <Button onClick={handleRemove} level={'primary'}>Delete</Button>
            <Button onClick={() => setShowDelete(false)} level={'secondary'}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default FavoritesPage;
