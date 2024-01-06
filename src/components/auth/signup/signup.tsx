"use client";
import InputField from "@/components/ui/inputField"
import "./signup.css"
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import axios from "axios";
import { inputFields } from "./fields";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const SignupForm = () => {
    const { toast } = useToast()
    const intialFormData = {
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        password: "",
        confirmPassword: ""
    }

    const errorInitialData = {
        nameError: "",
        emailError: "",
        phoneNumberError: "",
        passwordError: "",
        confirmPasswordError: ""
    }

    const [isSignupButtonDisable, setIsSignupButtonDisable] = useState(true)
    const [formData, setformData] = useState<Record<string, string>>(intialFormData)
    const [errors, setErrors] = useState<Record<string, string>>(errorInitialData)
    const router = useRouter()

    const setFormDataDefaultState = () => setformData(intialFormData)
    const setErrorDataDefaultState = () => setErrors(errorInitialData)

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

    const resetValues = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setFormDataDefaultState()
        setErrorDataDefaultState()
    }

    const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const { data }: any = await axios.post('/api/users/register', formData)
            if (data.success) router.push("/")
            resetValues(e)
        } catch (error: any) {
            console.log(error.response.data.message)
            toast({
                description: error.response.data.message,
                variant: "destructive",
                duration: 3000,
            })
        }
    }

    const validateData = (key: string, value: string) => {
        let errorKey = `${key}Error`
        switch (key) {
            case "name": {
                if (!value.trim()) setErrors({ ...errors, [errorKey]: "Full name is required" })
                else if (value.trim() && value.length < 3) setErrors({ ...errors, [errorKey]: "Full name should be of length 3" })
                else setErrors((prev) => ({ ...prev, nameError: "" }))
            }
                break;
            case "email": {
                if (!value.trim()) setErrors({ ...errors, [errorKey]: "Email is required" })
                else if (!value.match(/^[a-zA-Z0-9.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$/)) setErrors({ ...errors, [errorKey]: "Email address is invalid" })
                else setErrors((prev) => ({ ...prev, emailError: "" }))
            }
                break;
            case "phoneNumber": {
                if (!value.trim()) setErrors({ ...errors, [errorKey]: "Phone number is required" })
                else if (value.trim() && value.length < 10) setErrors({ ...errors, [errorKey]: "Phone number should be of length 10" })
                else setErrors((prev) => ({ ...prev, phoneNumberError: "" }))
            }
                break;
            case "password": {
                if (!value.trim()) setErrors({ ...errors, [errorKey]: "Password is required" })
                else if (value.length < 6) setErrors({ ...errors, [errorKey]: "Password length should be greater than 6" })
                else if (!value.match(/[0-9]/)) setErrors({ ...errors, [errorKey]: "Password should contain a number" })
                else if (!value.match(/[.+*?^$|;,<>%@]/)) setErrors({ ...errors, [errorKey]: "Password should contain a special character" })
                else if (!value.match(/[A-Z]/g)) setErrors({ ...errors, [errorKey]: "Password should contain a uppercase letter" })
                else setErrors((prev) => ({ ...prev, passwordError: "" }))
            }
                break;
            case "confirmPassword": {
                if (!value.trim()) setErrors({ ...errors, [errorKey]: "Confirm password is required" })
                else if ((value !== formData.password)) setErrors({ ...errors, [errorKey]: "Confirm password does not match with password" })
                else setErrors((prev) => ({ ...prev, confirmPasswordError: "" }))
            }
        }
    }

    const handleBlur = (key: string, value: string) => {
        validateData(key, value)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let key = e.target.name;
        let value = e.target.value;
        validateData(key, value)
        setformData({ ...formData, [key]: value })
    }

    useEffect(() => {
        verifyAllFields()
    }, [...Object.values(formData)])

    return (
        <>
            <div className="signup_form_wrapper">
                <div className="signup_form_container">
                    <form>
                        <div className="text-left">
                            <h1 className="text-4xl font-black mb-3 text-black signup_heading">Register</h1>
                            <p className="font-semibold text-lg mb-4 text-white">Enter your details to create account and get started</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {
                                inputFields.map((field) => {
                                    const errorKey = `${field.name}Error`
                                    const { label, ...fieldProps } = field
                                    return <InputField {...fieldProps} label={field.label} key={field.name} value={formData[field.name]} handleChange={handleChange} error={errors[errorKey]} handleBlur={handleBlur} />
                                })
                            }
                        </div>
                    </form>
                    <div className="grid grid-flow-row grid-cols-2 gap-6 mt-9">
                        <button className="w-full p-2 text-center bg-white rounded text-black cursor-pointer" onClick={resetValues}>Reset</button>
                        <button className={"w-full p-2 text-center rounded " + `${isSignupButtonDisable ? "bg-gray-300 cursor-not-allowed" : "bg-violet-500 cursor-pointer"}`} disabled={isSignupButtonDisable} onClick={handleSubmit} type='submit'>Signup</button>
                    </div>
                    <p className="font-medium text-center mt-8">Aleady have an account?<Link href="/login"><span className="font-semibold text-violet-500"> Signin here</span></Link></p>
                </div>
            </div>
        </>
    )
}