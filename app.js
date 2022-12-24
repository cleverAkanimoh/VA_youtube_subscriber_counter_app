const alert = document.querySelector('#alert');

const findBtn = document.querySelector('#find');

const container = document.querySelector('#container');

const input = document.querySelector('#urlField');

const userID = input.value;
const API_KEY = 'AIzaSyD7DgWzi2Whte2Wz447C4stmSrKmfE7ZtI';

const url = `https://www.googleapis.com/youtube/v3`;

// display alerts
const displayAlert = (txt, dur) => {
    alert.innerText = txt;
    alert.className = 'display';
    setTimeout(() => {
        alert.innerText = '';
        alert.className = '';
    }, dur)
};

// find data for search
const findInfo = async e => {

    e.preventDefault();

    container.innerHTML = `
        <div id="loading"></div>
		<p id="loadtext">finding result...</p>
    `;
    try {
        const response = await fetch(url, {
            header: []
        });
        if (!response.ok) {
            throw new Error(' error');
        }
        const data = await response.json();
        console.log(data);
        
        result.innerHTML = `
            <div id="title">
				<h2>${data.title}</h2>
			</div>

			<aside>
				<div id="subscribers">
					<button>subscribers</button>
					<h3>3124</h3>
				</div>

				<div id="views">
					<button>views</button>
					<h3>13449</h3>
				</div>

				<div id="videos">
					<button>total videos</button>
					<h3>182</h3>
				</div>
			</aside>
        `;
    } catch (error) {
        container.textContent = `${error}`;
    };
};

findBtn.onclick = findInfo;