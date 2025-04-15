export const dynamic = 'force-dynamic'

import clsx from 'clsx'
import styles from './page.module.scss'

export function generateStaticParams() {
  console.log('--gene----')
  return [{ slug: '1' }, { slug: '2' }, { slug: '3' }]
}

export default async function Tmp({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <div>TMP slug - ({slug})</div>
      <div
        className={clsx(
          styles.TestClass,
          'flex items-center justify-center text-gray-400',
        )}
      >
        <div>Test</div>
        <div>value tmp</div>
      </div>
    </div>
  )
}
