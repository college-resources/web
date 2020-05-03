import { dynamicSort, dynamicSortMultiple } from './sorting'

describe('sorting', () => {
  it('sorts an array of objects by a property', () => {
    const data = [
      {
        _id: 1,
        name: 'it'
      },
      {
        _id: 3,
        name: 'el'
      },
      {
        _id: 2,
        name: 've'
      }
    ]

    const expectedResult = [
      {
        _id: 3,
        name: 'el'
      },
      {
        _id: 1,
        name: 'it'
      },
      {
        _id: 2,
        name: 've'
      }
    ]
    expect(data.sort(dynamicSort('name'))).toEqual(expectedResult)
  })

  it('sorts an array of objects by multiple properties', () => {
    const data = [
      {
        _id: 1,
        name: 'lesson1',
        semester: 1
      },
      {
        _id: 3,
        name: 'lesson2',
        semester: 8
      },
      {
        _id: 4,
        name: 'lesson4',
        semester: 4
      },
      {
        _id: 2,
        name: 'lesson3',
        semester: 4
      }
    ]

    const expectedResult = [
      {
        _id: 1,
        name: 'lesson1',
        semester: 1
      },
      {
        _id: 2,
        name: 'lesson3',
        semester: 4
      },
      {
        _id: 4,
        name: 'lesson4',
        semester: 4
      },
      {
        _id: 3,
        name: 'lesson2',
        semester: 8
      }
    ]

    expect(data.sort(dynamicSortMultiple('semester', 'name'))).toEqual(expectedResult)
  })
})
