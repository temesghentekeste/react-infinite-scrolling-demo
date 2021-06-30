import { useState, useRef, useCallback } from 'react'
import useBookSearch from './useBookSearch'

function App() {

  const [query, setQuery ] = useState('')
  const [pageNumber, setSetPageNumber ] = useState(1)
  const {books, hasMore, loading, error} = useBookSearch( query, pageNumber)
  
  const observer = useRef();
  const lastBookElementRef = useCallback( node => {
    if( loading ) return

    if( observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver( entries => {
      if( entries[0].isIntersecting && hasMore) {
        setSetPageNumber( prevPageNumber => prevPageNumber + 1)
        console.log('Visible')
      }
    })

    if( node ) observer.current.observe( node )
  }, [loading, hasMore]);

  const handleSearch = e => {
    setQuery(e.target.value)
    setSetPageNumber( 1 )
  }

  return (
    <div>
     <input type="text" value={query} onChange={handleSearch} />
     {
       books.map( (b, index) => {
         if( books.length === index + 1 ) {
           return <div ref={lastBookElementRef} key={b}>{b}</div>
          } else {
           return <div key={b}>{b}</div>
         }
       })
     }
     {loading && <div>Loading...</div>}
     { error && <div>Error</div>}
    </div>
  );
}

export default App;
