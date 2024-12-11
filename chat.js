// script.js
function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");      
    const messageText = userInput.value.trim();
  
    // If the user input is not empty
    if (messageText) {
      // Create the user message element
      const userMessage = document.createElement("div");
      userMessage.classList.add("message", "user");
      userMessage.textContent = messageText;
      chatbox.appendChild(userMessage);
  
      // Scroll to the bottom of the chatbox
      chatbox.scrollTop = chatbox.scrollHeight;
  
      // Clear the input field
      userInput.value = "";
  
      // Simulate a bot response after a delay
      setTimeout(() => {
        const botResponse = document.createElement("div");
        botResponse.classList.add("message", "bot");
        botResponse.textContent = generateBotResponse(messageText);
        chatbox.appendChild(botResponse);

        if (messageText.toLowerCase().includes("help")) {
            botResponse.innerHTML = "Welcome back Chandan: click on the option you want to visit !:";
            chatbox.appendChild(botResponse);
            
            // Add options as buttons
            createOptions();
          } else {
            botResponse.textContent = generateBotResponse(messageText);
            chatbox.appendChild(botResponse);
          }
  
        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
      }, 1000);
    }
  }
  

  document.getElementById("userInput").addEventListener("keydown", function(event) {
    // Check if the pressed key is "Enter" and Shift is not pressed
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior (new line)
      sendMessage(); // Send the message
    }
  });
  
  function generateBotResponse(userMessage) {
    // This is a basic function for bot responses
    // You can expand this to use a more complex response system
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you today?";
    } else if (userMessage.toLowerCase().includes("how are you")) {
      return "I'm doing great, thanks for asking! How about you?";
    } else if (userMessage.toLowerCase().includes("goodbye")) {
      return "Goodbye! Have a great day!"; 
    } else if (userMessage.toLowerCase().includes("where are you from")){
      return "I am from Uttar Pradesh !"; 
    } else if (userMessage.toLowerCase().includes("hi")){
      return "Hello Chandan!";        
    } else {
      return "I'm not sure what you mean, could you clarify?";
    }
  }

  

  function createOptions() {
    // Create buttons for the options
    const options = [
      { text: "Whatsapp", link: "https://web.whatsapp.com/" },
      { text: "Chat GPT", link: "https://chatgpt.com/" },
      { text: "Google", link: "https://www.google.com/" },
      { text: "FMS", link: "https://sites.google.com/bonhoeffermachines.in/bonhoefferma/fms/fms-sheets"},
      { text: "Daily checklist", link: "https://docs.google.com/spreadsheets/d/1Dp5UVY7Xhz31zCr97HRnCzaqqnS3UoCgK2Jce_ELTPk/edit?gid=541354850#gid=541354850" },
      { text: "Weekly Checklist", link: "https://docs.google.com/spreadsheets/d/1BFBY3jP2tZ3UY_VC2suFsbGyltG0IOaLUkuhAtgBmeo/edit?gid=541354850#gid=541354850" },
      { text: "Delegation", link: "https://docs.google.com/spreadsheets/d/1eSni983XP3OqRxjBnbdZ8qLRHb2Tprxm-8IbSVMyBss/edit?gid=0#gid=0" },
      { text: "Youtube", link: "https://www.youtube.com/" },
      { text: "Movies", link: "https://bollyflix.meme/" },
      { text: "Sales FMS", link: "https://docs.google.com/spreadsheets/d/1pjkwKT6ljMOSO2r3KMqIrggA0jdwNYCk-GzoRfXeq8o/edit?gid=452569392#gid=452569392" },
      { text: "Delegation Form", link: "https://docs.google.com/forms/d/1bfWRvTuoWntZINBDsXuZFOV7IPXuRFm9PU-fIKKK-x8/edit?ts=675046c3/" },
    ];
  
    const chatbox = document.getElementById("chatbox");
  
    options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.classList.add("button-style");
      button.onclick = function () {
        window.open(option.link, "_blank"); // Open the link in a new tab
      };
    
      chatbox.appendChild(button);
    });
  }


  // Check if SpeechRecognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Voice Search. Please use Google Chrome or Edge.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set the language
    recognition.interimResults = false; // Only show final results
    recognition.continuous = false; // Stop after one phrase

    const searchInput = document.getElementById("search-input");
    const voiceSearchBtn = document.getElementById("voice-search-btn");
    const searchBtn = document.getElementById("search-btn");

    // Start recognition on button click
    voiceSearchBtn.addEventListener("click", () => {
      const listeningMessage = document.createElement("div");
        listeningMessage.classList.add("message", "bot");
        listeningMessage.textContent = "Listening...";
        chatbox.appendChild(listeningMessage);
        chatbox.scrollTop = chatbox.scrollHeight;


        // Wait for the tone to finish before starting speech recognition
        const startTone = new Audio('tone.mp3'); // Use the correct path for tone.mp3
        startTone.play();

        startTone.addEventListener('ended', () => {

          
            // Start speech recognition after the tone ends
            recognition.start();
        });
    });

    // Capture the result from voice input
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the transcribed text
        searchInput.value = transcript; // Set the text in the input field
        performGoogleSearch(transcript); // Perform the search automatically
        const listeningMessage = chatbox.querySelector(".message.bot");
        if (listeningMessage) {
            chatbox.removeChild(listeningMessage);
        }
        
    };


  

        playSound('end-tone.mp3');
        
    // Handle errors
    recognition.onerror = (event) => {
        alert(`Error occurred: ${event.error}`);
    };

    // Perform Google Search
    function performGoogleSearch(query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, "_blank"); // Open search in a new tab
    }

    // Add click event to the search button
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            performGoogleSearch(query);
        } else {
            alert("Please enter a search query.");
        }
    });
}


function playSound(url) {
  const audio = new Audio(url);  // Create an audio element with the given URL
  audio.play();  // Play the sound
}

  