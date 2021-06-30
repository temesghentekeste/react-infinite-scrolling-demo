import { useEffect, useState} from 'react'
import axios from 'axios'

const useBookSearch = (query, pageNumber) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [query])

    const url = `http://openlibrary.org/search.json?q=${query}&page=${pageNumber}`
    useEffect(() => {
        setLoading(true)
        setError(false)

        let cancel;
        const  params = { q: query, page: pageNumber}
        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
           params,
            cancelToken: new axios.CancelToken( c => cancel = c)
        }).then( res => {
            setBooks( prevBooks => {
                return [...new Set([...prevBooks, ...res.data.docs.map( b => b.title)])]
            })
            setHasMore( res.data.docs.length > 0)
            setLoading(false)
            console.log(res.data)
        }).catch( e => {
            if(axios.isCancel(e) ) return
            setError(true)
        })

        return () => cancel()
    }, [query, pageNumber])
    return {
        loading,
        error,
        hasMore,
        books
    }
}

export default useBookSearch
