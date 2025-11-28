import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Database
let db;
async function initializeDb() {
  db = await open({
    filename: './uap_data.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cache (
      id TEXT PRIMARY KEY,
      response TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initializeDb().catch(console.error);

// Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/analyze', async (req, res) => {
  const data = req.body;

  // Create a unique ID for the cache key. 
  // Using a combination of properties to ensure uniqueness.
  const cacheKey = data.id || `${data.title || data.name}-${data.year || data.designation}`;

  try {
    // Check cache
    const cachedResult = await db.get('SELECT response FROM cache WHERE id = ?', cacheKey);

    if (cachedResult) {
      console.log(`Cache HIT for ${cacheKey}`);
      return res.json({ text: cachedResult.response });
    }

    console.log(`Cache MISS for ${cacheKey}. Calling Gemini...`);

    // Construct Prompt (Logic moved from frontend)
    const isEarth = 'locationName' in data;
    let prompt = "";

    if (isEarth) {
      prompt = `
        Act as a specialized intelligence analyst summarizing a UAP/UFO event for a classified dossier.
        
        Subject: ${data.title}
        Location: ${data.locationName}
        Date: ${data.year}
        Context: ${data.shortDesc}
  
        Please provide a detailed report in Markdown format in Chinese (Simplified).
        
        Structure the response exactly as follows:
        1. **事件经过 (The Incident)**: A detailed chronological account.
        2. **实体/飞行器 (The Entities/Craft)**: Description of observed entities or craft.
        3. **证据 (The Evidence)**: Radar data, physical traces, witness corroboration.
        4. **揭秘视角 (The Disclosure Perspective)**: Connection to the "Age of Disclosure" narrative.
        5. **核心参考源 (Key References)**:
           - Provide 3-5 **clickable Markdown links**.
           - **CRITICAL**: To prevent broken links, YOU MUST use the following "Safe Search" URL format for Wikipedia:
             - Format: \`[Wikipedia: Event Name](https://en.wikipedia.org/wiki/Special:Search?search=Event+Name&go=Go)\`
             - Example: \`[Wikipedia: Roswell Incident](https://en.wikipedia.org/wiki/Special:Search?search=Roswell+Incident&go=Go)\`
           - For other sources (The Black Vault, etc.), if you are not 100% sure of the specific URL, use a Google Site Search link:
             - Format: \`[The Black Vault: Event Name](https://www.google.com/search?q=site:theblackvault.com+Event+Name)\`
        
        Keep the tone objective. Limit the main text to 400 words.
      `;
    } else {
      prompt = `
        Act as an exobiologist and astronomer analyzing a celestial location of interest regarding non-human intelligence.
  
        Subject: ${data.name}
        Designation: ${data.designation}
        Distance: ${data.distance}
        Context: ${data.shortDesc}
  
        Please provide a detailed report in Markdown format in Chinese (Simplified).
        
        Structure the response exactly as follows:
        1. **天文数据 (Astronomical Data)**: Scientific characteristics.
        2. **外星关联 (The Connection)**: Links to extraterrestrials (e.g., signals, lore).
        3. **假设文明 (Hypothetical Civilizations)**: Lore surrounding the beings (e.g., Greys).
        4. **科学异常 (Scientific Anomalies)**: Real-world scientific oddities.
        5. **核心参考源 (Key References)**:
           - Provide 3-5 **clickable Markdown links**.
           - **CRITICAL**: To prevent broken links, YOU MUST use the following "Safe Search" URL format for Wikipedia:
             - Format: \`[Wikipedia: Object Name](https://en.wikipedia.org/wiki/Special:Search?search=Object+Name&go=Go)\`
             - Example: \`[Wikipedia: Zeta Reticuli](https://en.wikipedia.org/wiki/Special:Search?search=Zeta+Reticuli&go=Go)\`
           - For other sources (NASA, ESA), use Google Site Search if unsure of the direct link:
             - Format: \`[NASA: Object Name](https://www.google.com/search?q=site:nasa.gov+Object+Name)\`
  
        Keep the tone scientific yet open. Limit the main text to 400 words.
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || "无法获取情报数据。";

    // Store in cache
    await db.run('INSERT INTO cache (id, response) VALUES (?, ?)', cacheKey, text);

    res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
