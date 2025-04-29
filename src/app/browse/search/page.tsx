import BrowseSearchServer from '@/components/Browse/BrowseSearch/BrowseSearchServer'

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <BrowseSearchServer searchParams={searchParams} />
}
