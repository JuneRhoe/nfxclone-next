export function getAssetPath(subPath: string): string {
  return `${process.env.NEXT_PUBLIC_ASSETS_URL}${subPath}`
}
