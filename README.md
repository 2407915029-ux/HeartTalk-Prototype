# HeartTalk

HeartTalk 是一个面向老年人的 AI 语音情感陪伴本科毕业设计演示原型。它包含老人端 Mary 和家庭端 Emma 两个可切换角色，重点展示温暖、易用、尊重隐私的交互设计。它是设计原型，不是医疗工具，也不替代家人或专业照护。

## 功能

- 欢迎页与演示角色切换
- 老人端首页、语音对话、记忆管理与个人设置
- 家庭端消息、谈话话题、提醒、权限、活动记录与个人设置
- 家庭端操作实时同步到老人端
- 浏览器 SpeechSynthesis 朗读，SpeechRecognition 不可用时始终提供文字输入
- localStorage 持久化及一键重置演示数据

## 技术栈

React、Vite、TypeScript、React Router、Lucide React、普通 CSS，以及轻量的 Node/Express 本地 API 代理。

## 安装与运行

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址。生产构建：

```bash
npm run build
npm run preview
```

## 目录

- `src/pages.tsx`：全部路由页面与主要交互
- `src/components.tsx`：共享 UI 组件
- `src/store.tsx`：localStorage 状态管理
- `src/services/aiService.ts`：前端统一 AI 调用接口
- `src/services/mockAiService.ts`：离线 mock 回退
- `server/index.mjs`：保管密钥并调用 DeepSeek 的本地服务
- `src/data.ts`、`src/types.ts`：演示数据和类型
- `src/styles.css`：设计系统与响应式样式
- `docs/`：设计决策和答辩演示脚本

## 推荐演示流程

从欢迎页进入 Mary 首页并体验 AI 对话和记忆；在设置中切换为 Emma，发送消息、创建话题和提醒；再切回 Mary 检查首页同步结果；最后展示权限页中默认关闭的完整对话记录权限。

## 数据与语音说明

所有消息、提醒、话题、记忆、权限和活动数据都保存在浏览器的 `hearttalk-demo-data` localStorage 项中。清理站点数据后会自动恢复默认数据，也可在个人设置中使用 Reset demo data。

语音朗读依赖浏览器 Web Speech API，声音质量取决于操作系统；不支持时页面仍可正常使用文字输入。浏览器通常要求用户交互后才允许朗读。

## 配置 DeepSeek

1. 在 DeepSeek 开放平台申请 API Key。
2. 在项目根目录创建 `.env.local`。
3. 只替换 `DEEPSEEK_API_KEY`，不要添加 `VITE_` 前缀：

```env
DEEPSEEK_API_KEY=your_real_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
DEEPSEEK_TIMEOUT_MS=20000
PORT=3001
```

`.env.local` 已被 `.gitignore` 忽略。不要把密钥写进 `src/`、浏览器代码或提交到 Git。

`npm run dev` 会同时启动 Vite 前端和 Express 服务端。访问
`http://localhost:3001/api/health` 可检查模式：`provider: "deepseek"` 表示已经读取密钥，`provider: "mock"` 表示离线演示模式。对话页也会显示 “DeepSeek connected” 或 “Demo fallback”。

没有 Key、网络失败、超时、余额不足或接口报错时，会自动使用本地 mock 回复，页面不会崩溃。健康接口只能确认配置是否存在；真实 DeepSeek 可用性需要实际发送一条对话验证。

本项目是情感陪伴交互设计原型，不是医疗产品。
