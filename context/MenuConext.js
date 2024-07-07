import React, { createContext, useRef, useState } from 'react'
export const MenuLeftContext = createContext()
const MenuConext = (props) => {
    const drawerRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  return (
    <MenuLeftContext.Provider value={{drawerRef,isFullScreen, setIsFullScreen}}>{props.children}</MenuLeftContext.Provider>
  )
}

export default MenuConext
