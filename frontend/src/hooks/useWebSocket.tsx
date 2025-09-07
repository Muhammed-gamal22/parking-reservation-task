'use client'
import { useEffect, useRef } from 'react'
import { createWs } from '@/services/ws'
import { useQueryClient } from '@tanstack/react-query'

export default function useWebSocket(gateId?: string){
    const qc = useQueryClient()
  const wsRef = useRef<any>(null)

  useEffect(() => {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
    const url = `${proto}//${location.host}/api/v1/ws`
    const ws = createWs(url)
    wsRef.current = ws

    const off = ws.onMessage((msg:any) => {
      if(msg?.type === 'zone-update'){
        qc.setQueryData(['zones', msg.payload.gateId], (old:any[] = []) => {
          return old.map(z => z.id === msg.payload.id ? { ...z, ...msg.payload } : z)
        })
      }
      if(msg?.type === 'admin-update'){
        qc.invalidateQueries({ queryKey: ['admin-reports'] })
      }
    })

    ws.onOpen(() => {
      if(gateId) ws.send({ type: 'subscribe', payload: { gateId } })
    })

    return () => { off(); ws.close() }
  }, [gateId])
}