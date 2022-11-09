$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    getFeaturedOffers($('#offers-data'), {
        auction: true,
        buynow: true,
        sort: 'end_time',
        sort_dir: 'ASC',
        offset: 0
    });
});