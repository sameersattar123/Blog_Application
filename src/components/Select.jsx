import React, { forwardRef, useId } from 'react'

const Select = ({label , className = "" ,options ,  ...props } , ref) => {
  const id = useId();
  return (
    <div className='w-full'>
      {
        label && <label htmlFor={id} className=''></label>
      }
        <select
        ref={ref}
        {...props}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
          {
            options.map((option) => {
              return (
                <option key={option} value={option}>{option}</option>
              )
            })
          }
        </select>
    </div>
  )
}

export default forwardRef(Select)