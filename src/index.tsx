import { createRoot } from "react-dom/client";
import { SocketProvider } from "./context/SocketProvider";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<SocketProvider children={<App />}></SocketProvider>);
