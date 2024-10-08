import * as React from 'react';
import AdminViewWrapper from './AdminViewWrapper';

const Dashboard: React.FC = (): JSX.Element => (
  <AdminViewWrapper error={false} isLoading={false} header="">
    <p
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80vh',
      }}
    >
      Working on IT&trade;
    </p>
  </AdminViewWrapper>
);

export default Dashboard;
