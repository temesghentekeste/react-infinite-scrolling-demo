import { useState } from 'react'
import useBookSearch from './useBookSearch'

function App() {

  const [query, setQuery ] = useState('')
  const [pageNumber, setSetPageNumber ] = useState(1)

  const handleSearch = e => {
    setQuery(e.target.value)
    setSetPageNumber( 1 )
  }

  const {books, hasMore, loading, error} = useBookSearch( query, pageNumber)
  return (
    <div>
     <input type="text" onChange={handleSearch} />
     {
       books.map( b => <div key={b}>{b}</div>)
     }
     {loading && <div>Loading...</div>}
     { error && <div>Error</div>}
    </div>
  );
}

export default App;
