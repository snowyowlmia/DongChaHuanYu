import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Server Configuration Error: Missing API Key' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const data = req.body;

    try {
        // Construct Prompt
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
        res.json({ text });

    } catch (error) {
        console.error("Serverless Function Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
