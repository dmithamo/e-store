import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';
import Button from '../Button';

type TablePaginationProps = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: any;
  pageCount: any;
  gotoPage: any;
  nextPage: any;
  previousPage: any;
  pageIndex: any;
  pageSize: any;
  setPageSize: any;
  totalRows: any;
  stateName: string;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  pageIndex,
  pageSize,
  setPageSize,
  totalRows,
  stateName,
}: TablePaginationProps): JSX.Element => (
  <StyledTablePagination>
    <span className="metadata">
      {totalRows}
      &nbsp;total&nbsp;
      {stateName}
    </span>

    <span className="rows-per-page-selector">
      <select
        value={pageSize}
        onChange={(e: any) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 20, 30, 40].map((pSize) => (
          <option key={pSize} value={pSize}>
            {pSize}
            &nbsp; rows per page
          </option>
        ))}
      </select>
    </span>

    <span className="buttons">
      <Button
        disabled={!canPreviousPage}
        title="Go to first page"
        category="link"
        onClick={() => gotoPage(0)}
      >
        <FontAwesomeIcon icon="fast-backward" />
      </Button>
      <Button
        disabled={!canPreviousPage}
        title="Go to previous page"
        category="link"
        onClick={() => previousPage()}
      >
        <FontAwesomeIcon icon="backward" />
      </Button>
      <Button
        disabled={!canNextPage}
        title="Go to next page"
        category="link"
        onClick={() => nextPage()}
      >
        <FontAwesomeIcon icon="forward" />
      </Button>
      <Button
        disabled={!canNextPage}
        title="Go to last page"
        category="link"
        onClick={() => gotoPage(pageCount - 1)}
      >
        <FontAwesomeIcon icon="fast-forward" />
      </Button>
    </span>

    <span className="page-info">
      Page&nbsp;
      {pageIndex + 1}
      &nbsp;of&nbsp;
      {pageOptions.length}
    </span>

    <span className="page-number-input">
      <span>Go to page </span>
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={(e: any) => {
          gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
        }}
        max={pageOptions.length - 1}
        min={1}
      />
    </span>
  </StyledTablePagination>
);

const StyledTablePagination = styled.div`
  width: 95%;
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    padding: 0 2em;
  }

  span.metadata {
    text-transform: lowercase;
  }

  span.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    padding: 0 1em;
    font-size: 1.3em;
    :first-child {
      padding-left: 0;
    }
  }

  input,
  select {
    border: none;
    outline: none;
    background-color: var(--grey);
  }
`;

export default TablePagination;
