import openai from './AIClient'
import { scamCategories } from './common';

async function askLLM(userData) {
  try {
    const prompt = `
    Given the scam categories: ${scamCategories.map(c => `'${c}'`).join(", ")}, select the **top 3 most relevant categories** for this user.

    **User Profile Structure:**
    - Keys start with **'user_'**
    - **'user_level'** ranges from 1-10 (where **1 = worst affected**, 10 = least affected)
    - **'user_scams'** contains a list of scams the user has either fallen for or encountered.

    Here is the user's JSON profile:
    \`\`\`json
    ${JSON.stringify(userData, null, 2)}
    \`\`\`

    **Return Format:**  
    - **ONLY** return a JSON string  
    - The **result key** must be an **array of exactly 2 categories**  
    - Categories should be sorted by **relevance**, where index **0 = best match**  

    **Example Output:**
    \`\`\`json
    { "result": ["Category 1", "Category 2"] }
    \`\`\`

    **IMPORTANT:** Do not include any extra text—ONLY return a valid JSON response.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a banking security and fraud detection expert. Your job is to analyze scam patterns and categorize user risk based on given data." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

   
    let rawResponse = response.choices[0].message.content;

    try {
      console.log(rawResponse)
      if (rawResponse.startsWith("```json")) {
        rawResponse = rawResponse.replace(/```json/, "").replace(/```/, "").trim();
      }
      const parsedResponse = JSON.parse(rawResponse);
      if (!parsedResponse.result || !Array.isArray(parsedResponse.result)) {
        throw new Error("Invalid JSON structure received from OpenAI.");
      }
      return parsedResponse.result;
    } catch (parseError) {
      console.error("Error parsing GPT-4o response:", parseError);
      return [];
    }
    
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return [];
  }
}

export default askLLM;
