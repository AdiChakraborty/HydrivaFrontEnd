import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"


function RegisterForm() {

    const navigation = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordcnfr,setPasswordCnrf] = useState('')
    
   
    async function singUp(){
      const signupresponse = await supabase.auth.signUp({
      email,
      password
       })
       console.log(signupresponse)
    }

      

  return (
    <div className=" mt-3">
      <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
         <h1 className="text-slate-900 text-center text-3xl font-semibold">Sign up</h1>
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Email Id</label>
              <input name="email" type="text" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
              <input name="password" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Confirm Password</label>
              <input name="cpassword" type="password" className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" onChange={(e)=>setPasswordCnrf(e.target.value)}/>
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-red-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="remember-me" className="text-slate-600 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);" className="text-red-600 font-medium hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div className="mt-12">
            <button onClick={singUp} type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none cursor-pointer">
              Create an account
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <span onClick={()=>navigation('/sing-in')} className="text-red-600 font-medium hover:underline ml-1 cursor-pointer">Login here</span></p>
        </form>
      </div>
    </div>
    </div>
  )
}
export default RegisterForm
