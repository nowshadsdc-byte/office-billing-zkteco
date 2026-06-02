import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { EmployeeForm } from '@/components/employees/employee-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { create, index, store } from '@/routes/employees'
import { dashboard } from '@/routes'

export default function EmployeesCreate() {
  const form = useForm({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    nid: '',
    present_address: '',
    permanent_address: '',
    department: '',
    designation: '',
    employment_type: '',
    joining_date: '',
    status: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    form.post(store.url(), {
      preserveState: true,
    })
  }

  return (
    <>
      <Head title="Add New Employee" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Add New Employee</CardTitle>
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
              <EmployeeForm form={form} submitLabel="Create Employee" onCancelHref={index.url()} />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

EmployeesCreate.layout = {
  breadcrumbs: [
    { title: 'Dashboard', href: dashboard() },
    { title: 'Employees', href: index.url() },
    { title: 'Add New Employee', href: create.url() },
  ],
}
