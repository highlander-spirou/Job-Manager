import { useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

const useDragControl = ({ threshold, snapPosition, releaseThreshold }) => {
  const [xPosition, setXPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    xPosition === 0 && setIsDragging(false)
  }, [xPosition])

  const restartPosition = () => {
    controls.start({ x: 0, transition: { type: "tween" } })
    setXPosition(0)
  }

  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x

    if (xPosition === 0) {
      if (offsetX < -threshold) {
        // Swipe left pass threshold from origin => Reveal Delete Button
        controls.start({ x: -snapPosition, transition: { type: "tween" } })
        setXPosition(-snapPosition)
      } else if (offsetX > threshold) {
        // Swipe right pass threshold from origin => Reveal Edit Button
        controls.start({ x: snapPosition, transition: { type: "tween" } })
        setXPosition(snapPosition)
      } else {
        // Swipe didn't pass threshold => Snap back to original position
        controls.start({ x: 0, transition: { type: "tween" } })
        setXPosition(0)
      }
    } else if (xPosition === -snapPosition) {
      // From Delete snapped position
      if (offsetX > releaseThreshold) {
        // Swipe right pass releaseThreshold => hide the Delete btn, snap back to origin
        controls.start({ x: 0, transition: { type: "tween" } })
        setXPosition(0)
      }
    } else if (xPosition === snapPosition) {
      // From Edit snapped position
      if (offsetX < -releaseThreshold) {
        // Swipe left pass releaseThreshold => hide the Edit btn, snap back to origin
        controls.start({ x: 0, transition: { type: "tween" } })
        setXPosition(0)
      }
    }
  }

  return {
    xPosition,
    setXPosition,
    isDragging,
    setIsDragging,
    restartPosition,
    handleDragEnd,
    controls,
  }
}

export default useDragControl
