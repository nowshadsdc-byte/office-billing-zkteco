import { Link } from '@inertiajs/react'
import type { InertiaFormProps } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

type EmployeeFormValues = {
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
  form: InertiaFormProps<EmployeeFormValues>
  submitLabel: string
  onCancelHref: string
}

const genders = ['Male', 'Female', 'Other']
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary']
const statuses = ['Active', 'Inactive', 'On leave', 'Terminated', 'Resigned']

export function EmployeeForm({ form, submitLabel, onCancelHref }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic information</CardTitle>
          <CardDescription>Collect the employee's core identity and contact details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: 'Employee ID',
                name: 'employee_id',
                type: 'text',
                required: true,
              },
              {
                label: 'First Name',
                name: 'first_name',
                type: 'text',
                required: true,
              },
              {
                label: 'Last Name',
                name: 'last_name',
                type: 'text',
                required: true,
              },
              {
                label: 'Email',
                name: 'email',
                type: 'email',
                required: true,
              },
              {
                label: 'Phone Number',
                name: 'phone',
                type: 'tel',
                required: true,
              },
              {
                label: 'Date of Birth',
                name: 'dob',
                type: 'date',
                required: true,
              },
              {
                label: 'NID Number',
                name: 'nid',
                type: 'text',
                required: true,
              },
            ].map(({ label, name, type, required }) => (
              <div key={name} className="space-y-2">
                <Label>
                  {label}
                  {required ? <span className="text-destructive">*</span> : null}
                </Label>
                <Input
                  value={(form.data as any)[name] ?? ''}
                  type={type}
                  onChange={(event) => form.setData(name as any, event.target.value)}
                />
                {form.errors[name as keyof typeof form.errors] ? (
                  <p className="text-sm text-destructive">{form.errors[name as keyof typeof form.errors]}</p>
                ) : null}
              </div>
            ))}
            <div className="space-y-2">
              <Label>
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select value={form.data.gender} onValueChange={(value) => form.setData('gender', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.errors.gender ? <p className="text-sm text-destructive">{form.errors.gender}</p> : null}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Provide both current and permanent mailing addresses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>
                Present Address <span className="text-destructive">*</span>
              </Label>
              <textarea
                className="border-input bg-transparent text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md border px-3 py-2 w-full min-h-[5rem]"
                value={form.data.present_address}
                onChange={(event) => form.setData('present_address', event.target.value)}
              />
              {form.errors.present_address ? (
                <p className="text-sm text-destructive">{form.errors.present_address}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>
                Permanent Address <span className="text-destructive">*</span>
              </Label>
              <textarea
                className="border-input bg-transparent text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-md border px-3 py-2 w-full min-h-[5rem]"
                value={form.data.permanent_address}
                onChange={(event) => form.setData('permanent_address', event.target.value)}
              />
              {form.errors.permanent_address ? (
                <p className="text-sm text-destructive">{form.errors.permanent_address}</p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job details</CardTitle>
          <CardDescription>Capture position, department, joining date and employment status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: 'Department',
                name: 'department',
                required: true,
              },
              {
                label: 'Designation',
                name: 'designation',
                required: true,
              },
              {
                label: 'Employment Type',
                name: 'employment_type',
                required: true,
              },
              {
                label: 'Joining Date',
                name: 'joining_date',
                type: 'date',
                required: true,
              },
            ].map(({ label, name, type = 'text', required }) => (
              <div key={name} className="space-y-2">
                <Label>
                  {label}
                  {required ? <span className="text-destructive">*</span> : null}
                </Label>
                {name === 'employment_type' ? (
                  <Select
                    value={form.data.employment_type}
                    onValueChange={(value) => form.setData('employment_type', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={type}
                    value={(form.data as any)[name] ?? ''}
                    onChange={(event) => form.setData(name as any, event.target.value)}
                  />
                )}
                {form.errors[name as keyof typeof form.errors] ? (
                  <p className="text-sm text-destructive">{form.errors[name as keyof typeof form.errors]}</p>
                ) : null}
              </div>
            ))}
            <div className="space-y-2">
              <Label>
                Employee Status <span className="text-destructive">*</span>
              </Label>
              <Select value={form.data.status} onValueChange={(value) => form.setData('status', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.errors.status ? <p className="text-sm text-destructive">{form.errors.status}</p> : null}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 md:flex-row md:justify-end">
        <Button variant="outline" asChild>
          <Link href={onCancelHref}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={form.processing}>
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
