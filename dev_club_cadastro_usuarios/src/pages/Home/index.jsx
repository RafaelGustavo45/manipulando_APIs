import './style.css'
import Trash from '../../assets/lixeira.png'
import api from '../../services/api'
import { useEffect, useState , useRef} from 'react'


function Home() {

const [users, setUsers] = useState([]);

const inputName = useRef();
const inputAge = useRef();
const inputEmail = useRef();

  async function getUsers(){
      const usersFromApi = await api.get('/usuarios')

      setUsers(usersFromApi.data);
      console.log(users);
     
  }

  async function createUsers(){
    //console.log(inputName.current.value);
     await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
     })

     getUsers();
  }

  async function deleteUsers(id){
      await api.delete(`/usuarios/${id}`);
      getUsers();
  }

  useEffect(() => {
    getUsers()
  }, [])

  /*const users = [{
    id: '2585ujh',
    name: 'Rodoldo',
    age: 25,
    email: 'cod@devclub.com'
  },
  {
    id: '8345hd',
    name: 'Renato',
    age: 28,
    email: 'coder@devclub.com'
  }
] */

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name="nome" type="text" placeholder="Nome" ref={inputName}/> 
        <input name="idade" type="number" placeholder="Idade" ref={inputAge}/>
        <input name="email" type="email" placeholder="E-mail" ref={inputEmail}/>
        <button type="button" onClick={createUsers} >Cadastrar</button>
      </form>
    {users.map(user => (
       <div key={user.id} className="card">
        <div>
          <p> Nome: <span>{user.name} </span></p>
          <p> Idade: <span>{user.age} </span></p>
          <p> E-mail: <span>{user.email} </span> </p>
        </div>
        <button onClick = { () => deleteUsers(user.id)}>
          <img src={Trash} alt="Lixeira" width="15" height="15" />
        </button>
        
      </div>
      


     ))}
      

    </div>
  )
}

export default Home