document.addEventListener('DOMContentLoaded', function() {
    // Hard-coded array of store names
    const cmsItems = ['Aldo', 'Abercrombie & Fitch', 'Adidas', 'Aesop', 'AllSaints', 'Alo Yoga', 'American Eagle Outfitters', 'Arcteryx', 'Aritzia', 'Athleta', 'Aveda', 'Banana Republic', 'Bath & Body Works', 'Best Buy', 'Boss Hugo Boss', 'Canada Goose', 'Canadian Tire', 'Champs Sports', 'Claires', 'Club Monaco', 'Coach', 'Dollarama', 'ECCO', 'Ever New', 'Foot Locker', 'Geox', 'Loblaws', 'Lululemon', 'Sephora', 'UGG', 'Zara'];

    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocompleteResults');

    searchInput.addEventListener('input', function() {
        const inputVal = this.value.toLowerCase();
        // Filter CMS items based on input
        const filteredItems = cmsItems.filter(item => item.toLowerCase().startsWith(inputVal));

        // Clear previous results
        resultsContainer.innerHTML = '';
        if (inputVal !== '' && filteredItems.length) {
            // Display filtered items as a list in the results container
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.addEventListener('click', function() {
                    searchInput.value = item; // Populate input with selected item
                    resultsContainer.style.display = 'none'; // Hide results container
                    
                    // Manually dispatch an input event to trigger the filter
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                });
                resultsContainer.appendChild(div);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Optionally, hide autocomplete results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && event.target !== searchInput) {
            resultsContainer.style.display = 'none';
        }
    });
});
