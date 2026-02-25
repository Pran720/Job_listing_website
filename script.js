const jobs = [
  {title:"Frontend Developer",company:"TechNova",location:"Bangalore",category:"IT",experience:"Fresher",desc:"Build responsive UI."},
  {title:"UI Designer",company:"CreativeX",location:"Remote",category:"Design",experience:"Mid",desc:"Design modern interfaces."},
  {title:"Marketing Executive",company:"GrowthHub",location:"Delhi",category:"Marketing",experience:"Senior",desc:"Lead marketing campaigns."},
  {title:"Backend Developer",company:"CodeWorks",location:"Remote",category:"IT",experience:"Mid",desc:"Develop APIs."},
  {title:"Product Designer",company:"PixelLab",location:"Bangalore",category:"Design",experience:"Fresher",desc:"Create product visuals."},
  {title:"SEO Specialist",company:"RankUp",location:"Delhi",category:"Marketing",experience:"Mid",desc:"Optimize search ranking."}
];

let currentPage = 1;
const perPage = 3;

const container = document.getElementById("jobContainer");
const searchInput = document.getElementById("searchInput");
const filters = ["locationFilter","categoryFilter","experienceFilter"];

function getFilteredJobs() {
  return jobs.filter(job => {
    const search = searchInput.value.toLowerCase();
    if (!job.title.toLowerCase().includes(search)) return false;

    for (let f of filters) {
      const val = document.getElementById(f).value;
      if (val && job[f.replace("Filter","")] !== val) return false;
    }
    return true;
  });
}

function renderJobs() {
  const filtered = getFilteredJobs();
  const start = (currentPage - 1) * perPage;
  const pageJobs = filtered.slice(start, start + perPage);

  container.innerHTML = "";

  pageJobs.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company}</p>
      <p>${job.location}</p>
      <button onclick='openModal(${JSON.stringify(job)})'>View More</button>
    `;

    container.appendChild(card);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  document.getElementById("pageInfo").textContent = `${currentPage} / ${totalPages}`;
}

function openModal(job) {
  document.getElementById("modalTitle").textContent = job.title;
  document.getElementById("modalCompany").textContent = job.company;
  document.getElementById("modalDesc").textContent = job.desc;
  document.getElementById("jobModal").classList.remove("hidden");
}

document.getElementById("closeModal").onclick = () =>
  document.getElementById("jobModal").classList.add("hidden");

searchInput.addEventListener("input", () => {currentPage=1; renderJobs();});
filters.forEach(id => document.getElementById(id).addEventListener("change", () => {currentPage=1; renderJobs();}));

document.getElementById("clearBtn").onclick = () => {
  searchInput.value = "";
  filters.forEach(id => document.getElementById(id).value = "");
  currentPage = 1;
  renderJobs();
};

document.getElementById("prevBtn").onclick = () => {
  if (currentPage > 1) currentPage--;
  renderJobs();
};

document.getElementById("nextBtn").onclick = () => {
  currentPage++;
  renderJobs();
};

renderJobs();