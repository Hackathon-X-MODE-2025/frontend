import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./widgets/sidebar/ui"

function App() {

  return (
    <Box className='flex h-screen'>
      <Sidebar />
      <main className="w-full bg-[#212121] p-6 text-white">
        <Outlet />
      </main>
    </Box>
  )
}

export default App
