// Define the base URL constant
const BASE_URL = 'http://localhost:8000/api';

let currentPage = 1;
const perPage = 5;

async function fetchEvents(page) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/events?page=${page}&per_page=${perPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        const eventList = document.getElementById('event-list');
        const noEventsMessage = document.getElementById('no-events-message');
        const pagination = document.getElementById('pagination');
        const pageInfo = document.getElementById('page-info');
        const prevPageButton = document.getElementById('prev-page');
        const nextPageButton = document.getElementById('next-page');

        if (data.data.length === 0) {
            noEventsMessage.classList.remove('hidden');
            pagination.classList.add('hidden');
        } else {
            noEventsMessage.classList.add('hidden');
            pagination.classList.remove('hidden');
            eventList.innerHTML = '';
            data.data.forEach(event => {
                const row = document.createElement('tr');
                row.classList.add('text-gray-700');
                row.innerHTML = `
                    <td class="py-2 px-4 border-b">${event.title}</td>
                    <td class="py-2 px-4 border-b">${event.description}</td>
                    <td class="py-2 px-4 border-b">${event.date}</td>
                    <td class="py-2 px-4 border-b">${event.location}</td>
                    <td class="py-2 px-4 border-b">
                        <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onclick="openUpdateModal(${event.id}, '${event.title}', '${event.description}', '${event.date}', '${event.location}')">Update</button>
                        <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="deleteEvent(${event.id})">Delete</button>
                    </td>
                `;
                eventList.appendChild(row);
            });

            pageInfo.textContent = `Page ${data.meta.current_page} of ${data.meta.last_page}`;
            prevPageButton.disabled = !data.links.prev;
            nextPageButton.disabled = !data.links.next;
        }
    } catch (error) {
        document.getElementById('no-events-message').textContent = 'Failed to load events.';
        document.getElementById('no-events-message').classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents(currentPage);

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchEvents(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        fetchEvents(currentPage);
    });

    document.getElementById('open-modal').addEventListener('click', () => {
        document.getElementById('event-modal').classList.remove('hidden');
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('event-modal').classList.add('hidden');
    });

    document.getElementById('event-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/events`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                document.getElementById('event-modal').classList.add('hidden');
                fetchEvents(currentPage);
            } else {
                const data = await response.json();
                console.error('Error adding event:', data.message);
                alert('Failed to add event.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    });

    document.getElementById('close-update-modal').addEventListener('click', () => {
        document.getElementById('update-modal').classList.add('hidden');
    });

    document.getElementById('update-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('update-event-id').value;
        const formData = new FormData(this);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/events/${id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                document.getElementById('update-modal').classList.add('hidden');
                fetchEvents(currentPage);
            } else {
                const data = await response.json();
                console.error('Error updating event:', data.message);
                alert('Failed to update event.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    });
});

function openUpdateModal(id, title, description, date, location) {
    document.getElementById('update-event-id').value = id;
    document.getElementById('update-event-title').value = title;
    document.getElementById('update-event-description').value = description;
    const formattedDate = new Date(date).toISOString().split('T')[0];
    document.getElementById('update-event-date').value = formattedDate;
    document.getElementById('update-event-location').value = location;
    document.getElementById('update-modal').classList.remove('hidden');
}

async function deleteEvent(id) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            fetchEvents(currentPage);
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
}
