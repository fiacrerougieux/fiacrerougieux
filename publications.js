// Parse BibTeX and generate publications HTML
function loadPublications() {
  // Get the publications container
  const container = document.getElementById('publications-content');
  if (!container) return;

  // Fetch the BibTeX file
  fetch('papers.bibtex')
    .then(response => response.text())
    .then(bibtex => {
      // Parse BibTeX entries
      const entries = parseBibTeX(bibtex);
      
      // Group by year
      const byYear = groupByYear(entries);
      
      // Generate HTML
      let html = '';
      for (const [year, entries] of Object.entries(byYear).sort((a,b) => b[0] - a[0])) {
        html += `<h3>${year}</h3><ul>`;
        for (const entry of entries) {
          html += formatEntry(entry);
        }
        html += '</ul>';
      }
      
      container.innerHTML = html;
    })
    .catch(error => console.error('Error loading publications:', error));
}

// Parse BibTeX text into an array of entries
function parseBibTeX(bibtex) {
  const entries = [];
  const entryRegex = /@(\w+)\{([^,]+),([^@]+)\}/g;
  let match;
  
  while ((match = entryRegex.exec(bibtex)) !== null) {
    const [_, type, key, fieldsText] = match;
    const fields = {};
    
    // Extract fields
    const fieldRegex = /(\w+)\s*=\s*\{([^}]+)\}/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
      const [_, name, value] = fieldMatch;
      fields[name.toLowerCase()] = value;
    }
    
    entries.push({
      type,
      key,
      ...fields
    });
  }
  
  return entries;
}

// Group entries by year
function groupByYear(entries) {
  const byYear = {};

  for (const entry of entries) {
    const year = entry.year;
    if (year) { // Only add entries with a valid year
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(entry);
    }
  }

  return byYear;
}

// Format a single entry as HTML
function formatEntry(entry) {
  let authors = entry.author || '';
  if (authors.includes('Rougieux')) {
    // Highlight author
    authors = authors.replace(/(Rougieux[^,]*)/g, '<strong>$1</strong>');
  }
  
  let title = entry.title || '';
  title = title.replace(/[{}]/g, ''); // Remove BibTeX braces
  
  let venue = '';
  if (entry.journal) {
    venue = `<em>${entry.journal}</em>`;
    if (entry.volume) venue += `, ${entry.volume}`;
    if (entry.number) venue += `(${entry.number})`;
    if (entry.pages) venue += `, ${entry.pages}`;
  } else if (entry.booktitle) {
    venue = `<em>${entry.booktitle}</em>`;
  }
  
  return `
    <li>
      ${authors}, 
      "${title}", 
      ${venue}, 
      ${entry.year || ''}
    </li>
  `;
}

// Load publications when page is ready
document.addEventListener('DOMContentLoaded', loadPublications);
