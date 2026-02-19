import { cn } from "@/lib/utils"
import api from "@/lib/api";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

export function LoginForm({
  className,
  ...props
}) {

  const [formData,setFormData]=useState({
      email:"",
      password:""
  })
  const navigate=useNavigate()
  const {user,setUser}=useAuth()
 useEffect(() => {
  if (user) {
    navigate("/");
  }
}, [user, navigate]);
  const [loading,setLoading]=useState(false)
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
     try {
    const res = await api.post("/user/login", formData);
    console.log(res)
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user)
    setLoading(false)
    navigate("/")
    alert("Login successful")
  } catch (err) {
    console.log(err.response.data.message);
  }
  setLoading(false)
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }                
                name="email" id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center ">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                value={formData.password}
                onChange={(e)=>setFormData((prev)=>({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name="password"  id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button 
                variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to='/auth/signup'>Sign Up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
