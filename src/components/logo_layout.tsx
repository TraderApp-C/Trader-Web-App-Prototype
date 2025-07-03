// src/components/Layout.tsx
import React from 'react';


export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
      
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}>
      <img src="/trader-logo.png" alt="Logo" style={{ height: 40 }} />
    
    </header>
    <main>{children}</main>
  </div>
);