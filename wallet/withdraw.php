<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../templates/head.php'); ?>
        <?php include('../../../imports/bignumber.html'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../../../js/validate.js'); ?>"></script>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <title>Withdrawal | Infinex NFT</title>
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
                <h2>Withdraw</h2>
            </div>
            
            <div class="row py-2">
                <div class="col-12">
                    <h3>&#9312 Select NFT to withdraw:</h3>
                </div>
                <div class="col-12 col-lg-6">
                    <?php include(__DIR__.'/../templates/select_nft.php'); ?>
                </div>
            </div>
            
            <div id="withdraw-step2" style="display: none">
                <div class="row py-2">
                    <div class="col-12">
                        <h3>&#9313 Complete withdrawal:</h3>
                    </div>
                </div>
                
                <form id="withdraw-form">
                    <div class="row" id="withdraw-operating-warning">
                        <div class="col-12 py-2">
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-solid fa-plug-circle-xmark fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    Looks like our connection to this network is not working properly.<br>
                                    You can request a withdrawal as normal, but it will be processed with delay.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2">
                            <label for="select-adbk">Address:</label>
                            <?php include(__DIR__.'/../templates/select_nft_adbk.php'); ?>
                            <small id="help-address" class="form-text" style="display: none">Address is invalid</small>
                        </div>
                    </div>
                    
                    <div class="row" id="withdraw-save-wrapper">
                        <div class="col-12 col-lg-6 py-2 my-auto">
                            <div class="pretty p-switch">
                                <input type="checkbox" id="withdraw-save">
                                <div class="state p-primary">
                                    <label for="withdraw-save">Save in address book</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2" id="withdraw-save-expand" style="display: none">
                            <label for="withdraw-save-name">Save as:</label>
                            <input type="text" class="form-control" id="withdraw-save-name">
                            <small id="help-save-name" class="form-text" style="display: none">Invalid name</small>
                        </div>
                    </div>
                    
                    <div class="row d-none" id="withdraw-internal-notice">
                        <div class="col-12 py-2">
                            <div class="alert alert-success d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-solid fa-people-arrows fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    This is the deposit address of another Infinex user.<br>
                                    Withdrawal will be processed internally and you will not pay any fee.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2 order-lg-2">
                            <label for="withdraw-fee">Fee:</label>
                            <input type="text" class="form-control" id="withdraw-fee" readonly>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-4 mt-auto">
                            <input id="withdraw-fee-range" type="range" class="form-range" min="0" max="1" step="1" value="0">
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-5 my-auto">
                            <span class="secondary">Available:</span>
                            <span class="float-end" id="withdraw-balance"></span>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-6 my-auto">
                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                    </div>
                        
                </form>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column">
        
            <div class="row p-2">
                <h3>Last withdrawals</h3>
            </div>
            
            <div id="recent-tx-data">
            </div>
        
        <!-- / Right column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <?php include(__DIR__.'/../templates/tx_history.html'); ?>
        <script src="/nft/wallet/withdraw.js?<?php echo filemtime(__DIR__.'/withdraw.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../../templates/modals.php'); ?>
        <?php include(__DIR__.'/../../../templates/2fa.php'); ?>
        <?php include(__DIR__.'/../templates/mobile_nav.php'); ?>
    
    </body>
</html>
