// PHONE VALIDATOR 

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

// phoneButton.addEventListener('click', () => {
//     console.log('CLICKED!');
// })

const regExp = /^\+996 [5792]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK';
        phoneResult.style.color = 'green';
    }else{
        phoneResult.innerHTML = 'NOT OK';
        phoneResult.style.color = 'red';
    }
}

// // TAB SLIDER
 

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const parentTabs = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((tabContentBlock) => {
        tabContentBlock.style.display = 'none'
    })
    tabItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active');
    })
}

const showTabContent = (indexElement = 0) => {
    tabContentBlocks[indexElement].style.display = 'block';
    tabItems[indexElement].classList.add('tab_content_item_active');
}

hideTabContent()
showTabContent()

parentTabs.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')){
        tabItems.forEach((tabItem, tabIndex) => {
            if(event.target === tabItem){
                hideTabContent();
                showTabContent(tabIndex);
                
            }
        })
    }
}

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if(i > tabContentBlocks.length - 1){
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}

autoSlider()

// CONVERTER

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');
const kzt = document.querySelector('#kzt');
const cny = document.querySelector('#cny');

const converter = (element, target, target2, target3, target4, currency) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();
        
        request.onload = () => {
            const response = JSON.parse(request.response);
            if(currency === 'som'){
                target.value = (element.value / response.usd).toFixed(2);
                target2.value = (element.value / response.eur).toFixed(2);
                target3.value = (element.value / response.kzt).toFixed(2);
                target4.value = (element.value / response.cny).toFixed(2);
            }else if(currency === 'usd'){
                target.value = (element.value * response.usd).toFixed(2);
                target2.value = (element.value * (response.usd / response.eur)).toFixed(2);
                target3.value = (element.value * (response.usd / response.kzt)).toFixed(2);
                target4.value = (element.value * (response.usd / response.cny)).toFixed(2);
            }else if(currency == 'eur'){
                target.value = (element.value * response.eur).toFixed(2);
                target2.value = (element.value * (response.eur / response.usd)).toFixed(2);
                target3.value = (element.value * (response.eur / response.kzt)).toFixed(2);
                target4.value = (element.value * (response.eur / response.cny)).toFixed(2);
            }else if (currency === 'kzt'){
                target.value = (element.value * response.kzt).toFixed(2);
                target2.value = (element.value * (response.kzt / response.usd)).toFixed(2);
                target3.value = (element.value * (response.kzt / response.eur)).toFixed(2);
                target4.value = (element.value * (response.kzt / response.cny)).toFixed(2);
            }else if(currency === 'cny'){
                target.value = (element.value * response.cny).toFixed(2);
                target2.value = (element.value * (response.cny / response.usd)).toFixed(2);
                target3.value = (element.value * (response.cny / response.eur)).toFixed(2);
                target4.value = (element.value * (response.cny / response.kzt)).toFixed(2);
            }

            element.value === '' && (target.value = '');
            element.value === '' && (target2.value = '');
            element.value === '' && (target3.value = '');
            element.value === '' && (target4.value = '');
        }
    }
}
converter(som, usd, eur, kzt, cny, 'som');
converter(usd, som, eur, kzt, cny, 'usd');
converter(eur, som, usd, kzt, cny, 'eur');
converter(kzt, som, usd, eur, cny, 'kzt');
converter(cny, som, usd, eur, kzt, 'cny');


// Card Switcher

const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const bntPrev = document.querySelector('#btn-prev');

let count = 1;

const switcher = (count) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
            `
        })
}

btnNext.onclick = () => {
    if(count === 200){
        count = 1;
    }else{
        count++;
    }
    switcher(count);
}
bntPrev.onclick = () => {
    if(count === 1){
        count = 200;
    }else{
        count--;
    }
    switcher(count);
}

switcher(count)



fetch(`https://jsonplaceholder.typicode.com/posts`)        
    .then(response => response.json())
    .then((data) => {
        console.log(data);

    })
