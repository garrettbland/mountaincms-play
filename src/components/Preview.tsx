import { CMSObjectType, ObjectTypes } from '../types'

interface PreviewProps {
    items: CMSObjectType[]
}

export const Preview = ({ items }: PreviewProps) => {
    return (
        <>
            <div className="mb-8">
                <p>CMS Preview...</p>
            </div>
            <div>
                {items.map(({ label, required, type }) => (
                    <div className="flex flex-col mb-4" key={label}>
                        <label className="uppercase text-sm">
                            {label}
                            {required ? <span className="text-red-500">*</span> : null}
                        </label>
                        {type === ObjectTypes.text && (
                            <input placeholder={label} className="border p-2" />
                        )}
                        {type === ObjectTypes.content && (
                            <textarea
                                rows={5}
                                className="border p-2"
                                placeholder={label}
                            ></textarea>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Preview
