"use client";
import GateHeader from "@/components/GateHeader";
import ZoneCard from "@/components/ZoneCard";
import useWebSocket from "@/hooks/useWebSocket";
import { getData, postData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default  function GateDetails(){
  const params = useParams()
  const gateId = params.gateId as string
  const [tab, setTab] = useState<'visitor'|'subscriber'>('visitor')
  
  const { data: zones, isLoading } = useQuery({
    queryKey: ['zones', gateId],
    queryFn: () => getData(`/master/zones?${gateId}`)
  })
  console.log(zones)
  useWebSocket(gateId)
  // const { openTicketModal } = useUIStore()

  const handleCheckin = async (zone:any) => {
    try{
      const payload:any = { gateId, zoneId: zone.id, type: tab }
      const res = await postData('/tickets/checkin', payload)
      // openTicketModal(res.ticket)
    }catch(err:any){
      alert(err.response?.data?.message ?? 'Error')
    }
  }

  return (
    <div className="w-[90%] mx-auto">
      <GateHeader gateName={`Gate ${gateId}`} wsConnected={true} />

      <div className="mb-4">
        <button onClick={()=>setTab('visitor')} className={tab==='visitor'? 'font-bold':''}>Visitor</button>
        <button onClick={()=>setTab('subscriber')} className={tab==='subscriber'? 'font-bold ml-2':''}>Subscriber</button>
      </div>

      {isLoading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((z:any)=> (
            <ZoneCard key={z.id} zone={z} onSelect={handleCheckin} disabled={!z.open || (tab==='visitor' && z.availableForVisitors<=0)} />
          ))}
        </div>
      )}

      {/* <TicketModal /> */}
    </div>
  )
}