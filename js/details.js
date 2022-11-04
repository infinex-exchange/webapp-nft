$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    var pathArray = window.location.pathname.split('/');
    var nftid = pathArray[pathArray.length - 1];
    
    $.ajax({
        url: config.apiUrl + '/nft/details',
        type: 'POST',
        data: JSON.stringify({
            nftid: nftid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('.nft-name').html(data.nft.name);
            
            if(data.nft.preview != null)
                $('#nft-preview').attr('src', data.nft.preview);
            
            $('#nftid').html(nftid);
            
            $('#nft-description').html(data.nft.description === null ? '-' : data.nft.description);
            
            $('#nft-data-hash').html(data.nft.data_hash);
            
            $.each(data.nft.data_uris, function(k, v) {
                $('#nft-data-uris').append(`
                    <li>
                        <a href="${v}">${v}</a>
                    </li>
                `);
            });
            
            var licenseUrisHtml = '';
            $.each(data.nft.license_uris, function(k, v) {
                licenseUrisHtml += `
                    <li>
                        <a href="${v}">${v}</a>
                    </li>
                `;
            });
            $('#nft-license-uris').html(licenseUrisHtml == '' ? '-' : `<ul>${licenseUrisHtml}</ul>`);
            
            var attributesHtml = '';
            $.each(data.nft.attributes, function(k, v) {
                attributesHtml += `
                    <li>
                        <span class="secondary">${v.key}</span>: ${v.value}
                    </li>
                `;
            });
            $('#nft-attributes').html(attributesHtml == '' ? '-' : `<ul>${attributesHtml}</ul>`);
            
            if(typeof(data.nft.collection) !== 'undefined') {
                var colNameHtml = data.nft.collection.name;
                
                if(data.nft.collection.icon_url !== null)
                    colNameHtml = `<img src="${data.nft.collection.icon_url}" width="16" height="16"> ${colNameHtml}`;
                
                $('#col-icon-name-wrapper').html(colNameHtml);
                
                $('#col-description').html(data.nft.collection.description === null ? '-' : data.nft.collection.description);
                $('#col-website').html(data.nft.collection.website === null ? '-' :
                    `<a href="${data.nft.collection.website}">${data.nft.collection.website}</a>`);
                $('#col-twitter').html(data.nft.collection.twitter === null ? '-' :
                    `<a href="https://twitter.com/${data.nft.collection.twitter}">@${data.nft.collection.twitter}</a>`);
            }
            else {
                $('#collection-wrapper').hide();
            }
            
            $(document).trigger('renderingStage');
        }
        
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
});