import { useReducer } from "react"
import axios from 'axios'
import { FirebaseContext } from "./firebaseContext"
import { firebaseReducer } from "./firebaseReducer"
import { FIREBASE_API } from "../../helpers/constant"
import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from "../types"

export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON()
        }
        try {
            const res = await axios.post(`${FIREBASE_API}/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }

            dispatch({ type: ADD_NOTE, payload })

        } catch (e) {
            throw new Error(e.message)
        }
        
        fetchNotes()
    }

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${FIREBASE_API}/notes.json`)
        if(!res.data) {
            res.data = {}
        }

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        dispatch({ type: FETCH_NOTES, payload })
        
    }



    const removeNote = async id => {
        await axios.delete(`${FIREBASE_API}/notes/${id}.json`)

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            loading: state.loading,
            notes: state.notes,
            showLoader,
            addNote,
            removeNote,
            fetchNotes

        }}>
            {children}
        </FirebaseContext.Provider>
    )
}