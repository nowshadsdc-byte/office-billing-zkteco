import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboard } from '@/routes'
import { index } from '@/routes/employees'

type Employee = {
  id: number
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  dob: string | null
  gender: string | null
  nid: string | null
  present_address: string | null
  permanent_address: string | null
  department: string | null
  designation: string | null
  employment_type: string | null
  joining_date: string | null
  status: string | null
}

type Props = {
  employee: Employee
}

function renderRow(label: string, value: string | null | undefined) {
  return (
    <div className="grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)] gap-x-6 gap-y-4 border-b border-border py-4 last:border-b-0">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm">{value ?? '—'}</span>
    </div>
  )
}

export default function EmployeesShow({ employee }: Props) {
  return (
    <>
      <Head title="Employee details" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-sidebar-border/70 bg-card p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Employee profile</p>
            <h1 className="text-2xl font-semibold">{employee.first_name} {employee.last_name}</h1>
            <p className="text-sm text-muted-foreground">{employee.department ?? 'No department selected'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href={index.url()}>Back</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderRow('Employee ID', employee.employee_id)}
              {renderRow('Email', employee.email)}
              {renderRow('Phone', employee.phone)}
              {renderRow('Date of Birth', employee.dob)}
              {renderRow('Gender', employee.gender)}
              {renderRow('NID Number', employee.nid)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderRow('Department', employee.department)}
              {renderRow('Designation', employee.designation)}
              {renderRow('Employment type', employee.employment_type)}
              {renderRow('Joining date', employee.joining_date)}
              {renderRow('Status', employee.status)}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Present address</p>
              <p className="whitespace-pre-line text-sm">{employee.present_address ?? '—'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Permanent address</p>
              <p className="whitespace-pre-line text-sm">{employee.permanent_address ?? '—'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

EmployeesShow.layout = {
  breadcrumbs: [
    { title: 'Dashboard', href: dashboard() },
    { title: 'Employees', href: index.url() },
    { title: 'Employee details', href: index.url() },
  ],
}
