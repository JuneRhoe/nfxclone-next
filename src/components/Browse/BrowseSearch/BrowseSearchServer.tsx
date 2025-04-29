import { searchMedias } from '@/actions/action-search-medias'
import BrowseSearch from './BrowseSearch'

export default async function BrowseSearchServer({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryKey = (await searchParams).k as string

  const medias = queryKey?.length < 2 ? null : await searchMedias(queryKey)

  return <BrowseSearch queryKey={queryKey} medias={medias} />
}
