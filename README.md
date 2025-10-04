# ⚡ Hack Ready Web Dev Workshop Starter (Next.js)

## 🧰 Prerequisites

Please install and set up before the workshop:  
- [Node.js](https://nodejs.org/) version **18+**
- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
- [Git](https://git-scm.com/)
- A [GitHub account](https://github.com/)
- A [Vercel account](https://vercel.com/) (connected to GitHub)
- A **Google AI API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/hack-ready-workshop-starter.git
cd hack-ready-workshop-starter
```

### 2. Use Node.js 18

```bash
nvm use 18
```

### 3. Install dependencies

```bash
npm install
```

## 🔐 Environment Variables

Create a file called `.env.local` in the root of your project.

Copy the contents from `.env.dev` into `.env.local` using:

```bash
cp .env.dev .env.local
```

Open `.env.local` and replace the placeholder values with your actual keys:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here
```

**Note:** Your Google API key can be generated at: [Google AI Studio](https://aistudio.google.com/)

**Important:** All environment variables must start with `NEXT_PUBLIC_` for Next.js to expose them to the frontend.

## ▶️ Run the Development Server

Start the app locally with:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Adding UI Components

We’ll use [shadcn/ui](https://ui.shadcn.com/) to quickly build components.

### 1. Install shadcn/ui

```bash
npx shadcn-ui@latest init
```

Follow the prompts (choose Next.js).

### 2. Add a Button Component

```bash
npx shadcn-ui@latest add button
```

Example usage in app/page.tsx:

```bash
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hack Ready Workshop</h1>
      <Button>Click me</Button>
    </main>
  )
}
```

This verifies your setup and ensures components work before adding the AI.

---

## 🤖 Calling the Gemini API

We’ll use the Google Generative AI SDK to send prompts and display responses.

### 1. Install the SDK

```bash
npm install @google/generative-ai
```

### 2. Create an API Route

In `app/api/gemini/route.ts:`

```bash
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEN_AI_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const result = await model.generateContent(prompt)
  const response = await result.response.text()

  return new Response(JSON.stringify({ response }), {
    headers: { "Content-Type": "application/json" },
  })
}
```

### 3. Call the API from the Frontend

In `app/page.tsx:`

```bash
"use client"
import { useState } from "react"

export default function Home() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    })
    const data = await res.json()
    setResponse(data.response)
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Chat Demo</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini something..."
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p>{response}</p>
        </div>
      )}
    </main>
  )
}
```

Now your frontend can send prompts and display AI responses in a chat-like UI.

---

## 🚀 Deploying to Vercel

1. Push your code to **GitHub**  
2. Import the repo into **Vercel**  
3. Add your environment variables under **Project Settings → Environment Variables**  
4. Deploy and share your live demo!  

---

## 🔥 Bonus (Optional)

- **Firebase Integration** (store messages, user data, etc.)  
- **WebSockets** (real-time streaming responses)  
- Check the `/extras` folder in this repo for starter examples and resources.  

