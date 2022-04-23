// How much water do you need based on age https://www.healthline.com/health/how-much-water-should-I-drink#_noHeaderPrefixedContent
function water(age) {
    if(age<4) return ("16oz")
    // (4 <= age <= 8)
    else if(age<9) return("40oz")
    // (9 <= age <= 13)
    else if(age<14) return("56-64oz")
    // (14 <= age <= 18)
    else if(age<19) return("64-88oz")
    // (age > 18)
    else return("72-104oz")
}

// How much sleep you need based on age https://www.cdc.gov/sleep/about_sleep/how_much_sleep.html
function sleep(age) {
    // 0-3 and 4-12 month combined
    if(age<1) return "12-17hrs"
    // (1 <= age <= 2)
    else if(age<3) return "11-14hrs"
    // (2 < age <= 5)
    else if(age<6) return "10-13hrs"
    // (5 <= age <= 12)
    else if(age<13) return "9-12hrs"
    // (12 < age <= 18)
    else if(age<19) return "8-10hrs"
    // (18 < age <= 64)
    else if(age<65) return "7-9hrs"
    // (age >= 65)
    else return "7-8hrs"
}

function doc(string) {
    if(string == 'none') return false
    else return true
}

function covid(string) {
    if(string == "yes") return true
    else return false
}

module.exports = {water, sleep, doc, covid}





