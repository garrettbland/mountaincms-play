import { useState } from 'react'

interface EditorProps {
  onChange: (rawString: string) => void
}

export const Editor = ({ onChange }: EditorProps) => {
  //   const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <>
      <p>Code Editor...</p>
      <textarea rows={20} onChange={handleChange} className="w-full"></textarea>
    </>
  )
}

export default Editor
