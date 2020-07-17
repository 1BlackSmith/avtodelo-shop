$(document).ready(function () {
	'use strict';

	var _type;
	var $overlay;

	var isOpenPopup = false;
	var $body = $('body');
	var $popupContainer = $('.search-popup');

	if ($popupContainer.hasClass('search-popup--top')) {
		_type = 'top';
	} else if ($popupContainer.hasClass('search-popup--full')) {
		_type = 'full';
	}

	var showOverlay = function ()
	{
		RS.Utils.overlay.show();
		$('.l-page').addClass('filter-blur');
	}

	var hideOverlay = function ()
	{
		RS.Utils.overlay.hide();
	}

	var openAnimationCompleteFn = function () {
		$('.title-search-result').css({
			'zIndex': 99999
		});

		$popupContainer.find('input:eq(0)').focus();
	}

	var openFull = function ()
	{
		$('html').addClass('disable-scroll');

		$popupContainer
			.css({'display': 'block'})
			.velocity({
				opacity: 1
			}, {
				duration: 400,
				complete: openAnimationCompleteFn
			});
	}

	var openTop = function ()
	{
		$popupContainer
			.css({'display': 'block'})
			.velocity('transition.slideDownInFull', {
				duration: 400,
				complete: openAnimationCompleteFn
			});
	}

	var openPopup = function ()
	{
		if (isOpenPopup) {
			return;
		}

		isOpenPopup = true;

		if (_type == 'full') {
			openFull();
		} else if (_type == 'top') {
			showOverlay();
			openTop();

			$(document).on('click.outside', function (e) {
				if ($(e.target) != $popupContainer && !!!$(e.target).closest($popupContainer).length) {
					closePopup();
				}
			});
		}

		setTimeout(function () {
			$popupContainer.addClass('is-open');
		}, 200);

	};

	var closeAnimationCompleteFn = function ()
	{
		$('html.disable-scroll').removeClass('disable-scroll');

		$popupContainer
			.removeClass('is-open')
			.css({
				'display': 'none'
			});

		isOpenPopup = false;
	}

	var closePopupFull = function ()
	{
		$popupContainer
			.velocity({
				opacity: '0'
			}, {
				duration: 300,
				complete: closeAnimationCompleteFn
			});
	}


	var closePopupTop = function ()
	{
		$popupContainer
			.velocity('transition.slideDownOutFull', {
				duration: 500,
				complete: closeAnimationCompleteFn
			});
	}

	var closePopup = function ()
	{
		if (!isOpenPopup) {
			return;
		}

		$('.title-search-result:visible').hide();

		switch(_type) {
			case 'full':
				closePopupFull();
				break;
			case 'top':
				hideOverlay();
				closePopupTop();

				$(document).off('click.outside');
			break;
		}
	}

	$(document).on('click', '[data-open-search-popup]', function () {
		openPopup();
	});

	$popupContainer.on('click', '[data-close-search-popup]', function () {
		closePopup();
	});

	$(document).keyup(function(e) {
		if (e.keyCode === 27)  {
			closePopup();
		}
	});
});
