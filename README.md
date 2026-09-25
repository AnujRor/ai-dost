# AI Dost 🤝

Aapka friendly Hinglish AI companion — concepts/bills/notices samjhana, dil ki baat, reply suggestions aur masti. OpenRouter ke **free models** se chalta hai, aur Google Gemini backup ke taur pe.

## Chalane ka tarika

1. **Node.js** install hona chahiye (v20 ya naya).
2. **Free OpenRouter key** lein: https://openrouter.ai/keys → *Create Key* → copy.
3. Project folder ki `.env` file mein paste karein:
   ```
   OPENROUTER_API_KEY=aapki_key_yahan
   ```
4. Terminal mein:
   ```
   npm install
   npm run dev
   ```
5. Browser mein kholein: http://localhost:3000

> Agar port 3000 pe koi aur app chal raha ho to `.env` mein `PORT=3001` likh dein.
>
> Free models "No endpoints found matching your data policy" error dein to https://openrouter.ai/settings/privacy par free models wali setting ON karein.

## Production

```
npm run build
npm start
```

## Settings (`.env`)

| Variable | Kaam |
| --- | --- |
| `OPENROUTER_API_KEY` | Main AI. Free key openrouter.ai/keys se |
| `OPENROUTER_MODEL` | Koi specific model pehle try karna ho (default: `openrouter/free` → `google/gemma-4-31b-it:free` → `qwen/qwen3.8-27b:free`) |
| `GEMINI_API_KEY` | Backup AI (optional). Free key aistudio.google.com/apikey se |
| `GEMINI_MODEL` | Gemini model pehle try karna ho (default: `gemini-3.8-flash` → `gemini-3.5-flash` → `gemini-flash-latest` → `gemini-3.1-flash-lite`) |
| `PORT` | Server port (default 3000) |

Dono keys ho to pehle OpenRouter try hota hai, fail hone par Gemini.
