import { useState } from "react"

enum MenuCode {
  Home = 0,
  Jobs = 1,
  Tasks = 2,
}

const useMenu = () => {
  const [menu, setMenu] = useState<MenuCode>(MenuCode.Home)
  const changeMenu = (menuType: MenuCode) => {
    setMenu(menuType)
  }
  return { menu, changeMenu, MenuCode }
}

export default useMenu