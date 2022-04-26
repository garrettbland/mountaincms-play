import { useState, useEffect, useMemo } from 'react'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import { CMSObjectType, ObjectTypes } from '../types'
import debounce from 'lodash/fp/debounce'
import compose from 'lodash/fp/compose'
import uniqBy from 'lodash/fp/uniqBy'
import uniq from 'lodash/fp/uniq'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import has from 'lodash/fp/has'
import intersection from 'lodash/fp/intersection'
import * as Sqrl from 'squirrelly'
import { Filter, TemplateObject } from 'squirrelly/dist/types/parse'

const defaultSqrlConfig = Sqrl.defaultConfig

Sqrl.filters.define('type', (text, type) => {
    return text
})

export const Playground = () => {
    const [cmsObjects, setCMSObjects] = useState<CMSObjectType[]>([])

    useEffect(() => {
        return () => {
            debounceHandleChange.cancel()
        }
    }, [])

    const parseRawHTML = (rawString: string): void => {
        try {
            const compiled = Sqrl.parse(rawString, defaultSqrlConfig)

            const getInputType: (filters: Filter[]) => ObjectTypes = compose(
                (type) => type,
                (items) => {
                    // matches this order. So this could be 'importance'?
                    const itemTypes = ['text', 'content']
                    return intersection(items as string[])(itemTypes)[0]
                },
                uniq,
                map((filter: Filter) => filter[0]),
                (filters) => filters
            )

            const formattedCompiled = compose(
                map(
                    (item: TemplateObject): CMSObjectType => ({
                        label: item.c as string,
                        required: true,
                        type: getInputType(item.f),
                    })
                ),
                (items) => items,
                uniqBy('c'),
                filter((item) => has('c')(item))
            )(compiled)

            setCMSObjects(formattedCompiled)
        } catch (err) {
            console.warn('[mountain]', 'Couldnt parse raw html...')
            console.error(err)
        }
    }

    const debounceHandleChange = useMemo(() => debounce(600)(parseRawHTML), [])

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className="w-1/2 bg-blue-100 overflow-y-scroll overflow-x-scroll p-4">
                <Editor onChange={(rawString) => debounceHandleChange(rawString)} />
            </div>
            <div className="w-1/2 bg-blue-red overflow-y-scroll overflow-x-scroll p-4">
                <Preview items={cmsObjects} />
            </div>
        </div>
    )
}

export default Playground
