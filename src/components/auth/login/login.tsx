"use client"

import Link from "next/link"
import "./login.css"
import InputField from "@/components/ui/inputField"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
export const LoginForm = () => {

    const { toast } = useToast()
    const [formData, setformData] = useState<Record<string, string>>({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({
        emailError: "", passwordError: ""
    })
    const [isSignupButtonDisable, setIsSignupButtonDisable] = useState(true)
    const router = useRouter()

    const validateData = (key: string, value: string) => {
        const errorKey = `${key}Error`
        if (key === "email" && !value.trim()) {
            setErrors({ ...errors, emailError: "Email is required" })
            return
        }
        else if (key === "password" && !value.trim()) {
            setErrors({ ...errors, passwordError: "Password is required" })
            return
        }
        else setErrors({ ...errors, [errorKey]: "" });
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let key = e.target.name;
        let value = e.target.value;
        validateData(key, value)
        setformData({ ...formData, [key]: value })
    }

    const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setformData({
            email: "",
            password: ""
        })
        setErrors({
            emailError: "", passwordError: ""
        })
        try {
            const { data }: any = await axios.post('/api/users/login', formData)
            if (data.success) {
                router.push("/")
            }
        } catch (error: any) {
            console.log(error.response.data.message)
            toast({
                description: error.response.data.message,
                duration: 3000,
                variant: "destructive",
            })
        }
    }

    const verifyAllFields = () => {
        Object.keys(formData).map((key: string) => {
            if (key !== "dob") {
                const errorKey = `${key}Error`
                if (errors[errorKey]?.trim() || !formData[key].trim()) {
                    setIsSignupButtonDisable(true)
                    return
                }
                setIsSignupButtonDisable(false)
            }
        })
    }

    const handleBlur = (key: string, value: string) => {
        validateData(key, value)
    }

    useEffect(() => {
        verifyAllFields()
    }, [...Object.values(formData)])

    return (
        <>
            <div className="login_form_wrapper">
                <div className="login_form_container">
                    <form >
                        <div className="text-center">
                            <h1 className="text-5xl font-black mb-3 text-black heading">Welcome back</h1>
                            <p className="font-medium text-md">Glad to see you again</p>
                            <p className="mb-4 font-medium text-md">Login into your account below</p>
                        </div>
                        <div className="form_fields mb-8">
                            <InputField label="Email" placeholder="Enter your Email..." type="text" name="email" error={errors.emailError} value={formData.email} handleChange={handleChange} handleBlur={handleBlur} />
                            <InputField label="Password" placeholder="Enter your Password..." type="password" name="password" error={errors.passwordError} value={formData.password} handleChange={handleChange} handleBlur={handleBlur} />
                        </div>
                    </form>
                    <button className={"w-full p-2 text-center rounded mt-3 " + `${isSignupButtonDisable ? "bg-gray-300 cursor-not-allowed" : "bg-violet-500 cursor-pointer"}`} disabled={isSignupButtonDisable} type='submit' onClick={handleSubmit}>Login</button>
                    <p className="font-medium mt-5">Dont have any account?<Link href="/signup"><span className="font-semibold text-violet-500"> Signup for free</span></Link></p>
                </div>
            </div >
        </>
    )
}