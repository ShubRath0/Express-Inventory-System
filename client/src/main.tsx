import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/index.css'
import App from '@/App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <Toaster position='top-center' reverseOrder={false} />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
