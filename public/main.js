


const survey = document.getElementById("survey")

survey.addEventListener("submit", surveyform)

async function surveyform(event) {
    event.preventDefault()

    const endpoint = "app/survey/"
    const url = document.baseURI+endpoint
    const formEvent = event.currentTarget

    try {
        const formData = new formData(formEvent)

        const survey_app = await sendSurvey({url, formData})

        console.log(survey_app)
    } catch (error) {
        console.log(error)
    }

}

async function sendSurvey({url, formData}) {
    const plainFormData = Object.fromEntries(formData.fromEntries())
    const formDataJson = JSON.stringify(plainFormData)
    console.log(formDataJson)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    }

    const response = await fetch(url, options);
    return response.json()
}
