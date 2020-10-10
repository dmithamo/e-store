import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { usePagination, useTable } from 'react-table';
import styled from 'styled-components';
import Button from '../Button';
import TablePagination from './TablePagination';
import { TableData, TableColumn, TableActions } from './types';

type TableProps = {
  tableColumns: TableColumn[];
  tableData: TableData;
  tableActions: TableActions;
};

const numberColumn = {
  Header: 'No.',
  accessor: 'index',
  align: 'center',
};

const actionsColumn = {
  Header: <FontAwesomeIcon icon="ellipsis-v" />,

  accessor: 'actions',
  align: 'center',
};

const Table: React.FC<TableProps> = ({
  tableColumns,
  tableData,
  tableActions,
}: TableProps): JSX.Element => {
  const columns = useMemo(
    () => [numberColumn, ...tableColumns, actionsColumn],
    [],
  );
  const data = useMemo(
    () =>
      tableData.map((d, i) => ({
        index: i + 1,
        ...d,
        actions: (
          <Button category="link" onClick={() => {}} alignCenter>
            <FontAwesomeIcon icon="ellipsis-h" />
          </Button>
        ),
      })),
    [],
  );

  const actions = useMemo(() => tableActions, []);

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

  // align the contents of a header/cell
  const getColumnAlignment = (header: any) => header.align || 'left';
  const getCellAlignment = (cell: any) => cell.column.align || 'left';

  return (
    <StyledTable>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hgroup: any) => (
              <tr {...hgroup.getHeaderGroupProps()}>
                {hgroup.headers.map((header: any, i: number) => (
                  <th
                    className={i === 1 ? 'fix-col' : ''}
                    style={{ textAlign: getColumnAlignment(header) }}
                    {...header.getHeaderProps()}
                  >
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
                  {row.cells.map((cell: any, i: number) => (
                    <td
                      className={i === 1 ? 'fix-col' : ''}
                      style={{ textAlign: getCellAlignment(cell) }}
                      {...cell.getCellProps()}
                    >
                      {modifyData(cell)}
                    </td>
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
  padding: 3em 0;

  div.table-container {
    width: 91%;
    height: 68vh;
    overflow: auto;
    overflow-y: visible;

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
          width: 155px;
          padding: 1.5em;

          :first-child {
            font-weight: bold;
            width: 50px;
          }

          :nth-of-type(2) {
            width: 250px;
          }
        }
      }
    }
  }

  td.fix-col,
  th.fix-col {
    color: red;
    position: sticky;
    z-index: 2000;
    top: auto;
    left: 0;
    width: 6em;
    background-color: inherit;
    color: inherit;
  }

  th.fix-col {
    background-color: var(--navyBlue);
  }
`;

export default Table;
