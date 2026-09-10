// React content type / React 内容类型
import type { ReactNode } from 'react'
// Page links, current address, and navigation / 页面链接、当前地址和跳转功能
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
// Back button and bottom-navigation pictures / 返回按钮和底部导航栏图片
import roleBackButton from './assets/role-back-button.png'
import elderNavHome from './assets/elder-nav-home-normalized.png'
import elderNavHomeActive from './assets/elder-nav-home-active-normalized.png'
import elderNavMemories from './assets/elder-nav-memories-normalized.png'
import elderNavMemoriesActive from './assets/elder-nav-memories-active-normalized.png'
import elderNavProfile from './assets/elder-nav-profile-normalized.png'
import elderNavProfileActive from './assets/elder-nav-profile-active-normalized.png'
import familyNavDashboard from './assets/family-nav-dashboard-normalized.png'
import familyNavDashboardActive from './assets/family-nav-dashboard-active-normalized.png'
import familyNavActivity from './assets/family-nav-activity-normalized.png'
import familyNavActivityActive from './assets/family-nav-activity-active-normalized.png'
import familyNavProfile from './assets/family-nav-profile-normalized.png'
import familyNavProfileActive from './assets/family-nav-profile-active-normalized.png'



// Phone frame used by pages with the phone layout / 使用手机布局的页面外框
export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string })
{  return <main className={`phone ${className}`}>{children}</main>  }



// Page frame that can reserve space for bottom navigation / 可以为底部导航栏预留空间的页面外框
export function PageShell({ children, className = '', withNav = false }: { children: ReactNode; className?: string; withNav?: boolean }) 
{  return <main className={`ht-shell ${withNav ? 'with-nav' : ''} ${className}`}>{children}</main>  }



// Choose the correct home page from the current address / 根据当前页面地址选择对应主页
function useHomePath() {
  // Read the current page address / 读取当前页面地址
  const { pathname } = useLocation()

  // Family pages return to the family home page / 家人端页面返回家人主页
  if (pathname.startsWith('/family/')) return '/family/home'

  // Elder pages return to the elder home page / 老人端页面返回老人主页
  if (pathname.startsWith('/elder/')) return '/elder/home'

  // Other pages return to the welcome page / 其他页面返回欢迎页
  return '/'
}



// Shared page header with a back button and centered title / 带返回按钮和居中标题的共用页面顶部
export function Header({ title }: { title?: string }) {
  // Get navigation and the correct home-page address / 获取跳转功能和对应主页地址
  const nav = useNavigate()
  const homePath = useHomePath()
  
  return (
    <header className="page-header">
      {/* Return to the current role's home page / 返回当前角色的主页 */}
      <button className="icon-btn back-icon-button" onClick={() => nav(homePath)} aria-label="Back">
        <img className="ht-back-icon-image" src={roleBackButton} alt="" />
      </button>

      {/* Show a title when one is provided / 有标题时显示标题 */}
      {title && <h1>{title}</h1>}

      {/* Empty right column keeps the title centered / 右侧空白列让标题保持居中 */}
      <span />
    </header>
  )
}



// Bottom navigation for the elder and family roles / 老人端和家人端共用的底部导航栏
export function BottomNav({ role }: { role: 'elder' | 'family' }) {
  // Read the current address to choose the active picture / 读取当前地址以选择选中状态图片
  const location = useLocation()

  // Elder navigation items / 老人端导航项目
  const elderItems = [
    { image: elderNavHome, activeImage: elderNavHomeActive, label: 'Home', to: '/elder/home' },
    { image: elderNavMemories, activeImage: elderNavMemoriesActive, label: 'Memories', to: '/elder/memories' },
    { image: elderNavProfile, activeImage: elderNavProfileActive, label: 'Me', to: '/elder/profile' },
  ]

  // Family navigation items / 家人端导航项目
  const familyItems = [
    { image: familyNavDashboard, activeImage: familyNavDashboardActive, label: 'Dashboard', to: '/family/home' },
    { image: familyNavActivity, activeImage: familyNavActivityActive, label: 'Activity', to: '/family/activity' },
    { image: familyNavProfile, activeImage: familyNavProfileActive, label: 'Profile', to: '/family/profile' },
  ]

  return (
    <nav className={`bottom-nav ${role === 'elder' ? 'elder-bottom-nav' : ''}`}>
    
      {/* Show the navigation items belonging to the current role / 显示当前角色对应的导航项目 */}
      {role === 'elder' ? elderItems.map(({ image, activeImage, label, to }) => {
      
        // Keep Home active on elder message and reminder pages / 老人消息页和提醒页仍然选中主页
        const active = location.pathname === to || (to === '/elder/home' && ['/elder/messages', '/elder/reminders'].includes(location.pathname))
        return <NavLink key={to} to={to} className={active ? 'active' : ''}><img className="elder-nav-image" src={active ? activeImage : image} alt={label} /></NavLink>
      }) : familyItems.map(({ image, activeImage, label, to }) => {
      
        // Keep Dashboard active on family message, topic, and reminder pages / 家人消息、话题和提醒页仍然选中主页
        const active = location.pathname === to || (to === '/family/home' && ['/family/messages', '/family/topic', '/family/reminder'].includes(location.pathname))
        return <NavLink key={to} to={to} className={active ? 'active' : ''}><img className="family-nav-image" src={active ? activeImage : image} alt={label} /></NavLink>
      })}
    </nav>
  )
}



// Reusable field for the family topic and reminder forms: show the supplied label above the supplied input or textarea / 家庭端话题和提醒表单共用的字段组件：把传入的名称显示在传入的输入框或多行输入框上方
// Family Topic Page: Topic title and short note / 家庭端话题页面：话题标题和简短备注。
// Family Reminder Page: Reminder title, date, time, and repeat / 家庭端提醒页面：提醒标题、日期、时间和重复设置。
export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>
}





















