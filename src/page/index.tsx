import { useMediaQuery } from "@uidotdev/usehooks";
import Desktop from "./desktop"
import Mobile from "./mobile";
import '../index.css'

const App = () => {
  const desktopSize = useMediaQuery("only screen and (min-width: 640px)")

  if (desktopSize) {
    return (
      <>
        <Desktop />
      </>
    )
  } else {
    return (
      <>
        <Mobile />
      </>
    )
  }
}

export default App
