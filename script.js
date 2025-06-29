document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Submission (Mock)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // In a real scenario, you'd send this data to a backend.
            // For this mock, we just log it and show a success message.
            console.log('Contact Form Submission:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.style.color = 'green';
            contactForm.reset(); // Clear the form

            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000); // Clear message after 5 seconds
        });
    }

    // CAD Competition Registration and Leaderboard (Logic for competition.html)
    const registrationForm = document.getElementById('registrationForm');
    const participantsList = document.getElementById('participantsList');
    const leaderboardBody = document.getElementById('leaderboardBody');

    // Load participants from local storage
    let participants = JSON.parse(localStorage.getItem('cadParticipants')) || [];

    // Function to render leaderboard
    function renderLeaderboard() {
        if (leaderboardBody) {
            // Sort participants by score in descending order
            const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

            leaderboardBody.innerHTML = ''; // Clear existing entries
            sortedParticipants.slice(0, 5).forEach((p, index) => {
                const row = leaderboardBody.insertRow();
                row.insertCell().textContent = index + 1; // Rank
                row.insertCell().textContent = p.name;
                row.insertCell().textContent = p.score;
                row.insertCell().textContent = p.institute;
            });
        }
    }

    // Initial render if on competition page
    renderLeaderboard();

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const institute = document.getElementById('regInstitute').value;

            // Simulate initial score for a new participant (can be 0 or a random value)
            const score = 0; // New registrations start with 0 score, or you can randomize for demo

            const newParticipant = { name, email, institute, score };
            participants.push(newParticipant);

            // Save to local storage
            localStorage.setItem('cadParticipants', JSON.stringify(participants));

            alert('Registration Successful! Your details have been recorded.');
            registrationForm.reset();

            // Optionally, refresh leaderboard immediately if on the same page
            renderLeaderboard();
        });
    }

    // Dummy function to update scores (for demonstration or admin use)
    // In a real scenario, scores would come from judging the CAD models.
    window.updateParticipantScore = function(participantName, newScore) {
        const participantIndex = participants.findIndex(p => p.name === participantName);
        if (participantIndex !== -1) {
            participants[participantIndex].score = newScore;
            localStorage.setItem('cadParticipants', JSON.stringify(participants));
            renderLeaderboard();
            alert(`Score for ${participantName} updated to ${newScore}`);
        } else {
            alert(`Participant ${participantName} not found.`);
        }
    };

    // Example of how you might call updateParticipantScore from console for testing:
    // updateParticipantScore("Alice Smith", 95);
    // updateParticipantScore("Bob Johnson", 88);
    // updateParticipantScore("Charlie Brown", 75);
    // updateParticipantScore("Diana Prince", 100);
    // updateParticipantScore("Eve Adams", 80);
    // updateParticipantScore("Frank Miller", 92);
});
// Dummy Team Data
const teamMembers = [
    { name: "Dr. Anya Sharma", role: "Faculty Advisor", image: "images/placeholder_female.jpg" },
    { name: "Rahul Singh", role: "Team Lead", image: "images/placeholder_male.jpg" },
    { name: "Priya Patel", role: "Software Lead", image: "images/placeholder_female.jpg" },
    { name: "Amit Kumar", role: "Mechanical Lead", image: "images/placeholder_male.jpg" },
    { name: "Sneha Reddy", role: "Electrical Lead", image: "images/placeholder_female.jpg" },
    { name: "Vikram Gupta", role: "CAD Specialist", image: "images/placeholder_male.jpg" },
    { name: "Ishita Das", role: "Research & Development", image: "images/placeholder_female.jpg" },
    { name: "Arjun Mehta", role: "Marketing & Outreach", image: "images/placeholder_male.jpg" }
    // Add more team members as needed
];

// Function to display team members
function displayTeam() {
    const teamMembersContainer = document.getElementById('teamMembers');
    if (teamMembersContainer) {
        teamMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('team-member-card');

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="member-image">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            `;
            teamMembersContainer.appendChild(memberCard);
        });
    }
}

// Call displayTeam when the DOM is loaded (add this inside the DOMContentLoaded listener)
// You should have one `DOMContentLoaded` listener in your `script.js`
// So, the above `displayTeam()` call should be within that listener.

document.addEventListener('DOMContentLoaded', () => {
    // ... (existing contact form and competition JS code) ...

    displayTeam(); // Call this here to load team members
});