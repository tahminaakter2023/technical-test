import { Modal } from "bootstrap";
import Card from './card';

class AddForm {
    constructor() {
        this.renderedElement = document.getElementById('formModal');
        this.bindEvents();
    }

    bindEvents() {
        // update modal title
        const modalTitle = this.renderedElement.querySelector(".modal-title");
        // btn-submit label
        const btnSubmit = this.renderedElement.querySelector(".btn-submit");
        btnSubmit.innerHTML = "Add";

        modalTitle.innerHTML = "Add New Famouse Name ";

        // attch click event to submit button and clear any previous event
        btnSubmit.removeEventListener("click", this.submit);

        document.getElementById("Name").value = '';
        document.getElementById("lat").value = '';
        document.getElementById("lng").value = '';

        // load the modal
        var modal = new Modal(this.renderedElement, {
            keyboard: false
        });

        // show the modal
        modal.show();

        const self = this;

        btnSubmit.addEventListener("click", async function (e) {
            e.preventDefault();
              const data = {
                name: document.getElementById("Name").value,
                lat: document.getElementById("lat").value,
                lng: document.getElementById("lng").value,
            };
            
            // call api to add new the item

            try {
                const response = await axios.post(apiEndpoint, data);
                // add new card
                const card = new Card(response.data);
                const fragment = document.createDocumentFragment();
                fragment.appendChild(card.getElement());
                rootelement.appendChild(fragment);
            } catch (error) {
                console.log(error);
            }

            modal.hide();
        });
    }
}

export default AddForm;
