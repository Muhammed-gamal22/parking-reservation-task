"use client"
import React, { useEffect } from 'react'

const GateHeader = ({ gateName, wsConnected }: { gateName: string, wsConnected: boolean }) => {
  return (
    <header className="flex items-center justify-between py-4">
    <div>
      <h1 className="text-xl font-bold">{gateName}</h1>
      <div className="text-sm text-muted">{new Date().toLocaleString()}</div>
    </div>
    <div>
      <span className={`px-2 py-1 rounded ${wsConnected ? 'bg-green-100' : 'bg-red-100'}`}>
        {wsConnected ? 'WS connected' : 'WS disconnected'}
      </span>
    </div>
  </header>
  )
}

export default GateHeader