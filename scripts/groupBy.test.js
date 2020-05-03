import groupBy from './groupBy'

describe('groupBy', () => {
  const items = [
    {
      _id: 1,
      lessonCode: 1,
      name: 'lesson1',
      semester: 1,
      type: 'E'
    },
    {
      _id: 2,
      lessonCode: 2,
      name: 'lesson2',
      semester: 2,
      type: 'E'
    },
    {
      _id: 3,
      lessonCode: 3,
      name: 'lesson3',
      semester: 2,
      type: 'E'
    }
  ]

  const key = 'semester'

  const expectedData = [
    undefined, // TODO change groupBy script
    [
      {
        _id: 1,
        lessonCode: 1,
        name: 'lesson1',
        semester: 1,
        type: 'E'
      }
    ],
    [
      {
        _id: 2,
        lessonCode: 2,
        name: 'lesson2',
        semester: 2,
        type: 'E'
      },
      {
        _id: 3,
        lessonCode: 3,
        name: 'lesson3',
        semester: 2,
        type: 'E'
      }
    ]
  ]

  it('groups an array by a key', () => {
    const result = groupBy(items, key)
    expect(result).toEqual(expectedData)
  })
})
