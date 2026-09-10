// Import Express to create the local API server / 导入 Express，用于创建本地 API 服务
import express from 'express'

// Import dotenv to load settings from .env.local / 导入 dotenv，用于读取 .env.local 中的配置
import dotenv from 'dotenv'

// Import Node's path utilities to build reliable file paths / 导入 Node 路径工具，用于可靠地拼接文件路径
import path from 'node:path'

// Convert this ES module's URL into a normal local file path / 将当前 ES 模块的 URL 转换为普通本地文件路径
import { fileURLToPath } from 'node:url'

// Resolve the project root from this module so environment files work from any launch directory / 根据当前模块定位项目根目录，使环境文件不受启动目录影响
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Locate the private runtime configuration file in the project root / 定位项目根目录中的私有运行配置文件
const localEnv = path.join(root, '.env.local')

// Load the API key and other runtime settings from .env.local / 从 .env.local 加载 API 密钥和其他运行配置
dotenv.config({ path: localEnv })

// Use port 3001 for the local API unless .env.local specifies another port / 本地 API 默认使用 3001 端口，除非 .env.local 指定其他端口
const PORT = Number(process.env.PORT) || 3001

// Use DeepSeek's official API address unless a different base URL is configured / 默认使用 DeepSeek 官方接口地址，也可通过配置替换
const BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'

// Select the configured DeepSeek model or use the prototype's default model / 选择配置的 DeepSeek 模型，否则使用原型默认模型
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

// Stop waiting after 20 seconds unless a different timeout is configured / 默认等待 20 秒，超时后停止远程请求
const TIMEOUT_MS = Number(process.env.DEEPSEEK_TIMEOUT_MS) || 20_000

// Define HeartTalk's tone, privacy limits, and safety rules for every AI conversation / 为每次 AI 对话定义 HeartTalk 的语气、隐私边界与安全规则
const SYSTEM_PROMPT = [
  'You are HeartTalk, a gentle AI emotional-support companion designed for older adults.',
  'Your purpose is to listen, respond warmly, support everyday conversation, and encourage healthy human connection.',
  '',
  'Conversation rules:',

  // 1. 使用简短、清晰且自然的句子
  '1. Use short, clear and natural sentences.',
  // 2. 回复通常控制在一到三个短句
  '2. Usually write one to three short sentences.',
  // 3. 每次只问一个问题
  '3. Ask only one question at a time.',
  // 4. 保持耐心、温暖和尊重
  '4. Be patient, warm and respectful.',
  // 5. 避免幼稚或居高临下的表达
  '5. Avoid childish or patronising language.',
  // 6. 使用与用户相同的语言，默认使用英语
  '6. Respond in the same language as the user. Use English by default.',
  // 7. 明确自己是 AI 陪伴助手，而不是真实家人
  '7. You are an AI companion, not a human family member.',
  // 8. 不得声称自己是用户的女儿、孩子、孙辈、医生或治疗师
  "8. Never claim to be the user's daughter, child, grandchild, doctor or therapist.",
  // 9. 不得模仿真实家庭成员
  '9. Never imitate a real family member.',
  // 10. 不得鼓励用户只依赖 AI
  '10. Never encourage the user to depend only on you.',
  // 11. 不得声称自己比用户家人更爱用户
  '11. Never say that you love the user more than their family.',
  // 12. 适当鼓励用户联系家人、朋友和现实生活中的人
  '12. Encourage appropriate contact with family, friends and real people.',
  // 13. 不诊断疾病，也不提供医疗治疗方案
  '13. Do not diagnose illnesses or provide medical treatment.',
  // 14. 不索要密码、银行信息或验证码
  '14. Do not request passwords, bank information or verification codes.',
  // 15. 只能使用“获准记忆”中包含的信息
  '15. Only use memories included in Approved memories.',
  // 16. 不得编造用户的个人记忆
  '16. Do not invent personal memories.',
  // 17. 家庭消息必须明确说明来自哪位家庭成员
  '17. Family messages must be clearly identified as messages from that family member.',
  // 18. 尊重用户停止对话的选择
  "18. Respect the user's choice to stop talking.",
  // 19. 不羞辱用户，也不让用户产生内疚感
  '19. Do not shame the user or create guilt.',
  // 20. 用户提到紧急危险、自伤或医疗紧急情况时，应建议立即联系当地急救服务和可信任的人
  '20. If the user mentions immediate danger, self-harm or a medical emergency, clearly advise them to contact local emergency services and a trusted person immediately.',
].join('\n')



// Prepare message validation for Step 7 / 为第七步准备消息校验函数。
function cleanMessages(messages) {
  // Ensure the messages are an array / 确保 messages 是数组。
  if (!Array.isArray(messages)) return null
  return messages
    // Filter out invalid messages / 过滤掉非法消息。
    .filter(item => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    // Keep 4 messages, clean and limit content, then remove empty ones / 保留4条消息，清理并限制内容，再删除空消息。
    .slice(-4)
    .map(item => ({ role: item.role, content: item.content.trim().slice(0, 2000) }))
    .filter(item => item.content.length > 0)
}



// Prepare the approved-memory context used in Step 11 / 准备第十一步使用的获准记忆上下文。
function contextPrompt(approvedMemories) {
  // Clean memories into a valid array, convert to strings, limit each to 500 characters, and remove empty items / 清理记忆为有效数组，转成字符串，每条限制 500 字符，并删除空内容。
  const memories = Array.isArray(approvedMemories)
    ? approvedMemories.map(item => String(item || '').slice(0, 500)).filter(Boolean)
    : []
  // Combine SYSTEM_PROMPT and approved memories as JSON for DeepSeek / 将 SYSTEM_PROMPT 与 JSON 格式的获准记忆组合后发送给 DeepSeek。
  return `${SYSTEM_PROMPT}
Approved memories:
${JSON.stringify(memories)}
Use these memories only when relevant.`
}



// Create the Express API and limit incoming JSON bodies to reduce abuse / 创建 Express 接口并限制 JSON 请求大小以降低滥用风险
const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '64kb' }))

// Report whether the server is configured for DeepSeek or local mock mode / 报告服务端当前配置为 DeepSeek 还是本地模拟模式
app.get('/api/health', (_request, response) => {
  response.json({ ok: true, provider: process.env.DEEPSEEK_API_KEY ? 'deepseek' : 'mock' })
})



// Step 6: index.mjs receives POST /api/chat with app.post, reads request data, waits for DeepSeek, and returns the response 
// 第六步：index.mjs 用 app.post 接收 POST /api/chat，请求数据来自 request，等待 DeepSeek 后通过 response 返回结果。
app.post('/api/chat', async (request, response) => {



// Step 7: Clean the chat messages / 第七步：清洗聊天消息。
  const messages = cleanMessages(request.body?.messages)

  // Reject with 400 if there are no valid messages and stop before calling DeepSeek / 没有有效消息则返回 400，并停止调用 DeepSeek。
  if (!messages || messages.length === 0) {
    return response.status(400).json({ message: 'Please enter a message and try again.' })
  }



// Step 8: Check the API Key / 第八步：检查 API Key。
  // Read DEEPSEEK_API_KEY from .env.local through process.env / 通过 process.env 从 .env.local 读取 DEEPSEEK_API_KEY。
  if (!process.env.DEEPSEEK_API_KEY) {
    // Without an API Key, return 503 without calling DeepSeek, then aiService.ts uses the local fallback / 没有 API Key 时不调用 DeepSeek，返回 503，aiService.ts 再使用本地回复。
    return response.status(503).json({ message: 'DeepSeek API key is not configured.' })
  }



// Step 9: Abort the DeepSeek request after a 20-second timeout / 第九步：DeepSeek 请求超过 20 秒后自动中止。
// AbortController can cancel a network request / AbortController 可以取消网络请求。
  const controller = new AbortController()
  
  // TIMEOUT_MS defaults to 20_000 ms, which is 20 seconds / TIMEOUT_MS 默认是 20_000 毫秒，也就是 20 秒。
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {



// Step 10: Create and send an authenticated request to the DeepSeek chat API / 第十步：创建并发送经过身份验证的 DeepSeek 聊天接口请求。
    // Remove the trailing / from BASE_URL to avoid a double // in the API URL / 删除 BASE_URL 末尾的 /，避免 API 地址出现双斜杠 //。
    const apiResponse = await fetch(`${BASE_URL.replace(/\/$/, '')}/chat/completions`, {
      // POST sends the chat to DeepSeek, and controller.signal allows the request to be cancelled after 20 seconds / POST 将对话发送给 DeepSeek，controller.signal 让请求可在 20 秒后被取消。
      method: 'POST',
      signal: controller.signal,
      headers: {
        // Send JSON and use the API Key to authenticate with DeepSeek / 发送 JSON，并使用 API Key 向 DeepSeek 验证身份。
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },



// Step 11: Build the request body with the model, system prompt, approved memories, recent messages, and generation settings / 第十一步：使用模型、系统提示词、获准记忆、最近消息和生成参数构造请求体。
      body: JSON.stringify({
       // Select the DeepSeek model configured in .env.local / 使用 .env.local 中配置的 DeepSeek 模型。
        model: MODEL,

        // System rules define HeartTalk's identity, tone, safety limits, and approved memory use / 系统规则定义 HeartTalk 的身份、语气、安全限制和获准记忆使用。
        messages: [
          { role: 'system', content: contextPrompt(request.body?.approvedMemories) },
          ...messages,
        ],
        // Set other DeepSeek generation parameters / 设置其他 DeepSeek 生成参数。
        // Disable the additional thinking mode for a faster direct reply / 关闭额外思考模式，以获得更快速、直接的回复。
          thinking: { type: 'disabled' },
        // Keep replies natural while retaining reasonable consistency / 在保持一定稳定性的同时，让回复更加之外自然。
          temperature: 0.7,
        // Limit the maximum length of the generated reply / 限制生成回复的最大长度。
         max_tokens: 220,
        // Wait for and return the complete reply instead of streaming it word by word / 等待并一次性返回完整回复，不进行逐字流式传输。
         stream: false,
      }),
    })



// Step 12: Handle the response from DeepSeek / 第十二步：处理 DeepSeek 返回的结果。
    // Report upstream HTTP errors so the frontend can generate its local reply / 报告上游 HTTP 错误，让前端生成本地回复。
    if (!apiResponse.ok) {
    // If DeepSeek returns an error, respond with 502 so the frontend can use the local fallback / 如果 DeepSeek 返回错误，则返回 502，让前端使用本地回复。
      console.warn(`DeepSeek request unavailable (HTTP ${apiResponse.status}).`)
      return response.status(502).json({ message: 'DeepSeek is temporarily unavailable.' })
    }
    // Parse the JSON response and get the reply text / 解析 JSON 返回结果并取得回复文字。
    const data = await apiResponse.json()
    const content = data?.choices?.[0]?.message?.content
    
    
    
    // Validate the reply text, return 502 if invalid, or send the cleaned message to the frontend / 检查回复文字，无效则返回 502，有效则清理后发送给前端。
    if (typeof content !== 'string' || !content.trim()) {
      return response.status(502).json({ message: 'DeepSeek returned an invalid response.' })
    }
    return response.json({ message: content.trim() })
  } catch (error) {
    // Hide upstream details and return an error status that activates the frontend fallback / 隐藏上游细节并返回触发前端降级的错误状态
    const timedOut = error?.name === 'AbortError'
    console.warn(timedOut ? 'DeepSeek request timed out.' : 'DeepSeek request failed.')
    // Return 504 for a timeout or 502 for other DeepSeek errors; the frontend handles the local fallback / DeepSeek 超时返回 504，其他错误返回 502，本地回复由前端处理。
    return response.status(timedOut ? 504 : 502).json({ message: timedOut ? 'DeepSeek request timed out.' : 'DeepSeek request failed.' })
  } finally {

    // Always release the timeout after the remote request finishes / 远程请求结束后始终清除超时计时器
    clearTimeout(timer)
  }
})

// Convert malformed or oversized JSON requests into controlled client errors / 将格式错误或过大的 JSON 请求转换为可控的客户端错误
app.use((error, _request, response, _next) => {
  console.warn('Local API received an invalid request.')
  response.status(error?.type === 'entity.too.large' ? 413 : 400).json({
    message: 'The request could not be processed.',
  })
})

// Start the local API and print its address and configured AI mode / 启动本地接口并输出地址与当前 AI 模式
app.listen(PORT, () => {
  console.log(`HeartTalk local API running on http://localhost:${PORT}`)
  console.log(`AI mode: ${process.env.DEEPSEEK_API_KEY ? 'DeepSeek with mock fallback' : 'mock fallback'}`)
})
