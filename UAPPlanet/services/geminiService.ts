import { SelectionData } from "../types";

export const analyzeSelection = async (data: SelectionData): Promise<string> => {
  try {
    // Fetch pre-generated static data
    const response = await fetch(`/data/${data.id}.json`);

    if (!response.ok) {
      // Fallback if file not found (though it should be there)
      console.warn(`Static data for ${data.id} not found.`);
      return "## 数据不可用\n\n无法检索此事件的档案数据。";
    }

    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error("Data Fetch Error:", error);
    return "## 连接丢失\n\n无法从档案中检索机密数据。";
  }
};