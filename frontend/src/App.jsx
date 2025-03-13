import { Login } from "@/components/Login/Login";
import { Signup } from "@/components/Signup/Signup";
import { auth } from "@/firebase/firebase"; // Make sure you have this firebase config file
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Claim from "./components/Claim/Claim";
import Homepage from "./components/Homepage/Homepage";

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
      console.log(currentUser)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Homepage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user?<Signup/> : <Navigate to="/home"/>}/>
        <Route path="/claim" element={user?<Claim/>: <Navigate to="/home"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App