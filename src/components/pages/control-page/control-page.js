

const ControlPage = ({allComputerList}) =>  {

    console.log(allComputerList)
    const elems = allComputerList.map(el => {
      return(
        <li style={{'listStyleType': 'none'}} key={el.id}>
          <p>{el.name}</p>
          {el.comment?<a href={el.comment}>Перейти</a>:null}
          <hr />
        </li>
      )
    })

    return (
      <div>
        <h1> Удаленное управление</h1>
        <ul>
          {elems}
        </ul>
      </div>

    )
}

export default ControlPage