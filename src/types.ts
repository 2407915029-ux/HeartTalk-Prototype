// Limit a family message to one of the two supported sending directions / 限制家庭消息只能使用两种受支持的发送方向
export type MessageDirection = 'family_to_elder' | 'elder_to_family'

// Describe one message exchanged between Emma and Mary / 定义 Emma 与 Mary 之间的一条消息
export type FamilyMessage = {
  id: string
  from: 'Emma' | 'Mary'
  to: 'Mary' | 'Emma'
  direction: MessageDirection
  content: string
  createdAt: string
}

// Limit a reminder to waiting or completed status / 限制提醒只能处于等待或已完成状态
export type ReminderStatus = 'pending' | 'completed'

// Describe one reminder created for Mary / 定义为 Mary 创建的一条提醒
export type Reminder = {
  id: string
  title: string
  date: string
  time: string
  repeat: string
  status: ReminderStatus
  completedAt?: string
}

// Describe one conversation topic suggested by the family / 定义家庭端建议的一条谈话话题
export type ConversationTopic = {
  id: string
  text: string
  delivery: string
  tone: string
}

// Describe one personal memory and whether Mary allows AI to use it / 定义一条个人记忆，以及 Mary 是否允许 AI 使用它
export type MemoryItem = {
  id: string
  category: string
  text: string
  source: string
  date: string
  allowed: boolean
}

// Describe one event displayed in the family activity history / 定义家庭端活动记录中显示的一项事件
export type ActivityItem = {
  id: string
  text: string
  date: string
  icon: string
}

// Combine all shared HeartTalk data collections into one application-data structure / 将 HeartTalk 的所有共享数据集合组成一个完整应用数据结构
export type AppData = {
  messages: FamilyMessage[]
  reminders: Reminder[]
  topics: ConversationTopic[]
  memories: MemoryItem[]
  activities: ActivityItem[]
}
