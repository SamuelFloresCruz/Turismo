'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AuthModal from '@/components/auth-modal'
import AISidePanel, { AIFloatingButton } from '@/components/ai-side-panel'
import { motion, AnimatePresence } from 'framer-motion'

interface AppContextType {
  openAuth: () => void
  openAI: () => void
  closeAI: () => void
  isAIOpen: boolean
}

const AppContext = createContext<AppContextType | null>(null)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)

  const contextValue: AppContextType = {
    openAuth: () => setIsAuthOpen(true),
    openAI: () => setIsAIOpen(true),
    closeAI: () => setIsAIOpen(false),
    isAIOpen
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          onOpenAuth={() => setIsAuthOpen(true)} 
          onOpenAI={() => setIsAIOpen(true)} 
        />
        
        {/* Contenido principal con animación cuando AI está abierto */}
        <AnimatePresence mode="wait">
          <motion.main
            key={isAIOpen ? 'with-panel' : 'without-panel'}
            initial={false}
            animate={{ 
              width: isAIOpen ? '70%' : '100%',
              transition: { type: 'spring', damping: 25, stiffness: 200 }
            }}
            className="flex-1 pt-16 hidden lg:block"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Versión móvil sin animación de ancho */}
        <main className="flex-1 pt-16 lg:hidden">
          {children}
        </main>
        
        <motion.div
          animate={{ 
            width: isAIOpen ? '70%' : '100%'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="hidden lg:block"
        >
          <Footer />
        </motion.div>
        
        <div className="lg:hidden">
          <Footer />
        </div>
        
        {/* Modal de autenticación */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        
        {/* Panel lateral AI */}
        <AISidePanel isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        
        {/* Botón flotante AI (solo visible cuando el panel está cerrado) */}
        {!isAIOpen && <AIFloatingButton onClick={() => setIsAIOpen(true)} />}
      </div>
    </AppContext.Provider>
  )
}
