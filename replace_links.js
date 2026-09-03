const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

const files = walkSync('./app').concat(walkSync('./components'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace exact occurrences in hrefs or similar string literals
  content = content.replace(/(['"`])\/u92(['"`])/g, '$1/adviq$2');
  content = content.replace(/(['"`])\/u92#/g, '$1/adviq#');
  
  content = content.replace(/(['"`])\/mainstay(['"`])/g, '$1/stambh$2');
  content = content.replace(/(['"`])\/mainstay#/g, '$1/stambh#');
  
  content = content.replace(/(['"`])\/mainspar(['"`])/g, '$1/tripura$2');
  content = content.replace(/(['"`])\/mainspar#/g, '$1/tripura#');

  content = content.replace(/(['"`])\/nexus(['"`])/g, '$1/ankura$2');
  content = content.replace(/(['"`])\/nexus#/g, '$1/ankura#');

  // Also replace in form values if present
  content = content.replace(/(['"`])mainstay(['"`])/g, '$1stambh$2');
  content = content.replace(/(['"`])mainspar(['"`])/g, '$1tripura$2');
  content = content.replace(/(['"`])nexus(['"`])/g, '$1ankura$2');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
