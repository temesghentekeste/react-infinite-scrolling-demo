import { useEffect, useState} from 'react'
import axios from 'axios'

const useBookSearch = (query, pageNumber) => {
    const url = `http://openlibrary.org/search.json?q=${query}&page=${pageNumber}`
    useEffect(() => {
        let cancel;
        const  params = { q: query, page: pageNumber}
        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
           params,
            cancelToken: new axios.CancelToken( c => cancel = c)
        }).then( res => {
            console.log(res.data)
        })

        return () => cancel()
    }, [query, pageNumber])
    return null
}

export default useBookSearch
