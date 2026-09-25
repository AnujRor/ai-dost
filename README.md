# AI Dost 🤝

Aapka friendly Hinglish AI companion — concepts/bills/notices samjhana, dil ki baat, reply suggestions aur masti. Google Gemini (free tier) se chalta hai.

## Chalane ka tarika

1. **Node.js** install hona chahiye (v20 ya naya).
2. **Free Gemini API key** lein: https://aistudio.google.com/apikey → *Create API key* → copy.
3. Project folder ki `.env` file mein paste karein:
   ```
   GEMINI_API_KEY=aapki_key_yahan
   ```
4. Terminal mein:
   ```
   npm install
   npm run dev
   ```
5. Browser mein kholein: http://localhost:3000

> Agar port 3000 pe koi aur app chal raha ho to `.env` mein `PORT=3001` likh dein.

## Production

```
npm run build
npm start
```

## Optional settings (`.env`)

| Variable | Kaam |
| --- | --- |
| `GEMINI_API_KEY` | Zaroori. Free key aistudio.google.com se |
| `GEMINI_MODEL` | Koi specific model pehle try karna ho (default: `gemini-3.8-flash` → `gemini-3.5-flash` → `gemini-flash-latest` → `gemini-3.1-flash-lite`) |
| `PORT` | Server port (default 3000) |
