import { useState, useEffect, useMemo } from 'react'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import { CMSObjectType } from '../types'
import debounce from 'lodash/fp/debounce'

export const Playground = () => {
    const [editorValue, setEditorValue] = useState('')
    const [cmsObjects, setCMSObjects] = useState<CMSObjectType[]>([
        {
            type: 'text',
            label: 'Page Title',
            required: true,
        },
    ])

    useEffect(() => {
        return () => {
            debounceHandleChange.cancel()
        }
    }, [])

    const parseRawHTML = (rawString: string): void => {
        console.log(`parse ${rawString}`)
    }

    const debounceHandleChange = useMemo(() => debounce(600)(parseRawHTML), [])

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className="w-1/2 bg-blue-100 overflow-y-scroll overflow-x-scroll p-4">
                <Editor onChange={(rawString) => debounceHandleChange(rawString)} />
            </div>
            <div className="w-1/2 bg-blue-red overflow-y-scroll overflow-x-scroll p-4">
                <Preview items={cmsObjects} rawCode={editorValue} />
            </div>
        </div>
    )
}

export default Playground
