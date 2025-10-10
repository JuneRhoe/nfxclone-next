import BrowseSearch from '@/components/Browse/BrowseSearch/BrowseSearch'
import { DEFAULT_AI_MODEL } from '@/libs/ai/googleGemini'

export default function SearchPage() {
  const aiModel =
    process.env.NFX_CLONE_ENABLE_AI_SEARCH === '1'
      ? DEFAULT_AI_MODEL
      : 'AI is not currently being used in the search.'

  return <BrowseSearch aiModel={aiModel} />
}
