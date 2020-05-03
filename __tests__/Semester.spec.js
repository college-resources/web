import Semester from '../components/Semester'
import renderer from 'react-test-renderer'

describe('App', () => {
  const data = [
    {
      _id: 1,
      lessonCode: 1,
      name: 'lesson1',
      semester: 1,
      type: 'E',
      hoursTheory: 4,
      hoursLab: 2,
      credit: 6
    },
    {
      _id: 2,
      lessonCode: 2,
      name: 'lesson2',
      semester: 1,
      type: 'E',
      hoursTheory: 4,
      hoursLab: 2,
      credit: 6
    }
  ]

  it('renders', () => {
    const component = renderer.create(<Semester rows={data} semester={1} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  // it('fetches async data', () => {
  //   const promise = new Promise((resolve, reject) =>
  //     setTimeout(
  //       () =>
  //         resolve({
  //           data: {
  //             lessons: [
  //               {
  //                 _id: 1,
  //                 lessonCode: 1,
  //                 name: 'lesson1',
  //                 semester: 1,
  //                 type: 'E',
  //                 hoursTheory: 4,
  //                 hoursLab: 2,
  //                 credit: 6
  //               }
  //             ]
  //           }
  //         }),
  //       100
  //     )
  //   )
  //
  //   promise.then(() => {
  //     const wrapper = mount(<Semester rows={this.data} semester={1} />)
  //
  //     expect(wrapper.find('tbody').find('tr').length).toEqual(2)
  //   })
  // })
})
