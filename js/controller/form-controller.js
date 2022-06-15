
import Address from '../models/address.js';
import * as addresService from '../services/address-service.js';

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
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
    
}

 async function handleInputCepChange(event) {
    try {
        const cep = event.target.value;
        const address = await addresService.findByCep(cep);
        
        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        state.address = address;
    
        setFormError("cep", "");
    
        state.inputNunber.focus();
    } catch (e) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        state.inputNunber.value = "";
        setFormError("cep", "Informe um CEP válido");
    }
 }

async function handleBtnSaveClick(event) {
    event.preventDefault();
   
    console.log(event.target);
}

function handleInputNumberChange(event) {
    if(event.target.value === "") {
        setFormError("number", "Campo requerido");
    } else {
        setFormError("number", "");
    }
}

function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

function clearForm() {
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNunber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");
    
    state.inputCep.focus();
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}