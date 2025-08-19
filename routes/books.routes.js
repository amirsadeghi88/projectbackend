const prisma = require('../db')

const router = require('express').Router()

// Starting /api/books
router.get('/', async (req, res, next) => {
  try {
    const allBooks = await prisma.book.findMany({
      include: { author: true },
      omit: { authorId: true },
    })
    res.json(allBooks)
  } catch (error) {
    next(error)
  }
})

router.get('/:bookId', async (req, res, next) => {
  try {
    const oneBook = await prisma.book.findUnique({
      where: { id: req.params.bookId },
      include: { author: true },
      omit: { authorId: true },
    })
    res.json(oneBook)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const newBookData = req.body

  try {
    const newBook = await prisma.book.create({ data: newBookData })
    res.status(201).json(newBook)
  } catch (error) {
    next(error)
  }
})

router.put('/:bookId', async (req, res, next) => {
  const bookData = req.body

  try {
    const updatedBook = await prisma.book.update({
      where: { id: req.params.bookId },
      data: bookData,
    })
    res.status(202).json(updatedBook)
  } catch (error) {
    next(error)
  }
})

router.delete('/:bookId', async (req, res, next) => {
  try {
    await prisma.book.delete({ where: { id: req.params.bookId } })
    res.status(204).json()
  } catch (error) {
    next(error)
  }
})

module.exports = router
