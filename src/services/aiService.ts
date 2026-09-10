import { mockReply } from './mockAiService'

// Define one user or assistant message sent to the chat API / 定义发送给聊天接口的一条用户或助手消息
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

// Describe the only response field currently used by the interface / 描述当前界面实际使用的唯一回复字段
type AiReply = {
  message: string
}

// Combine recent messages with memories approved by the user / 组合最近的消息与用户允许使用的记忆
type ChatInput = {
  messages: ChatMessage[]
  approvedMemories: string[]
}



// Step 3: Request an AI reply in aiService.ts / 第三步：在 aiService.ts 请求 AI 回复
export async function sendChatMessage(input: ChatInput): Promise<AiReply> {
  // Find the latest user message / 找出最新的用户消息。
  const latestUserText =
  // [...input.messages] copies, .reverse() reverses, .find(...) finds the latest user message, ?.content reads it, and ?? '' uses an empty string if none / [...input.messages] 复制数组，.reverse() 倒序，.find(...) 找最新用户消息，?.content 读取内容，?? '' 找不到则用空字符串。
    [...input.messages].reverse().find(message => message.role === 'user')?.content ?? ''
  try {



// Step 4: aiService.ts sends the conversation and approved memories to the backend / 第四步：aiService.ts 将对话和获准记忆发送到自己的后端。
    // Request the project's own /api/chat endpoint, not DeepSeek directly / 请求项目自己的 /api/chat 接口，而不是直接请求 DeepSeek。
    const response = await fetch('/api/chat', {
    // POST sends the data, Content-Type marks it as JSON, and JSON.stringify(input) converts the input for network transfer / POST 提交数据，Content-Type 指明 JSON，JSON.stringify(input) 把 input 转成可发送的 JSON 字符串。
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })



// Step 13: aiService.ts receives the backend response / 第十三步：aiService.ts 接收后端返回结果。
    // Reject HTTP errors or malformed replies so the local fallback can respond / 拒绝 HTTP 错误或格式异常的回复，以便启用本地降级。
    if (!response.ok) throw new Error('Chat service unavailable')

    // Convert the JSON into a JavaScript object and treat it as Partial<AiReply> for validation / 将 JSON 转成 JavaScript 对象，并按 Partial<AiReply> 处理以便继续检查。
    const result = (await response.json()) as Partial<AiReply>

    // Check that message exists, is a string, and is not empty or whitespace / 检查 message 存在、是字符串，并且不是空字符串或只有空格。
    if (typeof result.message !== 'string' || !result.message.trim()) throw new Error('Invalid chat response')

    // Return the validated message to the page and finish sendChatMessage / 将验证后的 message 返回页面，并结束 sendChatMessage。
    return { message: result.message }
  } 
  catch {

    // Generate a usable local reply when the server or DeepSeek is unavailable / 服务端或 DeepSeek 不可用时生成可用的本地回复
    return {
      message: mockReply(latestUserText),
    }
  }
}





















