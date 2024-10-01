function toggleMenu() {
    const menu = document.getElementById("side-menu");
    if (menu.style.width === "37vh") {
        menu.style.width = "0"; // Închide meniul
    } else {
        menu.style.width = "37vh"; // Deschide meniul
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const motoText = document.querySelector('.moto h1'); // Selectăm elementul <h1>

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Adaugă clasa 'visible' când este vizibil
            }
        });
    }, {
        threshold: 0.1 // Animația se declanșează când 30% din element este vizibil
    });

    observer.observe(motoText); // Monitorizăm elementul <h1>
});


document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: null, // Obiectul de observare (viewport-ul)
        rootMargin: '0px',
        threshold: 0.1 // Când 10% din element este vizibil
    };

    // Crearea unui observator de intersecție
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adăugăm clasa `visible` pentru a începe animația
                entry.target.classList.add('visible');
                // Optional: Opriți observarea elementului după ce devine vizibil
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Se adaugă observatorul pentru fiecare element "brix"
    document.querySelectorAll('.brix').forEach(brix => {
        observer.observe(brix);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.poza img'); // Selectează elementul imagine
    const maxBlur = 10; // Valoarea maximă a blur-ului în pixeli

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY; // Poziția de scroll de pe verticală
        const maxScroll = 800; // Valoarea la care blur-ul devine maxim, ajustează după cum dorești
        const blurValue = Math.min(maxBlur, (scrollPosition / maxScroll) * maxBlur);
        img.style.filter = `blur(${blurValue}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const brixElements = document.querySelectorAll('.brix');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.01 });

    brixElements.forEach(brix => {
        observer.observe(brix);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const img = document.querySelector('.poza');
    let lastScrollTop = 0;
    let isImageVisible = true;

    // Monitorizează poziția imaginii pentru a determina dacă este vizibilă
    const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isImageVisible = true;
                header.classList.remove('hidden');
            } else {
                isImageVisible = false;
            }
        });
    }, { threshold: 0.1 });

    imgObserver.observe(img);

    // Funcția care se va executa la fiecare mișcare de scroll
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (isImageVisible) {
            // Dacă imaginea este vizibilă, header-ul rămâne fix
            header.style.top = '0';
        } else {
            if (currentScroll < lastScrollTop) {
                // Scroll în sus
                header.style.top = '0';
            } else {
                // Scroll în jos
                header.style.top = `-${header.offsetHeight}px`;
            }
        }

        // Salvează poziția curentă a scroll-ului
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Pentru evitarea valorilor negative
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('header-logo'); // Verifică ID-ul corect
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Scroll-ul se va face într-un mod fluid
            });
        });
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const brichete = document.querySelectorAll('.brix');

    searchBar.addEventListener('input', function () {
        const query = searchBar.value.toLowerCase();
        brichete.forEach(brix => {
            const name = brix.querySelector('p').textContent.toLowerCase();
            if (name.includes(query)) {
                brix.style.display = 'block';
            } else {
                brix.style.display = 'none';
            }
        });
    });
});



// JavaScript pentru toggling bara de căutare
function toggleSearch() {
    const searchContainer = document.querySelector('.search-container');
    const isVisible = searchContainer.classList.contains('show');
    
    if (isVisible) {
        searchContainer.classList.remove('show');
        setTimeout(() => {
            searchContainer.style.display = 'none';
        }, 300); // Întârziere pentru a permite finalizarea animației
    } else {
        searchContainer.style.display = 'block';
        setTimeout(() => {
            searchContainer.classList.add('show');
        }, 10); // Întârziere mică pentru a permite afișarea înainte de animație
    }
}

// Închide bara de căutare dacă se face clic în afara acesteia
document.addEventListener('click', function (event) {
    const searchContainer = document.querySelector('.search-container');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchContainer.contains(event.target) && !searchBtn.contains(event.target)) {
        searchContainer.classList.remove('show');
        setTimeout(() => {
            searchContainer.style.display = 'none';
        }, 300); // Întârziere pentru a permite finalizarea animației
    }
});

//cart
document.addEventListener('DOMContentLoaded', function() {
    let cartItems = [];
    const cartWindow = document.getElementById('cart-window');
    const cartButton = document.getElementById('cart-container');
    const checkoutButton = document.createElement('button');
    checkoutButton.classList.add('checkout-btn');
    checkoutButton.innerText = 'Checkout';
    
    // Functia de animare cand se adauga in cos
    document.querySelectorAll('.acs').forEach((button, index) => {
        button.addEventListener('click', function() {

            


            const productImage = button.previousElementSibling.previousElementSibling;
            const clonedImage = productImage.cloneNode(true);
            clonedImage.style.position = 'absolute';
            clonedImage.style.left = `${productImage.getBoundingClientRect().left}px`;
            clonedImage.style.top = `${productImage.getBoundingClientRect().top}px`;
            clonedImage.style.width = '100px';
            clonedImage.style.zIndex = '1000';
            document.body.appendChild(clonedImage);

            // Animatia
            clonedImage.style.animation = 'moveToCart 0.8s forwards';

            // Eliminam imaginea clonata dupa animatie
            setTimeout(() => clonedImage.remove(), 800);

            // Adaugam produsul in array-ul cartItems
            const productName = button.previousElementSibling.previousElementSibling.alt;
            cartItems.push({ name: productName, quantity: 1 });
            updateCartWindow();
        });
    });

    // Deschiderea coșului de cumpărături
    cartButton.addEventListener('click', function() {
        cartWindow.classList.toggle('active');
    });

    // Functia pentru a actualiza continutul cosului
    function updateCartWindow() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Curățăm conținutul anterior
        
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            cartItemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <div>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Adaugăm butonul Checkout
        cartItemsContainer.appendChild(checkoutButton);
    }

    // Functii pentru modificarea cantitatii
    window.increaseQuantity = function(index) {
        cartItems[index].quantity++;
        updateCartWindow();
    };

    window.decreaseQuantity = function(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            updateCartWindow();
        }
    };

    window.removeItem = function(index) {
        cartItems.splice(index, 1);
        updateCartWindow();
    };
});

// Funcția pentru a deschide/închide coșul
function toggleCart() {
    const cartWindow = document.getElementById('cart-window');
    cartWindow.classList.toggle('active');
}


//side menu inchidere
document.addEventListener('click', function(event) {
    const cartWindow = document.getElementById('cart-window');
    const cartButton = document.getElementById('cart-container');
    const sideMenu = document.getElementById('side-menu');
    const hamburgerButton = document.querySelector('.hamburger');

    // Verifică dacă clicul a fost făcut pe un buton din coș
    if (event.target.closest('button')) {
        // Oprește propagarea evenimentului pentru a preveni închiderea coșului
        event.stopPropagation();
        return;
    }

    // Închide coșul dacă clicul nu este pe coș și pe butonul de deschidere a coșului
    if (!cartWindow.contains(event.target) && !cartButton.contains(event.target)) {
        cartWindow.classList.remove('active');
    }

    // Închide meniul lateral dacă clicul nu este pe meniul lateral și pe butonul de deschidere a meniului
    if (!sideMenu.contains(event.target) && !hamburgerButton.contains(event.target)) {
        sideMenu.style.width = "0";
    }
});

//animatie aduaga in cos

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.acs').forEach(button => {
        button.addEventListener('click', function() {
            // Schimbă textul butonului
            button.innerText = 'Vă Mulțumim!';

            // Adaugă clasa pentru animație
            button.classList.add('animate-border');

            // Îndepărtează clasa după finalizarea animației (1s)
            setTimeout(() => {
                button.classList.remove('animate-border');
                button.innerText = 'Adaugă în coș'; // Revenirea la textul inițial, dacă dorești
            }, 1000);
        });
    });
});

//bazad e date
document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from the server
    fetch('products.php')
        .then(response => response.json())
        .then(products => {
            const bricheteContainer = document.querySelector('.brichete');
            bricheteContainer.innerHTML = ''; // Clear existing content

            products.forEach(product => {
                const productHTML = `
                <div class="brix">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <h4 class="pret">${product.price} Ron</h4>
                    <button class="acs">Adauga in cos</button>
                </div>
                `;
                bricheteContainer.innerHTML += productHTML;
            });

            // Add event listeners for the "Adauga in cos" buttons
            document.querySelectorAll('.acs').forEach(button => {
                button.addEventListener('click', function() {
                    // Handle adding to cart
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
//cechkout

document.addEventListener('DOMContentLoaded', function() {
    fetch('products.php')
        .then(response => response.json())
        .then(products => {
            const bricheteContainer = document.querySelector('.brichete');
            bricheteContainer.innerHTML = ''; // Clear existing content

            products.forEach(product => {
                const productHTML = `
                <div class="brix">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <h4 class="pret">${product.price} Ron</h4>
                    <p>Stock: ${product.stock}</p>
                    <button class="acs" ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock > 0 ? 'Adauga in cos' : 'Stoc Epuizat'}
                    </button>
                </div>
                `;
                bricheteContainer.innerHTML += productHTML;
            });

            // Event listeners for add to cart buttons
            document.querySelectorAll('.acs').forEach((button, index) => {
                button.addEventListener('click', function() {
                    addToCart(products[index]);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

function addToCart(product) {
    const data = new FormData();
    data.append('id', product.id);
    data.append('quantity', 1); // Assuming 1 item per click

    fetch('update_stock.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Item added to cart and stock updated');
            // Update the UI to reflect new stock value
        } else {
            alert(result.message || 'Failed to update stock');
        }
    })
    .catch(error => {
        console.error('Error updating stock:', error);
    });
}

//cart2
document.addEventListener('DOMContentLoaded', function () {
    let cartItems = [];

    // Funcția de adăugare în coș cu animație
    document.querySelectorAll('.acs').forEach((button) => {
        button.addEventListener('click', function () {
            const productElement = button.closest('.brix'); // Selectăm elementul părinte al produsului

            // Preluăm numele produsului
            const productNameElement = productElement.querySelector('p');
            const productName = productNameElement ? productNameElement.textContent : 'Produs necunoscut';

            // Preluăm prețul produsului
            const productPriceElement = productElement.querySelector('.pret');
            if (!productPriceElement) {
                alert('Prețul produsului nu a fost găsit!');
                return;
            }
            const productPrice = productPriceElement.textContent;

            // Extragem doar valoarea numerică a prețului
            const priceValue = parseFloat(productPrice.replace(' Ron', '').trim());
            if (isNaN(priceValue)) {
                alert('Prețul produsului este invalid!');
                return;
            }

            // Animația pentru adăugare în coș
            const productImage = productElement.querySelector('img');
            const clonedImage = productImage.cloneNode(true);
            clonedImage.style.position = 'absolute';
            clonedImage.style.left = `${productImage.getBoundingClientRect().left}px`;
            clonedImage.style.top = `${productImage.getBoundingClientRect().top}px`;
            clonedImage.style.width = '100px';
            clonedImage.style.zIndex = '1000';
            document.body.appendChild(clonedImage);

            // Animăm imaginea
            clonedImage.style.animation = 'moveToCart 0.8s forwards';
            setTimeout(() => clonedImage.remove(), 800);

            // Adăugăm produsul în array-ul cartItems
            const existingItemIndex = cartItems.findIndex(item => item.name === productName);
            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity++;
            } else {
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage // Salvează calea imaginii
                });
            }

            // Actualizăm coșul
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartWindow();
        });
    });

    // Funcția pentru actualizarea coșului
    function updateCartWindow() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Curățăm coșul înainte de a-l reconstrui
    
        let total = 0; // Variabilă pentru total
    
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
    
            // Calculăm totalul
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
    
            // Afișăm produsul, cantitatea și prețul
            cartItemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>${itemTotal.toFixed(2)} Ron</span>
                <div>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    
        // Creăm un div care să conțină atât totalul cât și butonul de checkout
        const totalCheckoutContainer = document.createElement('div');
        totalCheckoutContainer.classList.add('cart-total-checkout');
    
        // Afișăm totalul
        const totalElement = document.createElement('strong');
        totalElement.textContent = `Total: ${total.toFixed(2)} Ron`;
    
        // Creăm butonul de checkout
        const checkoutButton = document.createElement('button');
        checkoutButton.classList.add('checkout-btn');
        checkoutButton.innerText = 'Checkout';
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html'; // Redirecționează către pagina checkout.html
        });
    
        // Adăugăm totalul și butonul în containerul nou creat
        totalCheckoutContainer.appendChild(totalElement);
        totalCheckoutContainer.appendChild(checkoutButton);
    
        // Adăugăm containerul în coș
        cartItemsContainer.appendChild(totalCheckoutContainer);
    }
    

    // Funcția de creștere a cantității
    window.increaseQuantity = function (index) {
        cartItems[index].quantity++;
        updateCartWindow();
    };

    // Funcția de scădere a cantității
    window.decreaseQuantity = function (index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            updateCartWindow();
        }
    };

    // Funcția pentru eliminarea unui produs din coș
    window.removeItem = function (index) {
        cartItems.splice(index, 1);
        updateCartWindow();
    };

    // Funcția pentru gestionarea checkout-ului
    function handleCheckout() {
        if (cartItems.length === 0) {
            alert('Coșul este gol!');
            return;
        }

        // Aici poți implementa logica de trimitere a comenzii (către server sau alt sistem)
        alert('Checkout-ul a fost realizat cu succes! Total: ' + cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2) + ' Ron');
        
        // După checkout, curățăm coșul
        cartItems = [];
        updateCartWindow(); // Resetăm interfața coșului
    }
    
});


//retine cart
document.addEventListener('DOMContentLoaded', function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to save cart items to localStorage
    function saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Function to update the cart window
    function updateCartWindow() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Clear previous cart items

        let total = 0;
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>${itemTotal.toFixed(2)} Ron</span>
                <div>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        const totalElement = document.createElement('strong');
        totalElement.textContent = `Total: ${total.toFixed(2)} Ron`;

        const checkoutButton = document.createElement('button');
        checkoutButton.classList.add('checkout-btn');
        checkoutButton.innerText = 'Checkout';
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html'; // Redirect to checkout
        });

        const totalCheckoutContainer = document.createElement('div');
        totalCheckoutContainer.classList.add('cart-total-checkout');
        totalCheckoutContainer.appendChild(totalElement);
        totalCheckoutContainer.appendChild(checkoutButton);

        cartItemsContainer.appendChild(totalCheckoutContainer);
    }

    // Event listener for adding items to the cart
    document.querySelectorAll('.acs').forEach((button) => {
        button.addEventListener('click', function () {
            const productElement = button.closest('.brix');
            const productName = productElement.querySelector('p').textContent;
            const productPrice = parseFloat(productElement.querySelector('.pret').textContent.replace(' Ron', '').trim());
            const productImage = productElement.querySelector('img').src; // Salvăm calea imaginii

            const existingItemIndex = cartItems.findIndex(item => item.name === productName);
            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity++;
            } else {
              
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage // Salvează calea imaginii
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            saveCartItems(); // Save to localStorage
            updateCartWindow();
        });
    });

    // Function for increasing quantity
    window.increaseQuantity = function (index) {
        cartItems[index].quantity++;
        saveCartItems(); // Save to localStorage
        updateCartWindow();
    };

    // Function for decreasing quantity
    window.decreaseQuantity = function (index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            saveCartItems(); // Save to localStorage
            updateCartWindow();
        }
    };

    // Function for removing items from the cart
    window.removeItem = function (index) {
        cartItems.splice(index, 1);
        saveCartItems(); // Save to localStorage
        updateCartWindow();
    };

    // Initially update the cart window
    updateCartWindow();
});
