import MyInfo from '@/components/MyInfo/MyInfo'

export default function BrowseAbout() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start py-4">
      <div className="relative w-full px-3 md:px-8">
        <div className="flex flex-col gap-1">
          <MyInfo />

          <div className="pt-10 text-lg font-extrabold md:text-2xl">
            Technologies used to build Netflix Clone
          </div>
          <div>
            <div className="pt-4 pb-1 text-base md:text-xl">Frontend</div>
            <div className="flex flex-col text-gray-400">
              <div>NextJS</div>
              <div>React • Typescript</div>
              <div>Drizzle ORM</div>
              <div>Tanstack Query (React Query)</div>
              <div>Zustand</div>
              <div>Tailwind CSS</div>
              <div>Material UI</div>
              <div>Turbopack</div>
            </div>
          </div>
          <div>
            <div className="pt-4 pb-1 text-base md:text-xl">Backend</div>
            <div className="flex flex-col text-gray-400">
              <div>NextJS</div>
              <div>Postgre (Supabase)</div>
            </div>
          </div>
          <div>
            <div className="pt-4 pb-1 text-base md:text-xl">Deployment</div>
            <div className="flex flex-col text-gray-400">
              <div>Vercel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
