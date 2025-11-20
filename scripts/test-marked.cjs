const { marked } = require('marked');

// Test basic bold syntax
const testMarkdown = `
This is **bold text** in the middle.

**Bold at start** of line.

And **multiple** bold **words** in one line.

### **Bold heading text**
`;

console.log('Testing marked bold parsing:\n');
console.log('Input markdown:');
console.log(testMarkdown);
console.log('\n' + '='.repeat(50) + '\n');

const html = marked(testMarkdown);
console.log('Output HTML:');
console.log(html);
console.log('\n' + '='.repeat(50) + '\n');

// Check if <strong> tags are present
if (html.includes('<strong>')) {
  console.log('✅ Bold syntax is working - <strong> tags found');
} else {
  console.log('❌ Bold syntax NOT working - no <strong> tags found');
  console.log('Checking if ** is still present:');
  if (html.includes('**')) {
    console.log('❌ ** characters still present in output');
  }
}
