import type { z, ZodTypeAny } from 'zod'

type VnetApiOptions<Schema extends ZodTypeAny> = {
  schema: Schema
  data?: Record<string, string | number | boolean | string[] | number[]>
}

export const api = async <Schema extends ZodTypeAny>(
  endpoint: `/${string}`,
  { schema, data = {} }: VnetApiOptions<Schema>,
) => {
  const baseUrl = 'https://vnet-api.pilot.gnosisguild.org'
  const url = new URL(endpoint, baseUrl)

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => url.searchParams.append(key, entry.toString()))
    } else {
      url.searchParams.set(key, value.toString())
    }
  })

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch VNet API: ${response.status}`)
  }

  const json = await response.json()
  return schema.parse(json) as z.infer<Schema>
}
