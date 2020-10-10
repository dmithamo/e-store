import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
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
}: TablePaginationProps): JSX.Element => (
  <StyledTablePagination>
    <div className="table-pagination">
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
        Page
        {pageIndex + 1}
        of
        {pageOptions.length}
      </span>
      <span className="per-page-selector">
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e: any) => {
            gotoPage(e.target.value ? Number(e.target.value) : 0);
          }}
          max={pageOptions.length - 1}
        />
      </span>
      <span className="page-number-input">
        <select
          value={pageSize}
          onChange={(e: any) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40].map((pSize) => (
            <option key={pSize} value={pSize}>
              {pSize}
              &nbsp; rows
            </option>
          ))}
        </select>
      </span>
    </div>
  </StyledTablePagination>
);

const StyledTablePagination = styled.div`
  max-width: 200px;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
`;

export default TablePagination;
