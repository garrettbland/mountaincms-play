import { CMSObjectType } from '../types'

interface PreviewProps {
    items: CMSObjectType[]
}

export const Preview = ({ items }: PreviewProps) => {
    return (
        <>
            <p>CMS Preview...</p>
            <p>{JSON.stringify(items)}</p>
        </>
    )
}

export default Preview
