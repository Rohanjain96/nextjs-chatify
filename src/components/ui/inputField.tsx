"use client"
import React, { ChangeEvent, ComponentPropsWithoutRef } from 'react'

interface propType extends ComponentPropsWithoutRef<"input"> {
    handleBlur: (key: string, value: string) => void
    label: string,
    value: string,
    error?: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const InputField = ({ label, value, handleChange, handleBlur, error, ...rest }: propType) => {
    const { name = "" } = rest
    return (
        <div className="flex flex-col relative text-left">
            <label className="mb-1 text-violet-900 font-semibold">{label}</label>
            <input className="rounded py-1 p-2 text-slate-500 outline-none text-lg" {...rest} value={value} onChange={handleChange} onBlur={() => handleBlur(name, value)} autoComplete='off' />
            <span className='text-red-700 absolute bottom-[-24px] font-semibold text-base'>{error}</span>
        </div>
    )
}

export default InputField