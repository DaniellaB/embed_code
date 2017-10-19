(function () {
    let extractRootDomain = function (url) {
        let domain = extractHostname(url),
            splitArr = domain.split('.'),
            arrLen = splitArr.length;
        //extracting the root domain here
        //if there is a subdomain 
        if (arrLen > 2) {
            domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
            //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
            if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) {
                //this is using a ccTLD
                domain = splitArr[arrLen - 3] + '.' + domain;
            }
        }
        return domain;
    }

    //loading css for modal and fonts

    let link=document.createElement('link');
    link.href='https://netwaechter.de/bitrix/templates/site/css/styles.css';
    link.rel='stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
    link=document.createElement('link');
    link.rel='stylesheet';
    link.href= 'https://fonts.googleapis.com/css?family=Days+One';
    document.getElementsByTagName('head')[0].appendChild(link);
    link=document.createElement('link');
    link.rel='stylesheet';
    link.href= 'https://fonts.googleapis.com/css?family=Roboto';
    document.getElementsByTagName('head')[0].appendChild(link);
    link=document.createElement('link');
    link.rel='stylesheet';
    link.href= 'https://fonts.googleapis.com/css?family=Roboto+Condensed';
    document.getElementsByTagName('head')[0].appendChild(link);


    //set inner HTML for the button
    //currently logo used
    let embed_button = document.createElement('div');
    document.getElementById('embed-button').style.cssText = 'background: #fff;-webkit-border-radius: 28;-moz-border-radius: 28;border-radius: 28px; padding: 10px 20px 10px 20px;';
    embed_button.innerHTML = '<img style="margin:0 auto; display:block;" alt="" src="https://netwaechter.de/bitrix/templates/site/images/big-logo.jpg">';
    document.getElementById('embed-button').innerHTML = embed_button.innerHTML;

    document.querySelector('#embed-button').addEventListener('click', function() {
        let modal = document.createElement('div');
        modal.setAttribute("id","modal");
        let closeModal = function(){
            document.querySelector('#modal').parentNode.removeChild(document.querySelector('#modal'));
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

                modal.innerHTML = `<div id="modal1" class="new-window" style="display: block; opacity: 1; top: 2%;">
                <div class="modal-content">
                    <span class="modal_close" style="color:#0b76bd">✖</span>
                    <img alt="" src="https://netwaechter.de/bitrix/templates/site/images/big-logo.jpg">
                <div class="new-window-top">
                    <strong>NET WÄCHTER has verified this website:</strong>
                </div>
                <div class="new-window-top">
                    <strong>`+obj['DOMAIN']+`</strong>
                </div>
                <div class="clear"></div>
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
                <div class="clear"></div>
                <div class="new-window-middle">
                    <strong>Website und Online-Shop Schutz? <a href="`+obj['URL']+`" target="_blank" title="NET WÄCHTER">Ja, mit NET WÄCHTER</a></strong>
                </div>
                <div class="clear"></div>
                <div class="new-window-column new-window-column-small"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal1.jpg">Schutz</div>
                <div class="new-window-column"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal2.jpg">Beschleunigung</div>
                <div class="new-window-column"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal3.jpg">Überwachung</div>
                <div class="new-window-column new-window-column-small"><img alt="" src="https://netwaechter.de/bitrix/templates/site/images/modal4.jpg">backup</div>
                <div class="clear"></div>
                <div class="new-window-bottom">© `+(new Date()).getFullYear()+` GZIS. Globales Zentrum für IT-Sicherheit</div></div></div><div id="overlay" style="display: block;"></div>`;

              document.body.appendChild(modal);  
              document.querySelector('#overlay').addEventListener('click', function() {
                closeModal();
                });
              document.querySelector('.modal_close').addEventListener('click', function() {
                closeModal();
                });
            }           
        }

        //general case
        //let domain = extractRootDomain(document.URL);
        //example case
        let domain = "www.2f-it.de";

        //example request
        //server does not allow test origin by Access-Control-Allow-Origin
        //xhr.open('GET', "https://netwaechter.de/api/GetInfoDomain.php?q="+domain, true);
        //test request to local json-copy of example result
        xhr.open('GET', "/GetInfoDomain.json", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(null);

    });

})();