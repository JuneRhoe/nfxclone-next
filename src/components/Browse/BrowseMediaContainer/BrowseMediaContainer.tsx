'use client'

import { MediaBrowseDisplaySelect } from '@/drizzle-definitions/data-types'

interface Props {
  displayInfo: Pick<MediaBrowseDisplaySelect, 'mainCategory'>[]
}

export default function BrowseMediaContainer({ displayInfo }: Props) {
  console.log('-------displayInfo------', displayInfo)

  return (
    // <div className="absolute top-[25%] z-3">
    <div className="relative z-4 mt-[calc(45%-3rem)] sm:mt-[calc(40%-3rem)]">
      BrowseMediaContainer
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      BrowseMediaContainer
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      BrowseMediaContainer
    </div>
  )
}
