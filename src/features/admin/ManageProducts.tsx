import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorPage from '../../common/components/ErrorPage';
import Table from '../../common/components/Table';
import { RootState } from '../../common/store/rootReducer';
import { fetchProducts } from './utils/businessLogic';
import { fetchProductsSuccess, fetchProductsFailure } from './utils/stateMgmt';
import { format } from 'date-fns';
import { TableActions } from '../../common/components/Table/types';
import { ShopItem } from '../shop-front/utils/stateMgmt';
import AdminViewWrapper from './AdminViewWrapper';

const ManageProducts: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const { products, fetchError } = useSelector(
    (state: RootState) => state.admin,
  );

  useEffect(() => {
    async function fetchHelper() {
      setIsloading(true);
      const [isFetchedSuccessfully, res] = await fetchProducts();
      if (isFetchedSuccessfully) {
        dispatch(fetchProductsSuccess(res));
        setIsloading(false);
      } else {
        dispatch(fetchProductsFailure(res));
        setIsloading(false);
      }
    }

    fetchHelper();
  }, []);

  if (isLoading) {
    return <p>Fetching products...</p>;
  }

  if (fetchError) {
    return <ErrorPage error={fetchError} />;
  }

  const columns = [
    {
      align: 'left',
      Header: 'Name',
      accessor: 'name',
    },
    // {
    //   align: 'left',
    //   Header: 'Internal ID',
    //   accessor: 'id',
    //   modifier: (value: string) => value.slice(0, 8),
    // },
    {
      align: 'left',
      Header: 'Rate',
      accessor: 'rate',
    },
    {
      align: 'left',
      Header: 'Category',
      accessor: 'category',
    },
    {
      align: 'center',
      Header: 'Quantity Available',
      accessor: 'quantityAvailable',
    },
    {
      align: 'left',
      Header: 'Date Available',
      accessor: 'dateAvailable',
      modifier: (date: Date) => (
        <p title={date.toDateString()}>
          {/* {`${formatDistance(date, new Date())
            .replace('less than a minute', '< 1 min')
            .replace('minute', 'min')} ago`} */}
          {format(date, 'dd MMMM yyyy')}
        </p>
      ),
    },
  ];

  const actions: TableActions = [
    {
      name: 'Edit',
      onClick: (product: ShopItem) => {
        console.log('Editing:', product);
      },
      allowBulk: false,
    },
    {
      name: 'Archive',
      onClick: (product: ShopItem) => {
        console.log('Archiving:', product);
      },
      allowBulk: true,
    },
    {
      name: 'Approve',
      onClick: (product: ShopItem) => {
        console.log('Approving:', product);
      },
      allowBulk: true,
    },
    {
      name: 'View details',
      onClick: (product: ShopItem) => {
        console.log('Viewing:', product);
      },
      allowBulk: false,
    },
    {
      name: 'Suspend seller',
      onClick: (product: ShopItem) => {
        console.log('Suspending seller:', product);
      },
      allowBulk: true,
    },
  ];
  return (
    <AdminViewWrapper header="products">
      <Table
        tableActions={actions}
        tableColumns={columns}
        tableData={products}
      />
    </AdminViewWrapper>
  );
};

export default ManageProducts;
