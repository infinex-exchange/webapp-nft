$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#adbk-name').on('input', function() {
        if(validateAdbkName($(this).val()))
            $('#help-adbk-name').hide();
        else
            $('#help-adbk-name').show();
    });
});

function removeAdbk(nadbkid) {
    $.ajax({
        url: config.apiUrl + '/nft/wallet/addressbook/delete',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            nadbkid: nadbkid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('.adbk-item[data-nadbkid="' + nadbkid + '"]').remove();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });     
}

function renderAdbkItem(nadbkid, data) {
    return `
        <div class="adbk-item row p-2 hoverable" onClick="mobileAdbkDetails(this)"
            data-nadbkid="${nadbkid}" data-name="${data.name}" data-network="${data.network_description}"
            data-address="${data.address}">
            <div class="my-auto d-none d-lg-block" style="width: 10%">
                <img width="16" height="16" src="${data.icon_url}">
                ${data.network_description}
            </div>
            <div class="my-auto wrap d-none d-lg-block" style="width: 30%">
	            <span class="name">${data.name}</span>
            </div>
            <div class="my-auto wrap d-none d-lg-block" style="width: 35%">
	            ${data.address}
            </div>
            <div class="my-auto text-end d-none d-lg-block" style="width: 20%">
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="showRenameAdbkPrompt(${nadbkid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="removeAdbk(${nadbkid})">Remove</a>
            </div>
            
            <div class="m-auto d-lg-none" style="width: 60px">
                <img width="40" height="40" src="${data.icon_url}">
            </div>
            <div class="d-lg-none" style="width: calc(100% - 60px)">
                <h5 class="secondary name">${data.name}</h5>
                ${data.address}
            </div>
        </div>
    `;
}

function showRenameAdbkPrompt(nadbkid) {
    var item = $('.adbk-item[data-nadbkid="' + nadbkid + '"]');
    var oldName = item.data('name');
    
    $('#adbk-rename-form').unbind('submit');
    $('#adbk-rename-form').submit(function(event) {
        event.preventDefault();
        
        var name = $('#adbk-name').val();
        
        if(!validateAdbkName(name)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-adbk-rename').modal('hide');
        
        $.ajax({
            url: config.apiUrl + '/nft/wallet/addressbook/rename',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                nadbkid: nadbkid,
                new_name: name
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                item.data('name', name);
                item.find('.name').html(name);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });     
    });
    
    $('#adbk-name').val(oldName);
    $('#help-adbk-name').hide();
    $('#modal-adbk-rename').modal('show');
}

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        $.ajax({
            url: config.apiUrl + '/nft/wallet/addressbook',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $.each(data.addressbook, function(nadbkid, data) {
                    $('#adbk-data').append(renderAdbkItem(nadbkid, data));
                });
                        
                $(document).trigger('renderingStage');
            } else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });     
    }
});

function mobileAdbkDetails(item) {
    if($(window).width() > 991) return;
    
    var nadbkid = $(item).data('nadbkid');
    
    $('#madbk-name').html($(item).data('name'));
    $('#madbk-rename-btn').unbind('click').on('click', function() {
        $('#modal-adbk-details').modal('hide');
        showRenameAdbkPrompt(nadbkid);
    });
    $('#madbk-remove-btn').unbind('click').on('click', function() {
        $('#modal-adbk-details').modal('hide');
        removeAdbk(nadbkid);
    });
    $('#madbk-address').html($(item).data('address'));
    $('#madbk-network').html($(item).data('network'));
    
    $('#modal-adbk-details').modal('show');
}