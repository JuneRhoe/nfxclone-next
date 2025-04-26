export interface TouchPos {
  clientX: number
  clientY: number
}

export interface ModalRect {
  left: number
  top: number
  width: number
  height: number
}

export function getModalRect(itemRect: DOMRect | null | undefined): ModalRect {
  const itemWidth = itemRect?.width || 0
  const itemHeight = itemRect?.height || 0
  const itemLeft = itemRect?.left || 0
  const itemTop = itemRect?.top || 0

  const modalWidth = itemWidth * 1.4
  const modalHeight = itemHeight * 1.4 * 1.8

  let modalLeft = itemLeft - (modalWidth - itemWidth) / 2
  if (itemLeft - itemWidth <= 0) {
    modalLeft = itemLeft - 4
  } else if (
    itemLeft + itemWidth + itemWidth >
    window.document.body.clientWidth
  ) {
    modalLeft = itemLeft - modalWidth + itemWidth + 4
  }

  const modalTop = itemTop - (modalHeight - itemHeight) / 2

  return {
    left: modalLeft,
    top: modalTop,
    width: modalWidth,
    height: modalHeight,
  }
}
