// Dark Mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const bgGray50 = document.querySelectorAll('.dark-mode-alt');
const textGray500 = document.querySelectorAll('.text-gray-500');
const textGray600 = document.querySelectorAll('.text-gray-600');
const slate900 = document.querySelectorAll('.text-slate-900');
let darktest;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    bgGray50.forEach((element) => {
        element.classList.toggle('dark-mode-bg-gray-50');
    });
    textGray500.forEach((element) => {
        element.classList.toggle('dark-mode-bg-gray-50-text-gray-500');
    });
    textGray600.forEach((element) => {
        element.classList.toggle('dark-mode-alter-text-gray-600');
    });
    slate900.forEach((element) => {
        element.classList.toggle('dark-mode-slate-900');
    });
    darktest.forEach((element) => {
        element.classList.toggle('dark-mode-bg-gray-50');
    });
    slate900.forEach((element) => {
        element.classList.toggle('dark-mode-slate-900');
    });
});



const content = null || document.getElementById('content'); // Get content div
// Channel videos
// const youtubeAPI = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC3ICcukYYeSn26KlCRnhOhA&part=snippet%2Cid&order=date&maxResults=6';
// Playlist videos
const youtubeAPI = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL5jDTd07plNAQ7IZLz7RSMTYvJBrLDUEL&part=snippet&maxResults=6';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// Get videos function with async/await
async function getVideos(youtubeAPI) {
    try {
        const response = await fetch(youtubeAPI, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

// Auto call function
(async () => {
    try{
        const videos = await getVideos(youtubeAPI);
        const content = document.getElementById('content');

        if (!content) {
            console.error("Content div not found.");
            return;
        }

        videos.items.slice(0, 6).forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.className = "bg-white dark-mode-alte shadow-lg rounded-lg overflow-hidden";
            
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = video.snippet.thumbnails.high.url;
            thumbnailImg.alt = video.snippet.description;
            thumbnailImg.className = "w-full h-56 object-cover";

            const videoInfoDiv = document.createElement('div');
            videoInfoDiv.className = "p-4";

            const videoTitle = document.createElement('h3');
            videoTitle.className = "text-lg font-semibold text-indigo-600"; // colo is #374151 text-gray-800
            videoTitle.textContent = video.snippet.title;

            const videoDescription = document.createElement('p');
            videoDescription.className = "mt-2 "; // color is #6B7280 text-gray-600
            videoDescription.textContent = video.snippet.description.substring(0, 80) + "...";
            videoInfoDiv.appendChild(videoTitle);
            videoInfoDiv.appendChild(videoDescription);

            videoDiv.appendChild(thumbnailImg);
            videoDiv.appendChild(videoInfoDiv);

            content.appendChild(videoDiv);
        });
        darktest = document.querySelectorAll('.dark-mode-alte');
    } catch (error) {
        console.error(error);
        // Add sweet alert here later
    }
})();

document.getElementById('viewProjectsButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Obtener la posición vertical del elemento con ID "content"
    const contentSection = document.getElementById('sectionAPI');
    const contentSectionTop = contentSection.offsetTop;
    
    // Realizar el desplazamiento suave a la posición del elemento
    window.scrollTo({
      top: contentSectionTop,
      behavior: 'smooth'
    });
  });
