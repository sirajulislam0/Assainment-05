
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');




const allSectin = document.getElementById('all-sectin');
const openSectin = document.getElementById('open-sectin');
const closeSectin = document.getElementById('close-sectin');
const loadingSpinner = document.getElementById('loadingSpinner');
const counts = document.getElementById('counts');
const card_details_modal = document.getElementById('card_details_modal');


const cardDes = document.getElementById('card-des');






function toggleStyle(id) {

    allBtn.classList.remove('bg-blue-500', 'text-white');
    openBtn.classList.remove('bg-blue-500', 'text-white');
    closeBtn.classList.remove('bg-blue-500', 'text-white');

    allBtn.classList.add('bg-white', 'text-black');
    openBtn.classList.add('bg-white', 'text-black');
    closeBtn.classList.add('bg-white', 'text-black');

    const select = document.getElementById(id);
    currentStatus = id;

    select.classList.remove('bg-white', 'text-black');
    select.classList.add('bg-blue-500', 'text-white');


    if (id === 'open-btn') {


        console.log('open');

        loadOpenData()


    } else if (id == 'all-btn') {


        console.log('all');
        loadDataAll();



    } else if (id == 'close-btn') {




        loadCloseData()





    }

}


const modalTitle = document.getElementById('modal-title');
const modalStatus = document.getElementById('modal-status');
const modalAuthor = document.getElementById('modal-autor');
const modalDate = document.getElementById('modal-createdate');
const modalLevel = document.getElementById('modal-level');
const modalLevels = document.getElementById('modal-levels');
const modalDes = document.getElementById('modal-des');
const modalAssaign = document.getElementById('modal-assaign');
const modalPriority = document.getElementById('modal-priority');


async function cardModal(id) {
    console.log(id);


    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`


    const res = await fetch(url)
    const data = await res.json();
    const formattedDate = new Date(data.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    console.log(data.data);


    card_details_modal.showModal();

    modalTitle.textContent = data.data.title
    modalStatus.textContent = data.data.status
    modalAuthor.textContent = data.data.author

    formattedDate.textContent = data.data.updatedAt

    modalLevel.textContent = data.data.labels[0]
    modalLevels.textContent = data.data.labels[1]
    modalDes.textContent = data.data.description
    modalAssaign.textContent = data.data.assignee
    modalPriority.textContent = data.data.priority
}






const dataContainer = document.getElementById('dataContainer')
function displayData(datas) {


    dataContainer.innerHTML = ''
    counts.innerText = datas.length
    datas.forEach(data => {

        const formattedDate = new Date(data.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
        const card = document.createElement('div');
        card.classList = `card  shadow-sm ${data.priority === "low" ? "bg-[#a855f7] pt-0.5" : "bg-[#00a86e] pt-0.5"}`

        card.innerHTML = `
        
           

        <div onclick = "cardModal(${data.id})" class="card-body  bg-white shadow-2xl rounded-xl">

           
            <div class="flex justify-between">

                <img src="./assets/Status.png" alt="">

                <button  class="btn bg-[#fff6d1] rounded-full text-[#f59e0b]">${data.priority}</button>
           
            </div>


            <div>
                <h2 class="font-bold text-2xl">${data.title}</h2>

                <p class="text-xl text-[#64748b] line-clamp-2">${data.description}</p>

            </div>

            <div class="flex justify-between">
                <button class="btn bg-[#feecec] rounded-full text-[#f26e6e]"><span><img class="h-[20px]" src="./assets/bugdroid.png" alt=""></span>${data.labels[0]}</button>
                <button class="btn bg-[#fff6d1] rounded-full text-[#f59e0b]"> <span><img class="h-[20px]" src="./assets/lifebuoy.png" alt=""></span>${data.labels[1]}</button>
           

            </div>

            <hr class=" text-gray-300">
            


            <!-- autor and created At -->


            <div>

                <h2 class="font-serif text-[#8a96a8]">${data.author}</h2>
                <p class="font-serif text-[#8a96a8]">${formattedDate}</p>
            </div>
        </div>

           
        `;

        dataContainer.appendChild(card)

    });

}


function loadOpenData(datas) {


    counts.innerText = datas.length
    datas.forEach(data => {


        const card = document.createElement('div');
        card.classList = `card  shadow-sm ${data.priority === "low" ? "bg-[#a855f7] pt-0.5" : "bg-[#00a86e] pt-0.5"}`

        card.innerHTML = `
     
        <div class="card-body  bg-white shadow-2xl rounded-xl">
            <!-- card top -->
            <div class="flex justify-between">

            <img src="${data.status === 'high' || data.status === 'medium'
                ? './assets/highs.png'
                : './assets/low.png'}" alt="">
            
                
                
                <button class="btn bg-[#fff6d1] rounded-full text-[#f59e0b]">${data.priority}</button>
        
            </div>
            <div>
                <h2 class="font-bold text-2xl">${data.title}</h2>

                <p class="text-xl text-[#64748b] line-clamp-2">${data.description}</p>

            </div>

            <div class="flex justify-between">
                <button class="btn bg-[#feecec] rounded-full text-[#f26e6e]"><span><img class="h-[20px]" src="./assets/bugdroid.png" alt=""></span>${data.labels[0]}</button>
                <button class="btn bg-[#fff6d1] rounded-full text-[#f59e0b]"> <span><img class="h-[20px]" src="./assets/lifebuoy.png" alt=""></span>${data.labels[1]}</button>
           

            </div>

            <hr class=" text-gray-300">
            <h2 class = "bg-amber-600"> ${data.status} </h2>


            <!-- autor and created At -->


            <div>

                <h2 class="font-serif text-[#8a96a8]">${data.author}</h2>
                <p class="font-serif text-[#8a96a8]">${data.createdAt}</p>
            </div>
        </div>

           
        `;

        dataContainer.appendChild(card)

    });

}

async function loadDataAll() {

    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex')
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    const data = await fetch(url);

    const items = await data.json();

    loadingSpinner.classList.add('hidden')

    displayData(items.data)




    // const openIssues = items.data.filter(item => item.status.trim() === "closed");

    // displayData(openIssues)

}


async function loadCloseData() {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex')
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    const data = await fetch(url);

    const items = await data.json();

    loadingSpinner.classList.add('hidden')



    const closeIssue = items.data.filter(item => item.status.trim() === "closed");

    displayData(closeIssue)

}
async function loadOpenData() {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex')
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    const data = await fetch(url);

    const items = await data.json();

    loadingSpinner.classList.add('hidden')

    // displayData(items.data.status === 'closed')




    const openIssues = items.data.filter(item => item.status.trim() === "open");
    console.log(openIssues);


    displayData(openIssues)

}



loadDataAll();


document.getElementById('btn-search').addEventListener('click',function(){

    const input = document.getElementById('input-search');

    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then( (res) => res.json())
    .then( (data) =>{

        const allword = data.data;
        console.log(allword);

        const filterword = allword.filter((word) => word.title.toLowerCase().includes(searchValue));

        displayData(filterword);
    });
    
    
    

})