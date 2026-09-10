// Import React and the browser renderer used to start the application / 导入 React 和用于启动应用的浏览器渲染器
import React from 'react'
import ReactDOM from 'react-dom/client'

// Enable browser-address routing for all pages / 为所有页面启用浏览器地址路由
import { BrowserRouter } from 'react-router-dom'

// Provide shared HeartTalk data and update functions to every page / 向所有页面提供共享的 HeartTalk 数据和更新功能
import { StoreProvider } from './store'

// Import the root component containing the complete page routing table / 导入包含完整页面路由表的根组件
import App from './App'

// Load shared design variables before the main application styles / 先加载共享设计变量，再加载应用主样式
import './design-tokens.css'
import './styles.css'

// Mount the React application into the root element defined in index.html / 将 React 应用挂载到 index.html 中定义的 root 元素
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Detect common development problems without changing the visible interface / 在不改变可见界面的情况下帮助发现常见开发问题
  <React.StrictMode>
    {/* Make the current browser URL available to App.tsx routing / 让 App.tsx 路由可以读取当前浏览器地址 */}
    <BrowserRouter>
      {/* Make shared application data available to App and every page / 向 App 和所有页面提供共享应用数据 */}
      <StoreProvider>
        {/* Start the HeartTalk page and route tree / 启动 HeartTalk 页面与路由树 */}
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
