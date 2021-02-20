import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    padding: '1rem',
  },
  character: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    border: '1px solid lightgrey',
    boxShadow: '1px 1px 10px #cccccc',
    background: 'linear-gradient(45deg, #c9c9c9, transparent)',
  },
  img: {
    marginBottom: '1rem',
  },
})

export default function CharacterDetail({ character }) {
  const classes = useStyles()
  debugger
  return (
    <div className={classes.container}>
      <div className={classes.character}>
        <CardMedia
          component="img"
          alt={character.name}
          height="140"
          image={character.image}
          title={character.name}
        />
        <div>
          <div>
            <h1>{character.name}</h1>
            <p>
              {character.status} - {character.species}
            </p>
          </div>

          <div>
            <h2>Last Known Location:</h2>
            <p>{character.location.name}</p>
          </div>

          <div>
            <h2>First seen in: </h2>
            <p>{character.origin.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const id = query.id

  const res = await fetch(`http://localhost:3000/api/character/${id}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { character: data.data }, // will be passed to the page component as props
  }
}

// export const getStaticPaths = async (id) => {
//   const res = await fetch('http://localhost:3000/api/characters')
//   const data = await res.json()

//   const paths = data.data.results.slice(0, 19).map((item) => {
//     return { params: { id: item.id.toString() } }
//   })

//   return {
//     fallback: true,
//     paths,
//   }
// }
