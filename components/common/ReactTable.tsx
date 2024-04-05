import { ITableData } from '@/app/types/table';
import { useTable, Column, useSortBy } from 'react-table';

interface TableProps<T extends object> {
  theadClassName?: string;
  columns: Column | any;
  data: T[];
  tbodydata?: string;
  tableheader?: string;
}

export function Table<T extends ITableData>({
  theadClassName,
  tbodydata,
  columns,
  data,
  tableheader,
}: TableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>(
      {
        columns,
        data,
      },
      useSortBy,
    );

  return (
    <table
      {...getTableProps([
        {
          className: `mt-6 w-full table-auto table-striped text-left`,
        },
      ])}
    >
      <thead className={theadClassName}>
        {headerGroups.map((headerGroup, _index: number) => (
          <tr
            {...headerGroup.getHeaderGroupProps([
              {
                className: `border-b whitespace-nowrap  `,
              },
            ])}
            key={_index}
          >
            {headerGroup.headers.map((column: any, _index: number) => (
              <th
                {...column.getHeaderProps([
                  {
                    className: `py-2  text-sm text-left font-semibold text-[#111827] dark:text-white ${tableheader} `,
                  },
                ])}
                key={_index}
              >
                <span>{column.render('Header')}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, _index) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps({
                className: `border-b `,
              })}
              key={_index}
            >
              {row.cells.map((cell, _index) => {
                return (
                  <td
                    {...cell.getCellProps({
                      className: `py-2 whitespace-nowrap text-sm text-forground ${tbodydata}`,
                    })}
                    key={_index}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
