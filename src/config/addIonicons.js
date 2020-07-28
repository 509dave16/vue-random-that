import { home, homeOutline, informationCircleOutline, informationCircle, cloudOutline, cloud, listOutline, list, add, shuffle, createOutline, squareOutline, checkboxOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons'

let iconsAdded = false
export default function() {
  if (iconsAdded) {
    return
  }
  iconsAdded = true
  addIcons({
    home,
    'home-outline': homeOutline,
    'information-circle-outline': informationCircleOutline,
    'information-circle': informationCircle,
    'cloud-outline': cloudOutline,
    cloud,
    'list-outline': listOutline,
    list,
    add,
    shuffle,
    'create-outline': createOutline,
    'square-outline': squareOutline,
    'checkbox-outline': checkboxOutline,
  })
}
