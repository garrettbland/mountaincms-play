import { CMSObjectType } from '../types'

interface PreviewProps {
  items: CMSObjectType[]
  rawCode: string
}

export const Preview = ({ items, rawCode }: PreviewProps) => {
  return (
    <>
      <p>CMS Preview...</p>
      <p>{JSON.stringify(items)}</p>
      <p>{JSON.stringify(rawCode)}</p>
    </>
  )
}

export default Preview
