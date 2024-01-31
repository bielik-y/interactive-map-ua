import styles from './GoogleMap.module.scss'
import { createCustomMarker, createCustomCluster } from './marker'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { GoogleMap as GoogleMapReact, useLoadScript } from '@react-google-maps/api'
import { type Cluster, MarkerClusterer } from '@googlemaps/markerclusterer'

import markerIcon from '../../assets/icons/ic_marker.svg'
import markerHoverIcon from '../../assets/icons/ic_marker_hover.svg'
import Spinner from '../UI/Spinner'

// const MAP_RESTRICTION_BOUNDS_UA = { north: 52.72, south: 44, west: 22.05, east: 40.25 }
const MAP_CENTER = { lat: 48.84421678574725, lng: 31.253911335235795 }
const MIN_ZOOM = 6
const MAX_ZOOM = 19

type Location = {
  id: number
  lat: number
  lng: number
}

type GoogleMapProps = {
  locations: Location[]
  selectedId: number | null
  onMarkerClick: (id: number) => void
}

const mapOptions = {
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  clickableIcons: false,
  maxZoom: MAX_ZOOM,
  minZoom: MIN_ZOOM,
  // Setting the restriction will cause non smooth animations and clustering library issues
  // restriction: { latLngBounds: MAP_RESTRICTION_BOUNDS_UA },
}

const GoogleMap = ({ locations, selectedId, onMarkerClick }: GoogleMapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>()
  const [clusterer, setClusterer] = useState<MarkerClusterer>()
  const [markers, setMarkers] = useState<google.maps.Marker[]>()
  const [selected, setSelected] = useState<google.maps.Marker | null>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: window.__env__.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'UK',
  })

  const handleMarkerClick = useCallback(
    (id: number, marker: google.maps.Marker, map: google.maps.Map) => {
      onMarkerClick(id)
      const position = marker.getPosition()
      if (position) panToMarker(position, map)
    },
    [onMarkerClick],
  )

  useEffect(() => {
    if (map) {
      const points: google.maps.Marker[] = []
      locations.forEach((location) => {
        const marker = createCustomMarker(location.id, false, location.lat, location.lng)
        marker.addListener('click', () => handleMarkerClick(location.id, marker, map))
        points.push(marker)
      })

      setMarkers((current) => {
        current?.map((elem) => elem.setMap(null))
        return points
      })

      const renderer = {
        render({ count, position }: { count: number; position: google.maps.LatLng }) {
          return createCustomCluster(count, position, map)
        },
      }

      const updatedClusterer = new MarkerClusterer({
        markers: points,
        map: map,
        renderer: renderer,
        // Default onClusterClick function acts incorrectly with set map restriction
        onClusterClick: (_, cluster, map) => handleClusterClick(cluster, map),
      })

      setClusterer((current) => {
        current?.setMap(null)
        return updatedClusterer
      })
    }
  }, [handleMarkerClick, locations, map])

  useEffect(() => {
    if (markers && map) {
      const setMarkerSelected = (isSelected: boolean, marker?: google.maps.Marker | null) => {
        if (marker)
          if (isSelected) {
            marker?.set('selected', true)
            marker?.setIcon({ url: markerHoverIcon })
            marker?.setZIndex(google.maps.Marker.MAX_ZINDEX + 1)
          } else {
            marker?.set('selected', false)
            marker?.setIcon({ url: markerIcon })
          }
      }

      if (selectedId) {
        const point = markers?.filter((marker) => marker.get('id') === selectedId)[0]
        if (point) {
          const position = point.getPosition()
          if (position) panToMarker(position, map, true)
          setMarkerSelected(true, point)
          setSelected((current) => {
            setMarkerSelected(false, current)
            return point
          })
        }
      } else {
        map.setCenter(MAP_CENTER)
        map.setZoom(MIN_ZOOM)
        setSelected(null)
      }
    }
  }, [selectedId, map, markers])

  const handleClusterClick = (cluster: Cluster, map: google.maps.Map) => {
    if (cluster.markers) {
      const bounds = new window.google.maps.LatLngBounds()
      for (const point of cluster.markers) {
        const pos = point.getPosition()
        if (pos) bounds.extend(pos)
      }
      map.panTo(cluster.position)
      setTimeout(() => {
        map.fitBounds(bounds)
      }, 100)
    }
  }

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance)
  }, [])

  const panToMarker = (position: google.maps.LatLng, map: google.maps.Map, selected?: boolean) => {
   // A smooth zoom available only if zoom difference <= 4
   // setZoom() and panTo() executed at the same time are not smooth so timeout is used
    map.panTo(position)
    const zoom = map.getZoom()
    if (selected)
      setTimeout(() => {
        map.setZoom(MAX_ZOOM - 2)
      }, 100)
    else if (zoom && zoom < 15)
      setTimeout(() => {
        map.setZoom(zoom + 4)
      }, 100)
    else
      setTimeout(() => {
        map.setZoom(MAX_ZOOM)
      }, 100)
  }

  const initializedMap = useMemo(() => {
    return (
      <GoogleMapReact
        mapContainerClassName={styles.map}
        zoom={MIN_ZOOM}
        center={MAP_CENTER}
        options={mapOptions}
        onLoad={onLoad}
      />
    )
  }, [onLoad])

  return !isLoaded ? <Spinner /> : initializedMap
}

export default GoogleMap
  
