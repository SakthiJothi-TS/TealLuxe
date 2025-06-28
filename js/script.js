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


  // let form = document.querySelector('.form-box');

  // form.onsubmit = function (e) {
  //   e.preventDefault();

  //   let name = form.querySelector('input[type="text"]').value;
  //   let email = form.querySelector('input[type="email"]').value;
  //   let message = form.querySelector('textarea').value;

  //   if (name === '' || email === '' || message === '') {
  //     alert("All fields are required.");
  //     return;
  //   }

  //   if (!email.includes('@') || !email.includes('.')) {
  //     alert("Enter a valid email.");
  //     return;
  //   }

  //   alert("Form submitted successfully!");
  //   form.reset();
  // };


  // function toggleFilter() {
  //   const overlay = document.getElementById('filterOverlay');
  //   overlay.classList.toggle('show');
  // }

  // // Optional: update price range live
  // const priceInput = document.getElementById("priceRange");
  // const priceValue = document.getElementById("priceValue");
  // if (priceInput) {
  //   priceInput.oninput = function () {
  //     priceValue.innerText = priceInput.value;
  //   };
  // }

