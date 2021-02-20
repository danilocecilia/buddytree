import axios from 'axios'

export default async (req, res) => {
  const {
    query: { id },
  } = req

  const url = `https://rickandmortyapi.com/api/character/${id}`

  await axios
    .get(url)
    .then(({ data }) => {
      debugger
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}
