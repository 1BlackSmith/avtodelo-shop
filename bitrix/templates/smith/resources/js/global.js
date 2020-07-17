import merge from 'lodash/merge'
import $ from 'jquery'
import ResizeSensor from '../vendor/ResizeSensor'
import ApplicationInit from './app/init.js'
import isDesktop from './utils/isDesktop';
import imageInCache from './utils/imageInCache';
import { show as showOverlay, hide as hideOverlay } from './utils/overlay'
import Panel from './panel';
import popup from './app/popup';


global.$ = global.jQuery = $;

import './modules/jquery.setHtmlByUrl.js';
import './modules/bootstrap';
// import 'owl.carousel';
// import 'jquery-lazy';
import './modules/readmore';

import './modules/velocity';

global.RS = global.RS || {};
merge(global.RS, {
	Init: ApplicationInit,
	Animations: {},
	EventHandlers: {},
	Utils: {
		ResizeSensor: ResizeSensor,
		isDesktop: isDesktop,
		imageInCache: imageInCache,
		popup: popup,
		overlay: {
			show: showOverlay,
			hide: hideOverlay
		}
	},
});

$(document).ready(function () {
	const panel = new Panel;

	merge(global.RS, {
		Panel: panel
	});
});
