# Making API Tips

## file name.

It seems to only work with route.ts.

https://nextjs.org/docs/app/api-reference/file-conventions/route

## Response

Use `NextResponse`: https://nextjs.org/docs/app/api-reference/functions/next-response

## Handle different HTTP methods

// Wrong way: default export
export default function handler(req, res) {
// Your logic here
}

```ts
// Wrong way: default export
export default function handler(req, res) {
  // Your logic here
}

// correct way
export async function POST(request: Request) {
  // Handle POST request
  const data = await request.json()
  return new Response(JSON.stringify({ message: 'POST request received', data }), {
    status: 200,
  })
}

export async function GET(request: Request) {
  // Handle GET request
  return new Response(JSON.stringify({ message: 'GET request received' }), {
    status: 200,
  })
}
```

# JWT Testing

1. Generate random hexadecimal 32 byte key

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
