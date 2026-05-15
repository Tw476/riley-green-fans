import { useEffect, useState } from "react"

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

export default function Chat(){

  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])

  useEffect(()=>{

    const q = query(
      collection(db,"chat"),
      orderBy("createdAt","asc")
    )

    const unsub = onSnapshot(q,(snapshot)=>{

      setMessages(
        snapshot.docs.map(doc=>doc.data())
      )

    })

    return ()=>unsub()

  },[])

  const sendMessage = async()=>{

    if(!message.trim()) return

    await addDoc(collection(db,"chat"),{

      text:message,
      user:auth.currentUser?.email,
      createdAt:serverTimestamp()

    })

    setMessage("")
  }

  return(
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-6">
        Fan Chat 💬
      </h1>

      <div className="bg-white/10 rounded-3xl p-6 h-[70vh] overflow-y-auto mb-4">

        {messages.map((m,index)=>(

          <div
            key={index}
            className="mb-4 bg-black/30 p-4 rounded-2xl"
          >

            <p className="font-bold">
              {m.user}
            </p>

            <p>{m.text}</p>

          </div>

        ))}

      </div>

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 bg-white/10 p-4 rounded-2xl outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 px-8 rounded-2xl"
        >
          Send
        </button>

      </div>

    </div>
  )
}