const inquirer = require('inquirer');
const axios = require('axios');

const API_URL = 'http://data:5000';

// Configure inquirer for Docker environment
inquirer.prompt.prompts.input.prototype.getQuestion = function() {
    return this.opt.message;
};

// Override the default input behavior
inquirer.prompt.prompts.input.prototype.onKeypress = function(e) {
    if (e.key.name === 'return') {
        this.onSubmit(this.value);
    }
};

async function getProducts() {
    try {
        console.log('Fetching products from API...');
        const response = await axios.get(`${API_URL}/api/products`);
        console.log('Products received:', response.data.length);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        return [];
    }
}

async function displayProduct(product) {
    if (!product) {
        console.error('No product data received');
        return;
    }
    console.log('\nProduct Details:');
    console.log('----------------');
    console.log(`Name: ${product.name}`);
    console.log(`Brand: ${product.brand}`);
    console.log(`Price: $${product.price}`);
    console.log('Specifications:');
    console.log(`  Processor: ${product.specs.processor}`);
    console.log(`  RAM: ${product.specs.ram}`);
    console.log(`  Storage: ${product.specs.storage}`);
    console.log(`  GPU: ${product.specs.gpu}`);
    console.log('----------------\n');
}

async function promptUser(message, validate) {
    console.log(message);
    return new Promise((resolve) => {
        process.stdin.once('data', (data) => {
            const input = data.toString().trim();
            if (validate && !validate(input)) {
                console.log('Invalid input. Please try again.');
                promptUser(message, validate).then(resolve);
            } else {
                resolve(input);
            }
        });
    });
}

async function main() {
    console.log('Starting application...');
    let totalPrice = 0;
    let continueShopping = true;

    while (continueShopping) {
        const products = await getProducts();
        if (!products || products.length === 0) {
            console.error('No products available');
            return;
        }
        
        console.log(`Found ${products.length} products`);
        
        const productNumber = await promptUser(
            'Enter a number between 1 and 7 to view a product:',
            (input) => {
                const num = parseInt(input);
                return num >= 1 && num <= 7;
            }
        );

        const selectedProduct = products[parseInt(productNumber) - 1];
        await displayProduct(selectedProduct);

        const wantToPurchase = await promptUser(
            'Do you want to purchase this product? (Y/N):',
            (input) => ['Y', 'N', 'y', 'n'].includes(input.toUpperCase())
        );

        if (wantToPurchase.toUpperCase() === 'Y') {
            totalPrice += selectedProduct.price;
            console.log(`Added ${selectedProduct.name} to your cart.`);
        }

        const continueShoppingAnswer = await promptUser(
            'Do you want to shop for another product? (Y/N):',
            (input) => ['Y', 'N', 'y', 'n'].includes(input.toUpperCase())
        );

        continueShopping = continueShoppingAnswer.toUpperCase() === 'Y';
    }

    console.log('\nThank you for shopping with us!');
    console.log(`Total price: $${totalPrice.toFixed(2)}`);
    console.log('Exiting application...BYE!');
}

console.log('Initializing application...');
main().catch(error => {
    console.error('Application error:', error);
    process.exit(1);
}); 