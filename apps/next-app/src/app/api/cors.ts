import { type NextApiRequest, type NextApiResponse } from 'next'

// In the old handler way, we can wrap the handler function with this. But, better to add headers
// in next.config.js
export const cors = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
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
