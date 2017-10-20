(function () {

    //loading css for modal and fonts

    let link=document.createElement('link');
    link.rel='stylesheet';
    link.href= 'https://fonts.googleapis.com/css?family=Days+One';
    document.getElementsByTagName('head')[0].appendChild(link);
    link=document.createElement('link');
    link.rel='stylesheet';
    link.href= 'https://fonts.googleapis.com/css?family=Roboto';
    document.getElementsByTagName('head')[0].appendChild(link);
    link=document.createElement('link');
    //link.href='https://netwaechter.de/bitrix/templates/site/css/nw_embed_v1_style.css';
    link.href='nw_embed_v1_style.css';
    link.rel='stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);

    //set inner HTML for the button
    //currently logo used
    let embed_button = document.createElement('div');
    embed_button.innerHTML = '<img alt="" src="https://netwaechter.de/bitrix/templates/site/images/v1.png">';
    document.getElementById('nw_embed_v1_button').innerHTML = embed_button.innerHTML;

    document.querySelector('#nw_embed_v1_button').addEventListener('click', function() {
        let modal = document.createElement('div');
        modal.setAttribute("id","nw_embed_v1_modal");
        let closeModal = function(){
            document.querySelector('#nw_embed_v1_modal').parentNode.removeChild(document.querySelector('#nw_embed_v1_modal'));
        }
        let xhr;
         
        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            let versions = ["MSXML2.XmlHttp.5.0", 
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0", 
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]
 
             for(let i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
             }
        }
         
        xhr.onreadystatechange = ensureReadiness;
         
        function ensureReadiness() {
            if(xhr.readyState < 4) {
                return;
            }
             
            if(xhr.status !== 200) {
                return;
            }
 
            // all is well  
            if(xhr.readyState === 4) {
                let obj = JSON.parse(xhr.responseText);

                modal.innerHTML = `<div class="nw_embed_v1_new-window">
                <div class="nw_embed_v1_modal-content">
                    <span class="nw_embed_v1_modal_close">✖</span>
                    <img alt="" src="https://netwaechter.de/bitrix/templates/site/images/big-logo.jpg">
                <div class="nw_embed_v1_new-window-top">
                    <strong>NET WÄCHTER has verified this website:</strong>
                </div>
                <div class="nw_embed_v1_new-window-top">
                    <strong>`+obj['DOMAIN']+`</strong>
                </div>
                <div class="nw_embed_v1_clear"></div>
                <table>
                    <tbody>
                        <tr>
                            <td>Website Protection</td>
                            <td>ON</td>
                            <td><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/ok.jpg"></td>
                        </tr>
                        <tr>
                            <td>Attacks blocked</td>
                            <td>`+obj['Attacks blocked']+`</td>
                            <td><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/ok.jpg"></td>
                        </tr>
                        <tr>
                            <td>Antivirus Scan</td>
                            <td>`+obj['Antivirus Scan']+`</td>
                            <td><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/ok.jpg"></td>
                        </tr>
                        <tr>
                            <td>Blacklist check</td>
                            <td>`+obj['Blacklist check']+`</td>
                            <td><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/ok.jpg"></td>
                        </tr>
                        <tr>
                            <td>SSL Validation</td>
                            <td>`+obj['SSL Validation']+`</td>
                            <td><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/ok.jpg"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="nw_embed_v1_clear"></div>
                <div class="nw_embed_v1_new-window-middle">
                    <strong>Website und Online-Shop Schutz? <a href="`+obj['URL']+`" target="_blank" title="NET WÄCHTER">Ja, mit NET WÄCHTER</a></strong>
                </div>
                <div class="nw_embed_v1_clear"></div>
                <div class="nw_embed_v1_new-window-column nw_embed_v1_new-window-column-small"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal1.jpg">Schutz</div>
                <div class="nw_embed_v1_new-window-column"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal2.jpg">Beschleunigung</div>
                <div class="nw_embed_v1_new-window-column"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal3.jpg">Überwachung</div>
                <div class="nw_embed_v1_new-window-column nw_embed_v1_new-window-column-small"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal4.jpg">backup</div>
                <div class="nw_embed_v1_clear"></div>
                <div class="nw_embed_v1_new-window-bottom">© `+(new Date()).getFullYear()+` GZIS. Globales Zentrum für IT-Sicherheit</div></div></div><div id="nw_embed_v1_overlay"></div>`;

              document.body.appendChild(modal);  
              document.querySelector('#nw_embed_v1_overlay').addEventListener('click', function() {
                closeModal();
                });
              document.querySelector('.nw_embed_v1_modal_close').addEventListener('click', function() {
                closeModal();
                });
            }           
        }

        let domain = document.location.host;

        xhr.open('GET', "https://netwaechter.de/api/GetInfoDomain.php?q="+domain, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(null);

    });

})();