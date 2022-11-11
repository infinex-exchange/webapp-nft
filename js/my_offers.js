$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    $(document).trigger('renderingStage');
});