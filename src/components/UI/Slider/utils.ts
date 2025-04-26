export interface TouchPos {
  clientX: number
  clientY: number
}

export function rotateArray<TData>(
  items: TData[],
  rotateSteps: number,
): TData[] {
  const rotatedItems = [...items]
  const itemLength = rotatedItems.length

  const normalizedSteps = rotateSteps % itemLength

  const reverse = (start: number, end: number): void => {
    for (; start < end; ++start, --end) {
      const temp = rotatedItems[start]
      rotatedItems[start] = rotatedItems[end]
      rotatedItems[end] = temp
    }
  }

  if (normalizedSteps > 0) {
    reverse(0, itemLength - 1)
    reverse(0, normalizedSteps - 1)
    reverse(normalizedSteps, itemLength - 1)
  } else {
    reverse(0, -normalizedSteps - 1)
    reverse(-normalizedSteps, itemLength - 1)
    reverse(0, itemLength - 1)
  }

  return rotatedItems
}
