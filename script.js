
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu'), links=document.querySelector('.navlinks');
 if(menu&&links) menu.addEventListener('click',()=>links.classList.toggle('open'));
 document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
   document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
   const filter=btn.dataset.filter;
   document.querySelectorAll('.project-card').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
 }));
 const journeyData={
  singapore:{title:'Singapore · ESG analytics & leadership',date:'Project Flux · 2022',text:'I began this chapter in Singapore, working in ESG data and analytics. At Project Flux, I progressed from ESG Data Intern to Interim Head of ESG Data & Analytics, contributing to emissions reporting, data validation and workflow improvements.'},
  london:{title:'London · Geographic Data Science',date:'LSE · 2024–2025',text:'In London, my MSc in Geographic Data Science connected spatial analysis with statistics, machine learning and climate-risk research. At LSE, I worked with hazard data, satellite imagery, socioeconomic indicators and policy documents.'},
  mumbai:{title:'Mumbai · AI & document intelligence',date:'HDFC Bank · Aug 2026–present',text:'My current chapter brings me into banking technology, where I work on intelligent document processing and compare OCR and vision-language approaches for extraction, validation and reliability.'}
 };
 document.querySelectorAll('[data-place]').forEach(pin=>pin.addEventListener('click',()=>{
  document.querySelectorAll('[data-place]').forEach(p=>p.classList.remove('active'));pin.classList.add('active');
  const d=journeyData[pin.dataset.place],box=document.querySelector('#journey-copy');
  if(box&&d)box.innerHTML=`<span class="eyebrow">${d.date}</span><h3>${d.title}</h3><p>${d.text}</p>`;
 }));
});
