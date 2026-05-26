'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

interface MapItem {
  id: string
  nombre: string
  coordenadas: { lat: number; lng: number }
}

interface LeafletMapProps {
  items: MapItem[]
  center?: [number, number]
  zoom?: number
  onSelect: (item: MapItem) => void
}

export default function LeafletMap({ items, center, zoom, onSelect }: LeafletMapProps) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
      iconUrl: markerIcon.src ?? markerIcon,
      shadowUrl: markerShadow.src ?? markerShadow,
    })
  }, [])

  return (
    <MapContainer center={center ?? [-17.3895, -66.1568]} zoom={zoom ?? 11} className="h-full w-full" scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker
          key={item.id}
          position={[item.coordenadas.lat, item.coordenadas.lng]}
          eventHandlers={{
            click: () => onSelect(item),
          }}
        >
          <Popup>
            <div className="text-sm font-medium">{item.nombre}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
