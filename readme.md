<h1>Event Management System Frontend</h1>

<p>Welcome to the Event Management System! This project is a web application that allows users to manage events. Users can view, add, update, and delete events. The system also supports user authentication and authorization.</p>

<h2>Features</h2>
<ul>
    <li>User authentication (login/logout)</li>
    <li>Create, view, update, and delete events</li>
    <li>Responsive design using Tailwind CSS</li>
    <li>Real-time updates and notifications</li>
</ul>

<h2>Project Setup</h2>
<p>Follow these instructions to set up the project locally.</p>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/theihasan/event-management-frontend.git</code></pre>

<h3>2. Install Dependencies</h3>
<p>Navigate to the project directory and install the necessary dependencies:</p>
<pre><code>cd event-management-frontend
npm install</code></pre>

<h3>3. Set Up Environment Variables</h3>
<p>Setup API base url in register.js,login.js and events.js</p>
<pre><code>BASE_URL=http://localhost:8000/api
</code></pre>

<h3>4. Run the Development Server</h3>
<p>Start the development server with:</p>
<pre><code>npm run dev</code></pre>

<h2>Usage</h2>
<p>Once the server is running, navigate to <a href="http://localhost:3000">http://localhost:3000</a> in your browser.</p>

<h3>Authentication</h3>
<p>Users can log in to access the event management features. If not authenticated, users will be redirected to the login page.</p>

<h3>Adding Events</h3>
<p>Click the "Add New Event" button to open a form where you can input event details. The new event will be added to the list and saved in the database.</p>

<h3>Updating Events</h3>
<p>To update an existing event, click on the edit button next to the event. Make the necessary changes and save.</p>

<h3>Deleting Events</h3>
<p>Events can be deleted by clicking the delete button next to the event. Confirm the deletion when prompted.</p>