'use client'

import { getUserInfo } from '@/actions/action-userinfo'
// import { useEffect } from 'react'

export default function Browse() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userInfo = await (
  //       await fetch('http://localhost:3333/browse/api')
  //     ).json()

  //     console.log('-----userInfo-----', userInfo)
  //   }

  //   fetchData()
  // }, [])

  return (
    <div>
      Browse
      <br />
      <br />
      <br />
      <button
        onClick={async () => {
          const userInfo = await getUserInfo()
          console.log('---------userinfo--------', userInfo)
        }}
      >
        GetUser
      </button>
    </div>
  )
}
