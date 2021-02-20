import axios from 'axios'

export default async (req, res) => {
  const currPage = req.query.page || 1
  const perPage = 20

  let url = 'https://rickandmortyapi.com/api/character'

  if (currPage !== 1) {
    url = `https://rickandmortyapi.com/api/character?page=${currPage}`
  }

  // // Limit users to return per page
  // const getRefinedChars = (limit, data) => {
  //   debugger
  //   const refinedChars = []
  //   for (let i = 0; i < limit; i++) {
  //     refinedChars.push(data.results[i])
  //   }
  //   return { info: data.info, results: refinedChars }
  // }

  await axios
    .get(url)
    .then(({ data }) => {
      // const refinedChars = getRefinedChars(perPage * currPage, data)
      res.status(200).json({ data: data, currPage: currPage })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}
