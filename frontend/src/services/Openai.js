import OpenAI from "openai";

const openai = new OpenAI({
  apiKey : import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true
})


export async function analyzeImage(imageFile) {
    try {
        const base64Image = await convertImageToBase64(imageFile);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        { 
                            type: "text", 
                            text: "Please extract the following information from this medical invoice and return it in JSON format:\n" +
                                  "- Patient Name\n" +
                                  "- Diagnosis/Disease\n" +
                                  "- Total Bill Amount\n" +
                                  "- Claim Amount\n" +
                                  "- Date of Service\n\n" +
                                  "Return only the raw JSON object with these exact keys: patientName, diagnosis, billAmount, claimAmount, serviceDate" +
                                  "IMPORTANT : DONOT RETURN MARKDOWN FORMAT"+
                                  "IMPORTANT : MAKE SURE JSON FORMAT MATCHES MY DEMO {patientName,diagnosis,serviceDate,billAmount}"+
                                  "IMPORTANT : IF YOU ARE NOT ABLE TO EXTRACT ANY INFO MARK ITS VALUE AS N/A example: serviceDate : N/A"
                        
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            max_tokens: 500
        });

        let extractedInfo;
        try {
            extractedInfo = JSON.parse(response.choices[0].message.content);
        } catch (error) {
            console.error("Failed to parse JSON response:", response.choices[0].message.content);
            throw new Error("Invalid JSON response from OpenAI", error);
        }
        return extractedInfo;
    } catch (error) {
        console.error("Error analyzing invoice:", error);
        throw error;
    }
}


function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

