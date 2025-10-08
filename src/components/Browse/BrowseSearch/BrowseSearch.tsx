'use client'

import { useTanstackQuery } from '@/libs/tanstack/hooks'
import MediaSliderItem from '../BrowseMediaContainer/MediaSliderContainer/components/MediaSlider/components/MediaSliderItem'
import { useSearchItemSizeInfo } from './hooks'
import { QUERY_KEY_AI_SEARCH } from '@/libs/tanstack/queryKeys'
import { queryFunction } from '@/libs/tanstack/utils'
import { useMainStore } from '@/libs/stores/mainStoreProvider'
import { SearchResult } from '@/actions/action-ai-search'
import Spinner from '@/components/Spinner/Spinner'

export default function BrowseSearch() {
  const { itemSize, gapX } = useSearchItemSizeInfo()
  const { searchKey } = useMainStore((state) => state)

  const searchKeyLength = searchKey?.length || 0

  const { isLoading, data: searchResult } = useTanstackQuery<SearchResult>(
    [QUERY_KEY_AI_SEARCH, searchKey],
    async () => {
      const response = await queryFunction(
        'ai/search',
        [{ name: 'query', value: searchKey || '' }],
        'POST',
      )

      return await response?.json()
    },
    searchKeyLength > 1,
  )

  const medias = searchResult?.filteredMedias

  return (
    <div className="w-full px-3 py-2 md:px-8">
      {isLoading && (
        <div className="flex w-full items-center justify-center gap-2 py-12 text-xl">
          <div>asking Gemini AI...</div>
          <div>
            <Spinner display="inline" />
          </div>
        </div>
      )}

      {medias &&
        (medias.length > 0 ? (
          <>
            <div className="flex flex-col gap-1 pt-2 pb-6">
              <div>Results from Gemini</div>
              <div className="flex gap-1">
                <div className="text-xs text-gray-400">Titles: </div>
                <div className="text-xs text-gray-500">
                  {searchResult?.parsedFilters.titles?.join(', ')}
                </div>
              </div>
              <div className="flex gap-1">
                <div className="text-xs text-gray-400">Genres: </div>
                <div className="text-xs text-gray-500">
                  {searchResult?.parsedFilters.genres?.join(', ')}
                </div>
              </div>
              {(searchResult?.parsedFilters.casts?.length || 0) > 0 && (
                <div className="flex gap-1">
                  <div className="text-xs text-gray-400">Casts: </div>
                  <div className="text-xs text-gray-500">
                    {searchResult?.parsedFilters.casts?.join(', ')}
                  </div>
                </div>
              )}
              {(searchResult?.parsedFilters.impressions?.length || 0) > 0 && (
                <div className="flex gap-1">
                  <div className="text-xs text-gray-400">Impressions: </div>
                  <div className="text-xs text-gray-500">
                    {searchResult?.parsedFilters.impressions?.join(', ')}
                  </div>
                </div>
              )}
              {searchResult?.error && (
                <div className="flex gap-1">
                  <div className="text-xs text-gray-400">Error: </div>
                  <div className="text-xs text-gray-500">
                    {searchResult?.error}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center pt-6 pb-3 text-base text-gray-100">
                If there’s no database result based on Gemini’s response, show
                something else.
              </div>
            </div>
            <div
              className={`flex w-full flex-wrap gap-x-[${gapX}%] gap-y-[4vw]`}
            >
              {medias.map((mediaInfo) => (
                <MediaSliderItem
                  key={mediaInfo.id}
                  mediaInfo={mediaInfo}
                  itemSize={itemSize}
                  isSliding={false}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-gray-500">
            <div>No search results found.</div>
            <div>Please enter a different keyword.</div>
          </div>
        ))}

      {!medias && searchKeyLength < 2 && (
        <div className="flex h-[5rem] w-full flex-col items-center justify-center p-4 text-gray-500">
          The search keyword must be at least 2 characters long.
        </div>
      )}
    </div>
  )
}
