import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  isListened: boolean,
  ref: RefObject<T>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }
      handler(event)
    }
    if (isListened) {
      document.addEventListener('click', listener)
    }
    return () => {
      if (isListened) document.removeEventListener('click', listener)
    }
  }, [isListened, ref, handler])
}
