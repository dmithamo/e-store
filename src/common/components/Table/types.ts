export type TableActions = {
  name: string;
  onClick: Function;
  allowBulk: boolean;
}[];

export type TableColumn = {
  Header: string;
  accessor: string;
  modifier?: Function;
};

export const ALL_ROWS = 'ALL_ROWS';

export type TableData = { [key: string]: any }[];
