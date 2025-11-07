"use client"

import { AnyFieldApi, useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const AddCategory = () => {


const { data, isLoading, error } = useQuery({
  queryKey: ['category'],
  queryFn: async () => {
    const res = await axios.get("https://690b3a2b6ad3beba00f40159.mockapi.io/orkid");
    return res.data;
  },
});

  const form = useForm({
    defaultValues: {
      id :'',
      name: '',
    },
    onSubmit: async ({ value }) => {
  
      console.log(value)
    },
  })


  const mutate = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("https://690b3a2b6ad3beba00f40159.mockapi.io/orkid", data);
      return res.data;
    },
  });


console.log(data)
  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A first name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in first name'
                )
              },
            }}
            children={(field) => {
    
              return (
                <>
                  <label htmlFor={field.name}>First Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        />
      </form>
    </div>
  )
}

export default AddCategory