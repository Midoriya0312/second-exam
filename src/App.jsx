import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then(
        (res) => {
          setLoaded(true)
          setItems(res)
        },
        (error) => {
          setLoaded(false)
          setError(error)
        }
      )
  }, [])

  if(error) {
    return <>{error.massage}</>
  } else if(!setLoaded) {
    return <>...Loading</>
  } else{
    return (
      <div className='wrapper'>
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="sr-only">Search  here</span>
          </label>
        </div>
        <ul className="list">
              {items.filter((item) => {
                return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search)
              }).map((item) => (
                <li>
                <article className="card" key={item.id}>
                  <div className="card-image">
                    <img src={item.images} alt="img" />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.title}</h2>
                      <ol className="card-list">
                        <li>
                          price:{" "}
                          <span>{item.price}$</span>
                        </li>
                        <li>
                          desc: <span>{item.description}</span>
                         </li>
                      </ol>
                  </div>
                </article>
              </li>
                    ))}
                </ul>
      </div>
    )
  }
}

export default App
