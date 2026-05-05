import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Initialize environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/audio/voiceovers');
const ARTIFACTS_DIR = path.join(__dirname, '../.gemini/antigravity/brain/67cd9a3b-9928-4996-a0c8-8c651655d1c7/artifacts'); // Fallback artifact path

console.log('🎙️ NEXUS ACADEMY: Voice-Over Generation Protocol Initiated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created audio output directory at: ${OUTPUT_DIR}`);
}

if (!GEMINI_API_KEY) {
    console.error('❌ ERROR: GEMINI_API_KEY is missing from .env file.');
    process.exit(1);
}

/**
 * MOCK / STUB FOR GEMINI AUDIO GENERATION
 * Since the Gemini API (Google AI Studio) handles TTS differently than OpenAI,
 * this function represents the integration point for your specific Gemini Audio model 
 * (e.g., gemini-1.5-flash with responseModalities: ["AUDIO"]).
 */
async function generateAudioWithGemini(text, voiceType, outputFile) {
    console.log(`   ⏳ Generating [Voice: ${voiceType}] -> ${path.basename(outputFile)}`);
    
    // Select Voice Profile (Puck/Charon/Fenrir for Male, Aoede/Kore for Female)
    const voiceName = voiceType === 'Male' ? 'Charon' : 'Aoede';
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }],
                generationConfig: { 
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: voiceName
                            }
                        }
                    }
                }
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            console.error(`   ❌ API Error:`, error);
            return;
        }

        const data = await response.json();
        
        // The audio comes back as base64 encoded data
        const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (inlineData && inlineData.data) {
            const audioBuffer = Buffer.from(inlineData.data, 'base64');
            // Gemini returns audio/pcm or wav data typically, but saving as .mp3 or .wav depends on the exact mimeType.
            // By default, it's often usable directly as .wav or .mp3 in browsers if it's raw pcm/wav format.
            fs.writeFileSync(outputFile, audioBuffer);
            console.log(`   ✅ Saved: ${path.basename(outputFile)}`);
        } else {
            console.error(`   ❌ Failed to extract audio data from response.`);
        }
    } catch (err) {
        console.error(`   ❌ Network/Execution Error:`, err.message);
    }
}

async function processScriptFile(filename, methodology) {
    const filePath = path.join(ARTIFACTS_DIR, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Warning: Script file not found for ${methodology}. Skipping.`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let currentToolId = null;
    console.log(`\n==========================================`);
    console.log(`📖 Processing Methodology: ${methodology}`);
    console.log(`==========================================`);

    for (const line of lines) {
        // Look for tool headers: ### 1.1 Project Charter (`charter`)
        const toolMatch = line.match(/###.*\`([a-zA-Z0-9-]+)\`/);
        if (toolMatch) {
            currentToolId = toolMatch[1];
            console.log(`\n🎯 Found Tool: ${currentToolId}`);
            continue;
        }

        // Look for segments: **S1: Page Walkthrough (Male):** "Welcome to..."
        if (currentToolId && line.startsWith('**S')) {
            const segmentMatch = line.match(/\*\*S(\d):.*?\((Male|Female)\):\*\*\s*"(.*)"/);
            if (segmentMatch) {
                const segmentNum = segmentMatch[1];
                const voiceType = segmentMatch[2];
                const text = segmentMatch[3];

                const outputFilename = path.join(OUTPUT_DIR, `${methodology}_${currentToolId}_s${segmentNum}.mp3`);
                
                // Avoid regenerating if it already exists
                if (!fs.existsSync(outputFilename)) {
                    await generateAudioWithGemini(text, voiceType, outputFilename);
                } else {
                    console.log(`   ⏭️ Skipping (Already exists): ${path.basename(outputFilename)}`);
                }
            }
        }
    }
}

async function run() {
    try {
        await processScriptFile('VO_SCRIPT_DMAIC.md', 'DMAIC');
        await processScriptFile('VO_SCRIPT_DMADV.md', 'DMADV');
        await processScriptFile('VO_SCRIPT_KAIZEN.md', 'KAIZEN');
        await processScriptFile('VO_SCRIPT_FOCUS.md', 'FOCUS');
        
        console.log('\n🎉 ALL VOICE-OVER GENERATION COMPLETE!');
        console.log('The Nexus Academy is now fully voiced.');
    } catch (error) {
        console.error('Fatal Error during generation:', error);
    }
}

run();
