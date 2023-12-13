import { Modal } from "bootstrap";

class EditForm {
    constructor(data, parent) {
        this.renderedElement = document.getElementById('formModal');
        this.parent = parent;
        this.data = data;
        this.bindEvents();
    }

    bindEvents() {
        // update modal title
        const modalTitle = this.renderedElement.querySelector(".modal-title");
        // btn-submit label
        const btnSubmit = this.renderedElement.querySelector(".btn-submit");
        btnSubmit.innerHTML = "Update";

        modalTitle.innerHTML = "Edit " + this.data.name;

        // attch click event to submit button and clear any previous event
        btnSubmit.removeEventListener("click", this.submit);

        // fill the form with data

        document.getElementById("Name").value = this.data.name;
        document.getElementById("lat").value = this.data.location.lat;
        document.getElementById("lng").value = this.data.location.lng;


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
            
            // call api to update the item

            try {
                const response = await axios.put(apiEndpoint + "/" + self.data.id, data);
                // update the card
                self.parent.update(response.data);
            } catch (error) {
                console.log(error);
            }

            modal.hide();
        });
    }
}

export default EditForm;
