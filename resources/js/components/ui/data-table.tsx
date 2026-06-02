import { useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type DataTableProps<T> = {
  columns: ColumnDef<T, any>[]
  data: T[]
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  sorting?: SortingState
  onSortingChange?: (updater: SortingState | ((old: SortingState) => SortingState)) => void
  isLoading?: boolean
  emptyState?: React.ReactNode
}

export function DataTable<T>({
  columns,
  data,
  globalFilter,
  onGlobalFilterChange,
  sorting = [],
  onSortingChange,
  isLoading = false,
  emptyState,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: onSortingChange as any,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  })

  const hasData = data.length > 0

  return (
    <div className="space-y-4">
      {onGlobalFilterChange ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Search employees..."
            value={globalFilter ?? ''}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
            className="max-w-md"
          />
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card text-sm shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const sortState = header.column.getIsSorted()

                    return (
                      <th key={header.id} className="px-4 py-3">
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            className={cn(
                              'inline-flex items-center gap-2 font-semibold transition-colors hover:text-primary',
                              canSort ? 'cursor-pointer' : 'cursor-default',
                            )}
                            onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {canSort ? (
                              <span className="inline-flex items-center gap-0.5 text-muted-foreground">
                                {sortState === 'asc' ? (
                                  <ChevronUp className="size-3" />
                                ) : sortState === 'desc' ? (
                                  <ChevronDown className="size-3" />
                                ) : (
                                  <ChevronsUpDown className="size-3" />
                                )}
                              </span>
                            ) : null}
                          </button>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-16 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Spinner />
                      Loading employees...
                    </div>
                  </td>
                </tr>
              ) : !hasData ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-16 text-center text-muted-foreground">
                    {emptyState ?? 'No records found.'}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-muted/30">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-4 align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
