import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Link from './Link'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  characters: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    gridGap: '5rem',
    gap: '5rem',
  },
})

const CharacterCard = ({ characters, currPage }) => {
  const router = useRouter()
  const [data, setData] = useState()
  const classes = useStyles()

  useEffect(() => {
    if (characters) {
      console.log(characters)
      setData((prevState) => {
        if (prevState) {
          return {
            info: characters.info,
            results: prevState.results.concat(characters.results),
          }
        } else {
          return characters
        }
      })
    }
  }, [characters, currPage])

  const loadMore = (e) => {
    if (currPage < characters.info.pages) {
      // Trigger fetch
      const query = router.query
      query.page = parseInt(currPage) + 1
      router.push({
        pathname: router.pathname,
        query: query,
      })
    }
  }

  return (
    <>
      <div className={classes.characters}>
        {data &&
          data.results.map((item, index) => {
            return (
              <Card key={index} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="140"
                    image={item.image}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    href="/character/[id]"
                    as={`/character/${item.id}`}
                    size="small"
                    component={Link}
                    color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            )
          })}
      </div>
      <Box>
        <Button onClick={(e) => loadMore()} variant="contained">
          Load More...
        </Button>
      </Box>
    </>
  )
}

export default CharacterCard
