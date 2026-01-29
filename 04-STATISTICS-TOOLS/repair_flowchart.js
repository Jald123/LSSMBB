const fs = require('fs');
const path = require('path');

const targetPath = "c:\\Users\\haldhaher\\Desktop\\LEAN SIX SIGMA INTERACTIVE PLATFORM\\04-STATISTICS-TOOLS\\Tool_LeanWorkshop.html";

try {
    let content = fs.readFileSync(targetPath, 'utf8');

    // The problematic block
    const badBlock1 = `svgHtml += '
                                                    <line x1="' + pt1.x + '" y1="' + pt1.y + '" x2="' + dl.toX + '"
                                                        y2="' + dl.toY + '" stroke="#e74c3c" stroke-width="2"
                                                        stroke-dasharray="5,5" />';`;

    const fixedBlock1 = `svgHtml += '<line x1="' + pt1.x + '" y1="' + pt1.y + '" x2="' + dl.toX + '" y2="' + dl.toY + '" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,5" />';`;

    const badBlock2 = `svgHtml += '
                                                    <circle cx="' + dl.toX + '" cy="' + dl.toY + '" r="5"
                                                        fill="#e74c3c" />';`;

    const fixedBlock2 = `svgHtml += '<circle cx="' + dl.toX + '" cy="' + dl.toY + '" r="5" fill="#e74c3c" />';`;

    // We need to be careful about whitespace.
    // I will use regex to match loosely on whitespace.

    // Regex for block 1
    // svgHtml += '\s+<line ... />';
    const regex1 = /svgHtml \+= '\s+<line x1="' \+ pt1\.x \+ '" y1="' \+ pt1\.y \+ '" x2="' \+ dl\.toX \+ '"\s+y2="' \+ dl\.toY \+ '" stroke="#e74c3c" stroke-width="2"\s+stroke-dasharray="5,5" \/>';/g;

    // Regex for block 2
    const regex2 = /svgHtml \+= '\s+<circle cx="' \+ dl\.toX \+ '" cy="' \+ dl\.toY \+ '" r="5"\s+fill="#e74c3c" \/>';/g;

    let newContent = content;

    if (regex1.test(newContent)) {
        newContent = newContent.replace(regex1, fixedBlock1);
        console.log("Fixed Block 1");
    } else {
        console.log("Block 1 not found (maybe strict match failed)");
    }

    if (regex2.test(newContent)) {
        newContent = newContent.replace(regex2, fixedBlock2);
        console.log("Fixed Block 2");
    } else {
        console.log("Block 2 not found");
    }

    // Also let's just do a direct string replace if regex fails, assuming exact copy from view_file
    if (content.indexOf(badBlock1) !== -1) {
        newContent = newContent.replace(badBlock1, fixedBlock1);
        console.log("Fixed Block 1 (exact string)");
    }
    if (content.indexOf(badBlock2) !== -1) {
        newContent = newContent.replace(badBlock2, fixedBlock2);
        console.log("Fixed Block 2 (exact string)");
    }

    if (newContent !== content) {
        fs.writeFileSync(targetPath, newContent, 'utf8');
        console.log("File written successfully.");
    } else {
        console.log("No changes made.");
    }

} catch (e) {
    console.error("Error:", e);
}
