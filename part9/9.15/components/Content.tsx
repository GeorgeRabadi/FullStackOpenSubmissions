import CoursePart from '../types'
import Part from './Part'

const Content = ({part}: {part: CoursePart}) =>
{
    return(
      <>
        <p>
        {part.name} {part.exerciseCount}
        <br />
        </p>
        <Part part = {part} />
      </>
    )
}

export default Content