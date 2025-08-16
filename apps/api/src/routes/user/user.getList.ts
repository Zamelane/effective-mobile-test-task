import { db } from '@effective-mobile-tt/db/src'
import { BadRequestError } from '@effective-mobile-tt/shared/src'
import express from 'express'

export const userGetListRoute = express
  .Router()
  .get('/usersList/:page', async (req, res) => {
    const page = parseInt(req.params.page)

    const pageSizeParam = req.query.pageSize
    const pageSize =
      typeof pageSizeParam === 'string' ? parseInt(pageSizeParam) : undefined

    if (isNaN(page) || page <= 0) {
      throw new BadRequestError('Invalid page number')
    }

    const list = await db.user.list(page, pageSize)

    res.json({
      data: list,
      page: page,
      pageSize: pageSize,
    })
  })
