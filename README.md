# ⚡ Hack Ready Web Dev Workshop

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

## 🚀 Deploying to Vercel

1. Push your code to **GitHub**  
2. Import the repo into **Vercel**  
3. Add your environment variables under **Project Settings → Environment Variables**  
4. Deploy and share your live demo!  
