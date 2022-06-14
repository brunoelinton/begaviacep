
import Address from '../models/address.js';

function State() {
    this.address = new Address();
    this.btnSave = null;
    this.btnClear = null;
    this.inputCep = null;
    this.inputStreet = null;
    this.inputNunber = null;
    this.inputCity = null;
    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();

export function init() {
    state.inputCep = document.forms.newAddres.cep;
    state.inputStreet = document.forms.newAddres.street;
    state.inputNunber = document.forms.newAddres.number;
    state.inputCity = document.forms.newAddres.city;

    state.btnSave = document.forms.newAddres.btnSave;
    state.btnClear = document.forms.newAddres.btnClear;
    
    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');
    
    state.inputNunber.addEventListener('change', handleInputNumberChange);
}

function handleInputNumberChange(event) {
    if(event.target.value === "") {
        setFormError("number", "Campo requerido");
    } else {
        setFormError("number", "");
    }
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}