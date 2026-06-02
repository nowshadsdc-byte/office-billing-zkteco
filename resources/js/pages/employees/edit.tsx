import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { EmployeeForm } from '@/components/employees/employee-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { dashboard } from '@/routes'
import { index, update } from '@/routes/employees'

type Employee = {
  id: number
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  dob: string
  gender: string
  nid: string
  present_address: string
  permanent_address: string
  department: string
  designation: string
  employment_type: string
  joining_date: string
  status: string
}

type Props = {
  employee: Employee
}

export default function EmployeesEdit({ employee }: Props) {
  const form = useForm({
    employee_id: employee.employee_id ?? '',
    first_name: employee.first_name ?? '',
    last_name: employee.last_name ?? '',
    email: employee.email ?? '',
    phone: employee.phone ?? '',
    dob: employee.dob ?? '',
    gender: employee.gender ?? '',
    nid: employee.nid ?? '',
    present_address: employee.present_address ?? '',
    permanent_address: employee.permanent_address ?? '',
    department: employee.department ?? '',
    designation: employee.designation ?? '',
    employment_type: employee.employment_type ?? '',
    joining_date: employee.joining_date ?? '',
    status: employee.status ?? '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    form.put(update.url(employee.id), {
      preserveState: true,
    })
  }

  return (
    <>
      <Head title="Edit Employee" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Edit Employee</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href={index.url()}>Back to employees</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <EmployeeForm form={form} submitLabel="Save Changes" onCancelHref={index.url()} />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

EmployeesEdit.layout = {
  breadcrumbs: [
    { title: 'Dashboard', href: dashboard() },
    { title: 'Employees', href: index.url() },
    { title: 'Edit Employee', href: index.url() },
  ],
}
