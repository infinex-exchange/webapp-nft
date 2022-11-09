<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-col" type="text" class="form-control selector-input" placeholder="Select...">
            <i id="select-col-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-col-dropdown" class="selector-dropdown">
        <input id="select-col-search" type="text" placeholder="Search..." class="input-search form-control selector-search">
        <div id="select-col-data" class="scrollable selector-data"></div>
        <div id="select-col-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/nft/js/select_col.js?<?php echo filemtime(__DIR__.'/../js/select_col.js'); ?>"></script>