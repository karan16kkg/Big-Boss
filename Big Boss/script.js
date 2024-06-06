// Get all the vote buttons
const voteButtons = document.querySelectorAll('.contestant button');

// Add click event listener to each vote button
let count=0;
voteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const contestantName = event.target.parentNode.querySelector('h3').textContent;
    const voteCountElement = event.target.parentNode.querySelector('.vote-count');
    if(count==0){
      alert('You have successfully voted!');
      count++;
    }

    // Check if the user has already voted for any contestant
    if (localStorage.getItem('votedContestant')) {
      alert('You have already voted for a contestant!');
      return;
    }

    // Increase the vote count by 1
    let voteCount = parseInt(voteCountElement.textContent);
    voteCount++;
    voteCountElement.textContent = voteCount;

    // Store the user's voted contestant in localStorage
    localStorage.setItem('votedContestant', contestantName);

    // Store the vote count for the contestant in localStorage
    localStorage.setItem(`${contestantName}_count`, voteCount);

    // Display a message with the selected contestant's name and vote count
    console.log(`${contestantName} received a vote. Total votes: ${voteCount}`);
  });
});

// Retrieve and display the initial vote counts from localStorage or assign random votes
voteButtons.forEach((button) => {
  const contestantName = button.parentNode.querySelector('h3').textContent;
  const voteCountElement = button.parentNode.querySelector('.vote-count');

  // Check if the vote count for the contestant is already set in localStorage
  let voteCount = parseInt(localStorage.getItem(`${contestantName}_count`));

  if (!voteCount || isNaN(voteCount)) {
    // Assign a random number of initial votes between 0 and 100
    voteCount = Math.floor(Math.random() * 101);

    // Store the initial vote count in localStorage
    localStorage.setItem(`${contestantName}_count`, voteCount);
  }

  voteCountElement.textContent = voteCount;
});
// Results button click event
const resultsButton = document.getElementById('results-button');
resultsButton.addEventListener('click', () => {
  const contestants = document.querySelectorAll('.contestant');
  const resultContainer = document.createElement('div');
  resultContainer.className = 'results-container';

  let maxVotes = 0;
  let winner = '';

  // Loop through each contestant and create a result card
  contestants.forEach((contestant) => {
    const contestantName = contestant.querySelector('h3').textContent;
    const voteCount = parseInt(localStorage.getItem(`${contestantName}_count`)) || 0;

    const resultCard = document.createElement('div');
    resultCard.className = 'results-card';

    const nameElement = document.createElement('h3');
    nameElement.textContent = contestantName;

    const voteCountElement = document.createElement('span');
    voteCountElement.className = 'vote-count';
    voteCountElement.textContent = voteCount;

    resultCard.appendChild(nameElement);
    resultCard.appendChild(voteCountElement);
    resultContainer.appendChild(resultCard);

    // Determine the winner
    if (voteCount > maxVotes) {
      maxVotes = voteCount;
      winner = contestantName;
    }
  });

  // Clear the main section and append the result container
  const mainSection = document.querySelector('main');
  mainSection.innerHTML = '';
  mainSection.appendChild(resultContainer);

  // Display the winner
  const winnerElement = document.createElement('h2');
  winnerElement.textContent = `Leading: ${winner}`;
  mainSection.appendChild(winnerElement);
});