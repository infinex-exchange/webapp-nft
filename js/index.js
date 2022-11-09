$(document).ready(function() {
    window.renderingStagesTarget = 3;
    
    initCountdowns();
    
    getFeaturedOffers($('#last-minute-data'), {
        auction: true,
        buynow: true,
        sort: 'end_time',
        sort_dir: 'ASC',
        offset: 0
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