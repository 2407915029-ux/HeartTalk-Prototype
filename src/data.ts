//data.ts stores the default demo messages, reminders, conversation topics, memories, and activity records used when HeartTalk first loads or resets. / data.ts 保存 HeartTalk 首次加载或重置时使用的默认消息、提醒、谈话话题、记忆和活动记录。

// Import the complete application-data type to validate the default data structure / 导入完整应用数据类型，用于检查默认数据结构
import type { AppData } from './types'

// Provide the demo data used when HeartTalk first loads or resets / 提供 HeartTalk 首次加载或重置时使用的演示数据
export const defaults: AppData = {
  // Default message sent from Emma to Mary / Emma 发送给 Mary 的默认消息
  messages: [{
    id: 'm1',
    from: 'Emma',
    to: 'Mary',
    direction: 'family_to_elder',
    content: 'Thinking of you today! Love you so much',
    createdAt: 'Today, 9:15 AM',
  }],
  // Default reminder shown to Mary / 显示给 Mary 的默认提醒
  reminders: [{
    id: 'r1',
    title: 'Take a short walk',
    date: 'Today',
    time: '4:00 PM',
    repeat: 'Never',
    status: 'pending',
  }],
  // Default conversation topic suggested for the next chat / 为下次聊天建议的默认话题
  topics: [{
    id: 't1',
    text: 'Talk about your childhood memories',
    delivery: 'Next conversation',
    tone: 'Warm and curious',
  }],
  // Default memories that Mary currently allows HeartTalk to use / Mary 当前允许 HeartTalk 使用的默认记忆
  memories: [
    { id: 'p1', category: 'Personal preferences', text: 'Mary prefers a slower speaking speed.', source: 'Mary', date: 'May 18', allowed: true },
    { id: 'p2', category: 'Personal preferences', text: 'Mary enjoys gardening.', source: 'Conversation', date: 'May 20', allowed: true },
    { id: 'f1', category: 'Family stories', text: 'Mary learned to cook dumplings from her mother.', source: 'Mary', date: 'May 21', allowed: true },
    { id: 'r2', category: 'Recent topics', text: 'Mary talked about her tomato plants.', source: 'Conversation', date: 'Today', allowed: true },
    { id: 's1', category: 'Family suggestions', text: 'Emma suggested talking about an old family photo.', source: 'Emma', date: 'Today', allowed: true },
  ],
  // Default activity records displayed on the family side / 家庭端显示的默认活动记录
  activities: [
    { id: 'a1', text: 'Mary opened Emma’s message', date: 'Today, 9:32 AM', icon: 'message' },
    { id: 'a2', text: 'Message sent to Mary', date: 'Today, 9:15 AM', icon: 'message' },
    { id: 'a3', text: 'Mary completed a reminder', date: 'Yesterday, 4:18 PM', icon: 'check' },
  ],
}
