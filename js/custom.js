var locations = Array();
var map, markers = Array();

locations['boulder'] = [40.02909, -105.25248];
locations['charlottesville'] = [38.02745, -78.47101];
locations['sanfrancisco'] = [37.78182, -122.40833];

function shuffle(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function initialize(){

	var coshxIcon = L.icon({
		iconUrl: 'img/map_marker.png',
		iconSize: [30, 49],
		iconAnchor: [14, 49],
		popupAnchor:  [0, -49]
	});

	wax.tilejson('http://api.tiles.mapbox.com/v2/examples.map-vyofok3q.jsonp',
	function(tilejson) {
		map = new L.Map('map-canvas', { scrollWheelZoom: false})
		.addLayer(new wax.leaf.connector(tilejson))
		.setView(new L.LatLng(39.9, -101.5), 5);

		markers['boulder'] = L.marker(locations['boulder'], {icon: coshxIcon})
				.bindPopup('Boulder<br>3080 Valmont Rd Suite<br>280 Boulder, CO 80301')
				.addTo(map);

		markers['charlottesville'] = L.marker(locations['charlottesville'], {icon: coshxIcon})
				.bindPopup('Charlottesville<br>1110 Market St East Suite N7<br>Charlottesville, VA 22902')
				.addTo(map);

		markers['sanfrancisco'] = L.marker(locations['sanfrancisco'], {icon: coshxIcon})
				.bindPopup('San Francisco<br>972 Mission Street, 5th Floor<br>San Francisco, CA 94103')
				.addTo(map);
	});
}

function toggleLabel() {
	var input = $(this);
	setTimeout(function() {
		var def = input.attr('title');
		if (!input.val() || (input.val() == def)) {
			input.prev('span').css('visibility', '');
			if (def) {
				var dummy = $('<label></label>').text(def).css('visibility','hidden').appendTo('body');
				input.prev('span').css('margin-left', dummy.width() + 3 + 'px');
				dummy.remove();
			}
		} else {
			input.prev('span').css('visibility', 'hidden');
		}
	}, 0);
};

function resetField() {
	var def = $(this).attr('title');
	if (!$(this).val() || ($(this).val() == def)) {
		$(this).val(def);
		$(this).prev('span').css('visibility', '');
	}
};

jQuery(function(){
	if(jQuery.isFunction($.fn.dropkick))
		$('#project-budget').dropkick();

	$('nav #main-nav').localScroll({
		offset: {top:-140},
		duration: 900,
		onBefore: function(e, obj){
			var id = $(obj).attr('ID');
			$('nav ul li a').removeClass('active');
			$('a[rel='+ id + ']').addClass('active');
		}
	});

	$('#logo, #logo-light').localScroll({duration: 900,
		onBefore: function(e, obj){
			$('nav ul li a').removeClass('active');
		}});
	$('section').localScroll({offset: {top:-140}, duration: 900});

	$('#content-wrapper').on({
		mouseenter: function () {
			$('.overlay', this).fadeIn();
		},
		mouseleave: function () {
			$('.overlay', this).fadeOut();
		}
	}, '.team-mate a, .project a');

	$('.contact-link').on({
		click: function (e) {
			e.preventDefault();
			var id = $(this).attr('rel');
			$('#' + id).reveal();
		}
	});

	$("#content-wrapper, .window-wrapper").on({
		mouseenter: function () {			
			$('.expand', this).animate({
				'bottom': 0
			}, 200);
		},
		mouseleave: function () {
		$('.expand', this).animate({
				'bottom': -55
			}, 200);
		}
	}, ".window");

	$('#content-wrapper').on({
		mouseenter: function(){
			rel = $(this).attr('rel');			
			var newClasses = 'well row ' + rel;
			$('.well').attr('class', newClasses);
			servicesText = $(".services-text > li[rel='" + rel +  "']").html();			
			$('#services-message').html(servicesText);			
		}
	}, '.ring');

	$('input, textarea').on('keydown', toggleLabel);
    $('input, textarea').on('paste', toggleLabel);
    $('select').on('change', toggleLabel);

	$('#content-wrapper, .window-wrapper').on({
		click: function (e) {
			e.preventDefault();
			imgHeight = $('#case-study-image').height();
			imgHeight += 290; // add in the padding at the top of the div
			imgHolder = $(this).parent();
			if($(imgHolder).hasClass('expanded')){
				$(window).scrollTo(0, {duration: 1500});
				$(imgHolder).animate({
					'height': 655
				}, 1500, function(){
					$('.expand', this).html('Expand to full view');
					$(this).removeClass('expanded');
				});
			}
			else{
				$(imgHolder).animate({
					'height': imgHeight
				}, 1500, function(){
					$('.expand', this).html('close');
					$(this).addClass('expanded');
				});
			}
		}
	}, '.expand');

	var shownAboutSection = false;
	var shownTeamSection = false;
	function displayImages() {
		var teamMates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		teamMates = shuffle(teamMates);
		var t = $('.team-mate');
		i = 0;
		t.eq(teamMates[i++]).fadeIn(200, displayImages);
	}

	$('#content-wrapper').on({
		inview: function(event, visible) {
					if (visible && !shownAboutSection) 
					{
						var teamMates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
						teamMates = shuffle(teamMates);
						var t = $('.team-mate');
						i = 0;
						shownAboutSection = true;
						(function displayImages() {
							$('.team-mate:eq(' + teamMates[i++] + ')')
							.css('visibility','visible')
							.hide()
							.fadeIn(100, displayImages);
						})();
					}
				}
			}
		, '#team-grid');

	$('#content-wrapper').on({
		inview: function(event, visible) {
			if (visible && !shownTeamSection) 
			{
				var projects = [0, 1, 2, 3, 4, 5, 6, 7, 8];
				projects = shuffle(projects);
				x = 0;
				shownTeamSection = true;
				(function displayImages() {
					$('.project:eq(' + projects[x++] + ')')
					.css('visibility','visible')
					.hide()
					.fadeIn(100, displayImages);
				})();
			}
		} 
	}, '#projects-grid');

	$('.team-mate a').on('click', function(e){
		//e.preventDefault();
	});

	$('#content-wrapper').on({		
		click:function(e){    	
				e.preventDefault();				
				var l = $(this).attr('rel');
				$('.addresses li a').removeClass('selected');
				$(this).addClass('selected');			
				map.setView(new L.LatLng(locations[l][0], locations[l][1]), 16);				
				markers[l].openPopup();
			}
		}, 'a.location');

	$('form.contact-form').on('submit', function() {
		var form = this;
		setTimeout(function() {
			$(form).html("<b>Thanks! We'll get back to you soon.</b>");
		}, 100);
	});
	
	preload([
	    'img/employees/davekapp-avatar.png',
	    'img/employees/bentaitelbaum-avatar.png',
	    'img/employees/calvindelamere-avatar.png',	    
	    'img/employees/davidkovsky-avatar.png',	    
	    'img/employees/gabekopley-avatar.png',	    
	    'img/employees/ben.png',
	    'img/employees/calvin.png',
	    'img/employees/chielo.png',
	    'img/employees/dave.png',
	    'img/employees/david.png',
	    'img/employees/gabe.png',
	    'img/employees/gil.png',
	    'img/employees/michael.png',
	    'img/employees/ryan.png',
	    'img/employees/sang.png',	    
	    'img/folio-test.png'
	]);
	

});
