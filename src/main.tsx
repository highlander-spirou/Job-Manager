import ReactDOM from "react-dom/client"
import "./index.css"
import { JobsProvider } from "./contexts"
import App from "./page/index.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <JobsProvider>
    <App />
  </JobsProvider>
)
