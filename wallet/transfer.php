<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../templates/head.php'); ?>
        <?php include('../../../imports/bignumber.html'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../../../js/validate.js'); ?>"></script>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <title>Internal transfer | Infinex NFT</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include(__DIR__.'/../../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/../../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-card ui-column">
        
            <div class="row py-2">
                <h2>Internal transfer</h2>
            </div>
            
            <div class="row py-2">
                <div class="col-12">
                    <h3>&#9312 Select NFT to transfer:</h3>
                </div>
                <div class="col-12 col-lg-6">
                    <?php include(__DIR__.'/../templates/select_nft.php'); ?>
                </div>
            </div>
            
            <div id="transfer-step2" style="display: none">
                <div class="row py-2">
                    <div class="col-12">
                        <h3>&#9313 Complete transfer:</h3>
                    </div>
                </div>
                
                <form id="transfer-form">
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2">
                            <label for="transfer-address">E-mail:</label>
                            <input type="text" class="form-control" id="transfer-address">
                            <small id="help-address" class="form-text" style="display: none">E-mail is invalid</small>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2 order-lg-6 my-auto">
                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                    </div>
                        
                </form>
                
                <div class="row py-2">
                    <div class="col-12">
                        <div class="alert alert-danger d-flex align-items-center my-2" role="alert">
                            <div class="px-2">
                                <i class="fa-solid fa-spell-check fa-2x"></i>
                            </div>
                            <div class="px-2">
                                Make sure the recipient's e-mail address is correct!<br>
                                Transfers to invalid e-mail addresses will also be made to make it impossible to use this form
                                to verify that someone else has an account on Infinex.<br>
                                In case of a mistake, it is possible to recover the funds by contacting the support.
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column">
        
            <div class="row p-2">
                <h3>Last transfers</h3>
            </div>
            
            <div id="recent-tx-data">
            </div>
        
        <!-- / Right column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <?php include(__DIR__.'/../templates/tx_history.html'); ?>
        <script src="/nft/wallet/transfer.js?<?php echo filemtime(__DIR__.'/transfer.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../../templates/modals.php'); ?>
        <?php include(__DIR__.'/../../../templates/2fa.php'); ?>
        <?php include(__DIR__.'/../templates/mobile_nav.php'); ?>
    
    </body>
</html>
