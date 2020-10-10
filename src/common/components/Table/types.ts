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

export type TableData = { [key: string]: any }[];
