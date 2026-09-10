// App.tsx manages HeartTalk frontend routes, connects URLs to pages, and redirects unknown paths to the welcome page / App.tsx 管理 HeartTalk 前端路由，把网址对应到页面，并将未知地址重定向到欢迎页。

import { Navigate, Route, Routes } from 'react-router-dom'
import {
  // Shared entry pages / 公共入口页面
  Welcome,
  Role,

  // Older-adult pages / 老人端页面
  ElderHome,
  ElderMessages,
  ElderReminders,
  Talk,
  Memories,
  ElderProfile,

  // Family pages / 家庭端页面
  FamilyHome,
  FamilyMessages,
  TopicForm,
  ReminderForm,
  Activity,
  FamilyProfile,
} from './pages'

// Match the browser address to the corresponding HeartTalk page / 根据浏览器地址显示对应的 HeartTalk 页面
export default function App() {
  return (
    <Routes>
      {/* Shared entry pages / 公共入口页面 */}
      <Route path="/" element={<Welcome />} />
      <Route path="/role" element={<Role />} />

      {/* Older-adult pages / 老人端页面 */}
      <Route path="/elder/home" element={<ElderHome />} />
      <Route path="/elder/messages" element={<ElderMessages />} />
      <Route path="/elder/reminders" element={<ElderReminders />} />
      <Route path="/elder/talk" element={<Talk />} />
      <Route path="/elder/memories" element={<Memories />} />
      <Route path="/elder/profile" element={<ElderProfile />} />

      {/* Family pages / 家庭端页面 */}
      <Route path="/family/home" element={<FamilyHome />} />
      <Route path="/family/messages" element={<FamilyMessages />} />
      <Route path="/family/topic" element={<TopicForm />} />
      <Route path="/family/reminder" element={<ReminderForm />} />
      <Route path="/family/activity" element={<Activity />} />
      <Route path="/family/profile" element={<FamilyProfile />} />

      {/* Return unknown addresses to the welcome page / 未知地址返回欢迎页面 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
