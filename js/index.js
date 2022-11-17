$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    getFeaturedOffers($('#last-minute-data'), {
        auction: true,
        buynow: true,
        sort: 'end_time',
        sort_dir: 'ASC',
        offset: 0
    },
    function(count) {
        $(document).trigger('renderingStage');
    });
    
    getFeaturedOffers($('#featured-nft-data'), {
        auction: true,
        buynow: true,
        sort: 'popularity',
        sort_dir: 'DESC',
        offset: 0
    });
    
    getFeaturedOffers($('#low-price-data'), {
        auction: true,
        buynow: true,
        sort: 'price',
        sort_dir: 'ASC',
        offset: 0
    });
});