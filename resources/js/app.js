require('./bootstrap');
window.apiEndpoint = '/api/v1/famous-names';
window.rootelement = document.getElementById('app');

import axios from 'axios';
import Card from './components/card';
import AddForm from './components/add-form';


// call api load all the famars names
axios.get(apiEndpoint).then((res) => {
    const data = res.data.data;
    const fragment = document.createDocumentFragment();
    const cards = [];
    data.forEach((element) => {
        const card = new Card(element);
        fragment.appendChild(card.getElement(element));
        cards.push(card);
    });
    rootelement.appendChild(fragment);

    // attach add event
    const addButton = document.getElementById("btn-add");
    addButton.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            const addForm = new AddForm();
            cards.push(addForm);
        } catch (error) {
            console.log(error);
        }
    });
});
