
React Music Player with Spotify API Integration
This project is a music player built with React, utilizing Vite for fast development and Hot Module Replacement (HMR). It integrates with the Spotify API to fetch playlists and play each song. Please note that due to limitations in the Spotify API, only song previews (30 seconds) are available for playback.

Features
React framework with Vite for efficient development
Seamless integration with the Spotify API
Ability to fetch and display playlists
Playback of song previews directly within the application
Setup
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/Chiemezie123/musicplayer.git
Install dependencies:

bash
Copy code
cd musicplayer
npm install
Obtain a Spotify client ID by registering your application.

Create a .env file in the root directory of the project and add your Spotify client ID:

plaintext
Copy code
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here
Start the development server:

bash
Copy code
npm run dev
Navigate to http://localhost:3000 in your web browser to view the application.

Usage
Upon launching the application, you will be prompted to log in with your Spotify account to access your playlists. Once logged in, you can browse and play songs from your playlists directly within the application.

Please note that only song previews are available for playback, as provided by the Spotify API.

Contributions
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

Credits
This project was built using the following technologies and libraries:

React
Vite
Spotify Web API
License
This project is licensed under the MIT License.





