const categoryImageModules = import.meta.glob(
  '../assets/images/categories/*/*.png',
  {
    eager: true,
    import: 'default',
  },
)

export const categoryFolderBySlug = {
  'ahsap-dograma-kapi-modelleri': 'ahsap',
  'amerikan-panel-kapi-modelleri': 'amerikan-panel',
  'lake-kapi-modelleri': 'lake',
  'melamin-kapi-modelleri': 'melamin',
  'pvc-kapi-modelleri': 'pvc',
}

function getFileName(path) {
  return path.split('/').pop() ?? ''
}

function getModelNumber(fileName) {
  return Number.parseInt(fileName.replace(/\.png$/i, ''), 10)
}

function compareImagesByFileName(a, b) {
  const aNumber = getModelNumber(a.fileName)
  const bNumber = getModelNumber(b.fileName)

  if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
    return a.fileName.localeCompare(b.fileName, 'tr', { numeric: true })
  }

  return aNumber - bNumber
}

export function getCategoryImages(slug) {
  const folder = categoryFolderBySlug[slug]

  if (!folder) return []

  const folderPrefix = `../assets/images/categories/${folder}/`

  return Object.entries(categoryImageModules)
    .filter(([path]) => path.startsWith(folderPrefix))
    .map(([path, src]) => {
      const fileName = getFileName(path)

      return {
        src,
        path,
        fileName,
        number: getModelNumber(fileName),
      }
    })
    .sort(compareImagesByFileName)
}

export function getCategoryImageCount(slug) {
  return getCategoryImages(slug).length
}
