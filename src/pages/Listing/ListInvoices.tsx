'use client';

import { cn } from '@/lib/utils';
import { useId, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import { invoiceItem } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';
import { selectInvoice } from '@/Store/Selectors/Selectors';
import DragAndDrop from '@/components/ui/DragAndDrop';

declare module '@tanstack/react-table' {
  // Allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
  }
}

function ListInvoices() {
  const items = useSelector(selectInvoice);

  const columns: ColumnDef<invoiceItem>[] = [
    {
      header: 'Invoice ID',
      accessorKey: 'invoiceId',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('invoiceId')}</div>
      ),
    },
    {
      header: 'Company',
      accessorKey: 'company',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('company')}</div>
      ),
    },
    {
      header: 'Tax Amount',
      accessorKey: 'taxAmount',
      cell: ({ row }) => (
        <div>₹ {(row.getValue('taxAmount') as number).toFixed(2)}</div>
      ),
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      cell: ({ row }) => (
        <div>₹ {(row.getValue('totalAmount') as number).toFixed(2)}</div>
      ),
    },
    {
      header: 'Option',
      accessorKey: 'link',
      cell: ({ row }) => (
        <div className="flex gap-4">
          <button
            className="hover:text-blue-500 transition-colors duration-200"
            onClick={() => handleInvoiceEdit(row.original)}
          >
            <Pencil className="size-4 " />
          </button>
          <button className="hover:text-red-500 transition-colors duration-200">
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  const navigate = useNavigate();
  const [showdataLabel, setshowdataLabel] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'totalAmount',
      desc: false,
    },
  ]);

  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // Client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // Generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // Generate min/max values for range filter
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  const handleInvoiceEdit = (invoicedata: invoiceItem) => {
    navigate('/invoice', { state: { invoicedata, isEditMode: true } });
  };

  const handleExportData = () => {
    // const csvContent = items
    //   .map((item) => {
    //     return Object.values(item).join(',');
    //   })
    //   .join('\n');
    // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'invoices.csv';
    // a.click();
    // URL.revokeObjectURL(url);

    setshowdataLabel(true);
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* invoiceId select */}
        <div className="w-36">
          <Filter column={table.getColumn('invoiceId')!} />
        </div>
        {/* company inputs */}
        <div className="w-36">
          <Filter column={table.getColumn('company')!} />
        </div>
        {/* taxAmount inputs */}
        <div className="w-36">
          <Filter column={table.getColumn('taxAmount')!} />
        </div>
        {/* totalAmount inputs */}
        <div className="w-36">
          <Filter column={table.getColumn('totalAmount')!} />
        </div>

        <div className="absolute right-10 top-10 ">
          <button
            className="relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline-1 outline-[#fff2f21f] hover:border hover:border-zinc-300"
            onClick={handleExportData}
          >
            Export <ArrowRight className="h4 w-4" />
          </button>
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 select-none border-t"
                    aria-sort={
                      header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : header.column.getIsSorted() === 'desc'
                        ? 'descending'
                        : 'none'
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            'flex h-full cursor-pointer select-none items-center justify-between gap-2'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          // Enhanced keyboard handling for sorting
                          if (
                            header.column.getCanSort() &&
                            (e.key === 'Enter' || e.key === ' ')
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUp
                              className="shrink-0 opacity-60"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDown
                              className="shrink-0 opacity-60"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <span className="size-4" aria-hidden="true" />
                        )}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showdataLabel && (
        <DragAndDrop setshowdataLabel={setshowdataLabel} invoiceList={items} />
      )}
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === 'string' ? column.columnDef.header : '';
  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === 'range') return [];

    // Get all unique values from the column
    const values = Array.from(column.getFacetedUniqueValues().keys());

    // If the values are arrays, flatten them and get unique items
    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr];
      }
      return [...acc, curr];
    }, []);

    // Get unique values and sort them
    return Array.from(new Set(flattenedValues)).sort();
  }, [column.getFacetedUniqueValues(), filterVariant]);

  if (filterVariant === 'range') {
    return (
      <div className="space-y-2">
        <Label>{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-range-1`}
            className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            defaultValue={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          <Input
            id={`${id}-range-2`}
            className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            defaultValue={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    );
  }

  if (filterVariant === 'select') {
    return (
      <div className="space-y-2">
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? 'all'}
          onValueChange={(value) => {
            column.setFilterValue(value === 'all' ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          defaultValue={(columnFilterValue ?? '') as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default ListInvoices;
