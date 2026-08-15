const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.js') || dirFile.endsWith('.html')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const srcFiles = walkSync(path.join(__dirname, 'client', 'src'));
const htmlFile = path.join(__dirname, 'client', 'index.html');
const allFiles = [...srcFiles, htmlFile];

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/Najera's Team Central/g, 'Club Central')
    .replace(/Najera's Team/g, 'Club Central')
    .replace(/NAJERA'S TEAM CENTRAL/g, 'CLUB CENTRAL')
    .replace(/NAJERA'S TEAM/g, 'CLUB CENTRAL')
    .replace(/NAJERA'S/g, 'CLUB')
    .replace(/Mtro\. Bryan Nájera/g, 'Profesores Diego Pérez y Mauricio Almeida')
    .replace(/Bryan Najera/g, 'Diego Pérez y Mauricio Almeida')
    .replace(/contacto@najeras-team\.com/g, 'contacto@clubcentral.com')
    .replace(/logo\.png/g, 'logo.svg');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
});
