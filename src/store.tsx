// Import React tools for shared state, lifecycle effects, and context access / 导入用于共享状态、生命周期和上下文访问的 React 工具
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Import the clean demo data used for first load and reset / 导入首次加载和重置时使用的默认演示数据
import { defaults } from './data'

// Import the application data types used by the store and migration helpers / 导入状态仓库和旧数据迁移所需的应用数据类型
import type { AppData, FamilyMessage, Reminder } from './types'

// Describe the shared data and actions available to every page / 定义所有页面都能使用的共享数据和操作
type StoreContextValue = {
  data: AppData
  update: (updater: (current: AppData) => AppData) => void
  reset: () => void
}
type LegacyMessage = Partial<FamilyMessage> & { text?: unknown; date?: unknown }
type LegacyReminder = Partial<Reminder>

// Create the shared store context and the browser-storage key / 创建共享状态上下文和浏览器存储键名
const StoreContext = createContext<StoreContextValue | null>(null)
const STORAGE_KEY = 'hearttalk-demo-data'

// Convert timestamps saved in the older Chinese format into English display text / 将旧版中文时间格式转换成英文显示文本
function englishTimestamp(value: string) {
  const chineseDate = value.match(/^\s*(\d{1,2})月(\d{1,2})日\s*(\d{1,2}):(\d{2})\s*$/)
  if (!chineseDate) return value
  const [, month, day, hour, minute] = chineseDate
  return new Date(
    new Date().getFullYear(),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  ).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

// Convert one older saved message into the current FamilyMessage structure / 将一条旧版消息转换成当前的 FamilyMessage 结构
function migrateMessage(value: unknown, index: number): FamilyMessage {
  const message = (value && typeof value === 'object' ? value : {}) as LegacyMessage
  const direction = message.direction === 'elder_to_family' ? 'elder_to_family' : 'family_to_elder'
  const content = typeof message.content === 'string'
    ? message.content
    : typeof message.text === 'string'
      ? message.text
      : ''
  const createdAt = typeof message.createdAt === 'string'
    ? message.createdAt
    : typeof message.date === 'string'
      ? message.date
      : 'Today'

  return {
    id: typeof message.id === 'string' ? message.id : `migrated-message-${index}`,
    from: direction === 'family_to_elder' ? 'Emma' : 'Mary',
    to: direction === 'family_to_elder' ? 'Mary' : 'Emma',
    direction,
    content,
    createdAt: englishTimestamp(createdAt),
  }
}

// Convert one older saved reminder into the current Reminder structure / 将一条旧版提醒转换成当前的 Reminder 结构
function migrateReminder(value: unknown, index: number): Reminder {
  const reminder = (value && typeof value === 'object' ? value : {}) as LegacyReminder
  return {
    id: typeof reminder.id === 'string' ? reminder.id : `migrated-reminder-${index}`,
    title: typeof reminder.title === 'string' ? reminder.title : 'Reminder',
    date: typeof reminder.date === 'string' ? reminder.date : 'Today',
    time: typeof reminder.time === 'string' ? reminder.time : '4:00 PM',
    repeat: typeof reminder.repeat === 'string' ? reminder.repeat : 'Never',
    status: reminder.status === 'completed' ? 'completed' : 'pending',
    completedAt: typeof reminder.completedAt === 'string' ? englishTimestamp(reminder.completedAt) : undefined,
  }
}

// Merge valid saved data with defaults so older or incomplete data remains usable / 将有效的已保存数据与默认值合并，使旧版或不完整数据仍可使用
function migrateData(value: unknown): AppData {
  const base = structuredClone(defaults)
  if (!value || typeof value !== 'object') return base
  const raw = value as Record<string, unknown>

  return {
    messages: Array.isArray(raw.messages) ? raw.messages.map(migrateMessage) : base.messages,
    reminders: Array.isArray(raw.reminders) ? raw.reminders.map(migrateReminder) : base.reminders,
    topics: Array.isArray(raw.topics) ? raw.topics as AppData['topics'] : base.topics,
    memories: Array.isArray(raw.memories) ? raw.memories as AppData['memories'] : base.memories,
    activities: Array.isArray(raw.activities)
      ? (raw.activities as AppData['activities']).map(activity => ({
          ...activity,
          date: typeof activity.date === 'string' ? englishTimestamp(activity.date) : 'Today',
        }))
      : base.activities,
  }
}

// Provide persistent HeartTalk data and update actions to all nested pages / 向所有内部页面提供可持久保存的 HeartTalk 数据和更新操作
export function StoreProvider({ children }: { children: ReactNode }) {

  // Load saved browser data on startup, or use clean defaults if it is missing or invalid / 启动时读取浏览器保存的数据，缺失或无效时使用干净的默认数据
  const [data, setData] = useState<AppData>(() => {
    try {
      return migrateData(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'))
    } catch {
      return structuredClone(defaults)
    }
  })

  // Save every data change to localStorage so it survives a page refresh / 每次数据变化时保存到 localStorage，使刷新页面后数据仍然存在
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data])

  // Synchronize HeartTalk data when another browser tab changes the same storage item / 其他浏览器标签页修改同一存储项时同步 HeartTalk 数据
  useEffect(() => {
    const syncFromAnotherTab = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return
      try {
        setData(migrateData(JSON.parse(event.newValue)))
      } catch {
        // Ignore malformed external values and keep the current demo data.
      }
    }
    window.addEventListener('storage', syncFromAnotherTab)
    return () => window.removeEventListener('storage', syncFromAnotherTab)
  }, [])

  // Update the shared data through a function that receives the latest state / 通过接收最新状态的函数更新共享数据
  const update = (updater: (current: AppData) => AppData) => setData(updater)

  // Restore the original demo data and remove the saved browser copy / 恢复原始演示数据并删除浏览器中保存的副本
  const reset = () => {
    setData(structuredClone(defaults))
    localStorage.removeItem(STORAGE_KEY)
  }

  // Expose the data, update, and reset features to every child page / 向所有子页面提供数据、更新和重置功能
  return <StoreContext.Provider value={{ data, update, reset }}>{children}</StoreContext.Provider>
}

// Let a page read the shared store and report incorrect use outside StoreProvider / 让页面读取共享状态，并提示在 StoreProvider 外部使用的错误
export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) throw Error('Store missing')
  return store
}
