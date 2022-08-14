export type FileType = 'png' | 'jpeg'
export type Theme = 'light' | 'dark'

export interface Link {
  title: string
  domain: string
  activities: ActivityItem[]
  num_comments: number
  reactions_count: number
}

export interface ActivityItem {
  activity: Activity
}

export interface Activity {
  text: string
  account: Account
}

export interface Account {
  display_name: string
  username: string
  avatar_url: string
}

export interface ParsedRequest {
  fileType: FileType
  itemId: string
}
