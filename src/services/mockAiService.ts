// Step 14: Generate a local keyword-based reply when the online AI service is unavailable / 第十四步：在线 AI 服务不可用时，根据关键词生成本地回复。
export function mockReply(text: string) {

  // Normalize the input so English keyword matching is case-insensitive / 统一输入的大小写，使英文关键词匹配不受大小写影响
  const q = text.toLowerCase()

  // Respond with emotional support when the user expresses loneliness / 用户表达孤独时给予情感支持
  if (q.includes('lonely')) {
    return 'I’m sorry you felt lonely. Would you like to talk about your family or a happy memory?'
  }

  // Recall the gardening memory when garden-related words are mentioned / 提到园艺相关词语时回应对应的记忆
  if (q.includes('garden') || q.includes('tomato')) {
    return 'You told me that you enjoy gardening. How are your tomato plants today?'
  }

  // Offer Emma's message when the user mentions their daughter or Emma / 用户提到女儿或 Emma 时提示她的最新消息
  if (q.includes('daughter') || q.includes('emma')) {
    return 'Would you like to hear Emma’s latest message?'
  }

  // Use a gentle general reply when no supported keyword is found / 未找到支持的关键词时使用温和的通用回复
  return 'Thank you for telling me. Would you like to share a little more?'
}
