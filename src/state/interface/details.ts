import {
    Author
} from './topics';

export interface RepliesData {
    author: Author,
    content: string,
    create_at: Date,
    id: string,
    is_uped: boolean,
    reply_id: string | any
}

export interface DetailsData {
    author: Author,
    author_id: string,
    content: string,
    create_at: Date,
    good: boolean,
    id: string,
    is_collect: boolean,
    last_reply_at: Date,
    replies: Array<RepliesData>,
    reply_count:number,
    title?:string,
    top:boolean,
    visit_count:number
}

export interface DetailsStateContent {
    [propName:string]:DetailsData
}

export interface DetailsState  {
    detail:DetailsStateContent
}