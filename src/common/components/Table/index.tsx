import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

type TableColumn = { Header: string; accessor: string; modifier?: Function };
type TableData = { [key: string]: any }[];

type TableProps = {
  tableColumns: TableColumn[];
  tableData: TableData;
};

const Table: React.FC<TableProps> = ({
  tableColumns,
  tableData,
}: TableProps): JSX.Element => {
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);

  const instance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = instance;

  // modify data as specified by column modifier
  const modifyData = (cell: any) =>
    (cell.column as any).modifier
      ? (cell.column as any).modifier(cell.value)
      : cell.render('Cell');

  return (
    <StyledTable>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hgroup) => (
            <tr {...hgroup.getHeaderGroupProps()}>
              {hgroup.headers.map((header) => (
                <th {...header.getHeaderProps()}>{header.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{modifyData(cell)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledTable>
  );
};

const StyledTable = styled.div`
  padding: 1rem;
  width: 100%;
  overflow: auto;

  /* <table />, <tr />, <td /> */
  tr,
  td {
    border: 1px dotted var(--veryLightBlack);
  }

  /* <table /> */
  table {
    border-collapse: collapse;
    border: 2px solid var(--veryLightBlack);
  }

  /* <thead /> only */
  thead {
    background-color: var(--navyBlue);
    color: var(--offWhite);
    tr {
      th {
        border-right: 1px dotted var(--offWhite);
        :last-child {
          border-right: none;
        }
      }
    }
  }

  /* <tbody /> only */
  tbody {
    tr:nth-of-type(even) {
      background-color: var(--grey);
    }

    tr:nth-of-type(odd) {
      background-color: var(--offWhite);
    }
  }

  /* COMMON to <tbody /> and <thead /> */
  td,
  th {
    padding: 1em;
    min-width: 150px;
    text-align: left;
  }
`;

export default Table;
