import { Head, Link, router } from '@inertiajs/react';
import { useCallback, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EmployeeController from '@/actions/App/Http/Controllers/EmployeeController';
import { create, index, show } from '@/routes/employees';
import { dashboard } from '@/routes';
import type { PaginatedData } from '@/types/pagination';

type Employee = {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    phone: string | null;
    department: string | null;
    designation: string | null;
    employment_type: string | null;
    joining_date: string | null;
    status: string | null;
};

type Filters = {
    search: string;
    per_page: number;
    sort?: string;
    direction?: string;
};

type Props = {
    employees: PaginatedData<Employee>;
    filters: Filters;
};

const STATUS_VARIANTS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    inactive: 'secondary',
    terminated: 'destructive',
};

export default function EmployeesIndex({ employees, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [sorting, setSorting] = useState<[{ id: string; desc: boolean }]>(
        filters.sort
            ? [{ id: filters.sort, desc: filters.direction === 'desc' }]
            : [{ id: 'created_at', desc: true }],
    );
    const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'employee_id',
                header: 'Employee ID',
            },
            {
                accessorFn: (employee: Employee) => employee.name ?? `${employee.first_name} ${employee.last_name}`,
                id: 'name',
                header: 'Full Name',
                cell: (info: any) => info.getValue(),
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'phone',
                header: 'Phone Number',
                cell: (info: any) => info.getValue() ?? '—',
            },
            {
                accessorKey: 'department',
                header: 'Department',
                cell: (info: any) => info.getValue() ?? '—',
            },
            {
                accessorKey: 'designation',
                header: 'Designation',
                cell: (info: any) => info.getValue() ?? '—',
            },
            {
                accessorKey: 'employment_type',
                header: 'Employment Type',
                cell: (info: any) => info.getValue() ?? '—',
            },
            {
                accessorKey: 'joining_date',
                header: 'Joining Date',
                cell: (info: any) => info.getValue() ?? '—',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (info: any) => {
                    const status = info.getValue() as string | null
                    return status ? (
                        <Badge variant={STATUS_VARIANTS[status.toLowerCase()] ?? 'outline'}>
                            {status}
                        </Badge>
                    ) : (
                        '—'
                    )
                },
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }: any) => {
                    const employee = row.original as Employee
                    return (
                        <div className="flex flex-wrap items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={show.url(employee.id)}>View</Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={EmployeeController.edit.url(employee.id)}>Edit</Link>
                            </Button>
                            <Dialog open={deleteTarget?.id === employee.id} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => setDeleteTarget(employee)}
                                    >
                                        Delete
                                    </Button>
                                </DialogTrigger>
                                {deleteTarget?.id === employee.id ? (
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete employee</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete {employee.name}? This action can be recovered only through the soft delete history.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    setDeleteTarget(null)
                                                    router.delete(EmployeeController.destroy.url(employee.id), {
                                                        preserveState: true,
                                                    })
                                                }}
                                            >
                                                Confirm Delete
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                ) : null}
                            </Dialog>
                        </div>
                    )
                },
            },
        ],
        [deleteTarget],
    )

    const handleSearch = useCallback(
        (value: string) => {
            setSearch(value)
            router.get(
                index.url(),
                {
                    search: value,
                    per_page: filters.per_page,
                    sort: sorting[0]?.id,
                    direction: sorting[0]?.desc ? 'desc' : 'asc',
                },
                {
                    preserveState: true,
                    replace: true,
                    onStart: () => setIsLoading(true),
                    onFinish: () => setIsLoading(false),
                },
            )
        },
        [filters.per_page, sorting],
    )

    const handleSort = useCallback(
        (nextSorting: any) => {
            setSorting(nextSorting)
            const sortState = nextSorting[0]
            router.get(
                index.url(),
                {
                    search,
                    per_page: filters.per_page,
                    sort: sortState?.id,
                    direction: sortState?.desc ? 'desc' : 'asc',
                },
                {
                    preserveState: true,
                    replace: true,
                    onStart: () => setIsLoading(true),
                    onFinish: () => setIsLoading(false),
                },
            )
        },
        [filters.per_page, search],
    )

    return (
        <>
            <Head title="Employee Management" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">Employee Management</h1>
                        <p className="text-sm text-muted-foreground">
                            {employees.total} employee{employees.total !== 1 ? 's' : ''} total
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create.url()}>Add New Employee</Link>
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={employees.data}
                    globalFilter={search}
                    onGlobalFilterChange={handleSearch}
                    sorting={sorting}
                    onSortingChange={handleSort}
                    isLoading={isLoading}
                    emptyState="No employees found. Try adjusting your search or filters."
                />

                {employees.last_page > 1 && (
                    <div className="flex flex-col gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                        <span>
                            Showing {employees.from}–{employees.to} of {employees.total}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                            {employees.links.map((link, i) => (
                                <Button
                                    key={i}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    asChild={!!link.url}
                                >
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

EmployeesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Employee Management', href: index.url() },
    ],
};
