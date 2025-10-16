import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./widgets/sidebar/ui"
import 'react-tooltip/dist/react-tooltip.css';

function App() {

  return (
    <Box className='flex h-screen font-sans'>
      <Sidebar />
      <main className="w-full bg-primary text-white h-full overflow-hidden">
        <Outlet />
      </main>
    </Box>
  )
}

export default App
