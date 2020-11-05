import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorPage from '../../common/components/ErrorPage';
import { RootState } from '../../common/store/rootReducer';
import ProductsRow from './ProductsRow';
import ShopFrontWrapper from './ShopFrontWrapper';
import SpecificCategory from './SpecificCategory';
import SpecificProduct from './SpecificProduct';
import { fetchItems } from './utils/businessLogic';
import {
  fetchItemsFailure,
  fetchItemsSuccess,
  setSelectedCategory,
  setSelectedItemID,
} from './utils/stateMgmt';

export type RouteParams = {
  category?: string;
  itemID?: string;
};

const ShopFront: React.FC = (): JSX.Element => {
  const params = useParams<RouteParams>();
  const { category, itemID } = params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { items, selectedCategory, selectedItemID, fetchError } = useSelector(
    (state: RootState) => state.shopFront,
  );

  useEffect(() => {
    async function fetchHelper() {
      setIsLoading(true);

      const [isFetchedSuccessfully, res] = await fetchItems();

      if (isFetchedSuccessfully) {
        dispatch(fetchItemsSuccess(res));
        dispatch(setSelectedCategory(category || null));
        dispatch(setSelectedItemID(itemID || null));

        setIsLoading(false);
      } else {
        dispatch(fetchItemsFailure(res));
        setIsLoading(false);
      }
    }

    fetchHelper();
  }, [category, itemID]);

  if (isLoading) {
    return <h2 className="title">Fetching items...</h2>;
  }

  if (fetchError) {
    return <ErrorPage error={fetchError} />;
  }

  if (selectedCategory && selectedItemID) {
    const product = items[selectedCategory].find(
      (item) => item.id === selectedItemID,
    );
    return product ? <SpecificProduct product={product} /> : <></>;
  }

  if (selectedCategory) {
    return (
      <SpecificCategory
        category={selectedCategory}
        products={items[selectedCategory]}
      />
    );
  }

  return (
    <ShopFrontWrapper>
      {Object.entries(items).map(([cat, itemsInCategory]) => (
        <ProductsRow
          key={cat}
          showCategory
          category={cat}
          products={itemsInCategory}
        />
      ))}
    </ShopFrontWrapper>
  );
};

export const ShopFrontContainer = styled.div`
  display: grid;
  grid-template-rows: reapeat(5, 1fr);
  grid-gap: 20px;
`;

export default ShopFront;
