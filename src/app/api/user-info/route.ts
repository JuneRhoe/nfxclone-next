import { getUserInfo } from '@/actions/action-userinfo'

export async function GET() {
  const userInfo = await getUserInfo()

  return Response.json(userInfo)
}
