import React from 'react'

const ZoneCard = ({zone, onSelect, disabled}: {zone:any, onSelect: (zone:any)=>void, disabled: boolean}) => {
  return (
    <div className="bg-blue-300 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold">{zone.name}</h2>
      <p className="text-sm text-gray-600">{zone.description}</p>
      <button onClick={() => onSelect(zone)} disabled={disabled} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300">
        Check In
      </button>
    </div>
  )
}

export default ZoneCard