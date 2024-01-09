type ObjectWithId = {
  id: number,
  [otherOptions: string]: unknown
}

export const compareArraysByObjId = (arr1: ObjectWithId[], arr2: ObjectWithId[]): boolean => {
  return (
    arr1.length === arr2.length &&
    arr1.every((element1) => arr2.some((element2) => element1.id === element2.id))
  )
}
