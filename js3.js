document.addEventListener('DOMContentLoaded', function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const paymentSection = document.getElementById('payment-section');
    const totalElement = document.getElementById('total');
    const platesteBtn = document.getElementById('platesteBtn');
    

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<h1 style="text-align:center;font-size:50px;">Coșul tău este gol.</h1>';
        paymentSection.classList.add('hidden'); // Hide payment section if cart is empty
    } else {
        displayCartItems(cartItems);
        paymentSection.classList.remove('hidden'); // Show payment section
    }

   

    // Function to display cart items and calculate the total
    function displayCartItems(items) {
        let total = 0;
        cartItemsContainer.innerHTML = ''; // Clear previous items
        const fragment = document.createDocumentFragment(); // Use document fragment to minimize reflows

        items.forEach((item, index) => {
            const cartItemElement = createCartItemElement(item, index);
            fragment.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });

        cartItemsContainer.appendChild(fragment);
        totalElement.innerHTML = `SubTotal: ${total.toFixed(2)} Ron`; // Display total price
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    }

    // Function to create a cart item element
    function createCartItemElement(item, index) {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        const itemTotal = item.price * item.quantity;

        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Preț: ${item.price} Ron</p>
                    <p>Cantitate: 
                        <button class="minus-btn" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="plus-btn" data-index="${index}">+</button>
                    </p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        return cartItemElement;
    }

    // Event delegation to handle button clicks
    cartItemsContainer.addEventListener('click', function (event) {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains('plus-btn')) {
            cartItems[index].quantity++;
        } else if (target.classList.contains('minus-btn')) {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1); // Remove item if quantity reaches 0
            }
        } else if (target.classList.contains('remove-btn')) {
            cartItems.splice(index, 1); // Remove item from cart
        }

        displayCartItems(cartItems); // Re-render the cart and update total
    });

   
});
function triggerConfetti() {
    const end = Date.now() + 3000; // Confetti duration (3 seconds)
    const colors = ["#FFD700", "#ffffff", "#FFDF00", "#D4AC0D", "#DAA520"]; // Confetti colors

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            zIndex: 10000,
            colors: colors,
        });

        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            zIndex: 10000,
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }else {
            // Redirecționează utilizatorul către index.html după terminarea confetti-urilor
            setTimeout(() => {
                window.location.href = "index.html"; // Schimbă pagina
            }, 3000); // Așteaptă 1 secundă înainte de redirecționare
        }
    })();
}



document.addEventListener('DOMContentLoaded', function () {
    const platesteBtn = document.getElementById('platesteBtn');
    const orderForm = document.getElementById('orderForm');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const countySelect = document.getElementById('county');
    const localitySelect = document.getElementById('locality');
    const body = document.body;

    const localities = {
        "Alba": ["Alba Iulia", "Aiud", "Blaj", "Cugir", "Sebeș", "Teiuș", "Zlatna"],
        "Arad": ["Arad", "Ineu", "Lipova", "Pâncota", "Sântana", "Curtici", "Nădlac"],
        "Argeș": ["Pitești", "Câmpulung", "Curtea de Argeș", "Mioveni", "Costești", "Topoloveni"],
        "Bacău": ["Bacău", "Moinești", "Onești", "Comănești", "Dărmănești", "Târgu Ocna"],
        "Bihor": ["Oradea", "Salonta", "Marghita", "Săcueni", "Valea lui Mihai", "Beiuș"],
        "Bistrița-Năsăud": ["Bistrița", "Beclean", "Năsăud", "Sângeorz-Băi"],
        "Botoșani": ["Botoșani", "Dorohoi", "Săveni", "Darabani", "Flămânzi", "Bucecea"],
        "Brașov": ["Brașov", "Făgăraș", "Zărnești", "Săcele", "Codlea", "Râșnov"],
        "Brăila": ["Brăila", "Ianca", "Însurăței", "Făurei"],
        "Buzău": ["Buzău", "Râmnicu Sărat", "Nehoiu", "Pătârlagele", "Pogoanele"],
        "Caraș-Severin": ["Reșița", "Caransebeș", "Bocșa", "Moldova Nouă", "Oravița", "Oțelu Roșu"],
        "Călărași": ["Călărași", "Oltenița", "Budești", "Fundulea"],
        "Cluj": ["Cluj-Napoca", "Turda", "Dej", "Câmpia Turzii", "Gherla", "Huedin"],
        "Constanța": ["Constanța", "Mangalia", "Medgidia", "Năvodari", "Cernavodă", "Ovidiu", "Eforie"],
        "Covasna": ["Sfântu Gheorghe", "Târgu Secuiesc", "Covasna", "Baraolt", "Întorsura Buzăului"],
        "Dâmbovița": ["Târgoviște", "Moreni", "Pucioasa", "Găești", "Titu", "Fieni", "Răcari"],
        "Dolj": ["Craiova", "Băilești", "Calafat", "Filiași", "Dăbuleni", "Segarcea", "Bechet"],
        "Galați": ["Galați", "Tecuci", "Târgu Bujor", "Berești"],
        "Giurgiu": ["Giurgiu", "Bolintin-Vale", "Mihăilești"],
        "Gorj": ["Târgu Jiu", "Motru", "Rovinari", "Bumbești-Jiu", "Târgu Cărbunești", "Țicleni", "Tismana"],
        "Harghita": ["Miercurea Ciuc", "Odorheiu Secuiesc", "Gheorgheni", "Toplița", "Cristuru Secuiesc", "Vlăhița", "Bălan"],
        "Hunedoara": ["Deva", "Hunedoara", "Petroșani", "Vulcan", "Lupeni", "Orăștie", "Brad", "Simeria", "Hațeg"],
        "Ialomița": ["Slobozia", "Fetești", "Urziceni", "Țăndărei", "Amara", "Fierbinți-Târg", "Căzănești"],
        "Iași": ["Iași", "Pașcani", "Târgu Frumos", "Hârlău", "Podu Iloaiei"],
        "Ilfov": ["Buftea", "Bragadiru", "Voluntari", "Pantelimon", "Măgurele", "Chitila", "Otopeni", "Popești-Leordeni"],
        "Maramureș": ["Baia Mare", "Sighetu Marmației", "Borșa", "Vișeu de Sus", "Târgu Lăpuș", "Seini", "Șomcuta Mare", "Ulmeni"],
        "Mehedinți": ["Drobeta-Turnu Severin", "Strehaia", "Orșova", "Vânju Mare", "Baia de Aramă"],
        "Mureș": ["Târgu Mureș", "Reghin", "Sighișoara", "Târnăveni", "Luduș", "Sărmașu", "Sovata", "Iernut"],
        "Neamț": ["Piatra Neamț", "Roman", "Târgu Neamț", "Roznov", "Bicaz"],
        "Olt": ["Slatina", "Caracal", "Balș", "Corabia", "Drăgănești-Olt", "Piatra-Olt", "Potcoava", "Scornicești"],
        "Prahova": ["Ploiești", "Câmpina", "Breaza", "Comarnic", "Vălenii de Munte", "Sinaia", "Bușteni", "Plopeni", "Slănic"],
        "Sălaj": ["Zalău", "Șimleu Silvaniei", "Jibou", "Cehu Silvaniei"],
        "Satu Mare": ["Satu Mare", "Carei", "Negrești-Oaș", "Tășnad", "Livada", "Ardud"],
        "Sibiu": ["Sibiu", "Mediaș", "Cisnădie", "Avrig", "Agnita", "Dumbrăveni", "Miercurea Sibiului", "Ocna Sibiului", "Tălmaciu"],
        "Suceava": ["Suceava", "Fălticeni", "Rădăuți", "Câmpulung Moldovenesc", "Vatra Dornei", "Gura Humorului", "Vicovu de Sus", "Dolhasca", "Liteni", "Salcea"],
        "Teleorman": ["Alexandria", "Turnu Măgurele", "Roșiorii de Vede", "Zimnicea", "Videle"],
        "Timiș": ["Timișoara", "Lugoj", "Sânnicolau Mare", "Jimbolia", "Recaș", "Buziaș", "Deta", "Gătaia", "Ciacova"],
        "Tulcea": ["Tulcea", "Măcin", "Babadag", "Isaccea", "Sulina"],
        "Vaslui": ["Vaslui", "Bârlad", "Huși", "Murgeni"],
        "Vâlcea": ["Râmnicu Vâlcea", "Drăgășani", "Băbeni", "Brezoi", "Bălcești", "Călimănești", "Horezu", "Ocnele Mari", "Băile Olănești"],
        "Vrancea": ["Focșani", "Adjud", "Mărășești", "Panciu", "Odobești"]
    };

    // Când utilizatorul apasă pe butonul Plătește acum, formularul devine vizibil
    platesteBtn.addEventListener('click', function () {
        orderForm.classList.remove('hidden'); // Show the form
        document.body.style.overflow = 'hidden';
        body.classList.add('lock-scroll'); // Blochează scroll-ul pe body

    });

    // Când utilizatorul apasă pe butonul de închidere, formularul se ascunde
    closeFormBtn.addEventListener('click', function () {
        orderForm.classList.add('hidden'); // Hide the form
        document.body.style.overflow = 'auto';
        body.classList.remove('lock-scroll'); // Permite din nou scroll-ul pe body
    });

    // Populate localities based on selected county
    countySelect.addEventListener('change', function () {
        const selectedCounty = this.value;
        localitySelect.innerHTML = '<option value="">Selectați localitatea</option>';

        if (selectedCounty && localities[selectedCounty]) {
            localities[selectedCounty].forEach(function(locality) {
                const option = document.createElement('option');
                option.value = locality;
                option.textContent = locality;
                localitySelect.appendChild(option);
            });
        }
    });
    function clearCart() {
        localStorage.removeItem('cartItems'); // Șterge toate produsele din coș
        cartItemsContainer.innerHTML = '<p>Coșul tău este gol.</p>'; // Actualizează vizual coșul
        paymentSection.classList.add('hidden'); // Ascunde secțiunea de plată
        totalElement.textContent = ''; // Șterge totalul afișat
    }
    // Optional: Handle form submission
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        orderForm.classList.add('hidden'); // Hide the form after submission
        triggerConfetti();
        body.classList.remove('lock-scroll');
        clearCart(); // Golește coșul
       
        
    });
});




//
document.addEventListener('DOMContentLoaded', function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsSummary = document.getElementById('cartItemsSummary'); // Containerul pentru coșul din formular
    const subtotalElement = document.getElementById('subtotal'); // Subtotal în formular
    const totalElement = document.getElementById('totalOrder'); // Total în formular
    const shippingCost = 20.00; // Cost fix de transport

    // Funcția care afișează produsele în formular și calculează subtotalul și totalul
    function displayCartSummary(items) {
        let subtotal = 0;
        cartItemsSummary.innerHTML = ''; // Golește afișajul anterior al produselor din formular

        items.forEach(item => {
            // Creează un element pentru fiecare produs în formular
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name}: </span>
                <span>${(item.price * item.quantity).toFixed(2)} RON [x${item.quantity}]</span>
            `;
            cartItemsSummary.appendChild(itemElement);
            subtotal += item.price * item.quantity; // Calcul subtotal
        });

        subtotalElement.textContent = subtotal.toFixed(2); // Afișează subtotalul în formular
        totalElement.textContent = (subtotal + shippingCost).toFixed(2); // Afișează totalul în formular (subtotal + transport)
    }

    // Afișează doar detaliile coșului din formular la încărcarea paginii (fără a modifica coșul principal)
    if (cartItems.length > 0) {
        displayCartSummary(cartItems); // Afișează produsele și totalurile în formular
    } else {
        cartItemsSummary.innerHTML = '<p>Coșul tău este gol.</p>';
        subtotalElement.textContent = '0.00';
        totalElement.textContent = '0.00';
    }

    // Evenimente pentru butoanele din coș care actualizează doar formularul
    document.addEventListener('click', function (event) {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains('plus-btn')) {
            // Creștem cantitatea în coș și actualizăm formularul
            cartItems[index].quantity++;
            updateCartInStorageAndForm();
        } else if (target.classList.contains('minus-btn')) {
            // Scădem cantitatea, dar minim 1, și actualizăm formularul
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1); // Eliminăm produsul dacă cantitatea devine 0
            }
            updateCartInStorageAndForm();
        } else if (target.classList.contains('remove-btn')) {
            // Eliminăm produsul din coș și actualizăm formularul
            cartItems.splice(index, 1);
            updateCartInStorageAndForm();
        }
    });

    // Funcția care actualizează coșul din localStorage și actualizează doar formularul
    function updateCartInStorageAndForm() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Actualizăm coșul în localStorage
        displayCartSummary(cartItems); // Actualizăm doar sumarul din formular
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.getElementById('checkoutForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const body = document.body;

    // Gestionăm trimiterea formularului
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();  // Oprește trimiterea implicită a formularului

        // Derulăm pagina în sus
        window.scrollTo(0, 0);

        // Setează corpul și formularul să fie complet negre
        body.style.backgroundColor = 'black';
        document.getElementById('orderForm').style.backgroundColor = 'black';

        // Afișează mesajul de confirmare și corectăm poziționarea lui
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.style.display = 'flex';
        confirmationMessage.style.justifyContent = 'center';
        confirmationMessage.style.alignItems = 'center';
        confirmationMessage.style.position = 'fixed'; // Asigură poziționare fixă
        confirmationMessage.style.top = '0';
        confirmationMessage.style.left = '0';
        confirmationMessage.style.width = '100%';
        confirmationMessage.style.height = '100vh'; // Întindem mesajul pe tot ecranul
        confirmationMessage.style.color = 'yellow';
        confirmationMessage.style.fontSize = '50px';
        confirmationMessage.style.textAlign = 'center';
        confirmationMessage.style.backgroundColor = 'black';

        // Declanșăm confetti
        triggerConfetti();

        // Curăță coșul după trimiterea comenzii
        clearCart();
    });
});
