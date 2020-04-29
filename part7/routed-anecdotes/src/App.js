import React, { useState } from 'react'
import { 
  Switch, 
  Route, 
  Link,
  useHistory,
  useParams,
  useRouteMatch 
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    has {anecdote.votes} votes<br /><br />
    for more info see <a href={anecdote.info}>{anecdote.info}</a><br /><br />
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({addNew}) => {
  const history = useHistory()
  const contentHook = useField('text')
  const authorHook = useField('text')
  const infoHook = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = contentHook.value
    const author = authorHook.value
    const info = infoHook.value

    addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push("/")
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} >
        <div>
          content
          <input {...contentHook} />
        </div>
        <div>
          author
          <input {...authorHook} />
        </div>
        <div>
          url for more info
          <input {...infoHook} />
        </div>
        <button>Create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(()=> setNotification(null), 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
  ? anecdotes.find(anecdote => anecdote.id === match.params.id) 
  : null

  return (
    <div>
    <h1>Software anecdotes</h1>
    <Menu />
    {notification}
    <Switch>
      <Route path="/anecdotes/:id">
        <Anecdote anecdote={anecdote} />
      </Route>
      <Route path="/create">
        <CreateNew addNew={addNew} />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
    </Switch>
  
    <Footer />
  </div>
  )
}

export default App;