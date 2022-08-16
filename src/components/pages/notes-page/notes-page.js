import { useState, useEffect, useContext } from "react"
import AuthContext from "../../../red/auth-context"

const NotesPage = (props) => {
    const {notes, getDjangoNotes} = props
    // let [notes, setNotes] = useState([])

    // let {authTokens} = useContext(AuthContext)
    useEffect(() => {
        getDjangoNotes()
    }, [])
    
    
    return(
        <>
            <h3>Notes page</h3>
            <ul>
                {notes.map(note => {
                    return (
                        <li key={note.id}>{note.name}
                            <p>{note.body}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


export default NotesPage