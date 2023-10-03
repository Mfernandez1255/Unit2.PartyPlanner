//testing
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events' ;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
  renderEvents();
}
render();

/**
 * Update state with artists from API
 */
async function getEvents() {
  // TODO
  try{

  const response = await fetch(API_URL);
  const json = await response.json();
  state.events = json.data;
     } catch (error){
      console.error(error);
     }
  
  }

/**
 * Render artists from state
 */
function renderEvents() {
  // TODO
  if(!state.events.length){
    eventList.innerHTML = "<li>No events.</li>";
    return;
  }
  const eventCards = state.events.map((event) => {
    const li = document.createElement('li');
      li.innerHTML = `
      <h2>${event.name}</h2>
      <h3>${event.date}</h3>
        <li>${event.location}</li>
         <p>${event.description}</p>`;
      return li;
});
  eventList.replaceChildren(...eventCards);
  }


/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */

async function addEvent(event) {
  event.preventDefault();

  // TODO

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        date: addEventForm.date.value,
        location: addEventForm.location.value,
        description: addEventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
