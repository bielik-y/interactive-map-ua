import svgmarkerIcon from '../../assets/icons/ic_marker.svg'
import svgmarkerHoverIcon from '../../assets/icons/ic_marker_hover.svg'

import svgclusterIcon from '../../assets/icons/ic_cluster.svg'
import svgclusterHoverIcon from '../../assets/icons/ic_cluster_hover.svg'

import styles from './GoogleMap.module.scss'

const MAX_Z_INDEX = 100
const SHAPE = {
  coords: [1,30, 2,15, 15,2, 30,1, 45,2, 59,15, 60,30, 59,45, 45,59, 30,78, 15,59, 2,45],
  type: 'poly',
}

export const createCustomMarker = (id: number, selected: boolean, lat: number, lng: number) => {
  const marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng,
    },
    icon: {
      url: svgmarkerIcon,
      
    },
    shape: SHAPE
  })
  marker.set('id', id)
  marker.set('selected', selected)
  marker.addListener('mouseover', () => {
    marker.setIcon({
      url: svgmarkerHoverIcon,
    })
    marker.setZIndex(MAX_Z_INDEX)
  })
  marker.addListener('mouseout', () => {
    if (!marker.get('selected')) {
      marker.setIcon({
        url: svgmarkerIcon,
      })
      marker.setZIndex(undefined)
    }
  })

  return marker
}

export const createCustomCluster = (
  count: number,
  position: google.maps.LatLng,
  map: google.maps.Map,
) => {
  const icon = {
    url: svgclusterIcon,
  }
  const label = {
    text: String(count),
    className: styles.number,
    color: '#05B0FA',
    fontSize: '22px',
  }

  const marker = new google.maps.Marker({
    position: position,
    icon: {
      url: svgclusterIcon,
    },
    map: map,
    label: label,
    shape: SHAPE
  })

  marker.addListener('mouseover', () => {
    marker.setIcon({
      url: svgclusterHoverIcon,
    })
    marker.setLabel({
      text: String(count),
      className: styles.number,
      color: '#FFFFFF',
      fontSize: '22px',
    })
  })
  marker.addListener('mouseout', () => {
    marker.setIcon(icon)
    marker.setLabel(label)
  })

  return marker
}
