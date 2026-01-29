
const fs = require('fs');
const path = require('path');

const filePath = String.raw`c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Tool_LeanWorkshop.html`;

try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalLength = content.length;

    console.log(`Read file: ${filePath} (${content.length} bytes)`);

    // 1. Fix Flowchart Path (CRITICAL SYNTAX ERROR)
    // Matches: svgHtml += ' ... <path ... ';
    // We use a regex that captures the multiline content between single quotes
    // The pattern implies: svgHtml += ' \n <path ... \n ';

    // We'll search for the specific broken string structure
    const brokenFlowchartPattern = /svgHtml\s*\+=\s*'\s*[\r\n]+\s*<path d="' \+ d \+ '"[\s\S]*? \/>\s*[\r\n]+\s*';/g;

    content = content.replace(brokenFlowchartPattern, match => {
        console.log("Found broken Flowchart Path. Fixing...");
        // Collapse to single line: remove newlines and extra spaces inside the string
        // But keep the structure: svgHtml += '<path d="' + d + '" ... />';
        let clean = match.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' '); // simple collapse
        // Now fix the start/end
        clean = clean.replace(/svgHtml \+= ' <path/, "svgHtml += '<path");
        clean = clean.replace(/\/> ';/, "/>';");
        return clean;
    });

    // 2. Fix Flowchart Label Rect (CRITICAL SYNTAX ERROR)
    const brokenFlowchartRect = /svgHtml\s*\+=\s*'\s*[\r\n]+\s*<rect x="' \+ \(mx - 25\)[\s\S]*?<\/text>';/g;
    content = content.replace(brokenFlowchartRect, match => {
        console.log("Found broken Flowchart Rect. Fixing...");
        let clean = match.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
        clean = clean.replace(/svgHtml \+= ' <rect/, "svgHtml += '<rect");
        // Fix spaces around + concatenation
        return clean;
    });

    // 3. Fix Flowchart Line (CRITICAL SYNTAX ERROR)
    const brokenFlowchartLine = /svgHtml\s*\+=\s*'\s*[\r\n]+\s*<line x1="' \+ pt1\.x[\s\S]*? \/>';/g;
    content = content.replace(brokenFlowchartLine, match => {
        console.log("Found broken Flowchart Line. Fixing...");
        let clean = match.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
        clean = clean.replace(/svgHtml \+= ' <line/, "svgHtml += '<line");
        return clean;
    });

    // 4. Fix Swimlane Path (CRITICAL SYNTAX ERROR)
    const brokenSwimlanePath = /svgHtml\s*\+=\s*'\s*[\r\n]+\s*<path d="' \+ d \+ '" fil[\s\S]*?swim-edge" \/>';/g;
    content = content.replace(brokenSwimlanePath, match => {
        console.log("Found broken Swimlane Path. Fixing...");
        let clean = match.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
        clean = clean.replace(/svgHtml \+= ' <path/, "svgHtml += '<path");
        return clean;
    });

    // 5. Fix Swimlane Label (CRITICAL SYNTAX ERROR)
    const brokenSwimlaneLabel = /svgHtml\s*\+=\s*'\s*[\r\n]+\s*<rect x="' \+ \(\(startX[\s\S]*?<\/text>';/g;
    content = content.replace(brokenSwimlaneLabel, match => {
        console.log("Found broken Swimlane Label. Fixing...");
        let clean = match.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
        clean = clean.replace(/svgHtml \+= ' <rect/, "svgHtml += '<rect");
        return clean;
    });


    if (content.length !== originalLength) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("File saved successfully.");
    } else {
        console.log("No changes made (patterns might not match).");
        // Debug: print a snippet where we expect match
        const snippet = content.substring(originalLength - 2000, originalLength - 1000);
        // console.log("End of file snippet:", snippet);
    }

} catch (err) {
    console.error("Error:", err);
}
