import { useState, useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numallowed,setnumallowed]=useState(false)
  const[charallowed,setcharallowed]=useState(false)
  const[password,setpassword]=useState("")
//useref hook
const passwordRef=useRef(null)
//syntax:useCallback(fn,dependancies)

  const passwordGenerator=useCallback(()=>{
    let pass=""

    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numallowed) {
      str += str+"0123456789"
    }

    if (charallowed) {
      str += str+"@#$%^&*"
    }
    
    for(let i=1;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)

  },[length,numallowed,charallowed,setpassword])

const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])


    useEffect(()=>{
      passwordGenerator()
    },[length,numallowed,charallowed,passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h2 className='text-white text-center my-3'>password generator</h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
                value={password}
                className='outline-none w-full py-1 px-3'
                placeholder='password'
                readOnly
                ref={passwordRef}
                />
                <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
                  defaultChecked={numallowed}
                  id='numberInput'
                  onChange={()=>{
                    setnumallowed((prev)=>!prev);
                  }}         
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
                  defaultChecked={charallowed}
                  id='numberInput'
                  onChange={()=>{
                    setnumallowed((prev)=>!prev);
                  }}         
          />
          <label htmlFor="charecterInput">Charecter</label>
          </div>
      </div>
    </div>

    </>
  )
}

export default App
