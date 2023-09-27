// MODAL

const modal = document.querySelector('.modal')
const classModalButton = document.querySelector('.modal_close')
const modalTrigger = document.querySelector('#btn-get')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''

}

modalTrigger.onclick = () => openModal()
classModalButton.onclick = () => closeModal()

modal.onclick = (event) => {
    if(event.target === modal){
        closeModal()
    }
}

// DZ 3
setTimeout(openModal, 10000)

function checkScroll(){
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        openModal();
        window.removeEventListener('scroll', checkScroll)
    }
}
window.addEventListener('scroll', checkScroll);