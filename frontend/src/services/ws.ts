export function createWs(url: string){
    let ws: WebSocket | null = null
    let listeners: Array<(msg: any) => void> = []
    let openListeners: Array<() => void> = []
    let shouldReconnect = true
    let reconnectTimeout = 2000
  
    function connect(){
      ws = new WebSocket(url)
      ws.onopen = () => openListeners.forEach(fn => fn())
      ws.onmessage = (e) => {
        try{ const d = JSON.parse(e.data); listeners.forEach(fn=>fn(d)) }catch(err){ listeners.forEach(fn=>fn(e.data)) }
      }
      ws.onclose = () => { if(shouldReconnect) setTimeout(connect, reconnectTimeout) }
      ws.onerror = () => { 
        
       }
    }
  
    connect()
  
    return {
      send: (payload: any) => { if(ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload)) },
      onMessage: (fn: (msg:any)=>void) => { listeners.push(fn); return () => { listeners = listeners.filter(f=>f!==fn) } },
      onOpen: (fn: ()=>void) => { openListeners.push(fn); return () => { openListeners = openListeners.filter(f=>f!==fn) } },
      close: () => { shouldReconnect = false; ws?.close() }
    }
  }