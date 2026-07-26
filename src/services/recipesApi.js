const API_BASE_URL = '/api/recipes'

async function request(path, message) {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) throw new Error(message)
  return response.json()
}

export async function getRecipes() {
  const data = await request('.json', 'Unable to load recipes. Please try again.')
  return data.recipes ?? []
}

export async function getRecipe(id) {
  const data = await request(
    `/${encodeURIComponent(id)}.json`,
    'Unable to load this recipe. Please try again.'
  )
  return data.recipe ?? null
}
