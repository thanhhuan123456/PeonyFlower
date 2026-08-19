let cart = [];

// 1. Đóng/Mở Giỏ Hàng
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
}

// 2. Gắn sự kiện Thêm vào giỏ cho các nút "Thêm Vào Giỏ"
document.addEventListener('DOMContentLoaded', () => {
    const addBtns = document.querySelectorAll('.add-cart-btn');
    
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('h3').innerText;
            // Lấy giá tiền và đổi sang dạng số (VD: "1.200.000 VNĐ" -> 1200000)
            const priceText = card.querySelector('.price').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));

            addToCart(title, price);
            toggleCart(); // Tự mở giỏ hàng khi bấm thêm
        });
    });
});

// 3. Hàm Thêm Sản Phẩm
function addToCart(title, price) {
    const existingItem = cart.find(item => item.title === title);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    
    updateCartUI();
}

// 4. Hàm Xóa Sản Phẩm
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 5. Cập nhật giao diện giỏ hàng
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Cập nhật tổng số lượng trên icon
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

    // Cập nhật danh sách item
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Giỏ hàng đang trống</p>';
        cartTotal.innerText = '0 VNĐ';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>${item.price.toLocaleString('vi-VN')} VNĐ x ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Cập nhật tổng tiền
    cartTotal.innerText = totalPrice.toLocaleString('vi-VN') + ' VNĐ';
}

// 6. Nút Thanh toán
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
    } else {
        alert('Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ lại sớm nhất.');
        cart = [];
        updateCartUI();
        toggleCart();
    }
}