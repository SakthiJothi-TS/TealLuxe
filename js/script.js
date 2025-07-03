//search-cart starts

let input = document.getElementById('search-input');
let texts = ["Search Face Wash", "Try Body Lotion", "Look for Sunscreen", "Find Hair Oil"];
let index = 0, char = 0;

function typeNextSuggestion() {
    let current = texts[index];
    char = 0;
    input.placeholder = "";
    let type = setInterval(() => {
        if (char < current.length) {
            input.placeholder += current.charAt(char++);
        } else {
            clearInterval(type);
            setTimeout(() => {
                index = (index + 1) % texts.length;
                typeNextSuggestion();
            }, 2000); // Wait 2 seconds before next word
        }
    }, 100); // Typing speed
}

typeNextSuggestion();

//search-cart ends



//accordian section starts



  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      items.forEach(i => {
        if (i !== item) {
          i.classList.remove('active');
          i.querySelector('.accordion-header span').textContent = '+';
        }
      });
      const isActive = item.classList.contains('active');
      item.classList.toggle('active');
      header.querySelector('span').textContent = isActive ? '+' : '×';
    });
  });



//filter starts


  const range = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  range.addEventListener('input', () => {
    priceValue.textContent = range.value;
  });

  function toggleDropdown(header) {
    const content = header.nextElementSibling;
    content.classList.toggle("active");
    header.textContent = header.textContent.includes("⌄")
      ? header.textContent.replace("⌄", "⌃")
      : header.textContent.replace("⌃", "⌄");
  }

  function applyFilters() {
    const maxPrice = parseInt(range.value);
    const allProducts = document.querySelectorAll(".product");

    // Get selected values
    const skin = [];
    const makeup = [];
    const color = [];

    document.querySelectorAll(".filter-input:checked").forEach(f => {
      const type = f.dataset.type;
      if (type === "skin") skin.push(f.value);
      else if (type === "makeup") makeup.push(f.value);
      else if (type === "color") color.push(f.value);
    });

    document.querySelectorAll(".skin-type:checked").forEach(el => skin.push(el.value));

    // Filter products
    allProducts.forEach(prod => {
      const price = parseInt(prod.getAttribute('data-price'));
      const prodSkin = prod.dataset.skin;
      const prodMakeup = prod.dataset.makeup;
      const prodColor = prod.dataset.color;

      const matchSkin = skin.length === 0 || skin.includes(prodSkin);
      const matchMakeup = makeup.length === 0 || makeup.includes(prodMakeup);
      const matchColor = color.length === 0 || color.includes(prodColor);
      const matchPrice = isNaN(price) || price <= maxPrice;

      if (matchSkin && matchMakeup && matchColor && matchPrice) {
        prod.style.display = "block";
      } else {
        prod.style.display = "none";
      }
    });
  }

  function resetFilters() {
    document.querySelectorAll(".filter-input").forEach(input => input.checked = false);
    document.querySelectorAll(".skin-type").forEach(el => el.checked = false);
    range.value = 1000;
    priceValue.textContent = '1000';
    document.querySelectorAll(".product").forEach(prod => prod.style.display = "block");
  }

  //parallax

    window.addEventListener("scroll", function () {
    const image = document.querySelector(".story-image img");
    const scrolled = window.scrollY;
    image.style.transform = `translateY(${scrolled * 30}px)`;
  });



  //form validation 


  document.querySelector('.form-box').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop form submit

    // Remove all old error messages
    const oldErrors = document.querySelectorAll('.error-msg');
    oldErrors.forEach(err => err.remove());

    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector('textarea');
    let isValid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, "All Fields are required");
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "All Fields are required");
      isValid = false;
    }

    if (messageInput.value.trim() === '') {
      showError(messageInput, "All Fields are required");
      isValid = false;
    }

    if (isValid) {
      // Optionally show success message here or allow submit
      this.submit(); // Submit form if all valid
    }
  });

  function showError(inputElement, message) {
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '4px';
    error.textContent = message;
    inputElement.insertAdjacentElement('afterend', error);
  }

