import { deleteRequest, getRequests, saveCompletion, getPlumbers, getCompletions } from "./dataAccess.js"



export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const completions = getCompletions()

    let html = ""
    html += `<ul>`
    for (let request of requests) {
        const foundCompletion = completions.find(
            (completion) => {
                return completion.requestedId === request.id
            }
        )
        if (foundCompletion) { //if the above code returns an object, this is true and this code will execute

            html += `<li class="complete">${request.description}
                    <button class="request__delete"
                                id="request--${request.id}">
                            Delete
                        </button>
                        </li>`
        }
        else {
            html += `<li class="incomplete">
                        ${request.description}
                        <select class="plumber" id="plumbers">
                            <option value="">Choose</option>
                        ${plumbers.map(
                            plumber => {
                                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                            }
                        )
                            }
                                    </select>
                                    <button class="request__delete"
                                            id="request--${request.id}">
                                        Delete
                                    </button>
                                </li>`

                    }
    }

    html += `</ul>`
    return html
}




const mainContainer = document.querySelector("#container")

//when delete button is clicked, delete object from api permenent storage
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))

    }
})

//when plumber name is selected new completion object should be put into permenent state
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const requestNumber = parseInt(requestId)
            const plumberNumber = parseInt(plumberId)
            const todaysDate = Date.now()

            const completion = {
                requestedId: requestNumber,
                plumberId: plumberNumber,
                date_created: todaysDate
            }

            saveCompletion(completion) //puts completed object into permenent state api




        }
    }
)

