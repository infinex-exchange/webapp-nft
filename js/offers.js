$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    gotoUiCard('offers');
    
    getFeaturedOffers($('#offers-data'), {
        auction: true,
        buynow: true,
        sort: 'end_time',
        sort_dir: 'ASC',
        offset: 0
    });
    
    $('#btn-filter').click(function() {
	    gotoUiCard('filter');
    });
});