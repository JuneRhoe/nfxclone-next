'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PATH_BROWSE } from '@/libs/definition-route'
import { getAssetPath } from '@/libs/utils-asset'
import Button from '@/components/UI/Button/Button'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="relative flex h-[100vh] w-full items-center justify-center text-white">
      <Image
        className="absolute h-full w-full object-cover"
        src={getAssetPath('/bg-notFound.webp')}
        placeholder="blur"
        blurDataURL={getAssetPath('/bg-notFound-blur.webp')}
        width="1260"
        height="682"
        priority
        alt="Background Guest Home"
      />
      <div className="absolute top-0 left-0 z-1 flex h-[4rem] w-full items-center bg-black px-6">
        <Link href={PATH_BROWSE} className="w-[2.5rem] sm:w-[4rem] md:w-[5rem]">
          <Image
            src={getAssetPath('/logo.webp')}
            width="123"
            height="70"
            alt="Netflix Clone Logo"
          />
        </Link>
      </div>
      <div className="relative z-2 flex flex-col items-center gap-6 text-4xl font-extrabold">
        <div>Lost your Way?</div>
        <Button
          size="small"
          buttonMode="third"
          onClick={() => router.push(PATH_BROWSE)}
        >
          <span className="w-[8rem]">Netflix Clone Home</span>
        </Button>
      </div>
    </div>
  )
}
