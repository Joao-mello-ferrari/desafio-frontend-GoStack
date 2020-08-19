import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    const fetchRepos = async function(){
      const fetchedRepositories = await api.get('/repositories')
      setRepositories(fetchedRepositories.data)
    }

    fetchRepos()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {title: "Teste", url: "https://testhost", techs: ["React", "Angular"]})    
    const newRepository = response.data
    
    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    
    let newRepositories = Object.assign([], repositories)
    newRepositories = newRepositories.filter(repo=>repo.id !== id)

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(({id, title})=>{
          return (  
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>Remover</button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
