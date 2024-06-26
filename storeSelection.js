window.addEventListener('load', () => {
    const continueSection = document.getElementById('section-continue');
    const continueButton = document.getElementById('button-continue');
    const selectedButtons = new Set();

    const applyEventListeners = () => {
        const buttons = document.querySelectorAll('.is-shop-here');

        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClick); // Remove existing listeners to prevent duplicates
            button.addEventListener('click', handleButtonClick);
        });
    };

    const handleButtonClick = (event) => {
        const button = event.currentTarget;
        const buttonId = button.id;

        if (buttonId) { // Ensure the button has a valid ID
            // Map button IDs to store names
            const storeMap = {
                A1: 'Abercrombie & Fitch',
                A2: 'Adidas',
                A3: 'Aerie',
                A4: 'Aesop',
                A5: 'Aldo',
                A6: 'AllSaints',
                A7: 'Alo Yoga',
                A8: 'American Eagle Outfitters',
                A9: 'Apple',
                A10: 'Arc\'teryx',
                A11: 'Aritzia',
                A12: 'Athleta',
                A13: 'Aveda',
                B1: 'B2',
                B2: 'Babaton',
                B3: 'Bailey Nelson',
                B4: 'Banana Republic',
                B5: 'Bath & Body Works',
                B6: 'Bentley',
                B7: 'Best Buy',
                B8: 'Bikini Village',
                B9: 'Bluenotes',
                C1: 'Call It Spring',
                C2: 'Canada Goose',
                C3: 'Canadian Tire',
                C6: 'Club Monaco',
                C7: 'Coach',
                D1: 'DAVIDsTEA',
                D2: 'Dollarama',
                D3: 'Dynamite',
                E1: 'Eataly',
                E2: 'ECCO',
                E3: 'Ever New',
            };

            // Toggle selection
            if (selectedButtons.has(buttonId)) {
                selectedButtons.delete(buttonId);
                button.classList.remove('selected'); // Optional: Add a class to indicate selection
            } else {
                selectedButtons.add(buttonId);
                button.classList.add('selected'); // Optional: Add a class to indicate selection
            }

            // Debugging: Log selected buttons
            console.log('Selected Buttons:', Array.from(selectedButtons));

            // Toggle section visibility
            if (selectedButtons.size > 0) {
                continueSection.style.display = 'flex';
                updateContinueButtonURL(selectedButtons);
            } else {
                continueSection.style.display = 'none';
            }

            // Update URL with selected buttons
            updateURL(selectedButtons);

            // Track store selection with RudderStack
            const storeName = storeMap[buttonId];
            if (storeName) {
                window.trackStoreSelection(storeName);
            }

            // Debugging: Log section visibility status
            console.log('Continue Section Display:', continueSection.style.display);
        }
    };

    function updateURL(selectedButtons) {
        const baseURL = window.location.origin;
        if (selectedButtons.size === 0) {
            window.history.replaceState(null, '', baseURL);
        } else {
            const params = Array.from(selectedButtons).join('&');
            const newURL = `?${params}`;
            window.history.replaceState(null, '', newURL);
        }
    }

    function updateContinueButtonURL(selectedButtons) {
        if (continueButton) {
            const params = Array.from(selectedButtons).join('&');
            const newURL = `/book/?${params}`;
            continueButton.href = newURL;

            // Debugging: Log new URL for continue button
            console.log('Continue Button URL:', continueButton.href);
        }
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                applyEventListeners();
            }
        });
    });

    observer.observe(document.querySelector('.grid-stores_list'), {
        childList: true,
        subtree: true,
    });

    applyEventListeners(); // Apply listeners to initial buttons
});
