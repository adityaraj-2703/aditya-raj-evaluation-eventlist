// API Module
const eventAPIs = (function () {
    const API_URL = "http://localhost:3000";

    async function getEvents() {
        return fetch(`${API_URL}/events`).then(res => res.json());
    }

    async function addEvent(newEvent) {
        return await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent),
        }).then(res => res.json());
    }

    async function updateEvent(id, updatedEvent) {
        return await fetch(`${API_URL}/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEvent),
        }).then(res => res.json());
    }
    async function patchEvent(id, updatedFields) {
        return await fetch(`${API_URL}/events/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedFields),
        }).then(res => res.json());
    }

    async function deleteEvent(id) {
        return await fetch(`${API_URL}/events/${id}`, {
            method: "DELETE",
        }).then(res => res.json());
    }

    return {
        getEvents,
        addEvent,
        updateEvent,
        patchEvent,
        deleteEvent,
    };
})();

// Model
class EventsModel {
    #events;
    constructor(events = []) {
        this.#events = events;
    }

    getEvents() {
        return this.#events;
    }

    setEvents(newEvents) {
        this.#events = newEvents;
    }

    addEvent(event) {
        this.#events.push(event);
    }

    updateEvent(updatedEvent) {
        this.#events = this.#events.map(event =>
            event.id == updatedEvent.id ? updatedEvent : event
        );
    }

    deleteEvent(id) {
        this.#events = this.#events.filter(event => event.id != id);
    }
}

// View
class EventsView {
    constructor() {
        this.addEventBtn = document.querySelector("#add-event-btn");
        this.eventList = document.querySelector("#event-list");
    }

    renderEvents(events) {
        this.eventList.innerHTML = "";
        events.forEach(event => this.renderEventRow(event));
    }

    renderEventRow(event, replaceExisting = false) {
        const row = document.createElement("tr");
        row.setAttribute("id", event.id);
        row.innerHTML = `
            <td>${event.eventName}</td>
            <td>${event.startDate}</td>
            <td>${event.endDate}</td>
            <td>
                <button class="edit-btn">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"></path>
                    </svg>
                </button>
                <button class="delete-btn">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                    </svg>
                </button>
            </td>
        `;
        if(replaceExisting){
            const existingRow = document.getElementById(event.id);
            this.eventList.replaceChild(row, existingRow);
        } else {
            this.eventList.appendChild(row);
        }
        //this.eventList.appendChild(row);
    }

    renderEditRow(event) {
        const row = document.getElementById(event.id);
        row.innerHTML = `
            <td><input type="text" value="${event.eventName}"/></td>
            <td><input type="date" value="${event.startDate}"/></td>
            <td><input type="date" value="${event.endDate}"/></td>
            <td>
                <button class="save-btn">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"/>
                    </svg>
                </button>
                <button class="cancel-btn">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" width="20" height="20">
                        <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"/>
                    </svg>
                </button>
            </td>
        `;
    }

    renderNewEventInputRow() {
        const row = document.createElement("tr");
        row.setAttribute("id", "new");
        row.innerHTML = `
            <td><input type="text" placeholder="Event Name"/></td>
            <td><input type="date"/></td>
            <td><input type="date"/></td>
            <td>
                <button class="save-btn">
                    <svg focusable viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V18M18 12H6" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="cancel-btn">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" width="20" height="20">
                        <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"/>
                    </svg>
                </button>
            </td>
        `;
        this.eventList.appendChild(row);
    }

    removeRow(id) {
        document.getElementById(id).remove();
    }
}

// Controller
class EventsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.init();
    }

    init() {
        this.fetchEvents();
        this.setUpEvents();
    }

    async fetchEvents() {
        const events = await eventAPIs.getEvents();
        this.model.setEvents(events);
        this.view.renderEvents(events);
    }

    setUpEvents() {
        this.view.addEventBtn.addEventListener("click", () => {
            if (!document.getElementById("new")) {
                this.view.renderNewEventInputRow();
            }
        });

        this.view.eventList.addEventListener("click", async (e) => {
            const target = e.target.closest("button");
            if (!target) return;
            const row = target.closest("tr");
            const id = row.getAttribute("id");

            if (target.classList.contains("delete-btn")) {
                await eventAPIs.deleteEvent(id);
                this.model.deleteEvent(id);
                this.view.removeRow(id);
            }

            if (target.classList.contains("edit-btn")) {
                const event = this.model.getEvents().find(ev => ev.id == id);
                this.view.renderEditRow(event);
            }

            if (target.classList.contains("save-btn")) {
                const inputs = row.querySelectorAll("input");
                const [nameInput, startInput, endInput] = inputs;

                if (id === "new") {
                    const newEvent = {
                        eventName: nameInput.value,
                        startDate: startInput.value,
                        endDate: endInput.value,
                    };
                    if (!newEvent.eventName || !newEvent.startDate || !newEvent.endDate) {
                        alert("All fields are required.");
                        return;
                    }
                    const created = await eventAPIs.addEvent(newEvent);
                    this.model.addEvent(created);
                    this.view.removeRow("new");
                    //this.fetchEvents();
                    this.view.renderEventRow(created);
                } else {
                    const updatedEvent = {
                        id: id,
                        eventName: nameInput.value,
                        startDate: startInput.value,
                        endDate: endInput.value,
                    };
                    await eventAPIs.updateEvent(id, updatedEvent);
                    this.model.updateEvent(updatedEvent);
                    //this.fetchEvents();
                    //this.view.removeRow(id);
                    this.view.renderEventRow(updatedEvent,true);
                    
                }
            }

            if (target.classList.contains("cancel-btn")) {
                if (id === "new") {
                    this.view.removeRow("new");
                    //this.fetchEvents();
                } else { 
                    //this.view.removeRow(id);
                    const event = this.model.getEvents().find(ev => ev.id == id);
                    this.view.renderEventRow(event,true);
                }
            }
        });
    }
}

// Initialization
const eventsView = new EventsView();
const eventsModel = new EventsModel();
const eventsController = new EventsController(eventsView, eventsModel);
