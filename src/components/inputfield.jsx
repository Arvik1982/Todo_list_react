import React from 'react'

const InputField = ({texts,handleInput, handleSubmit}) => {
  return (
<label>
  <input value={texts}  onChange={(e)=>handleInput(e.target.value)}/>  
  <button onClick={handleSubmit}>Add todo</button>
</label>
  )
}

export default InputField
