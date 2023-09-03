import { useCallback, useEffect, useState,useRef } from 'react'

// in Simple terms useRef is used to take reference

function App() {

  const [length,setlength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [specialCharacterAllowed,setSpecialCharacterAllowed] = useState(false);
  const [password,setPassword] = useState("");

  //this is the main logic of the passwod generator using react

  const passwordRef = useRef(null);

  
  const passwordGenerator = useCallback(()=>{
     
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(specialCharacterAllowed) str+= "~`@#$%^&*(){}<>?./,*-+=_-";
    
    for(let i = 1;i<=length;i++){
      const charIndex = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(charIndex);
    }

    console.log("function is running..")

    setPassword(pass);
  
    


  },[length,numberAllowed,specialCharacterAllowed,setPassword]);

  // here we have given the functions as dependency just for optimization 
  
  const copyToClipBoard = useCallback(()=>{
     passwordRef.current?.select();
    //  passwordRef.current?.setSelectionRange(0,3);
      window.navigator.clipboard.writeText(password);
      
  },[password]);

  useEffect(()=>{

    passwordGenerator();
    
  },[length,numberAllowed,specialCharacterAllowed,passwordGenerator])





   
  
  return (

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
              <h1 className='text-white text-center my-3'>Password generator</h1>
              <div className="flex shadow rounded-lg overflow-hidden mb-4">
                     <input
                         type="text"
                         value={password}
                         className="outline-none w-full py-1 px-3"
                         placeholder="Password"
                         readOnly
                         ref = {passwordRef}
                    />

                    <button onClick={copyToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
                      copy
                    </button>

              </div>

              <div className='flex text-sm gap-x-2'>
                      <div className='flex items-center gap-x-1'>

                        <input type="range"
                         min={6} 
                         max={100}
                         value={length}
                         className='cursor-pointer'
                         onChange={(e)=>{setlength(e.target.value)}}/>

                         <label>Length: {length}</label>
                      </div>

                      <div className='flex items-center gap-x-1'>
                         <input type="checkbox" 
                           defaultChecked ={numberAllowed}
                           id="numberInput"
                           onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>

                           <label htmlFor="numberInput">Numbres</label>

                         <input type="checkbox" 
                           defaultChecked ={specialCharacterAllowed}
                           id="specialCharacterInput"
                           onChange={()=>{setSpecialCharacterAllowed((prev)=>!prev)}}/>

                           <label htmlFor="specialCharacterInput">Special characters</label>
                      </div>
              </div>
      </div>

      
    
  )
}

export default App
