'use strict';
// Page Loader : Hide
//$(document).foundation();

// Init All Plugins when Document is Ready
$(document).on('ready', function () {

	// 0. Init Console to Avoid Error
	var method;
	var noop = function () { };
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	var contextWindow = $(window);
	var $root = $('html, body');
	while (length--) {
		method = methods[length];
		// Only Stub Undefined Methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}

	// Init Foundation
	//var mainDocument = $(document);
	//mainDocument.foundation();
	//$(document).foundation();
	//$('.pg-body').foundation();
	//var mainDocument = $(document).foundation();

	// 1. Background Image as Data Attribute
	var list = $('.bg-img');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-image-src');
		list[i].style.backgroundImage = "url('" + src + "')";
		list[i].style.backgroundRepeat = "no-repeat";
		list[i].style.backgroundPosition = "center";
		list[i].style.backgroundSize = "cover";
	}
	// Image Block to Background Image 
	var listImgBlock = $('.img-block');
	for (var i = 0; i < listImgBlock.length; i++) {
		var src = listImgBlock[i].getAttribute('src');
		var divBlock = document.createElement("div");
		divBlock.setAttribute("class", "img");
		divBlock.style.backgroundImage = "url('" + src + "')";
		divBlock.style.backgroundRepeat = "no-repeat";
		divBlock.style.backgroundPosition = "center";
		divBlock.style.backgroundSize = "cover";
		$(listImgBlock[i]).after(divBlock);
		listImgBlock[i].style.display = "none";
	}
	// Background Color as Data Attribute
	var list = $('.bg-color');
	for (var i = 0; i < list.length; i++) {
		var src = list[i].getAttribute('data-bgcolor');
		list[i].style.backgroundColor = src;
	}

	// 2. Init Coutdown Clock
	try {
		// Check if Clock is Initialised
		$('.clock-countdown').downCount({
			date: $('.site-config').attr('data-date'),
			offset: +10
		});
	} catch (error) {
		// Clock Error : Clock is Unavailable
		console.log("Clock Disabled / Unavailable");
	}

	// 3. Show / Hide Menu when Icon is Clicked
	var menuItems = $('.top-menu-links, .main-menu');
	var menuIcon = $('.menu-icon, #menu-link');
	var menuLinks = $(".top-menu-links a, .main-menu a");
	// Menu Icon Clicked
	menuIcon.on('click', function () {
		menuIcon.toggleClass('menu-visible')
		menuItems.toggleClass('menu-visible');
		return false;
	});
	// Hide Menu after a Menu Item Clicked
	menuLinks.on('click', function () {
		if (menuItems.hasClass('menu-visible')) {
			menuIcon.removeClass('menu-visible');
			menuItems.removeClass('menu-visible');
		}
		return true;
	});

	// 4.1 Slider / Slideshow
	// 4.a Slideshow Background
	var imageList = $('.slide-show .img');
	var imageSlides = [];
	for (var i = 0; i < imageList.length; i++) {
		var src = imageList[i].getAttribute('data-src');
		imageSlides.push({ src: src });
	}
	$('.slide-show').vegas({
		delay: 5000,
		shuffle: true,
		slides: imageSlides,
		animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
	});

	// 4.b Products / Projects / Items Slider
	var swiper = new Swiper('.swiper-container', {
		pagination: { el: '.items-pagination', },
		pagination: '.items-pagination',
		paginationClickable: { el: '.items-pagination', },
		paginationClickable: '.items-pagination',
		navigation: { nextEl: '.items-button-next', prevEl: '.items-button-prev', },
		nextButton: '.items-button-next',
		prevButton: '.items-button-prev',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 1,
		spaceBetween: 0,
		breakpoints: {
			1024: {
				slidesPerView: 1,
			}, 800: {
				slidesPerView: 1,
				spaceBetween: 32
			}, 640: {
				slidesPerView: 1,
				spaceBetween: 32
			}, 440: {
				slidesPerView: 1,
				spaceBetween: 32
			}
		}
	});

	// 5. Init Video Background
	var videoBg = $('.video-container video, .video-container object');
	videoBg.maximage('maxcover');

	// 6. Prepare Titles, Content for Animation
	$('.section .content .anim .title h2, .section .content .anim .title h3, .section .content .anim .desc p, \
		.section .content .anim .title-desc h2, .section .content .anim .title-desc h3, .section .content .anim .title-desc h4, .section .content .anim .item-desc h3,.section .content .anim .title-desc p, \
		.cta-btns .btn').wrap("<span class='anim-wrapper'></span>");

	// 7. Init fullPage.js Plugin
	var pageSectionDivs = $('.fullpg .section');
	var headerLogo = $('.header-top .logo');
	var bodySelector = $('body');
	var sectionSelector = $('.section');
	var headerContainer = $('.pg-header');
	var slideElem = $('.slide');
	var arrowElem = $('.p-footer .arrow-d');
	var pageElem = $('.section');
	var pageSections = [];
	var pageAnchors = [];
	var nextSectionDOM;
	var nextSection;
	var fpnavItem;
	var mainPage = $('#mainpage');
	var sendEmailForm = $('.send_email_form');
	var sendMessageForm = $('.send_message_form');
	var scrollOverflow = true;
	// Disable Scroll Overflow on small devices
	if (contextWindow.width() < 601) {
		scrollOverflow = false;
	} else {
		scrollOverflow = true;
	}
	// Get Sections Name
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function (pageSection, cb) {
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function (err) {
		// Init Plugin
		if (mainPage.height()) {
			// Config FullPage.js
			mainPage.fullpage({
				menu: '#qmenu',
				anchors: pageAnchors,
				verticalCentered: false,
				css3: true,
				navigation: true,
				responsiveWidth: 601,
				responsiveHeight: 480,
				scrollOverflow: scrollOverflow,
				scrollOverflowOptions: {
					click: true,
					submit: true,
				},
				afterRender: function () {
					// Fix Video Background
					videoBg.maximage('maxcover');
					// Fix for Internet Explorer : Adjust content height
					// Detect IE 6-11
					var isIE = /*@cc_on!@*/false || !!document.documentMode;
					if (isIE){
						var contentColumns = $('.section .content .c-columns');
						contentColumns.height(contextWindow.height())
						for (var i = 0; i < contentColumns.length; i++) {
							if (contentColumns[i].height <= contextWindow.height()) {
								contentColumns[i].style.height = "100vh";
							}
						}
					}
					// Init Contact Form
					// Default Server URL
					var newsletterServerUrl = './ajaxserver/serverfile.php';
					var messageServerUrl = './ajaxserver/serverfile.php';
					// Use Form Define Action Attribute
					if (sendEmailForm.attr('action') && (sendEmailForm.attr('action')) != '') {
						newsletterServerUrl = sendEmailForm.attr('action');
					}
					if (sendMessageForm.attr('action') && (sendMessageForm.attr('action') != '')) {
						messageServerUrl = sendMessageForm.attr('action');
					}
					sendEmailForm.initForm({
						serverUrl: newsletterServerUrl,
					});
					sendMessageForm.initForm({
						serverUrl: messageServerUrl,
					});
				},
				afterResize: function () {
					var pluginContainer = $(this);
					$.fn.fullpage.reBuild();
				},
				onLeave: function (index, nextIndex, direction) {
					// Behavior When a Full Page is Left
					arrowElem.addClass('gone');
					pageElem.addClass('transition');
					slideElem.removeClass('transition');
					pageElem.removeClass('transition');
				},
				afterLoad: function (anchorLink, index) {
					// Behavior After a Full Page is Loaded
					// Show / Hide Clock
					if ($('.section.active').hasClass('hide-clock')) {
						headerContainer.addClass('gone');
					} else {
						headerContainer.removeClass('gone');
					}
				}
			});
		}
	});
	// Scroll to FullPage.js Next / Previous Section
	$('.scrolldown a, .scroll.down').on('click', function () {
		try {
			// Fullpage Scroll
			$.fn.fullpage.moveSectionDown();
		} catch (error) {
			// Normal Scroll
			$root.animate({
				scrollTop: window.innerHeight
			}, 400, function () {
			});
		}
	});

	// 8. Hide Some UI on Scroll
	var scrollHeight = $(document).height() - contextWindow.height();
	contextWindow.on('scroll', function () {
		var scrollpos = $(this).scrollTop();
		var siteHeaderFooter = $('.site-footer, .header-top');
		
		if (scrollpos > 10 && scrollpos < scrollHeight - 100) {
			siteHeaderFooter.addClass("scrolled");
		} else {
			siteHeaderFooter.removeClass("scrolled");
		}
	});

	// 9. Page Loader : For jQuery 2.2.4
	contextWindow.on('load', function () {
		$('.page-loader').fadeOut(500);
		$('.section').addClass('anim');
	});
});
// 9. Page Loader

/**
// 9. Page Loader : For jQuery 3.5.1
window.addEventListener('load', function () {
	$('.page-loader').fadeOut(500);
	$('.section').addClass('anim');
});
// 9. Page Loader : For jQuery 2.2.4
contextWindow.on('load', function () {
	$('#page-loader').addClass('p-hidden');
	$('.section').addClass('anim');
});
var pageLoader = document.querySelector('.page-loader');
window.addEventListener('load', function () {
	$('.page-loader').addClass('p-hidden');
	$('.section').addClass('anim');
});
*/