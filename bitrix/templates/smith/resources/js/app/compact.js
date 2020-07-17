import CompactHeader from '../modules/compactHeader';
import $ from 'jquery'

var instance = null;

export function getInstance() {
	if (!instance) {
		let header = document.querySelector(RS.Options.compactHeaderSelector);
		instance = new CompactHeader(header);
	} else {
		instance.resolveSelectors();
	}

	return instance;
}

export function init() {
	const compactHeader = getInstance();

	// Fixing header
	if((RS.Options || {}).fixingCompactHeader) {
		compactHeader.fixing();
	}

	// Toggle compact menu
	$(document).on('click', '[data-compact-menu-toggle]', function(event) {
		event.preventDefault();

		compactHeader.toggleMenu(this);
	});

	// Mobile search
	$(document).on('click', '[data-compact-search-open]', function(event) {
		event.preventDefault();

		compactHeader.revealMobileSearch();
	});

	$(document).on('click', '[data-compact-search-close]', (event) => {
		event.preventDefault();

		compactHeader.concealMobileSearch();
	});

	// $(window).resize(() => {
	// 	if (compactHeader.$search.hasClass('js-is-open')) {
	// 		compactHeader.concealMobileSearch();
	// 	}
	// });
}
