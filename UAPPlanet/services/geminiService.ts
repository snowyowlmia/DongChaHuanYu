import { SelectionData } from "../types";

const API_URL = '/api/analyze';

export const analyzeSelection = async (data: SelectionData): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error("API Error:", error);
    return "## 连接丢失\n\n无法从档案中检索机密数据。请确保后端服务器正在运行。";
  }
};