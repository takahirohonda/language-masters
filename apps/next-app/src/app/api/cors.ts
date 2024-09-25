import { type NextApiRequest, type NextApiResponse } from 'next'

// not in use...
export const cors = (req: NextApiRequest, res: NextApiResponse, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Preflight response for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  next()
}
