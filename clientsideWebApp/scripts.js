document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/fundraisers')
        .then(response => response.json())
        .then(data => displayFundraisers(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayFundraisers(fundraisers) {
    const section = document.getElementById('fundraisers');
    fundraisers.forEach(fundraiser => {
        const div = document.createElement('div');
        div.className = 'fundraiser';
        div.innerHTML = `
            <h3>${fundraiser.caption}</h3>
            <p>Organised by: ${fundraiser.organiser}</p>
            <p>Target Funding: $${fundraiser.target_funding}</p>
            <p>Current Funding: $${fundraiser.current_funding}</p>
            <p>City: ${fundraiser.city}</p>
            <p>Category: ${fundraiser.category}</p>
        `;
        section.appendChild(div);
    });
}

function fetchFundraisers() {
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    const category = document.getElementById('category').value;

    if (!organizer && !city && !category) {
        alert('You must select at least one criteria');
        return;
    }

    fetch(`http://localhost:3000/api/fundraisers?organizer=${organizer}&city=${city}&category=${category}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                document.getElementById('results').innerHTML = '<strong>No fundraisers found.</strong>';
            } else {
                const results = data.map(f => `<a href="http://localhost:3000/fundraiser/${f.id}">${f.caption}</a><br>`).join('');
                document.getElementById('results').innerHTML = results;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = '<strong>Error fetching data.</strong>';
        });
}

function clearCheckboxes() {
    document.getElementById('organizer').value = '';
    document.getElementById('city').value = '';
    document.getElementById('category').value = '';
}


