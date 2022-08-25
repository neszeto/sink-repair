const applicationState = {
    requests: [],
    plumbers:[],
    completions:[]
}



//the following function gets data from an api (outside source) and puts that data into the applicationState object above
const API = "https://orca-app-kaf47.ondigitalocean.app" 

export const fetchRequests = () => {
    return fetch(`${API}/requests`) //this /requests is coming from database.json api
        .then(response => response.json()) //convert from json
        .then(
            (serviceRequests) => {
                applicationState.requests = serviceRequests // Store the external state in application state
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumber) => {
                applicationState.plumbers = plumber
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
 }

 export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
 }
export const getCompletions= () => {
    return applicationState.completions.map(complete => ({...complete}))
}
/*
Here are the four main methods used on HTTP requests.

Method	Description
GET	Please give me this resource.
POST	Please create something new.
PUT	Please modify an existing resource.
DELETE	Please delete an existing.

*/
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = { //this object is alerting API that its creating something new and then putting users request in the api (permenent state - something new)
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest) 
    }
    return fetch(`${API}/requests`, fetchOptions) //this returns the the updated permenent state with the newly added user input
        .then(response => response.json())
        .then(() => {
            const mainContainer = document.querySelector("#container")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const saveCompletion = (completedJob) => {
    const fetchOptions = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedJob) 
    }
    return fetch(`${API}/completions`, fetchOptions) 
        .then(response => response.json())
        .then(() => {
            const mainContainer = document.querySelector("#container")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


//you can only delete a SINGLE resource, so this function must have the id of the object to be deleted as a parameter
export const deleteRequest = (id) => {
    const fetchOptions = {
         method: "DELETE", 
         headers: {
            "Content-Type": "application/json" //doesnt need a body key because you are not adding anything to the database
         }
    }
    return fetch(`${API}/requests/${id}`, fetchOptions) // sends a delete request 
        .then(
            () => {
                const mainContainer = document.querySelector("#container")
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
        

