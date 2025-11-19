// Sample data arrays to simulate a database
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
let staff = JSON.parse(localStorage.getItem('staff')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// Initialize default admin user if not exists
if (!users.some(user => user.username === 'admin')) {
    users.push({
        id: '1',
        username: 'admin',
        password: 'admin123', // In a real app, this should be hashed
        role: 'admin',
        name: 'Administrator'
    });
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if user is logged in
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const sectionElements = {
    dashboard: document.getElementById('dashboard-section'),
    customers: document.getElementById('customers-section'),
    products: document.getElementById('products-section'),
    sales: document.getElementById('sales-section'),
    staff: document.getElementById('staff-section'),
    suppliers: document.getElementById('suppliers-section'),
    reports: document.getElementById('reports-section'),
    backup: document.getElementById('backup-section'),
    users: document.getElementById('users-section')
};

const navLinks = {
    dashboard: document.getElementById('dashboard-link') || document.getElementById('mobile-dashboard-link'),
    customers: document.getElementById('customers-link') || document.getElementById('mobile-customers-link'),
    products: document.getElementById('products-link') || document.getElementById('mobile-products-link'),
    sales: document.getElementById('sales-link') || document.getElementById('mobile-sales-link'),
    staff: document.getElementById('staff-link') || document.getElementById('mobile-staff-link'),
    suppliers: document.getElementById('suppliers-link') || document.getElementById('mobile-suppliers-link'),
    reports: document.getElementById('reports-link') || document.getElementById('mobile-reports-link'),
    backup: document.getElementById('backup-link') || document.getElementById('mobile-backup-link'),
    users: document.getElementById('users-link') || document.getElementById('mobile-users-link')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (currentUser) {
        showMainApp();
    }
    
    // Set up login form event listener
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Set up navigation
    setupNavigation();
    
    // Load initial data
    loadDashboardData();
    loadCustomersTable();
    loadProductsTable();
    loadSalesTable();
    loadSuppliersTable();
    loadStaffTable();
    
    // Initialize default products if none exist
    initializeDefaultProducts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Handle window resize for responsive adjustments
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
});

// Function to handle window resize events
function handleWindowResize() {
    // Close any open modals when window is resized significantly
    const modals = document.querySelectorAll('.modal');
    if (window.innerWidth < 768) {
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                modal.remove();
            }
        });
    }
}

// Function to initialize default products
function initializeDefaultProducts() {
    // Check if products already exist
    if (products.length === 0) {
        // Add the 30 default products
        const defaultProducts = [
            {
                id: '1',
                name: 'Paracetamol 500mg',
                description: 'Xanuun/jirro joojiye',
                price: 0.35,
                quantity: 100,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '2',
                name: 'Ibuprofen 400mg',
                description: 'Xanuun/dareer joojiye',
                price: 0.75,
                quantity: 100,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '3',
                name: 'Amoxicillin 500mg',
                description: 'Antibiyootik fudud',
                price: 2.00,
                quantity: 50,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '4',
                name: 'Azithromycin 250/500mg',
                description: 'Antibiyootik xoog leh',
                price: 5.00,
                quantity: 30,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '5',
                name: 'Metronidazole 400/500mg',
                description: 'Caabuq caloosha/infekshan',
                price: 1.50,
                quantity: 40,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '6',
                name: 'ORS (Oral Rehydration Salt)',
                description: 'Fuuq-bax daawo',
                price: 0.35,
                quantity: 200,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '7',
                name: 'Multivitamin Tablets',
                description: 'Fiitamiino guud',
                price: 2.00,
                quantity: 80,
                category: 'supplements',
                expiryDate: '2026-12-31'
            },
            {
                id: '8',
                name: 'Vitamin C Tablets',
                description: 'Dhimista hargabka',
                price: 0.75,
                quantity: 100,
                category: 'supplements',
                expiryDate: '2026-12-31'
            },
            {
                id: '9',
                name: 'Cough Syrup (Adult)',
                description: 'Shuban/hargab',
                price: 1.50,
                quantity: 60,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '10',
                name: 'Cough Syrup (Kids)',
                description: 'Carruurta',
                price: 1.50,
                quantity: 60,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '11',
                name: 'Cetirizine 10mg',
                description: 'Xasaasiyadda',
                price: 0.75,
                quantity: 80,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '12',
                name: 'Loratadine 10mg',
                description: 'Xasaasiyad',
                price: 0.75,
                quantity: 80,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '13',
                name: 'Omeprazole 20mg',
                description: 'Calool xanuun/acid reflux',
                price: 1.50,
                quantity: 50,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '14',
                name: 'Oral antacid syrup',
                description: 'Calool xanuun',
                price: 1.50,
                quantity: 60,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '15',
                name: 'Diclofenac gel',
                description: 'Muruq xanuun',
                price: 1.50,
                quantity: 40,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '16',
                name: 'Hydrocortisone cream',
                description: 'Finan/xasaasiyad maqaarka',
                price: 1.50,
                quantity: 30,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '17',
                name: 'Antiseptic liquid (Dettol, Savlon)',
                description: 'Nadaafadda maqaarka',
                price: 2.00,
                quantity: 40,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '18',
                name: 'Gauze sterile',
                description: 'Nadiifinta dhaawacyada',
                price: 0.35,
                quantity: 100,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '19',
                name: 'Plaster/Band-Aid',
                description: 'Dhaawacyada yaryar',
                price: 0.75,
                quantity: 100,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '20',
                name: 'Cotton + Alcohol pads',
                description: 'Nadaafad',
                price: 0.75,
                quantity: 100,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '21',
                name: 'Digital Thermometer',
                description: 'Cabirka qandhada',
                price: 5.00,
                quantity: 20,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '22',
                name: 'Blood Pressure Machine',
                description: 'Cadaadiska dhiigga',
                price: 20.00,
                quantity: 10,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '23',
                name: 'Glucometer + strips',
                description: 'Macaanka',
                price: 15.00,
                quantity: 15,
                category: 'personal-care',
                expiryDate: '2026-12-31'
            },
            {
                id: '24',
                name: 'Insulin (mix/rapid)',
                description: 'Macaanka',
                price: 10.00,
                quantity: 25,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '25',
                name: 'Salbutamol Inhaler',
                description: 'Neefka (asthma)',
                price: 3.50,
                quantity: 30,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '26',
                name: 'Nebulizer solution',
                description: 'Neefka',
                price: 3.00,
                quantity: 35,
                category: 'prescription',
                expiryDate: '2026-12-31'
            },
            {
                id: '27',
                name: 'Zinc tablets',
                description: 'Daaweynta shubanka',
                price: 0.75,
                quantity: 100,
                category: 'supplements',
                expiryDate: '2026-12-31'
            },
            {
                id: '28',
                name: 'ORS + Zinc Combo',
                description: 'Carruurta',
                price: 1.50,
                quantity: 80,
                category: 'otc',
                expiryDate: '2026-12-31'
            },
            {
                id: '29',
                name: 'Prenatal vitamins',
                description: 'Haweenka uurka leh',
                price: 4.00,
                quantity: 40,
                category: 'supplements',
                expiryDate: '2026-12-31'
            },
            {
                id: '30',
                name: 'Adrenaline injection',
                description: 'Xaalad degdeg ah',
                price: 7.50,
                quantity: 20,
                category: 'prescription',
                expiryDate: '2026-12-31'
            }
        ];
        
        // Add all products to the array
        products = defaultProducts;
        
        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(products));
        
        // Refresh the products table
        loadProductsTable();
        loadDashboardData();
        loadSaleFormDropdowns();
    }
}

// Login functions
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMainApp();
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password';
        document.getElementById('login-error').style.display = 'block';
    }
}

function showMainApp() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-form').reset();
    document.getElementById('login-error').style.display = 'none';
}

// Navigation functions
function setupNavigation() {
    // Set up sidebar navigation links
    Object.keys(navLinks).forEach(key => {
        if (navLinks[key]) {
            navLinks[key].addEventListener('click', function(e) {
                e.preventDefault();
                showSection(key);
            });
        }
    });
    
    // Set up mobile navigation links if they exist
    const mobileNavLinks = {
        dashboard: document.getElementById('mobile-dashboard-link'),
        customers: document.getElementById('mobile-customers-link'),
        products: document.getElementById('mobile-products-link'),
        sales: document.getElementById('mobile-sales-link'),
        staff: document.getElementById('mobile-staff-link'),
        suppliers: document.getElementById('mobile-suppliers-link'),
        reports: document.getElementById('mobile-reports-link'),
        backup: document.getElementById('mobile-backup-link'),
        users: document.getElementById('mobile-users-link')
    };
    
    Object.keys(mobileNavLinks).forEach(key => {
        if (mobileNavLinks[key]) {
            mobileNavLinks[key].addEventListener('click', function(e) {
                e.preventDefault();
                showSection(key);
            });
        }
    });
}

function showSection(sectionName) {
    // Hide all sections
    Object.values(sectionElements).forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    Object.values(navLinks).forEach(link => {
        if (link) {
            link.classList.remove('active');
        }
    });
    
    // Remove active class from all mobile nav links
    const mobileNavLinks = [
        'mobile-dashboard-link', 'mobile-customers-link', 'mobile-products-link',
        'mobile-sales-link', 'mobile-staff-link', 'mobile-suppliers-link',
        'mobile-reports-link', 'mobile-backup-link', 'mobile-users-link'
    ];
    
    mobileNavLinks.forEach(linkId => {
        const link = document.getElementById(linkId);
        if (link) {
            link.classList.remove('active');
        }
    });
    
    // Show selected section
    sectionElements[sectionName].classList.add('active');
    
    // Add active class to the appropriate nav link
    if (navLinks[sectionName]) {
        navLinks[sectionName].classList.add('active');
    }
    
    // Add active class to the appropriate mobile nav link
    const mobileLinkId = 'mobile-' + sectionName + '-link';
    const mobileLink = document.getElementById(mobileLinkId);
    if (mobileLink) {
        mobileLink.classList.add('active');
    }
    
    // Refresh data for the section
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'customers':
            loadCustomersTable();
            break;
        case 'products':
            loadProductsTable();
            break;
        case 'sales':
            loadSalesTable();
            loadSaleFormDropdowns();
            break;
        case 'staff':
            loadStaffTable();
            break;
        case 'suppliers':
            loadSuppliersTable();
            break;
        case 'reports':
            loadReportFormDropdowns();
            break;
        case 'backup':
            // Backup section doesn't need data loading
            break;
        case 'users':
            loadUsersTable();
            break;
    }
}

// Dashboard functions
function loadDashboardData() {
    document.getElementById('total-customers').textContent = customers.length;
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-sales').textContent = sales.length;
    document.getElementById('total-suppliers').textContent = suppliers.length;
    
    // Calculate today's sales
    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter(sale => sale.date === today);
    const todaySalesTotal = todaySales.reduce((total, sale) => total + sale.total, 0);
    document.getElementById('today-sales').textContent = '$' + todaySalesTotal.toFixed(2);
    
    // Calculate low stock items (less than 10)
    const lowStockItems = products.filter(product => product.quantity < 10);
    document.getElementById('low-stock').textContent = lowStockItems.length;
    
    // Active customers (customers with sales)
    const activeCustomerIds = [...new Set(sales.map(sale => sale.customerId))];
    document.getElementById('active-customers').textContent = activeCustomerIds.length;
    
    // Top selling product
    if (sales.length > 0) {
        const productSales = {};
        sales.forEach(sale => {
            if (productSales[sale.productId]) {
                productSales[sale.productId] += sale.quantity;
            } else {
                productSales[sale.productId] = sale.quantity;
            }
        });
        
        let topProductId = null;
        let maxQuantity = 0;
        
        for (const productId in productSales) {
            if (productSales[productId] > maxQuantity) {
                maxQuantity = productSales[productId];
                topProductId = productId;
            }
        }
        
        const topProduct = products.find(product => product.id === topProductId);
        document.getElementById('top-product').textContent = topProduct ? topProduct.name : 'N/A';
    } else {
        document.getElementById('top-product').textContent = 'N/A';
    }
    
    // Update staff count
    document.getElementById('total-staff').innerHTML = staff.length + '<br><small>Staff</small>';
}

// Customer functions
function setupEventListeners() {
    // Customer form events
    document.getElementById('add-customer-btn').addEventListener('click', function() {
        document.getElementById('customer-form-container').classList.remove('hidden');
        document.getElementById('customer-form').reset();
        document.getElementById('customer-id').value = '';
    });
    
    document.getElementById('cancel-customer-btn').addEventListener('click', function() {
        document.getElementById('customer-form-container').classList.add('hidden');
    });
    
    document.getElementById('customer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveCustomer();
    });
    
    // Product form events
    document.getElementById('add-product-btn').addEventListener('click', function() {
        document.getElementById('product-form-container').classList.remove('hidden');
        document.getElementById('product-form').reset();
        document.getElementById('product-id').value = '';
    });
    
    document.getElementById('cancel-product-btn').addEventListener('click', function() {
        document.getElementById('product-form-container').classList.add('hidden');
    });
    
    document.getElementById('product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProduct();
    });
    
    // Sale form events
    document.getElementById('add-sale-btn').addEventListener('click', function() {
        document.getElementById('sale-form-container').classList.remove('hidden');
        document.getElementById('sale-form').reset();
        loadSaleFormDropdowns();
    });
    
    document.getElementById('cancel-sale-btn').addEventListener('click', function() {
        document.getElementById('sale-form-container').classList.add('hidden');
    });
    
    document.getElementById('sale-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSale();
    });
    
    // Add event listener for customer name input autocomplete
    const customerNameInput = document.getElementById('sale-customer-name');
    if (customerNameInput) {
        customerNameInput.addEventListener('input', function() {
            showCustomerAutocomplete(this);
        });
    }
    
    // Supplier form events
    document.getElementById('add-supplier-btn').addEventListener('click', function() {
        document.getElementById('supplier-form-container').classList.remove('hidden');
        document.getElementById('supplier-form').reset();
        document.getElementById('supplier-id').value = '';
    });
    
    document.getElementById('cancel-supplier-btn').addEventListener('click', function() {
        document.getElementById('supplier-form-container').classList.add('hidden');
    });
    
    document.getElementById('supplier-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSupplier();
    });
    
    // Staff form events
    document.getElementById('add-staff-btn').addEventListener('click', function() {
        document.getElementById('staff-form-container').classList.remove('hidden');
        document.getElementById('staff-form').reset();
        document.getElementById('staff-id').value = '';
    });
    
    document.getElementById('cancel-staff-btn').addEventListener('click', function() {
        document.getElementById('staff-form-container').classList.add('hidden');
    });
    
    document.getElementById('staff-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveStaff();
    });
    
    // Backup/Restore events
    document.getElementById('backup-btn').addEventListener('click', function() {
        createBackup();
    });
    
    document.getElementById('restore-btn').addEventListener('click', function() {
        restoreBackup();
    });
    
    // User form events
    document.getElementById('add-user-btn').addEventListener('click', function() {
        document.getElementById('user-form-container').classList.remove('hidden');
        document.getElementById('user-form').reset();
        document.getElementById('user-id').value = '';
    });
    
    document.getElementById('cancel-user-btn').addEventListener('click', function() {
        document.getElementById('user-form-container').classList.add('hidden');
    });
    
    document.getElementById('user-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveUser();
    });
    
    // Report events
    document.getElementById('generate-report-btn').addEventListener('click', function() {
        generateReport();
    });
    
    document.getElementById('export-report-btn').addEventListener('click', function() {
        exportReport();
    });
}

function saveCustomer() {
    const customerId = document.getElementById('customer-id').value;
    const customer = {
        id: customerId || Date.now().toString(),
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        address: document.getElementById('customer-address').value
    };
    
    if (customerId) {
        // Update existing customer
        const index = customers.findIndex(c => c.id === customerId);
        if (index !== -1) {
            customers[index] = customer;
        }
    } else {
        // Add new customer
        customers.push(customer);
    }
    
    // Save to localStorage
    localStorage.setItem('customers', JSON.stringify(customers));
    
    // Refresh table and hide form
    loadCustomersTable();
    document.getElementById('customer-form-container').classList.add('hidden');
    loadDashboardData();
    loadSaleFormDropdowns(); // Update dropdowns in sales form
}

function loadCustomersTable() {
    const tbody = document.querySelector('#customers-table tbody');
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.address || ''}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editCustomer('${customer.id}')" title="Edit Customer">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteCustomer('${customer.id}')" title="Delete Customer">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        document.getElementById('customer-id').value = customer.id;
        document.getElementById('customer-name').value = customer.name;
        document.getElementById('customer-phone').value = customer.phone;
        document.getElementById('customer-address').value = customer.address || '';
        
        document.getElementById('customer-form-container').classList.remove('hidden');
    }
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== customerId);
        localStorage.setItem('customers', JSON.stringify(customers));
        loadCustomersTable();
        loadDashboardData();
        loadSaleFormDropdowns(); // Update dropdowns in sales form
    }
}

// Product functions
function saveProduct() {
    const productId = document.getElementById('product-id').value;
    const product = {
        id: productId || Date.now().toString(),
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        quantity: parseInt(document.getElementById('product-quantity').value),
        category: document.getElementById('product-category').value,
        expiryDate: document.getElementById('product-expiry').value
    };
    
    if (productId) {
        // Update existing product
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = product;
        }
    } else {
        // Add new product
        products.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Refresh table and hide form
    loadProductsTable();
    document.getElementById('product-form-container').classList.add('hidden');
    loadDashboardData();
    loadSaleFormDropdowns(); // Update dropdowns in sales form
}

function loadProductsTable() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>
                <span class="category-badge category-${product.category}">
                    ${product.category.replace('-', ' ')}
                </span>
            </td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${product.expiryDate || 'N/A'}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editProduct('${product.id}')" title="Edit Product">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteProduct('${product.id}')" title="Delete Product">
                    <i class="fas fa-trash"></i> Delete
                </button>
                <button class="view-btn" onclick="viewProduct('${product.id}')" title="View Details">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-quantity').value = product.quantity;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-expiry').value = product.expiryDate || '';
        
        document.getElementById('product-form-container').classList.remove('hidden');
    }
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Format expiry date for display
        const expiryDate = product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'Not provided';
        
        // Create a detailed view modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>Product Details</h3>
                <div class="product-details">
                    <p><strong>ID:</strong> ${product.id}</p>
                    <p><strong>Name:</strong> ${product.name}</p>
                    <p><strong>Category:</strong> 
                        <span class="category-badge category-${product.category}">
                            ${product.category.replace('-', ' ')}
                        </span>
                    </p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${product.quantity}</p>
                    <p><strong>Expiry Date:</strong> ${expiryDate}</p>
                    <p><strong>Description:</strong> ${product.description || 'Not provided'}</p>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="editProduct('${product.id}'); this.closest('.modal').remove()">Edit Product</button>
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        loadProductsTable();
        loadDashboardData();
        loadSaleFormDropdowns(); // Update dropdowns in sales form
    }
}

// Sale functions
function loadSaleFormDropdowns() {
    // Clear customer name field
    document.getElementById('sale-customer-name').value = '';
    document.getElementById('sale-customer').value = '';
    
    // Remove any existing autocomplete dropdown
    const existingDropdown = document.getElementById('customer-autocomplete');
    if (existingDropdown) {
        existingDropdown.remove();
    }
    
    // Populate product dropdown
    const productSelect = document.getElementById('sale-product');
    productSelect.innerHTML = '<option value="">Select a product</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} ($${product.price.toFixed(2)})`;
        productSelect.appendChild(option);
    });
}

// Function to show autocomplete suggestions for customer name
function showCustomerAutocomplete(input) {
    const value = input.value.toLowerCase();
    
    // Remove any existing autocomplete dropdown
    const existingDropdown = document.getElementById('customer-autocomplete');
    if (existingDropdown) {
        existingDropdown.remove();
    }
    
    // If input is empty, don't show suggestions
    if (!value) return;
    
    // Filter customers based on name
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(value)
    );
    
    // If no matches, don't show suggestions
    if (filteredCustomers.length === 0) return;
    
    // Create autocomplete dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'customer-autocomplete';
    dropdown.style.cssText = `
        position: absolute;
        border: 1px solid #ccc;
        border-top: none;
        z-index: 1000;
        background: white;
        max-height: 200px;
        overflow-y: auto;
        width: calc(100% - 2px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    
    // Add suggestions to dropdown
    filteredCustomers.forEach(customer => {
        const suggestion = document.createElement('div');
        suggestion.style.cssText = `
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        `;
        suggestion.textContent = customer.name;
        suggestion.addEventListener('click', function() {
            // Set the customer name and ID
            document.getElementById('sale-customer-name').value = customer.name;
            document.getElementById('sale-customer').value = customer.id;
            // Remove the dropdown
            dropdown.remove();
        });
        suggestion.addEventListener('mouseover', function() {
            suggestion.style.backgroundColor = '#f0f0f0';
        });
        suggestion.addEventListener('mouseout', function() {
            suggestion.style.backgroundColor = 'white';
        });
        dropdown.appendChild(suggestion);
    });
    
    // Position the dropdown below the input
    const rect = input.getBoundingClientRect();
    const container = input.parentElement;
    dropdown.style.top = rect.height + 'px';
    dropdown.style.left = '0';
    
    // Add dropdown to the container
    container.style.position = 'relative';
    container.appendChild(dropdown);
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function closeDropdown(e) {
        if (!container.contains(e.target)) {
            if (dropdown.parentNode) {
                dropdown.remove();
            }
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function saveSale() {
    const customerId = document.getElementById('sale-customer').value;
    const customerName = document.getElementById('sale-customer-name').value.trim();
    const productId = document.getElementById('sale-product').value;
    const quantity = parseInt(document.getElementById('sale-quantity').value);
    const discount = parseFloat(document.getElementById('sale-discount').value) || 0;
    
    // Validate required fields
    if (!customerName) {
        alert('Please enter or select a customer name');
        return;
    }
    
    // If customer ID is not set but customer name is entered, try to find a matching customer
    if (!customerId && customerName) {
        const matchingCustomer = customers.find(c => 
            c.name.toLowerCase() === customerName.toLowerCase()
        );
        
        if (matchingCustomer) {
            // Auto-set the customer ID if there's an exact match
            document.getElementById('sale-customer').value = matchingCustomer.id;
        } else {
            alert('Please select a valid customer from the suggestions or create a new customer first');
            return;
        }
    }
    
    if (!customerId) {
        alert('Please select a valid customer from the suggestions');
        return;
    }
    
    if (!productId) {
        alert('Please select a product');
        return;
    }
    
    if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    const customer = customers.find(c => c.id === customerId);
    const product = products.find(p => p.id === productId);
    
    if (!customer) {
        alert('Selected customer not found in the system');
        return;
    }
    
    if (!product) {
        alert('Selected product not found in the system');
        return;
    }
    
    if (quantity > product.quantity) {
        alert('Insufficient product quantity available. Available: ' + product.quantity);
        return;
    }
    
    // Calculate total
    const subtotal = product.price * quantity;
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal - discountAmount;
    
    const sale = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        customerId: customer.id,
        customerName: customer.name,
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        unitPrice: product.price,
        discount: discount,
        total: total
    };
    
    // Add sale
    sales.push(sale);
    
    // Update product quantity
    product.quantity -= quantity;
    
    // Save to localStorage
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('products', JSON.stringify(products));
    
    // Refresh tables and hide form
    loadSalesTable();
    loadProductsTable();
    document.getElementById('sale-form-container').classList.add('hidden');
    loadDashboardData();
}

function loadSalesTable() {
    const tbody = document.querySelector('#sales-table tbody');
    tbody.innerHTML = '';
    
    sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.date}</td>
            <td>${sale.customerName}</td>
            <td>${sale.productName}</td>
            <td>${sale.quantity}</td>
            <td>$${sale.total.toFixed(2)}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="printReceipt('${sale.id}')" title="Print Receipt">
                    <i class="fas fa-print"></i> Print
                </button>
                <button class="edit-btn" onclick="exportSale('${sale.id}')" title="Export Sale" style="margin-left: 5px;">
                    <i class="fas fa-file-export"></i> Export
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function printReceipt(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Sale Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
                    .receipt-header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 20px; }
                    .pharmacy-logo { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #3498db; margin: 0 auto 10px; display: block; }
                    .receipt-details { margin-bottom: 20px; }
                    .receipt-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
                    .receipt-total { border-top: 2px dashed #000; padding-top: 10px; font-weight: bold; }
                    .text-center { text-align: center; }
                </style>
            </head>
            <body>
                <div class="receipt-header">
                    <img src="images/logo.jpg" alt="Ala Aamin Pharmacy Logo" class="pharmacy-logo">
                    <h2>Ala Aamin Pharmacy</h2>
                    <p>Receipt of Sale</p>
                </div>
                
                <div class="receipt-details">
                    <p><strong>Date:</strong> ${sale.date}</p>
                    <p><strong>Customer:</strong> ${sale.customerName}</p>
                    <p><strong>Product:</strong> ${sale.productName}</p>
                    
                    <div class="receipt-item">
                        <span>Unit Price:</span>
                        <span>$${sale.unitPrice.toFixed(2)}</span>
                    </div>
                    
                    <div class="receipt-item">
                        <span>Quantity:</span>
                        <span>${sale.quantity}</span>
                    </div>
                    
                    <div class="receipt-item">
                        <span>Subtotal:</span>
                        <span>$${(sale.unitPrice * sale.quantity).toFixed(2)}</span>
                    </div>
                    
                    ${sale.discount > 0 ? `
                    <div class="receipt-item">
                        <span>Discount (${sale.discount}%):</span>
                        <span>-$${((sale.unitPrice * sale.quantity) * (sale.discount / 100)).toFixed(2)}</span>
                    </div>
                    ` : ''}
                    
                    <div class="receipt-item receipt-total">
                        <span>Total:</span>
                        <span>$${sale.total.toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="text-center">
                    <p>Thank you for your purchase!</p>
                    <p>Visit us again</p>
                </div>
                
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `);
        receiptWindow.document.close();
    }
}

function exportSale(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
        // Calculate balance (assuming balance is total - discount)
        const subtotal = sale.unitPrice * sale.quantity;
        const discountAmount = (subtotal * sale.discount / 100);
        const balance = subtotal - discountAmount; // This is the same as sale.total
        
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Sale Export - ${sale.id}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 600px; 
                        margin: 0 auto; 
                        padding: 30px; 
                        background-color: #f9f9f9;
                    }
                    .receipt-container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    }
                    .receipt-header {
                        text-align: center;
                        border-bottom: 3px double #333;
                        padding-bottom: 20px;
                        margin-bottom: 25px;
                    }
                    .pharmacy-logo {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 3px solid #3498db;
                        margin: 0 auto 15px;
                        display: block;
                    }
                    .receipt-header h1 {
                        color: #2c3e50;
                        margin: 0 0 5px 0;
                    }
                    .receipt-header p {
                        color: #7f8c8d;
                        margin: 0;
                    }
                    .receipt-details {
                        margin: 25px 0;
                    }
                    .receipt-details table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    .receipt-details table th,
                    .receipt-details table td {
                        padding: 12px 15px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    .receipt-details table th {
                        background-color: #3498db;
                        color: white;
                        font-weight: bold;
                    }
                    .receipt-details table tr:nth-child(even) {
                        background-color: #f8f9fa;
                    }
                    .receipt-item {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        padding: 8px 0;
                    }
                    .receipt-total {
                        border-top: 2px solid #333;
                        padding-top: 15px;
                        font-weight: bold;
                        font-size: 1.2em;
                        margin-top: 15px;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                        color: #7f8c8d;
                    }
                </style>
            </head>
            <body>
                <div class="receipt-container">
                    <div class="receipt-header">
                        <img src="images/logo.jpg" alt="Ala Aamin Pharmacy Logo" class="pharmacy-logo">
                        <h1>Ala Aamin Pharmacy</h1>
                        <p>Professional Pharmacy Services</p>
                        <p>Sale Receipt Export</p>
                    </div>
                    
                    <div class="receipt-details">
                        <table>
                            <tr>
                                <th>Item</th>
                                <th>Details</th>
                            </tr>
                            <tr>
                                <td><strong>Sale ID</strong></td>
                                <td>${sale.id}</td>
                            </tr>
                            <tr>
                                <td><strong>Date</strong></td>
                                <td>${sale.date}</td>
                            </tr>
                            <tr>
                                <td><strong>Customer Name</strong></td>
                                <td>${sale.customerName}</td>
                            </tr>
                            <tr>
                                <td><strong>Product Name</strong></td>
                                <td>${sale.productName}</td>
                            </tr>
                            <tr>
                                <td><strong>Quantity</strong></td>
                                <td>${sale.quantity}</td>
                            </tr>
                            <tr>
                                <td><strong>Unit Price</strong></td>
                                <td>$${sale.unitPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Subtotal</strong></td>
                                <td>$${(sale.unitPrice * sale.quantity).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Discount</strong></td>
                                <td>${sale.discount}%</td>
                            </tr>
                            <tr>
                                <td><strong>Discount Amount</strong></td>
                                <td>$${discountAmount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Balance</strong></td>
                                <td>$${balance.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td style="font-weight: bold; color: #e74c3c;">$${sale.total.toFixed(2)}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="text-center">
                        <p>Thank you for choosing Ala Aamin Pharmacy!</p>
                        <p>We appreciate your business</p>
                    </div>
                    
                    <div class="footer">
                        <p>Generated on: ${new Date().toLocaleString()}</p>
                        <p>This is an official receipt from Ala Aamin Pharmacy</p>
                    </div>
                </div>
                
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
        `);
        receiptWindow.document.close();
    }
}

// User management functions
function saveUser() {
    const userId = document.getElementById('user-id').value;
    const user = {
        id: userId || Date.now().toString(),
        name: document.getElementById('user-name').value,
        username: document.getElementById('user-username').value,
        password: document.getElementById('user-password').value,
        role: document.getElementById('user-role').value
    };
    
    // Check if username already exists
    const existingUserIndex = users.findIndex(u => u.username === user.username && u.id !== user.id);
    if (existingUserIndex !== -1) {
        alert('Username already exists!');
        return;
    }
    
    if (userId) {
        // Update existing user
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users[index] = user;
        }
    } else {
        // Add new user
        users.push(user);
    }
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Refresh table and hide form
    loadUsersTable();
    document.getElementById('user-form-container').classList.add('hidden');
}

function loadUsersTable() {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        // Don't show the current user in the list to prevent self-deletion
        if (user.id !== (currentUser ? currentUser.id : '')) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td class="action-buttons">
                    <button class="edit-btn" onclick="editUser('${user.id}')" title="Edit User">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" onclick="deleteUser('${user.id}')" title="Delete User">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        }
    });
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('user-id').value = user.id;
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-username').value = user.username;
        document.getElementById('user-password').value = user.password;
        document.getElementById('user-role').value = user.role;
        
        document.getElementById('user-form-container').classList.remove('hidden');
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
    }
}

// Backup and Restore functions
function createBackup() {
    // Collect all data
    const backupData = {
        customers: customers,
        products: products,
        sales: sales,
        suppliers: suppliers,
        staff: staff,
        users: users,
        backupDate: new Date().toISOString(),
        version: '1.0'
    };
    
    // Create JSON string
    const dataStr = JSON.stringify(backupData, null, 2);
    
    // Create blob and download
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ala-aamin-pharmacy-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Backup created successfully!');
}

function restoreBackup() {
    const fileInput = document.getElementById('restore-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a backup file to restore');
        return;
    }
    
    if (!confirm('Are you sure you want to restore this backup? This will overwrite all current data.')) {
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            
            // Restore data
            customers = backupData.customers || [];
            products = backupData.products || [];
            sales = backupData.sales || [];
            suppliers = backupData.suppliers || [];
            staff = backupData.staff || [];
            users = backupData.users || [];
            
            // Save to localStorage
            localStorage.setItem('customers', JSON.stringify(customers));
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('sales', JSON.stringify(sales));
            localStorage.setItem('suppliers', JSON.stringify(suppliers));
            localStorage.setItem('staff', JSON.stringify(staff));
            localStorage.setItem('users', JSON.stringify(users));
            
            // Refresh all tables
            loadCustomersTable();
            loadProductsTable();
            loadSalesTable();
            loadSuppliersTable();
            loadStaffTable();
            loadUsersTable();
            loadDashboardData();
            
            alert('Backup restored successfully!');
            
            // Clear file input
            fileInput.value = '';
        } catch (error) {
            alert('Error restoring backup: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Staff functions
function saveStaff() {
    const staffId = document.getElementById('staff-id').value;
    const staffMember = {
        id: staffId || Date.now().toString(),
        name: document.getElementById('staff-name').value,
        position: document.getElementById('staff-position').value,
        phone: document.getElementById('staff-phone').value,
        email: document.getElementById('staff-email').value,
        address: document.getElementById('staff-address').value,
        salary: parseFloat(document.getElementById('staff-salary').value) || 0,
        hireDate: document.getElementById('staff-hire-date').value
    };
    
    if (staffId) {
        // Update existing staff
        const index = staff.findIndex(s => s.id === staffId);
        if (index !== -1) {
            staff[index] = staffMember;
        }
    } else {
        // Add new staff
        staff.push(staffMember);
    }
    
    // Save to localStorage
    localStorage.setItem('staff', JSON.stringify(staff));
    
    // Refresh table and hide form
    loadStaffTable();
    document.getElementById('staff-form-container').classList.add('hidden');
    loadDashboardData();
}

function loadStaffTable() {
    const tbody = document.querySelector('#staff-table tbody');
    tbody.innerHTML = '';
    
    staff.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.position}</td>
            <td>${member.phone}</td>
            <td>${member.email || ''}</td>
            <td>$${(member.salary || 0).toFixed(2)}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editStaff('${member.id}')" title="Edit Staff">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteStaff('${member.id}')" title="Delete Staff">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load users table when the page loads
loadUsersTable();

function editStaff(staffId) {
    const member = staff.find(s => s.id === staffId);
    if (member) {
        document.getElementById('staff-id').value = member.id;
        document.getElementById('staff-name').value = member.name;
        document.getElementById('staff-position').value = member.position;
        document.getElementById('staff-phone').value = member.phone;
        document.getElementById('staff-email').value = member.email || '';
        document.getElementById('staff-address').value = member.address || '';
        document.getElementById('staff-salary').value = member.salary || '';
        document.getElementById('staff-hire-date').value = member.hireDate || '';
        
        document.getElementById('staff-form-container').classList.remove('hidden');
    }
}

function deleteStaff(staffId) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        staff = staff.filter(s => s.id !== staffId);
        localStorage.setItem('staff', JSON.stringify(staff));
        loadStaffTable();
        loadDashboardData();
    }
}

// Supplier functions
function saveSupplier() {
    const supplierId = document.getElementById('supplier-id').value;
    const supplier = {
        id: supplierId || Date.now().toString(),
        name: document.getElementById('supplier-name').value,
        contactPerson: document.getElementById('supplier-contact').value,
        phone: document.getElementById('supplier-phone').value,
        email: document.getElementById('supplier-email').value,
        address: document.getElementById('supplier-address').value
    };
    
    if (supplierId) {
        // Update existing supplier
        const index = suppliers.findIndex(s => s.id === supplierId);
        if (index !== -1) {
            suppliers[index] = supplier;
        }
    } else {
        // Add new supplier
        suppliers.push(supplier);
    }
    
    // Save to localStorage
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    
    // Refresh table and hide form
    loadSuppliersTable();
    document.getElementById('supplier-form-container').classList.add('hidden');
    loadDashboardData();
}

function loadSuppliersTable() {
    const tbody = document.querySelector('#suppliers-table tbody');
    tbody.innerHTML = '';
    
    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.contactPerson || ''}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.email || ''}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editSupplier('${supplier.id}')" title="Edit Supplier">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteSupplier('${supplier.id}')" title="Delete Supplier">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editSupplier(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
        document.getElementById('supplier-id').value = supplier.id;
        document.getElementById('supplier-name').value = supplier.name;
        document.getElementById('supplier-contact').value = supplier.contactPerson || '';
        document.getElementById('supplier-phone').value = supplier.phone;
        document.getElementById('supplier-email').value = supplier.email || '';
        document.getElementById('supplier-address').value = supplier.address || '';
        
        document.getElementById('supplier-form-container').classList.remove('hidden');
    }
}

function deleteSupplier(supplierId) {
    if (confirm('Are you sure you want to delete this supplier?')) {
        suppliers = suppliers.filter(s => s.id !== supplierId);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        loadSuppliersTable();
        loadDashboardData();
    }
}

// Report functions
function loadReportFormDropdowns() {
    // Set default dates for report (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('report-start-date').value = startDate.toISOString().split('T')[0];
    document.getElementById('report-end-date').value = endDate.toISOString().split('T')[0];
}

function generateReport() {
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }
    
    // Filter sales by date range
    const filteredSales = sales.filter(sale => {
        return sale.date >= startDate && sale.date <= endDate;
    });
    
    // Populate report table
    const tbody = document.querySelector('#report-table tbody');
    tbody.innerHTML = '';
    
    let totalSales = 0;
    
    filteredSales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.date}</td>
            <td>${sale.customerName}</td>
            <td>${sale.productName}</td>
            <td>${sale.quantity}</td>
            <td>$${sale.total.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
        totalSales += sale.total;
    });
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="4"><strong>Total Sales:</strong></td>
        <td><strong>$${totalSales.toFixed(2)}</strong></td>
    `;
    tbody.appendChild(totalRow);
}

function exportReport() {
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;
    
    // Filter sales by date range
    let filteredSales = sales;
    if (startDate && endDate) {
        filteredSales = sales.filter(sale => {
            return sale.date >= startDate && sale.date <= endDate;
        });
    }
    
    if (filteredSales.length === 0) {
        alert('No sales data to export');
        return;
    }
    
    // Generate HTML for export
    let salesRows = '';
    let totalSales = 0;
    
    filteredSales.forEach(sale => {
        salesRows += `
            <tr>
                <td>${sale.date}</td>
                <td>${sale.customerName}</td>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.total.toFixed(2)}</td>
            </tr>
        `;
        totalSales += sale.total;
    });
    
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sales Report - Ala Aamin Pharmacy</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 0 auto; 
                    padding: 30px; 
                    background-color: #f9f9f9;
                }
                .report-container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }
                .report-header {
                    text-align: center;
                    border-bottom: 3px double #333;
                    padding-bottom: 20px;
                    margin-bottom: 25px;
                }
                .pharmacy-logo {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #3498db;
                    margin: 0 auto 15px;
                    display: block;
                }
                .report-header h1 {
                    color: #2c3e50;
                    margin: 0 0 5px 0;
                }
                .report-header p {
                    color: #7f8c8d;
                    margin: 0;
                }
                .report-details {
                    margin: 25px 0;
                }
                .report-details table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                .report-details table th,
                .report-details table td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                .report-details table th {
                    background-color: #3498db;
                    color: white;
                    font-weight: bold;
                }
                .report-details table tr:nth-child(even) {
                    background-color: #f8f9fa;
                }
                .report-total {
                    border-top: 2px solid #333;
                    padding-top: 15px;
                    font-weight: bold;
                    font-size: 1.2em;
                    margin-top: 15px;
                    text-align: right;
                }
                .report-filters-info {
                    background-color: #eef7ff;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .text-center {
                    text-align: center;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    color: #7f8c8d;
                }
            </style>
        </head>
        <body>
            <div class="report-container">
                <div class="report-header">
                    <img src="images/logo.jpg" alt="Ala Aamin Pharmacy Logo" class="pharmacy-logo">
                    <h1>Ala Aamin Pharmacy</h1>
                    <p>Professional Pharmacy Services</p>
                    <p>Sales Report</p>
                </div>
                
                <div class="report-filters-info">
                    <p><strong>Report Period:</strong> ${startDate || 'All Dates'} to ${endDate || 'All Dates'}</p>
                    <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <div class="report-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${salesRows}
                            <tr>
                                <td colspan="4" style="text-align: right;"><strong>Total Sales:</strong></td>
                                <td><strong>$${totalSales.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="footer">
                    <p>This report contains ${filteredSales.length} sales transactions</p>
                    <p>Official report from Ala Aamin Pharmacy</p>
                </div>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `);
    reportWindow.document.close();
}