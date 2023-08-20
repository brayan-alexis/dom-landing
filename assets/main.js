// Channel videos
// const youtubeAPI = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC3ICcukYYeSn26KlCRnhOhA&part=snippet%2Cid&order=date&maxResults=6';
// Playlist videos
const youtubeAPI = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL5jDTd07plNAQ7IZLz7RSMTYvJBrLDUEL&part=snippet&maxResults=6';

// Dark Mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const darkMode = document.querySelectorAll('.dark-mode');
const darkModeAlt = document.querySelectorAll('.dark-mode-alt');
let darkModeTarget;
let titleTarget;
// const body = document.body;
const textIndigo600 = document.querySelectorAll('.text-indigo-600');
const textGray600 = document.querySelectorAll('.text-gray-600');
const slate900 = document.querySelectorAll('.text-slate-900');

// Fetch options for the API call to Youtube
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8a153512c8msh9d098b16e55a2f6p18dfbejsn6509c1459a72',
		// 'X-RapidAPI-Key': '55e94a5f44msh6b2a0cbe2069e4ap15dae1jsn6c203f094122',
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

const content = null || document.getElementById('content'); // Get content div
// Auto call function to get videos and display them on the page
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
            videoDiv.className = "bg-white dark-mode-target shadow-lg rounded-lg overflow-hidden";

            // Reproducir video en la misma página en su propio div (no en una nueva pestaña)
            videoDiv.addEventListener('click', () => {
                let darkModeModalCheck = false;
                let darkModeModalColor = '#000000';
                if (videoDiv.classList.contains('bg-gray-900')) {
                    darkModeModalCheck = true;
                    darkModeModalColor = '#FFFFFF';
                }

                // Sweet Alert 2
                Swal.fire({
                    title: video.snippet.title,
                    width: '64em', // 1024px
                    color: darkModeModalColor,
                    background: darkModeModalCheck ? '#2d3748' : '#fff', // #111827
                    html: `<iframe width="100%" height="480" src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                    showCloseButton: true,
                    showConfirmButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Ok'
                });
            });
            
            
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = video.snippet.thumbnails.high.url;
            thumbnailImg.alt = video.snippet.description;
            thumbnailImg.className = "w-full h-56 object-cover";

            const videoInfoDiv = document.createElement('div');
            videoInfoDiv.className = "p-4";

            const videoTitle = document.createElement('h3');
            videoTitle.className = "text-lg font-semibold text-indigo-600";
            videoTitle.textContent = video.snippet.title;

            const videoDescription = document.createElement('p');
            videoDescription.className = "mt-2 ";
            videoDescription.textContent = video.snippet.description.substring(0, 80) + "...";
            videoInfoDiv.appendChild(videoTitle);
            videoInfoDiv.appendChild(videoDescription);

            videoDiv.appendChild(thumbnailImg);
            videoDiv.appendChild(videoInfoDiv);

            content.appendChild(videoDiv);
        });
        darkModeTarget = document.querySelectorAll('.dark-mode-target');
        titleTarget = document.querySelectorAll('.text-indigo-600');
    } catch (error) {
        //console.error(error);

        Swal.fire({
            title: 'Error: Not found videos',
            text: error,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
})();

// Dark mode toggle functionality
darkModeToggle.addEventListener('click', () => {
    // body.classList.toggle('dark-mode');
    
    darkMode.forEach((element) => {
        element.classList.toggle('bg-gray-900');
        element.classList.toggle('text-white');
    });
    darkModeAlt.forEach((element) => {
        element.classList.toggle('bg-gray-800');
        element.classList.toggle('text-white');
    });
    darkModeTarget.forEach((element) => {
        // element.classList.toggle('bg-blue-400');
        element.classList.toggle('bg-gray-900');
        element.classList.toggle('text-white');
    });
    titleTarget.forEach((element) => {
        element.classList.toggle('text-indigo-600');
        element.classList.toggle('text-blue-400');
    });

    textIndigo600.forEach((element) => {
        textIndigo600.forEach((element) => {
            element.classList.toggle('text-indigo-600');
            element.classList.toggle('text-blue-400');
        });
    });
    textGray600.forEach((element) => {
        element.classList.toggle('text-gray-600');
        element.classList.toggle('text-gray-400');
    });
    slate900.forEach((element) => {
        // element.classList.toggle('dark-mode-slate-900');
        element.classList.toggle('hover:text-indigo-600');
        element.classList.toggle('hover:text-blue-400');
    });
});

// Scroll to projects section
document.getElementById('viewProjectsButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Obtaining the position of the element
    const contentSection = document.getElementById('sectionAPI');
    const contentSectionTop = contentSection.offsetTop;
    
    // Scrolling to the element
    window.scrollTo({
      top: contentSectionTop,
      behavior: 'smooth'
    });
});
// Scroll to about section
document.getElementById('about-scroll').addEventListener('click', function(event) {
    event.preventDefault();

    // Obtaining the position of the element
    const contentSection = document.getElementById('about-section');
    const contentSectionTop = contentSection.offsetTop;
    
    // Scrolling to the element
    window.scrollTo({
        top: contentSectionTop,
        behavior: 'smooth'
    });
});
// Scroll to projects section
document.getElementById('projects-scroll').addEventListener('click', function(event) {
    event.preventDefault();

    // Obtaining the position of the element
    const contentSection = document.getElementById('sectionAPI');
    const contentSectionTop = contentSection.offsetTop;

    // Scrolling to the element
    window.scrollTo({
        top: contentSectionTop,
        behavior: 'smooth'
    });
});
// Scroll to contact section
document.getElementById('contacts-scroll').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Obtaining the position of the element
    const contentSection = document.getElementById('contact-section');
    const contentSectionTop = contentSection.offsetTop;
    
    // Scrolling to the element
    window.scrollTo({
      top: contentSectionTop,
      behavior: 'smooth'
    });
});