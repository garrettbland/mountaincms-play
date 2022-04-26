export enum ObjectTypes {
    text = 'text',
    content = 'content',
}

export interface CMSObjectType {
    type: ObjectTypes
    label: string
    required: boolean
}
