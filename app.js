const alert = document.querySelector('#alert');

const findBtn = document.querySelector('#find');

const container = document.querySelector('#container');

const input = document.querySelector('#urlField');

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

    const userID = input.value;
    const key = 'AIzaSyD7DgWzi2Whte2Wz447C4stmSrKmfE7ZtI';

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${userID}&key=${key}`;

    e.preventDefault();

    container.innerHTML = `
        <div id="loading"></div>
		<p id="loadtext">finding result...</p>
    `;
    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'youtubeProject',
            }
        });
        if (!response.ok) throw new Error('an error occured');

        const data = await response.json();
        console.log(data);

        if(data.pageInfo.totalResults > 0) {
            let title = 'cleverly';
            let subscriberCount = data.items[0].statistics.sunscriberCount;
            let videoCount = data.items[0].statistics.videoCount;
            let viewsCount = data.items[0].statistics.viewsCount;

            container.innerHTML = `
                <div id="title">
    		    	<h2>${title}</h2>
    		    </div>

    		    <aside>
    		    	<div id="subscribers">
    		    		<button>subscribers</button>
    		    		<h3>${subscriberCount}</h3>
    		    	</div>

    			<div id="views">
    				<button>views</button>
    				<h3>${videoCount}</h3>
    			</div>

    			<div id="videos">
    				<button>total videos</button>
    				<h3>${viewsCount}</h3>
    			</div>
    		</aside>
        `;
        } else {
            container.textContent = 'please enter a valid youtube ID';
        }
    } catch (err) {
        container.textContent = `please ensure you have a good internet connection`;
        console.log(err);
    };
};

findBtn.onclick = findInfo;

//!  another method

// const findInfo = async e => {

//     const userID = input.value;
//     const key = 'AIzaSyD7DgWzi2Whte2Wz447C4stmSrKmfE7ZtI';

//     const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${userID}&key=${key}`;

//     e.preventDefault();

//     container.innerHTML = `
//         <div id="loading"></div>
// 		<p id="loadtext">finding result...</p>
//     `;

//     fetch(url, {
//         headers: {
//             Accept: 'application/json',
//             'User-agent': 'youtubeProject'
//         }
//     })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// };

// findBtn.onclick = findInfo;