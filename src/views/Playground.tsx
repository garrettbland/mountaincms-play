import { useState } from 'react'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import { CMSObjectType } from '../types'

export const Playground = () => {
  const [editorValue, setEditorValue] = useState('')
  const [cmsObjects, setCMSObjects] = useState<CMSObjectType[]>([
    {
      type: 'text',
      label: 'Page Title',
      required: true,
    },
  ])

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="w-1/2 bg-blue-100 overflow-y-scroll overflow-x-scroll p-4">
        <Editor onChange={(rawCode: string) => setEditorValue(rawCode)} />
      </div>
      <div className="w-1/2 bg-blue-red overflow-y-scroll overflow-x-scroll p-4">
        <Preview items={cmsObjects} rawCode={editorValue} />
      </div>
    </div>
  )
}

export default Playground
