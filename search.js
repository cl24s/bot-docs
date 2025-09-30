// Search functionality with Fuse.js
(function() {
    let fuse = null;
    let searchInput = null;
    let searchResults = null;
    let isSearchOpen = false;

    // Initialize Fuse.js
    function initSearch() {
        const options = {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'content', weight: 0.3 },
                { name: 'category', weight: 0.3 }
            ],
            threshold: 0.3,
            includeScore: true,
            minMatchCharLength: 2,
            ignoreLocation: true
        };

        fuse = new Fuse(searchIndex, options);
    }

    // Create search results dropdown
    function createSearchDropdown() {
        const dropdown = document.createElement('div');
        dropdown.className = 'search-results';
        dropdown.innerHTML = `
            <div class="search-results-header">
                <span class="search-results-count">0 találat</span>
                <button class="search-close" aria-label="Bezárás">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results-list"></div>
            <div class="search-results-footer">
                <kbd>↑</kbd><kbd>↓</kbd> navigálás · <kbd>Enter</kbd> megnyitás · <kbd>Esc</kbd> bezárás
            </div>
        `;
        document.body.appendChild(dropdown);
        return dropdown;
    }

    // Perform search
    function performSearch(query) {
        if (!query || query.length < 2) {
            hideResults();
            return;
        }

        const results = fuse.search(query);
        displayResults(results, query);
    }

    // Get correct URL based on current location
    function getCorrectUrl(url) {
        const currentPath = window.location.pathname;
        const isInSubpages = currentPath.includes('/subpages/');
        
        // If we're in subpages and URL starts with subpages/, remove it
        if (isInSubpages && url.startsWith('subpages/')) {
            return url.replace('subpages/', '');
        }
        
        // If we're in root and URL doesn't start with subpages/, add ../
        if (!isInSubpages && !url.startsWith('subpages/') && url !== 'index.html') {
            return url;
        }
        
        // If we're in root and URL starts with subpages/, keep it
        if (!isInSubpages && url.startsWith('subpages/')) {
            return url;
        }
        
        // If we're in subpages and URL is index.html, add ../
        if (isInSubpages && url === 'index.html') {
            return '../' + url;
        }
        
        return url;
    }

    // Display search results
    function displayResults(results, query) {
        const resultsList = searchResults.querySelector('.search-results-list');
        const resultsCount = searchResults.querySelector('.search-results-count');

        if (results.length === 0) {
            resultsList.innerHTML = '<div class="search-no-results">Nincs találat</div>';
            resultsCount.textContent = '0 találat';
            showResults();
            return;
        }

        resultsCount.textContent = `${results.length} találat`;

        const html = results.slice(0, 10).map((result, index) => {
            const item = result.item;
            const score = (1 - result.score) * 100;
            
            // Highlight query in title
            const highlightedTitle = highlightText(item.title, query);
            
            // Get content snippet
            const snippet = getSnippet(item.content, query);
            
            // Get correct URL based on current location
            const correctUrl = getCorrectUrl(item.url);

            return `
                <a href="${correctUrl}" class="search-result-item" data-index="${index}">
                    <div class="search-result-category">${item.category}</div>
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-snippet">${snippet}</div>
                    <div class="search-result-score">${Math.round(score)}% relevancia</div>
                </a>
            `;
        }).join('');

        resultsList.innerHTML = html;
        showResults();

        // Add click handlers
        const items = resultsList.querySelectorAll('.search-result-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                hideResults();
            });
        });
    }

    // Highlight text
    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Get content snippet
    function getSnippet(content, query, length = 150) {
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const index = lowerContent.indexOf(lowerQuery);

        if (index === -1) {
            return content.substring(0, length) + '...';
        }

        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 100);
        
        let snippet = content.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';

        return highlightText(snippet, query);
    }

    // Escape regex special characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Show results
    function showResults() {
        searchResults.classList.add('active');
        isSearchOpen = true;
    }

    // Hide results
    function hideResults() {
        searchResults.classList.remove('active');
        isSearchOpen = false;
    }

    // Keyboard navigation
    let selectedIndex = -1;

    function navigateResults(direction) {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        // Remove previous selection
        if (selectedIndex >= 0 && selectedIndex < items.length) {
            items[selectedIndex].classList.remove('selected');
        }

        // Update index
        if (direction === 'down') {
            selectedIndex = (selectedIndex + 1) % items.length;
        } else if (direction === 'up') {
            selectedIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
        }

        // Add new selection
        items[selectedIndex].classList.add('selected');
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }

    function selectResult() {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (selectedIndex >= 0 && selectedIndex < items.length) {
            items[selectedIndex].click();
        }
    }

    // Initialize on page load
    window.addEventListener('load', function() {
        // Wait for Fuse.js to load
        if (typeof Fuse === 'undefined') {
            console.error('Fuse.js not loaded');
            return;
        }

        initSearch();

        // Get search input
        searchInput = document.querySelector('.search-box input');
        if (!searchInput) return;

        // Create results dropdown
        searchResults = createSearchDropdown();

        // Search input event
        searchInput.addEventListener('input', function(e) {
            performSearch(e.target.value.trim());
        });

        // Focus event
        searchInput.addEventListener('focus', function() {
            if (searchInput.value.trim().length >= 2) {
                performSearch(searchInput.value.trim());
            }
        });

        // Close button
        const closeBtn = searchResults.querySelector('.search-close');
        closeBtn.addEventListener('click', function() {
            hideResults();
            searchInput.blur();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+K or Cmd+K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }

            // / to focus search
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }

            // Escape to close
            if (e.key === 'Escape' && isSearchOpen) {
                hideResults();
                searchInput.blur();
            }

            // Arrow navigation
            if (isSearchOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    navigateResults('down');
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    navigateResults('up');
                } else if (e.key === 'Enter' && selectedIndex >= 0) {
                    e.preventDefault();
                    selectResult();
                }
            }
        });

        // Click outside to close
        document.addEventListener('click', function(e) {
            if (isSearchOpen && 
                !searchResults.contains(e.target) && 
                !searchInput.contains(e.target)) {
                hideResults();
            }
        });
    });
})();
