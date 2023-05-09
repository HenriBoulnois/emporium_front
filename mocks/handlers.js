import { rest } from 'msw'

export const handlers = [
    rest.get('/oeuvres/fav/', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                nbFav: 20
            })
        )
    })
]
