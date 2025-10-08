const API_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/`

type METHOD_TYPE = 'GET' | 'POST'

interface SearchParamInfo {
  name: string
  value: string
}

export async function queryFunction(
  endPoint: string,
  paramInfos: SearchParamInfo[] = [],
  method: METHOD_TYPE = 'GET',
  isExternal: boolean = false,
): Promise<Response | null> {
  const url = new URL(isExternal ? endPoint : `${API_URL}${endPoint}`)

  let response: Response | null = null

  if (method === 'GET') {
    for (const paramInfo of paramInfos) {
      url.searchParams.append(paramInfo.name, paramInfo.value)
    }

    try {
      response = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    const bodyData = paramInfos.reduce<Record<string, string>>(
      (acc, { name, value }) => {
        acc[name] = value
        return acc
      },
      {},
    )

    try {
      response = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(bodyData),
      })
    } catch (e) {
      console.error(e)
    }
  }

  return response
}

export async function mutationFunction<TData>(
  endPoint: string,
  newData: TData,
  method: 'POST' | 'PUT',
): Promise<Response | null> {
  let response: Response | null = null

  try {
    response = await fetch(`${API_URL}${endPoint}`, {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newData),
    })
  } catch (e) {
    console.error(e)
  }

  return response
}
