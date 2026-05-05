import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Using the Next.js backend runtime
export async function GET() {
    const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY || "AIzaSyAATvLGBugIF1Gezc_gTt35O2MxllIz5NY";
    const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio', 'voiceovers');
    
    // Using absolute path to the artifacts directory in the user's home folder
    const ARTIFACTS_DIR = 'C:\\Users\\haldhaher\\.gemini\\antigravity\\brain\\67cd9a3b-9928-4996-a0c8-8c651655d1c7\\artifacts';
    
    // Create output dir if needed
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    if (!GOOGLE_TTS_API_KEY) {
        return NextResponse.json({ error: "GOOGLE_TTS_API_KEY missing" }, { status: 500 });
    }

    const results: string[] = [];

    async function generateAudioWithGemini(text: string, voiceType: string, outputFile: string) {
        // Google Cloud TTS Premium Journey Voices
        const voiceName = voiceType === 'Male' ? 'en-US-Journey-D' : 'en-US-Journey-F';
        
        try {
            const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: { text: text },
                    voice: {
                        languageCode: "en-US",
                        name: voiceName
                    },
                    audioConfig: {
                        audioEncoding: "MP3"
                    }
                })
            });
            
            if (!response.ok) {
                const error = await response.text();
                results.push(`[FAILED] ${path.basename(outputFile)} - API Error: ${error}`);
                return;
            }

            const data = await response.json();
            
            if (data.audioContent) {
                const audioBuffer = Buffer.from(data.audioContent, 'base64');
                fs.writeFileSync(outputFile, audioBuffer);
                results.push(`[SUCCESS] Saved ${path.basename(outputFile)} using voice ${voiceName}`);
            } else {
                results.push(`[FAILED] ${path.basename(outputFile)} - No audio data returned.`);
            }
        } catch (err: any) {
            results.push(`[ERROR] ${path.basename(outputFile)} - ${err.message}`);
        }
    }

    const methodologies = [
        { file: 'VO_SCRIPT_DMAIC.md', prefix: 'DMAIC' },
        { file: 'VO_SCRIPT_DMADV.md', prefix: 'DMADV' },
        { file: 'VO_SCRIPT_KAIZEN.md', prefix: 'KAIZEN' },
        { file: 'VO_SCRIPT_FOCUS.md', prefix: 'FOCUS' }
    ];

    for (const methodology of methodologies) {
        const rootPath = path.join(process.cwd(), methodology.file);
        const backupPath = path.join(ARTIFACTS_DIR, methodology.file);
        
        let content = "";
        if (fs.existsSync(rootPath)) {
            content = fs.readFileSync(rootPath, 'utf-8');
        } else if (fs.existsSync(backupPath)) {
            content = fs.readFileSync(backupPath, 'utf-8');
        } else {
            results.push(`[WARNING] Could not locate ${methodology.file}`);
            continue;
        }

        const lines = content.split('\n');
        let currentToolId = null;

        for (const line of lines) {
            const toolMatch = line.match(/###.*\`([a-zA-Z0-9-]+)\`/);
            if (toolMatch) {
                currentToolId = toolMatch[1];
                continue;
            }

            if (currentToolId && line.startsWith('**S')) {
                const segmentMatch = line.match(/\*\*S(\d):.*?\((Male|Female)\):\*\*\s*"(.*)"/);
                if (segmentMatch) {
                    const segmentNum = segmentMatch[1];
                    const voiceType = segmentMatch[2];
                    const text = segmentMatch[3];
                    const outputFilename = path.join(OUTPUT_DIR, `${methodology.prefix}_${currentToolId}_s${segmentNum}.mp3`);
                    
                    if (!fs.existsSync(outputFilename)) {
                        await generateAudioWithGemini(text, voiceType, outputFilename);
                    } else {
                        results.push(`[SKIPPED] ${path.basename(outputFilename)} already exists.`);
                    }
                }
            }
        }
    }

    return NextResponse.json({
        message: "Audio Generation Test Executed!",
        status: results
    });
}
