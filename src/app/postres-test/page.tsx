'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { TMP_TABLE } from '@/libs/dataDefinitions'
import styles from './page.module.scss'
import { QueryTest } from '@/actions/action-test'
import Button from '@/components/UI/Button/Button'
import Link from 'next/link'
import { getAssetPath } from '@/libs/assetUtils'

export default function Test() {
  const [tmpTables, setTmpTables] = useState<TMP_TABLE[]>([])

  return (
    <div>
      <div className="flex h-36 w-full justify-center bg-black text-[1rem] text-white">
        Ready to watch? Enter your email to create or restart your membership.
        <Button variant="contained" size="medium" LinkComponent={Link} href="/">
          Home
        </Button>
      </div>

      <br />
      <br />

      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          const data = await QueryTest()
          setTmpTables(data)
        }}
      >
        Query
      </Button>

      <div>
        {tmpTables.map(({ id, tmpName }) => (
          <div key={id}>{tmpName}</div>
        ))}
      </div>

      <div>
        <Image
          src={getAssetPath('/home/bg-home.webp')}
          placeholder="blur"
          blurDataURL={getAssetPath('/home/bg-home-blur.webp')}
          width="2000"
          height="1125"
          alt="Background Home"
        />
      </div>
      <div
        className={clsx(
          styles.TestClass,
          'flex w-fit items-center justify-center gap-5',
        )}
      >
        <div>Test Test Test value---- 12 3 3445 </div>
        <div>value----</div>
      </div>
      <Image
        src={getAssetPath('/logo.webp')}
        width="123"
        height="70"
        alt="Title Img"
      />
      <Image
        src={getAssetPath('/browse/media-preview/preview-title-36.webp')}
        width="123"
        height="70"
        alt="Title Img"
      />
      <Image
        src={getAssetPath('/bg-notFound.webp')}
        placeholder="blur"
        blurDataURL={getAssetPath('/bg-notFound-blur.webp')}
        width="1260"
        height="682"
        alt="Title Img"
      />
    </div>
  )
}
