export interface TopicPayLoad {
    page?: number,
    limit?: number,
    tab?: string
}

export interface Author {
    avatar_url: string,
    loginname: string
}

export interface DataNode {
    author: Author,
    good: boolean,
    id: string,
    tab: string,
    title: string,
    top: boolean,
    author_id: string,
    content: string,
    create_at: Date,
    last_reply_at: Date,
    reply_count: number,
    visit_count: number
}

export interface TopicRes {
    List: Array<DataNode>,
    isPush: boolean,
    Tab: string,
    Page: number
}

export interface TopicsStateContent {
    [propName: string]: TopicData;
}

export interface TopicData {
    list: Array<DataNode>,
    page: number
}

export interface TopicsState {
    tabData: TopicsStateContent
}