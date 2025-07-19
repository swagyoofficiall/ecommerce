import React, { useState } from 'react';

import Container from '../Container';
import Checkbox from '../Checkbox';
import * as styles from './CardController.module.css';
import Button from '../Button';
import Drawer from '../Drawer';
import Icon from '../Icons/Icon';

const CardController = ({ filters, visible, closeFilter }) => {
  const [category, setCategory] = useState(undefined);
  const [filterState, setFilterState] = useState(filters || []);

  const filterTick = (e, categoryIndex, labelIndex) => {
    const updated = [...filterState];
    updated[categoryIndex].items[labelIndex].value = e.target.checked;
    setFilterState(updated);
  };

  const resetFilter = () => {
    const updated = filterState.map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({ ...item, value: false })),
    }));
    setFilterState(updated);
  };

  return (
    <div>
      {/* Web View */}
      <div
        className={`${styles.webRoot} ${visible ? styles.show : styles.hide}`}
      >
        <Container>
          <div className={styles.filterContainer}>
            {filterState.map((filter, categoryIndex) => {
              const colNum = filter.items.length >= 4 ? 2 : 1;
              return (
                <div key={`category-${categoryIndex}`}>
                  <span className={styles.category}>{filter.category}</span>
                  <div
                    className={styles.nameContainers}
                    style={{ gridTemplateColumns: `repeat(${colNum}, 1fr)` }}
                  >
                    {filter.items.map((item, itemIndex) => (
                      <Checkbox
                        key={itemIndex}
                        action={(e) =>
                          filterTick(e, categoryIndex, itemIndex)
                        }
                        label={item.name}
                        value={item.value}
                        id={item.name}
                        name={item.name}
                        isChecked={item.value}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <div className={styles.actionContainer}>
          <Button
            onClick={closeFilter}
            className={styles.customButtonStyling}
            level="primary"
          >
            view items
          </Button>
          <Button
            onClick={closeFilter}
            className={styles.customButtonStyling}
            level="secondary"
          >
            close
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={styles.mobileRoot}>
        <Drawer visible={visible} close={closeFilter}>
          <div className={styles.mobileFilterContainer}>
            <h2 className={styles.mobileFilterTitle}>Filters</h2>

            {category === undefined ? (
              <div className={styles.mobileFilters}>
                {filterState.map((filterItem, index) => (
                  <div
                    key={index}
                    className={styles.filterItemContainer}
                    role="presentation"
                    onClick={() =>
                      setCategory({ ...filterItem, categoryIndex: index })
                    }
                  >
                    <span className={styles.filterName}>
                      {filterItem.category}
                    </span>
                    <Icon symbol="arrow" />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.mobileCategoryContainer}>
                <div
                  className={styles.mobileHeader}
                  role="presentation"
                  onClick={() => setCategory(undefined)}
                >
                  <Icon symbol="arrow" />
                  <span className={styles.mobileCategory}>
                    {category.category}
                  </span>
                </div>
                {category.items.map((item, index) => (
                  <Checkbox
                    key={index}
                    action={(e) =>
                      filterTick(e, category.categoryIndex, index)
                    }
                    label={item.name}
                    value={item.value}
                    id={item.name}
                    name={item.name}
                    isChecked={item.value}
                  />
                ))}
              </div>
            )}

            <div className={styles.mobileButtonContainer}>
              {category === undefined ? (
                <Button fullWidth level="primary">
                  show results: 1234
                </Button>
              ) : (
                <>
                  <Button onClick={closeFilter} fullWidth level="primary">
                    Apply
                  </Button>
                  <div
                    className={styles.clearFilterContainer}
                    role="presentation"
                    onClick={resetFilter}
                  >
                    <span className={styles.clearFilter}>clear filters</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default CardController;
