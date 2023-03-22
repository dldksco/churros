import SidebarItem from "./SidebarItem"
import { SIDEBAR_ITEM_SIZE } from "./constants"

const LogoTab = (props) => {
    return <SidebarItem className={`${SIDEBAR_ITEM_SIZE.lg} bg-stone-200`}>
        <h1>로고 탭</h1>
    </SidebarItem>
}

export default LogoTab;