import { prisma } from '@/libs/prisma/prisma-db'

const tmpData = [
  {
    tmpName: '4_tmpname',
  },
  {
    tmpName: '5_tmpname',
  },
]

export async function main() {
  for (const tmp of tmpData) {
    await prisma.tmps.create({ data: tmp })
  }
}

main()
