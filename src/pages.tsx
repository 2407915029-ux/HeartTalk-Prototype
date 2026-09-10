// React functions and types / React 功能和类型
import { useEffect, useRef, useState, type FormEvent } from 'react'

// Page navigation / 页面跳转
import { useNavigate } from 'react-router-dom'

// Reusable UI components / 可重复使用的界面组件
import { BottomNav, FormField, Header, PageShell, PhoneFrame } from './components'

// Shared data / 共享数据
import { useStore } from './store'

// AI chat service / AI 聊天服务
import { sendChatMessage } from './services/aiService'

// UI image assets / 界面图片素材
import onboardingDots from './assets/onboarding-dots.png'
import onboardingArrow from './assets/onboarding-arrow.png'
import welcomeScreenComplete from './assets/welcome-screen-complete.png'
import elderHomeGreetingRobot from './assets/elder-home-greeting-robot.png'
import elderHomeTalkButton from './assets/elder-home-talk-button.png'
import elderHomeMessageButton from './assets/elder-home-message-button.png'
import elderHomeReminderButton from './assets/elder-home-reminder-button.png'
import elderHomeContinueButton from './assets/elder-home-continue-button.png'
import talkRobotComplete from './assets/talk-robot-complete.png'
import talkStatusSpeaking from './assets/talk-status-speaking.png'
import talkStatusListening from './assets/talk-status-listening.png'
import talkMicrophoneButton from './assets/talk-microphone-button.png'
import talkRepeatButton from './assets/talk-repeat-button.png'
import talkSlowerButton from './assets/talk-slower-button.png'
import talkStopButton from './assets/talk-stop-button.png'
import talkSendDisabledButton from './assets/talk-send-disabled-button.png'
import talkSendActiveButton from './assets/talk-send-active-button.png'
import familyTopicVisual from './assets/family-topic-visual.png'
import roleIntroComplete from './assets/role-intro-complete.png'
import roleOlderButton from './assets/role-older-button.png'
import roleFamilyButton from './assets/role-family-button.png'
import elderReminderActiveButton from './assets/elder-reminder-active-button.png'
import elderReminderCompletedButton from './assets/elder-reminder-completed-button.png'
import elderMemoryQuestionComplete from './assets/elder-memory-question-complete.png'
import elderMemoryPermissionOffComplete from './assets/elder-memory-permission-off-complete-v2.jpeg'
import elderMemoryPermissionOnComplete from './assets/elder-memory-permission-on-complete-v2.jpeg'
import elderMemoryDelete from './assets/elder-memory-delete.png'
import elderMessageLatestReceived from './assets/elder-message-latest-received.png'
import elderMessageLatestSent from './assets/elder-message-latest-sent.jpeg'
import elderSettingsListComplete from './assets/elder-settings-list-complete.png'
import elderSettingsPrivacyComplete from './assets/elder-settings-privacy-complete.png'
import elderSettingsSwitchRoleButton from './assets/elder-settings-switch-role-button.png'
import familyActivityBellComplete from './assets/family-activity-bell-complete-normalized.png'
import familyActivityCheckComplete from './assets/family-activity-check-complete-normalized.png'
import familyActivityMessageComplete from './assets/family-activity-message-complete-normalized.png'
import familyProfilePanel from './assets/family-profile-panel.png'
import familySaveTopicButton from './assets/family-save-topic-button.png'
import familySaveReminderButton from './assets/family-save-reminder-button.png'
import familyReminderWaitingLabel from './assets/family-reminder-waiting-label.png'
import familyReminderCompletedLabel from './assets/family-reminder-completed-label.png'
import familyHomeIntroComplete from './assets/family-home-intro-complete.png'
import familyHomeSupportComplete from './assets/family-home-support-complete.png'
import familyHomeMessageAction from './assets/family-home-message-action.png'
import familyHomeTopicAction from './assets/family-home-topic-action.png'
import familyHomeReminderAction from './assets/family-home-reminder-action.png'
import messageSendDisabled from './assets/message-send-disabled.png'
import messageSendActive from './assets/message-send-active.png'

// Create a simple ID / 生成简单编号
const createId = () => Math.random().toString(36).slice(2)

// Get the current date and time / 获取当前日期和时间
const currentTime = () => new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

// Get today's date for the date input / 获取今天的日期用于日期输入框
const todayForDateInput = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}



// Welcome page / 欢迎页面
export function Welcome() {
  // Get page navigation / 获取页面跳转功能
  const nav = useNavigate()

  return (
    <PageShell className="ht-onboarding welcome-reference">
      {/* Complete welcome image / 完整欢迎页图片 */}
      <img className="welcome-complete-image" src={welcomeScreenComplete} alt="HeartTalk — Your companion. A gentle voice, a listening heart, and support whenever you need it." />

      {/* Progress dots and next button / 进度点和下一步按钮 */}
      <footer className="ht-onboarding-footer">
        <img className="welcome-dots-asset" src={onboardingDots} alt="" aria-hidden="true" />
        <button className="ht-round-next" onClick={() => nav('/role')} aria-label="Next">
          <img src={onboardingArrow} alt="" />
        </button>
      </footer>
    </PageShell>
  )
}



// Role selection page / 角色选择页面
export function Role() {
  // Get page navigation / 获取页面跳转功能
  const nav = useNavigate()

  return (
    <PageShell className="ht-role">
      {/* Page title / 页面标题 */}
      <Header
        title="Choose demo role"
      />

      {/* Role introduction image / 角色说明图片 */}
      <img
        className="ht-role-intro-image"
        src={roleIntroComplete}
        alt="Who would you like to see? This is only for the local demonstration."
      />

      {/* Elder and family role buttons / 老人端和家人端角色按钮 */}
      <div className="ht-role-image-buttons">
        <button className="ht-role-image-button" onClick={() => nav('/elder/home')} type="button" aria-label="Continue as Mary">
          <img src={roleOlderButton} alt="Older Adult — Continue as Mary" />
        </button>
        <button className="ht-role-image-button" onClick={() => nav('/family/home')} type="button" aria-label="Continue as Emma">
          <img src={roleFamilyButton} alt="Family Member — Continue as Emma" />
        </button>
      </div>
    </PageShell>
  )
}



// Elder home page / 老人主页
export function ElderHome() {
  // Get page navigation / 获取页面跳转功能
  const nav = useNavigate()

  return (
    <PageShell className="ht-elder-home" withNav>
      {/* Greeting image / 问候图片 */}
      <div className="elder-home-greeting-image-wrap">
        <img className="elder-home-greeting-image" src={elderHomeGreetingRobot} alt="Good morning, Mary. I’m here to listen and brighten your day." />
      </div>

      {/* Talk button / 聊天按钮 */}
      <button className="elder-home-image-button" type="button" onClick={() => nav('/elder/talk')}>
        <img src={elderHomeTalkButton} alt="Talk with HeartTalk" />
      </button>

      {/* Message, reminder, and memory buttons / 消息、提醒和记忆按钮 */}
      <div className="ht-card-stack">
        <button className="elder-home-image-button" type="button" onClick={() => nav('/elder/messages')}>
          <img src={elderHomeMessageButton} alt="Message from Emma" />
        </button>
        <button className="elder-home-image-button" type="button" onClick={() => nav('/elder/reminders')}>
          <img src={elderHomeReminderButton} alt="Reminder" />
        </button>
        <button className="elder-home-image-button" type="button" onClick={() => nav('/elder/memories')}>
          <img src={elderHomeContinueButton} alt="Continue our talk" />
        </button>
      </div>

      {/* Elder bottom navigation / Mary 的底部导航栏 */}
      <BottomNav role="elder" />
    </PageShell>
  )
}



// Elder reminder page / 老人提醒页面
export function ElderReminders() {
  // Get shared data and the update function / 获取共享数据和修改数据的功能
  const { data, update } = useStore()

  // Get the latest reminder / 获取最后一条提醒
  const reminder = data.reminders.at(-1)!

  // Mark the reminder as completed / 将提醒标记为已完成
  const completeReminder = () => {
    // Stop if already completed / 如果已经完成就停止
    if (reminder.status === 'completed') return

    // Record completion time / 记录完成时间
    const completedAt = currentTime()

    // Update the reminder and add an activity record / 更新提醒并添加活动记录
    update(current => ({
      ...current,
      reminders: current.reminders.map(item => item.id === reminder.id ? { ...item, status: 'completed', completedAt } : item),
      activities: [{ id: createId(), text: `Mary completed the reminder: ${reminder.title}`, date: completedAt, icon: 'check' }, ...current.activities],
    }))
  }

  return (
    <PageShell className="elder-reminders-page" withNav>
      {/* Page title / 页面标题 */}
      <Header title="My reminder" />

      {/* Reminder details / 提醒详情 */}
      <article className={`elder-reminder-detail ${reminder.status}`}>
          <h2>{reminder.title}</h2>
          <dl>
            <div><dt>Date</dt><dd>{reminder.date}</dd></div>
            <div><dt>Time</dt><dd>{reminder.time}</dd></div>
            <div><dt>Repeat</dt><dd>{reminder.repeat}</dd></div>
          </dl>

          {/* Complete reminder button / 完成提醒按钮 */}
          <button
            className="elder-reminder-image-button"
            type="button"
            onClick={completeReminder}
            disabled={reminder.status === 'completed'}
            aria-label={reminder.status === 'completed' ? 'Done' : 'I’ve done it'}
          >
            <img
              src={reminder.status === 'completed' ? elderReminderCompletedButton : elderReminderActiveButton}
              alt=""
            />
          </button>
      </article>

      {/* Elder bottom navigation / Mary 的底部导航栏 */}
      <BottomNav role="elder" />
    </PageShell>
  )
}



// One chat message / 一条聊天消息
type Chat = { from: 'You' | 'HeartTalk'; text: string }

// Browser speech-recognition shape / 浏览器语音识别功能的结构
type RecognitionLike = { lang: string; interimResults: boolean; onresult: (e: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void; start: () => void }


// Talk with HeartTalk page / 与 HeartTalk 对话页面
export function Talk() {
  // Read the saved memories; only memories allowed by the user are sent to AI / 读取记忆，只有用户允许的记忆才会发给 AI
  const { data } = useStore()

  // Keep the two visible robot states: listening and speaking / 只保留界面会显示的两种机器人状态：正在听和正在说
  const [status, setStatus] = useState<'listening' | 'speaking'>('listening')

  // Prevent another message from being sent while waiting for the AI / 等待 AI 回复时防止重复发送
  const [isSending, setIsSending] = useState(false)

  // Store the current input and the chat shown on this page / 保存当前输入内容和本页显示的聊天记录
  const [text, setText] = useState('')
  const [chat, setChat] = useState<Chat[]>([
    { from: 'You', text: 'I felt a little lonely yesterday.' },
    { from: 'HeartTalk', text: 'I’m sorry to hear that. Would you like to tell me more about it?' },
  ])

  // Get the latest HeartTalk reply for Repeat and Slower / 获取 HeartTalk 最新回复供 Repeat 和 Slower 使用
  const last = chat.filter(x => x.from === 'HeartTalk').at(-1)?.text || ''

  // Read an AI reply aloud; the slower button calls the same function at a lower speed / 朗读 AI 回复，Slower 按钮会用更慢的速度调用同一功能
  const speakText = (value: string, slow = false) => {
    // Stop the previous voice before starting a new one / 开始新朗读前先停止上一次朗读
    try {
      speechSynthesis.cancel()

      // Create the speech and choose an English voice / 创建朗读内容并选择英文声音
      const utterance = new SpeechSynthesisUtterance(value)
      const voices = speechSynthesis.getVoices()
      const youthfulVoice = voices.find(voice => /samantha|jenny|aria|zira|susan|female|girl|child/i.test(voice.name) && /^en/i.test(voice.lang))
        || voices.find(voice => /^en/i.test(voice.lang))
      if (youthfulVoice) utterance.voice = youthfulVoice

      // Set voice pitch, speed, and volume / 设置音高、速度和音量
      utterance.pitch = 1.35
      utterance.rate = slow ? 0.76 : 0.92
      utterance.volume = 0.95

      // Change the page picture while speaking / 朗读时切换页面状态图片
      utterance.onstart = () => setStatus('speaking')
      utterance.onend = () => setStatus('listening')
      speechSynthesis.speak(utterance)
    } catch {
      setStatus('listening')
    }
  }


 
// Step 1: The user clicks Send / 第一步：用户点击发送。
// async means this function needs to wait for the AI reply / async 表示这个函数需要等待 AI 回复。
  const send = async () => {
  
    // Remove spaces and stop when the input is empty or already sending / 去掉首尾空格，输入为空或正在发送时停止
    const userText = text.trim()
    if (!userText || isSending) return
    
    // Add the new message to the chat history / 把新消息加入聊天记录。
    const nextChat = [...chat, { from: 'You' as const, text: userText }]
    
    // Show the user message, clear the input, and wait for AI / 显示用户消息、清空输入框，并等待 AI 回复。
    setChat(nextChat)
    setText('')
    setIsSending(true)


 
// Step 2: pages.tsx calls aiService.ts to ask the AI for a reply / 第二步：pages.tsx 调用 aiService.ts 请求 AI 回复。
    try {
    
    // Call sendChatMessage from aiService / 调用 aiService 中的 sendChatMessage
    //  await：Wait for sendChatMessage and save the result in reply / 等待 sendChatMessage 完成，并把结果保存到 reply。
      const reply = await sendChatMessage({
      
      // slice(-4)：Keep only the latest four chat messages / 只保留最近四条聊天。
      // map(...)：Convert the chat data into the format DeepSeek understands / 把聊天数据转换成 DeepSeek 能理解的格式。
        messages: nextChat.slice(-4).map(message => ({ role: message.from === 'You' ? 'user' : 'assistant', content: message.text })),
      
        // Get the memories allowed for AI use / 获取允许 AI 使用的记忆。
        approvedMemories: data.memories.filter(memory => memory.allowed).map(memory => memory.text),
      })



// Step 14: Add the final reply to the page and read it aloud / 第十四步：把最终回复加入页面并朗读。
      setChat(current => [...current, { from: 'HeartTalk', text: reply.message }])
      
      // Finish sending and allow the user to send another message / 结束发送状态，并允许用户发送下一条消息。
      setIsSending(false)
      
     // Read the final reply aloud with the browser speech feature / 使用浏览器语音功能朗读最终回复。
      speakText(reply.message)
    } 
    catch {
     // Restore the sending state after an unexpected error so the user can try again / 发生意外错误后恢复发送状态，让用户可以重新尝试。
      setIsSending(false)
    }
  }



  // Use the browser speech-recognition feature to put spoken words into the input / 使用浏览器语音识别，把说出的话放进输入框
  const listen = () => {
    // Find the speech-recognition feature supported by the browser / 查找浏览器支持的语音识别功能
    const speechWindow = window as typeof window & { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike }
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition
    if (!SpeechRecognition) return

    // Listen once in English and place the result in the text box / 用英文识别一次并把结果放入输入框
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.onresult = event => setText(event.results[0][0].transcript)
    recognition.start()
  }

  // Choose the listening or speaking status picture shown on the page / 根据当前状态选择正在听或正在说的图片
  const statusImage = status === 'speaking' ? talkStatusSpeaking : talkStatusListening
  const statusAlt = status === 'speaking' ? 'Speaking… Take your time. DeepSeek connected.' : 'I’m listening… Take your time.'

  // Stop speech when the user leaves the Talk page / 用户离开 Talk 页面时停止朗读
  useEffect(() => () => speechSynthesis?.cancel(), [])

  return (
    <PageShell className="ht-talk-page">
      {/* Shared back button / 共用后退按钮 */}
      <Header />

      {/* Robot and current voice status pictures / 机器人图片和当前语音状态图片 */}
      <img className="talk-robot-complete" src={talkRobotComplete} alt="" aria-hidden="true" />
      <img className={`talk-status-image ${status}`} src={statusImage} alt={statusAlt} />

      {/* Show only the latest four messages so the page stays short / 只显示最近四条消息，避免页面过长 */}
      <div className="ht-chat-list">{chat.slice(-4).map((m, i) => <div className={`ht-bubble ${m.from === 'You' ? 'you' : 'ai'}`} key={i}><b>{m.from}</b><p>{m.text}</p><small>Now</small></div>)}</div>

      {/* Voice input, text input, and image send button / 语音输入、文字输入和图片发送按钮 */}
      <div className="fallback-input">
        <button className="talk-square-image-button" onClick={listen} aria-label="Start voice recognition"><img src={talkMicrophoneButton} alt="" /></button>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Speak or type here" />
        <button className="talk-square-image-button" disabled={isSending || !text.trim()} onClick={send} aria-label="Send message"><img src={isSending || !text.trim() ? talkSendDisabledButton : talkSendActiveButton} alt="" /></button>
      </div>

      {/* Repeat, slower, and stop controls use the supplied button pictures / Repeat、Slower 和 Stop 使用用户提供的按钮图片 */}
      <div className="ht-voice-controls">
        <button className="talk-control-image-button" onClick={() => speakText(last)} aria-label="Repeat"><img src={talkRepeatButton} alt="" /></button>
        <button className="talk-control-image-button" onClick={() => speakText(last, true)} aria-label="Slower"><img src={talkSlowerButton} alt="" /></button>
        <button className="talk-control-image-button" onClick={() => { speechSynthesis?.cancel(); setStatus('listening') }} aria-label="Stop"><img src={talkStopButton} alt="" /></button>
      </div>
    </PageShell>
  )
}



// Memories page / 记忆页面
export function Memories() {
  // Get shared data and update function / 获取共享数据和修改数据功能
  const { data, update } = useStore()

  // Memory categories / 记忆分类
  const groups = ['Personal preferences', 'Family stories', 'Recent topics', 'Family suggestions']

  // Delete a memory / 删除一条记忆
  const del = (id: string) => update(d => ({ ...d, memories: d.memories.filter(m => m.id !== id) }))

  return (
    <PhoneFrame className="elder-memories-page">
      {/* Page title / 页面标题 */}
      <Header title="My memories" />

      {/* Memory question image / 顶部图片 */}
      <div className="elder-memory-question-button">
        <img src={elderMemoryQuestionComplete} alt="" />
      </div>

      {/* Show memories by category / 按分类显示记忆 */}
      {groups.map(g => (
        <section className="memory-section" key={g}>
          <h2>{g}</h2>
          {data.memories.filter(m => m.category === g).map(m => (
            <article className="memory-card" key={m.id}>
              {/* Memory content / 记忆内容 */}
              <p>{m.text}</p>

              {/* Source and date / 来源和日期 */}
              <small>{m.source} · Added {m.date}</small>
              <div>
                {/* Allow AI to use this memory / 是否允许 AI 使用这条记忆 */}
                <label className="elder-memory-permission">
                  <input
                    type="checkbox"
                    checked={m.allowed}
                    onChange={() => update(d => ({ ...d, memories: d.memories.map(x => x.id === m.id ? { ...x, allowed: !x.allowed } : x) }))}
                  />
                  <img
                    src={m.allowed ? elderMemoryPermissionOnComplete : elderMemoryPermissionOffComplete}
                    alt={m.allowed ? 'Allow AI to use: selected' : 'Allow AI to use: not selected'}
                  />
                </label>

                {/* Delete memory / 删除记忆 */}
                <button className="elder-memory-actions" type="button" aria-label="Delete memory" onClick={() => del(m.id)}>
                  <img src={elderMemoryDelete} alt="" />
                </button>
              </div>
            </article>
          ))}
        </section>
      ))}

      {/* Elder bottom navigation / Mary 的底部导航栏 */}
      <div className="nav-space" /><BottomNav role="elder" />
    </PhoneFrame>
  )
}



// Elder settings page / 老人设置页面
export function ElderProfile() {
  // Get page navigation / 获取页面跳转功能
  const nav = useNavigate()

  return (
    <PhoneFrame className="elder-profile-page">
      {/* Page title / 页面标题 */}
      <Header title="My settings" />

      {/* Settings information / 设置内容 */}
      <img className="elder-settings-list-image" src={elderSettingsListComplete} alt="Voice style: Youthful voice. Quiet hours: 9 PM – 7 AM. Privacy." />
      <div className="stack">
        {/* Switch demo role / 切换演示角色 */}
        <button className="settings-switch-image-button" type="button" onClick={() => nav('/role', { state: { role: 'elder' } })} aria-label="Switch demo role">
          <img src={elderSettingsSwitchRoleButton} alt="" />
        </button>
      </div>

      {/* Privacy information / 隐私说明 */}
      <img className="elder-settings-privacy-image" src={elderSettingsPrivacyComplete} alt="Your conversations stay private. HeartTalk is an AI companion. It does not replace family members or professional care." />

      {/* Elder bottom navigation / Mary 的底部导航栏 */}
      <div className="nav-space" /><BottomNav role="elder" />
    </PhoneFrame>
  )
}



// Family home page / 家人主页
export function FamilyHome() {
  // Get page navigation / 获取页面跳转功能
  const nav = useNavigate()

  return (
    <PhoneFrame className="family-home">
      {/* Family welcome image / 家人端欢迎图片 */}
      <img className="family-home-intro-complete" src={familyHomeIntroComplete} alt="HeartTalk Family mode. Welcome, Emma. You’re supporting Mary with love." />

      {/* Open messages / 打开消息页面 */}
      <button className="family-home-image-action family-home-message-action" onClick={() => nav('/family/messages')} type="button">
        <img src={familyHomeMessageAction} alt="Message from Mary" />
      </button>

      {/* Support summary image / 支持情况图片 */}
      <img className="family-home-support-complete" src={familyHomeSupportComplete} alt="Today’s gentle support. 1 message sent this week. Mood check: Positive." />

      {/* Topic and reminder buttons / 话题和提醒按钮 */}
      <div className="family-action-feed">
        <button className="family-home-image-action" onClick={() => nav('/family/topic')} type="button"><img src={familyHomeTopicAction} alt="Add a conversation topic" /></button>
        <button className="family-home-image-action" onClick={() => nav('/family/reminder')} type="button"><img src={familyHomeReminderAction} alt="Set a reminder" /></button>
      </div>

      {/* Family bottom navigation / Emma 的底部导航栏 */}
      <BottomNav role="family" />
    </PhoneFrame>
  )
}



// Shared message page / 双方共用消息页面
function MessageThread({ role }: { role: 'elder' | 'family' }) {
  // Get shared data and update function / 获取共享数据和修改数据功能
  const { data, update } = useStore()

  // Store the message being typed / 保存正在输入的消息
  const [reply, setReply] = useState('')
  const messageListRef = useRef<HTMLElement | null>(null)

  // Decide the sender and receiver from the current role / 根据当前角色判断发送方和接收方
  const isElder = role === 'elder'
  const incomingDirection = isElder ? 'family_to_elder' : 'elder_to_family'
  const outgoingDirection = isElder ? 'elder_to_family' : 'family_to_elder'
  const latestIncomingMessageId = data.messages
    .filter(message => message.direction === incomingDirection)
    .at(-1)?.id
  const latestOutgoingMessageId = data.messages
    .filter(message => message.direction === outgoingDirection)
    .at(-1)?.id

  // Show the latest four messages / 显示最近四条消息
  const visibleMessages = data.messages.slice(-4)

  // Scroll to the newest message / 自动滚动到最新消息
  useEffect(() => {
    const list = messageListRef.current
    if (!list) return
    const frame = requestAnimationFrame(() => {
      list.scrollTop = list.scrollHeight
    })
    return () => cancelAnimationFrame(frame)
  }, [data.messages.length, latestIncomingMessageId])

  // Add the typed message to shared data and recent activity / 将输入的消息加入共享数据和最近活动
  const submitReply = (event: FormEvent) => {
    event.preventDefault()
    const content = reply.trim()
    if (!content) return
    update(current => ({
      ...current,
      messages: [...current.messages, {
        id: createId(),
        from: isElder ? 'Mary' : 'Emma',
        to: isElder ? 'Emma' : 'Mary',
        direction: outgoingDirection,
        content,
        createdAt: currentTime(),
      }],
      activities: [{
        id: createId(),
        text: isElder ? 'Mary replied to Emma' : 'Message sent to Mary',
        date: currentTime(),
        icon: 'message',
      }, ...current.activities],
    }))
    setReply('')
  }

  return (
    <PageShell className={`message-thread-page ${isElder ? 'elder-message-thread' : 'family-message-thread'}`} withNav>
      {/* Page title / 页面标题 */}
      <Header title={isElder ? 'From Emma' : 'From Mary'} />

      {/* Message history / 消息记录 */}
      <section ref={messageListRef} className="message-thread-list" aria-label="Message history">
        {visibleMessages.map(message => {
          const sentByCurrentRole = message.direction === outgoingDirection
          const isLatestIncoming = !sentByCurrentRole && message.id === latestIncomingMessageId
          const isLatestOutgoing = sentByCurrentRole && message.id === latestOutgoingMessageId
          const latestColor = message.direction === 'elder_to_family' ? 'latest-pink' : 'latest-blue'
          return (
            <article
              className={`message-thread-bubble ${sentByCurrentRole ? 'sent' : 'received'}${isLatestIncoming || isLatestOutgoing ? ` latest-message ${latestColor}` : ''}`}
              key={message.id}
            >
              {isElder && (isLatestIncoming || isLatestOutgoing) ? (
                <img
                  className="elder-latest-message-heading"
                  src={isLatestIncoming ? elderMessageLatestReceived : elderMessageLatestSent}
                  alt={`${isLatestIncoming ? 'Latest received' : 'Latest sent'} — ${message.from} says:`}
                />
              ) : (
                <>
                  {(isLatestIncoming || isLatestOutgoing) && (
                    <span className="latest-message-label">{isLatestIncoming ? 'Latest received' : 'Latest sent'}</span>
                  )}
                  <b>{message.from} says:</b>
                </>
              )}
              <p>{message.content}</p>
              <small>{message.createdAt}</small>
            </article>
          )
        })}
      </section>

      {/* Message input and send button / 消息输入框和发送按钮 */}
      <form className="message-reply-form" onSubmit={submitReply}>
        <div>
          <input id={`${role}-message-reply`} aria-label={isElder ? 'Reply to Emma' : 'Reply to Mary'} value={reply} onChange={event => setReply(event.target.value)} maxLength={180} placeholder="Write a kind message..." />
          <button className="message-send-image-button" type="submit" disabled={!reply.trim()} aria-label={isElder ? 'Send to Emma' : 'Send to Mary'}>
            <img src={reply.trim() ? messageSendActive : messageSendDisabled} alt="" />
          </button>
        </div>
      </form>

      {/* Bottom navigation for the current role / 当前角色的底部导航栏 */}
      <BottomNav role={role} />
    </PageShell>
  )
}

// Open the shared message page in elder mode / 以老人模式打开共用消息页
export const ElderMessages = () => <MessageThread role="elder" />

// Open the shared message page in family mode / 以家人模式打开共用消息页
export const FamilyMessages = () => <MessageThread role="family" />



// Add a topic page / 添加话题页面
export function TopicForm() {
  // Get shared update function / 获取修改共享数据的功能
  const { update } = useStore()

  // Store the form values / 保存表单内容
  const [title, setTitle] = useState('Childhood memories')
  const [note, setNote] = useState('')
  const [category, setCategory] = useState('Memories')

  // Save the topic, memory, and activity record / 保存话题、记忆和活动记录
  const saveTopic = (event: FormEvent) => {
    event.preventDefault()
    const id = createId()
    update(data => ({
      ...data,
      topics: [...data.topics, { id, text: title, delivery: 'Next conversation', tone: category }],
      memories: [...data.memories, {
        id: createId(),
        category: 'Family suggestions',
        text: note ? `${title}: ${note}` : title,
        source: 'Emma',
        date: 'Today',
        allowed: true,
      }],
      activities: [{ id: createId(), text: 'Conversation topic suggested', date: currentTime(), icon: 'topic' }, ...data.activities],
    }))
  }

  return (
    <PhoneFrame className="topic-form">
      {/* Page title / 页面标题 */}
      <Header title="Add a topic" />

      {/* Topic form / 话题表单 */}
      <form className="form family-simple-action" onSubmit={saveTopic}>
        <div className="family-topic-illustration"><img src={familyTopicVisual} alt="HeartTalk with suggested conversation topics" /></div>
        <FormField label="Topic title"><input value={title} onChange={event => setTitle(event.target.value)} placeholder="e.g., Childhood memories" /></FormField>
        <FormField label="Short note (optional)"><div className="topic-note-wrap"><textarea value={note} maxLength={200} onChange={event => setNote(event.target.value)} rows={3} placeholder="Add a note to guide the conversation (e.g., ask about family stories, favorite places, etc.)" /><span>{note.length} / 200</span></div></FormField>
        <div className="family-category-block"><b>Suggested category</b><div className="category-chips">{['Memories', 'Interests', 'Food', 'Family', 'Daily life'].map(item => <button type="button" key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <button className="family-save-topic-image-button" type="submit" disabled={!title.trim()} aria-label="Save topic"><img src={familySaveTopicButton} alt="Save topic" /></button>
      </form>

      {/* Family bottom navigation / Emma 的底部导航栏 */}
      <BottomNav role="family" />
    </PhoneFrame>
  )
}



// Set a reminder page / 设置提醒页面
export function ReminderForm() {
  // Get shared data and update function / 获取共享数据和修改数据功能
  const { data, update } = useStore()

  // Store the reminder form values / 保存提醒表单内容
  const [title, setTitle] = useState('Take a short walk')
  const [date, setDate] = useState(todayForDateInput)
  const [time, setTime] = useState('16:00')
  const [repeat, setRepeat] = useState('Every day')
  const latestReminder = data.reminders.at(-1)!

  // Save the reminder and activity record / 保存提醒和活动记录
  const saveReminder = (event: FormEvent) => {
    event.preventDefault()
    update(current => ({
      ...current,
      reminders: [...current.reminders, { id: createId(), title, date, time, repeat, status: 'pending' }],
      activities: [{ id: createId(), text: 'Reminder created', date: currentTime(), icon: 'bell' }, ...current.activities],
    }))
  }

  return (
    <PhoneFrame className="reminder-form">
      {/* Page title / 页面标题 */}
      <Header title="Set a reminder" />

      {/* Reminder form / 提醒表单 */}
      <form className="form family-simple-action" onSubmit={saveReminder}>
        {/* Latest reminder status / 最新提醒状态 */}
        <section className="family-reminder-status">
          <small>Latest reminder for Mary</small>
          <b>{latestReminder.title}</b>
          <img className="family-reminder-status-label-image" src={latestReminder.status === 'completed' ? familyReminderCompletedLabel : familyReminderWaitingLabel} alt={latestReminder.status === 'completed' ? 'Completed' : 'Waiting for Mary'} />
          <p>{latestReminder.date} · {latestReminder.time}{latestReminder.completedAt && <><br />Completed {latestReminder.completedAt}</>}</p>
        </section>
        <FormField label="Reminder title"><input value={title} onChange={event => setTitle(event.target.value)} placeholder="e.g., Take a short walk" /></FormField>
        <div className="form-grid family-date-grid"><FormField label="Date"><input lang="en-US" type="date" value={date} onInput={event => setDate(event.currentTarget.value)} /></FormField><FormField label="Time"><input lang="en-US" type="time" value={time} onInput={event => setTime(event.currentTarget.value)} /></FormField></div>
        <FormField label="Repeat"><input value={repeat} onChange={event => setRepeat(event.target.value)} placeholder="e.g., Every day" /></FormField>
        <button className="family-save-reminder-image-button" type="submit" disabled={!title.trim()} aria-label="Save reminder"><img src={familySaveReminderButton} alt="Save reminder" /></button>
      </form>

      {/* Family bottom navigation / Emma 的底部导航栏 */}
      <BottomNav role="family" />
    </PhoneFrame>
  )
}



// Recent activity page / 最近活动页面
export function Activity() {
  // Get shared activity data / 获取共享活动数据
  const { data } = useStore()

  return (
    <PhoneFrame className="family-activity-page">
      {/* Page title / 页面标题 */}
      <Header title="Recent activity" />

      {/* Activity timeline / 活动时间线 */}
      <div className="timeline">
        {data.activities.map((activity, index) => {
          // Choose the picture for this activity type / 根据活动类型选择图片
          let icon = familyActivityBellComplete
          if (activity.icon === 'check') icon = familyActivityCheckComplete
          if (activity.icon === 'message') icon = familyActivityMessageComplete

          return (
            <article key={activity.id}>
              <span><img className="family-activity-icon" src={icon} alt="" /></span>
              <div>
                <b>{activity.text}</b>
                <small>{activity.date}</small>
              </div>
              {index < data.activities.length - 1 && <i />}
            </article>
          )
        })}
      </div>

      {/* Family bottom navigation / Emma 的底部导航栏 */}
      <div className="nav-space" />
      <BottomNav role="family" />
    </PhoneFrame>
  )
}



// Family profile page / 家人个人页面
export function FamilyProfile() {
  // Get page navigation / 获取页面跳转功能
  const nav = useNavigate()

  return (
    <PhoneFrame className="family-profile-page">
      {/* Page title / 页面标题 */}
      <Header title="My profile" />

      {/* Family profile information / 家人个人资料 */}
      <img
        className="family-profile-panel-image"
        src={familyProfilePanel}
        alt="Emma, Mary’s daughter. Notifications, Privacy overview, and App preferences."
      />

      {/* Switch demo role / 切换演示角色 */}
      <div className="family-profile-role-action">
        <button className="settings-switch-image-button" type="button" onClick={() => nav('/role', { state: { role: 'family' } })} aria-label="Switch demo role">
          <img src={elderSettingsSwitchRoleButton} alt="" />
        </button>
      </div>

      {/* Family bottom navigation / Emma 的底部导航栏 */}
      <BottomNav role="family" /> 
    </PhoneFrame>
  )
}
