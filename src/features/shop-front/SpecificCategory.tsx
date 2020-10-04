import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../common/store/rootReducer';
import ProductsRow from './ProductsRow';
import { fetchItems } from './utils/businessLogic';
import { fetchItemsFailure, fetchItemsSuccess } from './utils/stateMgmt';

export type RouteParams = {
  category: string;
  [key: string]: any;
};

const SpecificCategory: React.FC = (): JSX.Element => {
  const params = useParams<RouteParams>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { items, fetchError } = useSelector(
    (state: RootState) => state.shopFront,
  );

  useEffect(() => {
    async function fetchAllItems() {
      setIsLoading(true);
      const [isFetchedSuccessfully, res] = await fetchItems(params.category);
      if (isFetchedSuccessfully) {
        dispatch(fetchItemsSuccess(res));
        setIsLoading(false);
      } else {
        dispatch(fetchItemsFailure(res));
        setIsLoading(false);
      }
    }

    fetchAllItems();
  }, []);

  if (isLoading) {
    return <h2 className="title">Fetching items...</h2>;
  }

  if (fetchError) {
    return (
      <div style={{ color: 'red' }}>
        <h2 className="title">Error fetching items</h2>
        {JSON.stringify(fetchError, null, 2)}
      </div>
    );
  }

  return (
    <ShopFrontContainer>
      {Object.entries(items).map(([category, itemsInCategory]) => (
        <ProductsRow
          showCategory={false}
          category={category}
          products={itemsInCategory}
        />
      ))}
    </ShopFrontContainer>
  );
};

export const ShopFrontContainer = styled.div`
  display: grid;
  grid-template-rows: reapeat(5, 1fr);
  grid-gap: 20px;
`;

export default SpecificCategory;
