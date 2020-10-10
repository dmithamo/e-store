import React, { useMemo } from 'react';
import { usePagination, useTable } from 'react-table';
import styled from 'styled-components';
import TablePagination from './TablePagination';

type TableColumn = { Header: string; accessor: string; modifier?: Function };
type TableData = { [key: string]: any }[];

type TableProps = {
  tableColumns: TableColumn[];
  tableData: TableData;
};

const numberColumn = {
  Header: 'No.',
  accessor: 'index',
};

const Table: React.FC<TableProps> = ({
  tableColumns,
  tableData,
}: TableProps): JSX.Element => {
  const columns = useMemo(() => [numberColumn, ...tableColumns], []);
  const data = useMemo(
    () => tableData.map((d, i) => ({ index: i + 1, ...d })),
    [],
  );

  const tableOptions = {
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 10 },
  };

  const instance = useTable(tableOptions as any, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = instance as any;

  // modify data as specified by column modifier
  const modifyData = (cell: any) =>
    (cell.column as any).modifier
      ? (cell.column as any).modifier(cell.value)
      : cell.render('Cell');

  return (
    <StyledTable>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hgroup: any) => (
              <tr {...hgroup.getHeaderGroupProps()}>
                {hgroup.headers.map((header: any) => (
                  <th {...header.getHeaderProps()}>
                    {header.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <td {...cell.getCellProps()}>{modifyData(cell)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </StyledTable>
  );
};

const StyledTable = styled.div`
  position: relative;
  padding: 2em 0;

  div.table-container {
    width: 80%;
    height: 65vh;
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
      table-layout: fixed;
      width: 100%;
    }

    /* COMMON to <tbody /> and <thead /> */

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

    /* both <thead /> and <tbody />*/
    thead,
    tbody {
      tr {
        td,
        th {
          width: 125px;
          padding: 1.5em;
          text-align: left;

          :first-child {
            font-weight: bold;
            width: 50px;
            text-align: center;
          }

          :nth-of-type(3) {
            width: 200px;
          }
        }
      }
    }
  }
`;

export default Table;
