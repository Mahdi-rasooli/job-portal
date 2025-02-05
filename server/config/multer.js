import multer from 'multer'

// Using multer for storing form data that we recieve from companies

const storage = multer.diskStorage({})

const upload = multer({storage})

export default upload