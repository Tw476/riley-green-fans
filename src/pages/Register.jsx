import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"
import emailjs from "@emailjs/browser"

export default function Register(){

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    fullName:"",
    username:"",
    email:"",
    countryCode:"+1",
    phone:"",
    country:"",
    age:"",
    favoriteSong:"",
    bio:"",
    password:""
  })

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )

      const user = userCredential.user

      await setDoc(doc(db,"users",user.uid),{
        fullName:formData.fullName,
        username:formData.username,
        email:formData.email,
        countryCode:formData.countryCode,
        phone:formData.phone,
        country:formData.country,
        age:formData.age,
        favoriteSong:formData.favoriteSong,
        bio:formData.bio,
        createdAt:new Date()
      })

      // ✅ EMAILJS INTEGRATION (NOW WORKING)
     await emailjs.send(
  "service_14i1dbq",
  "template_5vg5qut",
  {
    fullName: formData.fullName,
    username: formData.username,
    email: formData.email,
    phone: `${formData.countryCode}${formData.phone}`,
    country: formData.country,
    age: formData.age,
    uid: user.uid,
    time: new Date().toString()
  },
  "XCchkksUeiJoxhqJv"
)

      alert("Account created successfully")
      navigate("/dashboard")

    }catch(err){
      alert(err.message)
    }
  }

  return(
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">

      <img
        src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl"
      >

        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Riley Green Fans
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Join the ultimate fan community
        </p>

        <div className="grid gap-4">

          <input name="fullName" placeholder="Full Name" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <input name="username" placeholder="Username" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <input name="email" placeholder="Email" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <div className="flex gap-3">

            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-36 p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+234">🇳🇬 +234</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+27">🇿🇦 +27</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+81">🇯🇵 +81</option>
            </select>

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="flex-1 p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"
            />

          </div>

          <input name="country" placeholder="Country" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <input name="age" type="number" placeholder="Age" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <input name="favoriteSong" placeholder="Favorite Song" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <textarea name="bio" placeholder="Short Bio" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <input name="password" type="password" placeholder="Password" onChange={handleChange}
            className="p-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"/>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-bold text-white"
          >
            Create Account
          </button>

        </div>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={()=>navigate("/login")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>

      </form>

    </div>
  )
}