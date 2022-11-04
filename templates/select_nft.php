<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-nft" type="text" class="form-control selector-input" placeholder="Select...">
            <i id="select-nft-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-nft-dropdown" class="selector-dropdown">
        <input id="select-nft-search" type="text" placeholder="Search..." class="input-search form-control selector-search">
        <div id="select-nft-data" class="scrollable selector-data"></div>
        <div id="select-nft-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/nft/js/select_nft.js?<?php echo filemtime(__DIR__.'/../js/select_nft.js'); ?>"></script>