import React, { useRef } from "react"

const useRenderRef = () => {
  const renderRef = useRef(0)
  const count = renderRef.current++
  console.log("component has rendered ", count, " times")
  return { count }
}

export default useRenderRef
