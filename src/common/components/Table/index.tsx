/* eslint-disable no-unused-expressions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo } from 'react';
import { usePagination, useTable } from 'react-table';
import styled from 'styled-components';
import Button from '../Button';
import TablePagination from './TablePagination';
import { TableData, TableColumn, TableActions, ALL_ROWS } from './types';
import RowSelector from './RowSelector';
import GroupActionsContainer from './GroupActionsContainer';
import { breakpoints } from '../../constants';
import { clearSelection } from './utils/stateMgmt';
import { useDispatch } from 'react-redux';

type TableProps = {
  tableColumns: TableColumn[];
  tableData: TableData;
  tableActions: TableActions;
  stateName: string;
};

const Table: React.FC<TableProps> = ({
  tableColumns,
  tableData,
  tableActions,
  stateName,
}: TableProps): JSX.Element => {
  const numberColumn = {
    Header: 'No.',
    accessor: 'index',
    align: 'center',
  };
  const insertNumber = (i: number) => ({ index: i + 1 });

  const actionsColumn = {
    Header: <FontAwesomeIcon icon="ellipsis-v" />,
    accessor: 'actions',
    align: 'center',
  };
  const insertActions = () => ({
    actions: (
      <Button category="link" onClick={() => {}} alignCenter>
        <FontAwesomeIcon icon="ellipsis-h" />
      </Button>
    ),
  });

  const selectionColumn = {
    Header: (
      <RowSelector
        title={`Select all ${tableData.length} items`}
        row={ALL_ROWS}
        allRows={tableData}
        primaryColum={tableColumns[0]}
      />
    ),
    accessor: 'checkbox',
    align: 'center',
  };
  const insertCheckbox = (selectedItem: any) => ({
    checkbox: (
      <RowSelector
        row={selectedItem[tableColumns[0].accessor]}
        allRows={tableData}
        primaryColum={tableColumns[0]}
      />
    ),
  });

  const columns = useMemo(
    () => [selectionColumn, numberColumn, ...tableColumns, actionsColumn],
    [],
  );
  const data = useMemo(
    () =>
      tableData.map((d, i) => ({
        ...insertCheckbox(d),
        ...insertNumber(i),
        ...d,
        ...insertActions(),
      })),
    [],
  );

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
  } = useTable(
    { columns, data, initialState: { pageSize: 10, pageIndex: 0 } } as any,
    usePagination,
  ) as any;

  // modify data as specified by column modifier
  const modifyData = (cell: any) =>
    (cell.column as any).modifier
      ? (cell.column as any).modifier(cell.value)
      : cell.render('Cell');

  // align the contents of a header/cell
  const getColumnAlignment = (header: any) => header.align || 'left';
  const getCellAlignment = (cell: any) => cell.column.align || 'left';

  /**
   * @description apply a class to fix the first three columns:
   * fix-col-0: fixes selection column
   * fix-col-1: fixes number column
   * fix-col-2: fixes primary identifier of row
   */
  const getClassName = (i: number): string => {
    switch (i) {
      case 0:
        return 'fix-col fix-col-0';
      case 1:
        return 'fix-col fix-col-1';
      case 2:
        return 'fix-col fix-col-2';
      default:
        return '';
    }
  };

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      // on unmount, clear selection
      dispatch(clearSelection());
    },
    [],
  );

  return (
    <StyledTable>
      <GroupActionsContainer
        stateName={stateName}
        actions={tableActions}
        allRows={tableData}
        primaryColumn={tableColumns[0]}
      />

      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hgroup: any) => (
              <tr {...hgroup.getHeaderGroupProps()}>
                {hgroup.headers.map((header: any, i: number) => (
                  <th
                    className={getClassName(i)}
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
                      className={getClassName(i)}
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
        totalRows={tableData.length}
        stateName={stateName}
      />
    </StyledTable>
  );
};

const StyledTable = styled.div`
  position: relative;
  width: 100%;
  margin: auto;

  @media (max-width: ${breakpoints.smallLaptop}) {
    width: 99%;
  }

  div.options-toggle {
    padding: 2em 0;
    width: fit-content;
    svg {
      margin-left: 0.5em;
    }
  }

  div.table-container {
    width: 100%;
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
          }
        }
      }
    }
  }

  td.fix-col,
  th.fix-col {
    position: sticky !important;
    z-index: 4;
    top: auto;
    background-color: inherit;
    color: inherit;
  }

  td.fix-col-0,
  th.fix-col-0 {
    left: 0 !important;
    width: 50px !important;
  }

  td.fix-col-1,
  th.fix-col-1 {
    left: 50px !important;
    width: 50px !important;
  }

  td.fix-col-2,
  th.fix-col-2 {
    left: 100px !important;
    width: 250px !important;
  }

  th.fix-col {
    background-color: var(--navyBlue);
    svg {
      color: var(--white);
    }
  }

  td.fix-col {
    svg {
      color: var(--navyBlue);
    }
  }

  td {
    svg {
      font-size: 1.2em;
    }
  }

  td.fix-col,
  th.fix-col {
    svg {
      font-size: 1.5em;
    }
  }
`;

export default Table;
