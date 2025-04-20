import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(keyword)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite o produto..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  )
}

export default SearchBar