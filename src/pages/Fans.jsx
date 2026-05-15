import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"

export default function Fans(){

  const [fans,setFans] = useState([])

  useEffect(()=>{

    const fetchFans = async()=>{

      const snapshot = await getDocs(collection(db,"users"))

      const data = snapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
      }))

      setFans(data)
    }

    fetchFans()

  },[])

  return(
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        All Registered Fans 🎵
      </h1>

      <div className="grid gap-4">

        {fans.map((fan)=>(
          <div key={fan.id} className="bg-white/10 p-4 rounded-xl border border-white/20">

            <p><b>Name:</b> {fan.fullName}</p>
            <p><b>Username:</b> {fan.username}</p>
            <p><b>Email:</b> {fan.email}</p>
            <p><b>Country:</b> {fan.country}</p>
            <p><b>Song:</b> {fan.favoriteSong}</p>

          </div>
        ))}

      </div>

    </div>
  )
}