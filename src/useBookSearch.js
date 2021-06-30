import { useEffect, useState} from 'react'
import axios from 'axios'

const useBookSearch = (query, pageNumber) => {
    const url = `http://openlibrary.org/search.json?q=${query}&page=${pageNumber}`
    useEffect(() => {
        axios.get(url).then( res => {
            console.log(res.data)
        })
    }, [query, pageNumber])
    return null
}

export default useBookSearch
