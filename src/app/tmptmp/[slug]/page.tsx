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
      <div>TMPTMP slug - ({slug})</div>
      <div>
        <div>TMPTMP</div>
        <div>value TMPTMP</div>
      </div>
    </div>
  )
}
