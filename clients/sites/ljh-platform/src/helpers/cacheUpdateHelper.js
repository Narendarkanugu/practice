import { get, set, uniqBy, isEmpty } from 'lodash'

const appendById = (arr, obj, identityCheck = o => o.id) =>
  uniqBy([...arr, obj], identityCheck)

const getQueryName = query => get(query, 'definitions[0].name.value')

const getCachedData = (client, query, variables, defaultRes = {}) => {
  try {
    return client.readQuery({
      query,
      variables,
    })
  } catch (e) {
    console.warn(
      '[GQL Cache] Failed to read query',
      getQueryName(query),
      'due to',
      e,
    )
  }

  return defaultRes
}

const saveDataToCache = (client, query, variables, data) => {
  try {
    client.writeQuery({
      query,
      variables,
      data,
    })
  } catch (e) {
    console.warn(
      '[GQL Cache] Failed to write query',
      getQueryName(query),
      'due to',
      e,
    )
  }
}

// user-defined cache updates - allows any changes to be performed
// modifierFunc receives the existing query data and the mutation result and should mutate the query data
// NOTE: if you pass runIfEmpty=true you need to handle missing/empty data in your modifierFunc
export const cacheModificationHelper = (
  query,
  variables,
  modifierFunc,
  runIfEmpty = false,
) => (client, result) => {
  let data = getCachedData(client, query, variables)
  if (runIfEmpty || !isEmpty(data)) {
    modifierFunc(data, result)
    saveDataToCache(client, query, variables, data)
  }
}

// the standard use case: copy data from mutation A to query B
// has some special cases for 'list' queries
const cacheUpdateHelper = (query, variables, resultName, targetName) =>
  cacheModificationHelper(query, variables, (data, result) => {
    const newValue = get(result, `data.${resultName}`)

    const targetData = get(data, targetName)
    const items = get(targetData, 'items')

    // detect array-like structures in the gql result so we insert/update the item appropriately
    if (items && Array.isArray(items)) {
      set(targetData, 'items', appendById(items, newValue))
    } else if (Array.isArray(targetData) && !Array.isArray(newValue)) {
      set(data, targetName, appendById(targetData, newValue))
    } else {
      // if not an array, just update the value
      set(data, targetName, newValue)
    }
  })

export default cacheUpdateHelper
