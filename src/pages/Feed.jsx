import { useEffect, useState } from "react"

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  arrayUnion
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

export default function Feed(){

  const [post,setPost] = useState("")
  const [comment,setComment] = useState("")
  const [posts,setPosts] = useState([])

  /* LOAD POSTS */
  useEffect(()=>{

    const q = query(
      collection(db,"posts"),
      orderBy("createdAt","desc")
    )

    const unsubscribe = onSnapshot(q,(snapshot)=>{

      const data = snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))

      setPosts(data)

    })

    return ()=>unsubscribe()

  },[])

  /* CREATE POST */
  const createPost = async()=>{

    if(!post.trim()) return

    await addDoc(collection(db,"posts"),{

      text:post,
      user:auth.currentUser?.email,
      likes:0,
      comments:[],
      createdAt:serverTimestamp()

    })

    setPost("")
  }

  /* LIKE */
  const likePost = async(id)=>{

    const ref = doc(db,"posts",id)

    await updateDoc(ref,{
      likes:increment(1)
    })

  }

  /* COMMENT */
  const addComment = async(id,text)=>{

    if(!text.trim()) return

    const ref = doc(db,"posts",id)

    await updateDoc(ref,{
      comments:arrayUnion({
        user:auth.currentUser?.email,
        text
      })
    })

    setComment("")
  }

  /* DELETE */
  const deletePost = async(id,user)=>{

    if(user !== auth.currentUser?.email){
      alert("You can only delete your own posts")
      return
    }

    await deleteDoc(doc(db,"posts",id))
  }

  return(
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto p-6">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-5xl font-black mb-3">
            Fan Feed 🎵
          </h1>

          <p className="text-gray-400">
            Connect with Riley Green fans worldwide
          </p>

        </div>

        {/* CREATE POST */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-5 mb-8">

          <textarea
            value={post}
            onChange={(e)=>setPost(e.target.value)}
            placeholder="Share something..."
            className="w-full h-32 bg-black/30 rounded-2xl p-4 outline-none resize-none"
          />

          <button
            onClick={createPost}
            className="mt-4 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-2xl font-bold"
          >
            Post
          </button>

        </div>

        {/* POSTS */}
        <div className="space-y-6">

          {posts.map((item)=>(

            <div
              key={item.id}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6"
            >

              {/* USER */}
              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                  {/* AVATAR */}
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold">
                    {item.user?.charAt(0).toUpperCase()}
                  </div>

                  <div>

                    <p className="font-bold">
                      {item.user}
                    </p>

                    <p className="text-xs text-gray-400">
                      Riley Green Fan
                    </p>

                  </div>

                </div>

                {/* DELETE */}
                <button
                  onClick={()=>deletePost(item.id,item.user)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>

              </div>

              {/* POST */}
              <p className="text-lg leading-relaxed mb-5">
                {item.text}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-4 mb-5">

                <button
                  onClick={()=>likePost(item.id)}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl"
                >
                  ❤️ {item.likes || 0}
                </button>

              </div>

              {/* COMMENT INPUT */}
              <div className="flex gap-3 mb-4">

                <input
                  placeholder="Write comment..."
                  onChange={(e)=>setComment(e.target.value)}
                  className="flex-1 bg-black/30 p-3 rounded-xl outline-none"
                />

                <button
                  onClick={()=>addComment(item.id,comment)}
                  className="bg-blue-600 px-5 rounded-xl"
                >
                  Send
                </button>

              </div>

              {/* COMMENTS */}
              <div className="space-y-3">

                {item.comments?.map((c,index)=>(

                  <div
                    key={index}
                    className="bg-black/30 rounded-xl p-3"
                  >

                    <p className="text-sm font-bold">
                      {c.user}
                    </p>

                    <p className="text-gray-300">
                      {c.text}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}