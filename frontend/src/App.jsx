import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async (keyword) => {
    if (!keyword.trim()) {
      setError('Por favor, digite um termo de busca')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
      )
      
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status}`)
      }
      
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
      setError(`Falha ao buscar produtos: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1>Amazon Product Scraper</h1>
      
      <SearchBar onSearch={fetchProducts} />
      
      {loading && <div className="loading">Carregando...</div>}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          !loading && !error && (
            <div className="no-results">
              Nenhum produto encontrado. Tente outro termo de busca.
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default App