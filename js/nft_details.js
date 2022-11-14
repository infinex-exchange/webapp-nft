function getNftDetails(nftid, callback = null) {
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
                        <a class="nft-content-link" href="${v}">${v}</a>
                    </li>
                `);
            });
            
            var licenseUrisHtml = '';
            $.each(data.nft.license_uris, function(k, v) {
                licenseUrisHtml += `
                    <li>
                        <a class="nft-content-link" href="${v}">${v}</a>
                    </li>
                `;
            });
            $('#nft-license-uris').html(licenseUrisHtml == '' ? '-' : `<ul class="m-0">${licenseUrisHtml}</ul>`);
            
            var attributesHtml = '';
            $.each(data.nft.attributes, function(k, v) {
                attributesHtml += `
                    <li>
                        <span class="secondary">${v.key}</span>: ${v.value}
                    </li>
                `;
            });
            $('#nft-attributes').html(attributesHtml == '' ? '-' : `<ul class="m-0">${attributesHtml}</ul>`);
            
            if(typeof(data.nft.collection) !== 'undefined') {
                var colNameHtml = data.nft.collection.name;
                
                if(data.nft.collection.icon_url !== null)
                    colNameHtml = `<img src="${data.nft.collection.icon_url}" width="16" height="16"> ${colNameHtml}`;
                
                $('#col-icon-name-wrapper').html(colNameHtml);
                
                $('#col-description').html(data.nft.collection.description === null ? '-' : data.nft.collection.description);
                $('#col-website').html(data.nft.collection.website === null ? '-' :
                    `<a class="nft-content-link" href="${data.nft.collection.website}">${data.nft.collection.website}</a>`);
                $('#col-twitter').html(data.nft.collection.twitter === null ? '-' :
                    `<a class="nft-content-link" href="https://twitter.com/${data.nft.collection.twitter}">@${data.nft.collection.twitter}</a>`);
            }
            else {
                $('#collection-wrapper').hide();
            }
            
            $('#author-id').html(data.nft.author.authorid);
            $('#author-royalty-perc').html(data.nft.author.royalty_perc + '%');
            $('#author-royalty-address').html(data.nft.author.royalty_address === null ? '-' : data.nft.author.royalty_address);
                
            $('#nft-icon-net-wrapper').html(`
                <img src="${data.nft.network.icon_url}" width="16" height="16"> ${data.nft.network.description}
            `);
            
            $.each(data.nft.provenance, function(k, v) {
                if(v.verify_nft_url !== null)
                    $('#nft-provenance').append(`
                        <div class="col-12">
                            <a class="link-ultra" href="${v.verify_nft_url}" target="_blank">
                                <strong>Verify provenance on ${v.name}</strong>
                            </a>
                        </div>
                    `);
                
                if(v.verify_author_url !== null)
                    $('#author-provenance').append(`
                        <div class="col-12">
                            <a class="link-ultra" href="${v.verify_author_url}" target="_blank">
                                <strong>Verify provenance on ${v.name}</strong>
                            </a>
                        </div>
                    `);                    
            });
            
            if($('#nft-provenance').children().length == 0)
                $('#nft-provenance').hide();
            
            if($('#author-provenance').children().length == 0)
                $('#author-provenance').hide();
            
            $(document).trigger('renderingStage');
            
            if(callback != null)
                callback(data.nft);
        }
        
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
}