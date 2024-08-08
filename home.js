const timeline = document.querySelector('.timeline');
const timelineItems = [];

// Add timeline items
for (let year = 2018; year <= 2024; year++) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = year;
    timeline.appendChild(item);
    timelineItems.push(item);
}

// Add event listeners to timeline items
timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Scroll to the corresponding page
        document.querySelector('.timeline-container').scrollTo({
            top: index * 650, // Adjust the scroll distance as needed
            behavior: 'smooth'
        });
    });
});