export default async function BrowseCategory({
  params,
}: {
  params: Promise<{ mainCategory: string }>
}) {
  const { mainCategory } = await params

  return <div>Browse Category {mainCategory}</div>
}
