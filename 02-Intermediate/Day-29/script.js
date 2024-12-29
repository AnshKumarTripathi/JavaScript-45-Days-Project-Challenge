document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartContainer = document.querySelector(".cart-items");
  const clearCartButton = document.querySelector(".btn-clear-cart");
  const links = document.querySelectorAll("a");

  // Add to Cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productTitle =
        button.parentElement.querySelector(".title-card").textContent;
      cart.push(productTitle);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
      alert("Added to cart!");
    });
  });

  // Update Cart
  function updateCart() {
    if (cartContainer) {
      cartContainer.innerHTML = "";

      cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.textContent = item;
        cartContainer.appendChild(cartItem);
      });
    }
  }

  // Clear Cart functionality
  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      cart.length = 0;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
      alert("Cart cleared!");
    });
  }

  // Initialize cart on page load
  updateCart();

  // Image zoom feature
  const productImages = document.querySelectorAll(".card-container img");
  productImages.forEach((img) => {
    img.addEventListener("mouseover", () => {
      img.style.transform = "scale(1.05)";
    });
    img.addEventListener("mouseout", () => {
      img.style.transform = "scale(1)";
    });
  });

  // Smooth page transitions
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetUrl = link.getAttribute("href");

      // Check if the link is an anchor link (stays on the same page)
      if (targetUrl.startsWith("#")) {
        return;
      }

      // Proceed with fade-out for navigating to a different page
      event.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
});
