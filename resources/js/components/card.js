import View from "./view";
import EditForm from "./edit-form";

class Card {
    constructor(data) {
        this.renderedElement = null;
        this.data = data;
        this.uniqueId = 'card-' + data.id;
        this.render(data);
        this.bindEvents();
    }

    getElement() {
        return this.renderedElement;
    }

    bindEvents() {
        // attach delete event
        const deleteButton = this.renderedElement.querySelector(".btn-delete");
        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault();
            //TODO: convert this to a modal
            const result = confirm("Are you sure to delete this item?");
            if (!result) {
                return;
            }
            // call api to delete the item
            const id = this.data.id;
            try {
                const response = await axios.delete(apiEndpoint + "/" + id);
                // delete the card
                this.renderedElement.remove();
            } catch (error) {
                console.log(error);
            }
        });

        // attach view event
        const viewButton = this.renderedElement.querySelector(".btn-view");
        viewButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const response = await axios.get(apiEndpoint + "/" + this.data.id);
                const view = new View(response.data);
            } catch (error) {
                console.log(error);
            }
        });

        // attach edit event
        const editButton = this.renderedElement.querySelector(".btn-edit");
        editButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const response = await axios.get(apiEndpoint + "/" + this.data.id);
                const editForm = new EditForm(response.data, this);
            } catch (error) {
                console.log(error);
            }
        });
    }

    update (data) {
        // look for the h3 and update it
        const h3 = this.renderedElement.querySelector("h3");
        h3.innerHTML = data.name;

        // update the data
        this.data = data;
    }

    render(obj) {
        this.renderedElement = document.createElement("div");
        this.renderedElement.classList.add("col");
        this.renderedElement.id = this.uniqueId;
        this.renderedElement.innerHTML = `
            <div class="card shadow-sm">        
                <div class="card-body">
                <h3>${obj.name}</h3>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <button type="button"  class="btn btn-sm btn-outline-secondary mr-2 btn-view">View</button>
                    <button type="button"  class="btn btn-sm btn-outline-secondary mr-2 btn-edit">Edit</button>
                    <button type="button"  class="btn btn-sm btn-outline-secondary btn-danger text-white btn-delete">Delete</button>
                    </div>
                </div>
                </div>
            </div>
        `;
    }
}

export default Card;
