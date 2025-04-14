import { MetadataRoute } from 'next'

export async function generateSitemaps() {
  // Fetch the total number of browse main categories and calculate the number of sitemaps needed
  // sitemap id name should be 'id'
  return [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }]
}

export default async function sitemap({
  id,
}: {
  id: string
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  // const start = id * 50000
  // const end = start + 50000
  // const products = await getProducts(
  //   `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`,
  // )

  // return products.map((product) => ({
  //   url: `https://${process.env.NFXCLONE_DOMAIN}/browse/${product.id}`,
  //   lastModified: product.date,
  // }))

  return [
    {
      url: `https://${process.env.NFXCLONE_DOMAIN}/browse/${id}`,
      lastModified: new Date(),
    },
  ]
}
