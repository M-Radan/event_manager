
fetch("https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json").then(response => response.json()).then(data => {
        const locationSel = document.getElementById("location");
        for (let i = 0; i < data.length; i++) {
            const locationEntryData = data[i];
            let locationFull;
            if (locationEntryData.city) {
              locationFull = locationEntryData.city + " , " + locationEntryData.country;
            } 
            else {
              locationFull = locationEntryData.country;
            }
            const optiones = document.createElement("option"); 
            optiones.value = locationFull; 
            optiones.textContent = locationFull; 
            locationSel.appendChild(optiones);
        }
    })
    
    .catch(error => {
        console.error("locationFulloption error:", error);
        alert("Error with loading locations!!!");
    });
