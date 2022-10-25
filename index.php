<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos NFT</title>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 h-rest pt-2 p-0">
        
            <div class="jumbotron row m-0 px-4 py-5">
                <div class="col-12">
                    <h1>Vayamos NFT</h1>
                    <p>Access cryptocurrency mining profits without building your own infrastructure.<br>
                    Start mining in cloud with everyday payouts!</p>
                </div>
            </div>
            
            <div class="row gx-0 gx-lg-3 gy-3 m-0">
                
                <div class="col-12 plan-item" data-planid="${planid}">
        	        <div class="p-2 p-lg-4 ui-card-light rounded">
        	            <div class="row">
        	                <div class="col-12 pt-2 pb-4">
                                <div class="row">
                                    <div class="col-auto my-auto ms-auto">
        		                        ${icons}
                                    </div>
                                    <div class="col-auto my-auto me-auto">
                                        <h3 class="m-0">${name}</h3>
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6">
                                <div class="row">
                                    <div class="col-12 py-4">
                                        <div class="row">
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Time period
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Return after
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    ROI
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4 pb-4">
                                                <span class="time-period"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="return-after"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="roi"></span>
                                            </div>
                                            
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Daily revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total profit
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4">
                                                <span class="daily-revenue-detailed"></span>
                                                <i class="small daily-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-revenue-detailed"></span>
                                                <i class="small total-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-profit"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-8 col-lg-6 mx-auto sold-out-wrapper">
                                        <img src="/mining/img/sold_out.png" class="img-fluid">
                                    </div>
                                    <div class="col-12 pt-4 pb-2 buy-wrapper">
                                        <input type="range" class="form-range" min="${data.min_ord_units}" max="${data.avbl_units}" step="1" value="${data.min_ord_units}" oninput="recalcPlan(${planid})">
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h3 class="d-inline units"></h3>
                                    </div>
                                    <div class="col-2 my-auto text-center buy-wrapper">
                                        <div class="discount-perc-wrapper d-inline rounded py-2 px-2 px-lg-4 bg-red">
                                            <strong class="discount-perc"></strong>
                                        </div>
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h4 class="price-regular secondary crossed-out m-0"></h4>
                                        <h3 class="price-final m-0"></h3>
                                    </div>
                                    <div class="col-7 buy-wrapper">
                                    </div>
                                    <div class="col-12 col-lg-5 py-4 buy-wrapper">
                                        ${submitHtml}
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6 pt-4">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <h5 class="secondary">
                                            Investment forecast
                                        </h5>
                                    </div>
                                    <div class="forecast-chart"></div>
                                </div>
        		            </div>
        	            </div>
        	        </div>
        	    </div>
                
                <div class="col-12 plan-item" data-planid="${planid}">
        	        <div class="p-2 p-lg-4 ui-card-light rounded">
        	            <div class="row">
        	                <div class="col-12 pt-2 pb-4">
                                <div class="row">
                                    <div class="col-auto my-auto ms-auto">
        		                        ${icons}
                                    </div>
                                    <div class="col-auto my-auto me-auto">
                                        <h3 class="m-0">${name}</h3>
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6">
                                <div class="row">
                                    <div class="col-12 py-4">
                                        <div class="row">
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Time period
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Return after
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    ROI
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4 pb-4">
                                                <span class="time-period"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="return-after"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="roi"></span>
                                            </div>
                                            
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Daily revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total profit
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4">
                                                <span class="daily-revenue-detailed"></span>
                                                <i class="small daily-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-revenue-detailed"></span>
                                                <i class="small total-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-profit"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-8 col-lg-6 mx-auto sold-out-wrapper">
                                        <img src="/mining/img/sold_out.png" class="img-fluid">
                                    </div>
                                    <div class="col-12 pt-4 pb-2 buy-wrapper">
                                        <input type="range" class="form-range" min="${data.min_ord_units}" max="${data.avbl_units}" step="1" value="${data.min_ord_units}" oninput="recalcPlan(${planid})">
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h3 class="d-inline units"></h3>
                                    </div>
                                    <div class="col-2 my-auto text-center buy-wrapper">
                                        <div class="discount-perc-wrapper d-inline rounded py-2 px-2 px-lg-4 bg-red">
                                            <strong class="discount-perc"></strong>
                                        </div>
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h4 class="price-regular secondary crossed-out m-0"></h4>
                                        <h3 class="price-final m-0"></h3>
                                    </div>
                                    <div class="col-7 buy-wrapper">
                                    </div>
                                    <div class="col-12 col-lg-5 py-4 buy-wrapper">
                                        ${submitHtml}
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6 pt-4">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <h5 class="secondary">
                                            Investment forecast
                                        </h5>
                                    </div>
                                    <div class="forecast-chart"></div>
                                </div>
        		            </div>
        	            </div>
        	        </div>
        	    </div>
                
                <div class="col-12 plan-item" data-planid="${planid}">
        	        <div class="p-2 p-lg-4 ui-card-light rounded">
        	            <div class="row">
        	                <div class="col-12 pt-2 pb-4">
                                <div class="row">
                                    <div class="col-auto my-auto ms-auto">
        		                        ${icons}
                                    </div>
                                    <div class="col-auto my-auto me-auto">
                                        <h3 class="m-0">${name}</h3>
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6">
                                <div class="row">
                                    <div class="col-12 py-4">
                                        <div class="row">
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Time period
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Return after
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    ROI
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4 pb-4">
                                                <span class="time-period"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="return-after"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="roi"></span>
                                            </div>
                                            
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Daily revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total profit
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4">
                                                <span class="daily-revenue-detailed"></span>
                                                <i class="small daily-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-revenue-detailed"></span>
                                                <i class="small total-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-profit"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-8 col-lg-6 mx-auto sold-out-wrapper">
                                        <img src="/mining/img/sold_out.png" class="img-fluid">
                                    </div>
                                    <div class="col-12 pt-4 pb-2 buy-wrapper">
                                        <input type="range" class="form-range" min="${data.min_ord_units}" max="${data.avbl_units}" step="1" value="${data.min_ord_units}" oninput="recalcPlan(${planid})">
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h3 class="d-inline units"></h3>
                                    </div>
                                    <div class="col-2 my-auto text-center buy-wrapper">
                                        <div class="discount-perc-wrapper d-inline rounded py-2 px-2 px-lg-4 bg-red">
                                            <strong class="discount-perc"></strong>
                                        </div>
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h4 class="price-regular secondary crossed-out m-0"></h4>
                                        <h3 class="price-final m-0"></h3>
                                    </div>
                                    <div class="col-7 buy-wrapper">
                                    </div>
                                    <div class="col-12 col-lg-5 py-4 buy-wrapper">
                                        ${submitHtml}
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6 pt-4">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <h5 class="secondary">
                                            Investment forecast
                                        </h5>
                                    </div>
                                    <div class="forecast-chart"></div>
                                </div>
        		            </div>
        	            </div>
        	        </div>
        	    </div>
                
                <div class="col-12 plan-item" data-planid="${planid}">
        	        <div class="p-2 p-lg-4 ui-card-light rounded">
        	            <div class="row">
        	                <div class="col-12 pt-2 pb-4">
                                <div class="row">
                                    <div class="col-auto my-auto ms-auto">
        		                        ${icons}
                                    </div>
                                    <div class="col-auto my-auto me-auto">
                                        <h3 class="m-0">${name}</h3>
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6">
                                <div class="row">
                                    <div class="col-12 py-4">
                                        <div class="row">
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Time period
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Return after
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    ROI
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4 pb-4">
                                                <span class="time-period"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="return-after"></span>
                                            </div>
                                            <div class="col-4 pb-4">
                                                <span class="roi"></span>
                                            </div>
                                            
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Daily revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total revenue
                                                </h4>
                                            </div>
                                            <div class="col-4">
                                                <h4 class="secondary">
                                                    Total profit
                                                </h4>
                                            </div>
                                            
                                            <div class="col-4">
                                                <span class="daily-revenue-detailed"></span>
                                                <i class="small daily-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-revenue-detailed"></span>
                                                <i class="small total-revenue-equiv"></i>
                                            </div>
                                            <div class="col-4">
                                                <span class="total-profit"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-8 col-lg-6 mx-auto sold-out-wrapper">
                                        <img src="/mining/img/sold_out.png" class="img-fluid">
                                    </div>
                                    <div class="col-12 pt-4 pb-2 buy-wrapper">
                                        <input type="range" class="form-range" min="${data.min_ord_units}" max="${data.avbl_units}" step="1" value="${data.min_ord_units}" oninput="recalcPlan(${planid})">
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h3 class="d-inline units"></h3>
                                    </div>
                                    <div class="col-2 my-auto text-center buy-wrapper">
                                        <div class="discount-perc-wrapper d-inline rounded py-2 px-2 px-lg-4 bg-red">
                                            <strong class="discount-perc"></strong>
                                        </div>
                                    </div>
                                    <div class="col-5 my-auto text-center buy-wrapper">
                                        <h4 class="price-regular secondary crossed-out m-0"></h4>
                                        <h3 class="price-final m-0"></h3>
                                    </div>
                                    <div class="col-7 buy-wrapper">
                                    </div>
                                    <div class="col-12 col-lg-5 py-4 buy-wrapper">
                                        ${submitHtml}
                                    </div>
                                </div>
        		            </div>
        		            <div class="col-12 col-lg-6 pt-4">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <h5 class="secondary">
                                            Investment forecast
                                        </h5>
                                    </div>
                                    <div class="forecast-chart"></div>
                                </div>
        		            </div>
        	            </div>
        	        </div>
        	    </div>
                
            </div>
            
            <div class="row m-0 px-4 py-5 index-section gy-4">
                <div class="col-12 col-md-6 col-lg-4">
                    <h3>
                        <i class="fa-regular fa-money-bill-1"></i>
                        No additional costs
                    </h3>
                    <span class="secondary">
	                    The price of the mining plan includes all maintenance fees and electricity costs. No additional fees are charged from the mined amount. You get exactly as much crypto as you could mine on your own hardware with the same power.
                    </span>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <h3>
                        <i class="fa-solid fa-microchip"></i>
                        Maintenance free
                    </h3>
                    <span class="secondary">
                        You don't need to have any technical knowledge to start. Just buy a mining plan and watch your profits. Our specialists take care of the proper configuration and maintenance of the mining equipment 24 hours a day.
                    </span>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <h3>
                        <i class="fa-solid fa-temperature-three-quarters"></i>
                        No heat and no noise
                    </h3>
                    <span class="secondary">
                        If you don't have the location to host mining hardware yourself, cloud mining is a perfect choice!
                    </span>
                </div>
            </div>
            
            <div class="row m-0 pb-5">
	            <div class="col-12">
                    <div class="alert alert-danger d-flex align-items-center my-2" role="alert">
                        <div class="px-2">
                            <i class="fa-solid fa-chart-line fa-2x"></i>
                        </div>
                        <div class="px-2">
                            All <span class="billing-asset"></span> estimations are based on the average exchange rate for the last 14 days.<br>
                            All forecasts are based on the current mining profitability of the offered coins.<br>
                            Mining profitability varies all the time. Do your own research before purchasing the service.
                        </div>
                    </div>
                </div>
            </div>
        
        <!-- / Root container -->
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-buy">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to purchase the Mining Cloud contract?
                        <br>
                        The amount of <span id="mcb-price"></span> will be charged from your Vayamos account.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="mcb-buy" type="button" class="btn btn-primary">Buy</button>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include('../../templates/modals.php'); ?>
        <script src="/nft/js/index.js?<?php echo filemtime(__DIR__.'/js/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../templates/footer.html'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
