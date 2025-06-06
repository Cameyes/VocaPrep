/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from 'react'
import Image from 'next/image'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { signIn, signUp } from '@/lib/actions/auth.action'




const authFormSchema=(type:FormType)=>{
    return z.object({
        name: type==="sign-up"?z.string().min(3,"Name is required"):z.string().optional(),
        email: z.string().email(),
        password:z.string().min(6),
    })
}
const AuthForm = ({type}:{type:FormType}) => {
    const router=useRouter()
    const formSchema=authFormSchema(type)
    //1.Definie The form
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        }
    })

    // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try{
            if(type==='sign-up')
            {
                const {name,email,password}=values;

                const userCredentials=await createUserWithEmailAndPassword(auth,email,password)

                const result = await signUp({
                    uid:userCredentials.user.uid,
                    name:name!,
                    email,
                    password,
                })

                if(!result?.success){
                    toast.error(result?.message || 'Something went wrong')
                    return
                }

               toast.success("Account Created Successfully")
                router.push('/sign-in') 
            }
            else{

                const {email,password}=values;
                const userCredential=await signInWithEmailAndPassword(auth,email,password)

                const idtoken=await userCredential.user.getIdToken()

                if(!idtoken){
                    toast.error("Something went wrong")
                    return
                }

                await signIn({
                    email,idToken:idtoken
                })

                toast.success("Signed In Successfully")
                console.log("Sign In",values)
                router.push('/') 

            }
    } catch (error) {
        console.log("Error");
        toast.error(`There was an error : ${error}`)
    }
  }

  const isSignIn = type === "sign-in"

return (
    <div className='card-border lg:min-w-[566px]'>
        <div className='flex flex-col gap-6 card py-14 px-10'>
            <div className='flex flex-row gap-2 justify-center'>
                <Image src="/logo.svg" alt="logo"  height={32} width={38}/>
                <h2 className='text-primary-100'>VocaPrep</h2>
            </div>
            <h3>Practice Job Interviews with AI</h3>
       
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
       {!isSignIn && (<FormField 
       control={form.control} 
       name="name" 
       label="Name" 
       placeholder="Enter your name" 
       type="text"/>)}
       <FormField 
       control={form.control} 
       name="email" 
       label="Email" 
       placeholder="Enter your email address" 
       type="email"/>
       <FormField 
       control={form.control} 
       name="password" 
       label="Password" 
       placeholder="Enter your Password" 
       type="password"/>

        <Button className='btn' type="submit">{isSignIn?'Sign In':'Create an Account'}</Button>
      </form>
    </Form>
 
    <p className='text-center'>
        
       {isSignIn? 'No account yet?':'Have an Account Already?'}
       <Link href={!isSignIn?'/sign-in':'/sign-up'} className='font-bold text-user-primary ml-1'>
       {!isSignIn ? "Sign in":"Sign Up"}
       </Link>
    </p>
    </div>
    </div>
)
}
export default AuthForm