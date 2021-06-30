import { useState } from 'react'
import useBookSearch from './useBookSearch'

function App() {

  const [query, setQuery ] = useState('')
  const [pageNumber, setSetPageNumber ] = useState(1)

  const handleSearch = e => {
    setQuery(e.target.value)
    setSetPageNumber( 1 )
  }

  useBookSearch( query, pageNumber)
  return (
    <div>
     <input type="text" onChange={handleSearch} />
     <div>Title</div>
     <div>Title</div>
     <div>Title</div>
     <div>Title</div>
     <div>Loading...</div>
     <div>Error</div>
    </div>
  );
}

export default App;
