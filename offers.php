<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos NFT</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <div id="main-navbar">
	        <?php include('../../templates/navbar.php'); ?>
	    </div>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0">
        <div class="row m-0">
        
        <!-- Left column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column rest-of-height d-lg-block" data-ui-card="filter">
        <div class="row">
        
            <div class="col pb-4">
                <h3>Filters</h3>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Search:</h5>
            </div>
            <div class="col-12 pb-4">
                <input id="filter-search" type="text" placeholder="Search..." class="input-search form-control">
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Offer type:</h5>
            </div>
            <div class="col-12">
                 <div class="pretty p-icon p-smooth">
                      <input id="filter-buynow" type="checkbox" checked>
                      <div class="state p-primary">
                          <i class="icon fa fa-check"></i>
                          <label>Buy now</label>
                      </div>
                  </div>
            </div>
            <div class="col-12 pb-4">
                <div class="pretty p-icon p-smooth">
                      <input id="filter-auction" type="checkbox" checked>
                      <div class="state p-primary">
                          <i class="icon fa fa-check"></i>
                          <label>Auctions</label>
                      </div>
                  </div>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Collection:</h5>
            </div>
            <div class="col-12 pb-1" id="multiselect-col">
            </div>
            <div class="col-12 pb-4">
                <?php include(__DIR__.'/templates/select_col.php'); ?>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Network:</h5>
            </div>
            <div class="col-12 pb-1" id="multiselect-net">
            </div>
            <div class="col-12 pb-4">
                <?php include(__DIR__.'/../../templates/select_net.php'); ?>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Coin:</h5>
            </div>
            <div class="col-12 pb-1" id="multiselect-coin">
            </div>
            <div class="col-12">
                <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
            </div>
        
        <!-- / Left column -->
        </div>
        </div>
        
        <!-- Main column -->
        <div id="offers" class="col-12 col-lg-9 p-0 ui-card ui-column rest-of-height d-lg-block" data-ui-card="offers">
            <div id="offers-header" class="row pb-2">
                <div class="col-auto my-auto d-none d-lg-block">
	                <h3>Offers list</h3>
	            </div>
	            
	            <div class="col-auto my-auto d-block d-lg-none">
		            <a href="#_" id="btn-filter" class="nav-link">
                        <i class="fa-solid fa-filter"></i>
                        <strong>Filter</strong>
                    </a>
	            </div>
	            
	            <div class="col-auto my-auto ms-auto dropdown">
		            <a href="#_" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				        <i class="fa-solid fa-arrow-up-z-a"></i>
				        <strong>Sort by:</strong>
				        <span id="sort-current"></span>
				    </a>
				    <div class="dropdown-menu dropdown-menu-end">
				        <ul class="nav flex-column">
					        <li>
							    <a class="dropdown-item sort-item active" href="#_" data-sort="popularity" data-sort-dir="DESC">
							        Popularity (highest<span class="d-none d-lg-inline"> to lowest</span>)
							    </a>
							</li>
							<li>
							    <a class="dropdown-item sort-item" href="#_" data-sort="popularity" data-sort-dir="ASC">
							        Popularity (lowest<span class="d-none d-lg-inline"> to highest</span>)
							    </a>
							</li>
                            <li>
							    <a class="dropdown-item sort-item" href="#_" data-sort="end_time" data-sort-dir="ASC">
							        Time to end (shortest<span class="d-none d-lg-inline"> to longest</span>)
							    </a>
							</li>
							<li>
							    <a class="dropdown-item sort-item" href="#_" data-sort="end_time" data-sort-dir="DESC">
							        Time to end (longest<span class="d-none d-lg-inline"> to shortest</span>)
							    </a>
							</li>
                            
                            <li>
							    <a class="dropdown-item sort-item" href="#_" data-sort="price" data-sort-dir="ASC">
							        Price (lowest<span class="d-none d-lg-inline"> to highest</span>)
							    </a>
							</li>
							<li>
							    <a class="dropdown-item sort-item" href="#_" data-sort="price" data-sort-dir="DESC">
							        Price (highest<span class="d-none d-lg-inline"> to lowest</span>)
							    </a>
							</li>
				        </ul>
				    </div>
	            </div>
            </div>
        
            <div class="scrollable" id="offers-content">
                <div class="row" id="offers-data">
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <?php include('../../templates/modals.php'); ?>
        <script src="/nft/js/js_sizing.js?<?php echo filemtime(__DIR__.'/js/js_sizing.js'); ?>"></script>
        <script src="/nft/js/render_offer.js?<?php echo filemtime(__DIR__.'/js/render_offer.js'); ?>"></script>
        <script src="/nft/js/offers.js?<?php echo filemtime(__DIR__.'/js/offers.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
