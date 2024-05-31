function loadHTML(url, containerId) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
}
function setActiveMenu(){
    var currentPage = window.location.pathname;

    // Remove leading slash
    currentPage = currentPage.replace(/^\//, '');

    // Remove trailing slash
    currentPage = currentPage.replace(/\/$/, '');

    // Remove file extension if present
    currentPage = currentPage.replace(/\.[^/.]+$/, '');
    console.log(currentPage)
    // Add active class to corresponding menu item
    document.getElementById('menu-' + currentPage).classList.add('active');
}

function loadHead() {
    fetch("common/head.html")
        .then(response => response.text())
        .then(html => {
            const head = document.head || document.getElementsByTagName('head')[0];
            head.insertAdjacentHTML('afterbegin', html);
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
}

// Function to load JavaScript dynamically
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror =  function() {
            console.error('Failed to load script:', url);
            reject(new Error('Failed to load script: ' + url));
        };
        document.body.appendChild(script);
    });
}

// Load the footer HTML content and insert it into the current document
function loadFooter() {
    
    fetch("common/footer.html")
        .then(response => response.text())
        .then(html => {
            const footer = document.getElementsByTagName('footer')[0];
            footer.innerHTML = html;
            
            loadScript('js/jquery-3.4.1.min.js')
                .then(() => {
                    loadScript('https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js'),
                    loadScript('js/bootstrap.js'),
                    loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js'),
                    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap'),
                    loadScript('js/custom.js')

                }).then(() => {
                    console.log('All external scripts loaded successfully.');
                })
                .catch(error => {
                    console.error('Error loading external scripts:', error);
                });
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });

    // Load external scripts after inserting the footer content
    
};

Promise.all([
    loadHead(),
    loadFooter(),
    loadHTML('common/header.html', 'header-container').then( res=>setActiveMenu()),
    loadHTML('common/service.html', 'service-container'),
    loadHTML('common/about.html', 'about-container'),
    loadHTML('common/why.html', 'why-container')
]).then(() => {
    console.log('Head, footer, and header loaded successfully.');
});